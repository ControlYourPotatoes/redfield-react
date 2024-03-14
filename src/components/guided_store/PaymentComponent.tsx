import React from 'react';
import { Button, CircularProgress, Typography, Card, CardContent, CardActionArea, CardMedia, Grid } from '@mui/material';
import CardPayment from './CardPayment';
import WalletPayment from './WalletPayment';
import CardIcon from '@mui/icons-material/CreditCard';
import { useFormikContext } from 'formik';
import { FormData } from './types'; // Make sure the path is correct based on your project structure


const PaymentComponent: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormData>();
  const [loading, setLoading] = React.useState(false);

  const handlePaymentMethodChange = (method: 'wallet' | 'card') => {
    setFieldValue('payment.type', method);
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
          <Card variant={values.payment.type === 'wallet' ? 'elevation' : 'outlined'}>
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
        <Card variant={values.payment.type === 'card' ? 'elevation' : 'outlined'}>
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
        {values.payment.type === 'wallet' ? (
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