import React  from 'react';
import PricingTable from './PricingTable'; // Import PricingTable component
import { Box, Card, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import PricingCards from './PricingCards';
// Prices component
const Prices: React.FC = () => {
    return (
        
        <div style={{margin: '10em'}}>
            
            <h1 style={{ marginTop: '16px', textAlign: 'center'}}>Prices</h1>
            <p style={{ textAlign: 'center'}}>Choose the plan that best fits your needs</p>
            
            <PricingCards />
            




            <PricingTable />
            
        </div>
    );
};

export default Prices;
