import React, { useState } from "react";
import Header from "../../components/header/Header";
import SideBar from "../../components/SideBar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Autocomplete from "@mui/material/Autocomplete";
import "../Design/products.css";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddProductForm from "./AddProductForm";
function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar active="products" />
      <div className="main-content">
        <main>
          <div className="recent-grid-left">
            <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ padding: "20px" }}
              >
                Products in stock
              </Typography>
              <Divider />
              <Box height={10} />
              <Stack direction="row" spacing={2} className="my-2 mb-2">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  // options={rows}
                  sx={{ width: 300 }}
                  // onChange={(e, v) => filterData(v)}
                  // getOptionLabel={(rows) => rows.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Products"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
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
                  Add Product
                </Button>
              </Stack>
              <Box height={10} />
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                // count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <div className="projects">
              <form className="card" autoComplete="off">
                <div className="card-header card-header-payments">
                  <h3 className="class_payment_header">New Purchase</h3>
                  <div className="">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                        <i className="las la-plus-circle"></i>
                      </span>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="inputCtr">
                      <h4>Product Details</h4>
                      <div className="inputs_ctr">
                        <div className="inpts_on_left">
                          <Autocomplete
                            id="combo-box-demo"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Search Product"
                                name="product_name"
                                variant="outlined"
                              />
                            )}
                          />
                          <TextField
                            type="date"
                            name="expiry_date"
                            helperText="Expiry Date"
                            variant="outlined"
                            style={{ width: "85%", margin: "20px" }}
                          />
                          <FormControl
                            variant="outlined"
                            label="supplier"
                            style={{ width: "85%", margin: "20px" }}
                          >
                            <InputLabel id="supplier">Supplier</InputLabel>
                            <Select
                              inputProps={{ name: "supplier" }}
                              id="select_supplier"
                              defaultValue=""
                              label="supplier"
                            >
                              <MenuItem>Kanlyte LTD</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="inpts_on_right">
                          <FormControl
                            label="selling_unit"
                            variant="outlined"
                            style={{ width: "85%", margin: "20px" }}
                          >
                            <InputLabel id="selling_unit">
                              Purchasing unit
                            </InputLabel>
                            <Select
                              inputProps={{ name: "supplier" }}
                              id="selling_unit"
                              defaultValue=""
                              label="Purchasing Unit"
                            >
                              <MenuItem>Boxes</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            name="qty"
                            type="number"
                            variant="outlined"
                            label="Quantity"
                            color="primary"
                            style={{ width: "85%", margin: "20px" }}
                          />
                          <TextField
                            type="number"
                            variant="outlined"
                            name="cost_price"
                            defaultValue={0}
                            label="Unit Cost Price(Ushs)"
                            color="primary"
                            style={{ width: "85%", margin: "20px" }}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProductForm closeEvent={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

export default Products;
