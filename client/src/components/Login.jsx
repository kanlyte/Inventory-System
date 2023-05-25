import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import "./design/login.css";
import Logo from "../assets/logo.jpeg";
import Image from "../assets/image.svg";

function Login() {
  const [loaderOpen, setloaderOpen] = useState(false);

  return (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      className="m-ctr"
    >
      <div className="ctr">
        <img
          alt="Hospital"
          src={Logo}
          height="120px"
          width="150px"
          style={{ objectFit: "cover" }}
        />
        <div
          className="header"
          style={{
            margin: "15px 0px",
          }}
        >
          Lyte Inventory System
        </div>
        <div className="loginCtr">
          <TextField
            name="tel"
            variant="standard"
            label="Phone Number"
            fullWidth
            required
            style={{
              width: "250px",
              display: "block",
              margin: "15px 0px",
            }}
          />
          <TextField
            type="password"
            name="pin"
            variant="standard"
            label="Pin"
            require
            fullWidth
            style={{
              display: "block",
              margin: "50px 0px",
            }}
          />
        </div>
        <div className="submitCtr">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
          >
            Login
            <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
              <i className="las la-sign-in-alt"></i>
            </span>
          </Button>
        </div>
        {/* for loader */}
        <div
          className="loader"
          style={loaderOpen ? { display: "flex" } : { display: "none" }}
        >
          <CircularProgress size={25} />
        </div>
        {/* for loader */}
      </div>
      <img src={Image} className="img" alt="Hospital" />
    </div>
  );
}

export default Login;
