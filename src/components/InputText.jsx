import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
const Input = styled.input`
  text-align:${(props)=>props.$align};
  background-color:transparent;
  font-size:12pt;
  width:100%;
  padding:8px;
  border-radius:6px;
  text-indent: 8px;
  border:1px solid gray;
  outline:none;
  margin-bottom:10px;
  box-sizing: border-box;

`
const InputContaier = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
  align-items:${(props)=>props.$align};
  justify-content: center;

`
export default function InputText({align,label,onChange,type,value,onKeyDown,pholder,children}) {
  const input = useRef()
  useEffect(() => {
          input.current.focus()
      }, [])
  return (

    <InputContaier $align={align}>
      <h3 style={{fontSize:"12pt",fontWeight:"500",paddingBottom:'4px'}}>{label}</h3>
        < Input ref={input} placeholder={pholder} step={1} min={1} $align={align} onChange={onChange} onKeyDown={onKeyDown} type={type} value={value}></Input>
        {children}
    </InputContaier>
  )
}
