import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import React, { Fragment, JSX } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type ReusableSelectInputProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
  items: string[];
} & UseControllerProps<T> &
  Partial<SelectInputProps>;

const ReusableSelectInput = <T extends FieldValues>(
  props: ReusableSelectInputProps<T>
): JSX.Element => {
  const { fieldState, field } = useController({ ...props });

  return (
    <Fragment>
      <FormControl fullWidth error={!!fieldState.error}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={field.value || ""}
          label={props.label}
          onChange={field.onChange}
        >
          {props.items.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default ReusableSelectInput;
