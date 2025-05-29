import { TextField, TextFieldProps } from "@mui/material";
import React, { Fragment, JSX } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type ReusableTextInputProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
} & UseControllerProps<T> &
  TextFieldProps;

const ReusableTextInput = <T extends FieldValues>(
  props: ReusableTextInputProps<T>
): JSX.Element => {
  const { fieldState, field } = useController({ ...props });

  return (
    <Fragment>
      <TextField
        {...props}
        {...field}
        multiline={props.multiline}
        rows={props.rows}
        type={props.type}
        fullWidth
        value={field.value || ""}
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    </Fragment>
  );
};

export default ReusableTextInput;
