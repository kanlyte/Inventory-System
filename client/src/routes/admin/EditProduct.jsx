import React, { Component, Fragment, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import SideBar from "./components/Sidebar";
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
import FormsApi from "../../api/api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open_dialog: false,
      message: "Please Wait...",
      messageState: "",
      suppliers: [],
      units: [],
      new_unit_error: false,
      empty_name_error: false,
      selling_units: [],
      product: {},
      re_order: 0,
    };
    this.units();
  }
  handleClose = () => {
    this.setState({ ...this.state, open_dialog: false });
  };

  handleUnit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let content = {};
    fd.forEach((value, key) => {
      content[key] = value;
    });
    if (!content["unit_name"]) {
      this.setState({
        ...this.state,
        open: true,
        message: "This field is missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    }
    let api = new FormsApi();
    let res = await api.post("/user/admin/new_unit", content);
    if (res.status === true) {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "error",
      });
    }
  };
  async units() {
    const res = (await new FormsApi().get("/all/units")) || [];
    if (res) {
      this.setState(
        {
          ...this.state,
          selling_units: res === "Error" ? [] : res.result,
        },
        () => {
          this.product();
        }
      );
    }
  }

  //if json string
  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  //if json string

  async product() {
    let id = new URLSearchParams(window.location.search).get("product-id");
    const product = await new FormsApi().get(`/one/product/${id}`);
    if (product) {
      if (product !== "Error") {
        const res = product;
        // console.log(res);
        this.setState({ ...this.state, product: res.result });
        // console.log(this.state.product);
        const units = this.IsJsonString(res.result.product_units)
          ? JSON.parse(res.result.product_units)
          : [];
        const re_order =
          units.length === 0
            ? 0
            : (parseInt(res.result.product_re_order) || 0) /
                parseInt(units[units.length - 1].qty) || 0;
        let units_arr = [];
        for (let i = 0; i < units.length; i++) {
          let unit = units[i];
          if (unit.qty && unit.selling_unit) {
            if (i === 0) {
              units_arr.push(unit);
            } else {
              unit.qty =
                parseInt(units[i].qty) / parseInt(units_arr[i - 1].qty);
              units_arr.push(unit);
            }
          }
        }
        this.setState(
          {
            ...this.state,
            units: units_arr,
            re_order,
            product: res.result,
          },
          () => {
            console.log(this.state);
          }
        );
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    if (this.state.units.length === 0) {
      this.setState({
        ...this.state,
        open: true,
        message: "No Selling Units Registered",
        messageState: "error",
      });
      return;
    }
    if (!_fcontent["pdt_name"] || !_fcontent["re_order_qty"]) {
      this.setState({
        ...this.state,
        open: true,
        message: "These fields are missing",
        messageState: "error",
        empty_name_error: true,
      });
      return;
    }
    let id = new URLSearchParams(window.location.search).get("product-id");
    _fcontent["units"] = this.state.units;
    let api = new FormsApi();
    let res = await api.put(`/update/product/${id}`, _fcontent);
    if (res.status === true) {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "error",
      });
    }
  };

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      open: false,
      message: "Please Wait...",
      messageState: "info",
      empty_name_error: false,
    });
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.open}
          autoHideDuration={7000}
          onClose={this.closePopUp}
          action={
            <Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closePopUp}
              >
                <i className="las la-times"></i>
              </IconButton>
            </Fragment>
          }
        >
          <div>
            <Alert onClose={this.closePopUp} severity={this.state.messageState}>
              {this.state.message}
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
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div
                    className=""
                    style={{
                      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      padding: "1rem",
                    }}
                  >
                    <div className="form-header-ctr">
                      <div className="">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginLeft: 10 }}
                        >
                          Finish &amp; Save
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
                              error={this.state.empty_name_error}
                              name="pdt_name"
                              variant="outlined"
                              label="Product Name"
                              style={{ width: "75%", margin: "20px" }}
                              value={
                                this.state.product.pdt_name
                                  ? this.state.product.pdt_name
                                  : ""
                              }
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    pdt_name: e.target.value,
                                  },
                                });
                              }}
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
                                error={this.state.empty_name_error}
                                value={this.state.re_order}
                                type="number"
                                name="re_order_qty"
                                variant="outlined"
                                label="Re-order Qty"
                                style={{ flex: 1, marginRight: "5px" }}
                                onChange={(e) => {
                                  this.setState({
                                    ...this.state,
                                    re_order: e.target.value,
                                  });
                                }}
                              />
                              <TextField
                                value={
                                  this.state.units.length > 0 &&
                                  this.state.units[this.state.units.length - 1]
                                    .selling_unit
                                    ? this.state.units[
                                        this.state.units.length - 1
                                      ].selling_unit
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
                              value={
                                this.state.product.pdt_desc
                                  ? this.state.product.pdt_desc
                                  : ""
                              }
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    pdt_desc: e.target.value,
                                  },
                                });
                              }}
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
                                  {this.state.units.length === 0 ? (
                                    <tr>
                                      <td>No Selected Units</td>
                                    </tr>
                                  ) : (
                                    this.state.units.map((v, i) => {
                                      return (
                                        <tr key={i}>
                                          <td>
                                            <FormControl
                                              error={this.state.new_unit_error}
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
                                                value={
                                                  this.state.units[i]
                                                    .selling_unit
                                                }
                                                label={
                                                  i === 0
                                                    ? `Smallest Unit`
                                                    : `Unit ${i + 1}`
                                                }
                                                id="select_selling_unit"
                                                defaultValue=""
                                                onChange={(e) => {
                                                  let units_change =
                                                    this.state.units;
                                                  units_change[i].selling_unit =
                                                    e.target.value;
                                                  this.setState({
                                                    ...this.state,
                                                    units: units_change,
                                                  });
                                                }}
                                              >
                                                {this.state.selling_units
                                                  .length === 0 ? (
                                                  <MenuItem value="no_unit">
                                                    No Unit Added
                                                  </MenuItem>
                                                ) : (
                                                  this.state.selling_units.map(
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
                                              value={
                                                i === 0
                                                  ? "1"
                                                  : this.state.units[i].qty
                                              }
                                              label={
                                                i === 0
                                                  ? `Quantity`
                                                  : `Quantity In Unit ${i}`
                                              }
                                              onChange={(e) => {
                                                let units_change =
                                                  this.state.units;
                                                units_change[i].qty =
                                                  e.target.value;
                                                this.setState({
                                                  ...this.state,
                                                  units: units_change,
                                                });
                                              }}
                                              style={{ width: "95%" }}
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              error={this.state.new_unit_error}
                                              variant="standard"
                                              label="Retail"
                                              value={this.state.units[i].retail}
                                              onChange={(e) => {
                                                let units_change =
                                                  this.state.units;
                                                units_change[i].retail =
                                                  e.target.value;
                                                this.setState({
                                                  ...this.state,
                                                  units: units_change,
                                                });
                                              }}
                                              style={{ width: "95%" }}
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              error={this.state.new_unit_error}
                                              variant="standard"
                                              label="Wholesale"
                                              value={
                                                this.state.units[i].wholesale
                                              }
                                              onChange={(e) => {
                                                let units_change =
                                                  this.state.units;
                                                units_change[i].wholesale =
                                                  e.target.value;
                                                this.setState({
                                                  ...this.state,
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
                                                let units = this.state.units;
                                                units.splice(i, 1);
                                                this.setState({
                                                  ...this.state,
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
                                  if (this.state.units.length === 0) {
                                    this.setState({
                                      ...this.state,
                                      units: [...this.state.units, { qty: 1 }],
                                    });
                                  } else if (this.state.units.length === 1) {
                                    let units = this.state.units;
                                    if (
                                      !units[0].selling_unit ||
                                      !units[0].qty ||
                                      !units[0].retail ||
                                      !units[0].wholesale
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        new_unit_error: true,
                                        open: true,
                                        message: "Some Fields are missing",
                                        messageState: "error",
                                      });
                                    } else {
                                      this.setState({
                                        ...this.state,
                                        units: [...this.state.units, {}],
                                        new_unit_error: false,
                                      });
                                    }
                                  } else {
                                    let units = this.state.units;
                                    if (
                                      units[units.length - 1].selling_unit &&
                                      units[units.length - 1].qty &&
                                      units[units.length - 1].retail &&
                                      units[units.length - 1].wholesale
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        units: [...this.state.units, {}],
                                        new_unit_error: false,
                                      });
                                    } else {
                                      this.setState({
                                        ...this.state,
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
          open={this.state.open_dialog}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Add Selling Unit</DialogTitle>
          <form onSubmit={this.handleUnit} autoComplete="off">
            <DialogContent>
              <DialogContentText>
                <TextField
                  error={this.state.empty_name_error}
                  variant="standard"
                  name="unit_name"
                  label="Unit Name"
                  style={{ width: "93%", margin: "20px" }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
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
}

export default EditProduct;
