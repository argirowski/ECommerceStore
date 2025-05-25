import { Box, Button, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Fragment>
      <Box maxWidth="xl" mx="auto" px={4} position="relative">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <img
            src="/images/hero1.jpg"
            alt="ski resort"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px",
              zIndex: 0,
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            p={8}
            alignItems="center"
            position="relative"
            borderRadius={4}
          >
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              textAlign="center"
              sx={{ my: 3 }}
            >
              Welcome to My Commerce Store
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              sx={{
                mt: 8,
                backgroundImage: "linear-gradient(to right, #2563eb, #06b6d4)",
                fontWeight: "bold",
                color: "white",
                borderRadius: "16px",
                px: 8,
                py: 2,
                border: "2px solid transparent",
              }}
            >
              Go to the shop
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default HomePage;
