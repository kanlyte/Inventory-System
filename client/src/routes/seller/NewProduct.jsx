import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import {
  Button,
  IconButton,
  TextField,
  Alert as MuiAlert,
  Slide,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import "..//Design/products.css";
import SideBar from "../../components/SideBar";
import FormsApi from "../../api/api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewProduct() {
  const [state, setState] = useState({
    open: false,
    open_dialog: false,
    message: "Please Wait...",
    messageState: "",
    empty_name_error: false,
    units: [],
    selling_units: [],
  });
  //

  const handleClose = () => {
    setState({ ...state, open_dialog: false });
  };

  //handler for getting all unitts
  useEffect(() => {
    (async () => {
      const res = (await new FormsApi().get("/all/units")) || [];
      if (res) {
        setState({
          ...state,
          selling_units: res === "Error" ? [] : res.result,
        });
      }
    })();
  }, []);
  //handler for adding the selling unit
  const handleUnit = async (e) => {
    e.preventDefault();
    setState({ ...state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let content = {};
    fd.forEach((value, key) => {
      content[key] = value;
    });
    if (!content["unit_name"]) {
      setState({
        ...state,
        open: true,
        message: "This field is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    }
    let api = new FormsApi();
    let res = await api.post("/new/unit", content);
    if (res.status === true) {
      setState({ ...state, message: res.data, messageState: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } else if (res.data === "unit exists") {
      setState({ ...state, message: res.data, messageState: "warning" });
    } else {
      setState({ ...state, message: res.data, messageState: "error" });
    }
  };
  //handler for creating new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    if (state.units.length === 0) {
      setState({
        ...state,
        open: true,
        message: "No Selling Units Registered",
        messageState: "error",
      });
      return;
    }
    if (!_fcontent["pdt_name"]) {
      setState({
        ...state,
        open: true,
        message: "The Product Name is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    }
    if (
      !(
        state.units[state.units.length - 1].selling_unit &&
        state.units[state.units.length - 1].qty &&
        state.units[state.units.length - 1].retail &&
        state.units[state.units.length - 1].wholesale
      )
    ) {
      setState({
        ...state,
        new_unit_error: true,
        open: true,
        message: "Some Fields are Missing",
        messageState: "error",
      });
      return;
    }
    _fcontent["units"] = state.units;
    _fcontent["date"] = Date.now();
    let api = new FormsApi();
    let res = await api.post("/new/product", _fcontent);
    if (res.status === true) {
      setState({
        ...state,
        message: res.data,
        messageState: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      setState({
        ...state,
        message: res.data,
        messageState: "error",
      });
    }
  };

  //close the mui snackbar--------
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
      <SideBar />
      <div className="main-content">
        <main>
          <div className="fullwidth-ctr">
            <div className="projects">
              <form className="card" autoComplete="off" onSubmit={handleSubmit}>
                <div
                  className=""
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    padding: "1rem",
                  }}
                >
                  <div className="form-header-ctr">
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          setState({ ...state, open_dialog: true });
                        }}
                      >
                        Add Unit
                      </Button>
                    </div>
                    <div className="">
                      <Button variant="contained" color="primary">
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginLeft: 10 }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="inputCtr">
                      <h4>Product Entry</h4>
                      <div className="inputs_ctr_np">
                        <div className="inputs_left_np">
                          <TextField
                            error={state.empty_name_error}
                            name="pdt_name"
                            variant="outlined"
                            label="Product Name"
                            style={{ width: "75%", margin: "20px" }}
                          />
                          <div
                            className=""
                            style={{
                              display: "flex",
                              width: "75%",
                              margin: "20px",
                              justifyContent: "space-between",
                            }}
                          >
                            <TextField
                              error={state.empty_name_error}
                              type="number"
                              name="re_order_qty"
                              variant="outlined"
                              label="Re-order Qty"
                              style={{ flex: 1, marginRight: "5px" }}
                            />
                            <TextField
                              value={
                                state.units.length > 0 &&
                                state.units[state.units.length - 1].selling_unit
                                  ? state.units[state.units.length - 1]
                                      .selling_unit
                                  : ""
                              }
                              name="re_order_unit"
                              variant="outlined"
                              label="Unit"
                              style={{ flex: 1, marginRight: "5px" }}
                            />
                          </div>
                          <TextField
                            name="pdt_desc"
                            label="Product Description"
                            variant="outlined"
                            style={{ width: "75%", margin: "20px" }}
                          />
                        </div>
                        <div className="inputs_right_np">
                          <h4 style={{ margin: "20px" }}>Selling Units</h4>
                          <div className="tbl_ctr_np">
                            <table width="100%">
                              <thead>
                                <tr>
                                  <td>Selling Unit</td>
                                  <td>Quantity</td>
                                  <td>Retail</td>
                                  <td>Wholesale</td>
                                </tr>
                              </thead>
                              <tbody>
                                {state.units.length === 0 ? (
                                  <tr>
                                    <td>No Selected Units</td>
                                  </tr>
                                ) : (
                                  state.units.map((v, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>
                                          <FormControl
                                            error={state.new_unit_error}
                                            variant="standard"
                                            label="selling_unit"
                                            style={{ width: "90%" }}
                                          >
                                            <InputLabel id="selling_unit">
                                              {i === 0
                                                ? `Smallest Unit`
                                                : `Unit ${i + 1}`}
                                            </InputLabel>
                                            <Select
                                              inputProps={{
                                                name: "selling_unit",
                                              }}
                                              label={
                                                i === 0
                                                  ? `Smallest Unit`
                                                  : `Unit ${i + 1}`
                                              }
                                              id="select_selling_unit"
                                              defaultValue=""
                                              onChange={(e) => {
                                                let units_change = state.units;
                                                units_change[i].selling_unit =
                                                  e.target.value;
                                                setState({
                                                  ...state,
                                                  units: units_change,
                                                });
                                              }}
                                            >
                                              {state.selling_units.length ===
                                              0 ? (
                                                <MenuItem value="no_unit">
                                                  No Unit Added
                                                </MenuItem>
                                              ) : (
                                                state.selling_units.map(
                                                  (v, i) => {
                                                    return (
                                                      <MenuItem
                                                        value={v.unit_name}
                                                        key={i}
                                                      >
                                                        {v.unit_name}
                                                      </MenuItem>
                                                    );
                                                  }
                                                )
                                              )}
                                            </Select>
                                          </FormControl>
                                        </td>
                                        <td>
                                          <TextField
                                            multiline={true}
                                            variant="standard"
                                            defaultValue={i === 0 ? "1" : ""}
                                            label={
                                              i === 0
                                                ? `Quantity`
                                                : `Quantity In Unit ${i}`
                                            }
                                            onChange={(e) => {
                                              let units_change = state.units;
                                              units_change[i].qty =
                                                e.target.value;
                                              setState({
                                                ...state,
                                                units: units_change,
                                              });
                                            }}
                                            style={{ width: "95%" }}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            error={state.new_unit_error}
                                            variant="standard"
                                            label="Retail"
                                            onChange={(e) => {
                                              let units_change = state.units;
                                              units_change[i].retail =
                                                e.target.value;
                                              setState({
                                                ...state,
                                                units: units_change,
                                              });
                                            }}
                                            style={{ width: "95%" }}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            error={state.new_unit_error}
                                            variant="standard"
                                            label="Wholesale"
                                            onChange={(e) => {
                                              let units_change = state.units;
                                              units_change[i].wholesale =
                                                e.target.value;
                                              setState({
                                                ...state,
                                                units: units_change,
                                              });
                                            }}
                                            style={{ width: "95%" }}
                                          />
                                        </td>
                                        <td>
                                          <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => {
                                              let units = state.units;
                                              units.splice(i, 1);
                                              setState({
                                                ...state,
                                                units,
                                              });
                                            }}
                                          >
                                            Remove
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              margin: "10px auto",
                              width: "95%",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                if (state.units.length === 0) {
                                  setState({
                                    ...state,
                                    units: [...state.units, { qty: 1 }],
                                  });
                                } else if (state.units.length === 1) {
                                  let units = state.units;
                                  if (
                                    !units[0].selling_unit ||
                                    !units[0].qty ||
                                    !units[0].retail ||
                                    !units[0].wholesale
                                  ) {
                                    setState({
                                      ...state,
                                      new_unit_error: true,
                                      open: true,
                                      message: "Some Fields are missing",
                                      messageState: "error",
                                    });
                                  } else {
                                    setState({
                                      ...state,
                                      units: [...state.units, {}],
                                      new_unit_error: false,
                                    });
                                  }
                                } else {
                                  let units = state.units;
                                  if (
                                    units[units.length - 1].selling_unit &&
                                    units[units.length - 1].qty &&
                                    units[units.length - 1].retail &&
                                    units[units.length - 1].wholesale
                                  ) {
                                    setState({
                                      ...state,
                                      units: [...state.units, {}],
                                      new_unit_error: false,
                                    });
                                  } else {
                                    setState({
                                      ...state,
                                      new_unit_error: true,
                                      open: true,
                                      message: "Some Fields are Missing",
                                      messageState: "error",
                                    });
                                  }
                                }
                              }}
                            >
                              New Unit
                            </Button>
                          </div>
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
      <Dialog
        aria-labelledby="form-dialog-title"
        open={state.open_dialog}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">Add Selling Unit</DialogTitle>
        <form onSubmit={handleUnit} autoComplete="off">
          <DialogContent>
            <DialogContentText>
              <TextField
                error={state.empty_name_error}
                variant="standard"
                name="unit_name"
                label="Unit Name"
                style={{ width: "93%", margin: "20px" }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default NewProduct;
