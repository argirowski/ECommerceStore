import React, { Fragment } from "react";
import { useFetchFiltersQuery } from "./catalogueApi";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  TextField,
} from "@mui/material";

const sortOptions = [
  { value: "name ", label: "Name: Alphabetical" },
  { value: "priceDesc", label: "Price: Low to High" },
  { value: "price", label: "Price: Low to Hight" },
];

const Filters: React.FC = () => {
  const { data } = useFetchFiltersQuery();
  return (
    <Fragment>
      <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
          ></TextField>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <FormControl>
            {sortOptions.map(({ value, label }) => (
              <FormControlLabel
                key={label}
                control={<Radio sx={{ py: 0.7 }} />}
                label={label}
                value={value}
              />
            ))}
          </FormControl>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <FormGroup>
            {data &&
              data.brands.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      color="secondary"
                      sx={{ py: 0.7, fontSize: 40 }}
                    />
                  }
                  label={item}
                />
              ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <FormGroup>
            {data &&
              data.types.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      color="secondary"
                      sx={{ py: 0.7, fontSize: 40 }}
                    />
                  }
                  label={item}
                />
              ))}
          </FormGroup>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Filters;
