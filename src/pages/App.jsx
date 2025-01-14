import './App.css'
import NavScreens from '../components/NavScreens'
import IconButton from '../components/IconButton'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/Authprovider'
import { useNavigate } from "react-router-dom";
import { PackageSearch, User, Store } from 'lucide-react';
function App() {
  const [currentRendering, setcurrentRendering] = useState('user')
  const { setisLogged } = useAuth()
  const navegate = useNavigate()
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user'))
    if (!session) {
      setisLogged(false)
      navegate('/')
    }
  })
  const handleChangeScreen = (set,value)=>{
    set(value)
  }
  return (
    <div className='App' >
      <NavScreens>
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
      </NavScreens>
    </div>
  )
}

export default App
