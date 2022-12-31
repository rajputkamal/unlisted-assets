import React, { useEffect, useState, useRef } from "react";
import "./resetpassword.css"
import Dialog from '@material-ui/core/Dialog';
import MobileVerification from "../../Pages/MobileVerification/index";
// import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import backButton from "../back_button.png"
import passwordImg from "./image.png"
// import googleLogo from "./google_logo.png"
import { Link } from "react-router-dom";
import { apiCall, clearAccessToken } from '../../Utils/Network';
import Loadbutton from '../../Components/Loadbutton/Index';
import "./resetpassword.css"
import Buttons from "../../Components/Buttons"

// import googleLogo from "./google_logo.png"


import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
    const [open, setOpen] = React.useState(false);
    const [type,setType] = React.useState("resetpassword");


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


    // const togglePasswordVisiblity = () => {
    //     setPasswordShown(passwordShown ? false : true);
    //   };

    useEffect(() => {
        //sendotp()
    }, []);


    async function sendotp(){

        let response = await apiCall("profile/sendotponmobileloggedin","POST",'', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Mobile Number Does not exists");
            return;
        }else if (response.status === 200){

             successToast("Success","OTP sent to your mobile please check")
            setOpen(true)
        }

    }

    // async function resendotp(){
    //
    //     let response = await apiCall("profile/resendotponmobileloggedin","POST",'', history)
    //     // // console.log("apicalled",response)
    //     if (response.status !== 200) {
    //         errorToast("Invalid", "Mobile Number Does not exists");
    //         return;
    //     }else if (response.status === 200){
    //
    //         successToast("Success","OTP sent to your mobile please check")
    //
    //         // setOpen(true)
    //     }
    //
    // }

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

    const [passwordValidationChecks, setPasswordValidationChecks] = useState({
        isConfirmPasswordSameAsPassword: false,
        doesContainMinimumCharacter: true,
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
        sendotp()

    }
    const askForOtp=()=>{
       sendotp()
    }
    


    return (
        <div className="reset_password_mobile-verification reset_password_card">
            {/* <div className="reset_password_header text-center">
            <img src={logo} width="150" className=""/>
            </div> */}
            {/* <img src={backButton} className="back-button"/> */}
            <div className ="reset_password_container">
            <div className="d-flex justify-content-start">
                <div>
                <img src={passwordImg} width="70" height="70"/>                
                </div>
            </div>
            {/* <img src={passwordImg} className="main-image"/> */}
            
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 change-password-div px-4">
                    <p className="reset_password_heading mt-3"><b>Change Password</b></p>
                    <form className="reset_password_form w-100">
                    
                        
                        <label>
                            New Password *
                        </label>

                        {showNewpass ?<VisibilityIcon onClick={showNewPassword} className="reset_password_eyeimg_newpass"/>:<VisibilityOffIcon onClick={showNewPassword} className="reset_password_eyeimg_newpass"/>
                        }

                        <input className="reset_password_input" type={passwordShown ? "text" : "password"} name="password"
                            onChange={(e) => {
                                validatePassword(e.target.value, confirmPassword)
                                setPassword(e.target.value)
                            }}
                            value={password} />
                        
                        {/*<label>*/}
                        {/*    New Password **/}
                        {/*</label>*/}
                        {/*<input className="reset_password_input" type="password" name="confirmPassword" */}
                        {/*    onChange={(e) => {*/}
                        {/*        validatePassword(password, e.target.value)*/}
                        {/*        setConfirmPassword(e.target.value)*/}
                        {/*    }} */}
                        {/*    value={confirmPassword} />*/}

                        <label>
                            Confirm New Password *
                        </label>

                        {showPass ?<VisibilityIcon onClick={showPassword} className="reset_password_eyeimg_confirmpass"/>:<VisibilityOffIcon onClick={showPassword} className="reset_password_eyeimg_confirmpass"/>
                        }
                        <input className="reset_password_input" type={newpasswordShown ? "text" : "password"} name="confirmPassword" 
                            onChange={(e) => {
                                validatePassword(password, e.target.value)
                                setConfirmPassword(e.target.value)
                            }} 
                            value={confirmPassword} />
                        {/*<label>*/}
                        {/*    Enter OTP **/}
                        {/*</label>*/}

                        {/*<input type="text" className="reset_password_input"*/}
                        {/*    onChange={(e) => {*/}
                        {/*        // validatePassword(e.target.value, otp)*/}
                        {/*        setOtp(e.target.value)*/}
                        {/*    }}*/}
                        {/*    value={otp}*/}
                        {/*/>*/}

                {/* <p className="p-2 m-4 text-small">If you didn’t receive a codeaa! <span style={{cursor:"pointer"}} onClick={resendotp}><b>Resend Code</b></span></p> */}
                          {!isLoadingbtn && (
                              <>
                                  <br/>
                             <input className="reset_password_input" type="submit" value="Update" disabled={!( password && confirmPassword)} className="cancel-button" onClick={(e) => { Reset(e)}} style={{cursor:"pointer"}}
                              />
                            {/*<div className="d-flex justify-content-end my-4">*/}
                            {/*    <Buttons.SecondaryButton value="Cancel" style={{ width: "30%",marginRight:"20px"}} />*/}
                            {/*    <Buttons.PrimaryButton value="Update" style={{ width: "30%"}} onClick={askForOtp}/>*/}
                            {/*</div>                         */}
                            
                              </>                              
                                
                            )}
                            {isLoadingbtn && (
                                <Loadbutton />
                            )}
                    </form>

                    </div>
                    <div className="col-md-6 px-3">
                    <p className="reset_password_heading"><b>Password Requirements</b></p>
                    <div>
                            <div className="reset_password_validation-item">
                                <img className="reset_password_validation-item-img" src={passwordValidationChecks.doesContainMinimumCharacter ? smallGreenCheck : smallRedCross}/>
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

                    </div>
            
                    </div>
                    </div>
            <Dialog
                style={{height:"100vh"}}
                open={open}
                onClose={() => { setOpen(false) }}
            >

                <MobileVerification type={type}
                                    closeMobileVerification1={closeMobileVerification}
                                    callbackfunc={callbackfunc} confirmPassword={confirmPassword}
                />
            </Dialog>


         </div>)
}

export default ResetPassword
