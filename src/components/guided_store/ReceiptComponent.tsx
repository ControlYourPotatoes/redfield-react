import React from 'react';
import { Typography, Box } from '@mui/material';

interface ReceiptProps {
  policyHolder: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  policyType: 'basic' | 'premium';
  hurricaneDetails: {
    category: number;
  };
  date: string;
}

const ReceiptComponent: React.FC<ReceiptProps> = ({
  policyHolder,
  policyType,
  hurricaneDetails,
  date,
}) => {
  // Directly determine the insurance policy price based on policyType and hurricane category
  const getInsurancePolicyPrice = (policyType: 'basic' | 'premium', category: number): string => {
    // Simplified for demonstration, you can expand this logic based on your full pricing structure
    const basePrice = policyType === 'basic' ? 50 : 100; // Assuming base price for basic and premium policies
    let categoryMultiplier = 1; // Default multiplier

    switch (category) {
      case 1:
        categoryMultiplier = 1;
        break;
      case 2:
        categoryMultiplier = 1.2;
        break;
      case 3:
        categoryMultiplier = 1.5;
        break;
      case 4:
        categoryMultiplier = 2;
        break;
      case 5:
        categoryMultiplier = 2.5;
        break;
      default:
        console.error('Invalid hurricane category');
    }

    return `$${(basePrice * categoryMultiplier).toFixed(2)}`;
  };

  const price = getInsurancePolicyPrice(policyType, hurricaneDetails.category);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Receipt</Typography>
      <Typography>Policy Holder: {policyHolder.firstName} {policyHolder.lastName}</Typography>
      <Typography>Email: {policyHolder.email}</Typography>
      <Typography>Address: {policyHolder.address}</Typography>
      <Typography>Policy Type: {policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy</Typography>
      <Typography>Hurricane Category: {hurricaneDetails.category}</Typography>
      <Typography>Price: {price}</Typography>
      <Typography>Date: {date}</Typography>
    </Box>
  );
};

export default ReceiptComponent;
