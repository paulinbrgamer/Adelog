import React, { useRef } from 'react'
import styled from 'styled-components'
const Input = styled.input`
  text-align:${(props)=>props.$align};
  background-color:white;
  font-size:12pt;
  width:95%;
  padding:4px;
  border:none;
  border-bottom:1px solid black;
  outline:none;
  margin-bottom:10px;
`
const InputContaier = styled.div`
  display:flex;
  width:95%;
  flex-direction:column;
  align-items:${(props)=>props.$align};
  justify-content: center;

`
export default function InputText({align,label,onChange,type,value}) {
  return (
    <InputContaier $align={align}>
        <strong>{label}</strong>
        <Input   $align={align} onChange={(e)=>onChange(e.target.value)}   type={type} value={value}/>
    </InputContaier>
  )
}
