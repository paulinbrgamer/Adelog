import React from 'react'
import styled from 'styled-components'
const Button = styled.button`

background-color: ${(props)=> props.$color?props.$color:'#ffffff01'};
border:none;
font-size:10pt;
transition: all 80ms ease;
cursor: pointer;
&:active {
      transform: translateY(2px);
    }

`
export default function IconButton({children,onclick,style}) {
  return (
    <Button style={style} onClick={onclick}>
        {children}
    </Button>
  )
}
