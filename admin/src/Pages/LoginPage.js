import React from "react";
import Login from "../Components/User/Login";

function LoginPage({updateStatus}) {
  return (
    <>
      <Login  updateStatus={updateStatus}/>
    </>
  );
}

export default LoginPage;
