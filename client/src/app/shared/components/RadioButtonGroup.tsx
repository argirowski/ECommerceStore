import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { ChangeEvent, Fragment } from "react";

type RadioButtonGroupProps = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <Fragment>
      <FormControl>
        <RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
          {options.map(({ value, label }) => (
            <FormControlLabel
              key={label}
              control={<Radio color="secondary" sx={{ py: 0.7 }} />}
              label={label}
              value={value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default RadioButtonGroup;
