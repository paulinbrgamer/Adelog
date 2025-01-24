import { useState, useEffect } from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import { styled, keyframes } from 'styled-components'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import ModalComponent from '../components/ModalComponent'
import { supabase } from "../services/cliente";
import Toast from '../components/Toast'
import { useAuth } from '../auth/Authprovider'
import InputText from '../components/InputText'
import { ScanLineIcon, ShoppingCart } from 'lucide-react'
import BarScanner from '../components/BarScanner'
import UnitsComponent from '../components/UnitsComponent'

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
  border-top: 1px solid lightgray;

`
export default function SellScreen() {
  const { Cart, setCart, storeData } = useApp()
  const [isFinished, setisFinished] = useState(false)
  const [isError, setisError] = useState(false)
  const [isAproved, setisAproved] = useState(false)
  const [ShowReader, setshowReader] = useState(false)
  const [productSelected, setproductSelected] = useState(null)
  const [modalAddUnits, setmodalAddUnits] = useState(false)
  const [Units, setUnits] = useState(null)
  const [errorToastBarCode,seterrorToastBarCode] = useState(false)
  const [errorToastBarCodeMensage,seterrorToastBarCodeMensage] = useState('')
  const { User } = useAuth()
  const [exchange, setExchange] = useState(0)
  useEffect(() => {

    setExchange(Cart?.reduce((acc, obj) => acc += obj.price, 0).toFixed(2))
  }, [Cart]);
  const handleCancel = () => {
    setCart([])
  }
  const handleExchange = (e) => {
    if (e.key == 'Enter') {
      if (Number(e.target.value) < Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)) {
        e.target.value = Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)
      }
      setExchange(Number(e.target.value).toFixed(2))
    }
  }
  const handleFinalize = async () => {
    setisFinished(true)
    let errorCart = []
    Cart.forEach(async (item) => {
      const { data, error } = await supabase.rpc('decrement_stock', { product_id: item.id, quantity: item.units })
      if (error) {
        errorCart.push(item)
        setisFinished(false)
        setisError(true)
        setTimeout(() => {
          setisError(false)

        }, 1500);
      }
      else {
        const { id, name, category, line_code, ...rest } = item
        const date = new Date()

        const sale = { ...rest, id_product: id, user_id: User.id, store_id: User.store_id, date: date.toISOString() }
        const { data: newsale, error: saleError } = await supabase.from('sales').insert([sale])
        if (saleError) {
          console.log('Error sale : ', saleError)

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
  const handleBarcodeDetected = (barcode) => {
    if(storeData.filter(item => item.line_code == barcode && item.units>0).length==0){
      seterrorToastBarCodeMensage('Produto Indisponivel')
      seterrorToastBarCode(true)
      setTimeout(() => {
        seterrorToastBarCode(false)
      }, 1500);
    }else{
      setproductSelected(...storeData.filter(item => item.line_code == barcode))
    }
    console.log(productSelected);
    setshowReader(false)
    setmodalAddUnits(true)
  }
  const handleFinalizeUnits = () => {
    if (Units > 0) {
        let newState = Cart?.filter((Obj) => Obj.id != productSelected.id)
        newState.push({ ...productSelected, units: Units, price: Number(Units * productSelected.price) })
        setCart(newState)
        setmodalAddUnits(false)
    }

}
  return (
    <Container shadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 160px)'}>
      {ShowReader ?
        <ModalComponent>
          <BarScanner onDetected={handleBarcodeDetected} />
          <IconButton onclick={() => setshowReader(false)} style={{ gridRow: "2/2" }}>
            <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
          </IconButton>
        </ModalComponent> : null

      }
      {isFinished ?
        <ModalComponent>
          <ContainerL>
            <Loading></Loading>
          </ContainerL>
        </ModalComponent> : null
      }
      {isAproved ? <Toast message={'Venda Concluida'} color={'#008300'} /> : null}
      {isError ? <Toast message={'Erro, Venda não registrada'} color={'#e02323'} /> : null}
      {errorToastBarCode ? <Toast message={errorToastBarCodeMensage} color={'orange'} /> : null}
      {modalAddUnits && productSelected?.units > 0 ?
        <ModalComponent>
          <Title>Unidades de {productSelected.name}:</Title>
          <ShoppingCart />
          <UnitsComponent data={productSelected} set={setUnits} />
          <div style={{ display: 'flex', flexDirection: "row", width: '90%', alignContent: 'center', justifyContent: 'space-between', padding: "4px" }}>
            <IconButton onclick={() => setmodalAddUnits(false)} style={{ gridRow: "2/2" }}>
              <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
            </IconButton>
            <IconButton onclick={() => handleFinalizeUnits()} style={{ gridRow: "2/2" }}>
              <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Finalizar</p>
            </IconButton>
          </div>
        </ModalComponent> :
        null
      }
      <Container style={{ flexDirection: "row" }} just={'space-around'} border={'none'} aligh={'center'}>
        <Title>Items: {Cart.length}</Title>
        <IconButton onclick={() => setshowReader(true)}>
          <ScanLineIcon size={34} />
        </IconButton>
      </Container>
      <Products>
        {Cart.map((item) =>
          <ProductComponent trash key={item.id + 'cart'} data={item} />
        )}
      </Products>
      {Cart.length > 0 ?
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly", padding: "6px", width: "100%", gap: '6px' }}>
          <Title>Total: R$ {Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)}</Title>
          <ContainerL style={{ width: "240px", 'alignSelf': 'center' }}>
            <div >
              <InputText pholder='a receber' align={'center'} type={'Number'} onKeyDown={(e) => handleExchange(e)} />
              <Title style={{ color: "gray", fontSize: "10pt" }}>Troco : R$ {(exchange - Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)).toFixed(2)}</Title>
            </div>
          </ContainerL>
          <div style={{ display: 'flex', justifyContent: "center", width: "100%", gap: "60px", paddingTop: "8px" }}>
            <IconButton style={{ padding: '4px', border: "1px solid ", borderRadius: '4px' }} onclick={() => handleCancel()}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
            </IconButton>
            <IconButton onclick={() => handleFinalize()} style={{ padding: '6px', border: "1px solid ", borderRadius: '4px', backgroundColor: "black" }}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt", color: 'white' }}>Finalizar</p>
            </IconButton>
          </div>
        </div> : null}

    </Container>
  )
}
