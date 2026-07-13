import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.wrapper}>
      <div style={styles.code}>404</div>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.subtitle}>
        The page you are looking for does not exist or has been moved.
      </p>
      <button style={styles.btn} onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};
const styles = {
  wrapper: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    background: "#f5f7fa",
  },
  code: {
    fontSize: "clamp(4em, 20vw, 8em)",
    fontWeight: "900",
    color: "#dc2626",
    lineHeight: "1",
    marginBottom: "16px",
  },
  title: {
    fontSize: "1.8em",
    color: "#1a1a2e",
    marginBottom: "12px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "32px",
    fontSize: "1em",
  },
  btn: {
    padding: "12px 32px",
    background: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "1em",
    fontWeight: "600",
    cursor: "pointer",
  },
};
export default NotFound;
