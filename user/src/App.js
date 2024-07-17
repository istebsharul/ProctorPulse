import { Toaster } from "react-hot-toast";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./Utils/ProtectedRoute";
import './App.css';
// import HomePage from "./Pages/HomePage";
// import LoginPage from "./Pages/LoginPage";
// import SignupPage from "./Pages/SignupPage";s
// import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
// import Profile from "./Pages/Profile";
import { useEffect } from "react";
import { loadUser } from "./Actions/userActions";
import store from "./Store/store";
import { useSelector } from "react-redux";
// import TestPage from "./Pages/TestPage";

function App() {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        console.log("Authenticated - App", isLoggedIn);
        store.dispatch(loadUser());
    }, [isLoggedIn]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="App">
            </div>
        </>
    );
}

export default App;
