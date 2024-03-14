import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface PolicyData {
  userId: string;
  type: string;
  address: string;
  coordinates: Coordinates | null;
  status: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

const PolicyContext = createContext<PolicyData | undefined>(undefined);

export const PolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [policyData, setPolicyData] = useState<PolicyData | undefined>(undefined);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const response = await axios.get('/api/policy');
        setPolicyData(response.data);
      } catch (error) {
        console.error('Error fetching policy data:', error);
      }
    };

    fetchPolicyData();
  }, []);

  return (
    <PolicyContext.Provider value={policyData}>
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContext;