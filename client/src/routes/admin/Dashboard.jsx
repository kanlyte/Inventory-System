import React, { useEffect, useState } from "react";
import "../Design/Home.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
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
