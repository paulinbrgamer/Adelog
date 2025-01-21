import styled from "styled-components"
import { fdInOut } from "./FdInOt"
const Table = styled.table`
    padding: 10px;
    box-sizing: border-box;

`
const Tbody = styled.tbody`

`
const Thead = styled.thead`

`
const Td = styled.td`
    animation: ${fdInOut} 300ms ease-in-out;
    text-align: center;
    padding: 10px;
    
`
const Th = styled.th`
    padding: 4px;
    text-align: center;
    border: 1px solid black;
    border-radius: 4px;
`
const Tr = styled.tr`

`
export default function TableComponent({ data, header }) {
    return (
        <Table>
            <Thead>
                <Tr>
                {header.map(item => <Th key={item}>{item}</Th>)}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item,idx) => <Tr key={idx}>{Object.keys(item).filter((item) => item !== 'user_id' && item !== 'store_id'&& item !== 'id').map(key => <Td  key={key+idx}>{item[key]}</Td>)}</Tr>)}
            </Tbody>

        </Table>
    )
}
