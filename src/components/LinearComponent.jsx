import styled from "styled-components"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line,LineChart, Legend } from 'recharts';
const GraphContainer = styled.div`
box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
box-sizing: border-box;
border-radius: 8px;
padding:  20px;
flex-grow: 1;
max-height: 300px;
width: clamp(200px,100%,300px);
background-color: white;
`
function LinearComponent({ data, color, title }) {
    return (
        <GraphContainer  >
            <header>
                <p style={{ color: 'gray', fontSize: '12pt', fontWeight: 600, textAlign: "center" }}>{title}</p>
            </header>
            <ResponsiveContainer width="90%" height="95%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Produto" name="Hora" unit='hrs'/>
                    <YAxis  />
                    <Tooltip />
                    <Legend />
                    <Line type="linear" dataKey="Vendas" stroke={color} activeDot={{ r: 8 }}  />
                </LineChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}

export default LinearComponent