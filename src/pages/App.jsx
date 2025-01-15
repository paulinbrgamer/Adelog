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
    display:flex;
    justify-content:center;
    background-color: #f8f8f8;
    gap:3dvh;
    flex-wrap: wrap;
    flex:1;
`
function App() {
  const [currentRendering, setcurrentRendering] = useState('user')
  const { setisLogged } = useAuth()
  const title = {user:'Dados pessoais',products:'Produtos Cadastrados',sell:"Vender"}
  const handleChangeScreen = (set, value) => {
    set(value)
  }
  return (
    <HomePage  >
      <h2 style={{padding:"10px"}}>{title[currentRendering]}</h2>
      {currentRendering === 'user' ? <UserScreen /> : currentRendering === 'sell' ? <SellScreen /> : <ProductsScreen />}
      <NavOptions>
        <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'user')}>
          <User size={26} strokeWidth={1} color={currentRendering=='user'?'orange':'black'} />
          <p>Conta</p>
        </IconButton>

        <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'products')}>
          <PackageSearch size={26} strokeWidth={1} color={currentRendering=='products'?'orange':'black'} />
          <p>Produtos</p>
        </IconButton>

        <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sell')}>
          <Store size={26} strokeWidth={1} color={currentRendering=='sell'?'orange':'black'}/>
          <p>Vender</p>
        </IconButton>
      </NavOptions>
    </HomePage>
  )
}

export default App
