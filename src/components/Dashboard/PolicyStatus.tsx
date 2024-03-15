import React, { useContext } from 'react';
import PolicyContext from './PolicyContext';
import { Card, CardContent, Typography, Box, Chip, SvgIcon } from '@mui/material';
import { Unstable_Grid2 as Grid } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';


const Item = styled(Box)(({ theme }) => ({ 
  // border: '1px dashed black',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'Gray',
}));

const Values = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: 'black',
  fontWeight: 'bold',
  fontFamily: 'Arial',
}));

const PolicyStatus: React.FC = () => {
  const policyData = useContext(PolicyContext);

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

  if (!policyData) {
    return <Typography>Loading...</Typography>;
  }

  const formattedExpirationDate = policyData.expirationdate
  ? format(new Date(policyData.expirationdate), 'PPP')
  : 'N/A';

  const formattedCreatedDate = policyData.created_at
  ? format(new Date(policyData.created_at), 'PPP')
  : 'N/A';

  

  return (
    <Card raised sx={{ maxWidth: 530 }}>
      <CardContent>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid xs={3} display="flex" alignItems="center">
            <Item>
              <img src="\assets\svg\insurance-svgrepo-com.svg" alt="Insurance Icon" style={{ maxWidth: 100 }} />
            </Item>
          </Grid>
          
          <Grid xs={12} sm={9}>
            <Item>
              <Label> Policy Member ID: </Label>
              <Values>{policyData.userid}</Values>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Label color="textSecondary">Policy Status:</Label>
                <Chip label={getStatusLabel(policyData.status)} color="primary" sx={{ ml: 2 }} />
                <Chip label={policyData.type} color="primary" sx={{ ml: 2 }} />
              </Box>
            </Item>
          </Grid>
          
          <Grid xs={6}>
            <Item>
              <Label variant="cardlabel" color="textSecondary">Expire Date</Label>
              <Values sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon color="action" sx={{ marginRight: 1 }} />
                {formattedExpirationDate}
              </Values>
            </Item>
          </Grid>
          
          <Grid xs={6}>
            <Item>
              <Label variant="cardlabel" color="textSecondary">Policy Holder</Label>
              <Values>{UserInfo.firstName} {UserInfo.lastName}</Values>
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item>
              <Label variant="cardlabel" color="textSecondary">Date Created</Label>
              <Values>{formattedExpirationDate}</Values>
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item>
              <Label variant="cardlabel" color="textSecondary">Insured Address</Label>
              <Values>{policyData.address}</Values> 
            </Item>
          </Grid>

          
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PolicyStatus;
