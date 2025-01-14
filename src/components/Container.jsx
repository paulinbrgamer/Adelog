import React from 'react'
import styled from 'styled-components'
const StyledContainer = styled.div`
background-color: white;
width:90%;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px ;
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
padding: 10px;
border-radius: 6px;
opacity: 0.96;
`
export default function Container({children,just}) {

  return (
    <StyledContainer $just={just}>{children}</StyledContainer>
  )
}
