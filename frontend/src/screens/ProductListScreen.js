import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE PRODUCTS
    }
  };

  const createProductHandler = (product) => {
    // CREATE PRODUCT
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1>Products</h1>
        </Grid>
        <Grid item>
          <Button
            onClick={createProductHandler}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button size="small">
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
