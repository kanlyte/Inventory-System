import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Nav = (props) => {
  return (
    <>
      <div className="sideBar-ctr">
        <div className="sidebar">
          <label htmlFor="nav-toggle" className="close-on-sm">
            <span className="las la-times"></span>
          </label>
          <div className="sidebar-brand">
            <h2>
              <span className="lab la-accusoft"></span>
              <span>Rental</span>
            </h2>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <Link to="/">
                  <span
                    className={`${
                      props.active === "dashboard" ? "active" : ""
                    } _a_replaced`}
                  >
                    <HomeTab>
                      <span>Home</span>
                    </HomeTab>
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/rooms">
                  <span
                    className={`${
                      props.active === "rooms" ? "active" : ""
                    } _a_replaced`}
                  >
                    <span className="las la-bed"></span>
                    <span>Rooms</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/tenants">
                  <span
                    className={`${
                      props.active === "tenants" ? "active" : ""
                    } _a_replaced`}
                  >
                    <span className="las la-users"></span>
                    <span>Tenants</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/payments">
                  <span
                    className={`${
                      props.active === "payments" ? "active" : ""
                    } _a_replaced`}
                  >
                    <span className="las la-dollar-sign"></span>
                    <span>Payments</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/expenses">
                  <span
                    className={`${
                      props.active === "expenses" ? "active" : ""
                    } _a_replaced`}
                  >
                    <span className="las la-money-bill"></span>
                    <span>Expenses</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
const HomeTab = styled.div`
  width: 118px;
  height: 48px;
  background-color: white;
  border-radius: 24px;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 01);
  transition: all 200ms ease-out;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &::before {
      content: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E");
      height: 36px;
      padding-right: 10px;
    }
  }
`;
