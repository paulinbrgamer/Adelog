import styled from "styled-components"
import {  XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
const GraphContainer = styled.div`
box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
box-sizing: border-box;
border-radius: 8px;
padding:  20px;
flex-grow: 1;
width: clamp(200px,100%,300px);
height: clamp(100px,100dvh,300px) ;
background-color: white;
`
function BarComponent({data,color,title}) {
    return (
        <GraphContainer  >
            <header>
                <p style={{ color: 'gray', fontSize: '12pt', fontWeight: 600, textAlign: "center" }}>{title}</p>
            </header>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="Produto" tick={{ fontSize: 0 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar type="monotone" dataKey="Vendas" fill={color} radius={[2, 2, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}

export default BarComponent