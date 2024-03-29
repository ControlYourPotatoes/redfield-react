import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, InputAdornment, Grid, IconButton,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import EthereumPriceChart from './EthereumPriceChart'; // Adjust this import path as necessary

// Direct reference from the public folder for the logos
const usdcLogoPath = '/assets/icon/USDC.png';
const rdfLogoPath = '/assets/icon/RedField.png';

const InvestorDashboard: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState({
    label: "RDF Policy Insurance",
    logo: rdfLogoPath,
    symbol: "RDF"
  });
  const [toCurrency, setToCurrency] = useState({
    label: "USDC",
    logo: usdcLogoPath,
    symbol: "USDC"
  });

  const handleSwap = () => {
    setFromCurrency(prev => toCurrency);
    setToCurrency(prev => fromCurrency);
  };

  return (
    <Box>
      {/* Redfield Swap Section */}
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center" alignItems="start">
          <Grid item xs={12} md={6}>
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
                      label="From"
                      fullWidth
                      variant="outlined"
                      value={fromCurrency.label}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={fromCurrency.logo} alt={`${fromCurrency.label} logo`} style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <IconButton onClick={handleSwap} aria-label="Swap">
                      <SwapVertIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="To"
                      fullWidth
                      variant="outlined"
                      value={toCurrency.label}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={toCurrency.logo} alt={`${toCurrency.label} logo`} style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                      Price: 1 RDF per 500 USDC
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Slippage Tolerance: 0.1%
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Minimum received: 0 USDC
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Price Impact: {"<"} 0.01%
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Route: RDF {" > "} USDC
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                      Connect Wallet
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>

          {/* Ethereum Price Chart Section */}
          <Grid item xs={12} md={6}>
            <Box mt={26} sx={{ height: '100%', width: '100%', ml: { md: 2 } }}>
              <EthereumPriceChart />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Liquidity Pool Section */}
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
                      <Box display="flex" alignItems="center">
                        <img src={rdfLogoPath} alt="RDF Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                        RDF Insurance
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <img src={usdcLogoPath} alt="USDC Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                        USDC
                      </Box>
                    </TableCell>
                    <TableCell align="right">0%</TableCell>
                    <TableCell align="right">0.00 USDC</TableCell>
                    <TableCell align="right">TIME OVER</TableCell>
                    <TableCell align="right">
                      <Button variant="contained">Deposit</Button>
                    </TableCell>
                  </TableRow>
                  {/* Additional rows can be added as needed */}
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
