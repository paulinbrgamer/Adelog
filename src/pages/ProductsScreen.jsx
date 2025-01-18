import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import ProductComponent from "../components/ProductComponent";
import { useApp } from "./AppProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
const Products = styled.div`

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
  },[search])
  return (
    <Container border={'none'} just={'center'} aligh={'start'} height={'calc(100% - 140px)'}>

      <SearchComponent onChange={setSearch}/>
      <Products style={{width:"90%",overflowY:"scroll",padding:"10px",}}>
        {search?filteredProducts?.map((obj,id)=>
        <ProductComponent cart key={obj?.id || id} data={obj}/>
        ):storeData.map((obj,id)=>
        <ProductComponent cart key={obj?.id || id} data={obj}/>
        )}
      </Products>
    </Container>
  )
}
