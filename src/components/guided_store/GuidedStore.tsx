import React from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/BusinessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './GuidedStore.css';

// Import individual step components
import StartComponent from './StartComponent';
import CoverageComponent from './CoverageComponent';
import PersonalInfoComponent from './PersonalInfoComponent';
import PaymentComponent from './PaymentComponent';
import ConfirmationComponent from './ConfirmationComponent';
import { Formik, Form } from 'formik';



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

  interface PolicyInfo {
    id: string;
    type: string;
    coordinates: [number, number]; // Or [number, number] or { lat: number, lng: number }
  }
  
  interface PersonalInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    coordinates: [number, number]; // Or [number, number] or { lat: number, lng: number }
  }
  
  interface PaymentInfo {
    type: string;
  }
  
  interface FormValues {
    policy: PolicyInfo;
    personalInfo: PersonalInfo;
    payment: PaymentInfo;
  }
  
  const initialFormValues: FormValues = {
    policy: { id: '', type: '', coordinates: [0, 0]},
    personalInfo: { firstName: '', lastName: '', phone: '', email: '', address: '', coordinates: [0, 0]},
    payment: { type: '' },
  };

  // Placeholder submission handler
  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
    // Here you would typically send the values to a server or perform some action with them
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // If it's the last step, submit the form.
      console.log('Ending submit');
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
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
    {({ values, handleChange }) => (
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
    )}
    </Formik>
  );
}