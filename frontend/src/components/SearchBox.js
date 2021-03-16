import React, { useState } from "react";
import { Button, TextField, InputBase, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flex: "1 0 50%",
    alignItems: "center",
    border: "1px solid black",
    padding: "0 0.25rem",
    borderRadius: "25px",
  },
  textField: {
    flex: "1 0 50%",
  },
  button: {
    backgroundColor: "pink",
  },
});

const SearchBox = ({ history }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <InputBase
        type="search"
        placeholder="Search products"
        onChange={(e) => setKeyword(e.target.value)}
        className={classes.textField}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBox;
