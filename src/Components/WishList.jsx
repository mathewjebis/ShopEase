import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { removeItem } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const WishList = () => {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const total = cartProducts.reduce((sum, p) => sum + Number(p.price), 0);

  if (cartProducts.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
          gap: 2,
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography sx={{ fontSize: "5em" }}>🛒</Typography>
        <Typography variant="h5" sx={{ color: "#1a1a2e" }}>
          Your Wishlist is Empty
        </Typography>
        <Typography sx={{ color: "#888" }}>
          Browse products and add them to your wishlist!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{ background: "#1a1a2e" }}
        >
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3 },
        background: "#f5f7fa",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#1a1a2e",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Wishlist <Chip label={cartProducts.length} size="small" />
        </Typography>
        <Box
          sx={{
            background: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Typography component="span" sx={{ color: "#888", fontSize: "14px" }}>
            Total:{" "}
          </Typography>
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#dc2626", fontSize: "1.2em" }}
          >
            ₹ {total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        {cartProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardMedia
                component={Link}
                to={`/products/details/${product.id}`}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 2,
                  background: "#f9f9f9",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{ width: "9rem", height: "12rem", objectFit: "contain" }}
                />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    fontSize: "0.9em",
                    fontWeight: 600,
                    marginBottom: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.6em",
                  }}
                >
                  {product.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#dc2626",
                      fontSize: "1.1em",
                    }}
                  >
                    ₹ {product.price}
                  </Typography>
                  {product.rating && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "#f59e0b",
                        fontSize: "0.85em",
                      }}
                    >
                      <StarIcon sx={{ fontSize: "1em" }} />{" "}
                      {product.rating.rate}
                    </Box>
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(product.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishList;
