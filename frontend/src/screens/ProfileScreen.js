import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const useStyles = makeStyles({
  container: {
    "& > *": {
      margin: "1rem",
    },
  },
});

const ProfileScreen = ({ location }) => {
  let history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Grid container>
      <Grid item md={3}>
        <h2>User Profile</h2>
        {message && <Message severity="warning">{message}</Message>}
        {error && <Message severity="warning">{error}</Message>}
        {success && <Message>Profile Updated</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <Paper className={classes.container}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </FormGroup>
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
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  color="primary"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <Button type="submit">Update</Button>
          </Paper>
        </form>
      </Grid>
      <Grid item md={9}>
        <h2>My Orders</h2>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
