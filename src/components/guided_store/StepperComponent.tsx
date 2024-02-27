// StepperComponent.tsx
import React, { useState } from 'react';
import { renderActiveComponent } from './renderActiveComponent';

const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3']; // Define your steps here

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div>
      {/* Stepper Navigation UI */}
      <div className="stepper">
        {steps.map((label, index) => (
          <div key={label} className={`step ${index === activeStep ? 'active' : ''}`}>
            {label}
          </div>
        ))}
      </div>
      {/* Render Active Component */}
      <div className="step-content">
        {renderActiveComponent(activeStep)}
      </div>
      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={handleBack} disabled={activeStep === 0}>Back</button>
        <button onClick={handleNext} disabled={activeStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default StepperComponent;
