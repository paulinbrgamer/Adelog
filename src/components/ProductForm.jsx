import { ScanLineIcon, Trash } from "lucide-react";
import InputText from "./InputText";
import { Select, Option } from "./SelectComponent";
import BarcodeScanner from "./BarScanner";
import ModalComponent from "./ModalComponent";
import IconButton from "./IconButton";
import { useEffect } from "react";

export const ProductForm = ({ product, setproduct, categorys, setShowReader, ShowReader, handleBarcodeDetected, setaddProduct, createNewProduct, deleteButtom, preData ,title}) => {
    if (preData) {
        useEffect(() => {
            setproduct({ name: preData.name, units: preData.units, price: preData.price, category: preData.category, line_code: preData.line_code })
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
                <header style={{borderBottom:"1px solid gray",width:'100%',textAlign:"center",padding:"10px"}}>
                <h3>{title}</h3>
                </header>
                <InputText label={'Nome'} onChange={(e) => setproduct({ ...product, name: e.target.value })} value={product.name} />
                <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
                    <InputText type={'number'} onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })} label={'Preço(R$)'} value={product.price} />
                    <InputText type={'number'} onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })} label={'Unidades'} value={product.units} />
                </div>
                <h3 style={{fontSize:"12pt",fontWeight:"500",paddingBottom:'4px',alignSelf:"start"}}>Categoria</h3>
                <Select name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                    {categorys.map((item) => <Option selected={product.category == item.id ? true : false} key={item.id + "edit"} value={item.id}>{item.name}</Option>)}
                </Select>
                <InputText type={'number'} onChange={(e) => setproduct({ ...product, line_code: e.target.value })} label={'Código de barras'} value={product.line_code} />
                <IconButton onclick={() => setShowReader(true)} >
                    <ScanLineIcon />
                </IconButton>

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
                        </IconButton>
                    }
                    <IconButton onclick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: '' }) }} style={{ gridRow: '2/2' }}>
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
            <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
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
                <header style={{borderBottom:"1px solid gray",width:'100%',textAlign:"center",padding:"10px"}}>
                <h3>{title}</h3>
                </header>
                <InputText label={'Nome'} pholder={'Digite o nome do produto'} onChange={(e) => setproduct({ ...product, name: e.target.value })} />
                <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
                    <InputText
                        type={'number'}
                        pholder={'R$ 0,00'}
                        onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })}
                        label={'Preço(R$)'}
                    />
                    <InputText
                        type={'number'}
                        pholder={'0'}
                        onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })}
                        label={'Unidades'}
                    />
                </div>
                <h3 style={{fontSize:"12pt",fontWeight:"500",paddingBottom:'4px',alignSelf:"start"}}>Categoria</h3>
                <Select name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                    <Option disabled selected>
                        Selecionar
                    </Option>
                    {categorys.map((item) => (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))}
                </Select>
                <InputText
                    pholder={'Digite ou escaneie o código '}
                    type={'number'}
                    onChange={(e) => setproduct({ ...product, line_code: e.target.value })}
                    label={'Código de barras'}
                    value={product.line_code}
                />
                <IconButton onclick={() => setShowReader(true)} >
                    <ScanLineIcon />
                </IconButton>

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
                    <IconButton onclick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: '' }) }} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '12pt' }}>Cancelar</p>
                    </IconButton>
                    <IconButton onclick={() => createNewProduct()} style={{ gridRow: '2/2' }}>
                        <p style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '12pt' }}>Finalizar</p>
                    </IconButton>
                </div>
            </div>
        );
    }

};
