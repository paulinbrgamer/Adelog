import {React} from 'react'
import {styled,keyframes} from 'styled-components'

const fdInOut = keyframes`
 0% {
      opacity: 0;
      transform: translatey(-100%);
    }

    15% {
      opacity: 1;
      transform: translatey(0);
    }
    85% {
      opacity: 1;
      transform: translatey(0);
    }

    100% {
      opacity: 0;
      transform: translatey(-110%);
    }
`
const Toast = styled.div`
  position: fixed;
  width: 80%;
  top: 20px;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  background-color: ${(props)=>props.$color};
  color:white;
  animation: ${fdInOut} 1.6s ease-in-out;
`

export default Toast