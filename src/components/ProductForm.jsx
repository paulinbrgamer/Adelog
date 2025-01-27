import { ScanLineIcon, Trash } from "lucide-react";
import InputText from "./InputText";
import { Select, Option } from "./SelectComponent";
import BarcodeScanner from "./BarScanner";
import ModalComponent from "./ModalComponent";
import IconButton from "./IconButton";
import { useEffect } from "react";

export const ProductForm = ({ product, setproduct, categorys, setShowReader, ShowReader, handleBarcodeDetected, setaddProduct, createNewProduct, deleteButtom, preData }) => {
    if (preData) {
        useEffect(() => {
            setproduct({ name: preData.name, units: preData.units, price: preData.price, category: preData.category, line_code: preData.line_code})
        }, []);
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
                <InputText label={'Nome'} onChange={(e) => setproduct({ ...product, name: e.target.value })} value={product.name} />
                <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
                    <InputText type={'number'} onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })} label={'Preço(R$)'} value={product.price} />
                    <InputText type={'number'} onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })} label={'Unidades'} value={product.units} />
                </div>
                <h4>Categoria</h4>
                <Select name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                    {categorys.map((item) => <Option selected={product.category == item ? true : false} key={item + "edit"}>{item}</Option>)}
                </Select>
                <InputText type={'number'} onChange={(e) => setproduct({ ...product, line_code: e.target.value })} label={'Código de barras'} value={product.line_code} />
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
                    {deleteButtom &&
                        <IconButton onclick={() => deleteButtom()}>
                            <Trash color={'#e02323'} />
                        </IconButton>}
                    <IconButton onclick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: 0 }) }} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '12pt' }}>Cancelar</p>
                    </IconButton>
                    <IconButton onclick={() => createNewProduct()} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '12pt' }}>Finalizar</p>
                    </IconButton>
                </div>
            </>
        )
    }
    else {
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
                    {deleteButtom &&
                        <IconButton onclick={() => deleteButtom()}>
                            <Trash color={'#e02323'} />
                        </IconButton>}
                    <IconButton onclick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: 0 }) }} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '12pt' }}>Cancelar</p>
                    </IconButton>
                    <IconButton onclick={() => createNewProduct()} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '12pt' }}>Finalizar</p>
                    </IconButton>
                </div>
            </>
        );
    }

};
