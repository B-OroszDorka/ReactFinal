import React, { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WalletList() {
  const { wallets } = useContext(WalletContext);
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {wallets.map((wallet) => (
        <Grid item xs={12} sm={6} md={4} key={wallet.id}>
          <Card
            onClick={() => navigate(`/wallets/${wallet.id}`)}
            style={{ cursor: 'pointer', height: '100%' }}
            elevation={3}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {wallet.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Egyenleg: {wallet.balance} Ft
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default WalletList;
