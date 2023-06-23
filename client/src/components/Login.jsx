import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import "./design/login.css";
import Logo from "../assets/logo.jpeg";
import Image from "../assets/image.svg";
import user from "../app.config";
import FormsApi from "../api/api";
import { Base64 } from "js-base64";

function Login() {
  const [submit, setSubmit] = useState(false);
  const [apiFeedBackError, setApiFeedBackError] = useState(false);

  const form_submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const fd = new FormData(e.target);
    let form_content = {};
    fd.forEach((value, key) => {
      form_content[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/login", form_content);
    if (res === "Error") {
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    if (res.status === false) {
      setApiFeedBackError(true);
      setSubmit(false);
    } else {
      const data = Base64.encode(
        JSON.stringify({ ...res.user, role: res.role })
      );
      sessionStorage.setItem("value", data);
      setSubmit(false);
      window.location.reload();
    }
  };

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
        <form onSubmit={form_submit}>
          <div className="loginCtr">
            <TextField
              name="tel"
              variant="standard"
              label="Phone Number"
              placeholder="07########"
              fullWidth
              inputProps={{
                maxLength: 10,
                //readOnly: true,
              }}
              error={apiFeedBackError}
              helperText={
                apiFeedBackError ? "Wrong Pin or some network error" : ""
              }
              required
              style={{
                width: "250px",
                display: "block",
                margin: "15px 0px",
              }}
            />
            <TextField
              type="password"
              name="password"
              variant="standard"
              label="Pin"
              require
              fullWidth
              error={apiFeedBackError}
              helperText={
                apiFeedBackError ? "Wrong Password or some network error" : ""
              }
              style={{
                display: "block",
                margin: "50px 0px",
              }}
            />
          </div>
          <div className="submitCtr">
            <Button
              fullWidth
              variant={submit ? "outlined" : "contained"}
              color="primary"
              style={{ marginRight: 10 }}
              type="submit"
            >
              <CircularProgress
                size={15}
                thickness={10}
                style={{
                  display: submit ? "inline-block" : "none",
                  marginRight: "20px",
                }}
              />
              {submit ? "Please Wait..." : "Login"}
              <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                <i className="las la-sign-in-alt"></i>
              </span>
            </Button>
          </div>
        </form>
      </div>
      <img src={Image} className="img" alt="Hospital" />
    </div>
  );
}

export default Login;

export function Logout() {
  sessionStorage.removeItem("token");
  window.location.replace("/");
}
