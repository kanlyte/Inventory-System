import React from "react";
import Header from "../../components/header/Header";
import SideBar from "../../components/SideBar";

function Products() {
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar />
      <div className="main-content">
        <main></main>
      </div>
    </>
  );
}

export default Products;
