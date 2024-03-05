import React from 'react';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';

const CoverageComponent = () => {
    const { values, setFieldValue } = useFormikContext(); // Directly use Formik's context

    const handleSelection = (choice: string) => {
        // Update the 'policy.type' field in Formik's state
        setFieldValue('policy.type', choice);
    };

    return (
        <div>
            <h1>Coverage Options</h1>
            <Button 
                variant={values.policy.type === 'Basic' ? 'contained' : 'outlined'} 
                onClick={() => handleSelection('Basic')}
            >
                Basic
            </Button>
            <Button 
                variant={values.policy.type === 'Premium' ? 'contained' : 'outlined'} 
                onClick={() => handleSelection('Premium')}
            >
                Premium
            </Button>
        </div>
    );
};

export default CoverageComponent;
