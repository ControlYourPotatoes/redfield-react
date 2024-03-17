import React  from 'react';
import PricingTable from './PricingTable'; // Import PricingTable component
import { Box, Card, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import PricingCards from './PricingCards';
// Prices component
const Prices: React.FC = () => {
    return (
        
        <div style={{paddingTop: '20em'}}>
            <Box sx={{p:'1em'}} >
                <h1 style={{ marginTop: '5px', textAlign: 'center', fontSize: '5rem', color:'#212222'}}>Prices</h1>
                <p style={{ textAlign: 'center', fontSize: '2rem', color:'#212222', marginTop:'-3rem'}}>Choose the plan that best fits your needs</p>
            </Box>
            
            
            <PricingCards />
            




            <PricingTable />
            
        </div>
    );
};

export default Prices;
