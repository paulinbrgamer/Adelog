import {styled,keyframes} from 'styled-components'
const low = keyframes`
    0% {
      opacity: 0;
      right:-5%;
    }

    15% {
      opacity: 1;
      right:2%;
    }
    85% {
      opacity: 1;
      right:2%;
    }

    100% {
      opacity: 0;
      right:-10%;
    }
`
const fdInOut = keyframes`
    0% {
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      top:-110%;
    }

    25% {
      opacity: 1;
      top:5%;
    }
    85% {
      opacity: 1;
      top:5%;
    }

    100% {
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      top:-110%;
    }
`
const Toast = styled.div`
  position: absolute;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  justify-self: center;
  z-index: 2;
  background-color: ${(props)=>props.$color};
  color:white;
  animation: ${fdInOut} 1.6s ease-in-out;

  @media (min-width:900px){
  animation: ${low} 1.6s ease-in-out;
  bottom:2%;
  }
`

export default Toast