import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, InputAdornment, Grid, IconButton,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const usdcLogo = '/assets/icon/USDC.png';
const rdfLogo = '/assets/icon/RedField.png';

const InvestorDashboard: React.FC = () => {
  const [fromValue, setFromValue] = useState({ label: 'RDF Policy Insurance', logo: rdfLogo });
  const [toValue, setToValue] = useState({ label: 'USDC', logo: usdcLogo });

  const handleSwap = () => {
    setFromValue(prevState => ({ ...toValue }));
    setToValue(prevState => ({ ...fromValue }));
  };

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
                    label="From"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={fromValue.logo} alt="From Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                          {fromValue.label}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <IconButton onClick={handleSwap}>
                    <SwapVertIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="To"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={toValue.logo} alt="To Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                          {toValue.label}
                        </InputAdornment>
                      ),
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
                    Connect Wallet
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
                      <Box display="flex" alignItems="center">
                        <img src={rdfLogo} alt="Redfield Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                        RDF Insurance
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center">
                        <img src={usdcLogo} alt="USDC Logo" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
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
                  {/* Additional rows as needed */}
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
