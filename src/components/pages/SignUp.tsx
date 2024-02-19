import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const SignUp: React.FC = () => {
    // State to store form field values
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
    });

    // Handle form field changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('Form Data Submitted:', formData);
        // Here you can also send the formData to a server or API endpoint
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
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default SignUp;
