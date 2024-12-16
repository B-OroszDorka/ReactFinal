import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./hooks/useAuth";
import { ModalContextProvider } from "./hooks/useModal";
import { UserProvider } from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';
import { WalletProvider } from './context/WalletContext';

const theme = createTheme({});

export default function Providers({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <UserProvider>
                    <WalletProvider >
                        <TransactionProvider>
                            <ModalContextProvider>
                                <BrowserRouter>
                                    {children}
                                </BrowserRouter>
                            </ModalContextProvider>
                        </TransactionProvider>
                    </WalletProvider >
                </UserProvider>
            </AuthContextProvider>
        </ThemeProvider>
    );
}
