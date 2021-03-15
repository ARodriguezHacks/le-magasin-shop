import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

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

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Grid container spacing={2}>
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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severity="warning">{errorOrders}</Message>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell>DELIVERED</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/order/${order._id}`}>
                        <Button>Details</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
