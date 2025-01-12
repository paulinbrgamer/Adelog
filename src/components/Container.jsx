import React from 'react'

export default function Container({children,alignItems,justifyContent}) {
  return (
    <div style={{"boxShadow":"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",display:'flex',alignItems:alignItems,justifyContent:justifyContent,flexDirection:'column',padding:'10px',borderRadius:'6px',width:'90%'}}>{children}</div>
  )
}
