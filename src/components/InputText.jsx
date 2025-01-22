import React, { useRef } from 'react'
import styled from 'styled-components'
const Input = styled.input`
  text-align:${(props)=>props.$align};
  background-color:white;
  font-size:12pt;
  width:90%;
  padding:4px;
  border:none;
  border-bottom:1px solid black;
  outline:none;
  margin-bottom:10px;
`
const InputContaier = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
  align-items:${(props)=>props.$align};
  justify-content: center;

`
export default function InputText({align,label,onChange,type,value}) {
  return (
    <InputContaier $align={align}>
        <strong>{label}</strong>
        <Input   $align={align} onChange={onChange} min={1} type={type} value={value}/>
    </InputContaier>
  )
}
