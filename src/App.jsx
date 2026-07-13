import Todoapp from "./Components/Todoapp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Products from "./Components/Products";
import SignUp from "./Components/SignUp";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import NavbarMenu from "./Components/NavbarMenu";
import NotFound from "./Components/NotFound";
import NewProduct from "./Components/NewProduct";
import UpdateProduct from "./Components/UpdateProduct";
import WishList from "./Components/WishList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}>
          <Route index element={<ProductList />} />
          <Route path="list" element={<ProductList />} />
          <Route path="details/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/login/:user" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/todo" element={<Todoapp />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
