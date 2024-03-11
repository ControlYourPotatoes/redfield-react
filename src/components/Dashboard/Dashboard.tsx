// components/policyboard/Dashboard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import HurricaneMap from './HurricaneMap';
import ReceiptComponent from './Map Receipt/ReceiptComponent';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Dashboard Placeholder</Typography>
      <HurricaneMap />
      <ReceiptComponent
        policyHolder={{
          firstName: 'Sofia',
          lastName: 'Smith',
          email: 'sofia@test.com',
          address: '123 Main St'
        }}
        policyType="basic"
        hurricaneDetails={{ category: 3 }}
        date="04-21-2024"
      />
          
    </Box>
  );
};

export default Dashboard;
