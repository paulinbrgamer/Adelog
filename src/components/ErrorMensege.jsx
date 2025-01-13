import {React} from 'react'
import Container from './Container'
import './styles/toast.css'
function ErrorMensege({message}) {
  return (
    <Container className="toast" style={{alignItems:'center',justifyContent:'center',position:'absolute',top:'20px',backgroundColor:'red',color:'white'}}>{message}</Container>
  )
}

export default ErrorMensege