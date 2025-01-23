import styled from "styled-components";
import { fdInOut } from "./FdInOt";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #e2e8f0; /* Bordas suaves */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 6px; /* Sombra leve */
  overflow: hidden; /* Garante o arredondamento do cabeçalho */
`;

const Tbody = styled.tbody``;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #f8fafc; /* Cabeçalho com cor distinta */
  text-transform: uppercase; /* Letras em maiúsculas */
  font-size: 0.9rem;
  color: #64748b; /* Texto em cinza */
  font-weight: 600;
`;

const Td = styled.td`
  animation: ${fdInOut} 300ms ease-in-out;
  text-align: center;
  color: #334155; /* Texto em cinza-escuro */
  border-bottom: 1px solid #e2e8f0; /* Linha divisória suave */
`;

const Th = styled.th`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
`;

const Tr = styled.tr`
  transition: all ease 150ms;
  &:hover {
    cursor: pointer;
    transform: scale(1.02); /* Leve aumento ao passar o mouse */
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px; /* Sombra mais intensa */
    background-color: #f1f5f9; /* Cor de fundo ao passar o mouse */
  }
`;

export default function TableComponent({ data, header }) {
    return (
        <Table>
            <Thead >
                <tr >
                {header.map(item => <Th key={item}>{item}</Th>)}
                </tr>
            </Thead>
            <Tbody>
                {data.map((item,idx) => <Tr key={idx}>{Object.keys(item).filter((item) => item !== 'user_id' && item !== 'store_id'&& item !== 'id').map(key => <Td  key={key+idx}>{item[key]}</Td>)}</Tr>)}
            </Tbody>

        </Table>
    )
}
