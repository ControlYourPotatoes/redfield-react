import React, { useState } from 'react';
import { Typography, TextField, Grid, Box } from '@mui/material';
import * as yup from 'yup';
import { useFormikContext } from 'formik';
import { FormData } from './types';

import MapComponent from './MapComponent';

// Validation schema
const personalInfoValidationSchema = yup.object({
  personalInfo: yup.object({
    address: yup.string().required('Address is required'),
  })
});

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const PersonalInfoComponent = () => {
  const { values, setFieldValue } = useFormikContext<FormData>();
  


  const defaultCoordinates = {
    lat: 18.4450625,
    lng: -66.0674375,
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
    const fieldName = name.replace("policy.", "");
    validateField(fieldName, value); // Now passing the adjusted field name

    // Geocode address when address field changes
    if (name === 'policy.address') {
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
    } catch (error: any) {
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
            <TextField
              required
              id="policy.address"
              name="policy.address"
              label="Address"
              fullWidth
              value={values.policy?.address || ''}
              onChange={handleChange}
              error={Boolean(localErrors['personalInfo.address'])}
              helperText={localErrors['personalInfo.address'] || ''}
            />
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