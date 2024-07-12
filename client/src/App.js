import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ForgotpasswordPage from './Pages/ForgotpasswordPage';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './Utils/ProtectedRoute';
import CreateTestPage from './Pages/CreateTestPage';
import { load } from './Actions/userActions';
import { Toaster } from 'react-hot-toast';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const updateStatus = () => {
        setIsLoggedIn((prev) => !prev);
    };
    useEffect(() => {
        store.dispatch(load());
    }, []);

    return (
        <Provider store={store}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="font-[Poppins]">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route
                            exact
                            path="/login"
                            element={<LoginPage updateStatus={updateStatus} />}
                        />
                        <Route exact path="/signup" element={<SignupPage />} />
                        <Route
                            exact
                            path="/forgotpassword"
                            element={<ForgotpasswordPage />}
                        />
                        <Route
                            element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
                        >
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/create" element={<CreateTestPage />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
