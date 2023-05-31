import { Divider, Paper, Typography } from "@mui/material";
import React from "react";

function Profile() {
  return (
    <>
      <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Profile
        </Typography>
        <Divider />
      </Paper>
    </>
  );
}

export default Profile;
