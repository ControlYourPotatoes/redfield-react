// ReceiptComponent.tsx

import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

interface ReceiptProps {
  policyHolder: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  policyType: 'basic' | 'premium';
  hurricaneDetails: {
    speed: number; // mph
    category: number;
  };
  price: number; // This could be calculated based on the policy type and hurricane details
  date: string; // Purchase date
}

const ReceiptComponent: React.FC<ReceiptProps> = ({
  policyHolder,
  policyType,
  hurricaneDetails,
  price,
  date,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Receipt</Typography>
      <Typography variant="h6">Policy Holder Information:</Typography>
      {/* Display policy holder info */}
      <Grid container spacing={2}>
        {/* Similar structure for other information */}
      </Grid>
      {/* Continue with the rest of the receipt details */}
    </Box>
  );
};

export default ReceiptComponent;
