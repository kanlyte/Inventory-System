import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import React from "react";

function ChangePassword() {
  return (
    <>
      <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Change Password
        </Typography>
        <Divider />
        <Box height={10} />
        <div className="inputs_ctr">
          <div className="inpts_on_left">
            <TextField
              style={{ width: "85%", margin: "20px" }}
              variant="outlined"
              label="name"
            />
            <TextField
              style={{ width: "85%", margin: "20px" }}
              variant="outlined"
              label="Password"
            />
          </div>
          <div className="inpts_on_right">
            <TextField
              style={{ width: "85%", margin: "20px" }}
              variant="outlined"
              label="confirm Password"
            />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default ChangePassword;
