import {styled,keyframes} from "styled-components";

import IconButton from "./IconButton";
const fdInOut = keyframes`
     0% {
      opacity: 0;

    }
    100% {
      opacity: 1;

    }
`
const Modal = styled.div`
    background-color: #80808047;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    height: 100dvh;
    animation: ${fdInOut} 300ms ease;
`
const ModalContent = styled.div`
    position: relative;
    bottom: 20%;
    width: 80%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const ModalComponent = ({children,isOpen})=>{
    return(
        <Modal>
            <ModalContent>
                {children}
                <IconButton onclick={()=>isOpen(false)}>
                    <p style={{fontWeight:'bold',alignSelf:"start"}}>Fechar</p>
                </IconButton>
            </ModalContent>
        </Modal>
    )
}
export default ModalComponent