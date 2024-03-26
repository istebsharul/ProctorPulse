import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import Home from "./Components/Home/Home";
import LoginPage from "./Components/Pages/LoginPage";
import SignupPage from "./Components/Pages/SignupPage";
import ForgotpasswordPage from "./Components/Pages/ForgotpasswordPage";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route
              exact
              path="/forgotpassword"
              element={<ForgotpasswordPage />}
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
