import React from "react";
import Logo from "../assets/logo.png";
import GoogleImg from "../assets/googleImg.png";
import background from "../assets/background.png";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginWithGoogle } = useAuth();
  return (
    <div
      className="w-full h-full bg-gray-200"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-100 h-full mx-auto flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center bg-black/10 p-10 rounded-lg">
          <img src={Logo} alt="Logo image" className="w-20 h-20" />
          <div className="flex flex-col items-center my-5 py-8 px-10 rounded-xl">
            <p className="text-2xl font-bold text-white">Log in to system</p>
            <div
              onClick={loginWithGoogle}
              className="flex items-center justify-around m-10 bg-white px-5 py-2 text-black w-80 rounded-lg cursor-pointer"
            >
              <img src={GoogleImg} alt="Google Image" />
              <p className="text-xl font-semibold">Log in with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
