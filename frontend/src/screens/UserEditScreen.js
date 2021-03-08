import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
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
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

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

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
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
