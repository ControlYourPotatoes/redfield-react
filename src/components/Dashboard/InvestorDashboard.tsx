import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, Typography } from '@mui/material';

const InvestorDashboard = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Azurance
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Decentralized insurance platform that providing flexible conditions on-chain
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* This is where your table will go */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>INSURANCE NAME</TableCell>
                  <TableCell align="right">ASSET</TableCell>
                  <TableCell align="right">BENEFIT</TableCell>
                  <TableCell align="right">UTILIZATION</TableCell>
                  <TableCell align="right">TOTAL SUPPLY</TableCell>
                  <TableCell align="right">EXPIRATION</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Example row */}
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    10minTestCovid
                  </TableCell>
                  <TableCell align="right">USD Tether</TableCell>
                  <TableCell align="right">10x</TableCell>
                  <TableCell align="right">0%</TableCell>
                  <TableCell align="right">0.00 USDT</TableCell>
                  <TableCell align="right">TIME OVER</TableCell>
                  <TableCell align="right"><Button variant="contained">Buy</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InvestorDashboard;
