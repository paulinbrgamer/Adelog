import React, { useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    target: document.querySelector("#scanner"),
                    constraints: {
                        facingMode: "environment", // Câmera traseira
                        width:320,
                        height:300
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

    return <div id="scanner" style={{ height: "300px" ,position:"relative"}} />;
};

export default BarcodeScanner;
