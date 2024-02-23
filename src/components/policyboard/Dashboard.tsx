// components/policyboard/Dashboard.tsx
import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import HurricaneMap from './HurricaneMap';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Dashboard Placeholder</Typography>
      <HurricaneMap />
      <Button />
        Start Animation
    </Box>
  );
};

export default Dashboard;
