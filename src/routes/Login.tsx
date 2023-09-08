import { styled } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Label>
      <Label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Label>
      {!isPending ? (
        <CustomeBtn>Login</CustomeBtn>
      ) : (
        <CustomeBtn disabled>Loading...</CustomeBtn>
      )}
      {error && <p style={{ fontSize: "1rem" }}>{error}</p>}
    </Form>
  );
}

export default Login;
