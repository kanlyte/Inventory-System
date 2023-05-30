import React from "react";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/SideBar";
import List from "./List";
import { Box } from "@mui/material";

function Settings() {
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar active="products" />
      <div className="main-content">
        <main>
          <div className="tab_ctr">
            <List />
          </div>
        </main>
      </div>
    </>
  );
}

export default Settings;
