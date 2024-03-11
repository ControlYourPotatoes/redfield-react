import React from 'react';
import { Box, Container, Paper, Typography, TextField, Button, InputAdornment, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// Import SwapVertIcon instead of SwapHorizIcon
import SwapVertIcon from '@mui/icons-material/SwapVert';

const InvestorDashboard = () => {
  return (
    <Box>
      {/* First Section */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="sm">
          <Box mt={8} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Redfield Swap
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
                {/* Replace SwapHorizIcon with SwapVertIcon */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <SwapVertIcon fontSize="large" />
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
                    connect wallet
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Second Section */}
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Liquidity Pool
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Decentralized insurance platform providing flexible conditions on-chain
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>INSURANCE NAME</TableCell>
                    <TableCell align="right">ASSET</TableCell>
                    <TableCell align="right">YIELD</TableCell>
                    <TableCell align="right">TOTAL SUPPLY</TableCell>
                    <TableCell align="right">EXPIRATION</TableCell>
                    <TableCell align="right">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      RDF Insurance
                    </TableCell>
                    <TableCell align="right">USDC</TableCell>
                    <TableCell align="right">0%</TableCell>
                    <TableCell align="right">0.00 USDC</TableCell>
                    <TableCell align="right">TIME OVER</TableCell>
                    <TableCell align="right"><Button variant="contained">Deposit</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InvestorDashboard;
