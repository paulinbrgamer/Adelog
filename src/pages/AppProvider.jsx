import { useEffect, createContext,useState,useContext } from "react";
import { useAuth } from "../auth/Authprovider";
import { supabase } from "../services/cliente";
const AppContext = createContext()

export const AppProvider =({children}) =>{
    const [storeData,setStore] = useState([])
    const [Cart,setCart] = useState([])
    const {User} = useAuth();
    useEffect(() => {
        console.log("-----Alteração do data")
        console.log(storeData);
        console.log(" ")
        
    }, [storeData   ]);
    const getStoreData = async()=>{
        if(User){
            const {data:dataStore, error:Storeerror} = await supabase.from('products').select('*').eq('store_id',User.store_id )
            if(Storeerror){
                console.log('Erro ao buscar os dados: ',Storeerror);
            }
            else{
                setStore(dataStore.sort((a,b)=>b.name<a.name?1:b.name>a.name?-1:0));
            }
        }
        
    }
    useEffect( () => {
        getStoreData()
        const subscription = supabase.channel('products:update').on(
            'postgres_changes',
            {event:'*',schema:'public',table:'products'},
            (payload)=>{
                const {eventType} = payload
                switch (eventType) {
                    case 'INSERT' && payload.new.store_id == User.store_id :
                        setStore((prevStoreData) =>
                        [...prevStoreData,payload.new]
                        );
                        setStore((prevStoreData)=>prevStoreData.sort((a,b)=>b.name<a.name?1:b.name>a.name?-1:0))
                        break;
                    case 'UPDATE' && payload.new.store_id == User.store_id:
                        setStore((prevStoreData) =>
                            prevStoreData.map((data) =>
                                data.id === payload.new.id ? payload.new : data
                            )
                        );
                        break;
                    case 'DELETE' && payload.old.store_id == User.store_id:
                        setStore((prevStoreData) =>
                            prevStoreData.filter((data) => data.id !== payload.old.id)
                        );
                        break;
                    default:
                        break;
                }

                
            }
        ).subscribe()

        return()=>{
            supabase.removeChannel(subscription)
        }
    },[User])
  return (
    <AppContext.Provider value={{setStore,storeData,getStoreData,Cart,setCart}}>
        {children}
    </AppContext.Provider>
  )
}

export const useApp=()=>useContext(AppContext)