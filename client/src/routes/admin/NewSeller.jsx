import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "./components/Sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
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
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Autocomplete, TextField } from "@mui/material";
import AddSellerForm from "./AddSellerForm";
import FormsApi from "../../api/api";
import { useSnackbar } from "notistack";
import moment from "moment";
import EditSellerForm from "./EditSellerForm";

function NewSeller() {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    sellers: [],
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  useEffect(() => {
    (async () => {
      const res = await new FormsApi().get("/all/seller");
      if (res !== "Error") {
        if (res.status !== false) {
          setState({
            ...state,
            sellers: res.result,
          });
        }
      }
    })();
  }, []);

  const deleteUserHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Deletehandler(id);
      }
    });
  };

  const Deletehandler = async (id) => {
    let res = await new FormsApi().deleteItem(`/delete/seller/${id}`);
    if (res !== "Error") {
      if (res.status !== false) {
        enqueueSnackbar("Seller Deleted Successfully", { variant: "success" });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        enqueueSnackbar("Product Deletion Failed, Server Error....", {
          variant: "warning",
        });
      }
    } else {
      enqueueSnackbar("Product Deletion Failed, Check your internet....", {
        variant: "warning",
      });
    }
  };
  const editUserHandler = (id) => {
    const data = {
      id: id,
    };
    setFormid(data);
    handleEditOpen();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
              All Sellers
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
                    label="Search Sellers"
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
                Add Seller
              </Button>
            </Stack>
            <Box height={10} />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Email
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Phone Number
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Created
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.sellers.length === 0 ? (
                    <div>No sellers to display...</div>
                  ) : (
                    state.sellers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        return (
                          <TableRow key={i} hover role="checkbox" index={v}>
                            <TableCell align="left">{v.seller_name}</TableCell>
                            <TableCell align="left">{v.seller_email}</TableCell>
                            <TableCell align="left">{v.seller_phone}</TableCell>
                            <TableCell align="left">
                              {" "}
                              {moment(new Date(v.seller_date))
                                .startOf("day")
                                .fromNow()}
                            </TableCell>
                            <TableCell align="left">
                              <Stack spacing={2} direction="row">
                                <EditIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                  className="cursor-pointer"
                                  onClick={() => editUserHandler(v.id)}
                                />
                                <DeleteIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "darkred",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    deleteUserHandler(v.id);
                                  }}
                                />
                              </Stack>
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
              count={state.sellers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </main>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddSellerForm closeEvent={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditSellerForm closeEvent={handleEditClose} fid={formid} />
        </Box>
      </Modal>
    </>
  );
}
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

export default NewSeller;
