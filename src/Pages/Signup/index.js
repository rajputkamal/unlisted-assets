import React, { useState } from "react";
import loginPageMainImage from "./Assets/loginPageMain.png";
import smallGreenCheck from "./Assets/green_check_small_filled.png";
import smallRedCross from "./Assets/red_cross_circle_filled.png";
import googleLogo from "./Assets/google_logo.png";
import { Link, useHistory } from "react-router-dom";

import logo from "../logo.png";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import SignUpLeftSection from "./Component/SignUpLeftSection";
import "./signup.css";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../Components/Toast/index";
import AlertDialog from "../../Components/DialogBox/dialogbox";
import Loadbutton from "../../Components/Loadbutton/Index";
import Buttons from "../../Components/Buttons";
import { apiCall, setAccessToken } from "../../Utils/Network";

import MobileVerification from "../../Pages/MobileVerification/index";
import Dialog from "@material-ui/core/Dialog";

// new singup screen

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiOutlineLeft } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// new singup screen end

let SignUp = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [showNameError, setShowNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonenumberError, setPhoneNumberError] = useState("");
  const [showPhoneNumberError, setShowPhoneNumberError] = useState("");
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState("");
  const [showUserAlreadyExistsError, setShowUserAlreadyExistsError] = useState(
    ""
  );
  const [dialogPage, setDialogPage] = useState(false);
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [showPass, setshowPass] = React.useState(false);
  const [showOldpass, setshowOldpass] = React.useState(false);
  const [showNewpass, setshowNewpass] = React.useState(false);
  const [oldpasswordShown, setOldpasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [newpasswordShown, setnewPasswordShown] = useState(false);
  const [createPassword, setCreatePassword] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(false);

  let InlineValidationName = () => {
    return (
      <div className="inline-validation-box">
        <p>{nameError}</p>
      </div>
    );
  };

  let InlineValidationEmail = () => {
    return (
      <div className="inline-validation-box">
        <p>Please enter a valid email address</p>
      </div>
    );
  };

  let InlineValidationBoxPhoneNumber = () => {
    return (
      <div className="inline-validation-box">
        <p>{phonenumberError}</p>
      </div>
    );
  };

  let InlineValidationBoxUserAlreadyExists = () => {
    return (
      <div className="inline-validation-box">
        <p>{userAlreadyExistsError}</p>
      </div>
    );
  };

  const clearValidationMessages = async () => {
    await setShowEmailError(false);
    await setEmailError("");

    await setShowNameError(false);
    await setNameError("");

    await setShowPhoneNumberError(false);
    await setPhoneNumberError("");

    await setShowUserAlreadyExistsError(false);
    await setUserAlreadyExistsError("");
  };

  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
    await clearValidationMessages();
    switch (field) {
      case "email":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowEmailError(true);
        await setEmailError(errorMessage);
        break;

      case "mobile":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowPhoneNumberError(true);
        await setPhoneNumberError(errorMessage);
        break;

      case "name":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowNameError(true);
        await setNameError(errorMessage);
        break;

      default:
      // console.log("hooooooooooooooooonijhibibibibib")
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingbutton(true);

    let requestBody = {
      email: email,
      mobile: phoneNumber,
      name: name,
    };
    // console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody)

    try {
      let response = await apiCall(
        `profile/signup`,
        "POST",
        requestBody,
        history
      );

      // let response = await fetch("http://api1.unlistedassets.com/profile/signup",
      //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
      // )

      setLoadingbutton(false);

      // console.log("response ", response)

      if (response.status === 409) {
        return;
      } else if (response.status === 400) {
        let responseJSON = await response.json();
        let i = 0;
        const arrayerrormessages = responseJSON.details1;
        // console.log(arrayerrormessages)
        const listItems = arrayerrormessages.map((errorResponse) =>
          validate(errorResponse.field, errorResponse.errorMessage)
        );
        setLoadingbutton(false);
      } else if (response.status === 500) {
        setLoadingbutton(false);
        setShowUserAlreadyExistsError(true);
        setUserAlreadyExistsError(
          "User already exists with the provided email or mobile..."
        );
      } else if (response.status === 200) {
        setLoadingbutton(false);

        // let responseJSON = await response.json()
        // setHolding(responseJSON)
        //
        // // console.log("response ", response)
        //
        // // console.log("responseJson", responseJSON)
        //
        // setOpen(true);
        //
        // setDialogPage(true);
        // sendotp()
        setCreatePassword(false);
      }
    } catch (error) {
      // console.log("error", error);
      console.error(error);
      errorToast(
        "Invalid",
        "Internet or Service is down, try after some time..."
      );
      setLoadingbutton(false);
    }
  };

  const closeDialog = () => {
    // console.log('aaaaaaa')
    setDialogPage(false);
  };

  // for mobile verification otp:

  const [otp, setOtp] = useState("");
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [mobile, setmobile] = React.useState("");
  const [type, setType] = React.useState("resetpasswordfirsttimenotloggedin");
  const [confirmPassword, setConfirmPassword] = useState("");

  const closeMobileVerification = () => {
    setoldPassword("");
    setPassword("");
    setOpen(false);
  };
  const callbackfunc = async (otp) => {
    //setAnythingchanged(!anythingchanged)
    // setTimeout(() => {
    //     window.location.reload();
    // },3000)
    //setLoadingbtn(true);
  };

  const sendotp = async (event) => {
    event.preventDefault();

    // if (confirmPassword == oldPassword) {
    //     errorToast("Invalid", "New Password can not be same as Old Password!!");
    //     return;
    // }
    console.log("phone" + phoneNumber);
    let response = await apiCall(
      "profile/sendotponmobileNotloggedin/" + phoneNumber,
      "POST",
      "",
      history
    );

    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    // console.log("apicalled", response)
    if (response.status !== 200) {
      errorToast("Invalid", "Mobile Number Does not exists");
      return;
    } else if (response.status === 200) {
      let isOTPSent = await response.text();

      if (isOTPSent == "true") {
        successToast("Success", "OTP sent to your mobile please check");
        setOpen(true);
      } else {
        errorToast("Invalid", "OTP not sent, try again or contact admin!!");
        setOpen(false);
      }
    }
  };

  // create password :

  const [passwordValidationChecks, setPasswordValidationChecks] = useState({
    isConfirmPasswordSameAsPassword: false,
    doesContainMinimumCharacter: false,
    doesContainMinimumUpperCase: false,
    doesContainMinimumNumericDigits: false,
    doesContainMinimumSpecialCharacters: false,
  });

  const validatePassword = (password, confirmPassword) => {
    let passwordValidationChecksClone = { ...passwordValidationChecks };

    if (password === confirmPassword && password !== "") {
      passwordValidationChecksClone.isConfirmPasswordSameAsPassword = true;
    } else {
      passwordValidationChecksClone.isConfirmPasswordSameAsPassword = false;
    }

    let minCharRegex = /^.{8,}$/;

    if (minCharRegex.exec(password))
      passwordValidationChecksClone.doesContainMinimumCharacter = true;
    else passwordValidationChecksClone.doesContainMinimumCharacter = false;

    let minUpperCharRegex = /[A-Z]/;

    if (minUpperCharRegex.exec(password))
      passwordValidationChecksClone.doesContainMinimumUpperCase = true;
    else passwordValidationChecksClone.doesContainMinimumUpperCase = false;

    let minDigitRegex = /[0-9]/;

    if (minDigitRegex.exec(password))
      passwordValidationChecksClone.doesContainMinimumNumericDigits = true;
    else passwordValidationChecksClone.doesContainMinimumNumericDigits = false;

    let minSpecialChar = /[~!@#$%^&*()_+`=\-{}\[\]'":;<>?,.\/]/;

    if (minSpecialChar.exec(password))
      passwordValidationChecksClone.doesContainMinimumSpecialCharacters = true;
    else
      passwordValidationChecksClone.doesContainMinimumSpecialCharacters = false;

    setPasswordValidationChecks(passwordValidationChecksClone);
  };

  const showOldpassword = () => {
    showOldpass ? setshowOldpass(false) : setshowOldpass(true);
    setOldpasswordShown(oldpasswordShown ? false : true);
  };

  const showPassword = () => {
    showPass ? setshowPass(false) : setshowPass(true);
    setPasswordShown(passwordShown ? false : true);
  };
  const showNewPassword = () => {
    showNewpass ? setshowNewpass(false) : setshowNewpass(true);
    setnewPasswordShown(newpasswordShown ? false : true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 0 }}>
        <Grid container spacing={0} height="100vh">
          <SignUpLeftSection />
          <div className="mobile_top_text" onClick={() => history.push("")}>
            <AiOutlineLeft className="back_icon" />
            <p>Back To Website</p>
          </div>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className="d-flex justify-content-center align-items-center SignUp_page_right-main mobileview-order-1"
          >
            <Box className="signup_Page_right-half-inner">
              <div className="SignUp_page_contents">
                <div className="SignUp_page_logo-container">
                  <img src={logo} className="SignUp_page_logo" />
                </div>
                <div
                  className="desktop_top_text"
                  onClick={() => history.push("")}
                >
                  <BsGlobe2 style={{ color: "#721B65" }} />
                  <p>Back To Website</p>
                </div>
                {createPassword ? (
                  <>
                    <h5 className="login_Page_heading mt-5">
                      Sign Up As A New User
                    </h5>

                    {showUserAlreadyExistsError ? (
                      <InlineValidationBoxUserAlreadyExists />
                    ) : null}
                    <form className="login-form w-100">
                      <label>
                        Name<span className="red-star">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      {showNameError ? <InlineValidationName /> : null}
                      <label>
                        Email<span className="red-star">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      {showEmailError ? <InlineValidationEmail /> : null}
                      <label>
                        Mobile Number<span className="red-star">*</span>
                      </label>
                      <div className="d-flex align-items-center pl-2 bg-white signup-mobile-input">
                        <span className="m-0 text-medium border-right pr-2">
                          +91
                        </span>
                        <input
                          type="number"
                          name="phoneNumber"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                          size="38"
                          style={{ border: "none" }}
                        />
                      </div>
                      {showPhoneNumberError ? (
                        <InlineValidationBoxPhoneNumber />
                      ) : null}

                      <AlertDialog
                        dialogPage={dialogPage}
                        onClose={closeDialog}
                      />

                      {/* <input type="submit" value="Sign Up" className="submit-button text-white mt-4" /> */}

                      {!loadingbutton && (
                        <div className="mt-4">
                          {!(name == "" && email == "" && phoneNumber == "") ? (
                            <Buttons.PrimaryButton
                              value="Create My Account"
                              onClick={handleSubmit}
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <Buttons.InactiveButton
                              value="Create My Account"
                              style={{ width: "100%" }}
                            />
                          )}
                        </div>
                      )}
                      {loadingbutton && (
                        <div className="mt-4">
                          <Loadbutton />
                        </div>
                      )}

                      {/* {
                    !loadingbutton && <button className="btn btn-primary-default mt-4"><b>Sign Up</b></button>
                    }
                    {
                    loadingbutton && <div className="mt-4">
                        <Loadbutton />
                    </div>
                    
                    } */}
                    </form>

                    {/* <div class="login_Page_horizontal-line my-5" /> */}

                    <div className="SignUp_page_sign-up mt-5">
                      <p>
                        Already have an account? <Link to="/Login">Login</Link>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="create-password-main">
                      <h5 className="login_Page_heading mt-5">
                        Let’s set a password for your
                        <br /> account.
                      </h5>

                      {/* {showUserAlreadyExistsError ? <InlineValidationBoxUserAlreadyExists /> : null} */}

                      <form className="reset_password_form w-100 ">
                        <div className="position-relative">
                          <label>
                            Create Password<span className="red-star">*</span>
                          </label>

                          {showNewpass ? (
                            <RemoveRedEyeOutlinedIcon
                              onClick={showNewPassword}
                              className="create_password_eyeimg_create"
                            />
                          ) : (
                            <VisibilityOffOutlinedIcon
                              onClick={showNewPassword}
                              className="create_password_eyeimg_create"
                            />
                          )}

                          <input
                            className="reset_password_input w-100"
                            type={newpasswordShown ? "text" : "password"}
                            name="password"
                            onChange={(e) => {
                              validatePassword(e.target.value, confirmPassword);
                              setPassword(e.target.value);
                            }}
                            value={password}
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-12 px-3">
                            <div>
                              <div className="create_password_validation-item">
                                <img
                                  src={
                                    passwordValidationChecks.doesContainMinimumCharacter
                                      ? smallGreenCheck
                                      : smallRedCross
                                  }
                                />
                                <p>
                                  Password must be 8 or more characters in
                                  length.
                                </p>
                              </div>
                              <div className="create_password_validation-item">
                                <img
                                  src={
                                    passwordValidationChecks.doesContainMinimumUpperCase
                                      ? smallGreenCheck
                                      : smallRedCross
                                  }
                                />
                                <p>
                                  Password must contain 1 or more uppercase
                                  characters.
                                </p>
                              </div>
                              <div className="create_password_validation-item">
                                <img
                                  src={
                                    passwordValidationChecks.doesContainMinimumNumericDigits
                                      ? smallGreenCheck
                                      : smallRedCross
                                  }
                                />
                                <p>
                                  Password must contain 1 or more digit
                                  characters.
                                </p>
                              </div>
                              <div className="create_password_validation-item">
                                <img
                                  src={
                                    passwordValidationChecks.doesContainMinimumSpecialCharacters
                                      ? smallGreenCheck
                                      : smallRedCross
                                  }
                                />
                                <p>
                                  Password must contain 1 or more special
                                  characters.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="position-relative">
                          <label>
                            Confirm Password<span className="red-star">*</span>
                          </label>

                          {showPass ? (
                            <RemoveRedEyeOutlinedIcon
                              onClick={showPassword}
                              className="create_password_eyeimg_confirmpass"
                            />
                          ) : (
                            <VisibilityOffOutlinedIcon
                              onClick={showPassword}
                              className="create_password_eyeimg_confirmpass"
                            />
                          )}
                          <input
                            className="reset_password_input w-100"
                            type={passwordShown ? "text" : "password"}
                            name="confirmPassword"
                            onChange={(e) => {
                              validatePassword(e.target.value, password);
                              setConfirmPassword(e.target.value);
                            }}
                            value={confirmPassword}
                          />
                        </div>
                        {!isLoadingbtn && (
                          <>
                            <br />

                            {!(
                              passwordValidationChecks.doesContainMinimumCharacter &&
                              passwordValidationChecks.doesContainMinimumUpperCase &&
                              passwordValidationChecks.doesContainMinimumSpecialCharacters &&
                              passwordValidationChecks.doesContainMinimumNumericDigits &&
                              passwordValidationChecks.isConfirmPasswordSameAsPassword
                            ) ? (
                              <Buttons.PrimaryButton
                                value="Set Password"
                                disabled
                                style={{ width: "100%" }}
                              />
                            ) : (
                              <Buttons.PrimaryButton
                                value="Set Password"
                                style={{ width: "100%" }}
                                onClick={sendotp}
                              />
                            )}
                          </>
                        )}

                        {/* {
                                                    !loadingbutton && <Buttons.PrimaryButton value="Create My Account" className="login-submit-button mt-4" onClick={()=>setVerifyEmail(true)}/>
                                                } */}
                        {isLoadingbtn && <Loadbutton />}
                      </form>

                      <Dialog
                        open={verifyEmail}
                        onClose={() => setVerifyEmail(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <div className="verify-email-modal">
                          <div className="">
                            <div className="text-center">
                              <h5>Please Verify Your Email</h5>
                              <p className="m-0 text-small">
                                A verification link has been sent to{" "}
                                <b>johndoe@gmail.com.</b> Please follow the link
                                to verify your email and login again.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Dialog>

                      <div className="SignUp_page_sign-up  mt-5">
                        <p>
                          Already have an account?{" "}
                          <Link to="/Login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <MobileVerification
          type={type}
          closeMobileVerification1={closeMobileVerification}
          callbackfunc={callbackfunc}
          confirmPassword={confirmPassword}
          mobilenumber={phoneNumber}
        />
      </Dialog>
    </>
  );
};

export default SignUp;
