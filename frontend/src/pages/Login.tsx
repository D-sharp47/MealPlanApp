import React from "react";
import {
  Button,
  Card,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const CLIENT_ID_GOOGLE = import.meta.env.VITE_CLIENT_ID_GOOGLE;

enum PageStatus {
  LOGIN = "Login",
  SIGN_UP = "Sign Up",
  INFO_STEPPER = "InfoStepper",
}

const infoSteps = [
  { label: "Personal Info", optional: false, completed: false },
  { label: "Dietary Restrictions", optional: false, completed: false },
  { label: "Goals", optional: true, completed: false },
  { label: "Owned Ingredients", optional: true, completed: false },
];

const Login: React.FC = () => {
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [status, setStatus] = React.useState(PageStatus.LOGIN);
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(infoSteps);

  const [foods, setFoods] = React.useState<string[]>([]);
  const [foodInputError, setFoodInputError] = React.useState(false);

  const foodInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: login } = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  let stepContent = <></>;
  switch (activeStep) {
    case 0: // Personal Info
      stepContent = (
        <>
          <TextField label="First Name" />
          <TextField label="Last Name" />
          <Typography variant="h5" sx={{ color: "black" }}>
            Cuisines
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Specific Favorite Foods
          </Typography>
          <Stack direction="row" spacing={2} maxWidth="40%" flexWrap="wrap">
            {foods.map((food, index) => (
              <Card
                key={index}
                sx={{ backgroundColor: "#E9E9E9", p: "0.5rem" }}
              >
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography variant="body1" sx={{ ml: "14px" }}>
                    {food}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setFoods((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Card>
            ))}
          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newFood = foodInputRef.current?.value;
              if (newFood) {
                setFoods((prev) => [...prev, newFood]);
                foodInputRef.current.value = "";
              } else {
                setFoodInputError(true);
              }
            }}
          >
            <TextField
              label="Food"
              inputRef={foodInputRef}
              error={foodInputError}
              helperText={foodInputError ? "Please enter a food" : ""}
              onChange={() => setFoodInputError(false)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton type="submit">
                      <AddBoxIcon
                        sx={foodInputError ? { color: "#D3302F" } : {}}
                      />
                    </IconButton>
                  ),
                },
              }}
            />
          </form>
        </>
      );
      break;
    case 1: // Dietary Restrictions
      stepContent = (
        <>
          <Typography variant="h5" sx={{ color: "black" }}>
            Allergies
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Intolerances
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Diets
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Religious Restrictions
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Other Restrictions
          </Typography>
        </>
      );
      break;
    case 2: // Goals
      stepContent = (
        <>
          <Typography variant="h5" sx={{ color: "black" }}>
            Health Goals (Weight Loss, Muscle Gain, etc.)
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Meal Variance (Meal prep, daily cooking, how often to repeat meals)
          </Typography>
          <Typography variant="h5" sx={{ color: "black" }}>
            Budget Goals
          </Typography>
        </>
      );
      break;
    case 3: // Owned Ingredients
      stepContent = (
        <>
          <Typography variant="h5" sx={{ color: "black" }}>
            Ingredients in fridge / pantry to create recipes with
          </Typography>
        </>
      );
      break;
  }

  const handleSubmit = () => {
    if (status === PageStatus.LOGIN) {
      login({ username: "username", password: "password" });
      // api call to check correct username and password
      // navigate to home page on successful login
    } else if (status === PageStatus.SIGN_UP && true) {
      // change true to error conditions
      setStatus(PageStatus.INFO_STEPPER);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
      {status !== PageStatus.INFO_STEPPER ? (
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
          <Typography variant="h3" align="center">
            Welcome to MyMeal
          </Typography>
          <TextField label="Username" />
          <TextField label="Password" type="password" />
          <Button variant="contained" size="large" onClick={handleSubmit}>
            {status}
          </Button>
          <Typography variant="body2">
            {status === PageStatus.LOGIN
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
                setStatus(
                  status === PageStatus.LOGIN
                    ? PageStatus.SIGN_UP
                    : PageStatus.LOGIN
                )
              }
            >
              {status === PageStatus.LOGIN
                ? PageStatus.SIGN_UP
                : PageStatus.LOGIN}
            </Button>
          </Typography>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              setStatus(PageStatus.INFO_STEPPER);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Stack>
      ) : (
        <>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: "5rem" }}>
            {steps.map((step, index) => {
              return (
                <Step
                  key={step.label}
                  completed={step.completed}
                  onClick={() => setActiveStep(index)}
                >
                  <StepLabel
                    optional={
                      step.optional && (
                        <Typography variant="caption">Optional</Typography>
                      )
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Stack
            direction="column"
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {stepContent}
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  size="large"
                  onClick={() => {
                    setSteps((prev) =>
                      prev.map((step, index) => {
                        if (index === activeStep) {
                          return { ...step, completed: true };
                        } else {
                          return step;
                        }
                      })
                    );
                    setActiveStep((prev) => prev - 1);
                  }}
                >
                  Prev
                </Button>
                <Button
                  variant="contained"
                  disabled={activeStep === steps.length - 1}
                  size="large"
                  onClick={() => {
                    setSteps((prev) =>
                      prev.map((step, index) => {
                        if (index === activeStep) {
                          return { ...step, completed: true };
                        } else {
                          return step;
                        }
                      })
                    );
                    setActiveStep((prev) => prev + 1);
                  }}
                >
                  Next
                </Button>
              </Stack>
            </>
          </Stack>
        </>
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
