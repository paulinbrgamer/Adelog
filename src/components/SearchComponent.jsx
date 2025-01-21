import styled from "styled-components";
import IconButton from "./IconButton";
import { Search } from "lucide-react";

const Container = styled.div`
    width: 90%;
    background-color: #EDEDED;
    margin: 10px;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;

    &:active{
      background-color:   #f7f7f7;
    }
`
export default function SearchComponent({onChange}) {
  return (
    <Container>

        <input onChange={(e)=>onChange(e.target.value)} type="text" style={{border:'none',backgroundColor:'transparent',width:'100%',fontSize:'14pt',textIndent:'10px',outline:'none',color:"gray"} }placeholder='Pesquisar produtos'/>
        <IconButton>
            <Search color="#6B6B6B"/>
        </IconButton>
    </Container>
  )
}
