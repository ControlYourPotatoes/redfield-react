import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PolicyHolder {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

type PolicyType = 'standard' | 'premium';

interface HurricaneDetails {
  category: number;
}

interface ReceiptProps {
  policyHolder: PolicyHolder;
  policyType: PolicyType;
  hurricaneDetails: HurricaneDetails;
  date: string;
}

const ReceiptComponent: React.FC<ReceiptProps> = ({
  policyHolder,
  policyType,
  hurricaneDetails,
  date,
}) => {
  // Pricing data
  const pricingData: { [key in PolicyType]: { category: number; payment: number }[] } = {
    standard: [
      { category: 5, payment: 1000 },
      { category: 4, payment: 800 }, // Assuming the higher end of the range
      { category: 3, payment: 350 }, // Assuming the higher end of the range
      { category: 2, payment: 100 }, // Assuming the higher end of the range
      { category: 1, payment: 25 },
    ],
    premium: [
      { category: 5, payment: 2000 },
      { category: 4, payment: 1600 }, // Assuming the higher end of the range
      { category: 3, payment: 700 },  // Assuming the higher end of the range
      { category: 2, payment: 200 },  // Assuming the higher end of the range
      { category: 1, payment: 50 },
    ],
  };

  const getPaymentAmount = (policyType: PolicyType, category: number): number => {
    const paymentInfo = pricingData[policyType].find(p => p.category === category);
    return paymentInfo ? paymentInfo.payment : 0;
  };

  // Calculate the total payment
  const totalPayment = getPaymentAmount(policyType, hurricaneDetails.category);

  const handleSaveReceipt = () => {
    // Create a reference to the receipt container
    const receiptContainer = document.getElementById('receipt-container');

    if (receiptContainer) {
      // Convert the receipt container to a canvas
      html2canvas(receiptContainer).then(canvas => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png');

        // Set PDF size (you can adjust it according to your needs)
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the canvas image as a PDF page
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust dimensions as needed

        // Save the PDF
        pdf.save('receipt.pdf');
      });
    }
  };

  return (
    <Box id="receipt-container" sx={{
      padding: 2,
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'black'
        }}>
        Receipt
        <span style={{color: 'black'}}>Date: {date}</span>
      </Typography>
      <Typography sx={{ color: 'black', marginBottom: '8px' }}>Policy Holder: {policyHolder.firstName} {policyHolder.lastName}</Typography>
      <Typography sx={{ color: 'black', marginBottom: '8px' }}>Email: {policyHolder.email}</Typography>
      <Typography sx={{ color: 'black', marginBottom: '8px' }}>Address: {policyHolder.address}</Typography>
      {/* Added marginBottom for space below the Policy Type */}
      <Typography sx={{ color: 'black', marginBottom: '16px' }}>
        Policy Type: {policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy ${policyType === 'standard' ? '50' : '100'}
      </Typography>
      <Typography sx={{ fontWeight: 'bold', color: 'error.main', marginBottom: '8px' }}>Hurricane Category: {hurricaneDetails.category}</Typography>
      <Typography sx={{ fontWeight: 'bold', color: 'success.main' }}>Total Payment: ${totalPayment}</Typography>
      <Button variant="contained" onClick={handleSaveReceipt} sx={{ marginTop: '16px' }}>Save Receipt as PDF</Button>
    </Box>
  );
};

export default ReceiptComponent;
