import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const createData = (category: string, windSpeed: string, payment: string, polizaPrice: string) => {
  return { category, windSpeed, payment, polizaPrice };
}

const originalRows = [
  createData('Category 5', '≥ 157 mph', '$1,000', '$52'),
  createData('Category 4', '137 - 156 mph', '$800', '$52'),
  createData('Category 3', '111 - 136 mph', '$650', '$52'),
  createData('Category 2', '96 - 110 mph', '$400', '$52'),
  createData('Category 1', '≤ 95 mph', '$52', '$52'),
];

const additionalRows = [
  createData('New Category', 'New Wind Speed Range', '$2,000', '$104'),
];

const OriginalPricingTable = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Original Payment Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="original table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Poliza Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {originalRows.map((row) => (
              <TableRow key={row.category}>
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

const AdditionalPricingTable = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Additional Payment Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="additional table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Poliza Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalRows.map((row) => (
              <TableRow key={row.category}>
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

export { OriginalPricingTable, AdditionalPricingTable };
