import styled from "styled-components"
import { fdInOut } from "./FdInOt"
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
    `
const ProductContainer = styled.div`
    display: grid;
    width: 100%;    
    border-radius: 4px;
    padding: 4px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 5fr 2fr;
    box-sizing: border-box;
    &:active{
      background-color: #f7f7f7;
    }
    animation: ${fdInOut} 300ms ease-in-out;
`
const ProductComponent = ({data}) =>{
    
return(
        <ProductContainer>
            <Title>{data.name}</Title>
            <p style={{color:'gray',fontWeight:'400',gridColumn:'1/2',gridRow:"2/4",fontSize:'10pt'}}>Unidades: {data.units}</p>
            <Title style={{gridColumn:'2/3',gridRow:'2/4',textAlign:'end',alignContent:"end"}}>R$ {data.price}</Title>
        </ProductContainer>
    )
}

export default ProductComponent