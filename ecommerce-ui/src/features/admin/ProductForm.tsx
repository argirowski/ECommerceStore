import { Box, Button, Paper, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Product } from "../../app/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useForm, FieldValues } from "react-hook-form";
import { useFetchFiltersQuery } from "../catalogue/catalogueApi";
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi";
import Grid from "@mui/material/Grid";
import {
  createProductSchema,
  CreateProductSchema,
} from "../lib/schemas/createProductSchema";
import { handleApiError } from "../lib/utils";
import ReusableSelectInput from "../../app/shared/components/ReusableSelectInput";
import ReusableTextInput from "../../app/shared/components/ReusableTextInput";
import ReusableDropZone from "../../app/shared/components/ReusableDropZone";

type ProductFormProps = {
  setEditMode: (value: boolean) => void;
  product: Product | null;
  refetch: () => void;
  setSelectedProduct: (value: Product | null) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  setEditMode,
  product,
  refetch,
  setSelectedProduct,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });
  const watchFile = watch("file");
  const { data } = useFetchFiltersQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) reset(product);

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile]);

  const createFormData = (items: FieldValues) => {
    const formData = new FormData();
    for (const key in items) {
      formData.append(key, items[key]);
    }

    return formData;
  };

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      const formData = createFormData(data);

      if (watchFile) formData.append("file", watchFile);

      if (product)
        await updateProduct({ id: product.id, data: formData }).unwrap();
      else await createProduct(formData).unwrap();
      setEditMode(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.log(error);
      handleApiError<CreateProductSchema>(error, setError, [
        "brand",
        "description",
        "file",
        "name",
        "pictureUrl",
        "price",
        "quantityInStock",
        "type",
      ]);
    }
  };

  return (
    <Fragment>
      <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Product details
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <ReusableTextInput
                control={control}
                name="name"
                label="Product name"
              />
            </Grid>
            <Grid size={6}>
              {data?.brands && (
                <ReusableSelectInput
                  items={data.brands}
                  control={control}
                  name="brand"
                  label="Brand"
                />
              )}
            </Grid>
            <Grid size={6}>
              {data?.brands && (
                <ReusableSelectInput
                  items={data.types}
                  control={control}
                  name="type"
                  label="Type"
                />
              )}
            </Grid>
            <Grid size={6}>
              <ReusableTextInput
                type="number"
                control={control}
                name="price"
                label="Price in cents"
              />
            </Grid>
            <Grid size={6}>
              <ReusableTextInput
                type="number"
                control={control}
                name="quantityInStock"
                label="Quantity in stock"
              />
            </Grid>
            <Grid size={12}>
              <ReusableTextInput
                control={control}
                multiline
                rows={4}
                name="description"
                label="Description"
              />
            </Grid>
            <Grid
              size={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ReusableDropZone name="file" control={control} />
              {watchFile?.preview ? (
                <img
                  src={watchFile.preview}
                  alt="Product preview"
                  style={{ maxHeight: 200 }}
                />
              ) : product?.pictureUrl ? (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name || "Product"}
                  style={{ maxHeight: 200 }}
                />
              ) : null}
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button
              onClick={() => setEditMode(false)}
              variant="contained"
              color="inherit"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
};

export default ProductForm;
