// Create a file named FormContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define an interface for the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as necessary
}

// Define an interface for the context
interface FormContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

// Create the context with an initial undefined value
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component
interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    // Initialize other fields as needed
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
