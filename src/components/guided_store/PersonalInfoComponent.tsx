import React from 'react';
import PuertoRicoMap from '../PuertoRicoMap';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';

const PersonalInfoComponent = () => {
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Policy Holder Information
            </Typography>
            {/* Wrapper for the form fields */}
            <Box component="form" sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>
            {/* Wrapper with padding for the map component */}
            <Box sx={{ padding: 2 }}>
                <PuertoRicoMap />
            </Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Save Information
            </Button>
        </div>
    );
};

export default PersonalInfoComponent;
