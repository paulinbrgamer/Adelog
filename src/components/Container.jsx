import React from 'react'
import {styled} from 'styled-components'
import { fdInOut } from './FdInOt'
const StyledContainer = styled.div`
background-color: white;
width:90%;
height:  ${(props) => props.$height };
border: ${(props) => props.$border };
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
justify-content:${(props) => props.$aligh };
padding: 14px;
border-radius: 6px;
opacity: 1;
animation: ${fdInOut} 300ms ease;
`
export default function Container({children,just,height,aligh,border}) {

  return (
    <StyledContainer $border={border?border:`1px solid #6e6e6e`} $height={height} $aligh={aligh} $just={just}>{children}</StyledContainer>
  )
}
