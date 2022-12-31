import React from "react";
import loginPageMainImage from "./loginPageMain.png";
import logo from "../logo.png";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { apiCall, setChangePasswordRedirect, clearChangePasswordRedirect, setAccessToken } from "../../Utils/Network";
import Buttons from "../../Components/Buttons";
import CircularProgress from '@material-ui/core/CircularProgress';
import Loadbutton from '../../Components/Loadbutton/Index';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Error403 from "../../Components/ErrorComponents/Error403";
import { isLoggedIn } from "../../Utils/Network";



// class Login extends React.Component {

let Login = () => {

  console.log('ok');
  const [welcomePage, setWelcomePage] = React.useState(false);
  const [userID, setUserID] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [showPass, setshowPass] = React.useState(false);

  const showPassword = () => {
    showPass ? setshowPass(false) : setshowPass(true);
    setPasswordShown(passwordShown ? false : true);

  }

  let history = useHistory();
  if (isLoggedIn()) {
    history.push("/inventory_1");
  }
  // state = {
  //     userID: "",
  //     password: ""
  // }

  // handleChange = (event) => {
  //     this.setState({ [event.target.name]: event.target.value })
  // }

  const handleSubmit = async (event) => {
    setLoadingbutton(true);
    // const [welcomePage,setWelcomePage]= React.useState(false)
    event.preventDefault();
    // errorToast("Invalid", "Invalid User ID or password")

    try {
      let response = await apiCall(
        `oauth/token?grant_type=password&username=${userID}&password=${password}`,
        "POST", '', history
      );
      setLoadingbutton(false);
      if (password == '') {
        errorToast("Password Required", "Please type your password");
      } else if (response.status !== 200) {

        if (response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return
        } else {
          errorToast("Invalid", "Invalid User ID or password");
        }

        setLoadingbutton(false);
        return;
      }

      let jsonResponse = await response.json();

      console.log(jsonResponse);
      setLoadingbutton(false);

      setAccessToken(jsonResponse.access_token);
      // console.log('pass'+password)
      let response1 = await apiCall(
        `useronboarding/firsttimelogin`,
        "GET", '', history
      );
      console.log("response1", response1);

      if (response1.status == 200) {
        // console.log('pass1'+password)
        setChangePasswordRedirect('CHANGE_PASSWORD_REDIRECT');
        history.push("/resetpassword");

      } else {
        // console.log('pass2'+password)
        clearChangePasswordRedirect(null)
        history.push("/inventory_1");
      }

    } catch (error) {
      // console.log("error", error);
      console.error(error);

      setLoadingbutton(false);
    }
  };


  // render() {
  return (<>   


    <div className="container-fluid">
      <div className="row mobile-flex-column-reverse">
        <div className="col-md-6 col-12 d-flex align-items-center login_Page_left-half ">
          <div className="login_Page_left-half-inner">
            <div className="login_Page_main-image-container">
              <img src={loginPageMainImage} className="login_Page_main-image" />
            </div>
            <h5 className="login_Page_heading mt-5">Your data is 100% secure <br /> with us</h5>
            <p className="mt-3">We are a one stop shop  for everyone interested <br />
              to invest in unlisted  stocks. We ensure a <br />
              seamless trading experience through the  latest technology.</p>
          </div>

        </div>
        <div className="col-md-6 col-12 d-flex align-items-center justify-content-center login_Page_right-half">
          <div className="login_Page_right-half-inner">
            <div className="login_Page_contents">
              <div className="login_Page_logo-container">
                <img src={logo} className="login_Page_logo" />
              </div>
              <h5 className="login_Page_heading mt-5">Welcome back,</h5>
              <form className="login-form w-100">
                <label>User ID *</label>
                <input
                  type="text"
                  name="userID"
                  onChange={(e) => setUserID(e.target.value)}
                  value={userID}
                  placeholder="User id or Email or phone number"
                />

                <label>Password *</label>
                {showPass ? <VisibilityIcon onClick={showPassword} className="login_password_eyeimg_newpass" /> : <VisibilityOffIcon onClick={showPassword} className="login_password_eyeimg_newpass" />
                }
                <input
                  type={passwordShown ? "text" : "password"}
                  // type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {
                  userID !== '' && password !== '' ? !loadingbutton && <Buttons.PrimaryButton value="Login"
                    disabled={!(userID)}
                    className="login-submit-button mt-4"
                    onClick={handleSubmit}
                  /> : <><button className="btn-disable mt-4">Login</button></>
                }
                {
                  loadingbutton && <div className="mt-4">
                    <Loadbutton />
                  </div>

                }
              </form>
              <div className="login_Page_forgot-actions mt-3">
                <p className="m-0">
                  <Link to="/forgotuserid">Forgot User ID</Link>
                </p>
                <div class="login_Page_vertical-line" />
                <p className="m-0">
                  <Link to="/forgotpassword">Forgot Password</Link>
                </p>
              </div>
              <div class="login_Page_horizontal-line" />
              <div className="login_Page_sign-up mt-5">
                <p>
                  Don't have an account yet? <Link to="/sign-up">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    
    
    </>
  );
  // }
};


export default Login;
