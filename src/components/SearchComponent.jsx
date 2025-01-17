import styled from "styled-components";
import IconButton from "./IconButton";
import { Search } from "lucide-react";

const Container = styled.div`
    width: 90%;
    background-color: #EDEDED;
    margin: 10px;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
`
export default function SearchComponent() {
  return (
    <Container>
              <IconButton>
            <Search color="#6B6B6B"/>
        </IconButton>
        <input type="text" style={{border:'none',backgroundColor:'transparent',width:'90%',fontSize:'16pt',textIndent:'10px',outline:'none',color:"gray"} }placeholder='Pesquisar produtos'/>

    </Container>
  )
}
