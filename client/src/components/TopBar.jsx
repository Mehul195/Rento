import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchedValueAtom, userState } from "../store/atoms/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../assets/add.png";


const Appbar = () => {
  const [userdata, setUserdata] = useState({});
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const isUser = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleRentoClick = () => {
    if (isUser) {
      navigate('/landing');
    } else {
      toast.error("Please log in");
    }
  };

  const handleLogout = () => {
    // Clear token from localStorage (or sessionStorage depending on your implementation)
    localStorage.removeItem('token');
    // Redirect to home page or login page
    navigate('/');
    // Optionally, you can notify the user that they have been logged out
    toast.success("Logged out successfully");
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#181b38" }}>
        <Toolbar>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6" component="div" sx={{ flexGrow: 1 }}
            onClick={handleRentoClick}
          >
            Rento
          </Typography>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Button className="Plus-sign"
                onClick={() => {
                  navigate('/createproperty');
                }}
              >
                Create New Property
                <img src="./../assets/add.png" alt="" />
              </Button>
            </div>

            {isUser ? (
              <>
                <Button color="inherit" sx={{ ml: 2 }}
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Profile
                </Button>

                <Button color="inherit" sx={{ ml: 2 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" sx={{ ml: 2 }} onClick={handleLoginClick}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  sx={{ ml: 2 }}
                  onClick={handleSignupClick}
                >
                  Signup
                </Button>
              </>
            )}

            {/* <IconButton color="inherit"
            onClick={() => {
              navigate('/profile');
            }}
            >
              <AccountCircleIcon />
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </>
  );
};

export default Appbar;
