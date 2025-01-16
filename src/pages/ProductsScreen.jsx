import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";

export default function ProductsScreen() {
  return (
    <Container border={'none'} just={'center'} aligh={'start'} height={"70dvh"}>
      <SearchComponent/>
      <Container just={'center'} aligh={'start'} height={"70dvh"}>

      </Container>
    </Container>
  )
}
