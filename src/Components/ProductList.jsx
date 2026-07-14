import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import useFetch from "./custom-hook/useFetch";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, error, isLoading, setProducts } = useFetch(
    "https://shopease-api-7zhl.onrender.com/products",
  );
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://shopease-api-7zhl.onrender.com/products/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            setProducts(products.filter((product) => product.id !== id));
          });
      }
    });
  };

  const addItemToCart = (product) => {
    const alreadyInCart = cartState.some((item) => item.id === product.id);
    if (alreadyInCart) {
      Swal.fire({
        title: "Already in Wishlist!",
        text: "This product is already in your wishlist.",
        icon: "info",
      });
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "60px" }}>
        <CircularProgress sx={{ color: "#1a1a2e" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
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
          Products <Chip label={products.length} size="small" />
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/newProduct")}
          sx={{ background: "#1a1a2e", borderRadius: "8px" }}
        >
          + Add New Product
        </Button>
      </Box>

      {error && (
        <Box sx={{ textAlign: "center", color: "#dc2626", padding: 5 }}>
          <Typography>Error: {error}</Typography>
          <Typography>
            The product API may be waking up — please wait a moment and
            refresh.
          </Typography>
        </Box>
      )}

      {products.length === 0 && !error && (
        <Box sx={{ textAlign: "center", padding: 8, color: "#666" }}>
          <Typography sx={{ fontSize: "1.2em", marginBottom: 2 }}>
            No products found.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/newProduct")}
            sx={{ background: "#1a1a2e" }}
          >
            Add First Product
          </Button>
        </Box>
      )}

      <Grid container spacing={2.5}>
        {products.map((product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
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
                  component={Link}
                  to={`/products/details/${product.id}`}
                  sx={{
                    fontSize: "0.9em",
                    fontWeight: 600,
                    marginBottom: 1,
                    color: "#1a1a2e",
                    textDecoration: "none",
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
              <CardActions
                sx={{ justifyContent: "space-evenly", paddingBottom: 2 }}
              >
                <IconButton
                  size="small"
                  onClick={() => addItemToCart(product)}
                  title="Add to Wishlist"
                  sx={{ background: "#e6f1fb", color: "#185fa5" }}
                >
                  <AddShoppingCartIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/updateProduct/${product.id}`)}
                  title="Edit"
                  sx={{ background: "#fff8e1", color: "#f59e0b" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(product.id)}
                  title="Delete"
                  sx={{ background: "#fff1f1", color: "#dc2626" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
