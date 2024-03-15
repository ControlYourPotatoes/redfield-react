import React  from 'react';
import PricingTable from './PricingTable'; // Import PricingTable component

const Prices: React.FC = () => {
    return (
        <div>
            <h1 style={{ marginTop: '16px', textAlign: 'center'}}>Prices</h1>
         
            <PricingTable />
            
        </div>
    );
};

export default Prices;
