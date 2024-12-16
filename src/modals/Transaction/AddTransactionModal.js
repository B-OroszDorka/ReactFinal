import { Dialog, DialogContent, DialogTitle, Grid, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { AXIOS_METHOD, doApiCall } from "../../hooks/useApi";
import { useState } from "react";

const validateTitle = (title) => {
  if (!title) {
    return "Title is required";
  }
};

const validateAmount = (amount) => {
  if (!amount || isNaN(amount) || amount === 0) {
    return "Amount is required";
  }
};

export const AddTransactionModal = ({
  onClose,
  walletId,
  OnSuccessful: onSuccessful = false,
}) => {
  const [formValues, setFormValues] = useState({
    wallet_id: walletId,
    title: "",
    amount: 0,
  });

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: validateTitle(formValues.title),
      amount: validateAmount(formValues.amount),
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.amount) {
      return;
    }

    setIsSubmitting(true);

    doApiCall(
      AXIOS_METHOD.PUT,
      "/transactions",
      (_unusedNewWallet) => {
        setIsSubmitting(false);
        if (onSuccessful !== false) {
          onSuccessful();
        }
        onClose();
      },
      (apiError) => {
        setErrors({ title: apiError });
        setIsSubmitting(false);
      },
      formValues
    );
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>New Transaction</DialogTitle>
      <DialogContent>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={formValues.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                value={formValues.amount}
                onChange={handleChange}
                error={Boolean(errors.amount)}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Add new transaction
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

