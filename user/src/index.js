import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store/store';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./Utils/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import QuizPage from './Pages/QuizPage';
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ProfilePage from "./Pages/ProfilePage";
import TestPage from "./Pages/TestPage";
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ResultPage from './Pages/ResultPage';
import EditProfilePage from './Pages/EditProfilePage';
import Ranking from './Pages/Ranking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div className='bg-white lg:h-19 md:h-12'>
          <Navbar />
          <App />
          <div className='pt-12'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/password/reset/:token" element={<ResetPasswordPage/>}/>
            <Route path="/result" element={<ResultPage />} />
            <Route path="/ranking/test/:test_id" element={<Ranking/>}/>
            <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<QuizPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage/>}/>
              <Route path="/test" element={<TestPage />} />
            </Route>
          </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
