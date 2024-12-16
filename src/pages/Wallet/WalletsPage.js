import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { doApiCall, AXIOS_METHOD } from "../../hooks/useApi";
import { Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { WalletContext } from '../../context/WalletContext';
import WalletList from './Components/WalletList';

const WalletsPage = () => {
  const { sessionUser, setSessionUser } = useAuth();
  const { wallets, setWallets } = useContext(WalletContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (sessionUser == null || sessionUser.name === undefined) {
      navigate('/');
      return;
    }

    const fetchWallets = async () => {      
      setLoading(true);
      try {
        doApiCall(
          AXIOS_METHOD.GET,
          '/wallets',
          (data) => {
            setWallets(data);
          }
        );
      } catch (error) {
        console.error('Error fetching wallets:', error);
        if (error.response && error.response.status === 403) {
          console.error('Authentication required');
          navigate('/');
        }
      }finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [sessionUser, navigate]);

return (
  <Box sx={{ p: 3 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight="bold" align="center">
        Üdv, {sessionUser?.name}!
      </Typography>
    </Box>

    <Box sx={{ my: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: '#333' }}>
          Tárcáim
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <WalletList />
        )}
      </Paper>
    </Box>

    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => navigate('/new')}
        sx={{ width: '100%', maxWidth: 350, py: 1.5 }}
      >
        Új tárca hozzáadása
      </Button>
    </Box>
  </Box>
);
};

export default WalletsPage;


