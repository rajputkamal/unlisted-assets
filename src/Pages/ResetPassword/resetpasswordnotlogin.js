import React, { useState } from "react";

import "./resetpassword.css"
// import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import backButton from "../back_button.png"
import passwordImg from "./Reset_Password.png"
import MobileVerification from "../../Pages/MobileVerification/index";
// import googleLogo from "./google_logo.png"
import { Link } from "react-router-dom";
import { apiCall } from '../../Utils/Network';
import {
    errorToast, successToast,
  } from "../../Components/Toast/index";
import { PinDropSharp } from "@material-ui/icons";
import StateManager from "react-select";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,useLocation
  } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


export default function ResetPasswordNotLogIn(){
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp,setOtp] = useState("")
    const history = useHistory();
    let location = useLocation();

    let mobile = ""
    let loggedinuser = false;
    let type = "resetpasswordnotloggedin"

    if(location.state != undefined) {
        mobile = location.state.mobile;
        loggedinuser = false;
        type = "resetpasswordnotloggedin";

    } else {
        loggedinuser = true;
        type = "resetpasswordfirsttime";
    }
    // console.log("kkkk", type)
    const [open, setOpen] = React.useState(false);

    const [showPass, setshowPass] = React.useState(false);
    const [showNewpass, setshowNewpass] = React.useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [newpasswordShown, setnewPasswordShown] = useState(false);

    const showPassword =()=>{
        showPass? setshowPass(false):setshowPass(true);
        setPasswordShown(passwordShown ? false : true);        
    }
    const showNewPassword =()=>{
        showNewpass? setshowNewpass(false):setshowNewpass(true);
        setnewPasswordShown(newpasswordShown ? false : true);
    }





    // console.log(location)

    const [passwordValidationChecks, setPasswordValidationChecks] = useState({
        isConfirmPasswordSameAsPassword: false,
        doesContainMinimumCharacter: false,
        doesContainMinimumUpperCase: false,
        doesContainMinimumNumericDigits: false,
        doesContainMinimumSpecialCharacters: false
    })

    const validatePassword = (password, confirmPassword) => {
        let passwordValidationChecksClone = { ...passwordValidationChecks }

        if(password === confirmPassword && password !== ""){
            passwordValidationChecksClone.isConfirmPasswordSameAsPassword = true
        } else {
            passwordValidationChecksClone.isConfirmPasswordSameAsPassword = false
        }

        let minCharRegex = /^.{8,}$/

        if(minCharRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumCharacter = true
        else
            passwordValidationChecksClone.doesContainMinimumCharacter = false

        let minUpperCharRegex = /[A-Z]/

        if(minUpperCharRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumUpperCase = true
        else
            passwordValidationChecksClone.doesContainMinimumUpperCase = false

        let  minDigitRegex = /[0-9]/

        if(minDigitRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumNumericDigits = true
        else
            passwordValidationChecksClone.doesContainMinimumNumericDigits = false

        let minSpecialChar = /[~!@#$%^&*()_+`=\-{}\[\]'":;<>?,.\/]/

        if(minSpecialChar.exec(password))
            passwordValidationChecksClone.doesContainMinimumSpecialCharacters = true
        else
            passwordValidationChecksClone.doesContainMinimumSpecialCharacters = false

        setPasswordValidationChecks(passwordValidationChecksClone)


    }

    const newpasswordCheck = async function(event) {

        // event.preventDefault()

        try {

                let response = await apiCall("profile/newpasswordCheck/"+confirmPassword+"/" + mobile,
                    "GET", '', history)

                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                // console.log("apicalled", response)
                if (response.status !== 200) {
                    errorToast("Invalid", "Password cannot be the same as last one!");
                    return;
                }

        } catch (error) {
            // console.log("error", error);
            console.error(error);
            errorToast("Invalid", "Internet or Service is down, try after some time...");
            // setLoadingbutton(false);
        }

    }

    const Sendotp = async function(event) {

        event.preventDefault()

        newpasswordCheck()

        try {
            if(!loggedinuser){
                let response = await apiCall("profile/sendotponmobileNotloggedin/" + mobile,
                    "POST", '', history)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                // console.log("apicalled", response)
                if (response.status !== 200) {
                    errorToast("Invalid", "Mobile No Does not exist...");
                    return;
                } else if (response.status === 200) {
                    successToast("Success", "OTP sent to your Mobile, please check")
                    setOpen(true)
                }
            } else {
                let response = await apiCall("profile/sendotponmobileloggedin",
                    "POST", '', history)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                // console.log("apicalled", response)
                if (response.status !== 200) {
                    errorToast("Invalid", "Mobile No Does not exist...");
                    return;
                } else if (response.status === 200) {
                    successToast("Success", "OTP sent to your Mobile, please check")
                    setOpen(true)
                }
            }

        } catch (error) {
            // console.log("error", error);
            console.error(error);
            errorToast("Invalid", "Internet or Service is down, try after some time...");
            // setLoadingbutton(false);
        }

    }

    const closeMobileVerification = () =>{
        setOpen(false)
    }

    const callbackfunc = async (otp) => {
        //setAnythingchanged(!anythingchanged)

        // setTimeout(() => {
        //     window.location.reload();
        // },3000)
        //setLoadingbtn(true);
    }

    return(
        <div className="reset_password_mobile-verification">
        <div className="reset_password_header">
        <img src={logo} className="reset_password_unlisted-assests-logo-header"/>
        </div>
            <img src={backButton} className="back-button" onClick={()=>{history.push("/login")}} />
        {/* <img src={backButton} className="back-button"/> */}

        <div className ="reset_password_container">
        <div className="reset_password_main-content">
            <img src={passwordImg} className="reset_password_main-image"/>
            <p className="reset_password_heading">Reset your Password</p>
        </div>
        {/* <img src={passwordImg} className="main-image"/> */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <form className="reset_password_form form_conainer">
                    
                    <label>
                        Password *
                    </label>
                    {showNewpass ?<VisibilityIcon onClick={showNewPassword} className="reset_password_eyeimg_Password"/>:<VisibilityOffIcon onClick={showNewPassword} className="reset_password_eyeimg_Password"/>
                        }
                    <input className="reset_password_input" type={newpasswordShown ? "text" : "password"} name="password"
                        onChange={(e) => {
                            validatePassword(e.target.value, confirmPassword)
                            setPassword(e.target.value)
                        }}
                        value={password} />
                    <div>
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumCharacter ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must be 8 or more characters in length.</p>
                        </div>
                        <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumUpperCase ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more uppercase characters.</p>
                        </div>    
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumSpecialCharacters ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more special characters.</p>
                        </div>
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumNumericDigits ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more digit characters.</p>
                        </div>
                        <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.isConfirmPasswordSameAsPassword ? smallGreenCheck : smallRedCross} />
                            <p className="reset_password_validation-item-p">"Password" and "Confirm Password" should match</p>
                        </div>
                    </div>
                    <label>
                        Confirm Password *
                    </label>
                    {showPass ?<VisibilityIcon onClick={showPassword} className="reset_password_eyeimg_ConfirmPassword"/>:<VisibilityOffIcon onClick={showPassword} className="reset_password_eyeimg_ConfirmPassword"/>
                        }
            <input className="reset_password_input" type={ passwordShown? "text" : "password"} name="confirmPassword"
                   onChange={(e) => {
                       validatePassword(password, e.target.value)
                       setConfirmPassword(e.target.value)
                   }}
                   value={confirmPassword} />

                   <br/>
                     <input className="reset_password_input" type="submit" value="Update Password" disabled={!( password && confirmPassword)} className="submit-button"
                    onClick={(e) =>Sendotp(e)} style={{cursor:"pointer"}}
                    />
                </form>
                </div>

        </div>


            <Dialog
                style={{height:"100vh"}}
                open={open}
                onClose={() => { setOpen(false) }}
            >

                <MobileVerification type={type}
                                    closeMobileVerification1={closeMobileVerification}
                                    callbackfunc={callbackfunc} confirmPassword={confirmPassword} mobilenumber={mobile}
                />
            </Dialog>
    </div>
    )
}
