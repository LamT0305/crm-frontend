// src/pages/AuthSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      storeToken(token);
      setAuthenticated(true);
      navigate("/check-workspace"); // Redirect to check workspace page after successful login
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>;
};

export default AuthSuccess;
