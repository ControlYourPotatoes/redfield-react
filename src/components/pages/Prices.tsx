import React, { useState } from 'react';
import PricingTable from './PricingTable'; // Import PricingTable component
import { Typography, Card, CardContent, CardActionArea, Box } from '@mui/material';

const Prices: React.FC = () => {
    const [showBasic, setShowBasic] = useState<boolean>(false);
    const [showPremium, setShowPremium] = useState<boolean>(false);

    return (
        <div>
            <h1>Prices</h1>
            <Box display="flex" justifyContent="space-between">
                <Card variant="outlined" sx={{ width: '45%', marginBottom: '10px' }}>
                    <CardActionArea onClick={() => {setShowBasic(!showBasic); setShowPremium(false)}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Buy Basic Policy $50/yearly
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card variant="outlined" sx={{ width: '45%', marginBottom: '10px' }}>
                    <CardActionArea onClick={() => {setShowPremium(!showPremium); setShowBasic(false)}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Buy Premium Policy $100/yearly
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            
            {showBasic && <PricingTable policyType="basic" />}
            {showPremium && <PricingTable policyType="premium" />}

            <Typography variant="body2" sx={{ marginTop: '16px', textAlign: 'center' }}>
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
