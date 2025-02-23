import { useState } from 'react'
import { CiLogin, CiUser } from "react-icons/ci";
import { useAuth } from '../auth/Authprovider'
import  Container  from '../components/styled/Container';
import IconButton from '../components/IconButton'
import InputText from '../components/InputText'
import Toast from '../components/Toast';
import logo from '../../public/icon.png'
import { LoginPage } from '../components/styled/LoginPage';
const customStyleContainer = { backgroundColor: 'white', maxWidth: '400px' ,'align-items': 'center',padding:'20px',gap:'10px',"box-shadow": 'rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,rgba(14, 63, 126, 0.04) 0px 24px 24px -12px'}
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
            {toast &&<Toast $color='red'>Usuário não encontrado</Toast>}
            <Container  style={customStyleContainer}>
            <img src={logo} alt="Icone Adelog "  style={{height:'15dvh'}}/>

                <CiUser size={60} />
                <InputText pholder={'Digite a chave de acesso'} type='password' onKeyDown={(e) => handleEnter(e)} onChange={(e) => setacessKey(e.target.value)} align='center' label='Chave de Acesso' />
                <IconButton>
                    <CiLogin onClick={() => login({ 'key': acessKey }, settoast)} size={30} />
                </IconButton>
            </Container>


        </LoginPage>
    )
}
