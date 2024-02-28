import React from 'react';
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
} from '@mui/material';

interface Props {
  policyType: 'basic' | 'premium';
}

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

// Pricing Table Component
const PricingTable: React.FC<Props> = ({ policyType }) => {
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

  const tableData = policyType === 'basic' ? basicPolicyRows : premiumPolicyRows;

  return (
    <Container id={`${policyType}Prices`}>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '16px' }}>
        {policyType === 'basic' ? 'Basic Policy' : 'Premium Policy'}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label={`${policyType} policy table`}>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
              <TableCell align="right">Payment/year</TableCell>
              <TableCell align="right">Insurance Policy Price/year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
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

export default PricingTable;
