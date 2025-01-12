import React from 'react'
import './App.css'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import InputText from '../components/InputText'
export default function Login() {


    return (
        <div className='App' style={{backgroundRepeat:'no-repeat',backgroundImage:'url("./public/background.PNG")',backgroundPosition:'bottom', display: 'flex', justifyContent: 'start', gap: '30px', alignItems: 'center', flexDirection: 'column', paddingTop: "20dvh",height:"80dvh" }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Adelog</h1>
                <h3 style={{ color: 'grey' }}>Sistema de Gerenciamento</h3>
            </div>
            <Container alignItems='center' justifyContent='center'>
                <CiUser size={60} style={{ margin: '20px' }} />
                <InputText style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} label='Chave de Acesso' />
                <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <CiLogin style={{ margin: '10px' }} size={30} />
                </button>
            </Container>
            

        </div>
    )
}
