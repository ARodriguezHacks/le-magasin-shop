import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
  Typography,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Typography variant="h4">Orders</Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>USER</TableCell>
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
                <TableCell>{order.user && order.user.name}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
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
                    <Button size="small">Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
