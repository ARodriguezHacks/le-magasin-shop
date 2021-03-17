import React, { useState } from "react";
import { InputBase, IconButton } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flex: "1 0 50%",
    alignItems: "center",
    border: "1px solid black",
    padding: "0 0.25rem",
    borderRadius: "25px",
    maxWidth: (props) => props.width,
  },
  textField: {
    flex: "1 0 50%",
  },
  button: {
    padding: "5px",
  },
});

const SearchBox = (props) => {
  // console.log(props);
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      props.history.push(`/search/${keyword}`);
    } else {
      props.history.push("/");
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
      <IconButton type="submit" className={classes.button}>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBox;
