import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActionArea } from '@mui/material';
import PricingTable from './PricingTable';

const Prices: React.FC = () => {
    const [showBasic, setShowBasic] = useState(false);
    const [showPremium, setShowPremium] = useState(false);

    return (
        <div>
            <h1>Prices</h1>
            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                <CardActionArea onClick={() => setShowBasic(!showBasic)}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Basic Policy $50/yearly
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                <CardActionArea onClick={() => setShowPremium(!showPremium)}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Premium Policy $100/yearly
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {showBasic && <PricingTable policyType="basic" />}
            {showPremium && <PricingTable policyType="premium" />}
            <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
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
