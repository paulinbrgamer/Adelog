import { useState } from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import {styled,keyframes} from 'styled-components'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import ModalComponent from '../components/ModalComponent'
import { supabase } from "../services/cliente";
import Toast from '../components/Toast'
import { data } from 'react-router-dom'
import { useAuth } from '../auth/Authprovider'
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
  width:90%;
  height: 100%;
  overflow-y:scroll;
  padding:10px;
  box-sizing: border-box;
`
export default function SellScreen() {
  const { Cart, setCart,storeData,setStore } = useApp()
  const [isFinished, setisFinished] = useState(false)
  const [isError,setisError] = useState(false)
  const [isAproved,setisAproved] = useState(false)
  const {User} = useAuth()

  const handleCancel = () => {
    setCart([])
  }
  const handleFinalize = async() => {
    setisFinished(true)
    let errorCart = []
    Cart.forEach(async (item )=> {
      const {data,error} = await supabase.rpc('decrement_stock',{product_id:item.id,quantity:item.units})
      if (error) {
        errorCart.push(item)
        setisFinished(false)
        setisError(true)
        setTimeout(() => {
          setisError(false)

        }, 1500);
      }
      else{
        const {id,...rest} = item
        const date = new Date()
        
        const sale = {...rest,user_id:User.id,store_id:User.store_id,date:date.toISOString()}
        const {data:newsale,error:saleError} = await supabase.from('sales').insert([sale])
        if(saleError){
          console.log('Error sale : ',saleError)
          
        }

          setTimeout(() => {
            setisFinished(false)
          setisAproved(true)
            
          }, 800);
          setTimeout(() => {
            setisAproved(false)
          }, 1500);
      }
    }); 
    setCart(errorCart)
  }

  return (
    <Container shadow = {'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}  border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 160px)'}>
      {isFinished ?
        <ModalComponent>
          <ContainerL>
            <Loading></Loading>
          </ContainerL>
        </ModalComponent> : null
      }
      {isAproved?<Toast message={'Venda Concluida'} color={'#008300'}/>:null}
      {isError?<Toast message={'Erro, Venda não registrada'} color={'#e02323'}/>:null}
      <Title>Items: {Cart.length}</Title>
      <Products>
        {Cart.map((item) =>
          <ProductComponent trash key={item.id + 'cart'} data={item} />
        )}
      </Products>
      {Cart.length > 0 ? 
      <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly", padding: "6px" ,width:"100%" }}>
        <Title>Total: R$ {Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)}</Title>
        <div style={{ display: 'flex', justifyContent: "center",width:"100%",gap:"60px" ,paddingTop:"8px"}}>
          <IconButton style={{ padding: '4px' ,border:"1px solid ",borderRadius:'4px'}} onclick={() => handleCancel()}>
            <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
          </IconButton>
          <IconButton onclick={() => handleFinalize()} style={{padding: '6px' ,border:"1px solid ",borderRadius:'4px',backgroundColor:"black"}}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt" ,color:'white'}}>Finalizar</p>
          </IconButton>
        </div>
      </div> : null}
    </Container>
  )
}
