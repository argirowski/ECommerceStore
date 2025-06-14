import React, { Fragment } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BasketItem } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import {
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "./basketApi";
import { currencyFormatter } from "../lib/utils";

type BasketItemProps = {
  item: BasketItem;
};

const SingleBasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();

  return (
    <Fragment>
      <Paper
        sx={{
          height: 140,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={item.pictureUrl}
            alt={item.name}
            sx={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "4px",
              marginRight: 8,
              marginLeft: 4,
            }}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">{item.name}</Typography>
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ fontSize: "1.1rem" }}>
                {currencyFormatter(item.price)} x {item.quantity}
              </Typography>
              <Typography sx={{ fontSize: "1.1rem" }}>
                {currencyFormatter(item.price * item.quantity)}
              </Typography>
            </Box>
            <Grid container spacing={1} alignItems="center">
              <IconButton
                onClick={() =>
                  removeBasketItem({ productId: item.productId, quantity: 1 })
                }
                color="error"
                size="small"
                sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
              >
                <Remove />
              </IconButton>
              <Typography variant="h6">{item.quantity}</Typography>
              <IconButton
                onClick={() =>
                  addBasketItem({
                    product: item,
                    quantity: 1,
                  })
                }
                color="success"
                size="small"
                sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
              >
                <Add />
              </IconButton>
            </Grid>
          </Box>
        </Box>
        <IconButton
          onClick={() =>
            removeBasketItem({
              productId: item.productId,
              quantity: item.quantity,
            })
          }
          color="error"
          size="small"
          sx={{
            border: 1,
            borderRadius: 1,
            minWidth: 0,
            alignSelf: "start",
            marginRight: 1,
            marginTop: 1,
          }}
        >
          <Close />
        </IconButton>
      </Paper>
    </Fragment>
  );
};

export default SingleBasketItem;
