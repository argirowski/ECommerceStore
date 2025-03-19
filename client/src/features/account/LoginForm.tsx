import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginSchema } from "../lib/schemas/loginSchema";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };
  return (
    <Fragment>
      <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="8"
        >
          <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
          <Typography variant="h5">Sign In</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            display="flex"
            flexDirection="column"
            marginY={3}
            gap={3}
          >
            <TextField
              fullWidth
              label="Email"
              autoFocus
              {...register("email", { required: "Email is Required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "Password is Required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button variant="contained" type="submit">
              Sign In
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?
              <Typography
                sx={{ marginLeft: 2 }}
                component={Link}
                to="/register"
                color="primary"
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default LoginForm;
