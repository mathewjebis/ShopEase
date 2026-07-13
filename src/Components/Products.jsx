import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div style={{ minHeight: "80vh", background: "#f5f7fa" }}>
      <Outlet />
    </div>
  );
};

export default Products;
