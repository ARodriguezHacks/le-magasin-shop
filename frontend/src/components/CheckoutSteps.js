import React from "react";
import { Link } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@material-ui/core";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav>
      <ul>
        <li>
          {step1 ? <Link to="/login">Sign In</Link> : <span>Sign In</span>}
        </li>
        <li>
          {step2 ? <Link to="/shipping">Shipping</Link> : <span>Shipping</span>}
        </li>
        <li>
          {step3 ? <Link to="/payment">Payment</Link> : <span>Payment</span>}
        </li>
        <li>
          {step4 ? (
            <Link to="/placeorder">Place Order</Link>
          ) : (
            <span>Place Order</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
