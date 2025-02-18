import { ScanLineIcon, Trash ,X} from "lucide-react";
import InputText from "./InputText";
import { Select, Option } from "./SelectComponent";
import BarcodeScanner from "./BarScanner";
import ModalComponent from "./ModalComponent";
import IconButton from "./IconButton";
import { useEffect, useState } from "react";
import MainButtom from "./styled/MainButtom";
import SecondaryButtom from "./styled/SecondaryButtom";
export const ProductForm = ({ product, setproduct, categorys, setShowReader, ShowReader, handleBarcodeDetected, setaddProduct, createNewProduct, deleteButtom, preData, title }) => {
    const [Over, setOver] = useState(null)
    if (preData) {
        useEffect(() => {
            setproduct({ name: preData.name, units: preData.units, price: preData.price, category: preData.category, line_code: preData.line_code, brute_price: preData.brute_price })
            setOver((((preData.price - preData.brute_price) / preData.brute_price) * 100).toFixed(2))
        }, []);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" ,boxSizing:"border-box",width:"90%"}}>
                {/*Scanner Modal logic*/}
                {ShowReader && (
                    <ModalComponent>
                        <BarcodeScanner onDetected={handleBarcodeDetected} />
                        <SecondaryButtom onClick={() => setShowReader(false)} style={{ marginLeft:"auto"}}>
                            <p >Cancelar</p>
                        </SecondaryButtom>
                    </ModalComponent>
                )}
                {/*Form of product data*/}
                <header style={{width: '90%', textAlign: "center",fontWeight:"500",fontSize:"14pt"}}>
                    <p>{title}</p>
                </header>
                <InputText label={'Nome'} onChange={(e) => setproduct({ ...product, name: e.target.value })} value={product.name} />
                    <InputText
                        type={'number'}
                        pholder={'R$ 0,00'}
                        onChange={(e) => {
                            setproduct({ ...product, brute_price: Number(e.target.value) })
                        }}
                        label={'Preço Bruto(R$)'}
                        value={product.brute_price}
                    />
                    <InputText
                        type={'number'}
                        pholder={'0'}
                        value={Over}
                        onChange={(e) => {
                            setOver(e.target.value)
                            let priceOver = ((product.brute_price * e.target.value) / 100) + product.brute_price
                            setproduct({ ...product, price: priceOver })
                        }}
                        label={'Lucro (%)'}
                    />
                    <InputText
                        type={'number'}
                        pholder={'R$ 0,00'}
                        value={product.price}
                        onChange={(e) => {
                            let priceBefore = ((e.target.value - product.brute_price) / product.brute_price) * 100;
                            setOver(priceBefore)
                            setproduct({ ...product, price: Number(e.target.value) })

                        }}
                        label={'Preço Total(R$)'}
                    />
                <div style={{ display: "flex", gap: '8px', width: "100%", justifyContent: "center", alignItems: "start" }}>
                <InputText
                        type={'number'}
                        pholder={'0'}
                        onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })}
                        label={'Unidades'}
                        value={product.units}
                    />
                <div style={{width:"100%"}}>
                <p style={{ fontSize: "12pt", fontWeight: "500", alignSelf: "start" ,color:"rgb(31, 41, 55)"}}>Categoria</p>
                <Select style={{ width: "100%" }} name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                    {categorys.map((item) => <Option selected={product.category == item.id ? true : false} key={item.id + "edit"} value={item.id}>{item.name}</Option>)}
                </Select>
                </div>
                </div>
                <InputText type={'number'} onChange={(e) => setproduct({ ...product, line_code: e.target.value })} label={'Código de barras'} value={product.line_code} />
                <IconButton onclick={() => setShowReader(true)} >
                    <ScanLineIcon />
                </IconButton>

                {/*Buttons to end form*/}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px',
                    }}
                >
                    {deleteButtom &&
                        <SecondaryButtom style={{border:'1px solid red'}}>
                        <IconButton onclick={() => deleteButtom()}>
                            <Trash color={'#e02323'} />
                        </IconButton>
                        </SecondaryButtom>

                    }
                    <div style={{display:'flex',gap:"12px"}}>
                    <SecondaryButtom onClick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: '', brute_price: 0 })}} >
                        <p>Cancelar</p>
                    </SecondaryButtom>
                    <MainButtom onClick={() => createNewProduct()} >
                        <p style={{fontSize:"11pt"}}>Finalizar</p>
                    </MainButtom>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" ,boxSizing:"border-box",width:'90%'}}>
                {/*Scanner Modal logic*/}
                {ShowReader && (
                    <ModalComponent>
                        <BarcodeScanner onDetected={handleBarcodeDetected} />
                        <SecondaryButtom onClick={() => setShowReader(false)} style={{marginLeft:"auto"}}>
                            <p>Cancelar</p>
                        </SecondaryButtom>
                    </ModalComponent>
                )}
                {/*Form of product data*/}
                <header style={{width: '90%', textAlign: "center",fontWeight:"500",fontSize:"14pt"}}>
                    <p>{title}</p>
                </header>
                <InputText label={'Nome'} pholder={'Digite o nome do produto'} onChange={(e) => setproduct({ ...product, name: e.target.value })} />
                    <InputText
                        type={'number'}
                        pholder={'R$ 0,00'}
                        onChange={(e) => {
                            setproduct({ ...product, brute_price: Number(e.target.value) })
                        }}
                        label={'Preço Bruto(R$)'}
                        value={product.brute_price}
                    />
                    <InputText
                        type={'number'}
                        pholder={'0'}
                        value={Over}
                        onChange={(e) => {
                            setOver(e.target.value)
                            let priceOver = ((product.brute_price * e.target.value) / 100) + product.brute_price
                            setproduct({ ...product, price: priceOver })
                        }}
                        label={'Lucro (%)'}
                    />
                    <InputText
                    type={'number'}
                    pholder={'R$ 0,00'}
                    value={product.price}
                    onChange={(e) => {
                        let priceBefore = ((e.target.value - product.brute_price) / product.brute_price) * 100;
                        setOver(priceBefore)
                        setproduct({ ...product, price: Number(e.target.value) })

                    }}
                    label={'Preço Total(R$)'}
                />
                <div style={{ display: "flex", gap: '8px', width: "100%", justifyContent: "center", alignItems: "start" }}>
                <InputText
                    type={'number'}
                    pholder={'0'}
                    onChange={(e) => setproduct({ ...product, units: Number(e.target.value) })}
                    label={'Unidades'}
                />
                <div style={{width:"100%"}}>
                <p style={{ color:"rgb(31 ,41, 55)",fontSize: "12pt", fontWeight: "500",alignSelf: "start" }}>Categoria</p>
                <Select style={{ width: "100%" }} name="categorias" onChange={(e) => setproduct({ ...product, category: e.target.value })}>
                    <Option disabled selected>
                        Selecionar
                    </Option>
                    {categorys.map((item) => (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))}
                </Select>
                </div>
                </div>
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
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'end',
                        gap:'12px',
                        padding: '4px',
                    }}
                >
                    {deleteButtom &&
                        <IconButton onclick={() => deleteButtom()}>
                            <Trash color={'#e02323'} />
                        </IconButton>}
                    <SecondaryButtom onClick={() => { setaddProduct(false), setproduct({ name: '', units: 0, price: 0, category: '', line_code: '', brute_price: 0 }) }} style={{ gridRow: '2/2' }}>
                        <p>Cancelar</p>
                    </SecondaryButtom>
                    <MainButtom onClick={() => createNewProduct()} style={{ gridRow: '2/2' }} >
                        <p style={{fontSize:"11pt"}}>Finalizar</p>
                    </MainButtom>
                </div>
            </div>
        );
    }

};
