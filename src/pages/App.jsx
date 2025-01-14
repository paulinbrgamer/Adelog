import NavOptions from '../components/NavOptions'
import styled from 'styled-components'
import IconButton from '../components/IconButton'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/Authprovider'
import { useNavigate } from "react-router-dom";
import { PackageSearch, User, Store } from 'lucide-react';
import UserScreen from './UserScreen'
import SellScreen from './SellScreen'
import ProductsScreen from './ProductsScreen'

const HomePage = styled.div`

    background-repeat:no-repeat;
    background-position:bottom;
    display:flex;
    justify-content:start;
    gap:30px;
    align-items:center;
    flex-direction:column;
    padding-top:20dvh;
    height:80dvh;
`
function App() {
  const [currentRendering, setcurrentRendering] = useState('user')
  const { setisLogged } = useAuth()

  const handleChangeScreen = (set,value)=>{
    set(value)
  }
  return (
    <HomePage  >
      {currentRendering==='user'?<UserScreen/>:currentRendering==='sell'?<SellScreen/>:<ProductsScreen/>}
      <NavOptions>
          <IconButton onclick={()=>handleChangeScreen(setcurrentRendering,'user')}>
              <User size={26} strokeWidth={1} />
              <p>Conta</p>
          </IconButton>

          <IconButton onclick={()=>handleChangeScreen(setcurrentRendering,'products')}>
              <PackageSearch size={26} strokeWidth={1} />
              <p>Produtos</p>
          </IconButton>

          <IconButton onclick={()=>handleChangeScreen(setcurrentRendering,'sell')}>
              <Store size={26} strokeWidth={1} />
              <p>Vender</p>
          </IconButton>
      </NavOptions>
    </HomePage>
  )
}

export default App
