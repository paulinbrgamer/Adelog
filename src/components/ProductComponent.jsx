import styled from "styled-components"
import { fdInOut } from "./FdInOt"
import { BarcodeIcon, ShoppingCart, SquarePen, Trash } from "lucide-react"
import ModalComponent from "./ModalComponent"
import {  useState } from "react"
import { useApp } from "../pages/AppProvider"
import UnitsComponent from "./UnitsComponent"
import IconButton from "./IconButton"
import Toast from "./Toast"
import { useAuth } from "../auth/Authprovider"
import InputText from "./InputText"
import { Select, Option } from "./SelectComponent"
import { supabase } from "../services/cliente"
import BarScanner from "../components/BarScanner";
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
    `
const ProductContainer = styled.div`
    display: grid;
    width: 100%;
    border-radius: 4px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 5fr 1fr 1fr;
    justify-content: end;
    box-sizing: border-box;
    gap: 4px;
    animation: ${fdInOut} 300ms ease-in-out;
    padding: 10px;
    transition: background-color ease-in-out 200ms;
    &:hover{
        background-color: #EDEDED;
    }    
    @media (min-width:600px){
        grid-template-columns: 8fr 30px 1fr;
    }
`
const ProductComponent = ({ data, cart, trash }) => {
    const categorys = [
        "Alimentos Frescos",
        "Alimentos Industrializados",
        "Bebidas",
        "Produtos de Higiene e Beleza",
        "Limpeza",
        "Produtos Perecíveis",
        "Pet Shop",
        "Produtos de Saúde",
        "Bebês",
        "Eletrônicos e Utilitários"
    ]
    const [isModalOpen, setisModalOpen] = useState(false)
    const [isAproved, setisAproved] = useState(false)
    const [isToastOn, setisToastOn] = useState(false)
    const [ToastError, setToastError] = useState(false)
    const [errorUpdate, seterrorUpdate] = useState(false)
    const [errorMensage, setseterrorMensage] = useState('Produto não cadastrado')
    const [product, setproduct] = useState({ name: data.name, units: data.units, price: data.price, category: data.category, line_code: data.line_code })
    const [editModal, seteditModal] = useState(false)
    const [Barcode,setBarcode] = useState('')
    const [ShowReader,setShowReader]= useState(false)
    const { Cart, setCart } = useApp()
    const [Units, setUnits] = useState(null)
    const { User } = useAuth()
    const handleFinalizeUnits = () => {
        if (Units > 0) {
            let newState = Cart?.filter((Obj) => Obj.id != data.id)
            newState.push({ ...data, units: Units, price: Number(Units * data.price) })
            setCart(newState)
            setisModalOpen(false)
            setisToastOn(true)
            setTimeout(() => {
                setisToastOn(false)
            }, 1500);
        }

    }
    const handleBarcodeDetected = (barcode) => {
        setBarcode(barcode)
        if(Barcode>0){
            setShowReader(false)
      
          }
        setproduct({...product,line_code:Number(Barcode)})
    };
    const handleDeleteOnCart = () => {
        let newState = Cart?.filter((Obj) => Obj.id != data.id)
        setCart(newState)
    }
    const handleFinalizeEdit = async () => {
        console.log(product.line_code);
        if (product.name.length > 0 && product.price > 0 && product.units >= 0 && product.line_code.toString().length > 0 && product.category.length > 0) {
            const { data: dataEdit, error: errorEdit } = await supabase.from('products').update({ ...product }).eq('id', data.id)
            if (errorEdit) {
                console.log('Error : ', errorEdit)
                if (errorEdit.code == '23505') {
                    setseterrorMensage('Erro, Codigo de barras já cadastrado')
                }
                if (errorEdit.code == '22P02') {
                    setseterrorMensage('Erro, Campos inválidos')
                }
                seterrorUpdate(true)
                setTimeout(() => {
                    seterrorUpdate(false)
                }, 1500);

            } else {
                setisAproved(true)
                setTimeout(() => {
                    setisAproved(false)
                }, 1500);
                seteditModal(false)

            }
        } else {
            setToastError(true)
            setTimeout(() => {
                setToastError(false)
            }, 1500);
        }

    }
    const deleteProduct = async () => {
        const { data: DeleteProduct, error: ErrorDelete } = await supabase.from('products').delete().eq('id', data.id)
        if (ErrorDelete) {
            console.log("Error : ", ErrorDelete);
            seterrorUpdate(true)
            setTimeout(() => {
                seterrorUpdate(false)
            }, 1500);
        }
    }
    return (
        <ProductContainer>
            {isToastOn ? <Toast style={{ justifySelf: 'center' }} message={'Adicionado ao carrinho'} color={'#008300'} /> : null}
            {errorUpdate ? <Toast style={{ justifySelf: 'center' }} message={errorMensage} color={'#e02323'} /> : null}
            {isAproved ? <Toast style={{ justifySelf: 'center' }} message={'Estoque Atualizado'} color={'#008300'} /> : null}
            {isModalOpen && data.units > 0 ?
                <ModalComponent>
                    <Title>Unidades de {data.name}:</Title>
                    <ShoppingCart />
                    <UnitsComponent data={data} set={setUnits} />
                    <div style={{ display: 'flex', flexDirection: "row", width: '90%', alignContent: 'center', justifyContent: 'space-between', padding: "4px" }}>
                        <IconButton onclick={() => setisModalOpen(false)} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
                        </IconButton>
                        <IconButton onclick={() => handleFinalizeUnits()} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'bold', marginTop: "8px", fontSize: "12pt" }}>Finalizar</p>
                        </IconButton>
                    </div>
                </ModalComponent> :
                null
            }
            {editModal ?
                <ModalComponent>
                    {ToastError ? <Toast message={'Preencha todos os campos'} color={'#e02323'} /> : null}
                    <h4>Editar Produto </h4>
                    <InputText label={'Nome'} onChange={(e) => setproduct({ ...product, name: e.target.value })} value={product.name} />
                    <div style={{ display: "flex", gap: "4px", padding: '4px' }}>
                        <InputText type={'number'} onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })} label={'Preço(R$)'} value={product.price} />
                        <InputText type={'number'} onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })} label={'Unidades'} value={product.units} />
                    </div>
                    <h4>Categoria</h4>
                    <Select name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                        {categorys.map((item) => <Option selected={product.category == item ? true : false} key={item + "edit"}>{item}</Option>)}
                    </Select>
                    <InputText type={'number'} onChange={(e) => setproduct({ ...product, line_code: e.target.value })} label={'Código de barras'} value={product.line_code} />
                    <BarcodeIcon onClick={()=>setShowReader(true)}></BarcodeIcon>
                    {ShowReader ?
                        <ModalComponent>
                            <BarScanner onDetected={handleBarcodeDetected} />
                            <IconButton onclick={() => setShowReader(false)} style={{ gridRow: "2/2" }}>
                                <p style={{ fontWeight: 'normal', marginTop: "8px", fontSize: "12pt" }}>Cancelar</p>
                            </IconButton>
                        </ModalComponent> : null

                    }
                    <div style={{ display: 'flex', flexDirection: "row", width: '90%', alignContent: 'center', justifyContent: 'space-between', padding: "4px" }}>
                        <IconButton onclick={() => deleteProduct()}>
                            <Trash color={'#e02323'} />
                        </IconButton>
                        <IconButton onclick={() => seteditModal(false)} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'normal', fontSize: "12pt" }}>Cancelar</p>
                        </IconButton>

                        <IconButton onclick={() => handleFinalizeEdit()} style={{ gridRow: "2/2" }}>
                            <p style={{ fontWeight: 'bold', fontSize: "12pt" }}>Finalizar</p>
                        </IconButton>
                    </div>

                </ModalComponent> : null
            }
            <Title>{data?.name}</Title>
            <p style={{ color: 'gray', fontWeight: '400', gridColumn: '1/2', gridRow: "2/4", fontSize: '10pt' }}>Unidades: {data?.units}</p>

            {User?.permission == 'adm' && !trash ?
                <IconButton onclick={() => {seteditModal(true)}} style={{ justifySelf: "end", width: '24px', gridRow: '2/3', gridColumn: "2/3" }}>
                    <SquarePen />
                </IconButton> : null}

            {data?.units > 0 && cart ?
                <IconButton onclick={() => setisModalOpen(true)} style={{ padding: '4px', backgroundColor: 'black', borderRadius: '4px', gridRow: '2/3', gridColumn: "3/4", marginLeft: 'auto' }}>
                    <ShoppingCart size={22} color="white" />
                </IconButton>
                : trash ?
                    <IconButton onclick={() => handleDeleteOnCart()} style={{ padding: '4px', backgroundColor: 'rgb(224, 35, 35)', borderRadius: '4px', gridRow: '2/3', gridColumn: "2/4", marginLeft: 'auto' }}>
                        <Trash size={22} color="white" />
                    </IconButton>

                    : null}
            <Title style={{ gridColumn: '2/4', gridRow: "1/2", textAlign: 'end', alignContent: "start", textWrap: "nowrap" }}>R$ {data?.price.toFixed(2)}</Title>
        </ProductContainer>
    )
}

export default ProductComponent