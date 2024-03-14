import React, { useContext } from 'react';
import PolicyContext from './PolicyContext';

const PolicyStatus = () => {
  const policyData = useContext(PolicyContext);

  if (!policyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Policy Status</h2>
      <p>Status: {activeStatus}</p>
      <p>Expire Date: {expireDate}</p>
      <p>Policy ID: {policyId}</p>
      <p>Payment Process: {paymentProcessStatus}</p>
    </div>
  );
};

export default PolicyStatus;
