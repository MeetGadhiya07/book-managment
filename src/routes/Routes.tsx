import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/context";
import Login from "../components/LoginForm/Login";
import SignUp from "../components/SignupForm/signup";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  console.log("isAuthenticated ===>", isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

export default AppRoutes;
