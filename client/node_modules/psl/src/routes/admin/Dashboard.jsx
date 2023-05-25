import React, { useEffect, useState } from "react";
import Header from "psl/src/components/header/Header";
import "psl/src/routes/Design/Home.css";
import { Link } from "react-router-dom";
import Footer from "psl/src/components/footer/Footer";
import styled from "styled-components";
import Nav from "psl/src/components/nav";
import SideBar from "psl/src/components/SideBar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <SideBar />
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
