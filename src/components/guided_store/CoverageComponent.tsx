import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import { FormData } from './types'; // Importing the interface from the same directory

const CoverageComponent = () => {
    // Specify the type of the form values with the generic parameter to useFormikContext
    const { values, setFieldValue } = useFormikContext<FormData>(); // TypeScript now knows the shape of values

    const handleSelection = (choice: string) => {
        // Update the 'policy.type' field in Formik's state
        setFieldValue('policy.type', choice);
    };

    return (
        <div>
            <h1>Coverage Options</h1>
            <Button 
                variant={values.policy.type === 'Standard' ? 'contained' : 'outlined'} 
                onClick={() => handleSelection('Standard')}
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
