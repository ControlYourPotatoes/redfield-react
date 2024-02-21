import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';
import * as yup from 'yup';

// Define the validation schema using Yup
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

  // Handle field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Optionally reset field error
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate form values
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({}); // Reset errors if validation succeeds

      // API call to send data to the server
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      console.log('Form submission successful');
      // Process server response or clear form, etc.
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formErrors = err.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        console.error('Submission error:', err);
        // Handle other errors (e.g., network error, server error)
      }
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Policy Holder Information
      </Typography>
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
              error={Boolean(errors.firstName)}
              helperText={errors.firstName || ''}
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
              error={Boolean(errors.lastName)}
              helperText={errors.lastName || ''}
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
              error={Boolean(errors.phone)}
              helperText={errors.phone || ''}
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
              error={Boolean(errors.email)}
              helperText={errors.email || ''}
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
              error={Boolean(errors.address)}
              helperText={errors.address || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Information
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PersonalInfoComponent;
