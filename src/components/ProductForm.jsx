import { ScanLineIcon } from "lucide-react";
import InputText from "./InputText";
import { Select, Option } from "./SelectComponent";
import BarcodeScanner from "./BarScanner";
import ModalComponent from "./ModalComponent";
import IconButton from "./IconButton";
import { useEffect } from "react";

export const ProductForm = ({ product, setproduct, categorys, setShowReader, ShowReader, handleBarcodeDetected, setaddProduct, createNewProduct }) => {

    return (
        <>
            {/*Scanner Modal logic*/}
            {ShowReader && (
                <ModalComponent>
                    <BarcodeScanner onDetected={handleBarcodeDetected} />
                    <IconButton onclick={() => setShowReader(false)} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '12pt' }}>Cancelar</p>
                    </IconButton>
                </ModalComponent>
            )}
            {/*Form of product data*/}
            <h4>Cadastrar produto</h4>
            <InputText label={'Nome'} onChange={(e) => setproduct({ ...product, name: e.target.value })} />
            <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
                <InputText
                    type={'number'}
                    onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })}
                    label={'Preço(R$)'}
                />
                <InputText
                    type={'number'}
                    onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })}
                    label={'Unidades'}
                />
            </div>
            <h4>Categoria</h4>
            <Select name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                <Option disabled selected>
                    Selecionar
                </Option>
                {categorys.map((item) => (
                    <Option key={item}>{item}</Option>
                ))}
            </Select>
            <InputText
                type={'number'}
                onChange={(e) => setproduct({ ...product, line_code: e.target.value })}
                value={product.line_code}
                label={'Código de barras'}
            />
            <ScanLineIcon onClick={() => setShowReader(true)} />

            {/*Buttons to end form*/}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    padding: '4px',
                }}
            >
                <IconButton onclick={() => setaddProduct(false)} style={{ gridRow: '2/2' }}>
                    <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '12pt' }}>Cancelar</p>
                </IconButton>
                <IconButton onclick={() => createNewProduct()} style={{ gridRow: '2/2' }}>
                    <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '12pt' }}>Finalizar</p>
                </IconButton>
            </div>
        </>
    );
};
