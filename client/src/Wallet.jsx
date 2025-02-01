import { useState, useEffect } from "react";
import { walletStore } from "./WalletStore";

function Wallet({ setAddress, balance }) {
  const [currentAddress, setCurrentAddress] = useState("");

  const generateNewWallet = () => {
    const address = walletStore.generateNewWallet();
    setCurrentAddress(address);
    setAddress(address);
  };

  return (
      <div className="container wallet">
        <h1>Your Wallet</h1>
        {!currentAddress ? (
            <button onClick={generateNewWallet} className="button">
              Generate New Wallet
            </button>
        ) : (
            <div>
              <label>
                Wallet Address
                <input
                    type="text"
                    value={currentAddress}
                    readOnly
                    style={{
                      width: '100%',
                      fontFamily: 'monospace',
                      padding: '8px'
                    }}
                />
              </label>
              <div className="balance">Balance: {balance}</div>
            </div>
        )}
      </div>
  );
}

export default Wallet;
