import React, { useContext } from 'react';
import PolicyContext from './PolicyContext';

const PolicyStatus: React.FC = () => {
  const policyData = useContext(PolicyContext);

  if (!policyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Policy Status</h2>
      <p>Policy ID: {policyData.policyId}</p>
      <p>Expiration Date: {policyData.expireDate}</p>
      <p>Active: {policyData.isActive ? 'Yes' : 'No'}</p>
      <p>Payment Status: {policyData.paymentProcessStatus}</p>
    </div>
  );
};

export default PolicyStatus;