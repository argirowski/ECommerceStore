import React, { Fragment } from "react";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogueApi";

const Catalogue: React.FC = () => {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <Fragment>
      <ProductList products={data} />
    </Fragment>
  );
};

export default Catalogue;
