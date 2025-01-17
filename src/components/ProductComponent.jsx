import styled from "styled-components"
import { fdInOut } from "./FdInOt"
import { ShoppingCart } from "lucide-react"
import ModalComponent from "./ModalComponent"
import { useState } from "react"
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
    `
const ProductContainer = styled.div`
    display: grid;
    width: 100%;    
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 4px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 5fr 2fr;
    box-sizing: border-box;
    animation: ${fdInOut} 300ms ease-in-out;
`
const ProductComponent = ({data,Modal}) =>{
  const [isModalOpen,setisModalOpen] = useState(false)

return(
        <ProductContainer>
            {isModalOpen?
                <ModalComponent isOpen={setisModalOpen}>
                Teste
                </ModalComponent>:
                null
            }
            <Title>{data.name}</Title>
            <p style={{color:'gray',fontWeight:'400',gridColumn:'1/2',gridRow:"2/4",fontSize:'10pt'}}>Unidades: {data.units}</p>
            <ShoppingCart onClick={()=>setisModalOpen(true)}  size={22} color="white" style={{padding:'4px',backgroundColor:'black',borderRadius: '4px',gridRow:"1/3",gridColumn:"2/3",alignContent:"end",marginLeft:'auto'}}/>
            <Title style={{gridColumn:'2/3',gridRow:'3/4',textAlign:'end',alignContent:"end"}}>R$ {data.price.toFixed(2)}</Title>
        </ProductContainer>
    )
}

export default ProductComponent