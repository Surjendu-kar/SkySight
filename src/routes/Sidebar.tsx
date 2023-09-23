import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  background: "#2e2e39",
  padding: "1rem",
  borderRadius: "25px",
  margin: "15px",
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: {
    padding: "0.5rem",
    margin: "5px",
    fontSize: "0.5rem",
  },
}));

function Sidebar() {
  return (
    <Container>
      <p className="cursor-pointer">
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </p>
      {/* <p className="cursor-pointer">
        <Link to="/details" style={{ textDecoration: "none", color: "white" }}>
          Details
        </Link>
      </p> */}
    </Container>
  );
}

export default Sidebar;
