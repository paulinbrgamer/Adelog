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
height:  ${(props) => props.$height };
border: 1px solid #e9e9e9;
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
justify-content:center;
padding: 10px;
border-radius: 6px;
opacity: 1;
animation: ${fdInOut} 300ms ease;
`
export default function Container({children,just,height}) {

  return (
    <StyledContainer $height={height} $just={just}>{children}</StyledContainer>
  )
}
