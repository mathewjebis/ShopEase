import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.wrapper}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to ShopEase</h1>
        <p style={styles.subtitle}>
          Discover amazing products at unbeatable prices.
          <br />
          Add to wishlist, manage products, and more!
        </p>
        <div style={styles.buttons}>
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => navigate("/sign-up")}
          >
            Create Account
          </button>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🛒</div>
          <h3>Easy Shopping</h3>
          <p>Add products to your wishlist with one click</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📦</div>
          <h3>Manage Products</h3>
          <p>Create, update and delete products easily</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⭐</div>
          <h3>Rated Products</h3>
          <p>Browse products with star ratings and reviews</p>
        </div>
      </div>
    </div>
  );
};
const styles = {
  wrapper: {
    minHeight: "90vh",
    background: "linear-gradient(135deg, #f5f7fa, #e8ecf1)",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px 60px",
    background: "linear-gradient(135deg, #1a1a2e, #16213e)",
    color: "white",
  },
  title: {
    fontSize: "clamp(1.8em, 5vw, 3em)",
    fontWeight: "800",
    marginBottom: "16px",
    color: "#ffc54d",
  },
  subtitle: {
    fontSize: "1.1em",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.8",
    marginBottom: "32px",
  },
  buttons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "12px 32px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "1em",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "12px 32px",
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255,255,255,0.6)",
    borderRadius: "30px",
    fontSize: "1em",
    fontWeight: "600",
    cursor: "pointer",
  },
  features: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    justifyContent: "center",
    padding: "60px 20px",
  },
  featureCard: {
    background: "white",
    borderRadius: "16px",
    padding: "32px 24px",
    width: "260px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  featureIcon: {
    fontSize: "2.5em",
    marginBottom: "16px",
  },
};
export default Home;
