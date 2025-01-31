import React from 'react'
import styled from 'styled-components'
const OptionsConatiner = styled.nav`
display:flex;
justify-content:space-around;
bottom:0px;
width:100%;
padding: 10px;
box-sizing: border-box;
border-top: 1px solid lightgray;
background-color: #ffffff;

@media (min-width: 900px) {
    flex-direction: column;
    justify-content: start;
    padding-top: 5dvh;
    gap: 30px;
    grid-column: 1/2;
    grid-row : 1/3;
    border-right: 1px solid lightgray;

  }
`
export default function NavOptions({children}) {

  return (
    <OptionsConatiner>
        {children}
    </OptionsConatiner>
  )
}
