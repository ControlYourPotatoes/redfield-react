import React, { useState } from 'react';
import PuertoRicoMap from '../PuertoRicoMap';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phone: yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be only digits'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    address: yup.string().required('Address is required'),
});

const PersonalInfoComponent = () => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
        // Optionally reset errors
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Validate form values
            await validationSchema.validate(formValues, { abortEarly: false });
            setErrors({}); // Reset errors if validation succeeds
            // Handle form submission (e.g., send data to backend)
            console.log('Form submission data:', formValues);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // Transform the validation errors to a more manageable structure
                const formErrors = err.inner.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setErrors(formErrors);
            }
        }
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Policy Holder Information
            </Typography>
            {/* Wrapper for the form fields and submit button */}
            <Box component="form" sx={{ padding: 2 }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            value={formValues.firstName}
                            onChange={handleChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            value={formValues.lastName}
                            onChange={handleChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone"
                            fullWidth
                            value={formValues.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            value={formValues.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            value={formValues.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                    </Grid>
                    {/* Submit button moved inside the form */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Save Information
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* Wrapper with padding for the map component */}
            <Box sx={{ padding: 2 }}>
                <PuertoRicoMap />
            </Box>
        </div>
    );
};

export default PersonalInfoComponent;
