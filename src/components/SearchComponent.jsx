import styled from "styled-components";
import IconButton from "./IconButton";
import { Search } from "lucide-react";

const Container = styled.div`
    width: 90%;
    background-color: #f3f0f0;
    margin: 10px;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    border:1px solid #3a3939;
`
export default function SearchComponent() {
  return (
    <Container>
        <input type="text" style={{border:'none',backgroundColor:'transparent',width:'90%',fontSize:'14pt',textIndent:'10px',outline:'none'} }placeholder='Pesquisar produtos'/>
        <IconButton>
            <Search color="gray"/>
        </IconButton>
    </Container>
  )
}
