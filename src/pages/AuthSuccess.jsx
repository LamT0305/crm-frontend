// src/pages/AuthSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../utils/auth";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      storeToken(token);
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>;
};

export default AuthSuccess;
