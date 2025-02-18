import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { supabase } from "../services/cliente"
import { useApp } from "./AppProvider"
import { Select, Option } from "../components/SelectComponent";
import { CalendarDays, ChartCandlestick, DollarSign, ShoppingBag, ShoppingBasket, Store } from "lucide-react"
import styled,{createGlobalStyle } from "styled-components"
import Card from "../components/Card"
import CartIcon from '../components/styled/CartIcon'
const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const Container = styled.div`
  align-items: center;
  background-color: transparent;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 5%;
  overflow-y: scroll;
`
const HistoryContainer = styled.div`
    width: 100%;
    min-height: 0;
`
const History = styled.div`
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    grid-template-columns: 10fr 2fr 2fr 100px;
    background-color: white;
    &:hover{
        background-color: #faf9f9;
    }       
`
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`
const SalesComponent = () => {
    const { User } = useAuth()
    const { storeData, categorys } = useApp()
    const [sales, setSales] = useState([])
    const [filter, setFilter] = useState('day')
    const [MostSale, setMostSale] = useState([])
    const [MostCategory, setMostCategory] = useState([])
    const FilterSalles = () => {
        const todayFilter = () => {
            const today = new Date();
            const todatmidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
            return todatmidnight.toISOString();
        }
        const monthFilter = () => {
            const today = new Date();
            const fistDayMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
            return fistDayMonth.toISOString();
        }
        const yearFilter = () => {
            const today = new Date();
            const fistdayYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
            return fistdayYear.toISOString();
        }
        const weekFilter = () => {
            const today = new Date();
            const weekDay = today.getDay();
            const FistDayweek = new Date(today);
            FistDayweek.setDate(today.getDate() - weekDay);
            FistDayweek.setHours(0, 0, 0, 0);

            return FistDayweek.toISOString();
        }
        switch (filter) {
            case 'day':
                return todayFilter()
            case 'week':
                return weekFilter()
            case 'month':
                return monthFilter()
            case 'year':
                return yearFilter()
            default:
                break;
        }

    }
    const fetchSales = async () => {
        if (User) {
            const { data, error } = await supabase.from('sales').select("*").eq(User.permission == 'adm' ? 'store_id' : 'user_id', User.permission == 'adm' ? User.store_id : User.id).gte('date', FilterSalles())
            if (error) {
                console.log('Error : ', error)
            } else {
                const SortedDate = data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setSales(SortedDate.map(item => {
                    const date = new Date(item.date).toLocaleString('pt-br')
                    const nameItem = storeData.filter((product) => item.id_product == product.id)
                    item['name'] = nameItem[0]?.name
                    item.date = date
                    return item
                }))
            }
        }
    }
    useEffect(() => {
        //Verificar qual é o produto que mais vende
        const Mapcount = sales?.reduce((acc, data) => {
            acc[data.name] = (acc[data.name] || 0) + data.units
            return acc
        }, {})
        const MCategory = sales?.reduce((acc, data) => {
            const idSale = storeData.filter(e => e.id == data.id_product)[0]
            if (idSale) {
                const nameP = categorys.filter(e => e.id === idSale.category)[0]
                acc[nameP.name] = (acc[nameP.name] || 0) + data.units
            }
            return acc
        }, {})
        setMostCategory(Object.entries(MCategory).sort(([, a], [, b]) => b - a).reduce((acc, data) => {
            acc[data[0]] = data[1]
            return acc
        }, {}))
        setMostSale(Object.entries(Mapcount).sort(([, a], [, b]) => b - a).reduce((acc, data) => {
            acc[data[0]] = data[1]
            return acc
        }, {}))

    }, [sales])

    useEffect(() => {
        fetchSales()
    }, [User, storeData, filter])

    return (
        <>
        <GlobalStyle/>
        <Container  >
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <h2 style={{ color: 'rgb(31 ,41, 55)', padding: "20px 0px", fontWeight: "500" }}>Análise de Vendas</h2>
                <CalendarDays color="gray" style={{ marginLeft: 'auto', padding: "6px" }} />
                <Select onChange={(e) => setFilter(e.target.value)} style={{ border: "none", color: "gray", textAlign: "center", backgroundColor: "white" }}>
                    <Option value="day">Dia</Option>
                    <Option value="week">Semana</Option>
                    <Option value="month">Mes</Option>
                    <Option value="year">Ano</Option>
                </Select>
            </div>
            <CardsContainer>
                <Card Icon={<CartIcon $color={'rgba(252, 122, 0, 0.05)'}><ChartCandlestick strokeWidth={1.4} size={28} color="rgb(252, 122, 0)" /></CartIcon>} data={'R$ ' + sales.reduce((acc, data) => {
                    acc += data.price
                    return acc
                }, 0).toFixed(2)} title={'Receita Total'} />
                <Card Icon={<CartIcon $color={'rgba(0, 252, 97, 0.05)'}><DollarSign strokeWidth={1.4} size={28} color="rgb(0, 252, 97)" /></CartIcon>} data={'R$ ' + sales.reduce((acc, data) => {
                    acc += data.profit
                    return acc
                }, 0).toFixed(2)} title={'Lucro Total'} />
                <Card Icon={<CartIcon $color={'rgba(247, 0, 255, 0.05)'}><Store strokeWidth={1.4} size={28} color="rgb(197, 0, 223)" /></CartIcon>} data={sales.length} title={'Vendas Realizadas'} />
                <Card Icon={<CartIcon $color={'rgba(0, 119, 255, 0.05)'}><ShoppingBag strokeWidth={1.4} size={28} color="rgb(0, 104, 223)" /></CartIcon>} data={Object.keys(MostCategory)[0]} title={'Categoria  Mais Vendida'} />
                <Card Icon={<CartIcon $color={'rgba(0, 253, 84, 0.05)'}><ShoppingBasket strokeWidth={1.4} size={28} color="rgb(0, 190, 63)" /></CartIcon>} data={Object.keys(MostSale)[0]} title={'Produto Mais Vendido'} />


            </CardsContainer>
            <h3 style={{ color: 'rgb(31 ,41, 55)', padding: "20px 0px", fontWeight: "500", alignSelf: "start" }}>Histórico de Vendas</h3>
            <History style={{ width: "100%", borderBottom: '1px solid lightgray' }}>
                <p style={{ color: "gray" }}>Produto</p>
                <p style={{ textAlign: "center", color: "gray" }}>Itens</p>
                <p style={{ textAlign: "center", color: "gray" }}>Total(R$)</p>
                <p style={{ textAlign: "center", color: "gray" }}>Data</p>
            </History>
            <HistoryContainer>
                {sales.map(e =>
                    <History key={e.id}>
                        <p style={{ color: e.name ? null : 'red' }}>{e.name || 'Excluído'}</p>
                        <p style={{ textAlign: "center", color: "gray" }}>{e.units}</p>
                        <p style={{ textAlign: "center" }}>{e.price}</p>
                        <p style={{ textAlign: "center" }}>{e.date}</p>
                    </History>)}
            </HistoryContainer>
        </Container>
        </>

    )
}
export default SalesComponent