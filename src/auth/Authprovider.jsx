import React, { createContext, useState, useContext, useLayoutEffect } from "react";
import { supabase } from "../services/cliente";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(null)
    const navegate = useNavigate()
    const showToast = (setToastVisible) => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 1500); // Exibe por 3 segundos
    };
    const login = async (userData, settoast) => {
        const { data, error } = await supabase.from('users').select('*').eq('key', `${userData.key}`).single()
        if (error) {
            if (settoast) {
                showToast(settoast)
            }
            console.log('Erro ao buscar os dados: ', error);
            setUser({ user: false })
        }
        else {
            navegate('/home')
            setUser(data)
            localStorage.setItem('user', JSON.stringify(data))

        }
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navegate('/')
    }
    useLayoutEffect(() => {
        const session = JSON.parse(localStorage.getItem('user'))
        if (!session) {
            navegate('/')
        }
        else {
            login({ 'key': session.key }, null)
        }
    }, [])
    const values = { User, login, logout }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = () => useContext(AuthContext)