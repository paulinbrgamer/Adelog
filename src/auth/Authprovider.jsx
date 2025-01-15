import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/cliente";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const  [User, setUser] = useState(null)
    const  [isLogged, setisLogged] = useState(false)
    const navegate = useNavigate()
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if (!session) {
            setisLogged(false)
            navegate('/')
          }else{
            setUser(session)
            setisLogged(true)
          }
    }, [])
    
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
                }, 1500)
                
            }
            
        }
    }
    const logout = ()=>{
        setUser(null)
        setisLogged(false)
        localStorage.removeItem('user')
        navegate('/')
    }
    const values = {User,login,logout,setisLogged,isLogged}

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)