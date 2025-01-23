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
import { Select,Option } from "../components/SelectComponent";
import { supabase } from "../services/cliente";
const Products = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  width:90%;
  overflow-y:scroll;
  padding:10px;
`
export default function ProductsScreen() {
  const categorys  = [
    "Alimentos Frescos",
    "Alimentos Industrializados",
    "Bebidas",
    "Produtos de Higiene e Beleza",
    "Limpeza",
    "Produtos Perecíveis",
    "Pet Shop",
    "Produtos de Saúde",
    "Bebês",
    "Eletrônicos e Utilitários"
  ]
  const { storeData } = useApp()
  const [search, setSearch] = useState('')
  const [filteredProducts, setfilteredProducts] = useState([])
  const [addProduct, setaddProduct] = useState(false)
  const [product,setproduct] = useState({name:'',units:0,price:0,category:'',line_code:-1})
  const [ToastError,setToastError] = useState(false)
  const [isAproved,setisAproved] = useState(false)
  const [isError,setisError] = useState(false)
  const [errorMensage,seterrorMensage] = useState('Erro, Produto não cadastrado') 
  const { User } = useAuth()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = storeData?.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
      setfilteredProducts(filtered)
    }, 300);

    return () => clearTimeout(timeoutId)
  }, [search, storeData])
  const createNewProduct = async ()=>{
    
    
     if( product.name.length>0 && product.price>0 && product.units>0 && product.line_code.length>0 && product.category.length>0){
      const {data,error} = await supabase.from('products').insert({...product,store_id : User?.store_id})
      if(error){
        console.log('Error : ',error)
        if(error.code=='23505'){
          seterrorMensage('Erro, Codigo de barras já cadastrado')
        }
        if(error.code=='22P02'){
          seterrorMensage('Erro, Campos inválidos')
        }
        setisError(true)
        setTimeout(() => {
          setisError(false)
        }, 1500);
      }
      else{
        setaddProduct(false)
        setisAproved(true)
        setTimeout(() => {
          setisAproved(false)
        }, 1500);
      }
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
              <InputText  type={'number'} onChange={(e)=>setproduct({...product,price:Number(e.target.value)})} label={'Preço(R$)'}/>
              <InputText type={'number'} onChange={(e)=>setproduct({...product,units:Number(e.target.value)})} label={'Unidades'}/>
              </div>
                <h4>Categoria</h4>
              <Select name="categorias" onChange={(e)=>setproduct({...product,category:e.target.value})}>
                <Option disabled selected>Selecionar</Option>
                {categorys.map((item)=><Option key={item}>{item}</Option>)}
              </Select>
              <InputText type={'number'} onChange={(e)=>setproduct({...product,line_code:e.target.value})} label={'Código de barras'}/>
              <div style={{ display: 'flex', flexDirection: "row", width: '90%', alignContent: 'center', justifyContent: 'space-between', padding: "4px" }}>
                <IconButton onclick={() => setaddProduct(false)} style={{ gridRow: "2/2" }}>
                  <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
                </IconButton>
                <IconButton onclick={() => createNewProduct()} style={{ gridRow: "2/2" }}>
                  <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Finalizar</p>
                </IconButton>
              </div>
            </ModalComponent> : null}

          <IconButton onclick={() => {setaddProduct(true),setproduct({name:'',units:0,price:0,category:'',line_code:-1})}} style={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: '6px' }}>
            <PackagePlus strokeWidth={1.3} />
            <p>Adicionar </p>
          </IconButton>
        </>
        : null
      }
      {isAproved?<Toast message={'Produto cadastrado'} color={'#008300'}/>:null}
      {isError?<Toast message={errorMensage} color={'#e02323'}/>:null}
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
