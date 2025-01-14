import React from 'react'

export default function IconButton({children,onclick}) {
  return (
    <button style={{backgroundColor:'white',border:"none",fontSize:'12pt'}} onClick={onclick}>
        {children}
    </button>
  )
}
