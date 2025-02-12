import styled from "styled-components"
import { useApp } from "../pages/AppProvider"

export default function Badge({size}) {
  const {Cart} = useApp()
    const Circule = styled.div`
        position: absolute;
        top: 0px;
        right: 1px;
        border-radius: 50%;
        background-color: #ef4444;
        border: none;
        width: ${size}px;
        height: ${size}px;
        color: white;
        text-align: center;
        padding: 2px;
        font-size: ${size/2}pt;
    `
    if (Cart.length>0){
      return (
        <Circule>{Cart.length}</Circule>
      )
    }

}
