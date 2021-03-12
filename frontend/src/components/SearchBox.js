import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
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
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="contained" className={classes.button}>
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
