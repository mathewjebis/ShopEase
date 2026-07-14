import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => navigate("/"), 1500);
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
          maxWidth: 400,
          padding: { xs: 3, sm: 5 },
          borderRadius: "16px",
        }}
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
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#888", marginBottom: 4 }}
        >
          Glad to see you again, {user}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "grid", gap: 2.5 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
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
            }}
          >
            Login
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("/")}
            sx={{ color: "#666" }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Welcome back, {user}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
