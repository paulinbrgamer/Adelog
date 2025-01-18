import React from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import styled from 'styled-components'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
const Title = styled.p`
  font-weight: 600;
  font-size: 14pt ;
  text-align: center;
    `
const Products = styled.div`
  width:100%;
  overflow-y:scroll;
  padding:10px;
  box-sizing: border-box;
`
export default function SellScreen() {
  const {Cart,setCart} = useApp()

  const handleCancel=()=>{
      setCart([])
  }
  return (
    <Container border={'none'} height={'calc(100% - 140px)'}>
        <Title>Items: {Cart.length}</Title>

      <Products>
        {Cart.map((item)=>
          <ProductComponent trash key={item.id+'cart'} data={item}/>
        )}
      </Products>
      {Cart.length>0?<div style={{display:'flex',justifyContent:"space-evenly",padding:"6px"}}>
        <IconButton style={{padding:'4px'}} onclick={()=>handleCancel()}>
          <p style={{ fontWeight:'normal', fontSize: "12pt" }}>Cancelar</p>
        </IconButton>
        <IconButton style={{padding:'4px'}}>
          <Title>Finalizar</Title>
        </IconButton>
      </div>:null}
    </Container>
  )
}
