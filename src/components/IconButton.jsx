import React from 'react'
import styled from 'styled-components'
const Button = styled.button`

background-color:#ffffff01;
border:none;
font-size:12pt;
transition: all 80ms ease;
cursor: pointer;
&:active {
      transform: translateY(2px);
    }

`
export default function IconButton({children,onclick}) {
  return (
    <Button onClick={onclick}>
        {children}
    </Button>
  )
}
