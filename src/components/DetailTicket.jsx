import { X } from "lucide-react"
import ModalComponent from "./ModalComponent"
import styled from "styled-components"
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
function DetailTicket({ setisDetailTicketOpen, isDetailTicketOpen, DetailTicketData }) {
    if (isDetailTicketOpen) {
        return (
            <ModalComponent style={{ width: 'clamp(100px,90%,600px)', height: '80dvh' }}>
                <X onClick={() => setisDetailTicketOpen(false)} color="gray" size={20} style={{ cursor: 'pointer', marginLeft: "auto" }} />
                <header style={{ display: "flex", justifyContent: "center", width: "90%" }}><h3 >Detalhes do Ticket</h3> </header>
                <div style={{ display: 'flex', flexDirection: "column", alignContent: "start", width: "90%", border: "1px solid lightgray", padding: "20px", boxSizing: "border-box", borderRadius: "4px", gap: "10px" }}>
                    <div style={{ display: 'flex', gap: "10px" }}>
                        <p>ID :  </p>
                        <p style={{ color: "gray" }}>{DetailTicketData.id}</p>
                    </div>
                    <div style={{ display: 'flex', gap: "10px" }}>
                        <p>Produtos :  </p>
                        <p style={{ color: "gray" }}>{DetailTicketData.products.length}</p>
                    </div>
                    <div style={{ display: 'flex', gap: "10px" }}>
                        <p>Valor Total :  </p>
                        <p style={{ color: "gray" }}>R$ {DetailTicketData.products.reduce((acc, data) => { return acc += data.price }, 0)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: "10px" }}>
                        <p>Data de venda:  </p>
                        <p style={{ color: "gray" }}>{DetailTicketData.created_at}</p>
                    </div>
                    <div style={{ display: 'flex', gap: "10px" }}>
                        <p>Vendedor:  </p>
                        <p style={{ color: "gray" }}>{DetailTicketData.saller}</p>
                    </div>
                </div>
                <header style={{ display: "flex", justifyContent: "center", width: "90%" }}><h3>Produtos</h3> </header>
                <div style={{ display: 'flex', flexDirection: "column", alignContent: "start", width: "90%", flexGrow: "1", overflow: "scroll", border: "1px solid lightgray", boxSizing: "border-box", borderRadius: "4px", gap: "10px" }}>

                    <div>
                    <History style={{ width: "100%", backgroundColor:"rgb(245, 245, 245)",borderBottom:"1px solid lightgray" }}>
                        <p style={{ color: "gray" }}>Produto</p>
                        <p style={{ textAlign: "center", color: "gray" }}></p>
                        <p style={{ textAlign: "center", color: "gray" }}>Itens</p>
                        <p style={{ textAlign: "center", color: "gray" }}>Valor(R$)</p>
                    </History>

                        {DetailTicketData.products.map(e =>
                            <History key={e.id} style={{borderBottom:"1px solid lightgray"}}>
                                <p style={{ color: "gray" }}>{e.name}</p>
                                <p style={{ textAlign: "center", color: "gray" }}></p>
                                <p style={{ textAlign: "center", color: "gray" }}>{e.units}</p>
                                <p style={{ textAlign: "center", color: "gray" }}>{e.price}</p>
                            </History>)}
                    </div>
                </div>
            </ModalComponent>
        )
    }
    else{
        return null
    }
}

export default DetailTicket