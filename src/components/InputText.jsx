import React, { useRef } from 'react'
import styled from 'styled-components'
const Input = styled.input`
  text-align:center;
  background-color:white;
  font-size:14pt;
  padding:8px;
  width:95%;
  border:none;
  border-bottom:1px solid black;
  outline:none;
  margin-bottom:10px;
`
const InputContaier = styled.div`
display:flex;
flex-direction:column;
align-items:${(props)=>props.$align};
justify-content: center;

`
export default function InputText({align,label,onChange}) {

  return (
    <InputContaier $align={align}>
        <strong>{label}</strong>
        <Input onChange={(e)=>onChange(e.target.value)}   type="text" />
    </InputContaier>
  )
}
