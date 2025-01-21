import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import ProductComponent from "../components/ProductComponent";
import { useApp } from "./AppProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PackagePlus   } from "lucide-react";
import IconButton from "../components/IconButton";
import { useAuth } from "../auth/Authprovider";
const Products = styled.div`
  width:90%;
  overflow-y:scroll;
  padding:10px;
`
export default function ProductsScreen() {
  const {storeData} = useApp()
  const [search,setSearch] = useState('')
  const [filteredProducts,setfilteredProducts] = useState([])
  const {addProduct,setaddProduct} = useState(false)
  const {User} = useAuth()
  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      const filtered = storeData?.filter((obj)=>obj.name.toLowerCase().includes(search.toLowerCase()))
      setfilteredProducts(filtered)
    }, 300);

    return ()=>clearTimeout(timeoutId)
  },[search,storeData])
  return (
    <Container shadow = {'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 160px)'}>
      {User?.permission == 'adm'?
      <IconButton style={{display:'flex',justifyContent:"center",alignItems:'center',gap:'6px'}}>
        <PackagePlus strokeWidth={1.3}/>
        <p>Adicionar </p>
      </IconButton>:null
        }

      <SearchComponent onChange={setSearch}/>
      <Products >
        {search?filteredProducts?.map((obj,id)=>
        <ProductComponent cart key={obj?.id || id} data={obj}/>
        ):storeData.map((obj,id)=>
        <ProductComponent cart key={obj?.id || id} data={obj}/>
        )}
      </Products>
    </Container>
  )
}
