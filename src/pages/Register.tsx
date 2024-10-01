import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../store/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state: any) => state?.users?.userList);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  /**
   * this method checks the new user existed or not, after checking store the user in redux store and navigates to login page
   */
  const onSubmit = handleSubmit((data) => {
    if(data){
      const isExisted =
      allUsers.findIndex((user: FormData) => user.email === data.email) === -1;
      if(isExisted) {
        const payload = {
          ...data,
          createdAt: new Date().toISOString(),
          userId: Math.random().toString(36).substr(2, 9)
        };
        const params: any = [...allUsers, payload];
        dispatch(userCreate(params));
        navigate('/login');
      } else {
        alert('user already existed!')
      }
      
    }
    
  });

  return (
    <Box>
      <Grid container>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Card sx={{ marginTop: "20px" }}>

            <Box textAlign={"center"} margin={"50px"}>
            <Typography align="center" variant="h6">
              Register here..
            </Typography>
              <Box sx={{ "& .MuiTextField-root,MuiButton-root": { m: 1 } }}>
                <form onSubmit={onSubmit}>
                  <TextField
                    label="First name"
                    fullWidth
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                  />
                  <TextField
                    label="Last name"
                    fullWidth
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                  <TextField
                    label="Confirm password"
                    type="password"
                    fullWidth
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                  />
                  <Button  variant="contained"
                    type="submit"
                    size="large"
                    fullWidth={true}>
                    Submit
                  </Button>
                </form>
                
              </Box>
              <Typography align="center" variant="h6">
                  OR
                </Typography>
                <Link
                    component="span" 
                    underline="always"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate('/login')}
                  >
                    login here..
                  </Link>
            </Box>
          </Card>
        </Grid>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
      </Grid>
    </Box>
  );
};
export default Register;
