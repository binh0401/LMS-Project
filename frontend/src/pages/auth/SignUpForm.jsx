import React from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
