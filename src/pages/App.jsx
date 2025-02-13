import NavOptions from '../components/NavOptions'
import IconButton from '../components/IconButton'
import { useState } from 'react'
import { PackageSearch, CircleUserRound, FileText, ShoppingCart, X } from 'lucide-react';
import UserScreen from './UserScreen'
import SellScreen from './SellScreen'
import ProductsScreen from './ProductsScreen'
import { AppProvider, useApp } from './AppProvider';
import SalesComponent from '../pages/SalesComponent'
import { AppPage } from '../components/styled/AppPage'
import Badge from '../components/Badge';
import ModalComponent from '../components/ModalComponent';
function App() {
  const [currentRendering, setcurrentRendering] = useState('products')
  const [isModalUser, setisModalUser] = useState(false)
  const handleChangeScreen = (setRender, newRender) => {
    setRender(newRender)
  }
  const ChangeStyleNav = (current, target) => current == target ? 'rgb(239 246 255)' : 'white'
  return (
    <AppProvider>
      <AppPage  >
        {currentRendering === 'sell' ? <SellScreen /> : currentRendering === 'products' ? <ProductsScreen /> : currentRendering === 'sales' ? <SalesComponent /> : null}
        {isModalUser &&
          <ModalComponent>
            <IconButton onclick={() => setisModalUser(false)} style={{ alignSelf: 'end' }}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt" }}><X size={20}color='gray'/></p>
            </IconButton>
            <UserScreen />

          </ModalComponent>
        }
        <NavOptions>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'products')} style={{ backgroundColor: ChangeStyleNav(currentRendering, 'products'), padding: "8px" }}>
            <PackageSearch
              size={24}
              strokeWidth={1.8}
              color={currentRendering == 'products' ? 'blue' : 'gray'} />
          </IconButton>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sell')} style={{ backgroundColor: ChangeStyleNav(currentRendering, 'sell'), padding: "8px", position: "relative" }}>
            <ShoppingCart
              size={24}
              strokeWidth={1.8}
              fill={ChangeStyleNav(currentRendering, 'sell')}
              color={currentRendering == 'sell' ? 'blue' : 'gray'} />
            <Badge size={14} />
          </IconButton>
          <IconButton onclick={() => handleChangeScreen(setcurrentRendering, 'sales')} style={{ backgroundColor: ChangeStyleNav(currentRendering, 'sales'), padding: "8px" }}>
            <FileText
              size={24}
              strokeWidth={1.8}
              fill={ChangeStyleNav(currentRendering, 'sales')}
              color={currentRendering == 'sales' ? 'blue' : 'gray'} />
          </IconButton>
          <IconButton onclick={() => setisModalUser(true)} >
            <CircleUserRound
              size={24}
              color='gray'
              strokeWidth={1.8}
            />
          </IconButton>
        </NavOptions>
      </AppPage>
    </AppProvider>

  )
}

export default App
