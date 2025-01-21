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
    justify-content:space-between;
    `
const PermissionComponent = styled.div`
  border: 1px solid gray;
  padding: 8px;
  border-radius: 6px;
  text-align:center;

`
export default function UserScreen() {

    const {User,logout} = useAuth()
    
    
  return (
    <>
    <Container border={'none'} just={'center'} aligh={'space-evenly'} height={"50dvh"}>

        <Container just={'center'} border={'none'}>
        <img style={{objectFit: 'cover',objectPosition: 'top'}} width={290} src="https://stories.freepiklabs.com/api/vectors/take-away/bro/render?color=37474FFF&background=complete&hide=" alt="" />
        <h3 style={{marginTop:'-30px'}}>Nome: {User?.name}</h3>
        <div  >
        <h4>E-mail:</h4>
        <p>{User?.email}</p>
        <h4>Permissão:</h4>
        <p>{User?.permission}</p>
        </div>
        </Container>
        
        <IconButton onclick={()=>logout()} >
        <LogOut  size={26} strokeWidth={1.4} style={{ transform: 'scaleX(-1)' }} color='#e02323'/>
        <p style={{fontWeight:'400',color:'#e02323'}}>Sair</p>
        </IconButton>
    </Container>

    </>
    
  )
}
