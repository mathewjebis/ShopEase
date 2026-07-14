import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://shopease-api-7zhl.onrender.com/products/${id}`,
        );
        setProduct(res.data);
      } catch {
        setError("Could not load this product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addItemToCart = () => {
    const alreadyInCart = cartState.some((item) => item.id === product.id);
    if (alreadyInCart) {
      Swal.fire({ title: "Already in Wishlist!", icon: "info" });
      return;
    }
    dispatch(addItem(product));
    Swal.fire({
      title: "Added!",
      text: "Product added to wishlist.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "60px" }}>
        <CircularProgress sx={{ color: "#1a1a2e" }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: "center", padding: 6 }}>
        <Typography sx={{ color: "#dc2626", marginBottom: 2 }}>
          {error || "Product not found."}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{ background: "#1a1a2e" }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/products")}
        sx={{ marginBottom: 2, color: "#666" }}
      >
        Back to Products
      </Button>

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          padding: { xs: 3, md: 5 },
          borderRadius: "16px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#f9f9f9",
            borderRadius: "12px",
            padding: 3,
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{ width: "14rem", height: "16rem", objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          {product.category && (
            <Chip
              label={product.category}
              size="small"
              sx={{ marginBottom: 1.5 }}
            />
          )}
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 1.5 }}
          >
            {product.title}
          </Typography>

          {product.rating && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#f59e0b",
                marginBottom: 2,
              }}
            >
              <StarIcon fontSize="small" />
              <Typography variant="body2">
                {product.rating.rate} ({product.rating.count} reviews)
              </Typography>
            </Box>
          )}

          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#dc2626", marginBottom: 2 }}
          >
            ₹ {product.price}
          </Typography>

          {product.description && (
            <Typography
              sx={{ color: "#555", lineHeight: 1.7, marginBottom: 3 }}
            >
              {product.description}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={addItemToCart}
              sx={{ background: "#1a1a2e", borderRadius: "8px" }}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/updateProduct/${product.id}`)}
              sx={{ borderRadius: "8px" }}
            >
              Edit Product
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
