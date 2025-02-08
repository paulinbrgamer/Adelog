import React from 'react'
import styled from 'styled-components'
const OptionsConatiner = styled.nav`
display:flex;
justify-content:space-around;
bottom:0px;
width:100%;
box-sizing: border-box;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
background-color: #ffffff;

@media (min-width: 900px) {
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    grid-column: 1/2;
    grid-row : 1/3;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    box-sizing: border-box;
    padding: 10px;
  }
`
export default function NavOptions({children}) {

  return (
    <OptionsConatiner>
        {children}
    </OptionsConatiner>
  )
}
