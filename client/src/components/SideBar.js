import React from "react";
import styled from "styled-components";
import Product from "@mui/icons-material/ProductionQuantityLimits";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";
import SideBarList from "./SideBarList";

function SideBar(props) {
  return (
    <div className="sideBar-ctr">
      <div className="sidebar">
        <div className="_h_tog">
          <HomeTab>
            <Link to="/">
              <span>Home</span>
            </Link>
          </HomeTab>
          <label htmlFor="nav-toggle" className="close-on-sm">
            <span className="las la-times"></span>
          </label>
        </div>
        <div className="li">
          <Link to="/newsale">
            <span
              className={`${
                props.active === "newsale" ? "active" : ""
              } _a_replaced`}
            >
              <SideBarList
                Icon={
                  <svg
                    class=""
                    viewBox="0 0 24 24"
                    fill="inherit"
                    focusable="false"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path>
                  </svg>
                }
                title="New Sale"
              />
            </span>
          </Link>
          <Link to="/new-purchase">
            <span
              className={`${
                props.active === "new-purchase" ? "active" : ""
              } _a_replaced`}
            >
              <SideBarList
                Icon={
                  <svg
                    class=""
                    viewBox="0 0 24 24"
                    fill="inherit"
                    focusable="false"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path>
                  </svg>
                }
                title="New Purchase"
              />
            </span>
          </Link>
          <Link to="/">
            <span
              className={`${
                props.active === "dashboard" ? "active" : ""
              } _a_replaced`}
            >
              <SideBarList Icon={<ArticleIcon />} title="Reports" />
            </span>
          </Link>
          <UnderLine />
          <SideBarList title="About Dev" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

const HomeTab = styled.div`
  width: 118px;
  height: 48px;
  background-color: white;
  border-radius: 0.25rem;
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

const UnderLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
