import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { Grid, Typography } from "@material-ui/core";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Grid container spacing={2}>
        <Grid container item>
          {!keyword ? <ProductCarousel /> : <Link to="/">Go Back</Link>}
        </Grid>
        <Grid container item>
          <Typography>Latest Products</Typography>
        </Grid>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  key={product._id}
                >
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default HomeScreen;
