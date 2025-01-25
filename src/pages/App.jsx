import NavOptions from '../components/NavOptions'
import IconButton from '../components/IconButton'
import { useState } from 'react'
import { PackageSearch, User, FileText  , ShoppingCart } from 'lucide-react';
import UserScreen from './UserScreen'
import SellScreen from './SellScreen'
import ProductsScreen from './ProductsScreen'
import { AppProvider } from './AppProvider';
import SalesComponent from '../pages/SalesComponent'
import {AppPage} from '../components/styled/AppPage'

function App() {
  const [currentRendering, setcurrentRendering] = useState('user')
  const title = {user:'Dados pessoais',products:'Estoque de Produtos',sell:"Carrinho de compras",sales:"Histórico de vendas"}
  const handleChangeScreen = (setRender, newRender) => {
    setRender(newRender)
  }
  
  return (
    <AppProvider>
      <AppPage  >
        <h3 style={{padding:"10px"}}>{title[currentRendering]}</h3>
        {currentRendering === 'user' ? <UserScreen /> : currentRendering === 'sell' ? <SellScreen /> :currentRendering==='products'? <ProductsScreen />:<SalesComponent/>}
        
        <NavOptions>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'user')}>
            <User size={26} strokeWidth={1} fill={currentRendering=='user'?'black':'white'} color={currentRendering=='user'?'black':'gray'} />
            <p style={{color:currentRendering=='user'?'black':'gray'}}>Conta</p>
          </IconButton>

          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'products')}>
            <PackageSearch size={26} strokeWidth={1} stroke={currentRendering=='products'?'white':'gray'} fill={currentRendering=='products'?'black':'white'} color={currentRendering=='products'?'black':'gray'} />
            <p style={{color:currentRendering=='products'?'black':'gray'}}>Produtos</p>
          </IconButton>

          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sell')}>
            <ShoppingCart size={26} stroke={currentRendering=='sell'?'black':'gray'} strokeWidth={1.3} fill={currentRendering=='sell'?'black':'white'} color={currentRendering=='sell'?'black':'gray'}/>
            <p style={{color:currentRendering=='sell'?'black':'gray'}}>Carrinho</p>
          </IconButton>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sales')}>
            <FileText  size={26} stroke={currentRendering=='sales'?'black':'gray'} strokeWidth={1.3} fill={currentRendering=='sales'?'black':'white'} color={currentRendering=='sales'?'black':'gray'}/>
            <p style={{color:currentRendering=='sales'?'black':'gray'}}>Histórico</p>
          </IconButton>
        </NavOptions>
      </AppPage>
    </AppProvider>

  )
}

export default App
