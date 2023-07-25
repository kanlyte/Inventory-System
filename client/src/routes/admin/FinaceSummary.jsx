import React, { Component } from "react";
import "../Design/Home.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "./components/Sidebar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Dialog,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormsApi from "../../api/api";
import UI_Helper from "./components/format";

class FinanceSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      AnchorElDrugs: null,
      open: false,
      open_purchase: false,
      open_sale: false,
      message: "Please Wait...",
      messageState: "",
      income: 0,
      page: 0,
      rowsPerPage: 5,
      today_income: 0,
      expenses: 0,
      today_expense: 0,
      sales: [],
      purchases: [],
      print_sale: false,
    };
    this.income();
    this.expenses();
  }
  //close sale dialog-------------
  handleSaleClose = () => {
    this.setState({ ...this.state, open_sale: false });
  };

  handlePurchaseClose = () => {
    this.setState({ ...this.state, open_purchase: false });
  };

  //Getting all the expenses / purchase income------------
  async expenses() {
    const res = (await new FormsApi().get("/purchases")) || [];
    let total = 0;
    let today_expense = 0;
    let today_purchases = [];
    res === "Error"
      ? this.setState({ ...this.state, expenses: 0, purchases: [] })
      : res.result.forEach((e) => {
          if (
            new Date(parseInt(e.purchase_date)).getDate() ===
            new Date(Date.now()).getDate()
          ) {
            today_expense += e.purchase_amount;
            today_purchases.push(e);
          }
          if (
            new Date(parseInt(e.purchase_date)).getMonth() ===
            new Date(Date.now()).getMonth()
          ) {
            total += e.purchase_amount;
          }
        });
    this.setState({
      ...this.state,
      today_expense: today_expense,
      expenses: total,
      purchases: today_purchases,
    });
  }
  //handler for getting all the sales-------------------
  async income() {
    const allsales = (await new FormsApi().get("/sales")) || [];
    let total = 0;
    let today_income = 0;
    let today_sales = [];
    allsales === "Error"
      ? this.setState({ ...this.state, income: 0, sales: [] })
      : allsales.result.forEach((e) => {
          if (
            new Date(parseInt(e.sales_date)).getDate() ===
            new Date(Date.now()).getDate()
          ) {
            today_income += e.amount_paid;
            today_sales.push(e);
          }
          if (
            new Date(parseInt(e.sales_date)).getMonth() ===
            new Date(Date.now()).getMonth()
          ) {
            total += e.amount_paid;
          }
        });
    this.setState({
      ...this.state,
      today_income: today_income,
      income: total,
      sales: today_sales,
    });
  }
  // console.log(state.sales);
  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ ...this.state, page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ ...this.state, rowsPerPage: event.currentTarget, page: 0 });
  };
  handleOpenActionsDrugs = (e) => {
    this.setState({ ...this.state, AnchorElDrugs: e.currentTarget });
  };
  handleCloseActionsDrugs = () => {
    this.setState({ ...this.state, AnchorElDrugs: null });
  };

  getNameSpaces = (n, i) => {
    let name = n.split(" ")[0];
    let name_formatted;
    if (name.length === i) {
      name_formatted = name + " ";
    }
    if (name.length > i) {
      name_formatted = name.substring(0, i) + " ";
    }
    if (name.length < i) {
      name_formatted = name;
      let spaces = i - name.length;
      for (let i = 0; i < spaces; i++) {
        name_formatted = name_formatted + " ";
      }
    }
    return name_formatted;
  };
  render() {
    return (
      <>
        <Header />
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Sidebar />
        <div className="main-content">
          <main>
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h4>UGX {UI_Helper.format(this.state.today_income)}</h4>
                  <span>
                    Sales <br />
                    <span style={{ fontSize: "13px" }}>Today</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h4>UGX {UI_Helper.format(this.state.today_expense)}</h4>
                  <span>
                    Purchases <br />
                    <span style={{ fontSize: "13px" }}>Today</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h4>UGX {UI_Helper.format(this.state.expenses)}</h4>
                  <span>
                    Purchases <br />
                    <span style={{ fontSize: "13px" }}>This Month</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h4>UGX {UI_Helper.format(this.state.income)}</h4>
                  <span>
                    Sales <br />
                    <span style={{ fontSize: "13px" }}>This Month</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
            </div>

            <div className="recent-grid-ctr">
              <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                <div
                  style={{
                    padding: "22px",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Today's Sales
                </div>
                <Divider />
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  ></Typography>
                  <Button
                    variant="contained"
                    aria-haspopup="true"
                    onClick={this.handleOpenActionsDrugs}
                    aria-controls="drug-actions"
                    size="small"
                  >
                    Menu
                    <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                      <span className="las la-angle-down"></span>
                    </span>
                  </Button>
                  <Menu
                    id="product-actions"
                    anchorEl={this.state.AnchorElDrugs}
                    keepMounted
                    disableScrollLock={true}
                    onClose={this.handleCloseActionsDrugs}
                    open={Boolean(this.state.AnchorElDrugs)}
                  >
                    <Link to="/all-sales">
                      <MenuItem onClick={this.handleCloseActionsDrugs}>
                        Monthly
                      </MenuItem>
                    </Link>
                  </Menu>
                </Stack>
                <Box height={10} />
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px", color: "blue" }}
                        >
                          Products
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px", color: "blue" }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px", color: "blue" }}
                        >
                          Paid
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.sales.length === 0 ? (
                        <div>No Sales Made Today...</div>
                      ) : (
                        this.state.sales.map((v, i) => {
                          let products = "";
                          let sold = JSON.parse(v.products_sold);
                          sold.forEach((p) => {
                            if (sold.length > 1) {
                              if (sold.indexOf(p) === sold.length - 1) {
                                products =
                                  products +
                                  `${this.getNameSpaces(p.product_name, 10)}`;
                              } else {
                                products =
                                  products +
                                  `${this.getNameSpaces(p.product_name, 10)}` +
                                  ",";
                              }
                            } else {
                              products =
                                products +
                                `${this.getNameSpaces(p.product_name, 10)}`;
                            }
                          });
                          return (
                            <TableRow key={i} hover role="checkbox" index={v}>
                              <TableCell align="left">{products}</TableCell>
                              <TableCell align="left">
                                {v.sales_amount}
                              </TableCell>
                              <TableCell align="left">
                                {v.amount_paid}
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    this.setState({
                                      ...this.state,
                                      open_sale: true,
                                      dialog_data: v,
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[4, 8, 12]}
                  component="div"
                  // count={rows.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
              </Paper>
              <div className="projects">
                <Paper
                  sx={{ width: "98%", overflow: "hidden", padding: "12px" }}
                >
                  <div
                    style={{
                      padding: "22px",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    Today's Purchases
                  </div>
                  <Divider />
                  <Box height={10} />
                  <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Button
                      variant="contained"
                      aria-haspopup="true"
                      onClick={this.handleOpenActionsDrugs}
                      aria-controls="drug-actions"
                      size="small"
                    >
                      Menu
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="product-actions"
                      anchorEl={this.state.AnchorElDrugs}
                      keepMounted
                      disableScrollLock={true}
                      onClose={this.handleCloseActionsDrugs}
                      open={Boolean(this.state.AnchorElDrugs)}
                    >
                      <Link to="/all-purchases">
                        <MenuItem onClick={this.handleCloseActionsDrugs}>
                          Monthly
                        </MenuItem>
                      </Link>
                    </Menu>
                  </Stack>
                  <Box height={10} />
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            style={{ minWidth: "100px", color: "blue" }}
                          >
                            Products
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: "100px", color: "blue" }}
                          >
                            Total
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: "100px", color: "blue" }}
                          >
                            Paid
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: "100px" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.purchases.length === 0 ? (
                          <div>No Purchase Made Today...</div>
                        ) : (
                          this.state.purchases
                            .slice(
                              this.state.page * this.state.rowsPerPage,
                              this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                            )
                            .map((v, i) => {
                              let products = "";
                              let sold = JSON.parse(v.products_purchased);
                              sold.forEach((p) => {
                                if (sold.length > 1) {
                                  if (sold.indexOf(p) === sold.length - 1) {
                                    products =
                                      products +
                                      `${this.getNameSpaces(
                                        p.product_name,
                                        10
                                      )}`;
                                  } else {
                                    products =
                                      products +
                                      `${this.getNameSpaces(
                                        p.product_name,
                                        10
                                      )}` +
                                      ",";
                                  }
                                } else {
                                  products =
                                    products +
                                    `${this.getNameSpaces(p.product_name, 10)}`;
                                }
                              });
                              return (
                                <TableRow
                                  key={i}
                                  hover
                                  role="checkbox"
                                  index={v}
                                >
                                  <TableCell align="left">{products}</TableCell>
                                  <TableCell align="left">
                                    {v.purchase_t_amount}
                                  </TableCell>
                                  <TableCell align="left">
                                    {v.purchase_amount}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        this.setState({
                                          ...this.state,
                                          open_purchase: true,
                                          dialog_purchase_data: v,
                                        });
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[4, 8, 12]}
                    component="div"
                    count={this.state.purchases.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </main>
        </div>
        {this.state.dialog_data ? (
          <Dialog
            open={this.state.open_sale}
            onClose={this.handleSaleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sale Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Qty</td>
                      <td>Selling Unit</td>
                      <td>Amount</td>
                      <td>Sale Type</td>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(this.state.dialog_data.products_sold).map(
                      (v, i) => {
                        return (
                          <tr key={i}>
                            <td className="name_cell">{v.product_name}</td>
                            <td>{v.qty}</td>
                            <td>{v.selling_unit}</td>
                            <td>{v.product_price}</td>
                            <td>{v.sale_type}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
                <hr />
                <div className="">
                  <table>
                    <tr>
                      <td>
                        {`Total Amount: UGX ${this.state.dialog_data.sales_amount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Discount: UGX  ${this.state.dialog_data.sales_discount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Amount Paid: UGX ${this.state.dialog_data.amount_paid}`}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "green" }}>
                        {`Made By: ${this.state.dialog_data.sale_made_by}`}
                      </td>
                    </tr>
                  </table>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSaleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <></>
        )}

        {this.state.dialog_purchase_data ? (
          <Dialog
            open={this.state.open_purchase}
            onClose={this.handlePurchaseClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Purchase Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Qty</td>
                      <td>Selling Unit</td>
                      <td>Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(
                      this.state.dialog_purchase_data.products_purchased
                    ).map((v, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <td className="name_cell">{v.product_name}</td>
                            <td>{v.qty}</td>
                            <td>{v.selling_unit}</td>
                            <td>{v.cost_price}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <hr />
                <div className="">
                  <table>
                    <tr>
                      <td>
                        {`Total Amount: UGX ${this.state.dialog_purchase_data.purchase_t_amount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Discount: UGX ${this.state.dialog_purchase_data.purchase_discount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Amount Paid: UGX ${this.state.dialog_purchase_data.purchase_amount}`}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ color: "green" }}
                      >{`Made By: ${this.state.dialog_purchase_data.purchase_made_by}`}</td>
                    </tr>
                  </table>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handlePurchaseClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default FinanceSummary;
