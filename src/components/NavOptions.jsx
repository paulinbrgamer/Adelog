import React from 'react'
import styled from 'styled-components'
const OptionsConatiner = styled.nav`
display:flex;
justify-content:space-evenly;
padding:10px;
position:fixed;
bottom:0px;
width:100%;
border-top: 1px solid lightgray;
`
export default function NavOptions({children}) {

  return (
    <OptionsConatiner>
        {children}
    </OptionsConatiner>
  )
}
