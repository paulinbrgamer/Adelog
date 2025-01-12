import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const  [User, setUser] = useState(null)

    const login = (userData)=>{
        setUser(userData)
        localStorage.setItem('user',JSON.stringify(User))
        
    }
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('user')
    }
    const values = {User,login,logout}

    return(
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)