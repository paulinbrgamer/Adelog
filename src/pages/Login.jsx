import React, { useState } from 'react'
import './App.css'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import InputText from '../components/InputText'
import ErrorMensege from '../components/ErrorMensege';

export default function Login() {
    const [acessKey, setacessKey] = useState('')
    const {login} = useAuth()
    const [toast, settoast] = useState(false)
    const styleLogin = {
        backgroundRepeat:'no-repeat',backgroundImage:'url("./public/background.PNG")',backgroundPosition:'bottom', display: 'flex', justifyContent: 'start', gap: '30px', alignItems: 'center', flexDirection: 'column', paddingTop: "20dvh",height:"80dvh",width:'100dvw',overflow:"hidden",position:"relative"
    }
    const handleLogin = (loginfunc,key,settoast)=>{
        loginfunc({'key':key},settoast)
        
    }
    return (
        <div className='App' style={styleLogin}>

            {toast?<ErrorMensege message='Usuário não encontrado'/>:null}

            <div style={{ textAlign: 'center' }}>
                <h1>Adelog</h1>
                <h3 style={{ color: 'grey' }}>Sistema de Gerenciamento</h3>
            </div>

            <Container style={{alignItems:'center',justifyContent:'center'}}>

                <CiUser size={60} style={{ margin: '20px' }} />

                <InputText onChange={setacessKey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} label='Chave de Acesso' />

                <button onClick={()=>handleLogin(login,acessKey,settoast)} style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <CiLogin style={{ margin: '10px' }} size={30} />
                </button>
            </Container>
            

        </div>
    )
}
