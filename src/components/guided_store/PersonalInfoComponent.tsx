import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';
import * as yup from 'yup';
import { useFormikContext } from 'formik';

import MapComponent from './MapComponent';

// Validation schema
const personalInfoValidationSchema = yup.object({
  personalInfo: yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be only digits'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    address: yup.string().required('Address is required'),
  })
});

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const PersonalInfoComponent = () => {
  const { values, setFieldValue} = useFormikContext();
  


  const defaultCoordinates = {
    lat: 18.2208,
    lng: -66.5901,
  };

  const [coordinates, setCoordinates] = useState({ lat: 18.2208, lng: -66.5901 }); // Default to Puerto Rico's approximate center

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

  interface LocalErrors {
    'personalInfo.firstName'?: string;
    'personalInfo.lastName'?: string;
    'personalInfo.phoneNumber'?: string;
    'personalInfo.email'?: string;
    'personalInfo.address'?: string;
    [key: string]: string | undefined; // This line allows indexing with any string, but each property must be a string or undefined
  }
  
  const [localErrors, setLocalErrors] = useState<LocalErrors>({});

  // Handles changes in the text fields and updates formValues state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Field changed - Name: ${name}, Value: ${value}`);
    setFieldValue(name, value); // Keep this as is to update the form state correctly
    
    // Remove the 'personalInfo.' prefix before passing to validateField
    const fieldName = name.replace("personalInfo.", "");
    validateField(fieldName, value); // Now passing the adjusted field name

    // Geocode address when address field changes
    if (name === 'personalInfo.address') {
      // Only geocode when the address field has a non-empty value
      if (value.trim() !== '') {
        geocodeAddress(value);
      } else {
        // Reset coordinates if the address field is cleared
        setCoordinates(defaultCoordinates);
      }
    }
  };

  const validateField = async (fieldName: string, value: string) => {
    // Construct the path with 'personalInfo' prefix for Yup validation
    const path = `personalInfo.${fieldName}`;
    console.log(`Validating: ${path} with value: ${value}`);
  
    try {
      await personalInfoValidationSchema.validateAt(path, { personalInfo: { [fieldName]: value } });
      console.log(`${path} is valid`);
      // Note: Adjust localErrors state structure if needed to match this path
      setLocalErrors((prev) => ({ ...prev, [path]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(`${path} is invalid:`, error.message);
        // Adjust localErrors to use the full path or just fieldName, based on your state structure
        setLocalErrors((prev) => ({ ...prev, [path]: error.message }));
      }
    }
  };
  
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Policy Holder Information
      </Typography>
      <Box component="form" sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="personalInfo.firstName"
              name="personalInfo.firstName"
              label="First Name"
              fullWidth
              value={values.personalInfo?.firstName || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.firstName'])}
              helperText={localErrors['personalInfo.firstName'] || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="personalInfo.lastName"
              name="personalInfo.lastName"
              label="Last Name"
              fullWidth
              value={values.personalInfo?.lastName || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.lastName'])}
              helperText={localErrors['personalInfo.lastName'] || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="personalInfo.phoneNumber"
              name="personalInfo.phoneNumber"
              label="Phone Number"
              fullWidth
              value={values.personalInfo?.phoneNumber || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.phoneNumber'])}
              helperText={localErrors['personalInfo.phoneNumber'] || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="personalInfo.email"
              name="personalInfo.email"
              label="Email"
              fullWidth
              value={values.personalInfo?.email || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.email'])}
              helperText={localErrors['personalInfo.email'] || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="personalInfo.address"
              name="personalInfo.address"
              label="Address"
              fullWidth
              value={values.personalInfo?.address || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.address'])}
              helperText={localErrors['personalInfo.address'] || ''}
            />
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