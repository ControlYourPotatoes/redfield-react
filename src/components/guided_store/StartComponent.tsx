import React from 'react';
import { Typography, Button, Grid } from '@mui/material';

const StartComponent = () => {
    return (
        <div>
            <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
                Experience Insurance Reimagined
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
                No evaluations, no waiting—just instant, reliable coverage.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default StartComponent;
