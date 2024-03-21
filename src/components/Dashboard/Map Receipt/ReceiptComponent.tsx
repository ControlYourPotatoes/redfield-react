import React from 'react';
import { useContext } from 'react';
import { Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { blue } from '@mui/material/colors';

import PolicyContext from '../PolicyContext';
import { useAuth } from '../../pages/AuthContext';
import { format } from 'date-fns';

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
  windspeed: string;
}

const ReceiptComponent: React.FC = () => {
  
  const { currentUser } = useAuth();
  const { policyData } = useContext(PolicyContext); // Corrected to destructure policyData

  if (!policyData || !currentUser) {
    return <Typography>Loading...</Typography>;
  }

  if (!policyData) {
    return <Typography>Loading policy data...</Typography>; // Policy data is not yet loaded
  }
  // Hardcoded values
  const hurricaneDetails = { category: 4 };
  const windspeed = '130 mph';
  const date = format(new Date(), 'PPP'); // Formats current date as "MMM dd, yyyy"
  // Assuming policyData.type returns 'standard' or 'premium'
  const policyType = policyData.type.toLowerCase() as 'standard' | 'premium';

  // Pricing data
  const pricingData: { [key in typeof policyType]: { category: number; payment: number }[] } = {
    standard: [
      { category: 5, payment: 1000 },
      { category: 4, payment: 800 },
      // Add other categories as needed
    ],
    premium: [
      { category: 5, payment: 2000 },
      { category: 4, payment: 1600 },
      // Add other categories as needed
    ],
  };

  const getPaymentAmount = (category: number): number => {
    const paymentInfo = pricingData[policyType]?.find(p => p.category === category);
    return paymentInfo ? paymentInfo.payment : 0;
  };

  const totalPayment = getPaymentAmount(hurricaneDetails.category);

  
  
  const handleSaveReceipt = () => {
    const contentForPDF = document.getElementById('content-for-pdf');
  
    if (contentForPDF) {
      html2canvas(contentForPDF).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 150); // A4 size page of PDF
        
        // Add the signature image at the bottom center
        // const signatureImage = './assets/logo/fullredfieldLogoLight.png', alt='Company Logo'; // Adjust the path to your signature image
        // pdf.addImage(signatureImage, 'PNG', (210 / 2) - (50 / 2), 297 - 30, 50, 15);

        pdf.save('receipt.pdf');
      });
    }
  };
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
    <Box sx={{
      padding: 2,
      backgroundColor: '#fff',
      borderRadius: '8px',
      color: 'black',
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      width: '210mm',
      minHeight: '130mm',
      position: 'relative',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }}>
      <div id="content-for-pdf">
        {/* Invoice Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img src="./assets/logo/fullredfieldLogoLight.png" alt="Company Logo" style={{ width: '100px' }} />
          <Box>
            <Typography>Receipt date: {date}</Typography>
            <Typography>Due: {date}</Typography>
          </Box>
        </Box>
        
        {/* Billed From and Billed To Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Box>
            <Typography>Billed From</Typography>
            <Typography>H-Redfield</Typography>
          </Box>
          <Box >
            <Typography>Billed To</Typography>
            <Typography>{currentUser.firstName} {currentUser.lastName}</Typography>
            <Typography>{currentUser.email}</Typography>
            <Typography>{policyData.address}</Typography>
          </Box>
        </Box>
        
        {/* Invoice Details Table */}
        <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: blue[200] }}>
                <TableCell>Policy</TableCell>
                <TableCell align="right">Windspeed</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">AMOUNT, USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Premium
                </TableCell>
                <TableCell align="right">{windspeed}</TableCell>
                <TableCell align="right">{hurricaneDetails.category}</TableCell>
                <TableCell align="right">{totalPayment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Totals Section */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography>Total: {totalPayment}</Typography>
          </Box>
        </Box>
      </div>
      <Button variant="contained" onClick={handleSaveReceipt} sx={{ marginTop: '16px' }}>Save Receipt as PDF</Button>
    
    </Box>
    </Box>
  );
};

export default ReceiptComponent;