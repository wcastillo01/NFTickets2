import React, { useEffect, useRef } from "react";
import { useAddress } from "@thirdweb-dev/react";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";


import QRCode from "qrcode";
import "./Wallet.css";
export default function Wallet() {
  const walletAddress = useAddress();
  const qrCodeCanvasRef = useRef(null);

  useEffect(() => {
    if (walletAddress && qrCodeCanvasRef.current) {
      QRCode.toCanvas(
        qrCodeCanvasRef.current,
        walletAddress,
        { width: 500, height: 500 },

        (error) => {
          if (error) {
            console.error("Failed to generate QR code", error);
          }
        }
      );
    }
  }, [walletAddress]);

  if (!walletAddress) {
    return <div className="text-4xl text-white font-bold mt-8 mb-16 text-center">
      <h1>No estas conectado. Hazlo aqui:</h1>
      <br />
      <div>
        <ThirdwebProvider
          activeChain="goerli"
          supportedWallets={[metamaskWallet()]}
        >
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Conectar billetera"}
            modalSize={"compact"}
          />
        </ThirdwebProvider>
      </div>
    </div>;
  }

  return (
    <div className="wallet-container">
      <h1 className="text-4xl text-white font-bold mt-8 mb-16 text-center">
        Tu número de cartera es: <br />
        {walletAddress}
      </h1>
      <div className="qr-container">
        <canvas
          className="p-3 rounded-xl eth-card "
          ref={qrCodeCanvasRef}
        ></canvas>
      </div>
    </div>
  );
}
