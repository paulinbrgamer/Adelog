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

    return <Div id="scanner"  />;
};

export default BarcodeScanner;
