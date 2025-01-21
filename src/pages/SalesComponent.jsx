import { useEffect, useState } from "react"
import { useAuth } from "../auth/Authprovider"
import styled from "styled-components"
import { supabase } from "../services/cliente"
import { fdInOut } from "../components/FdInOt"
import TableComponent from "../components/TableComponent"
import { useApp } from "./AppProvider"
    
const Container = styled.div`
    background-color: white;
    width:95%;
    height:  ${(props) => props.$height };
    border: ${(props) => props.$border };
    display: flex;
    align-items: ${(props) => props.$just };
    flex-direction: column;
    justify-content:${(props) => props.$aligh };
    border-radius: 6px;
    opacity: 1;
    overflow: scroll;
    animation: ${fdInOut} 300ms ease;
`
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
                    
                    item.date = date
                    return item
                }))
                
            }
        }
        fetchSales()
    }, [User,storeData])
    
    return (
        <Container $border={'none'} $height={'calc(100% - 140px)'}>
            <TableComponent data={sales} header={['Nome','Unidades','Total(R$)','Data']}/>
        </Container>
    )
}
export default SalesComponent