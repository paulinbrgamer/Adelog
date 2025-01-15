import { UserRound  } from 'lucide-react'
import {useEffect,useState} from 'react'
import {styled,keyframes} from 'styled-components'
import InputText from '../components/InputText'
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'

const UserContainer = styled.div`
    display:flex;
    width:90%;
    flex-direction: column;
    align-items: center;
    color: #1E1E1E;
    
`
export default function UserScreen() {

    const {User} = useAuth()
    
    
  return (
    
    <Container just={'center'}>
        <UserContainer style={{marginBottom:'5dvh'}}>
        <UserRound size={50} strokeWidth={0.6}/>
        <h3>Dados Pessoais</h3>
        </UserContainer>
        <InputText value={User?.name ||''} type='text' align='start' label={'Nome:'}/>
        <InputText value={User?.email ||''} type='email' align='start' label={'E-mail:'}/>
        <InputText value={User?.key ||''} type='text' align='start' label={'Chave:'}/>
    </Container>
  )
}
