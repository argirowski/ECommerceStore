import React, { Fragment } from "react";
import { Box, Button, Paper } from "@mui/material";
import SearchFilter from "./SearchFilter";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogueSlice";
import CheckBoxButtons from "../../app/shared/components/CheckBoxButtons";

const sortOptions = [
  { value: "name ", label: "Name: Alphabetical" },
  { value: "priceDesc", label: "Price: Low to High" },
  { value: "price", label: "Price: Low to Hight" },
];

type FiltersProps = {
  filtersData: { brands: string[]; types: string[] };
};

const Filters: React.FC<FiltersProps> = ({ filtersData }) => {
  const { orderBy, types, brands } = useAppSelector((state) => state.catalogue);
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
          <SearchFilter />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <RadioButtonGroup
            selectedValue={orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setOrderBy(e.target.value))}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <CheckBoxButtons
            items={filtersData.brands}
            checked={brands}
            onChange={(items: string[]) => dispatch(setBrands(items))}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <CheckBoxButtons
            items={filtersData.types}
            checked={types}
            onChange={(items: string[]) => dispatch(setTypes(items))}
          />
        </Paper>
        <Button onClick={() => dispatch(resetParams())}>Reset Filters</Button>
      </Box>
    </Fragment>
  );
};

export default Filters;
