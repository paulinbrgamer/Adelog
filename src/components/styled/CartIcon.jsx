import styled from "styled-components";

 const CartIcon = styled.div`
    background-color :${props=>props.$color? props.$color:'white'};
    width: 30px;
    display: flex;
    justify-content: center;
    padding: 4px;
    border-radius: 10px;
    height: 30px;
`
export default CartIcon