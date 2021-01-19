import React from "react";
import { Alert } from "@material-ui/lab";

const Message = ({ severity, variant, children }) => {
  return (
    <Alert severity={severity} variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  severity: "info",
  variant: "filled",
};

export default Message;
