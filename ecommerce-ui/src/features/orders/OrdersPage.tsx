import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { useFetchOrdersQuery } from "./orderApi";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../lib/utils";

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <Typography variant="h5">Loading orders...</Typography>;

  if (!orders) return <Typography variant="h5">No orders available</Typography>;

  return (
    <Fragment>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" gutterBottom>
          My orders
        </Typography>
        <Paper sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Order</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  onClick={() => navigate(`/orders/${order.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell align="center"># {order.id}</TableCell>
                  <TableCell>
                    {format(order.orderDate, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>{currencyFormatter(order.total)}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default OrdersPage;
