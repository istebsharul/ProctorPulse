import React, { Fragment, useRef, useState, useEffect } from "react";
//import MailOutlineIcon from "@material-ui/icons/MailOutline";
//import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import "./Login.css";
//import FaceIcon from "@material-ui/icons/Face";
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
// import Loader from "../layout/loader/loader";

const Login = ({navigation}) => {
  //const history = useHistory();
  const dispatch = useDispatch()
  const alert = useAlert()

  const {error,loading,isAuthenticated}  = useSelector(state => state.user)
  //useRef is used here to create reference of other elements and manipulate them . Like here switcherTab is a reference of button element . This reference is used to add class to the button element. Here onclick event of the above P tags is used to change the position of this button. Adding a class and removing a class is used to changed the position of button element , with the help of css.
  // const loginTab = useRef(null);
  // const registerTab = useRef(null);
  // const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const { name, email, password } = user;

  // const [avatar, setAvatar] = useState();
  // const [avatarPreview,setAvatarPreview] = useState("/Profile.png")


  //check loginSignUp.js for reference( checkoutHandler function) if url don't contains any redirect then after login it'll be redirected to account or else to destination (shipping through checkoutHandler function)
  const redirect = "/account";
  useEffect(() => {
    
  
   if(error){
    alert.error(error);
    dispatch(clearErrors())
   }
   else if(isAuthenticated)
   {
    navigation.navigate(redirect)
   }
  }, [dispatch,alert,error,navigation,isAuthenticated,redirect])
  

  



  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail,loginPassword))
    console.log("Form Submitted");
  };

 


  return <Fragment>
      <form className="loginForm"  onSubmit={loginSubmit}>
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
            <input type="submit" value="Login" className="loginBtn"/>
             
          </form>
  </Fragment>;
};

export default Login;
