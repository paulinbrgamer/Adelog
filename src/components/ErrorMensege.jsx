import {React,useState,useEffect} from 'react'
import Container from './Container'
import { useAuth } from '../auth/Authprovider'
function ErrorMensege({message}) {
    const {User} = useAuth()
    const  [count, setcount] = useState(0)
    const  [isModalOpen, setisModalOpen] = useState(false)
    useEffect(() => {
        User=='NF'?setInterval(() => {
            setisModalOpen(true)
            count==1500?setisModalOpen(false):setcount(count+500)
        }, 500):null
    
    }, [User])
    
    if (!isModalOpen) {
        return null; // Não renderiza nada quando o componente não é visível
      }
    
    
  return (
    <Container style={{alignItems:'center',justifyContent:'center',position:'absolute',top:'20px',backgroundColor:'red',color:'white'}}>{message}</Container>
  )
}

export default ErrorMensege