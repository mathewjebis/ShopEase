import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z]+ [A-Za-z]+$/, "Enter your full name (First Last)"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  age: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Age is required")
    .integer("Age must be a whole number")
    .positive("Age must be positive")
    .min(18, "Age must be between 18 and 60")
    .max(60, "Age must be between 18 and 60"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  cPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleData = () => {
    setSuccess(true);
    reset();
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2500);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 440,
          padding: { xs: 3, sm: 5 },
          borderRadius: "16px",
        }}
        component="form"
        onSubmit={handleSubmit(handleData)}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: 1,
            color: "#1a1a2e",
          }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#888", marginBottom: 3 }}
        >
          Fill in your details to get started
        </Typography>

        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Account created successfully! Redirecting...
          </Alert>
        )}

        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Full Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Email Address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Age"
            type="number"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register("cPassword")}
            error={!!errors.cPassword}
            helperText={errors.cPassword?.message}
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              height: 48,
              background: "#1a1a2e",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            Create Account
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("/login/Guest")}
            sx={{ color: "#666" }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
