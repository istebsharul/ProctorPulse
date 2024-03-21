import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import {  useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=  useNavigate();

    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const redirect = '/account';
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        } else if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, alert, error, navigate, isAuthenticated, redirect]);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    return (
        <Fragment>
            <form className="loginForm" onSubmit={loginSubmit}>
                <div className="loginEmail">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>
                <div className="loginPassword">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
            </form>
        </Fragment>
    );
};

export default Login;
