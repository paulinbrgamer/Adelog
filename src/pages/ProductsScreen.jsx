import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import ProductComponent from "../components/ProductComponent";
import { useApp } from "./AppProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
const Products = styled.div`
  width:90%;
  overflow-y:scroll;
  padding:10px;
`
export default function ProductsScreen() {
  const {storeData} = useApp()
  const [search,setSearch] = useState('')
  const [filteredProducts,setfilteredProducts] = useState([])

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      const filtered = storeData?.filter((obj)=>obj.name.toLowerCase().includes(search.toLowerCase()))
      setfilteredProducts(filtered)
    }, 300);

    return ()=>clearTimeout(timeoutId)
  },[search,storeData])
  return (
    <Container border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 140px)'}>

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
