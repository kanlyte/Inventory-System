import React, { useEffect, useState } from "react";
import "../Design/Home.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Sidebar from "./components/Sidebar";
import {
  Autocomplete,
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

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    AnchorEl: null,
    AnchorElDrugs: null,
  });
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
                <h3>103</h3>
                <span>
                  Products <br />
                  <span style={{ fontSize: "13px" }}>
                    Expire in less than 90 days
                  </span>
                </span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>45</h3>
                <span>Sales</span>
                <br />
                <span style={{ fontSize: "13px" }}>Made This Month</span>
              </div>
              <div className="">
                <span className="las la-users"></span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>67</h3>
                <span>Sales</span>
                <br />
                <span style={{ fontSize: "13px" }}>Made Today</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>2000</h3>
                <span>Products</span>
                <br />
                <span style={{ fontSize: "13px" }}>Registered</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
          </div>

          <div className="recent-grid-ctr">
            <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ padding: "20px" }}
              >
                Products expiring in 20 days
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
                      New Product
                    </MenuItem>
                  </Link>
                  <Link to="/all-batches">
                    <MenuItem onClick={handleCloseActionsDrugs}>
                      Product batches
                    </MenuItem>
                  </Link>
                  <Link to="/allproducts">
                    <MenuItem onClick={handleCloseActionsDrugs}>
                      Products
                    </MenuItem>
                  </Link>
                </Menu>
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
                    Menu
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
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
`;
