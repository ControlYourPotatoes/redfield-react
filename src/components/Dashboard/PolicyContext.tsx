import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface PolicyData {
  userid: string;
  type: string;
  address: string;
  coordinates: Coordinates | null;
  status: number;
  expirationdate: string;
  created_at: string;
}

interface PolicyProviderProps {
  children: ReactNode;
  policyId: string; // Adding policyId as a prop to the Provider
}

const PolicyContext = createContext<PolicyData | undefined>(undefined);

export const PolicyProvider: React.FC<PolicyProviderProps> = ({ children, policyId }) => {
  const [policyData, setPolicyData] = useState<PolicyData | undefined>(undefined);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        // Using the policyId prop in the request URL
        const response = await axios.get(`http://localhost:3000/api/policy/${policyId}`);
        setPolicyData(response.data);
      } catch (error) {
        console.error('Error fetching policy data:', error);
      }
    };

    if (policyId) { // Only fetch policy data if a policyId is provided
      fetchPolicyData();
    }
  }, [policyId]); // Adding policyId to the dependency array

  return (
    <PolicyContext.Provider value={policyData}>
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContext;
