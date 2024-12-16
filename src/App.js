import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WalletsPage from './pages/Wallet/WalletsPage';
import WalletDetailsPage from './pages/Wallet/WalletDetailsPage';
import NewWalletPage from './pages/Wallet/NewWalletPage';
import AppMenu from "./components/AppMenu";
import Providers from "./Providers";
import { Container } from "@mui/material";
import Page404 from './pages/Page404';
import { useAuth } from './hooks/useAuth';

function ProtectedPage({ children }) {
  const { authToken } = useAuth();
  if (authToken === false) {
      return <Navigate to="/login"></Navigate>;
  }

  return children;
}

function App() {
  return (
    <Providers>
        <AppMenu />
        <br />
        <Container maxWidth={"lg"}>
          <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/wallets" element={<ProtectedPage><WalletsPage /></ProtectedPage>} />
            <Route path="/wallets/:id" element={<ProtectedPage><WalletDetailsPage /></ProtectedPage>} />
            <Route path="/new" element={<ProtectedPage><NewWalletPage /></ProtectedPage>} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
    </Providers>
  );
}

export default App;
