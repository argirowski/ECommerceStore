import React, { Fragment } from "react";
import { Product } from "../../app/models/product";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={3} key={product.id} display="flex">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProductList;
