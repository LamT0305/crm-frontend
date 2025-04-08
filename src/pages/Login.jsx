import React from "react";
import Logo from "../assets/logo.png";
import GoogleImg from "../assets/googleImg.png";
import background from "../assets/background.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { loginWithGoogle } = useAuth();
  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
      }}
    >
      <div className="w-full max-w-md p-8 space-y-8 backdrop-blur-sm bg-white/10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-24 h-24 transform hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-200">Sign in to continue to your account</p>
          </div>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white rounded-lg hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <img src={GoogleImg} alt="Google" className="w-6 h-6" />
          <span className="text-gray-800 font-medium">
            Continue with Google
          </span>
        </button>

        <div className="text-center text-sm text-gray-300">
          <p>By continuing, you agree to our</p>
          <div className="space-x-2 mt-1">
            <Link to="/terms" className="text-blue-300 hover:text-blue-200">
              Terms of Service
            </Link>
            <span>&middot;</span>
            <Link to="/privacy" className="text-blue-300 hover:text-blue-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
