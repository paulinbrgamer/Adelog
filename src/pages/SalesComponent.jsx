import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { supabase } from "../services/cliente"
import { useApp } from "./AppProvider"
import { Select, Option } from "../components/SelectComponent";
import { CalendarDays, ChartCandlestick, ChevronDown, DollarSign, ShoppingBag, ShoppingBasket, Store } from "lucide-react"
import styled, { createGlobalStyle } from "styled-components"
import Card from "../components/Card"
import CartIcon from '../components/styled/CartIcon'
import BarComponent from "../components/BarComponent";
import ScatterComponent from "../components/LinearComponent";
import LinearComponent from "../components/LinearComponent";
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
const ChartsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;

`
const HistoryContainer = ({ children, drop }) => {
    const HistoryC = styled.div`
    width: 100%;
    overflow: hidden;
    height: ${drop ? 'fit-content' : '0px'};
    `
    return (
        <HistoryC>
            {children}
        </HistoryC>
    )
}
const History = styled.div`
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    grid-template-columns: 10fr 2fr 2fr 2fr;
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
    const [tickets, settickets] = useState([])
    const [filter, setFilter] = useState('day')
    const [MostSale, setMostSale] = useState([])
    const [MostCategory, setMostCategory] = useState([])
    const [isHistoriOpen, setisHistoriOpen] = useState(false)
    const [salesTimes, setsalesTimes] = useState([])
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
            let { data, error } = await supabase.from('tickets').select("*").eq(User.permission == 'adm' ? 'store_id' : 'user_id', User.permission == 'adm' ? User.store_id : User.id).gte('created_at', FilterSalles())
            if (error) {
                console.log('Error : ', error)
            }
            else {
                data = await Promise.all( data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at) ).map( async(ticket) => {
                    const { data: Allsales, error: SalesError } = await supabase.from('sales').select('*').eq('ticket', ticket.id)
                    if (SalesError) {
                        console.log('Error : ', SalesError)
                    }
                    else {
                        ticket['products'] = Allsales.map(e => {
                            const name = storeData.filter(s => s.id === e.id_product)[0]
                            e['name'] = name?.name
                            return e
                        })
                        ticket['created_at'] = new Date(ticket.created_at).toLocaleString('pt-Br')
                        return ticket
                    }
                }))
                setSales(data.reduce((acc,sale)=>{
                    acc.push(...sale.products)
                    return acc
                },[]))
                settickets(data)
                

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
                if (nameP) {
                    acc[nameP.name] = (acc[nameP.name] || 0) + data.units
                }
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
        setsalesTimes(tickets?.reduce((acc, data) => {
            let [dataPart, horaPart] = data.created_at.split(", ");
            const [hora, min, seg] = horaPart.split(":").map(Number);
            acc[hora] = (acc[hora] || 0) + 1
            return acc
        }, {}))

    }, [sales])

    useEffect(() => {
        fetchSales()
    }, [User, storeData, filter])

    return (
        <>
            <GlobalStyle />
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
                {User?.permission === 'adm' &&
                    <>
                        <CardsContainer>
                            <Card Icon={<CartIcon $color={'rgba(252, 122, 0, 0.05)'}><ChartCandlestick strokeWidth={1.4} size={28} color="rgb(252, 122, 0)" /></CartIcon>} data={'R$ ' + sales.reduce((acc, data) => {
                                acc += data.price
                                return acc
                            }, 0).toFixed(2)} title={'Receita Total'} />
                            <Card Icon={<CartIcon $color={'rgba(0, 252, 97, 0.05)'}><DollarSign strokeWidth={1.4} size={28} color="rgb(0, 252, 97)" /></CartIcon>} data={'R$ ' + sales.reduce((acc, data) => {
                                acc += data.profit
                                return acc
                            }, 0).toFixed(2)} title={'Lucro Total'} />
                            <Card Icon={<CartIcon $color={'rgba(247, 0, 255, 0.05)'}><Store strokeWidth={1.4} size={28} color="rgb(197, 0, 223)" /></CartIcon>} data={sales?.reduce((acc, data) => acc += data.units, 0)} title={'Unidades Vendidas'} />
                            <Card Icon={<CartIcon $color={'rgba(0, 119, 255, 0.05)'}><ShoppingBag strokeWidth={1.4} size={28} color="rgb(0, 104, 223)" /></CartIcon>} data={Object.keys(MostCategory)[0]} title={'Categoria  Mais Vendida'} />
                            <Card Icon={<CartIcon $color={'rgba(0, 253, 84, 0.05)'}><ShoppingBasket strokeWidth={1.4} size={28} color="rgb(0, 190, 63)" /></CartIcon>} data={Object.keys(MostSale)[0]} title={'Produto Mais Vendido'} />


                        </CardsContainer>

                        <h3 style={{ color: 'rgb(31 ,41, 55)', padding: "20px 0px", fontWeight: "500" }}>Gráficos</h3>
                        <ChartsContainer>
                            <BarComponent color={"#ffc400"} title={'10 Categorias mais vendidas'}
                                data={Object.entries(MostCategory).map(([produto, vendas]) => ({ Produto: produto, Vendas: vendas })).filter((e, id) => id < 10 && e)}
                            />
                            <BarComponent color={"#7c02ee"} title={'10 Produtos mais vendidos'}
                                data={Object.entries(MostSale).map(([produto, vendas]) => ({ Produto: produto, Vendas: vendas })).filter((e, id) => id < 10 && e)}
                            />
                            <LinearComponent color={"#0260ee"} title={'Relação (Hora/nº de Vendas)'}
                                data={Object.entries(salesTimes).map(([produto, vendas]) => ({ Produto: Number(produto), Vendas: vendas }))} />
                        </ChartsContainer>


                    </>
                
                    }

                <div style={{ display: "flex", alignItems: "center", gap: '4px' }}>
                    <h3 style={{ color: 'rgb(31 ,41, 55)', padding: "20px 0px", fontWeight: "500", alignSelf: "start" }}>Histórico de Vendas</h3>
                    <ChevronDown style={{ cursor: "pointer", transform: isHistoriOpen ? 'rotate(180deg)' : null }} color="rgb(129, 129, 129)" onClick={() => isHistoriOpen ? setisHistoriOpen(false) : setisHistoriOpen(true)}>da</ChevronDown>
                </div>
                <History style={{ width: "100%", borderBottom: '1px solid lightgray' }}>
                    <p style={{ color: "gray" }}>Ticket</p>
                    <p style={{ textAlign: "center", color: "gray" }}></p>
                    <p style={{ textAlign: "center", color: "gray" }}>Produtos</p>
                    <p style={{ textAlign: "center", color: "gray" }}>Data</p>
                </History>
                <HistoryContainer drop={isHistoriOpen}>
                    {tickets.map(e =>
                        <History key={e.id}>
                            <p >{e.id}</p>
                            <p ></p>
                            <p style={{ textAlign: "center", color: "gray" }}>{e.products.length}</p>
                            <p style={{ textAlign: "center"}}>{e.created_at}</p>
                        </History>)}
                </HistoryContainer>
            </Container>
        </>

    )
}
export default SalesComponent