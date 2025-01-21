import React from 'react'
import styled from 'styled-components'
const OptionsConatiner = styled.nav`
display:flex;
justify-content:space-around;
padding:10px;
position:fixed;
bottom:0px;
width:100%;
border-top: 1px solid lightgray;
background-color: #ffffff;

@media (min-width: 600px) {
    justify-content: center;
    gap: 50px;
  }
`
export default function NavOptions({children}) {

  return (
    <OptionsConatiner>
        {children}
    </OptionsConatiner>
  )
}
