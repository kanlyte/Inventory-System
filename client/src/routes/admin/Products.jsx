import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Snackbar from "@mui/material/Snackbar";
import "../Design/products.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert as MuiAlert,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FormsApi from "../../api/api";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState({
    search_pattern: "",
  });
  const [state, setState] = useState({
    AnchorEl: null,
    AnchorElDrugs: null,
    products: [],
    loading: true,
    open: false,
    open_del: false,
    message: "Please Wait...",
    messageState: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //handler for getting all products
  useEffect(() => {
    (async () => {
      const res = (await new FormsApi().get("/all/products")) || [];
      if (res) {
        setState({
          ...state,
          loading: false,
          products: res === "Error" ? [] : res.result,
        });
      }
    })();
  }, []);
  // console.log(state.products);
  //Handler for deleting a single product from the database----
  const handleDelete = async () => {
    setState({ ...state, open_del: true, messageState: "info" });
    const res = await new FormsApi().deleteItem(
      `/delete/product/${state.product_id}`
    );
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
      <Sidebar active="products" />
      <div className="main-content">
        <main>
          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              All Products
            </Typography>
            <Divider />
            <Box height={10} />
            <Stack direction="row" spacing={2} className="my-2 mb-2">
              <TextField
                className="text_field_all_products"
                label="Search Product Name"
                name="pdt_name"
                type="search"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setSearch({
                    ...search,
                    search_pattern: e.target.value,
                  });
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
            </Stack>
            <Box height={10} />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Product Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Product Description
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Edit Action
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Delete Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.products.length === 0 ? (
                    <div>No Products to display...</div>
                  ) : search.search_pattern ? (
                    state.products
                      .filter((el) =>
                        el.pdt_name
                          .toLowerCase()
                          .includes(search.search_pattern.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        return (
                          <TableRow key={i} hover role="checkbox" index={v}>
                            <TableCell align="left">{v.pdt_name}</TableCell>
                            <TableCell align="left">{v.pdt_desc}</TableCell>
                            <TableCell align="left">
                              {v.product_re_order}
                            </TableCell>
                            <TableCell>
                              <Link to={`/edit-product?product-id=${v.id}`}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link>
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  style={{ color: "red" }}
                                  size="small"
                                  onClick={() => {
                                    setState({
                                      ...state,
                                      open: true,
                                      product_id: v.id,
                                    });
                                  }}
                                >
                                  Delete
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    state.products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        return (
                          <TableRow key={i} hover role="checkbox" index={v}>
                            <TableCell align="left">{v.pdt_name}</TableCell>
                            <TableCell align="left">{v.pdt_desc}</TableCell>
                            <TableCell align="left">
                              {v.product_re_order}
                            </TableCell>
                            <TableCell>
                              <Link to={`/edit-product?product-id=${v.id}`}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link>
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  style={{ color: "red" }}
                                  size="small"
                                  onClick={() => {
                                    setState({
                                      ...state,
                                      open: true,
                                      product_id: v.id,
                                    });
                                  }}
                                >
                                  Delete
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={state.products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </main>
      </div>

      {state.product_id ? (
        <Dialog
          open={state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Are You Sure Your Want to Delete Product?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will delete all Batches. Press OK and Continue. Remember this
              process is Irreversible
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}

export default Products;
