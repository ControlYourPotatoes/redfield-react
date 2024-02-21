import React, { useState } from 'react';
import PuertoRicoMap from '../PuertoRicoMap';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';

const PersonalInfoComponent = () => {
    // State to store form field values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
    });

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Here you can send the formData to your backend/server
        try {
            const response = await fetch('http://localhost:3001/personal-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle response data here
            const data = await response.json();
            console.log('Success:', data);
            // Optionally, clear the form or give user feedback
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Policy Holder Information
            </Typography>
            {/* Wrapper for the form fields */}
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {/* Include the handleChange function in each TextField's onChange */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Repeat for each field */}
                    {/* ... */}
                </Grid>
                {/* Wrapper with padding for the map component */}
                <Box sx={{ padding: 2 }}>
                    <PuertoRicoMap />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save Information
                </Button>
            </Box>
        </div>
    );
};

export default PersonalInfoComponent;
