import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 500,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 0, count: 0 },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name.includes("rating.")) {
      const fieldName = name.split("rating.")[1];
      setNewProduct({
        ...newProduct,
        rating: { ...newProduct.rating, [fieldName]: Number(value) },
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    fetch("https://shopease-api-7zhl.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Failed to add product. Please try again.");
        setSuccess(true);
        setNewProduct({
          title: "",
          price: 500,
          description:
            "Your perfect pack for everyday use and walks in the forest.",
          category: "",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
          rating: { rate: 0, count: 0 },
        });
        setTimeout(() => {
          setSuccess(false);
          navigate("/products");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "#f5f7fa",
        paddingTop: "20px",
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 440,
          margin: "0 auto",
          padding: { xs: 3, sm: 5 },
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: 3,
            color: "#1a1a2e",
          }}
        >
          Add New Product
        </Typography>

        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Product added successfully! Redirecting...
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          sx={{ display: "grid", gap: 2.5 }}
          onSubmit={handleAdd}
        >
          <TextField
            value={newProduct.title}
            name="title"
            label="Product Title"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={newProduct.price}
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={newProduct.category}
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={newProduct.image}
            name="image"
            label="Image URL"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.rate}
                name="rating.rate"
                label="Rating"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.count}
                name="rating.count"
                label="Review Count"
                type="number"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/products")}
              sx={{ height: 48 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                height: 48,
                background: "#1a1a2e",
                borderRadius: "10px",
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewProduct;
