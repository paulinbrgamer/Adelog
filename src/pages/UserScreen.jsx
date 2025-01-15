import { UserRound,LogOut  } from 'lucide-react'
import {useEffect,useState} from 'react'
import {styled,keyframes} from 'styled-components'
import InputText from '../components/InputText'
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import IconButton from '../components/IconButton'

const UserContainer = styled.div`
    display:flex;
    position:relative;
    width:90%;
    flex-direction: column;
    align-items: center;
    
`
const PermissionComponent = styled.div`
  border: 1px solid gray;
  padding: 8px;
  border-radius: 6px;
`
export default function UserScreen() {

    const {User,logout} = useAuth()
    
    
  return (
    <>
    <Container just={'center'} height={"70dvh"}>
        <UserContainer >
          <UserRound size={50} strokeWidth={0.6}/>
          <PermissionComponent style={{margin:10}}>
          <p style={{color:"orange"}}>Permissão : {User?.permission ||'loading'}</p>
        </PermissionComponent>
        </UserContainer>
        <InputText value={User?.name ||'loading'} type='text' align='start' label={'Nome:'}/>
        <InputText value={User?.email ||'loading'} type='email' align='start' label={'E-mail:'}/>
        <InputText value={User?.key ||'loading'} type='password' align='start' label={'Chave:'}/>

        <IconButton onclick={()=>logout()} >
        <LogOut  size={26} strokeWidth={1.4} style={{ transform: 'scaleX(-1)' }} color='#e02323'/>
        <p style={{fontWeight:'400',color:'#e02323'}}>Sair</p>
        </IconButton>
    </Container>

    </>
    
  )
}
