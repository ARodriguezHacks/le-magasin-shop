import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  space: {
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "space-around",
      maxWidth: "90%",
      margin: "1em auto",
    },
    "& .MuiBreadcrumbs-li": {
      textAlign: "center",
    },
  },
});

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.space}>
      <span>
        {step1 ? (
          <Link to="/login">
            <CheckCircleIcon />
            <Typography>Sign In</Typography>
          </Link>
        ) : (
          <>
            <CheckCircleIcon color="disabled" />
            <Typography>Sign In</Typography>
          </>
        )}
      </span>
      <span>
        {step2 ? (
          <Link to="/shipping">
            <CheckCircleIcon />
            <Typography>Shipping</Typography>
          </Link>
        ) : (
          <>
            <CheckCircleIcon color="disabled" />
            <Typography>Shipping</Typography>
          </>
        )}
      </span>
      <span>
        {step3 ? (
          <Link to="/payment">
            <CheckCircleIcon />
            <Typography>Payment</Typography>
          </Link>
        ) : (
          <>
            <CheckCircleIcon color="disabled" />
            <Typography>Payment</Typography>
          </>
        )}
      </span>
      <span>
        {step4 ? (
          <Link to="/placeorder">
            <CheckCircleIcon />
            <Typography>Place Order</Typography>
          </Link>
        ) : (
          <>
            <CheckCircleIcon color="disabled" />
            <Typography>Place Order</Typography>
          </>
        )}
      </span>
    </Breadcrumbs>
  );
};

export default CheckoutSteps;
