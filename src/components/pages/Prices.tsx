import React from 'react';
import { BasicPolicyPricingTable, PremiumPolicyPricingTable } from './PricingTable';


const Prices: React.FC = () => {
    return (
        <div>
            <h1>Prices</h1>
            <BasicPolicyPricingTable />
            <PremiumPolicyPricingTable />
        </div>
    );
};

export default Prices;
