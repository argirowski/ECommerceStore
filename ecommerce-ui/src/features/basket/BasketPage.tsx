import React, { Fragment } from "react";
import { useFetchBasketQuery } from "./basketApi";
import { Grid2, Typography } from "@mui/material";
import SingleBasketItem from "./SingleBasketItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

const BasketPage: React.FC = () => {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!data || data.items.length === 0) {
    return <Typography variant="h3">Your Basket is Empty</Typography>;
  }

  return (
    <Fragment>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          {data.items.map((item) => (
            <SingleBasketItem item={item} key={item.productId} />
          ))}
        </Grid2>
        <Grid2 size={4}>
          <OrderSummary />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default BasketPage;
