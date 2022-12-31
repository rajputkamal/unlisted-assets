import React, { useEffect, useState, useRef } from "react";
import "./resetpassword.css"
// import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import backButton from "../back_button.png"
import passwordImg from "./Reset_Password.png"
// import googleLogo from "./google_logo.png"
import { Link } from "react-router-dom";
import { apiCall, clearAccessToken } from '../../Utils/Network';
import Loadbutton from '../../Components/Loadbutton/Index';
import "./resetpassword.css"

// import googleLogo from "./google_logo.png"

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


let ResetPassword = () => {
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp,setOtp] = useState("")
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    useEffect(() => {
        sendotp();
    }, []);


    async function sendotp(){



        let response = await apiCall("profile/sendotponmobileloggedin","POST",'', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Mobile Number Does not exists");
            return;
        }else if (response.status === 200){

             successToast("Success","OTP sent to your mobile please check")
            // setOpen(true)
        }

    }

    async function resendotp(){

        let response = await apiCall("profile/resendotponmobileloggedin","POST",'', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Mobile Number Does not exists");
            return;
        }else if (response.status === 200){

            successToast("Success","OTP sent to your mobile please check")

            // setOpen(true)
        }

    }


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
    const Reset = async function (event){
         event.preventDefault();
         setLoadingbtn(true);
        const response = await apiCall("profile/resetpasswordloggedinmobile/"+otp+"/"+confirmPassword,
            "PUT",'', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Password Not Changed! OTP is invalid, refresh the screen to continue");
            setLoadingbtn(false);
            return;
        }else if (response.status === 200){
            successToast("Success","Password Changed Successfully!, please login again")
            setLoadingbtn(false);
            clearAccessToken()
            history.replace("/login")
        }
    }


    return (
        <div className="reset_password_mobile-verification my-card">
            <div className="reset_password_header text-center">
            <img src={logo} width="150" className=""/>
            </div>
            {/* <img src={backButton} className="back-button"/> */}
            <div className ="reset_password_container">
            <div className="reset_password_main-content my-3">
                <img src={passwordImg} width="50" height="50"/>
                <p className="reset_password_heading mt-3">Reset your Password</p>
            </div>
            {/* <img src={passwordImg} className="main-image"/> */}
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <form className="reset_password_form">
                        
                        <label>
                            Password *
                        </label>
                        <input className="reset_password_input" type="password" name="password"
                            onChange={(e) => {
                                validatePassword(e.target.value, confirmPassword)
                                setPassword(e.target.value)
                            }}
                            value={password} />
                        <div>
                            <div className="reset_password_validation-item mt-3">
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
                        <input className="reset_password_input" type="password" name="confirmPassword" 
                            onChange={(e) => {
                                validatePassword(password, e.target.value)
                                setConfirmPassword(e.target.value)
                            }} 
                            value={confirmPassword} />
                <label>
                    Enter OTP *
                </label>

                <input type="text" className="reset_password_input"
                       onChange={(e) => {
                           // validatePassword(e.target.value, otp)
                           setOtp(e.target.value)
                       }}
                       value={otp}
                />

                <p className="p-2 m-4 text-small">If you didn’t receive a codeaa! <span style={{cursor:"pointer"}} onClick={resendotp}><b>Resend Code</b></span></p>
                          {!isLoadingbtn && (
                                <input className="reset_password_input" type="submit" value="Update Password" disabled={!( password && confirmPassword)} className="submit-button" onClick={(e) => { Reset(e)}} style={{cursor:"pointer"}}
                             />
                            )}
                            {isLoadingbtn && (
                                <Loadbutton />
                            )}
                    </form>
                    </div>

            </div>
                   

                   
        </div>)
}

export default ResetPassword
