import { useState, useEffect } from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import {styled,keyframes} from 'styled-components'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import ModalComponent from '../components/ModalComponent'
import { supabase } from "../services/cliente";
import Toast from '../components/Toast'
const session = JSON.parse(localStorage.getItem('user'))
const spin = keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }`
const Loading = styled.div`
     width: 50px;
      height: 50px;
      border: 5px solid #ccc; /* Cor de fundo do loader */
      border-top: 5px solid #1f1e1e; /* Cor do movimento */
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
`
const ContainerL = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
   
`
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
  const [isError,setisError] = useState(false)
  const [isAproved,setisAproved] = useState(false)
  useEffect(() => {
    setCart(Cart.filter(item=>{
      const current = storeData.filter((data)=>data.id==item.id)
      if(item.units<= current[0].units){
        return item
      }
    }))
    
  }, [storeData])
  const handleCancel = () => {
    setCart([])
  }
  const handleFinalize = async() => {
    setisFinished(true)
    Cart.forEach(async (item )=> {
      const currentvalue = storeData.filter((data)=>data.id==item.id)
      const {data,error} = await supabase.from('products').update({units:currentvalue[0].units -item.units}).eq('id',item.id)
      if (error) {
        setisFinished(false)
        setisError(true)
        setTimeout(() => {
          setisError(false)
        }, 1500);
        
      }
      else{
        const {id,...rest} = item
        const date = new Date()
        const sale = {...rest,user_id:session.id,store_id:session.store_id,date:date.toISOString()}
        const {data:newsale,error:saleError} = await supabase.from('sales').insert([sale])
        if(saleError){
          console.log('Error sale : ',saleError)
          
        }
        setStore(storeData.map((updateddata)=>{
          if(updateddata.id == item.id){
            updateddata.units -= item.units
          }
          return updateddata
        }))
          setTimeout(() => {
            setisFinished(false)
            setCart([])
          setisAproved(true)
            
          }, 800);
          setTimeout(() => {
            setisAproved(false)
          }, 1500);
      }
    });
  }

  return (
    <Container border={'none'} height={'calc(100% - 140px)'}>
      {isFinished ?
        <ModalComponent>
          <ContainerL>
            <Loading></Loading>
          </ContainerL>
        </ModalComponent> : null
      }
      {isAproved?<Toast message={'Venda Concluida'} color={'#008300'}/>:null}
      {isError?<Toast message={'Erro, venda não registrada'} color={'#e02323'}/>:null}
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
