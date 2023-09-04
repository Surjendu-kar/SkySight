import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Container = styled(Box)(() => ({
  background: "#2e2e39",
  padding: "1rem",
  borderRadius: "25px",
  margin: "15px",
  border: "1px solid #000",
  fontSize: "1.5rem",
}));

function Sidebar() {
  return (
    <Container>
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
    </Container>
  );
}

export default Sidebar;
