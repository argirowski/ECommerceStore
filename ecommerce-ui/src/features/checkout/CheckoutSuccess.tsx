import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import {
  addressStringFormatter,
  currencyFormatter,
  paymentStringFormatter,
} from "../lib/utils";
import { Order } from "../../app/models/oder";

const CheckoutSuccess: React.FC = () => {
  const { state } = useLocation();
  const order = state.data as Order;

  if (!order) return <Typography>Problem accessing the order</Typography>;

  return (
    <Fragment>
      <Container maxWidth="md">
        <>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Thanks for your fake order!
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Your order <strong>#{order.id}</strong> will never be processed as
            this is a fake shop.
          </Typography>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Order date
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {order.orderDate}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Payment method
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {paymentStringFormatter(order.paymentSummary)}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Shipping address
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {addressStringFormatter(order.shippingAddress)}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Amount
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {currencyFormatter(order.total)}
              </Typography>
            </Box>
          </Paper>

          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/orders/${order.id}`}
            >
              View your order
            </Button>
            <Button
              component={Link}
              to="/catalog"
              variant="outlined"
              color="primary"
            >
              Continue shopping
            </Button>
          </Box>
        </>
      </Container>
    </Fragment>
  );
};

export default CheckoutSuccess;
