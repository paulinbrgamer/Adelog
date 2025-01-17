import NavOptions from '../components/NavOptions'
import styled from 'styled-components'
import IconButton from '../components/IconButton'
import { useState } from 'react'
import { PackageSearch, User, Store } from 'lucide-react';
import UserScreen from './UserScreen'
import SellScreen from './SellScreen'
import ProductsScreen from './ProductsScreen'
import { AppProvider } from './AppProvider';

const HomePage = styled.div`
    display:flex;
    justify-content:start;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    gap:1dvh;
    padding-top: 10px;
    height:100dvh;
`
function App() {
  const [currentRendering, setcurrentRendering] = useState('products')
  const title = {user:'Dados pessoais',products:'Produtos Cadastrados',sell:"Vender"}
  const handleChangeScreen = (set, value) => {
    set(value)
  }
  return (
    <AppProvider>
      <HomePage  >
        <h3 style={{padding:"10px"}}>{title[currentRendering]}</h3>
        {currentRendering === 'user' ? <UserScreen /> : currentRendering === 'sell' ? <SellScreen /> : <ProductsScreen />}
        
        <NavOptions>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'user')}>
            <User size={26} strokeWidth={1} fill={currentRendering=='user'?'black':'white'} color={currentRendering=='user'?'black':'gray'} />
            <p>Conta</p>
          </IconButton>

          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'products')}>
            <PackageSearch size={26} strokeWidth={1} stroke={currentRendering=='products'?'white':'black'} fill={currentRendering=='products'?'black':'white'} color={currentRendering=='products'?'black':'gray'} />
            <p>Produtos</p>
          </IconButton>

          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sell')}>
            <Store size={26} stroke={currentRendering=='sell'?'white':'black'} strokeWidth={1} fill={currentRendering=='sell'?'black':'white'} color={currentRendering=='sell'?'black':'gray'}/>
            <p>Vender</p>
          </IconButton>
        </NavOptions>
      </HomePage>
    </AppProvider>

  )
}

export default App
