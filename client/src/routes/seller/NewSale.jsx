import React from "react";
import Header from "../../components/header/Header";
import SideBar from "../../components/SideBar";
import "../Design/main.css";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function NewSale() {
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar active="products" />
      <div className="main-content">
        <main>
          <div className="recent-grid">
            <div>
              <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ padding: "20px" }}
                >
                  Sale List
                </Typography>
                <Divider />
                <Box height={10} />
              </Paper>
            </div>
            <div className="projects">
              <form className="card" autoComplete="off" onSubmit={""}>
                <div className="card-header ">
                  <div>
                    <FormControl
                      variant="outlined"
                      style={{ width: "85%", margin: "20px" }}
                    >
                      <InputLabel id="sale_type">Sale</InputLabel>
                      <Select label="Sale" id="select_sale_type">
                        <MenuItem value="retail">Retail</MenuItem>
                        <MenuItem value="wholesale">Wholesale</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="">
                    <Button type="submit" variant="contained" color="primary">
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
                            style={{ width: "85%", margin: "20px" }}
                            renderInput={(params) => (
                              <TextField
                                label="Search Product"
                                name="product_name"
                                variant="outlined"
                              />
                            )}
                          />
                          <TextField
                            variant="outlined"
                            label="available"
                            style={{ width: "85%", margin: "20px" }}
                          />
                          <TextField
                            variant="outlined"
                            label="available"
                            style={{ width: "85%", margin: "20px" }}
                          />
                        </div>
                        <div className="inpts_on_right">
                          <TextField
                            variant="outlined"
                            label="available"
                            style={{ width: "85%", margin: "20px" }}
                          />
                          <TextField
                            variant="outlined"
                            label="available"
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
    </>
  );
}

export default NewSale;
