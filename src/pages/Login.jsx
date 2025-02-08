import { useState } from 'react'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import  Container  from '../components/styled/Container';
import IconButton from '../components/IconButton'
import InputText from '../components/InputText'
import Toast from '../components/Toast';
import logo from '../../public/icon.png'
import { LoginPage } from '../components/styled/LoginPage';
const customStyleContainer = { backgroundColor: 'transparent', maxWidth: '400px' ,'align-items': 'center'}
export default function Login() {
    const [acessKey, setacessKey] = useState('')
    const { login } = useAuth()
    const [toast, settoast] = useState(false)
    const handleEnter = (e) => {
        if (e.key == 'Enter') {
            setacessKey(e.target.value)
            login({ 'key': acessKey }, settoast)
        }
    }
    return (
        <LoginPage>
            <img src={logo} alt="Icone Adelog "  style={{height:'20dvh'}}/>
            {toast &&<Toast $color='red'>Usuário não encontrado</Toast>}
            <Container  style={customStyleContainer}>
                <CiUser size={60} />
                <InputText type='password' onKeyDown={(e) => handleEnter(e)} onChange={(e) => setacessKey(e.target.value)} align='center' label='Chave de Acesso' />
                <IconButton>
                    <CiLogin onClick={() => login({ 'key': acessKey }, settoast)} size={30} />
                </IconButton>
            </Container>


        </LoginPage>
    )
}
