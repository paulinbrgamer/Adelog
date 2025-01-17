import { useEffect, createContext,useState,useContext } from "react";
import { useAuth } from "../auth/Authprovider";
import { supabase } from "../services/cliente";
const AppContext = createContext()

export const AppProvider =({children}) =>{
    const [storeData,setStore] = useState([])
    const {User} = useAuth();
    const getStoreData = async()=>{
        if(User){
            const {data:dataStore, error:Storeerror} = await supabase.from('products').select('*').eq('store_id',User.store_id )
            if(Storeerror){
                console.log('Erro ao buscar os dados: ',Storeerror);
            }
            else{
                setStore(dataStore.map((product)=>product));
            }
        }
        
    }
    useEffect( () => {
        getStoreData()
    },[User])
  return (
    <AppContext.Provider value={{storeData,getStoreData}}>
        {children}
    </AppContext.Provider>
  )
}

export const useApp=()=>useContext(AppContext)