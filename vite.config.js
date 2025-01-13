import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], server: {
    host: true, // Permite o acesso a partir de outros dispositivos
    port: 5173, // Porta do servidor (pode ajustar se necessário)
  },
})
