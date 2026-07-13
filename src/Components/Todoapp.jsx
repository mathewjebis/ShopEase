import React from "react";
import Content from "./Content";

const Todoapp = () => {
  return (
    <div
      style={{ minHeight: "80vh", background: "#f5f7fa", paddingTop: "20px" }}
    >
      <h2
        style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "24px" }}
      >
        My Todo List
      </h2>
      <Content />
    </div>
  );
};

export default Todoapp;
