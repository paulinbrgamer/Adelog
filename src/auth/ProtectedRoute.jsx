import { Navigate } from "react-router-dom";
import { useAuth } from "./Authprovider";
import { useEffect } from "react";
export function ProtectedRoute({ children }) {
    const {login,User,setUser} = useAuth()
    const session = JSON.parse(localStorage.getItem('user'))
    if (!session) {
        return <Navigate to="/" replace />; // Redireciona se não estiver autenticado
    }
    useEffect(() => {
      setUser(session)
      login(User,null)
    }, [])
  return children;
}
