import styled from "styled-components"
import { XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Loading, ContainerL } from '../components/styled/Loading'
import { SquareChartGantt, X } from "lucide-react";
import ModalComponent from "./ModalComponent";
import { useState } from "react";
const HistoryC = styled.div`
width: 100%;
overflow: scroll;
`
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
const GraphContainer = styled.div`
display: flex;
flex-direction: column;
box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
box-sizing: border-box;
border-radius: 8px;
padding:  20px;
flex-grow: 1;
width: clamp(200px,100%,300px);
height: clamp(100px,100dvh,300px) ;
background-color: white;
`
function BarComponent({ data, color, title, Feching }) {
    const [ModalInfoChart, setModalInfoChart] = useState(false)
    return (
        <GraphContainer   >
            
            {ModalInfoChart &&
            
                <ModalComponent style={{ width: 'clamp(100px,90%,600px)', height: '80dvh' }}>
                    <X onClick={() => setModalInfoChart(false)} color="gray" size={20} style={{ cursor: 'pointer', marginLeft: "auto" }} />
                <header style={{ display: "flex", justifyContent: "center", width: "90%" }}><h3 >{title}</h3> </header>
                <div style={{ display: 'flex', flexDirection: "column", alignContent: "start", width: "90%", flexGrow: "1", overflow: "scroll", border: "1px solid lightgray", boxSizing: "border-box", borderRadius: "4px", gap: "10px" }}>
                    <div>
                    <History style={{ width: "100%", backgroundColor:"rgb(245, 245, 245)",borderBottom:"1px solid lightgray" ,gridTemplateColumns:"9fr 1fr"}}>
                        <p style={{ color: "gray" }}>Produto</p>
                        <p style={{ textAlign: "center", color: "gray" }}>Valor(R$)</p>
                    </History>
                        {data.map(e =>
                            <History key={e.id} style={{borderBottom:"1px solid lightgray",gridTemplateColumns:"9fr 1fr"}}>
                                <p >{e.Produto}</p>
                                <p style={{ textAlign: "center", color: "gray" }}>{e.Vendas}</p>
                            </History>)
                        }
                    </div>
                </div>
            </ModalComponent>
                }
            <header style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <SquareChartGantt onClick={() => setModalInfoChart(true)} color="gray" style={{ alignSelf: "flex-end", cursor: "pointer" }} />
                <p style={{ color: 'gray', fontSize: '12pt', fontWeight: 600, textAlign: "center" }}>{title}</p>
            </header>
            {Feching ?
                <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignContent: "center", height: "100%" }}>
                    <Loading style={{ alignSelf: 'center', width: "80px", height: "80px" }}>
                        <ContainerL></ContainerL>
                    </Loading>
                </div> :
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.filter((e, id) => id < 10 && e)}>
                        <XAxis dataKey="Produto" tick={{ fontSize: 0 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar type="monotone" dataKey="Vendas" fill={color} radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>}
        </GraphContainer>
    )
}

export default BarComponent