import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

// Assuming formData is passed as a prop containing all form values
const ConfirmationComponent = ({ formData }) => {
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h2" gutterBottom>
                Confirmation
            </Typography>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Policy Details</Typography>
                        <Typography>Type: {formData.policy?.type}</Typography>
                        {/* Display other policy details */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Personal Info</Typography>
                        <Typography>Name: {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}</Typography>
                        <Typography>Phone: {formData.personalInfo?.phoneNumber}</Typography>
                        <Typography>Email: {formData.personalInfo?.email}</Typography>
                        <Typography>Address: {formData.personalInfo?.address}</Typography>
                        {/* Display other personal info details */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Payment Info</Typography>
                        <Typography>Type: {formData.payment?.type}</Typography>
                        {/* Display other payment details */}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ConfirmationComponent;
