import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
  },
});

const Loader = () => {
  const classes = useStyles();
  return (
    <CircularProgress className={classes.root} size={100}>
      Loading...
    </CircularProgress>
  );
};

export default Loader;
