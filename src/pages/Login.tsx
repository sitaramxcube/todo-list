import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/reducer/loginSlice";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const allUsers = useSelector((state: any) => state?.users?.userList);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

/**
 * this method generate the token with user id and date now.
 * @param userId 
 * @returns token
 */
  const generateToken = (userId: string) => {
    const timestamp = Date.now(); // Current time in milliseconds
    return `${userId}.${timestamp}`;
  };
  
  /**
   * this method checks the user existed or not after checking navigates to dashboard
   */
  const onSubmit = handleSubmit((data) => {
    const isUserExisted = allUsers.find((user: any) => user.email === data.email);
    if(isUserExisted) {
        dispatch(loginUser({token: generateToken(isUserExisted?.userId)}))
        router('/dashboard');
    } else {
        alert('please enter valid details')
    }
  });
 
  return (
    <>
      <Grid container>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Box marginTop={"10%"}>
            <Typography align="center" variant="h6">
              Welcome to Todo's
            </Typography>
            <Card>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <TextField
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    type="email"
                    error={!!errors.email}
                    {...register("email", { required: 'email is required.', min: 3, max: 15 })}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                    {...register("password", {
                      required: 'password is required.',
                      min: 3,
                      max: 10,
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth={true}
                    startIcon={<VpnKeyOutlinedIcon />}
                  >
                    Login
                  </Button>
                </form>

                <Typography align="center" variant="h6">
                  OR
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={() => {
                    router("/register");
                  }}
                  fullWidth={true}
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
      </Grid>
    </>
  );
};

export default Login;
