import { useState, useEffect } from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
import { styled } from 'styled-components'
import Container from '../components/styled/Container'
import IconButton from '../components/IconButton'
import ModalComponent from '../components/ModalComponent'
import { supabase } from "../services/cliente";
import Toast from '../components/Toast'
import { useAuth } from '../auth/Authprovider'
import InputText from '../components/InputText'
import { ScanBarcode, ScanLineIcon, ShoppingCart } from 'lucide-react'
import BarScanner from '../components/BarScanner'
import UnitsComponent from '../components/UnitsComponent'
import { ContainerL, Loading } from '../components/styled/Loading'
import { CreateProduct, HeaderProducts } from './ProductsScreen'
const Title = styled.p`
  font-weight: 600;
  font-size: 14pt ;
  text-align: center;
    `
const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  overflow-y:scroll;
  border-top: 1px solid lightgray;
  height: 80dvh;
  @media (min-width: 900px){
    border-top-left-radius: 0px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    background-color: #ffffff;
  }

`
const styleMainContainer = {
  minHeight: 0,
  backgroundColor: "transparent"
}
const GridOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
const ContainerInfoCart = styled.div`
  box-sizing: border-box;
  align-content: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  align-self: center;
  @media (min-width: 900px) {
    width: clamp(100px,40%,500px);
    justify-content: space-between;
    border-top: 1px solid lightgray;
    padding: 30px;
    
  }
`

export default function SellScreen() {
  const { Cart, setCart, storeData } = useApp()
  const [isFinished, setisFinished] = useState(false)
  const [ToastAproved, setToastAproved] = useState(false)
  const [ToastError, setToastError] = useState(false)
  const [errorMensage, seterrorMensage] = useState('Erro, Produto não cadastrado')
  const [aproveMensage, setaproveMensage] = useState('')
  const [ShowReader, setshowReader] = useState(false)
  const [productSelected, setproductSelected] = useState(null)
  const [modalAddUnits, setmodalAddUnits] = useState(false)
  const [Units, setUnits] = useState(null)
  const { User } = useAuth()
  const [exchange, setExchange] = useState(0)
  const showToast = (setToastVisible) => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500); // Exibe por 3 segundos
  };
  useEffect(() => {
    setExchange(Cart?.reduce((acc, obj) => acc += obj.price, 0).toFixed(2))
  }, [Cart]);
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
      const { error } = await supabase.rpc('decrement_stock', { product_id: item.id, quantity: item.units })
      if (error) {
        errorCart.push(item)
        setisFinished(false)
        seterrorMensage('Erro, Venda não registrada')
        showToast(setToastError)
      }
      else {
        const { id, name, category, line_code, ...rest } = item
        const date = new Date()

        const sale = { ...rest, id_product: id, user_id: User.id, store_id: User.store_id, date: date.toISOString() }
        const { error: saleError } = await supabase.from('sales').insert([sale])
        if (saleError) {
          console.log('Error sale : ', saleError)

        }

        setTimeout(() => {
          setisFinished(false)
          setaproveMensage('Venda Registrada')
          showToast(setToastAproved)

        }, 800);

      }
    });
    setCart(errorCart)
  }
  const handleBarcodeDetected = (barcode) => {
    if (storeData.filter(item => item.line_code == barcode && item.units > 0).length == 0) {
      seterrorMensage('Produto Indisponivel')
      showToast(setToastError)
      setmodalAddUnits(false)
    } else {
      setproductSelected(...storeData.filter(item => item.line_code == barcode && item.units > 0))
      setmodalAddUnits(true)

    }
    setshowReader(false)
  }
  const handleFinalizeUnits = () => {
    if (Units > 0) {
      let newState = Cart?.filter((Obj) => Obj.id != productSelected.id)
      newState.push({ ...productSelected, units: Units, price: Number(Units * productSelected.price) })
      setCart(newState)
      setmodalAddUnits(false)
      setproductSelected(null)
    }

  }
  return (
    <Container style={styleMainContainer} >
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
      {ToastError && <Toast $color='red'>{errorMensage}</Toast>}
      {ToastAproved && <Toast $color={'#008300'}>{aproveMensage}</Toast>}
      {modalAddUnits && productSelected?.units > 0 ?
        <ModalComponent>
          <Title>Unidades de {productSelected.name}:</Title>
          <ShoppingCart />
          <UnitsComponent data={productSelected} set={setUnits} finalize={handleFinalizeUnits()}/>
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
      <Container style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center" }}>
        <h2 style={{ color: 'rgb(31 ,41, 55)', padding: "10px", alignSelf: "start" }}>Carrinho de Produtos</h2>
        <ScanBarcode color='gray' style={{cursor:"pointer"}} onClick={() => setshowReader(true)}></ScanBarcode>
        <CreateProduct style={{ marginLeft: '36px' }} >
          <p style={{ color: "white" }}>Adicionar ao carrinho</p>
        </CreateProduct>
      </Container>
      
      <HeaderProducts>
        <p style={{ color: "gray" }}>Produto</p>
        <p style={{ textAlign: "center", color: "gray" }}>Unidades</p>
        <p style={{ textAlign: "center", color: "gray" }}>Preço</p>
        <p style={{ textAlign: "center", gridColumn: "4/6", color: "gray" }}>Ações</p>
      </HeaderProducts>
      <Products>
        {Cart.map((item) =>
          <ProductComponent trash key={item.id + 'cart'} data={item} />
        )}
      </Products>
      {Cart.length > 0 ?
        <ContainerInfoCart>
          <InputText pholder='Valor a receber(R$)' align={'center'} type={'Number'} onKeyDown={(e) => handleExchange(e)} />

          <GridOptions>
            <Title style={{ color: "gray", fontSize: "12pt" }}>Total: R$ {Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)}</Title>
            <Title style={{ color: "gray", fontSize: "12pt" }}>Troco : R$ {(exchange - Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)).toFixed(2)}</Title>

            <IconButton style={{ padding: '6px', border: "1px solid ", borderRadius: '4px' }} onclick={() => setCart([])}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
            </IconButton>

            <IconButton onclick={() => handleFinalize()} style={{ padding: '6px', border: "1px solid ", borderRadius: '4px', backgroundColor: "black" }}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt", color: 'white' }}>Finalizar</p>
            </IconButton>
          </GridOptions>
        </ContainerInfoCart> 
        : null
      }
    </Container>
  )
}
