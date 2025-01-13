import './App.css'
import NavScreens from '../components/NavScreens'
import IconButton from '../components/IconButton'
import { useEffect,useState } from 'react'
import { useAuth } from '../auth/Authprovider'
import { useNavigate  } from "react-router-dom";
function App() {
  const {setisLogged} = useAuth()
  const navegate = useNavigate()
  useEffect(() => {
      const session = JSON.parse(localStorage.getItem('user'))
      if(!session){
          setisLogged(false)
          navegate('/')
      }})

  return (
    <div className='App' >
      <NavScreens>
        <IconButton>Teste</IconButton>
        <IconButton>Teste</IconButton>
        <IconButton>Teste</IconButton>
      </NavScreens>
    </div>
  )
}

export default App
