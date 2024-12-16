import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const TransactionModal = ({ open, onClose, onSubmit }) => {
  const [type, setType] = useState('positive');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {    
    onSubmit({ type, amount: parseFloat(amount) });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Új tranzakció
        </Typography>
        <RadioGroup
          value={type}
          onChange={(e) => setType(e.target.value)}
          row
        >
          <FormControlLabel value="positive" control={<Radio />} label="Bevétel" />
          <FormControlLabel value="negative" control={<Radio />} label="Kiadás" />
        </RadioGroup>
        <TextField
          fullWidth
          type="number"
          label="Összeg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ marginRight: 1 }}>
            Mégse
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Mentés
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
