import { Button, styled, TextField, Typography } from "@mui/material";
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

  'input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0px 1000px white inset',
  }
}));

const Label = styled("label")(() => ({
  display: "block",
  margin: "30px auto",
}));

const CustomBtn = styled(Button)(() => ({
  background: "none",
  border: "2px solid #1f9751",
  padding: "8px 12px",
  borderRadius: "4px",
  color: "#1f9751",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: ".9rem",
  width: "100%",
  marginTop: 20,

  "&:hover": {
    background: "#1f9751",
    color: "#fff",
  },
}));

const RightAlignedDiv = styled("div")(() => ({
  textAlign: "right",
  marginBottom: "1rem",
  marginTop: 15,
}));

const StyledNavigationButton = styled(Typography)(() => ({
  cursor: "pointer",
  color: "#7091F5",
}));

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !displayName) {
      alert("Please fill all the fields");
      return;
    }

    const err = await signup(email, password, displayName);
    if (!err) {
      navigate("/login"); // Navigate to login page after signup
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Typography component='h2' sx={{ textAlign: 'center', fontWeight: 600, fontSize: 25 }}>
        Signup
      </Typography>

      <Label>
        <Typography component='span'>Email</Typography>

        <TextField
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "95%" }}
          value={email}
          placeholder="eg: john@example.com"
          autoComplete="off"
        />

      </Label>
      <Label>
        <Typography component='span'>Password</Typography>
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "95%" }}
          value={password}
          placeholder="eg: #AStroNGp@ssw0rd"
          autoComplete="off"
        />
      </Label>
      <Label sx={{ marginBottom: 0 }}>
        <Typography component='span'>Display name</Typography>
        <TextField
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ width: "95%" }}
          value={displayName}
          placeholder="eg: John Doe"
          autoComplete="off"
        />
      </Label>
      <RightAlignedDiv>
        <StyledNavigationButton onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </StyledNavigationButton>
      </RightAlignedDiv>

      <CustomBtn disabled={isPending} type="submit">
        {isPending ? "Loading..." : "Sign Up"}
      </CustomBtn>

      {error && <Typography style={{ fontSize: "1rem" }}>{error}</Typography>}
    </Form >
  );
}

export default SignUp;
