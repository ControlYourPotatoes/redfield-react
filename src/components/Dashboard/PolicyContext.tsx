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

interface PolicyContextType {
  policyData: PolicyData | undefined;
  isLoading: boolean;
  error: Error | null;
  status: number | null; // Assuming status is a number
  setStatus: (status: number) => void;
}

const defaultContextValue: PolicyContextType = {
  policyData: undefined,
  isLoading: false,
  error: null,
  status: null,
  setStatus: () => {}, // Provide a noop function as default
};
interface PolicyProviderProps {
  children: ReactNode;
  policyId: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined

const PolicyContext = React.createContext<PolicyContextType>(defaultContextValue);

export const PolicyProvider: React.FC<PolicyProviderProps> = ({ children, policyId }) => {
  const [policyData, setPolicyData] = useState<PolicyData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  // console.log("Policy ID recieved for context: ", policyId);
  
  useEffect(() => {
    setIsLoading(true);
    const fetchPolicyData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/policy/${policyId}`);
        setPolicyData(response.data);
        setStatus(response.data.status); // Set the initial status from the fetched data
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to fetch policy data'));
      } finally {
        setIsLoading(false);
      }
    };

    if (policyId) {
      fetchPolicyData();
    }
  }, [policyId]);

  useEffect(() => {
    // This effect updates the local status state if policyData.status changes
    // Note: This will not re-fetch data; it simply syncs status with policyData's status
    if (policyData?.status !== undefined && policyData.status !== status) {
      setStatus(policyData.status);
    }
  }, [policyData?.status]);

  const value = {
    policyData,
    isLoading,
    error,
    status,
    setStatus: (newStatus: number) => {
      // This function allows consuming components to update the status
      // Optionally, you could update the context or make an API call here to persist the change
      setStatus(newStatus);
    },
  };

  return (
    <PolicyContext.Provider value={value}>
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContext;