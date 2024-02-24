import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';

// Define the RowData interface
interface RowData {
  category: string;
  windSpeed: string;
  payment: string;
  insurancePolicyPrice: string;
}

// Function to create row data
const createData = (
  category: string,
  windSpeed: string,
  payment: string,
  insurancePolicyPrice: string
): RowData => {
  return { category, windSpeed, payment, insurancePolicyPrice };
};

// Data for the basic policy table
const basicPolicyRows: RowData[] = [
  createData('Category 5', '≥ 157 mph', '$1,000', '$50'),
  createData('Category 4', '130 - 156 mph', '$450 - $800', '$50'),
  createData('Category 3', '111 - 129 mph', '$150 - $350', '$50'),
  createData('Category 2', '76 - 110 mph', '$50 - $100', '$50'),
  createData('Category 1', '74 - 95 mph', '$25', '$50'),
];

// Data for the premium policy table
const premiumPolicyRows: RowData[] = [
  createData('Category 5', '≥ 157 mph', '$2,000', '$100'),
  createData('Category 4', '130 - 156 mph', '$900 - $1,600', '$100'),
  createData('Category 3', '111 - 129 mph', '$300 - $700', '$100'),
  createData('Category 2', '76 - 110 mph', '$100 - $200', '$100'),
  createData('Category 1', '74 - 95 mph', '$50', '$100'),
];

// Style for the table cells
const tableCellStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 'bold',
};

// Basic Policy Pricing Table Component
const BasicPolicyPricingTable: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <Container id="prices">
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Basic Policy
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="basic policy table">
          <TableHead>
            <TableRow>
              <TableCell style={tableCellStyle}>Category</TableCell>
              <TableCell style={tableCellStyle} align="right">Wind Speed</TableCell>
              <TableCell style={tableCellStyle} align="right">Payment/year</TableCell>
              <TableCell style={tableCellStyle} align="right">Insurance Policy Price/year</TableCell>
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
    </Container>
  );
};

// Premium Policy Pricing Table Component
const PremiumPolicyPricingTable: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        Premium Policy
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="premium policy table">
          <TableHead>
            <TableRow>
              <TableCell style={tableCellStyle}>Category</TableCell>
              <TableCell style={tableCellStyle} align="right">Wind Speed</TableCell>
              <TableCell style={tableCellStyle} align="right">Payment/year</TableCell>
              <TableCell style={tableCellStyle} align="right">Insurance Policy Price/year</TableCell>
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
    </>
  );
};
// Main component to render the buttons and tables
const InsurancePricing: React.FC = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setShowBasic(!showBasic)} style={{ margin: '10px' }}>
        {showBasic ? 'Hide Basic Policy' : 'Buy Basic Policy at $50/yearly'}
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setShowPremium(!showPremium)} style={{ margin: '10px' }}>
        {showPremium ? 'Hide Premium Policy' : 'Buy Premium Policy at $100/yearly'}
      </Button>
      <BasicPolicyPricingTable show={showBasic} />
      <PremiumPolicyPricingTable show={showPremium} />
      { (showBasic || showPremium) && (
        <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
          Please note: The insurance policy comes into effect 15 days after being paid. 
          The payment amounts listed are illustrative examples only and may not reflect 
          actual prices applicable to your region. Actual payments are subject to variation 
          based on geographical location and other factors. We recommend consulting with our 
          customer service team for detailed pricing information specific to your area.
        </Typography>
      )}
    </div>
  );
};

export default InsurancePricing;
