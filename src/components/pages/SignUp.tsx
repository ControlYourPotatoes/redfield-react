import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Container, TextField, Button, Typography } from '@mui/material';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
    });

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

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

        // Call your backend server to create a payment intent and get the client secret
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1000, // Amount in cents
            }),
        });

        const { clientSecret } = await response.json();

        // Confirm the card payment with the client secret
        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                },
            },
        });

        setLoading(false);

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Payment successful');
            // Handle successful payment
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
                    {loading ? 'Processing...' : 'Submit'}
                </Button>
            </form>
        </Container>
    );
};

export default SignUp;

