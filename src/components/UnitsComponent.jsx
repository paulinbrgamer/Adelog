import {useEffect, useRef, useState} from 'react'
import Toast from '../components/Toast'
export default function UnitsComponent({data,set,finalize}) {
    const [Units, setUnits] = useState(null)
    const [toast, settoast] = useState(false)
    const input = useRef()
    useEffect(() => {
        if (Units?Units>data.units || Units<=0 || Units%1!==0:null  ){
            settoast(true)
            setTimeout(() => {
            settoast(false)
            }, 1500)
            input.current.value = ''
            setUnits(Number(input.current.value))            

        }
        else{
            set(Units)
        }
    }, [Units,data])
    useEffect(() => {
        input.current.focus()
    }, [])
  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"baseline"}}>
        {toast?<Toast $color={'#e02323'}>Unidades inválidas</Toast>:null}
        <input ref={input} style={{fontWeight:'600',fontSize:'14pt',width:"200px",textAlign:"center",borderRadius:"4px",border:'1px solid gray','padding':"6px"}} type="number"  min={1} max={data.units} onChange={(e)=>setUnits(Number(e.target.value))} onKeyDown={(e)=>e.key == 'Enter'?finalize():null}/>
        

    </div>
  )
}
