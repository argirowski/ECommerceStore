import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { currencyFormatter } from "../../../features/lib/utils";
import { useFetchBasketQuery } from "../../../features/basket/basketApi";
import { BasketItem } from "../../models/basket";
import { Link, useLocation } from "react-router-dom";

const OrderSummary: React.FC = () => {
  const location = useLocation();
  const { data: basket } = useFetchBasketQuery();
  const subtotal =
    basket?.items.reduce(
      (sum: number, item: BasketItem) => sum + item.price * item.quantity,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="lg"
        mx="auto"
      >
        <Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
          <Typography variant="h6" component="p" fontWeight="bold">
            Order summary
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Orders over $100 qualify for free delivery!
          </Typography>
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Subtotal</Typography>
              <Typography>{currencyFormatter(subtotal)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Discount</Typography>
              <Typography color="success">
                {/* TODO */}
                -$0.00
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Delivery fee</Typography>
              <Typography>{currencyFormatter(deliveryFee)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Total</Typography>
              <Typography>
                {currencyFormatter(subtotal + deliveryFee)}
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            {!location.pathname.includes("checkout") && (
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
              >
                Checkout
              </Button>
            )}
            <Button component={Link} to="/catalogue" fullWidth>
              Continue Shopping
            </Button>
          </Box>
        </Paper>

        {/* Coupon Code Section */}
        <Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
          <form>
            <Typography variant="subtitle1" component="label">
              Do you have a voucher code?
            </Typography>

            <TextField
              label="Voucher code"
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Apply code
            </Button>
          </form>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default OrderSummary;
