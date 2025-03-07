import { SearchOff } from "@mui/icons-material";
import { Button, Divider, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound: React.FC = () => {
  const { state } = useLocation();
  return (
    <Fragment>
      <Paper
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
        }}
      >
        <SearchOff sx={{ fontSize: 100 }} color="primary" />
        <Typography variant="h3" gutterBottom>
          We could not find what you were looking for
        </Typography>
        <Button fullWidth component={Link} to="/catalogue">
          Got back to the shop
        </Button>
      </Paper>
    </Fragment>
  );
};

export default NotFound;
