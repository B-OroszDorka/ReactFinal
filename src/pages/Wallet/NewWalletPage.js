import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doApiCall, AXIOS_METHOD } from "../../hooks/useApi";
import { Button, TextField, Box, Paper, Grid, Typography } from '@mui/material';

const NewWalletPage = () => {
  const [walletName, setWalletName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    doApiCall(
      AXIOS_METHOD.PUT,
      '/wallet',
      (data) => {
        navigate('/wallets');
      },
      (err) => {
        console.error("Error:", err);
      },
      {
        name: walletName,
        description: description,
        extra: {}
      }
    );
  }

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 400, p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Új tárca
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tárca neve"
                id="walletName"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Leírás"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Tárca létrehozása
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate('/wallets')}
              >
                Vissza a tárcákhoz
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewWalletPage;
