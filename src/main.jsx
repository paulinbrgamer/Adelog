import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './auth/Authprovider'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login';
import App from './pages/App'
import { ProtectedRoute } from './auth/ProtectedRoute';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute>
            <App />
          </ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
)
