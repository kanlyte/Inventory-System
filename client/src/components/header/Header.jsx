import {
  Avatar,
  ButtonGroup,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import logo from "../../assets/logo.jpeg";

function Header() {
  const [AnchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenActions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <h2 className="--bars">
            <label htmlFor="nav-toggle">
              <span className="las la-bars --span"></span>
            </label>
          </h2>
          <Link to="/">
            <Logo>
              <img src={logo} alt="" />
              <span>Lyte Inventory</span>
            </Logo>
          </Link>
          <InputContainer>
            <SearchContainer>
              <ButtonGroup>
                <SearchIcon />
              </ButtonGroup>
              <input type="text" placeholder="Search in All" />
            </SearchContainer>
          </InputContainer>

          <RightContainer>
            <RightSection>
              <div className="" style={{ fontSize: "42px", marginRight: 20 }}>
                <i className="las la-bell"></i>
              </div>
              <Avatar
                src={""}
                aria-haspopup="true"
                onClick={handleOpenActions}
              />
            </RightSection>
          </RightContainer>
        </Wrapper>
      </Container>
      <Menu
        anchorEl={AnchorEl}
        id="account-menu"
        open={Boolean(AnchorEl)}
        onClose={handleCloseActions}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #ffffff;
  padding: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    font-family: "Product Sans", Arial, sans-serif;
    color: #5f6368;
    font-size: 22px;
    padding-left: 8px;
  }
`;

const InputContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 64%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.09);
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 /0.05);

  svg {
    margin-left: 10px;
    color: #5f6368;
  }

  input {
    font-size: 16px;
    width: 90%;
    height: 80%;
    font-family: Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    margin: 0 auto;
    background-color: transparent;
    :focus {
      outline: none;
    }

    border: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #5f6368;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 200ms ease-out;
    :hover {
      background-color: rgba(0, 0, 0, 0.09);
    }
  }

  .app {
    margin-right: 15px;
  }
`;

const LeftSection = styled(RightSection)`
  margin-right: 40px;

  svg {
    margin: 0 10px;
  }
`;
