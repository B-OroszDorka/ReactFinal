import { Divider, Grid, Typography, Paper } from "@mui/material";
import { useTransactions } from "../../../hooks/Transaction/useTransactions";
import { MODALS, useModals } from "../../../hooks/useModal";
import { AddTransaction } from "./AddTransaction";
import { TransactionTable } from "./TransactionTable";
import { AXIOS_METHOD, doApiCall } from "../../../hooks/useApi";
import { useEffect } from "react";

const TransactionList = ({ walletId, refreshWallet }) => {
  const { showModal } = useModals();
  const [
    transactions,
    loading,
    error,
    onLoadMore,
    hasMore,
    fetchTransactions,
  ] = useTransactions(walletId, 5);

  const doRefresh = () => {
     refreshWallet();
    fetchTransactions();
  };

  const onAddNewTransaction = () => {
    showModal(MODALS.ADD_TRANSACTION, {
      walletId: walletId,
      OnSuccessful: () => {
        doRefresh();
      },      
    });
  };

  useEffect(() => {
    console.log("Updated transactions:", transactions);
  }, [transactions]);

  const onDeleteTransaction = (transactionId) => {
    doApiCall(
      AXIOS_METHOD.DELETE,
      `/transaction/${transactionId}`,
      (_unusedNewWallet) => {
        doRefresh();
      },
      (apiError) => {
        showModal(MODALS.ERROR, { message: apiError });
      }
    );
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
        <Typography
          variant="h5"
          fontWeight="medium"
          sx={{ color: "#333" }}
        >
          Tranzakciók
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <AddTransaction
          walletId={walletId}
          onAddNewTransaction={onAddNewTransaction}
        />
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
        <TransactionTable
          transactions={transactions}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          onDeleteTransaction={onDeleteTransaction}
        />
      </Grid>
    </Grid>
  </Paper>
);
};

export default TransactionList;