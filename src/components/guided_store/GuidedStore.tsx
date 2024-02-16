import React from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/BusinessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import StartComponent from './StartComponent';
import CoverageComponent from './CoverageComponent';
import PersonalInfoComponent from './PersonalInfoComponent';
import PaymentComponent from './PaymentComponent';
import ConfirmationComponent from './ConfirmationComponent';


// Import individual step components

const steps = [
  { label: 'Start', icon: <HomeIcon /> },
  { label: 'Coverage', icon: <BusinessIcon /> },
  { label: 'Personal Info', icon: <InfoIcon /> },
  { label: 'Payment', icon: <PaymentIcon /> },
  { label: 'Confirmation', icon: <CheckCircleIcon /> }
];

const GuidedStore = () => {
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

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && <StartComponent />}
        {activeStep === 1 && <CoverageComponent />}
        {activeStep === 2 && <PersonalInfoComponent />}
        {activeStep === 3 && <PaymentComponent />}
        {activeStep === 4 && <ConfirmationComponent />}
      </div>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
      {activeStep === steps.length && (
        <div>
          <Typography variant="h5" gutterBottom>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      )}
    </div>
  );
};

export default GuidedStore;
