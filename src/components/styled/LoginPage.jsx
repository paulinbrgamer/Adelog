import styled from 'styled-components'
import { fdInOut } from '../FdInOt'
import background from '../../../public/background.jpg'
export const LoginPage = styled.div`
    background-repeat:no-repeat;
    background-image:url(${background});
    background-position:center;
    background-size: cover;
    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;
    padding-top:20dvh;
    height:80dvh;
    animation: ${fdInOut} 300ms ease-in-out;
`