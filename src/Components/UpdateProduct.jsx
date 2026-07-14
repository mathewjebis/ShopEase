import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateProduct, setUpdateProduct] = useState({
    title: "",
    price: 500,
    description: "",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    axios
      .get(`https://shopease-api-7zhl.onrender.com/products/${id}`)
      .then((res) => {
        setUpdateProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load this product.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name.includes("rating.")) {
      const fieldName = name.split("rating.")[1];
      setUpdateProduct({
        ...updateProduct,
        rating: { ...updateProduct.rating, [fieldName]: Number(value) },
      });
    } else {
      setUpdateProduct({ ...updateProduct, [name]: value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    fetch(`https://shopease-api-7zhl.onrender.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Failed to update product. Please try again.");
        setSuccess(true);
        setTimeout(() => navigate("/products"), 2000);
      })
      .catch((err) => setError(err.message));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "60px" }}>
        <CircularProgress />
      </Box>
    );
  }

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
          Update Product
        </Typography>

        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Product updated successfully! Redirecting...
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
          onSubmit={handleUpdate}
        >
          <TextField
            value={updateProduct.title}
            name="title"
            label="Product Title"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={updateProduct.price}
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={updateProduct.category}
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            value={updateProduct.image}
            name="image"
            label="Image URL"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={updateProduct.description}
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={updateProduct.rating.rate}
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
                value={updateProduct.rating.count}
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
              color="success"
              fullWidth
              type="submit"
              sx={{ height: 48, borderRadius: "10px" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateProduct;
