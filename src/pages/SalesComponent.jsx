import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import styled from "styled-components"
import { supabase } from "../services/cliente"
import { fdInOut } from "../components/FdInOt"
import TableComponent from "../components/TableComponent"
import { useApp } from "./AppProvider"
import Container from "../components/Container"
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
    `

const SalesComponent = ()=>{
    const {User} = useAuth()
    const {storeData} = useApp()
    const [sales,setSales] = useState([])
    useEffect(() => {
        const fetchSales = async ()=>{
            const {data,error} = await supabase.from('sales').select("*").eq('user_id',User?.id)
            if(error){
                console.log('Error : ',error)
            }else{
                const SortedDate = data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setSales(SortedDate.map(item=>{
                    const date = new Date(item.date).toLocaleString()
                    const nameItem = storeData.filter((product)=>item.id_product==product.id)
                    item.id_product = nameItem[0]?.name 
                    item.date = date
                    return item
                }))
                
            }
        }
        fetchSales()
    }, [User,storeData])
    
    return (
        <Container shadow = {'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} border={'none'} height={'calc(100% - 160px)'} style={{overflow:'scroll'}} aligh={'none'}>
            
            <TableComponent data={sales} header={['Nome','Unidades','Total(R$)','Data']}/>
        </Container>
    )
}
export default SalesComponent