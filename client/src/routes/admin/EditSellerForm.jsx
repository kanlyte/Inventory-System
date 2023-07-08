import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton, TextField } from "@mui/material";
import FormsApi from "../../api/api";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

function EditSellerForm({ closeEvent, fid }) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    seller: {},
  });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/one/seller/${fid.id}`);
      if (res !== "Error") {
        if (res.status !== false) {
          setState({
            ...state,
            seller: res.result || {},
          });
        }
      }
    })();
    return () => {
      setState({
        seller: {},
      });
    };
  }, []);

  const editSeller = async (e) => {
    e.preventDefault();
    let fd = new FormData(e.target);
    let form_contents = {};
    fd.forEach((value, name) => {
      form_contents[name] = value;
    });
    let res = await new FormsApi().put(
      `/update/seller/${fid.id}`,
      form_contents
    );
    if (res !== "Error") {
      if (res.status !== false) {
        closeEvent();
        Swal.fire(
          "Updated!",
          "Seller has been updated successfully.",
          "success"
        );
        window.location.reload();
      } else {
        closeEvent();
        Swal.fire(
          "Update Failed!",
          "Seller editting failed, Server Error...",
          "error"
        );
      }
    } else {
      closeEvent();
      Swal.fire(
        "Update Failed!",
        "Editting failed, check your internet...",
        "error"
      );
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
      <form onSubmit={editSeller}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Seller Name"
              required
              name="seller_name"
              value={state.seller.seller_name || " "}
              size="small"
              sx={{ minWidth: "100%" }}
              onChange={(e) => {
                setState({
                  ...state,
                  seller: {
                    ...state.seller,
                    seller_name: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Seller Email"
              type="email"
              required
              name="seller_email"
              value={state.seller.seller_email || " "}
              size="small"
              sx={{ minWidth: "100%" }}
              onChange={(e) => {
                setState({
                  ...state,
                  seller: {
                    ...state.seller,
                    seller_email: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              label="Seller Phone"
              name="seller_phone"
              value={state.seller.seller_phone || " "}
              size="small"
              sx={{ minWidth: "100%" }}
              onChange={(e) => {
                setState({
                  ...state,
                  seller: {
                    ...state.seller,
                    seller_phone: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Seller Password"
              name="seller_password"
              value={state.seller.seller_password || " "}
              required
              type="password"
              size="small"
              sx={{ minWidth: "100%" }}
              onChange={(e) => {
                setState({
                  ...state,
                  seller: {
                    ...state.seller,
                    seller_password: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button variant="contained" fullWidth type="submit">
                Update
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
