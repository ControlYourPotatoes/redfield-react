// components/policyboard/Dashboard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import HurricaneMap from './HurricaneMap';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Dashboard </Typography>
      <Typography>Current Weather</Typography>
      <HurricaneMap />
    </Box>
  );
};

export default Dashboard;
