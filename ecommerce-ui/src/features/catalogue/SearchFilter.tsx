import { debounce, TextField } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogueSlice";

const SearchFilter: React.FC = () => {
  const { searchTerm } = useAppSelector((state) => state.catalogue);
  const dispatch = useAppDispatch();
  const [term, setTerm] = React.useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);
  // Using this debounce function to prevent the search from being triggered on every keystroke
  const debouncedSearchTerm = debounce((event) => {
    dispatch(setSearchTerm(event.target.value));
  }, 500);

  return (
    <Fragment>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        type="search"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          debouncedSearchTerm(e);
        }}
      />
    </Fragment>
  );
};

export default SearchFilter;
