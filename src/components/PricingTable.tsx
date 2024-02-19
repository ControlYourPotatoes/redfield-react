import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const createData = (category, windSpeed, payment, insurancePolicyPrice) => {
  return { category, windSpeed, payment, insurancePolicyPrice };
}

const basicPolicyRows = [
  createData('Category 5', '≥ 157 mph', '$1,000', '$50'),
  createData('Category 4', '130 - 156 mph', '$450 - $800', '$50'),
  createData('Category 3', '111 - 129 mph', '$150 - $350', '$50'),
  createData('Category 2', '76 - 110 mph', '$50 - $100', '$50'),
  createData('Category 1', '74 - 95 mph', '$25', '$50'),
];

const premiumPolicyRows = [
  createData('Category 5', '≥ 157 mph', '$2,000', '$100'),
  createData('Category 4', '130 - 156 mph', '$900 - $1,600', '$100'),
  createData('Category 3', '111 - 129 mph', '$300 - $700', '$100'),
  createData('Category 2', '76 - 110 mph', '$100 - $200', '$100'),
  createData('Category 1', '74 - 95 mph', '$50', '$100'),
];

const BasicPolicyPricingTable = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Basic Policy Payment Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="basic policy table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Insurance Policy Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basicPolicyRows.map((row) => (
              <TableRow key={row.category}>
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="right">{row.windSpeed}</TableCell>
                <TableCell align="right">{row.payment}</TableCell>
                <TableCell align="right">{row.insurancePolicyPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const PremiumPolicyPricingTable = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Premium Policy Payment Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="premium policy table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Insurance Policy Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {premiumPolicyRows.map((row) => (
              <TableRow key={row.category}>
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="right">{row.windSpeed}</TableCell>
                <TableCell align="right">{row.payment}</TableCell>
                <TableCell align="right">{row.insurancePolicyPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
        Please note: The payment amounts listed are illustrative examples only and may not reflect actual prices applicable to your region. Actual payments are subject to variation based on geographical location and other factors. We recommend consulting with our customer service team for detailed pricing information specific to your area.
      </Typography>
    </>
  );
}

export { BasicPolicyPricingTable, PremiumPolicyPricingTable };
