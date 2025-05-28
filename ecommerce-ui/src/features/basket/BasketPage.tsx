import React, { Fragment } from "react";
import { useFetchBasketQuery } from "./basketApi";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
      <Grid container spacing={2}>
        <Grid size={8}>
          {data.items.map((item) => (
            <SingleBasketItem item={item} key={item.productId} />
          ))}
        </Grid>
        <Grid size={4}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BasketPage;
