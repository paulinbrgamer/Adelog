import React from 'react'
import {styled} from 'styled-components'
import { fdInOut } from './FdInOt'
const StyledContainer = styled.div`
background-color: white;
width: clamp(100px,95%,900px);
height:  ${(props) => props.$height };
border: ${(props) => props.$border };
display: flex;
align-items: ${(props) => props.$just };
flex-direction: column;
justify-content:${(props) => props.$aligh };
border-radius: 6px;
opacity: 1;
animation: ${fdInOut} 300ms ease;
@media (min-width: 600px) {
    justify-content: ${(props) => props.$aligh?props.$aligh:'center' };
    gap: 50px;
  }
`
export default function Container({children,just,height,aligh,border}) {

  return (
    <StyledContainer $border={border?border:`1px solid #6e6e6e`} $height={height} $aligh={aligh} $just={just}>{children}</StyledContainer>
  )
}
