import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

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
  const { logout } = useLogout();

  return (
    <Container>
      <p>
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </p>
      <p>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          Login
        </Link>
      </p>
      <p>
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          Signup
        </Link>
      </p>
      <p
        onClick={() => {
          logout();
        }}
        style={{ color: "white", cursor: "pointer" }}
      >
        Logout
        {/* </Link> */}
      </p>
    </Container>
  );
}

export default Sidebar;
