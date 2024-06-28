import React, { useEffect, useState } from 'react';
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TobBar from "./../TopBar"
import "./accountsetting.css";

const AccountSetting = () => {
  const [user, setUser] = useState({}); // Initialize as an empty object
  const navigate = useNavigate();
  
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/me", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (

    <>
  <TobBar />
    <Card style={{
      backgroundColor:'#28282B',
      color:'white',
      minHeight: 200,
      
      display: 'flex'
    }}>
      {user.newuser && user.newuser.profilePhoto && (   
        <img src={user.newuser.profilePhoto} alt="Profile" style={{ width: 300 }} />
      )}
      <div style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:'50px'
      }}>
        <Typography textAlign={"center"} variant="h5">{user.newuser && user.newuser.username}</Typography>
        <Typography textAlign={"center"} variant="h5">{user.newuser && user.newuser.phoneno}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{user.newuser && user.newuser.email}</Typography>
      </div>
    </Card>
    </>
  );
}

export default AccountSetting;
