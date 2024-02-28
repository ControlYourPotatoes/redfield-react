import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';
import * as yup from 'yup';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import MapComponent from './MapComponent';

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be only digits'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
});

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const PersonalInfoComponent = () => {
  interface FormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    // Add any other fields you're using
  }
  
  // Then use this interface when calling useState
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    // Initialize any other fields you're using
  });

  const [errors, setErrors] = useState({});

  const defaultCoordinates = {
    lat: 18.2208,
    lng: -66.5901,
  };

  const [coordinates, setCoordinates] = useState({ lat: 18.2208, lng: -66.5901 }); // Default to Puerto Rico's approximate center


  // Handles changes in the text fields and updates formValues state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Field changed - Name: ${name}, Value: ${value}`); // Debugging output
    setFormValues({ ...formValues, [name]: value });

    // Geocode address when address field changes
    if (name === 'address') {
      // Only geocode when the address field has a non-empty value
      if (value.trim() !== '') {
        geocodeAddress(value);
      } else {
        // Reset coordinates if the address field is cleared
        setCoordinates(defaultCoordinates);
      }
    }
  };

  // Function to geocode address using Google's Geocoding API
  const geocodeAddress = async (address: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        console.error('Geocoding error:', data.status);
      }
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
    }
  };

    // Function to handle form submission
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      try {
        // Validate form values
        await validationSchema.validate(formValues, { abortEarly: false });
        setErrors({}); // Reset errors if validation succeeds
  
        // Here, insert the API call logic to send data to your backend
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phone: formValues.phoneNumber,
            email: formValues.email,
            address: formValues.address,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Server responded with an error');
        }
  
        console.log('Form submission successful');
        // Handle success here, e.g., showing a success message or redirecting the user
      } catch (err) {
        console.error('Submission error:', err);
        if (err instanceof yup.ValidationError) {
          // Transform Yup validation errors to a more manageable structure
          const formErrors = err.inner.reduce((acc, current) => {
            acc[current.path] = current.message;
            return acc;
          }, {});
          setErrors(formErrors);
        }
        // Handle other errors, e.g., network error or server error
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
              id="phoneNumber"
              name="phoneNumber"
              label="Phone"
              fullWidth
              value={formValues.phoneNumber}
              onChange={handleChange}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber || ''}
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
      {/* Displaying the Puerto Rico map component below the form */}
      <Box sx={{ padding: 2 }}>
          <MapComponent coordinates={coordinates} />
          {/* Display coordinates */}
          {coordinates.lat && coordinates.lng && (
              <Typography>
                Coordinates: {coordinates.lat}, {coordinates.lng}
              </Typography>)}
      </Box>
    </div>
  );
};

export default PersonalInfoComponent;
