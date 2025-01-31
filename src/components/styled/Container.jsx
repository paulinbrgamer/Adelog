import {styled} from 'styled-components'
import { fdInOut } from '../FdInOt'
 const Container = styled.div`
background-color: white;
width: clamp(100px,95%,900px);
display: flex;
flex-direction: column;
border-radius: 6px;
animation: ${fdInOut} 300ms ease;
padding: 4px;

`
export default Container
