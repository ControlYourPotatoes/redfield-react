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
const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined

const PolicyContext = createContext<PolicyData | undefined>(undefined);

export const PolicyProvider: React.FC<PolicyProviderProps> = ({ children, policyId }) => {
  const [policyData, setPolicyData] = useState<PolicyData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // console.log("Policy ID recieved for context: ", policyId);
  
  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        // Using the policyId prop in the request URL
        // console.log(`Initiating fetch for policy data with ID: ${policyId} at URL: ${baseUrl}/api/policy/${policyId}`);
        
        const startTime = Date.now(); // Start time for performance measurement
        const response = await axios.get(`${baseUrl}/api/policy/${policyId}`);
        
        setPolicyData(response.data);
        console.log(`Fetch completed in ${Date.now() - startTime}ms`);
      } catch (error) {
        console.error('Error fetching policy data:', error);
      }
    };

    if (policyId) { // Only fetch policy data if a policyId is provided
      fetchPolicyData();
    }
  }, [policyId]);

  return (
    <PolicyContext.Provider value={policyData}>
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContext;
