// PolicyContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface PolicyData {
  // ...
}

const PolicyContext = createContext<PolicyData | undefined>(undefined);

export const PolicyProvider: React.FC = ({ children }) => {
  const [policyData, setPolicyData] = useState<PolicyData | undefined>(undefined);

  useEffect(() => {
    // Fetch policy data and set it in the state
  }, []);

  return (
    <PolicyContext.Provider value={policyData}>
      {children}
    </PolicyContext.Provider>
  );
};