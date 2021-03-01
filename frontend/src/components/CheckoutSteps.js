import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@material-ui/core";

function getSteps() {
  return ["Sign In", "Shipping", "Payment", "Place Order"];
}

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = getSteps();

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
      {/* {step1 ? <Link to="/login">Sign In</Link> : <span>Sign In</span>} */}
    </Stepper>
  );
};

export default CheckoutSteps;
