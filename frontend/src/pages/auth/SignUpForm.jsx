import React from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router";

const SignUpForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const { signup } = useAuth();

  const onSubmit = (data) => {
    signup(data);
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
      <Card sx={{ maxWidth: 420, width: "100%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
          >
            Create an Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            Join our platform and get started in minutes
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Date of Birth */}
              <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Gender */}
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Gender"
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                )}
              />

              {/* Role */}
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Role"
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </form>

        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpForm;
