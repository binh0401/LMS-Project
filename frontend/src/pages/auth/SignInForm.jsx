import React from "react";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router";

const SignInForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signin } = useAuth();

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            Sign in to continue to your account
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Forgot Password */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: "right",
                  mt: -1,
                  mb: 1,
                  color: "primary.main",
                  cursor: "pointer",
                }}
                component={Link}
                to="/forgot-password"
              >
                Forgot password?
              </Typography>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

        
        
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignInForm;
