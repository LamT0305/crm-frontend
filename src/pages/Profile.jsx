import React from "react";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/auth";

function Profile() {
  const { user, getUser } = useAuth();
  const tk = getToken();
  console.log(user);
  return (
    <div className="" onClick={getUser}>
      Profile
    </div>
  );
}

export default Profile;
