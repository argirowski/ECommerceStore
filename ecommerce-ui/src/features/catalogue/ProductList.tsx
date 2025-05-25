import React, { Fragment } from "react";
import { Product } from "../../app/models/product";
import { Grid2 } from "@mui/material";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 size={3} key={product.id} display="flex">
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
    </Fragment>
  );
};

export default ProductList;
