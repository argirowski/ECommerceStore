import { Divider, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

const ServerError: React.FC = () => {
  const { state } = useLocation();
  return (
    <Fragment>
      <Paper>
        {state.error ? (
          <>
            <Typography
              gutterBottom
              variant="h3"
              sx={{ px: 4, pt: 2 }}
              color="secondary"
            >
              {state.error.title}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ p: 4 }} color="secondary">
              {state.error.detail}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" gutterBottom>
            Server Error
          </Typography>
        )}
      </Paper>
    </Fragment>
  );
};

export default ServerError;
