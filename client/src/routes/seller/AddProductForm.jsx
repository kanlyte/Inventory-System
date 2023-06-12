import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";

function AddProductForm({ closeEvent }) {
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Product
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Product Name"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Product brand"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Cost Price"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Selling Price"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Purchase date"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Mfg Date"
            size="small"
            style={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Selling Price"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Mfg Date"
            size="small"
            style={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Mfg Date"
            size="small"
            style={{ minWidth: "100%" }}
          />
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}

export default AddProductForm;
