import Container from "../components/styled/Container";
import SearchComponent from "../components/SearchComponent";
import ProductComponent from "../components/ProductComponent";
import { useApp } from "./AppProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PackagePlus, } from "lucide-react";
import IconButton from "../components/IconButton";
import { useAuth } from "../auth/Authprovider";
import ModalComponent from "../components/ModalComponent";
import Toast from "../components/Toast";
import { supabase } from "../services/cliente";
import { ProductForm } from "../components/ProductForm";
import { ContainerL, Loading } from "../components/styled/Loading";
import { fdInOut } from "../components/FdInOt";
const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  overflow-y:scroll;
  border-top: 1px solid lightgray;
  @media (min-width: 900px){
    border-top-left-radius: 0px;
    height: 80dvh;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    background-color: #ffffff;
  }
`
const customContainer = {
  backgroundColor:'transparent',
  alignItems: "center",
  minHeight: 0,
  width:'clamp(100px,90%,1800px)'
}
const TitleContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  width:100%;
  align-items:center;
  background-color:transparent;
  flex-wrap:wrap;
@media (min-width: 900px){
  justify-content:space-between;
  padding: 20px;
}
`
const HeaderProducts = styled.div`

  display: none;
  border-radius: 4px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 5fr 1fr 1fr;
  justify-content: end;
  box-sizing: border-box;
  gap: 4px;
  animation: ${fdInOut} 300ms ease-in-out;
  padding: 10px;
  transition: background-color ease-in-out 200ms;
  @media (min-width:900px){
      display: grid;
      background-color: #f4f4f4;
      width: 100%;
      grid-template-columns: 8fr 80px 80px 40px 40px;
      grid-template-rows: 1fr;
      gap: 15px;
      align-items: center;
  }
`
export default function ProductsScreen() {
  //states for ProductForm and create product
  const productTemplate = { name: '', units: 0, price: 0, category: '', line_code: '' }
  const [product, setproduct] = useState(productTemplate)
  const [addProduct, setaddProduct] = useState(false)
  const [ToastError, setToastError] = useState(false)
  const [Barcode, setBarcode] = useState('')
  const [ShowReader, setShowReader] = useState(false)
  const [ToastAproved, setToastAproved] = useState(false)
  const [errorMensage, seterrorMensage] = useState('Erro, Produto não cadastrado')
  const [aproveMensage, setaproveMensage] = useState('')
  const [isLoading, setisLoading] = useState(false)
  //--------States for stock managemant
  const { storeData, categorys } = useApp()
  const [search, setSearch] = useState('')
  const [filteredProducts, setfilteredProducts] = useState([])
  const { User } = useAuth()
  const showToast = (setToastVisible) => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500); // Exibe por 3 segundos
  };
  //debounce useEffect para pesquisa de produtos
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = storeData?.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
      setfilteredProducts(filtered)
    }, 300);
    return () => clearTimeout(timeoutId)
  }, [search, storeData])
  //func executed when Barcode is detected
  const handleBarcodeDetected = (barcode) => {
    setBarcode(barcode)
    if (Barcode > 0) {
      setShowReader(false)
    }
    setproduct({ ...product, line_code: Number(Barcode) })
  };
  //func actived when user click on Finalize
  const createNewProduct = async () => {
    //validar os campos do form
    if (product.name.length > 0 && product.price > 0 && product.units > 0 && product.line_code.toString().length > 0 && product.category.toString().length > 0) {
      setisLoading(true)
      const { error } = await supabase.from('products').insert({ ...product, store_id: User?.store_id })
      if (error) {
        console.log('Error : ', error)
        if (error.code == '23505') {
          seterrorMensage('Erro, Codigo de barras já cadastrado')
        }
        if (error.code == '22P02') {
          seterrorMensage('Erro, Campos inválidos')
        }
        showToast(setToastError)
        setisLoading(false)
      }
      else {
        setaddProduct(false)
        setaproveMensage("Produto Cadastrado")
        showToast(setToastAproved)
        setisLoading(false)
      }
    } else {
      seterrorMensage('Preencha todos os campos')
      showToast(setToastError)
    }
  }

  return (
    <Container style={customContainer} >
      {isLoading && <ModalComponent><ContainerL> <Loading /></ContainerL></ModalComponent>}
      {ToastError && <Toast $color='red'>{errorMensage}</Toast>}
      {ToastAproved && <Toast $color={'#008300'}>{aproveMensage}</Toast>}
      <TitleContainer>
        
        <Container style={{flexDirection:"row",width:'fit-content',gap:'10px',backgroundColor:'transparent'}}>
        <h2 style={{color:'rgb(31 ,41, 55)'}}>Estoque de Produtos</h2>

        {User?.permission == 'adm' ?
        <>
          {addProduct ?
            <ModalComponent>
              <ProductForm
                product={product}
                setproduct={setproduct}
                categorys={categorys}
                setShowReader={setShowReader}
                ShowReader={ShowReader}
                handleBarcodeDetected={handleBarcodeDetected}
                setaddProduct={setaddProduct}
                createNewProduct={createNewProduct}
                title={'Cadastrar Produto'}
              />

            </ModalComponent>
            : null}
          <IconButton onclick={() => { setaddProduct(true), setproduct(productTemplate) }} style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <PackagePlus strokeWidth={1.3} />
          </IconButton>
        </>
        : null
      } 
      </Container>
      <SearchComponent onChange={setSearch} />
      </TitleContainer>
      <HeaderProducts>
        <p>Produto</p>
        <p style={{textAlign:"center"}}>Unidades</p>
        <p style={{textAlign:"center"}}>Preço</p>
        <p style={{textAlign:"center",gridColumn:"4/6"}}>Ações</p>
      </HeaderProducts>
      <Products >
        {search ? filteredProducts?.map((obj, id) =>
          <ProductComponent cart key={obj?.id || id} data={obj} />
        ) : storeData.map((obj, id) =>
          <ProductComponent cart key={obj?.id || id} data={obj} />
        )}
      </Products>
    </Container>
  )
}
