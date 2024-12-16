import React, { useEffect, useContext, useState } from 'react';
import { Button, CircularProgress, Typography, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { WalletContext } from '../../context/WalletContext';
import { useAuth } from "../../hooks/useAuth";
import { doApiCall, AXIOS_METHOD } from "../../hooks/useApi";
import { MODALS, useModals } from "../../hooks/useModal";
import TransactionList from './Components/TransactionList';
import AccessTable from './Components/AccessTable';

const WalletDetailsPage = () => {
  const { wallets, setWallets, selectedWallet, setSelectedWallet, refreshWallet } = useContext(WalletContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { sessionUser } = useAuth();
  const { showModal } = useModals();
  const [access, setAccess] = useState([]);

  const fetchWallet = () => {
    try {
      doApiCall(
        AXIOS_METHOD.GET,
        `/wallet/${id}`,
        (data) => {
          setSelectedWallet(data);
          setAccess(data.access);
        }
      );
    } catch (error) {
      console.error('Error fetching wallet:', error);
      if (error.response && error.response.status === 403) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (!sessionUser) {
      navigate('/');
      return;
    }

    fetchWallet();
  }, [id, navigate, sessionUser, setSelectedWallet]);

  const handleDeleteWallet = () => {
    showModal(MODALS.CONFIRM, {
      message: "Biztosan törölni szeretnéd a tárcát?",
      onConfirmed: () => {
        try {
          doApiCall(
            AXIOS_METHOD.DELETE,
            `/wallet/${id}`,
            (data) => {
              navigate('/wallets');
            }
          );
        } catch (error) {
          console.error('Error deleting wallet:', error);
          showModal(MODALS.ERROR, { message: 'Failed to delete wallet' });
        }
      },
    });
  };

  const handleShareWallet = () => {
    showModal(MODALS.SHARE_WALLET, {
      walletId: id,
      onClose: () => {
        showModal(MODALS.NONE);
        fetchWallet();
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      {!selectedWallet ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '10px' }}>Adatok betöltése folyamatban...</Typography>
        </div>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>{selectedWallet.name}</Typography>
          <Typography variant="h6">Tulajdonos: {selectedWallet.created_by.name}</Typography>
          <Typography variant="h6">Leírás: {selectedWallet.description}</Typography>
          <Typography variant="h6">Egyenleg: {selectedWallet.balance} Ft</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <div style={{ marginTop: '20px' }}>            
            <Button variant="outlined" color="error" onClick={handleDeleteWallet}>
              Tárca törlése
            </Button>
          </div>

          <TransactionList walletId={id} refreshWallet={fetchWallet}/>

          <AccessTable access={access} walletId={id} fetchWallet={fetchWallet} />
        </>
      )}
    </div>
  );
};

export default WalletDetailsPage;

