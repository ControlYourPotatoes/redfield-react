import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Container, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
    });

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet. Please try again later.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError("Stripe Card Element has not loaded yet. Please try again later.");
            setLoading(false);
            return;
        }

        try {
            const paymentIntentResponse = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1000, // Amount in cents
                }),
            });

            const paymentIntent = await paymentIntentResponse.json();

            const paymentResult = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: formData.name,
                        email: formData.email,
                    },
                },
            });

            if (paymentResult.error) {
                setError(`Payment failed: ${paymentResult.error.message}`);
                setLoading(false);
                return;
            }

            // Here, send the user information to your backend
            const userInfoResponse = await fetch('/save-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!userInfoResponse.ok) {
                throw new Error('Failed to save user information');
            }

            const userInfo = await userInfoResponse.json();
            console.log('User information saved', userInfo);
            setSuccess("Payment successful and user information saved.");
        } catch (error) {
            setError(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <CardElement />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!stripe || loading}
                    style={{ marginTop: '20px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </form>
        </Container>
    );
};

export default SignUp;
