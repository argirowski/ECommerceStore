import React, { Fragment } from "react";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogueApi";
import { Grid2 } from "@mui/material";
import Filters from "./Filters";
import { useAppSelector } from "../../app/store/store";

const Catalogue: React.FC = () => {
  const productParams = useAppSelector((state) => state.catalogue);
  const { data, isLoading } = useFetchProductsQuery(productParams);

  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <Fragment>
      <Grid2 container spacing={4}>
        <Grid2 size={3}>
          <Filters />
        </Grid2>
        <Grid2 size={9}>
          <ProductList products={data} />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default Catalogue;
