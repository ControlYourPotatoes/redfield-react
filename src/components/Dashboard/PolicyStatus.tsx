import React from 'react';

const PolicyStatus = ({ isActive, expireDate, policyId, paymentProcessStatus }) => {
  const activeStatus = isActive ? "Active" : "Inactive";
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
