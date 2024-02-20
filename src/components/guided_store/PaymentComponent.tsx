import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Card, CardContent, CardActionArea, CardMedia, Grid } from '@mui/material';
import CardPayment from './CardPayment';
import WalletPayment from './WalletPayment';
import MetamaskIcon from "https://raw.githubusercontent.com/ControlYourPotatoes/redfield-react/Puga/public/assets/icon/metamask-icon.svg";
import CardIcon from '@mui/icons-material/CreditCard';

const PaymentComponent: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('wallet');
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodChange = (method: 'wallet' | 'card') => {
    setPaymentMethod(method);
  };

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
        Select Payment Method
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant={paymentMethod === 'wallet' ? 'elevation' : 'outlined'}>
            <CardActionArea onClick={() => handlePaymentMethodChange('wallet')}>
              <CardMedia
                component="img"
                height="130"
                src="https://raw.githubusercontent.com/ControlYourPotatoes/redfield-react/Puga/public/assets/icon/metamask-icon.svg"
                alt="Metamask Icon"
                style={{ width: 'auto', maxHeight: '100%', padding: '30px',}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Wallet
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant={paymentMethod === 'card' ? 'elevation' : 'outlined'}>
            <CardActionArea onClick={() => handlePaymentMethodChange('card')}>
              <CardIcon sx={{ fontSize: 160, padding: '10px', width: 'auto' }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Card
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        {paymentMethod === 'wallet' ? (
          <WalletPayment handlePaymentMethodChange={handlePaymentMethodChange} />
        ) : (
          <CardPayment />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Proceed'}
        </Button>
      </form>
    </div>
  );
};

export default PaymentComponent;
