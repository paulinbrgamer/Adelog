import React from 'react'

export default function IconButton({icon,children,onclick}) {
  return (
    <button onClick={onclick}>
        {icon}
        {children}
    </button>
  )
}
