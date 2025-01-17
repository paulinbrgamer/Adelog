import {useEffect, useRef, useState} from 'react'
import Toast from '../components/Toast'
import styled from 'styled-components'
import { useApp } from '../pages/AppProvider'
    const Button = styled.button`
        background-color: #ffffff;
        border: none;
        padding: 4px;
        font-size: 24pt;
    `
export default function UnitsComponent({data,set}) {
    const [Units, setUnits] = useState(null)
    const [toast, settoast] = useState(false)
    const input = useRef()

    useEffect(() => {
        if (Units?Units>data.units || Units<=0:null){
            settoast(true)
            setTimeout(() => {
            settoast(false)
            }, 1500)
            setUnits(0)
            set(Units)
            input.current.value = 0

        }
        else{
            set(Units)
        }
    }, [Units])
    
  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"baseline"}}>
        {toast?<Toast color={'#e02323'} message='Numero de unidades invalidas'/>:null}

        <input ref={input} style={{fontWeight:'600',fontSize:'14pt',width:"90px",textAlign:"center",borderRadius:"4px",border:'1px solid gray','padding':"6px"}} type="number"  min={1} max={data.units} onChange={(e)=>setUnits(Number(e.target.value))}/>
        

    </div>
  )
}
