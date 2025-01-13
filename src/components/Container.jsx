import React from 'react'

export default function Container({className,children,style}) {
  const styleContainer = {boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px',display:'flex',flexDirection:'column',padding:'10px',borderRadius:'6px',width:'90%',backgroundColor:"white",opacity:'0.96'}
  return (
    <div className={className} style={{...styleContainer,...style}}>{children}</div>
  )
}
