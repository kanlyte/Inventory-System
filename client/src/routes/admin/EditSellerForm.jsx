import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton, TextField } from "@mui/material";
import FormsApi from "../../api/api";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

function EditSellerForm({ closeEvent }) {
  const { enqueueSnackbar } = useSnackbar();
  const AddSellerHandler = async (e) => {
    e.preventDefault();
    let fd = new FormData(e.target);
    let form_contents = {};
    fd.forEach((value, name) => {
      form_contents[name] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/new/seller", form_contents);
    if (res.data === "seller exist") {
      closeEvent();
      enqueueSnackbar("Seller already exists", { variant: "warning" });
    } else if (res.status === false) {
      enqueueSnackbar("Some other Error occured", { variant: "warning" });
    } else {
      closeEvent();
      enqueueSnackbar("Seller added successfully", { variant: "success" });
      window.location.reload();
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Seller
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <form onSubmit={AddSellerHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Seller Name"
              required
              name="seller_name"
              size="small"
              sx={{ minWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Seller Email"
              type="email"
              required
              name="seller_email"
              size="small"
              sx={{ minWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              label="Seller Phone"
              name="seller_phone"
              size="small"
              sx={{ minWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Seller Password"
              name="seller_password"
              required
              type="password"
              size="small"
              sx={{ minWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ m: 4 }} />
    </>
  );
}

export default EditSellerForm;
