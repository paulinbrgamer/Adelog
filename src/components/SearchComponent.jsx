import styled from "styled-components";
import IconButton from "./IconButton";
import { Search } from "lucide-react";
const Container = styled.div`
    padding: 8px;
    border: 1px solid #d9dadd;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    outline-color: black;
    background-color: white;

`
export default function SearchComponent({onChange}) {
  return (
    <Container>
        <input onChange={(e)=>onChange(e.target.value)} type="text" style={{border:'none',backgroundColor:'transparent',width:'100%',fontSize:'12pt',textIndent:'10px',outline:'none',color:"#475569"} }placeholder='Pesquisar produtos'/>
        <IconButton>
            <Search size={22} color="#6B6B6B"/>
        </IconButton>
    </Container>
  )
}
