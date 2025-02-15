import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { supabase } from "../services/cliente"
import { useApp } from "./AppProvider"
import Container from "../components/styled/Container"
import { Select, Option } from "../components/SelectComponent";
import { CalendarDays, Package2, ShoppingBasket, TrendingUp } from "lucide-react"
import styled from "styled-components"
import Card from "../components/Card"
import CartIcon from '../components/styled/CartIcon'
const Title = styled.p`
font-weight: 600;
font-size: 11pt ;
color:  rgb(31 ,41, 55) ;
    `
const ContainerStyle = {
    alignItems: 'center',
    backgroundColor: "transparent",
    minHeight: 0,
    width: '90%',
}
const HistoryContainer = styled.div`
    width: 100%;
    min-height: 0;
    overflow-y: scroll;
    max-height: 60dvh;
`
const History = styled.div`
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    grid-template-columns: 14fr 1fr 1fr 3fr;
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
    const { storeData } = useApp()
    const [sales, setSales] = useState([])
    const [filter, setFilter] = useState('day')
    const [MostSale, setMostSale] = useState('')
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
    //Verificar qual é o produto que mais vende
    useEffect(() => {
        const Mapcount = sales?.reduce((acc, data) => {
            acc[data.name] = (acc[data.name] || 0) + data.units
            return acc
        }, {})
        const theMost = Object.keys(Mapcount).reduce((acc, data) => {
            if (Mapcount[data] >= acc[1]) {
                acc[1] = Mapcount[data]
                acc[0] = data
            }
            return acc
        }, ['', 0])
        setMostSale(theMost[0])

    }, [sales])

    useEffect(() => {
        fetchSales()
    }, [User, storeData, filter])

    return (
        <Container style={ContainerStyle} >
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
                <Card Icon={<CartIcon $color={'rgba(0, 255, 85, 0.032)'}><ShoppingBasket strokeWidth={1.4} size={28} color="rgb(0, 182, 76)" /></CartIcon>} data={sales.length} title={'Vendas Realizadas'} />
                <Card Icon={<CartIcon $color={'rgba(247, 0, 255, 0.032)'}><TrendingUp strokeWidth={1.4} size={28} color="rgb(197, 0, 223)" /></CartIcon>} data={MostSale} title={'Produto Mais Vendido'} />
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
                        <p >{e.name || 'Apagado'}</p>
                        <p style={{ textAlign: "center", color: "gray" }}>{e.units}</p>
                        <p style={{ textAlign: "center" }}>{e.price}</p>
                        <p style={{ textAlign: "center" }}>{e.date}</p>
                    </History>)}
            </HistoryContainer>
        </Container>

    )
}
export default SalesComponent