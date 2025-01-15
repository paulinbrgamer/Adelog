import React from 'react'

export default function IconButton({children,onclick}) {
  return (
    <button style={{backgroundColor:'#ffffff01',border:"none",fontSize:'12pt'}} onClick={onclick}>
        {children}
    </button>
  )
}
