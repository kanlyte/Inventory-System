import React from "react";
import Header from "../../components/header/Header";
import SideBar from "./components/Sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function Sales() {
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar active="products" />
      <div className="main-content">
        <main>
          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              All Sales
            </Typography>
            <Divider />
            <Box height={10} />
            <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                sx={{ width: 300 }}
                id="combo-box-demo"
                disablePorta
                renderInput={(params) => (
                  <TextField
                    label="Search sales"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <Typography
                sx={{ flexGrow: 1 }}
                variant="h6"
                component="div"
              ></Typography>
              <Button
                endIcon={<AddCircleIcon />}
                variant="contained"
                color="primary"
              >
                Add Seller
              </Button>
            </Stack>
            <Box height={10} />
          </Paper>
        </main>
      </div>
    </>
  );
}

export default Sales;
