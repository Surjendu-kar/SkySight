import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "./skySIght-img.jpg";

const ContainerStyle = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",

  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",

  backgroundBlendMode: "overlay",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  color: "#fff",
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  display: "block",
  width: "20rem",
  height: "50px",
  margin: "0.5rem 0",
  fontSize: "1.10rem",
  border: "1px solid #000",
  borderRadius: "10px",
  backgroundColor: "transparent",
  color: "#fff",
  fontFamily: "Garamond",
  letterSpacing: "0.25rem",

  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",

  "&:hover": {
    color: "#fff",
    backgroundColor: "transparent",
    borderColor: "#0062cc",
    fontSize: "1.25rem",
    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.6)",
    border: "1px solid #000",
    width: "21rem",
  },
  "&:active": {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderColor: "#000",
  },
  "&:focus": {
    boxShadow:
      "0 0 0 0.2rem rgba(0,123,255,.5), 0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    width: "10rem",
    fontSize: "0.85rem",
    margin: "0.3rem 0",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "7rem",
    height: "2rem",
    fontSize: "0.65rem",
    margin: "0.2rem 0",
    borderRadius: "5px",
  },
}));

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <ContainerStyle>
        <ButtonStyle onClick={() => navigate("/login")}>Login</ButtonStyle>
        <ButtonStyle onClick={() => navigate("/signup")}>Signup</ButtonStyle>
      </ContainerStyle>
    </Box>
  );
}
