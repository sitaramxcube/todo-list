import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const [loggedUserId, token] = useSelector((state: any) => state?.login?.token)?.split('.') || []
    const allUsers = useSelector((state: any) => state?.users?.userList);
    const userDetails = allUsers.find((user: any) => user.userId === loggedUserId);
    const [userData, setUserData] = useState<any>({})
    useEffect(() =>{
        setUserData(userDetails);
    },[userDetails])
  return (
   <>
    <Box mt={5} mb={5} display="flex" justifyContent="center">
      <Card style={{ maxWidth: 600, padding: "20px", borderRadius: "15px", boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Box  display={'flex'} flexDirection={'column'} alignItems={'center'} mb={3}>
            <Avatar style={{ width: "100px", height: "100px"}}>
            </Avatar>
            <Typography variant="h5" component="div">
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <Typography variant="subtitle1" style={{ color: "#757575" }}>
              User ID: {userData?.userId}
            </Typography>
          </Box>

          <Grid container>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography style={{ color: "#757575" }}>{userData.email}</Typography>
            </Grid>

            <Grid  size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="h6" gutterBottom>
                Account Created At
              </Typography>
              <Typography style={{ color: "#757575" }}>
                {new Date(userData?.createdAt).toLocaleDateString()}{" "}
                {new Date(userData?.createdAt).toLocaleTimeString()}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography style={{ color: "#757575" }}>
              Tis is a dummy content to show some description. this is static text only. passionate software developer with expertise in creating dynamic web applications. 
              With over 7 years of experience in web development, he has worked on multiple projects, enhancing his 
              skills in front-end frameworks and efficient development practices.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};
export default Profile;
