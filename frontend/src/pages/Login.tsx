import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID_GOOGLE = import.meta.env.VITE_CLIENT_ID_GOOGLE;

const Login: React.FC = () => {
  const [buttonAction, setButtonAction] = React.useState("Login");
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3">Welcome to MyMeal</Typography>
        <TextField label="Username" />
        <TextField label="Password" type="password" />
        <Button variant="contained" size="large">
          {buttonAction}
        </Button>
        <Typography variant="body2">
          {buttonAction === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Button
            sx={{
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
                fontWeight: "bold",
              },
            }}
            onClick={() =>
              setButtonAction(
                buttonAction === "Login" ? "Create Account" : "Login"
              )
            }
          >
            {buttonAction === "Login" ? "Sign Up" : "Log in"}
          </Button>
        </Typography>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Stack>
    </GoogleOAuthProvider>
  );
};

export default Login;
