import React from 'react';
import { OriginalPricingTable, AdditionalPricingTable } from '../PricingTable';

const Prices = () => {
    return (
        <div>
            <h1>Prices</h1>
            <OriginalPricingTable />
            <AdditionalPricingTable />
        </div>
    );
};

export default Prices;
