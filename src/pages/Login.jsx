import { useState,useEffect } from 'react'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import InputText from '../components/InputText'
import Toast from '../components/Toast';
import { useNavigate  } from "react-router-dom";
import styled from 'styled-components';
const LoginPage = styled.div`

    background-repeat:no-repeat;
    background-image:url(https://img.freepik.com/free-vector/white-background-with-abstract-lines-copy-space_23-2148822144.jpg?t=st=1736904842~exp=1736908442~hmac=3441c313b9c2eaa6e608901016a415f0e72233e3774a47d3b992cf2974418c00&w=1380);
    background-position:center;
    background-size: cover;
    display:flex;
    justify-content:start;
    gap:30px;
    align-items:center;
    flex-direction:column;
    padding-top:20dvh;
    height:80dvh;
`
export default function Login() {
    const [acessKey, setacessKey] = useState('')
    const {login,isLogged,setisLogged} = useAuth()
    const [toast, settoast] = useState(false)
    const navegate = useNavigate()

    useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user'))
    if(session){
        setisLogged(true)
        navegate('./home')
    }
    
      
    }, [])
    const handleLogin = (loginfunc,key,settoast,navegate)=>{
        loginfunc({'key':key},settoast,navegate)
    }
    return (
        <LoginPage>

            {toast?<Toast color={'#e02323'} message='Usuário não encontrado'/>:null}

            <div style={{ textAlign: 'center' }}>
                <h1>Adelog</h1>
                <h3 style={{ color: 'grey' }}>Sistema de Gerenciamento</h3>
            </div>

            <Container just={'center'}>

                <CiUser size={60} style={{ margin: '20px' }} />

                <InputText type='password' onChange={setacessKey} align='center' label='Chave de Acesso' />
                <IconButton>
                    <CiLogin onClick={()=>handleLogin(login,acessKey,settoast,navegate)}  size={30} />
                </IconButton>
            </Container>
            

        </LoginPage>
    )
}
