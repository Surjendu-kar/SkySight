import { styled } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
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

  // add style if button is disabled
  "&:disabled": {
    background: "#ccc",
    color: "#fff",
    cursor: "not-allowed",
  },
}));

const RightAlignedDiv = styled("div")(() => ({
  textAlign: "right",
}));

const StyledNavigationButton = styled("p")(() => ({
  cursor: "pointer",
  color: "#7091F5",
}));

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
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
        <RightAlignedDiv>
          <StyledNavigationButton onClick={() => navigate("/signup")}>
            Don't have an account? Sign up
          </StyledNavigationButton>
        </RightAlignedDiv>
      </Label>

      {!isPending ? (
        <CustomeBtn type="submit">Login</CustomeBtn>
      ) : (
        <CustomeBtn disabled>Loading...</CustomeBtn>
      )}
      {error && <p style={{ fontSize: "1rem" }}>{error}</p>}
    </Form>
  );
}

export default Login;

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";
// import { InputAdornment, IconButton } from "@material-ui/core";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { Button } from "@mui/material";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = React.useState(false);
//   const { login, isPending, error } = useLogin();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     login(email, password);
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           {/* <LockOutlinedIcon /> */}
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             autoComplete="current-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     size="small"
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             /> */}
//           <Grid container>
//             <Grid item xs>
//               {/* <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link> */}
//             </Grid>
//             <Grid item>
//               <Link href="/signup" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>

//           <Box>
//             {!isPending ? (
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                 }}
//               >
//                 Login
//               </Button>
//             ) : (
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Loading ...
//               </Button>
//             )}
//           </Box>

//           {error && <p style={{ fontSize: "1rem" }}>{error}</p>}
//         </Box>
//       </Box>
//     </Container>
//   );
// }
