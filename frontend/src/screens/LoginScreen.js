import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormGroup,
  Paper,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const useStyles = makeStyles({
  container: {
    "& > *": {
      margin: "1rem",
    },
  },
});

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <Paper className={classes.container}>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                color="primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </FormGroup>
          <Button variant="contained">Sign In</Button>
          <Grid container>
            <Grid item>
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
