import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { Fragment, JSX, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type ReusableDropZoneProps<T extends FieldValues> = {
  name: keyof T;
} & UseControllerProps<T>;

const ReusableDropZone = <T extends FieldValues>(
  props: ReusableDropZoneProps<T>
): JSX.Element => {
  const { fieldState, field } = useController({ ...props });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });

        field.onChange(fileWithPreview);
      }
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dzStyles = {
    display: "flex",
    border: "dashed 2px #767676",
    borderColor: "#767676",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: 200,
    width: 500,
  };

  const dzActive = {
    borderColor: "green",
  };

  return (
    <Fragment>
      <div {...getRootProps()}>
        <FormControl
          style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
          error={!!fieldState.error}
        >
          <input {...getInputProps()} />
          <UploadFile sx={{ fontSize: "100px" }} />
          <Typography variant="h4">Drop image here</Typography>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      </div>
    </Fragment>
  );
};

export default ReusableDropZone;
