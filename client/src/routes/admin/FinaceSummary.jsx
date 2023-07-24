import React, { useEffect, useState } from "react";
import "../Design/Home.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const FinanceSummary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    AnchorEl: null,
    AnchorElDrugs: null,
    open: false,
    open_purchase: false,
    open_sale: false,
    message: "Please Wait...",
    messageState: "",
    income: 0,
    today_income: 0,
    expenses: 0,
    today_expense: 0,
    sales: [],
    purchases: [],
    print_sale: false,
  });

  const handlePurchaseClose = () => {
    setState({ ...state, open_purchase: false });
  };

  //Getting all the expenses / purchase income------------
  useEffect(() => {
    (async () => {
      const res = (await new FormsApi().get("/purchases")) || [];
      let total = 0;
      let today_expense = 0;
      let today_purchases = [];
      res === "Error"
        ? setState({ ...state, expenses: 0, purchases: [] })
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
      setState({
        ...state,
        today_expense: today_expense,
        expenses: total,
        purchases: today_purchases,
      });
    })();
  }, []);
  //handler for getting all the sales-------------------
  useEffect(() => {
    (async () => {
      const allsales = (await new FormsApi().get("/sales")) || [];
      let total = 0;
      let today_income = 0;
      let today_sales = [];
      allsales === "Error"
        ? setState({ ...state, income: 0, sales: [] })
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
      setState({
        ...state,
        today_income: today_income,
        income: total,
        sales: today_sales,
      });
    })();
  }, []);
  // console.log(state.sales);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenActionsDrugs = (e) => {
    setState({ ...state, AnchorElDrugs: e.currentTarget });
  };
  const handleCloseActionsDrugs = () => {
    setState({ ...state, AnchorElDrugs: null });
  };

  const getNameSpaces = (n, i) => {
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
                <h4>UGX 340000</h4>
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
                <h4>UGX 67000</h4>
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
                <h4>UGX 40000</h4>
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
                <h4>UGX 29000</h4>
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
                  onClick={handleOpenActionsDrugs}
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
                  anchorEl={state.AnchorElDrugs}
                  keepMounted
                  disableScrollLock={true}
                  onClose={handleCloseActionsDrugs}
                  open={Boolean(state.AnchorElDrugs)}
                >
                  <Link to="/new-product">
                    <MenuItem onClick={handleCloseActionsDrugs}>
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
                    {state.sales.length === 0 ? (
                      <div>No Sales Made Today...</div>
                    ) : (
                      state.sales.map((v, i) => {
                        let products = "";
                        let sold = JSON.parse(v.products_sold);
                        sold.forEach((p) => {
                          if (sold.length > 1) {
                            if (sold.indexOf(p) === sold.length - 1) {
                              products =
                                products +
                                `${getNameSpaces(p.product_name, 10)}`;
                            } else {
                              products =
                                products +
                                `${getNameSpaces(p.product_name, 10)}` +
                                ",";
                            }
                          } else {
                            products =
                              products + `${getNameSpaces(p.product_name, 10)}`;
                          }
                        });
                        return (
                          <TableRow key={i} hover role="checkbox" index={v}>
                            <TableCell align="left">{products}</TableCell>
                            <TableCell align="left">{v.sales_amount}</TableCell>
                            <TableCell align="left">{v.amount_paid}</TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  setState({
                                    ...state,
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
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <div className="projects">
              <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
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
                    endIcon={<AddCircleIcon />}
                    onClick={handleOpen}
                  >
                    Menu
                  </Button>
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
                      {state.purchases.length === 0 ? (
                        <div>No Purchase Made Today...</div>
                      ) : (
                        state.purchases
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((v, i) => {
                            let products = "";
                            let sold = JSON.parse(v.products_purchased);
                            sold.forEach((p) => {
                              if (sold.length > 1) {
                                if (sold.indexOf(p) === sold.length - 1) {
                                  products =
                                    products +
                                    `${getNameSpaces(p.product_name, 10)}`;
                                } else {
                                  products =
                                    products +
                                    `${getNameSpaces(p.product_name, 10)}` +
                                    ",";
                                }
                              } else {
                                products =
                                  products +
                                  `${getNameSpaces(p.product_name, 10)}`;
                              }
                            });
                            return (
                              <TableRow key={i} hover role="checkbox" index={v}>
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
                                      setState({
                                        ...state,
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
                  count={state.purchases.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </main>
      </div>
      {state.dialog_purchase_data ? (
        <Dialog
          open={state.open_purchase}
          onClose={handlePurchaseClose}
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
                    state.dialog_purchase_data.products_purchased
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
                      {`Total Amount: UGX ${state.dialog_purchase_data.purchase_t_amount}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {`Discount: UGX ${state.dialog_purchase_data.purchase_discount}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {`Amount Paid: UGX ${state.dialog_purchase_data.purchase_amount}`}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "green" }}
                    >{`Made By: ${state.dialog_purchase_data.purchase_made_by}`}</td>
                  </tr>
                </table>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePurchaseClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default FinanceSummary;
