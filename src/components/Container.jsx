import React from 'react'

export default function Container({className,children,style}) {
  const styleContainer = {"boxShadow":"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",display:'flex',flexDirection:'column',padding:'10px',borderRadius:'6px',width:'90%'}
  return (
    <div className={className} style={{...styleContainer,...style}}>{children}</div>
  )
}
