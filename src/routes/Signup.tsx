import { styled } from "@mui/material";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Form = styled("form")(() => ({
  maxWidth: "360px",
  margin: "60px auto",
  padding: "20px",
  "& span": {
    display: "block",
    marginBottom: "6px",
  },
  "& input": {
    padding: "8px 6px",
    fontSize: "1em",
    color: "#777",
    width: "100%",
  },
}));

const Label = styled("label")(() => ({
  display: "block",
  margin: "30px auto",
}));

const CustomeBtn = styled("button")(() => ({
  background: "none",
  border: "2px solid #1f9751",
  padding: "6px 12px",
  borderRadius: "4px",
  color: "#1f9751",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1em",
  "&:hover": {
    background: "#1f9751",
    color: "#fff",
  },
}));

const RightAlignedDiv = styled("div")(() => ({
  textAlign: "right",
  marginBottom: "1rem",
}));

const StyledNavigationButton = styled("button")(() => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#7091F5",
  padding: "5px",
}));

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(email, password, displayName);
    navigate("/login"); // Navigate to login page after signup
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>SignUp</h2>

      <Label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "95%" }}
          value={email}
        />
      </Label>
      <Label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "95%" }}
          value={password}
        />
      </Label>
      <Label sx={{ marginBottom: 0 }}>
        <span>Display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ width: "95%" }}
          value={displayName}
        />
      </Label>
      <RightAlignedDiv>
        <StyledNavigationButton onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </StyledNavigationButton>
      </RightAlignedDiv>

      {!isPending && <CustomeBtn type="submit">Signup</CustomeBtn>}
      {isPending && <CustomeBtn >Loading..</CustomeBtn>}
      {error && <p style={{ fontSize: "1rem" }}>{error}</p>}
    </Form>
  );
}

export default SignUp;
