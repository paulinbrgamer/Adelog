import React from 'react'
import {styled,keyframes} from 'styled-components'
const fdInOut = keyframes`
 0% {
      opacity: 0;
      transform: translatey(20px);
    }
    100% {
      opacity: 1;
      transform: translatey(0px);
    }
`
const StyledContainer = styled.div`
background-color: white;
width:90%;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px ;
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
padding: 10px;
border-radius: 6px;
opacity: 1;
animation: ${fdInOut} 300ms ease;
`
export default function Container({children,just}) {

  return (
    <StyledContainer $just={just}>{children}</StyledContainer>
  )
}
