import React, { useState } from 'react';
import { Button, CircularProgress, Typography, TextField } from '@mui/material';

const CardPayment: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate form submission or handle other logic here

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Card Payment Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="cardNumber"
          label="Card Number"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="expiryDate"
          label="Expiry Date"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="cvc"
          label="CVC"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
        </Button>
      </form>
    </div>
  );
};

export default CardPayment;
