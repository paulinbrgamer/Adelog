import { LogOut } from 'lucide-react'
import { useAuth } from '../auth/Authprovider'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
export default function UserScreen() {
  const { User, logout } = useAuth()
  return (
    <>
      <Container shadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} border={'none'} just={'center'} aligh={'space-evenly'} height={'calc(100% - 160px)'}>
        <Container just={'center'} border={'none'}>
          <img style={{ objectFit: 'cover', objectPosition: 'top',padding:"10px" }} width={290} src={User?.permission=='box'?"https://stories.freepiklabs.com/api/vectors/take-away/bro/render?color=37474FFF&background=complete&hide=":'https://stories.freepiklabs.com/api/vectors/business-plan/pana/render?color=B0BEC5FF&background=complete&hide='} alt="" />
          <h3 style={{ marginTop: '-30px' }}>Nome: {User?.name}</h3>
          <div  >
            <h4>E-mail:</h4>
            <p>{User?.email}</p>
            <h4>Permissão:</h4>
            <p>{User?.permission}</p> 
          </div>
        </Container>
        <IconButton onclick={() => logout()} >
          <LogOut size={26} strokeWidth={1.4} style={{ transform: 'scaleX(-1)' }} color='#e02323' />
          <p style={{ fontWeight: '400', color: '#e02323' }}>Sair</p>
        </IconButton>
      </Container>

    </>

  )
}
