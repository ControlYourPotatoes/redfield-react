import React from 'react';
import { Typography, Button } from '@mui/material';

const WalletPayment = ({ handlePaymentMethodChange }: { handlePaymentMethodChange: Function }) => {
  const handleWalletPayment = () => {
    // Perform any necessary actions to connect with Metamask or other wallet providers
    // Once connected, notify the parent component about the selected payment method
    handlePaymentMethodChange('wallet');
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Wallet Payment
      </Typography>
      <Typography variant="body1" paragraph>
        Please connect your wallet and complete the transaction using the provided interface.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleWalletPayment}>
        Complete Wallet Payment
      </Button>
    </div>
  );
};

export default WalletPayment;
