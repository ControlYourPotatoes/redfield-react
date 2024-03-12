import React, { useState } from 'react';
import PricingTable from './PricingTable'; // Import PricingTable component
import { Typography } from '@mui/material';

const Prices: React.FC = () => {
    return (
        <div>
            <h1>Prices</h1>
         
            
            <PricingTable />
            
            <Typography variant="body2" sx={{ marginTop: '16px', textAlign: 'center', padding: '0 206px' }}>
                Please note: The insurance policy comes into effect 15 days after being paid. 
                The payment amounts listed are illustrative examples only and may not reflect 
                actual prices applicable to your region. Actual payments are subject to variation 
                based on geographical location and other factors. We recommend consulting with our 
                customer service team for detailed pricing information specific to your area.
            </Typography>

        </div>
    );
};

export default Prices;
