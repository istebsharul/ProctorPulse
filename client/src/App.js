import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Signup from "./Components/User/Signup";
import store from "./Store/store";
import Login from "./Components/User/Login";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
