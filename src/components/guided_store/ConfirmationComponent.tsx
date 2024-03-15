import { Typography, Grid, Paper, Box } from '@mui/material';

import { FormData } from '../../types';

// Assuming formData is passed as a prop containing all form values
const ConfirmationComponent: React.FC<{ formData: FormData }> = ({ formData }) => {
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h2" gutterBottom>
                Confirmation
            </Typography>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Policy Details</Typography>
                        <Typography>Type: {formData.policy.type}</Typography>
                        <Typography>Address: {formData.policy.address}</Typography>
                        {/* Include additional policy details as needed */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Personal Info</Typography>
                        <Typography>Name: {formData.personalInfo.firstName} {formData.personalInfo.lastName}</Typography>
                        <Typography>Phone: {formData.personalInfo.phoneNumber}</Typography>
                        <Typography>Email: {formData.personalInfo.email}</Typography>
                        {/* Include additional personal info details as needed */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Payment Info</Typography>
                        <Typography>Type: {formData.payment.type}</Typography>
                        {/* Include additional payment details as needed */}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ConfirmationComponent;