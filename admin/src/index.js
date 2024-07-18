import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./Components/Navbar/Navbar"
import { Provider } from "react-redux";
import store from "./Store/store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage";
import CreateTestPage from "./Pages/CreateTestPage";
import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Utils/ProtectedRoute";
import PasswordResetPage from "./Pages/PasswordResetPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div className='bg-purple-200 lg:h-19 md:h-12'>
          <Navbar />
          <App />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotpasswordPage />} />
            <Route path="/password/reset/:token" element={<PasswordResetPage/>}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<CreateTestPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
