import React from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination
        page={page}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${item.page}`
                  : `/page/${item.page}`
                : `/admin/productlist/${item.page}`
            }
            {...item}
          />
        )}
      />
    )
  );
};

export default Paginate;
