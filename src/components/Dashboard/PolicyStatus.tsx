import React, { useContext } from 'react';
import PolicyContext from './PolicyContext';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield'; // Assuming you have a Shield icon in Material icons

const getStatusLabel = (status) => {
  const statusMap = {
    1: 'Active',
    0: 'Expired',
    3: 'Warning, Live Weather Event',
    // ... other statuses
  };
  return statusMap[status] || 'Unknown Status';
};

// Placeholder user info
const UserInfo = {
  firstName: 'John',
  lastName: 'Doe',
};

const PolicyStatus: React.FC = () => {
  const policyData = useContext(PolicyContext);

  if (!policyData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card raised>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 100, height: 110 }}>
            <img src="\assets\svg\insurance-svgrepo-com.svg" alt="User Avatar" />
          </Avatar>
          <Box marginLeft={2}>
            <Typography variant="h5">{UserInfo.firstName} {UserInfo.lastName}</Typography>
            <Typography color="textSecondary">{policyData.address}</Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2" color="textSecondary">
            Policy Member ID: {policyData.userId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Expiration Date: {policyData.expirationdate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created At: {policyData.created_at}
          </Typography>
        </Box>
        <Chip label={getStatusLabel(policyData.status)} color="primary" />
        <Typography variant="body1">
          Type of Insurance: {policyData.type}
        </Typography>
        {/* ... other policy details */}
      </CardContent>
    </Card>
  );
};

export default PolicyStatus;
