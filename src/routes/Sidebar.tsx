import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        background: "#2e2e39",
        padding: "10px",
        borderRadius: "25px",
        margin: "15px",
        border: "1px solid #000",
      }}
    >
      <p className="cursor-pointer">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </p>
      <p className="cursor-pointer">
        <Link to="/details" style={{ textDecoration: "none", color: "white" }}>
          Details
        </Link>
      </p>
    </div>
  );
}

export default Sidebar;
