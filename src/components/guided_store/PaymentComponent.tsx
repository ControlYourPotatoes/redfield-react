import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Typography } from '@mui/material';

const PaymentComponent: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    setLoading(false);

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Handle successful payment here
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
        </Button>
      </form>
    </div>
  );
};

export default PaymentComponent;
