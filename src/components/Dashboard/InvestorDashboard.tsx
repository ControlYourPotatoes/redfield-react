import React from 'react';
import { Box, Container, Paper, Typography, TextField, Button, InputAdornment, Grid } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const InvestorDashboard = () => {
  return (
    // Wrapping Box to make the container center aligned
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Container maxWidth="sm">
        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Invest in Redfield Insurance
          </Typography>
          <Paper elevation={3} sx={{ p: 2, width: '100%', mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Invest in Redfield Insurance
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="From: RDF Policy Insurance"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">RDF</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <SwapHorizIcon fontSize="large" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="To: USDC"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>Price: 1 RDF per 500 USDC</Typography>
                <Typography variant="body2" gutterBottom>Slippage Tolerance: 0.1%</Typography>
                <Typography variant="body2" gutterBottom>Minimum received: 0 USDC</Typography>
                <Typography variant="body2" gutterBottom>Price Impact: {"<"} 0.01%</Typography>
                <Typography variant="body2" gutterBottom>Route: RDF {" > "} USDC</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Invest in Redfield Insurance
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default InvestorDashboard;
