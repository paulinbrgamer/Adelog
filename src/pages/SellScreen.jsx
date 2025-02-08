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
import { ScanLineIcon, ShoppingCart } from 'lucide-react'
import BarScanner from '../components/BarScanner'
import UnitsComponent from '../components/UnitsComponent'
import { ContainerL, Loading } from '../components/styled/Loading'
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
const styleMainContainer = {
  alignItems: 'center',
  minHeight: 0,
}
const ContainerInfoCart = styled.div`
  box-sizing: border-box;
  align-content: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  @media (min-width: 900px) {
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
      setproductSelected(...storeData.filter(item => item.line_code == barcode&& item.units > 0))
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
      <h2 style={{color:'rgb(31 ,41, 55)'}}>Carrinho de Produtos</h2>
      <Container style={{ flexDirection: "row", borderBottom: '1px solid lightgray', borderRadius: '0px' }} >
        <Title >Items: {Cart.length}</Title>
        <IconButton style={{ marginLeft: '36px' }} onclick={() => setshowReader(true)}>
          <ScanLineIcon color='orange' size={34} />
        </IconButton>
      </Container>
      <Products>
        {Cart.map((item) =>
          <ProductComponent trash key={item.id + 'cart'} data={item} />
        )}
      </Products>
      {Cart.length > 0 ?
        
          <ContainerInfoCart style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
          <ContainerL style={{  'alignSelf': 'center' ,gap:"20px"}}>
          <Title >Total: R$ {Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)}</Title>
            <div >
              <InputText pholder='a receber' align={'center'} type={'Number'} onKeyDown={(e) => handleExchange(e)} />
              <Title style={{ color: "gray", fontSize: "10pt" }}>Troco : R$ {(exchange - Cart.reduce((acc, obj) => acc += obj.price, 0).toFixed(2)).toFixed(2)}</Title>
            </div>
          </ContainerL>
          <div style={{ display: 'flex', justifyContent: "center", gap: "60px", paddingTop: "8px" }}>
            <IconButton style={{ padding: '4px', border: "1px solid ", borderRadius: '4px' }} onclick={() => setCart([])}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
            </IconButton>
            <IconButton onclick={() => handleFinalize()} style={{ padding: '6px', border: "1px solid ", borderRadius: '4px', backgroundColor: "black" }}>
              <p style={{ fontWeight: 'normal', fontSize: "12pt", color: 'white' }}>Finalizar</p>
            </IconButton>
          </div>
          
          
        </ContainerInfoCart> : null}

    </Container>
  )
}
