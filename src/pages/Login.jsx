import { useState } from 'react'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import InputText from '../components/InputText'
import Toast from '../components/Toast';
import styled from 'styled-components';
import { fdInOut } from '../components/FdInOt'
const LoginPage = styled.div`
    background-repeat:no-repeat;
    background-image:url(./public/background.jpg);
    background-position:center;
    background-size: cover;
    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;
    padding-top:20dvh;
    height:80dvh;
    animation: ${fdInOut} 300ms ease-in-out;
`
export default function Login() {
    const [acessKey, setacessKey] = useState('')
    const {login} = useAuth()
    const [toast, settoast] = useState(false)
    const handleEnter = (e)=>{
        if(e.key=='Enter'){
            setacessKey(e.target.value)
            
        }
    }
    return (
        <LoginPage>
            <img src="public/icon.png" alt="Icone Adelog " />
            {toast?<Toast style={{ justifySelf: 'center' }} color={'#e02323'} message='Usuário não encontrado'/>:null}

            <Container border={'none'} just={'center'} style={{backgroundColor:'transparent',maxWidth:'500px'}}>
                <CiUser size={60}/>
                <InputText type='password' onKeyDown={(e)=>handleEnter(e)} onChange={(e)=>setacessKey(e.target.value)} align='center' label='Chave de Acesso' />
                <IconButton>
                    <CiLogin onClick={()=>login({'key':acessKey},settoast)}  size={30} />
                </IconButton>
            </Container>
            

        </LoginPage>
    )
}
