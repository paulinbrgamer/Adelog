import React from 'react'
export default function navScreens({children}) {
  return (
    <nav style={{display:"flex",justifyContent:'space-evenly',backgroundColor:'gray',padding:"10px",position:"relative",top:"calc(100dvh - 38px)"}}>
        {children}
    </nav>
  )
}
