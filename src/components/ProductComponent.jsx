import styled from "styled-components"
import { fdInOut } from "./FdInOt"
import { ShoppingCart, SquarePen, Trash } from "lucide-react"
import ModalComponent from "./ModalComponent"
import { useState } from "react"
import { useApp } from "../pages/AppProvider"
import UnitsComponent from "./UnitsComponent"
import IconButton from "./IconButton"
import Toast from "./Toast"
import { useAuth } from "../auth/Authprovider"
import { supabase } from "../services/cliente"
import { ProductForm } from "./ProductForm"
import { ContainerL, Loading } from "./styled/Loading"
const Title = styled.p`
font-weight: 600;
font-size: 12pt ;
color:  rgb(31 ,41, 55) ;
    `
const UnitsLabel = styled.p`
    color:gray;
    font-weight:400;
    grid-column:1/2;
    grid-row:2/4;
    font-size:10pt;
    @media (min-width: 900px) {
        grid-column: 2/3;
        grid-row:1/2;
        text-align: center;
    }
`
const PriceLabel = styled.p`
    font-weight: 600;
    font-size: 12pt ;
    color:  rgb(31 ,41, 55) ;
    grid-column:3/4;
    grid-row:1/2;
    text-align:center;
    align-content:start;
    text-wrap:nowrap;
`
const EditButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    justify-self:end;
    width:20px;
    grid-row:2/3;
    grid-column:2/3;
    @media (min-width: 900px) {
        grid-column: 4/5;
        grid-row:1/2;
    }
`
const CartButton = styled.button`
    border: none;
    cursor: pointer;
    padding:4px;
    background-color:black;
    border-radius:4px;
    grid-row:2/3;
    grid-column:3/4;
    margin-left:auto;
    @media (min-width: 900px) {
        grid-column: 5/6;
        grid-row:1/2;
    }
`
const Unidade = styled.p`
    display: none;
    @media (max-width: 900px){
        display: block;
    }
`
const TrashButton = styled.button`
     border: none;
     cursor: pointer;
     padding: 4px;
     background-color:rgb(224, 35, 35) ;
     border-radius: 4px;
     grid-row: 2/3;
     grid-column: 2/4;
     margin-left: auto;
     @media (min-width: 900px) {
        grid-column: 5/6;
        grid-row:1/2;
    }
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
        background-color: #faf9f9;
    }    
    @media (min-width:900px){
        grid-template-columns: 8fr 80px 80px 40px 40px;
        grid-template-rows: 1fr;
        gap: 15px;
        align-items: center;
    }
`
const ProductComponent = ({ data, cart, trash }) => {
    //states for ProductForm and create product
    const productTemplate = { name: '', units: 0, price: 0, category: '', line_code: '' }
    const [product, setproduct] = useState(productTemplate)
    const [addProduct, setaddProduct] = useState(false)
    const [ToastError, setToastError] = useState(false)
    const [Barcode, setBarcode] = useState('')
    const [ShowReader, setShowReader] = useState(false)
    const [ToastAproved, setToastAproved] = useState(false)
    const [errorMensage, seterrorMensage] = useState('Erro, Produto não cadastrado')
    const [aproveMensage, setaproveMensage] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [isModalOpen, setisModalOpen] = useState(false)
    const { Cart, setCart, categorys } = useApp()
    const [Units, setUnits] = useState(null)
    const { User } = useAuth()
    const showToast = (setToastVisible) => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 1500); // Exibe por 3 segundos
    };
    const handleFinalizeUnits = () => {
        if (Units > 0) {
            let newState = Cart?.filter((Obj) => Obj.id != data.id)
            newState.push({ ...data, units: Units, price: Number(Units * data.price) })
            setCart(newState)
            setisModalOpen(false)
            setaproveMensage('Adicionado ao carrinho')
            showToast(setToastAproved)
        }

    }
    const handleDeleteOnCart = () => {
        let newState = Cart?.filter((Obj) => Obj.id != data.id)
        setCart(newState)
    }

    const deleteProduct = async () => {
        setisLoading(true)
        const { error: ErrorDelete } = await supabase.from('products').delete().eq('id', data.id)
        if (ErrorDelete) {
            console.log("Error : ", ErrorDelete);

        }
        setaddProduct(false)
        setisLoading(false)
    }
    //func executed when Barcode is detected
    const handleBarcodeDetected = (barcode) => {
        setBarcode(barcode)
        if (Barcode > 0) {
            setShowReader(false)
        }
        setproduct({ ...product, line_code: Number(Barcode) })
    };
    //func actived when user click on Finalize
    const createNewProduct = async () => {

        //validar os campos do form
        if (product.name.length > 0 && product.price > 0 && product.units >= 0 && product.line_code.toString().length > 0 && product.category.toString().length > 0) {
            setisLoading(true)

            const { error } = await supabase.from('products').update({ ...product, store_id: User?.store_id }).eq('id', data.id)
            if (error) {
                console.log('Error : ', error)
                if (error.code == '23505') {
                    seterrorMensage('Erro, Codigo de barras já cadastrado')
                }
                if (error.code == '22P02') {
                    seterrorMensage('Erro, Campos inválidos')
                }
                showToast(setToastError)
                setisLoading(false)
            }
            else {
                setaddProduct(false)
                setaproveMensage("Produto Cadastrado")
                showToast(setToastAproved)
                setisLoading(false)
            }
        } else {
            seterrorMensage('Preencha todos os campos')
            showToast(setToastError)
        }
    }

    return (
        <ProductContainer>
            {ToastError && <Toast $color='red'>{errorMensage}</Toast>}
            {ToastAproved && <Toast $color={'#008300'}>{aproveMensage}</Toast>}
            {isLoading && <ModalComponent><ContainerL> <Loading /></ContainerL></ModalComponent>}
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
            {addProduct &&
                <ModalComponent>
                    <ProductForm
                        preData={data}
                        product={product}
                        setproduct={setproduct}
                        categorys={categorys}
                        setShowReader={setShowReader}
                        ShowReader={ShowReader}
                        handleBarcodeDetected={handleBarcodeDetected}
                        setaddProduct={setaddProduct}
                        createNewProduct={createNewProduct}
                        deleteButtom={deleteProduct}
                        title={'Editar Produto'}
                    />

                </ModalComponent>
            }
            <Title>{data?.name}</Title>
            <UnitsLabel><Unidade>Unidades:</Unidade>{data?.units}</UnitsLabel>
            {User?.permission == 'adm' && !trash ?
                <EditButton onClick={() => { setaddProduct(true) }}>
                    <SquarePen size={20} color="gray"/>
                </EditButton> : null
            }

            {data?.units > 0 && cart ?
                <CartButton onClick={() => setisModalOpen(true)} >
                    <ShoppingCart size={22} color="white" />
                </CartButton>
                : trash ?
                    <TrashButton onClick={() => handleDeleteOnCart()} >
                        <Trash size={22} color="white" />
                    </TrashButton>
                : null
            }
            <PriceLabel >R$ {data?.price.toFixed(2)}</PriceLabel>
        </ProductContainer>
    )
}

export default ProductComponent