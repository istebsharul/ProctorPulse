import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./Components/Navbar/Navbar";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CreateTestPage from "./Pages/CreateTestPage";
import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Utils/ProtectedRoute";
import PasswordResetPage from "./Pages/PasswordResetPage";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className='bg-purple-200 lg:h-19 md:h-12'>
            <Navbar />
            <App />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
              <Route exact path="/forgotpassword" element={<ForgotpasswordPage />} />
              <Route exact path="/password/reset/:token" element={<PasswordResetPage />} />
              <Route exact element={<ProtectedRoute />}>
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/create" element={<CreateTestPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
