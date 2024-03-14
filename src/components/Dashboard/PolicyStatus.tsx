import React, { useContext } from 'react';
import PolicyContext from './PolicyContext';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
const getStatusLabel = (status: number) => {
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
          <Typography variant="h5">Policy ID: {policyData.userid}</Typography>
            <Box display="flex" alignItems="center" >
              <Typography variant="body2" color="textSecondary">Expiration Date </Typography>

              
            </Box>
            <Typography variant="body2" color="textSecondary">{policyData.expirationdate} </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2">{UserInfo.firstName} {UserInfo.lastName}</Typography>
          <Typography color="textSecondary">{policyData.address}</Typography>
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
