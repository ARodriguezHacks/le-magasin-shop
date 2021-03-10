import React, { useState } from "react";
import { Button, FormControl, TextField } from "@material-ui/core";

const SearchBox = ({ history }) => {
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
    <form onSubmit={submitHandler}>
      <FormControl>
        <TextField
          label="Search"
          type="search"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </FormControl>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBox;
