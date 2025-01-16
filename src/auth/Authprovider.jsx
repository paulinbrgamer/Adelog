import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/cliente";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const  [User, setUser] = useState(null)
    const [storeData,setStore] = useState([])
    const  [isLogged, setisLogged] = useState(false)
    const navegate = useNavigate()

    const login = async(userData,settoast)=>{
        const {data,error} = await supabase.from('users').select('*').eq('key',`${userData.key}`).single()
        if (error){
            if(settoast){
                settoast(true)
                setTimeout(() => {
                settoast(false)
                }, 1500)
            }
            console.log('Erro ao buscar os dados: ',error);
            setUser({user:false})
        }
        else{
            navegate('/home')
            setUser(data)
            localStorage.setItem('user',JSON.stringify(data)) 
            setisLogged(true)
            const {data:dataStore, error:Storeerror} = await supabase.from('products').select('*').eq('store_id',data.store_id)
            if(Storeerror){
                console.log('Erro ao buscar os dados: ',Storeerror);
            }
            else{
                setStore(dataStore.map((product)=>product));
            }
        }
    }
    const logout = ()=>{
        setStore([])
        setUser(null)
        setisLogged(false)
        localStorage.removeItem('user')
        navegate('/')
    }
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if (!session) {
            setStore([])
            setisLogged(false)
            navegate('/')
          }else{
            login({'key':session.key},null)
          }
    }, [])
    
    const values = {User,storeData,login,logout}

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)