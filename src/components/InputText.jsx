import React, { useRef } from 'react'

export default function InputText({style,label,onChange}) {

  return (
    <div style={style}>
        <strong>{label}</strong>
        <input onChange={(e)=>onChange(e.target.value)} style={{textAlign:"center",backgroundColor:'white',fontSize:'14pt',padding:'8px',width:'95%',border:'none',borderBottom:'1px solid black',outline:'none'}} type="text" />
    </div>
  )
}
