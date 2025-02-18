import {styled,keyframes} from "styled-components";
import ReactDOM from 'react-dom';
const fdInOut = keyframes`
     0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`
const Modal = styled.div`
    background-color: #808080ac;
    
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 4px;
    position: relative;
    width: clamp(100px,90%,300px);
    bottom: 5%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 10px;

`
const ModalComponent = ({children,style})=>{
    return ReactDOM.createPortal(
        <Modal>
            <ModalContent style={style}>
                {children}

            </ModalContent>
        </Modal>,
            document.body
        
    )
}
export default ModalComponent