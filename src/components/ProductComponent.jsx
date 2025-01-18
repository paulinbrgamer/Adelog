import styled from "styled-components"
import { fdInOut } from "./FdInOt"
import { ShoppingCart } from "lucide-react"
import ModalComponent from "./ModalComponent"
import { useState } from "react"
import { useApp } from "../pages/AppProvider"
import UnitsComponent from "./UnitsComponent"
import IconButton from "./IconButton"
import Toast from "./Toast"
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
    `
const ProductContainer = styled.div`
    display: grid;
    width: 100%;    
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 4px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 5fr 2fr;
    box-sizing: border-box;
    gap: 4px;
    animation: ${fdInOut} 300ms ease-in-out;
`
const ProductComponent = ({ data }) => {
    const [isModalOpen, setisModalOpen] = useState(false)
    const [isToastOn, setisToastOn] = useState(false)
    const { setStore,storeData,Cart,setCart } = useApp()
    const [Units, setUnits] = useState(null)
    const handleFinalizeUnits = () => {
        if (Units > 0) {
            let newState = Cart?.filter((Obj) => Obj.id != data.id)
                
            storeData.map(element =>element.id == data.id?element.units -= Units:null)
            console.log(storeData);
            newState.push({ ...data, units: Units })
            setCart(newState)
            setisModalOpen(false)
            setisToastOn(true)
            setTimeout(() => {
                setisToastOn(false)
            }, 1500);
        }
    }
    return (
        <ProductContainer>
            {isToastOn ? <Toast style={{ justifySelf: 'center' }} message={'Produto adicionado'} color={'#006400'} /> : null}

            {isModalOpen ?
                <ModalComponent>
                    <Title>Unidades de {data.name}:</Title>
                    <ShoppingCart />
                    <UnitsComponent data={data} set={setUnits} />
                    <div style={{ display: 'flex', flexDirection: "row", gap: '20px' }}>
                        <IconButton onclick={() => handleFinalizeUnits()} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Finalizar</p>
                        </IconButton>
                        <IconButton onclick={() => setisModalOpen(false)} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
                        </IconButton>
                    </div>
                </ModalComponent> :
                null
            }
            <Title>{data?.name}</Title>

            <p style={{ color: 'gray', fontWeight: '400', gridColumn: '1/2', gridRow: "2/4", fontSize: '10pt' }}>Unidades: {data?.units}</p>

            {data?.units > 0 ? <ShoppingCart onClick={() => setisModalOpen(true)} size={22} color="white" style={{ padding: '4px', backgroundColor: 'black', borderRadius: '4px', gridRow: '2/3', gridColumn: "2/3", alignContent: "end", marginLeft: 'auto' }} /> : null}
            <Title style={{ gridColumn: '2/3', gridRow: "1/2", textAlign: 'end', alignContent: "start", textWrap: "nowrap" }}>R$ {data?.price.toFixed(2)}</Title>
        </ProductContainer>
    )
}

export default ProductComponent