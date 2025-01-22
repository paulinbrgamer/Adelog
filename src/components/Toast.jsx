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
const ToastContainer = styled.div`
  align-items:center;
  justify-content:center;
  position:absolute;
  top:20px;
  padding:10px;
  border-radius: 6px;
  width:90%;
  z-index: 2;
  text-align: center;
  background-color: ${(props)=>props.$color};
  color:white;
  animation: ${fdInOut} 1.6s ease-in-out;
`
function Toast({message,color,style}) {

  return (
    <ToastContainer style={style} $color={color}>{message}</ToastContainer>
  )
}

export default Toast