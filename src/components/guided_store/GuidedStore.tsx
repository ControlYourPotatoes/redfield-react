import React from 'react';
import { useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/BusinessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './GuidedStore.css';
import { useAuth } from '../pages/AuthContext';
// Import individual step components
import StartComponent from './StartComponent';
import CoverageComponent from './CoverageComponent';
import PersonalInfoComponent from './PersonalInfoComponent';
import PaymentComponent from './PaymentComponent';
import ConfirmationComponent from './ConfirmationComponent';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom'; // Import useNavigate




const steps = ['Start', 'Coverage', 'Personal Info', 'Payment', 'Confirmation'];

interface ColorlibStepIconProps {
  active: boolean;
  completed: boolean;
  icon: number; // Changed to number for mapping
}

const ColorlibStepIconRoot = styled('div')<ColorlibStepIconProps>(({ theme, active, completed }) => ({
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: completed
    ? `radial-gradient(circle, ${theme.palette.success.main} 40%, transparent 55%)` // For completed state
    : active
    ? `radial-gradient(circle, ${theme.palette.primary.main} 40%, transparent 55%)` // For active state
    : 'transparent', // Default when neither active nor completed
}));


const ColorlibStepIcon = (props: ColorlibStepIconProps) => {
  const { completed, icon } = props;

  // Define the type for iconMap explicitly to allow number indexing
  const iconMap: { [key: number]: JSX.Element } = {
    1: <HomeIcon />,
    2: <BusinessIcon />,
    3: <InfoIcon />,
    4: <PaymentIcon />,
    5: <CheckCircleIcon />,
  };

  const IconToRender = iconMap[icon] || <HomeIcon />;

  return (
    <ColorlibStepIconRoot {...props}>
      {completed ? <CheckCircleIcon /> : IconToRender}
    </ColorlibStepIconRoot>
  );
};

export default function GuidedStore() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Define navigate here

  console.log(currentUser);
  interface PolicyInfo {
    id: string;
    type: string;
    coordinates: [number, number]; // Or [number, number] or { lat: number, lng: number }
    address: string;
  }
  

  
  interface PaymentInfo {
    type: string;
  }
  
  interface FormValues {
    policy: PolicyInfo;
    payment: PaymentInfo;
  }
  
  const initialFormValues: FormValues = {
    policy: { id: currentUser?.id, type: '', coordinates: [0, 0], address: ''},
    payment: { type: '' },
  };

  // Placeholder submission handler
  const handleSubmit = async (values: FormValues) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined
  
    if (!currentUser) {
      console.error('User is not logged in');
      return; // or handle this scenario appropriately
    }
  
    // Prepare the data for submission
    const submissionData = {
      userId: values.policy.id, // Assuming this is handled server-side and not needed in the payload
      type: values.policy.type,
      address: values.policy.address,
      coordinates: { 
        lat: values.policy.coordinates[0], 
        lng: values.policy.coordinates[1] 
      },
      status: 1, // Assuming status 1 indicates active
    };
  
    try {
      console.log(submissionData);
      const response = await fetch(`${baseUrl}/api/policy/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
        body: JSON.stringify(submissionData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Process response data here
      const data = await response.json();
      console.log('Policy created:', data);
  
      // Handle successful policy creation (e.g., navigate to a success page, show a message)
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit policy:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleNext = (submitForm: () => void) => { // Pass Formik's submitForm function
    if (activeStep === steps.length - 1) {
      submitForm(); // Trigger Formik's submission
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const renderActiveComponent = (step: number, values: any) => {
    switch (step) {
      case 0:
        return <StartComponent />;
      case 1:
        return <CoverageComponent />;
      case 2:
        return <PersonalInfoComponent />;
      case 3:
        return <PaymentComponent />;
      case 4:
        return <ConfirmationComponent formData={values} />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleChange, handleSubmit, submitForm }) => {
        // Effect hook to update `id` in form values when currentUser.id becomes available
        useEffect(() => {
          if (currentUser?.id) {
            setFieldValue('policy.id', currentUser.id, false);
          }
        }, [currentUser?.id, setFieldValue]);

        const handleNext = () => {
          if (activeStep === steps.length - 1) {
            submitForm(); // Directly use submitForm here
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        };

        const handleBack = () => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        // Define renderActiveComponent, steps, etc., as before

        return (
      <Form>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: '60%', margin: 'auto', padding: '10px', marginTop: '30px' }}>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                    StepIconComponent={ColorlibStepIcon as any}
                    StepIconProps={{
                    active: index === activeStep,
                    completed: index < activeStep,
                    icon: index + 1, // You control this, ensuring it's always a number
                    }}
                  >
                  {label}
                  </StepLabel>
              </Step>
            ))}
          </Stepper>
          </Box>   
          <Box sx={{margin: 'auto' }}>
            <Paper elevation={5} sx={{ margin: 2, padding: 3 }}>
              <Box sx={{ maxWidth: '1000px', margin: 'auto' }}>
              {renderActiveComponent(activeStep, values)}
              </Box>
            </Paper>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '50%', margin: 'auto' }}>
            <Button variant="contained" color="primary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleNext} type={activeStep === steps.length - 1 ? "submit" : "button"}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
          </Box>
          {activeStep === steps.length && (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Button onClick={handleChange}>Reset</Button> //fix
            </React.Fragment>
          )}
        </Box>
          </Form>
        );
      }}
    </Formik>
  );
}