import { useState } from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import styled from 'styled-components'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import ModalComponent from '../components/ModalComponent'
import { supabase } from "../services/cliente";
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
  const { Cart, setCart,storeData,setStore } = useApp()
  const [isFinished, setisFinished] = useState(false)
  const [isAproved,setisAproved] = useState(false)
  const handleCancel = () => {
    setCart([])
  }
  const handleFinalize = async() => {
    const update = Cart.map((item)=>{
      const current = storeData.filter(data=>data.id==item.id)
      const newItem = {id:item.id,units:current[0].units-item.units}
      return newItem
    })    
    update.forEach(async (item )=> {
      const {data,error} = await supabase.from('products').update({units:item.units}).eq('id',item.id)
      if (error) {
        console.log('Erro : ',error);
      }
      else{
        setisAproved(true)
      }
    });
  }

  return (
    <Container border={'none'} height={'calc(100% - 140px)'}>
      {isFinished ?
        <ModalComponent>
          Teste
        </ModalComponent> : null
      }
      <Title>Items: {Cart.length}</Title>
      <Products>
        {Cart.map((item) =>
          <ProductComponent trash key={item.id + 'cart'} data={item} />
        )}
      </Products>
      {Cart.length > 0 ? <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly", padding: "6px" }}>
        <Title>Total: R$ {Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)}</Title>
        <div style={{ display: 'flex', justifyContent: "space-evenly", padding: "6px" }}>
          <IconButton style={{ padding: '4px' }} onclick={() => handleCancel()}>
            <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
          </IconButton>
          <IconButton onclick={() => handleFinalize()} style={{ padding: '4px' }}>
            <Title>Finalizar</Title>
          </IconButton>
        </div>
      </div> : null}
    </Container>
  )
}
