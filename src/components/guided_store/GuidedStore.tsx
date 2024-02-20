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

const steps = ['Start', 'Coverage', 'Personal Info', 'Payment', 'Confirmation'];

interface ColorlibStepIconProps {
  active: boolean;
  completed: boolean;
  icon: number; // Changed to number for mapping
}

const ColorlibStepIconRoot = styled('div')<ColorlibStepIconProps>(({ theme, active, completed }) => ({
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: completed
    ? `radial-gradient(circle, ${theme.palette.success.main} 0%, transparent 70%)` // For completed state
    : active
    ? `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)` // For active state
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderActiveComponent = (step: number) => {
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
        return <ConfirmationComponent />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '60%', margin: 'auto' }}>
        <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              StepIconProps={{
                active: index === activeStep,
                completed: index < activeStep,
                icon: index + 1,
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>   
      <Box sx={{ width: '70%', margin: 'auto' }}>
        <Paper elevation={3} sx={{ margin: 2, padding: 3 }}>
          <Box sx={{ maxWidth: '900px', width: '100%', margin: 'auto' }}>
            {renderActiveComponent(activeStep)}
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '70%', margin: 'auto' }}>
        <Button color="primary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </React.Fragment>
      )}
    </Box>
  );
}