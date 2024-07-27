import React from 'react';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './Store/store';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ForgotpasswordPage from './Pages/ForgotpasswordPage';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './Utils/ProtectedRoute';
import CreatePage from './Pages/CreatePage';
import QuizPage from './Pages/QuizPage';
import { load } from './Actions/userActions';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const updateStatus = () => {
        setIsLoggedIn((prev) => !prev);
    };

    //const {user,isAuthenticated} = useSelector((state) => state.auth)

    React.useEffect(() => {
        store.dispatch(load());
    }, []);

    return (
        <Provider store={store}>
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
                            <Route path="/create" element={<CreatePage />} />
                            <Route path="/quiz" element={<QuizPage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
