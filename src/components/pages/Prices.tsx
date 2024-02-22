import React, { useState } from 'react';
import { Button } from '@mui/material';
import PremiumPolicyPricingTable from './PricingTable';
import BasicPolicyPricingTable from './PricingTable';

const Prices: React.FC = () => {
    const [showBasic, setShowBasic] = useState(false);
    const [showPremium, setShowPremium] = useState(false);

    return (
        <div>
            <h1>Prices</h1>
            <Button variant="contained" color="primary" onClick={() => setShowBasic(!showBasic)} style={{ margin: '10px' }}>
                {showBasic ? 'Hide Basic Policy' : 'Buy Basic Policy at $50/yearly'}
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setShowPremium(!showPremium)} style={{ margin: '10px' }}>
                {showPremium ? 'Hide Premium Policy' : 'Buy Premium Policy at $100/yearly'}
            </Button>
            {showBasic && <BasicPolicyPricingTable />}
            {showPremium && <PremiumPolicyPricingTable />}
        </div>
    );
};

export default Prices;
