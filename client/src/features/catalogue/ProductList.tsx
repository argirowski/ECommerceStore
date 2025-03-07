import React, { Fragment } from "react";
import { Product } from "../../app/models/product";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Fragment>
  );
};

export default ProductList;
