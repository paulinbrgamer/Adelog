import React from 'react'
export default function navScreens({children}) {
  return (
    <nav style={{display:"flex",justifyContent:'space-evenly',padding:"10px",position:"fixed",bottom:"0px",width:'100%'}}>
        {children}
    </nav>
  )
}
