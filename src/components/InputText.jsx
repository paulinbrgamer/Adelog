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
export default function InputText({align,label,onChange,type,value,onKeyDown}) {
  return (
    <InputContaier $align={align}>
        <strong>{label}</strong>
        <Input step={1} min={1} $align={align} onChange={onChange} onKeyDown={onKeyDown} type={type} value={value}/>
    </InputContaier>
  )
}
