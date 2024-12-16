import React, { createContext, useState } from 'react';
import { doApiCall, AXIOS_METHOD } from "../hooks/useApi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const refreshWallet = (walletId) => {
    try {
      doApiCall(
        AXIOS_METHOD.GET,
        `/wallet/${walletId}`,
        (updatedWallet) => {
          setSelectedWallet(updatedWallet);
          setWallets((prevWallets) =>
            prevWallets.map((wallet) =>
              wallet.id === walletId ? updatedWallet : wallet
            )
          );
        }
      );
    } catch (error) {
      console.error('Error refreshing wallet:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ wallets, setWallets, selectedWallet, setSelectedWallet, refreshWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
