import React from 'react'
import {styled} from 'styled-components'
import { fdInOut } from './FdInOt'
const StyledContainer = styled.div`
background-color: white;
width:90%;
height:  ${(props) => props.$height };
border: 1px solid #e9e9e9;
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
justify-content:${(props) => props.$aligh };
padding: 14px;
border-radius: 6px;
opacity: 1;
animation: ${fdInOut} 300ms ease;
`
export default function Container({children,just,height,aligh}) {

  return (
    <StyledContainer $height={height} $aligh={aligh} $just={just}>{children}</StyledContainer>
  )
}
