import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { supabase } from "../services/cliente"
import TableComponent from "../components/TableComponent"
import { useApp } from "./AppProvider"
import Container from "../components/styled/Container"
const ContainerStyle = {
    overflow: 'scroll',
    minHeight: 0,
    width:'90%',
    padding:10,
}

const SalesComponent = () => {
    const { User } = useAuth()
    const { storeData } = useApp()
    const [sales, setSales] = useState([])
    useEffect(() => {
        const fetchSales = async () => {
            const { data, error } = await supabase.from('sales').select("*").eq(User?.permission == 'adm' ? 'store_id' : 'user_id', User?.permission == 'adm' ? User.store_id : User?.id)
            if (error) {
                console.log('Error : ', error)
            } else {
                const SortedDate = data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setSales(SortedDate.map(item => {
                    const date = new Date(item.date).toLocaleString()
                    const nameItem = storeData.filter((product) => item.id_product == product.id)
                    item.id_product = nameItem[0]?.name
                    item.date = date
                    return item
                }))

            }
        }
        fetchSales()
    }, [User, storeData])

    return (
        <Container style={ContainerStyle} >
            <h2 style={{color:'rgb(31 ,41, 55)'}}>Histórico de Vendas</h2>
            <TableComponent data={sales} header={['Nome', 'Unidades', 'Total(R$)', 'Data']} />
        </Container>
    )
}
export default SalesComponent