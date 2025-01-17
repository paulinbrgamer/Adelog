import Container from "../components/Container";
import SearchComponent from "../components/SearchComponent";
import { useApp } from "./AppProvider";

export default function ProductsScreen() {
  const {storeData} = useApp()
  return (
    <Container border={'none'} just={'center'} aligh={'start'} height={"70dvh"}>
      <SearchComponent/>
      <Container>
      {storeData?.map((obj)=><l1>{obj.name}</l1>)}
      </Container>
    </Container>
  )
}
