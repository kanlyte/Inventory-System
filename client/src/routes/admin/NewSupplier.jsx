import React, { Fragment, useState } from "react";
import Header from "../../components/header/Header";
import SideBar from "./components/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import {
  Alert as MuiAlert,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import FormsApi from "../../api/api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewSupplier() {
  const [state, setState] = useState({
    open: false,
    message: "Please Wait...",
    messageState: "",
    empty_name_error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    if (!_fcontent["supplier_surname"]) {
      setState({
        ...state,
        open: true,
        message: "The Supplier Name is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    } else if (!_fcontent["supplier_lastname"]) {
      setState({
        ...state,
        open: true,
        message: "The Supplier Name is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    } else if (!_fcontent["supplier_contact"]) {
      setState({
        ...state,
        open: true,
        message: "The Supplier Contact is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    } else if (!_fcontent["supplier_location"]) {
      setState({
        ...state,
        open: true,
        message: "The Supplier Location is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    } else {
      _fcontent["date"] = Date.now();
      let api = new FormsApi();
      let res = await api.post("/new_supplier", _fcontent);
      if (res.status === true) {
        setState({
          ...state,
          message: res.data,
          messageState: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        setState({
          ...state,
          message: res.data,
          messageState: "error",
        });
      }
    }
  };

  const closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      open: false,
      message: "Please Wait...",
      messageState: "info",
      empty_name_error: false,
    });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state.open}
        autoHideDuration={7000}
        onClose={closePopUp}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closePopUp}
            >
              <i className="las la-times"></i>
            </IconButton>
          </Fragment>
        }
      >
        <div>
          <Alert onClose={closePopUp} severity={state.messageState}>
            {state.message}
          </Alert>
        </div>
      </Snackbar>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar active="products" />
      <div className="main-content">
        <main>
          <div className="fullwidth-ctr">
            <div className="projects">
              <form className="card" autoComplete="off" onSubmit={handleSubmit}>
                <div
                  className=""
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    padding: "1rem",
                  }}
                >
                  <div className="form-header-ctr">
                    <div className="">
                      <h3>New Supplier</h3>
                    </div>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={""}
                        variant="contained"
                        color="primary"
                        style={{ marginInline: 10 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        aria-describedby={""}
                        variant="contained"
                        color="primary"
                        style={{ marginInline: 10 }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="inputCtr">
                      <h4>Supplier Details</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <TextField
                            error={state.empty_name_error}
                            name="supplier_surname"
                            variant="outlined"
                            label="First name"
                            style={{
                              width: "75%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="supplier_lastname"
                            variant="outlined"
                            label="Last name"
                            style={{
                              width: "75%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="supplier_contact"
                            variant="outlined"
                            label="Phonenumber"
                            style={{
                              width: "75%",
                              margin: "20px",
                            }}
                          />
                          <TextField
                            name="supplier_location"
                            variant="outlined"
                            label="Location"
                            style={{
                              width: "75%",
                              margin: "20px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default NewSupplier;
