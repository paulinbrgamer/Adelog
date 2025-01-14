import { UserRound  } from 'lucide-react'
import {useEffect,useState} from 'react'
import {styled,keyframes} from 'styled-components'
import InputText from '../components/InputText'
import { useAuth } from '../auth/Authprovider'
const fdInOut = keyframes`
 0% {
      opacity: 0;
      transform: translatey(20px);
    }
    100% {
      opacity: 1;
      transform: translatey(0px);
    }
`
const UserContainer = styled.div`
    display:flex;
    width:90%;
    flex-direction: column;
    align-items: center;
    color: #1E1E1E;
    animation: ${fdInOut} 300ms ease;
`
export default function UserScreen() {
    const {User} = useAuth()
    
  return (
    
    <UserContainer>
        <UserRound  size={50} strokeWidth={0.6}/>
        <h3>Dados Pessoais</h3>
        <InputText  type='text' align='start' label={'Nome:'}/>
        <InputText  type='email' align='start' label={'E-mail:'}/>
        <InputText  type='text' align='start' label={'Chave:'}/>
    </UserContainer>
  )
}
