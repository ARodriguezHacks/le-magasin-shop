import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const useStyles = makeStyles({
  container: {
    "& > *": {
      margin: "1rem",
    },
  },
});

const UserEditScreen = ({ match, history }) => {
  const classes = useStyles();
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      name="isAdmin"
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  }
                  label="Is Admin"
                />
              </FormGroup>

              <Button type="submit">Update</Button>
            </Paper>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
