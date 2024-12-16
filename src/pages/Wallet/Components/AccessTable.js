import React from 'react';
import { Paper, Grid, Typography, Divider, IconButton, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { MODALS, useModals } from "../../../hooks/useModal";
import { doApiCall, AXIOS_METHOD } from "../../../hooks/useApi";

const AccessTable = ({ access = [], walletId, loading, fetchWallet }) => {
  const { showModal } = useModals();

  const handleRemove = (userId) => {
    showModal(MODALS.CONFIRM, {
      message: "Biztosan törölni szeretnéd a felhasználó hozzáférését?",
      onConfirmed: () => {
        try {
          console.log(userId);
          doApiCall(
            AXIOS_METHOD.POST,
            `/wallet/${walletId}/remove_access`,
            (data) => {
              fetchWallet();
            },
            (err) => {
              console.error("Error:", err);
            },
            {
              user_id: userId,
            }
          );
        } catch (error) {
          console.error('Error deleting access of user:', error);
          showModal(MODALS.ERROR, { message: 'Failed to delete access of user' });
        }
      },
    });
  };
  const handleShareWallet = () => {
    showModal(MODALS.SHARE_WALLET, {
      walletId: walletId,
      onClose: () => {
        showModal(MODALS.NONE);
        fetchWallet();
      },
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mt: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="medium" sx={{ color: "#333" }}>
            Hozzáférők
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
    <Button
      variant="contained"
      color="success"
      onClick={handleShareWallet}
      style={{ marginRight: '10px' }}
    >
      Tárca megosztása
    </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider
            sx={{
              mt: 2,
              mb: 2,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
            aria-hidden="true"
          />
        </Grid>

        <Grid item xs={12}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Név</Typography>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {access.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body2">Senki nem fér hozzá :(</Typography>
                  </TableCell>
                </TableRow>
              )}
              {access.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        handleRemove(item.id)
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading && (
                <TableRow>
                  <TableCell sx={{ borderWidth: 0 }} colSpan={3}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ borderWidth: 0 }} colSpan={3}>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccessTable;
