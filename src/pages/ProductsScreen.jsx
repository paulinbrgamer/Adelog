import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import ProductComponent from "../components/ProductComponent";
import { useApp } from "./AppProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import IconButton from "../components/IconButton";
import { useAuth } from "../auth/Authprovider";
import ModalComponent from "../components/ModalComponent";
import InputText from "../components/InputText";
import Toast from "../components/Toast";
const Products = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  width:90%;
  overflow-y:scroll;
  padding:10px;
`
export default function ProductsScreen() {
  const { storeData } = useApp()
  const [search, setSearch] = useState('')
  const [filteredProducts, setfilteredProducts] = useState([])
  const [addProduct, setaddProduct] = useState(false)
  const [product,setproduct] = useState({name:'',units:0,price:0})
  
  const [ToastError,setToastError] = useState(false)

  const { User } = useAuth()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = storeData?.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
      setfilteredProducts(filtered)
    }, 300);

    return () => clearTimeout(timeoutId)
  }, [search, storeData])
  const createNewProduct = ()=>{
     if( product.name.length>0 && product.price>0 && product.units>0){
      console.log('Validado')
     }
     else{
      setToastError(true)
      setTimeout(() => {
        setToastError(false)
      }, 1500);
     }
      
  }
  return (
    <Container shadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 160px)'}>

      {User?.permission == 'adm' ?
        <>
          {addProduct ?
            <ModalComponent>
              {ToastError?<Toast message={'Preencha todos os campos'} color={'#e02323'}/>:null}
              <h4>Cadastrar produto </h4>
              <InputText label={'Nome'} onChange={(e)=>setproduct({...product,name:e.target.value})}/>
              <div style={{display:"flex",gap:"4px",padding:'4px'}}>
              <InputText  type={'number'} onChange={(e)=>setproduct({...product,price:e.target.value})} label={'Preço'}/>
              <InputText type={'number'} onChange={(e)=>setproduct({...product,units:e.target.value})} label={'Unidades'}/>
              </div>
              <div style={{ display: 'flex', flexDirection: "row", width: '90%', alignContent: 'center', justifyContent: 'space-between', padding: "4px" }}>
                <IconButton onclick={() => setaddProduct(false)} style={{ gridRow: "2/2" }}>
                  <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
                </IconButton>
                <IconButton onclick={() => createNewProduct()} style={{ gridRow: "2/2" }}>
                  <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Finalizar</p>
                </IconButton>
              </div>
            </ModalComponent> : null}
          <IconButton onclick={() => setaddProduct(true)} style={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: '6px' }}>
            <PackagePlus strokeWidth={1.3} />
            <p>Adicionar </p>
          </IconButton>
        </>
        : null
      }

      <SearchComponent onChange={setSearch} />
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
