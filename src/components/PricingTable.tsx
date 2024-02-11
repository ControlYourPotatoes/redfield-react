import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const createData = (category, windSpeed, payment) => {
  return { category, windSpeed, payment };
}

const rows = [
  createData('Category 5', '≥ 157 mph', '$1,000'),
  createData('Category 4', '137 - 156 mph', '$800'),
  createData('Category 3', '111 - 136 mph', '$650'),
  // Add more rows as needed
];

const PricingTable = () => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Payment Table
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Wind Speed</TableCell>
            <TableCell align="right">Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.category}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.windSpeed}</TableCell>
              <TableCell align="right">{row.payment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
