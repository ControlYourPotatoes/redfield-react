import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const createData = (category: string, windSpeed: string, payment: string, polizaPrice: string) => {
  return { category, windSpeed, payment, polizaPrice };
}

const rows = [
  createData('Category 5', '≥ 157 mph', '$1,000', '$52'),
  createData('Category 4', '137 - 156 mph', '$800', '$52'),
  createData('Category 3', '111 - 136 mph', '$650', '$52'),
  createData('Category 2', '96 - 110 mph', '$400', '$52'),
  createData('Category 1', '≤ 95 mph', '$52', '$52'),
  // Additional row
  createData('New Category', 'New Wind Speed Range', '$2,000', '$104'),
];

const PricingTable = () => {
  return (
    <>
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
              <TableCell align="right">Poliza Price</TableCell>
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
                <TableCell align="right">{row.polizaPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PricingTable;
