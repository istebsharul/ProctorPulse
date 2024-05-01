import React from "react";
import Home from "../User/Home";
import Navbar from "../Navbar/Navbar";
import CreateTest from "../User/CreateTest";
import Test from "../Admin/Test";

function HomePage() {
  return (
    <div>
      <Home />
      <Test />
    </div>
  );
}

export default HomePage;
