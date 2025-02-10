import { Navigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
    const session = JSON.parse(localStorage.getItem('user'))
    if (!session) {
        return <Navigate to="/" replace />; // Redireciona se não estiver autenticado

    }
  return children;
}
