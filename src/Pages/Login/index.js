import React, { Suspense } from "react";
import loginPageMainImage from "./loginPageMain.png";
import logo from "../logo.png";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import {
  apiCall,
  setChangePasswordRedirect,
  clearChangePasswordRedirect,
  setAccessToken,
} from "../../Utils/Network";
import Buttons from "../../Components/Buttons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loadbutton from "../../Components/Loadbutton/Index";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Error403 from "../../Components/ErrorComponents/Error403";
import { isLoggedIn } from "../../Utils/Network";

import { ReactComponent as HandsIcon } from "../Signup/Assets/HandsIcon.svg";
import { ReactComponent as BadgeIcon } from "../Signup/Assets/BadgeIcon.svg";
import { ReactComponent as ShieldIcon } from "../Signup/Assets/ShieldIcon.svg";
import { ReactComponent as MessageIcon } from "../Signup/Assets/MessageIcon.svg";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiOutlineLeft } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";

const SignUpLeftSection = React.lazy(() =>
  import("../Signup/Component/SignUpLeftSection")
);

// import SignUpLeftSection from "../Signup/Component/SignUpLeftSection";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// class Login extends React.Component {

const Login = () => {
  // console.log('ok');
  const [welcomePage, setWelcomePage] = React.useState(false);
  const [userID, setUserID] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [showPass, setshowPass] = React.useState(false);

  const showPassword = () => {
    showPass ? setshowPass(false) : setshowPass(true);
    setPasswordShown(passwordShown ? false : true);
  };

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
        "POST",
        "",
        history
      );
      setLoadingbutton(false);
      if (password == "") {
        errorToast("Password Required", "Please type your password");
      } else if (response.status !== 200) {
        if (response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return;
        } else {
          errorToast("Invalid", "Invalid User ID or password");
        }

        setLoadingbutton(false);
        return;
      }

      let jsonResponse = await response.json();

      // console.log(jsonResponse);
      setLoadingbutton(false);

      setAccessToken(jsonResponse.access_token);
      // console.log('pass'+password)
      let response1 = await apiCall(
        `useronboarding/firsttimelogin`,
        "GET",
        "",
        history
      );
      // console.log("response1", response1);

      if (response1.status == 200) {
        // console.log('pass1'+password)
        setChangePasswordRedirect("CHANGE_PASSWORD_REDIRECT");
        history.push("/resetpassword");
      } else {
        // console.log('pass2'+password)
        clearChangePasswordRedirect(null);
        history.push("/inventory_1");
      }
    } catch (error) {
      // console.log("error", error);
      console.error(error);

      setLoadingbutton(false);
    }
  };

  const userIdSubmit = (e) => {
    setUserID(e.target.value);
  };
  const passwordSubmit = (e) => {
    setPassword(e.target.value);
  };

  // render() {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 0 }}>
        <Grid container spacing={0} height="100vh">
          <Suspense fallback="login page...">
            <SignUpLeftSection />
          </Suspense>

          <div className="mobile_top_text" onClick={() => history.push("")}>
            <AiOutlineLeft className="back_icon" />
            <p>Back To Website</p>
          </div>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className="d-flex justify-content-center align-items-center SignUp_page_right-main"
          >
            <Box className="signup_Page_right-half-inner">
              <div className="login_Page_contents">
                <div className="login_Page_logo-container">
                  <img src={logo} className="login_Page_logo" />
                </div>
                <div
                  className="desktop_top_text"
                  onClick={() => history.push("")}
                >
                  <BsGlobe2 style={{ color: "#721B65" }} />
                  <p>Back To Website</p>
                </div>
                <h5 className="login_Page_heading mt-5">Welcome Back,</h5>

                <form className="login-form w-100">
                  <label>User ID * ( Phone / Email )</label>
                  <input
                    type="text"
                    name="userID"
                    onChange={(e) => userIdSubmit(e)}
                    value={userID}
                    placeholder="phone number or email"
                  />

                  <label>Password *</label>
                  {showPass ? (
                    <VisibilityIcon
                      onClick={showPassword}
                      className="login_password_eyeimg_newpass"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={showPassword}
                      className="login_password_eyeimg_newpass"
                    />
                  )}
                  <input
                    type={passwordShown ? "text" : "password"}
                    // type="password"
                    name="password"
                    onChange={(e) => passwordSubmit(e)}
                    value={password}
                  />
                  {userID !== "" && password !== "" ? (
                    !loadingbutton && (
                      <Buttons.PrimaryButton
                        value="Login"
                        disabled={!userID}
                        className="login-submit-button mt-4"
                        onClick={handleSubmit}
                      />
                    )
                  ) : (
                    <>
                      <button className="btn-disable mt-4">Login</button>
                    </>
                  )}
                  {loadingbutton && (
                    <div className="mt-4">
                      <Loadbutton />
                    </div>
                  )}
                </form>
                <div className="login_Page_forgot-actions mt-3">
                  {/*<p className="m-0">*/}
                  {/*  <Link to="/forgotuserid">Forgot User ID</Link>*/}
                  {/*</p>*/}
                  {/*<div class="login_Page_vertical-line"/>*/}
                  <p className="m-0">
                    <Link to="/forgotpassword">Forgot Password</Link>
                  </p>
                </div>
                <div class="login_Page_horizontal-line" />
                <div className="login_Page_sign-up mt-5">
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/sign-up">Sign Up</Link>
                  </p>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
  // }
};

export default Login;
