import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import TopBar from "./components/TopBar";
import { Profile } from "./pages/Profile";
import { Views } from "./pages/Views";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { userState } from "./store/atoms/user";
import {NewLogin} from "./pages/NewLogin";
import { NewSignupPage } from "./pages/NewSignup"; 
import CreateProperty from "./pages/CreateProperty";
import UpdateProperty from "./pages/UpdateProperty";
import SingleProperty from "./pages/SingleProperty";

function App() {
  return (
      <RecoilRoot>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee",
          }}
        >
          <Router>
            {/* <TopBar /> */}
            <InitUser />
            <Routes>
              <Route path={"/"} element={<NewLogin />} />
              <Route path={"/updateproperty"} element={<UpdateProperty />} />
              <Route path={"/posts/:postId"} element={<UpdateProperty />} />
              <Route path={"/properties/:Id"} element={<SingleProperty />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/views"} element={<Views />} />
              <Route path={"/landing"} element={<Landing />} />
              <Route path={"/signup"} element={<NewSignupPage />} />
              <Route path={"/createproperty"} element={<CreateProperty />} />
              <Route path="/user/:activepage" element={<Profile />} />
            </Routes>
          </Router>
        </div>
      </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
