import React, { createContext, useState, useContext } from "react";
import { supabase } from "../services/cliente";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const  [User, setUser] = useState(null)
    const  [isLogged, setisLogged] = useState(false)
    const login = async(userData,settoast,navegate)=>{
        const {data,error} = await supabase.from('users').select('*').eq('key',`${userData.key}`)
        if (error){
            console.log('Erro ao buscar os dados: ',error);
            setUser({user:false})
        }
        else{
            
            
            if(data.length>0){
            const storeId = data[0].store_id
            const {data:dataStore, error:Store} = await supabase.from('stores').select('*').eq('id',storeId)
            if(error){
                console.log('Erro ao buscar os dados: ',Store);
                
            }
            else{
                console.log(dataStore);
                
            }
            navegate('/home')
            setUser(data[0])
            localStorage.setItem('user',JSON.stringify(data[0])) 
            setisLogged(true)

            }
            else{
                settoast(true)
                setTimeout(() => {
                settoast(false)
                }, 2000)
                
            }
            
        }
    }
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('user')
    }
    const values = {User,login,logout,setisLogged,isLogged}

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)