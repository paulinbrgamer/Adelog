import React, { useEffect } from "react";
import Quagga from "quagga";
import styled from "styled-components";
const Div = styled.div`
    overflow: hidden;
`
const BarcodeScanner = ({ onDetected }) => {
    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    target: document.querySelector("#scanner"),
                    constraints: {
                        facingMode: "environment", // Câmera traseira
                        width:1920,
                        height:1080
                    },
                    area: { // Define a área específica
                        top: "40%",    // Percentual do topo da tela
                        right: "30%",  // Percentual da borda direita
                        left: "30%",   // Percentual da borda esquerda
                        bottom: "40%", // Percentual da base da tela
                    },
                },
                decoder: {
                    readers: [
                        "ean_reader",  // EAN-13
                        "upc_reader",  // UPC-A
                    ], // Adapte ao tipo de código de barras que você usa
                },
            },
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
            }
        );

        Quagga.onDetected((data) => {
            onDetected(data.codeResult.code);
        });

        return () => {
            Quagga.stop();
        };
    }, [onDetected]);

    return <div id="scanner" style={{position: 'relative', width:' 100%', height:' 400px'}}>
    <video id="video" autoPlay style={{width: '100%', height: '100%'}}></video>

    <div style={{position:"absolute",top:"50%",left:"50%",width:"200px",height:"50px",border:"2px solid red",transform:"translate(-50%, -50%)",pointerEvents:"none"}}></div>
</div>

};

export default BarcodeScanner;
