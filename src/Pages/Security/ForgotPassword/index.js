import React from 'react'
import backButton from "../back_button.png"
import logo from "../logo.png"
import forgotImg from "./forgot_password_image.svg"
import "./forgotpassword.css"
import {
    errorToast, successToast,
  } from "../../../../src/Components/Toast/index";
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";
import ResetPasswordNotLogIn from '../../ResetPassword/resetpasswordnotlogin'
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"

let ForgotPassword = (props) =>{
    let history = useHistory();
    const [forgotID,setForgotID]=React.useState()
    
    const Continue = async function(event){
        event.preventDefault();
    // Number(forgotID)?
    // let response = await fetch("http://api1.unlistedassets.com//profile/forgotpasswordmobile/"+forgotID,
    // {method:"POST"})
    // console.log("apicalled",response)
    //         if (response.status !== 200) {
    //             errorToast("Invalid", "Email ID Does not exists");
    //             return;
    //         }else if (response.status === 200){
    //             successToast("Success","Email sent to your mail ID please check")
    //         }
    // :
try {
    history.push({pathname: "/resetpasswordnotlogin", state: {mobile: forgotID}})}
catch (error) {
    //console.log("error", error);
    console.error(error);
    errorToast("Invalid", "Internet or Service is down, try after some time...");
    // setLoadingbutton(false);
}
    
    
}
    return ( 
        <div className = "forgotpassword">
        <img src={logo} className="unlisted-assests-logo-header"/>
        <div className="horizontal-line" />
            <img src={backButton} className="back-button" onClick={()=>{history.push("/login")}} />
            <div className = "main-content login_Page_contents">
                <img src={forgotImg} className="forget-logo" />
                <div className = "content-text">
                    <p className = "heading">Forgot your Password?</p>
                    <p>Enter your Mobile Number and we'll send you an OTP to reset your password.</p> 
                </div>
                <form>
                    <label className='m-0'>Mobile Number *</label>
                    <input type = "text" onChange={(e)=>setForgotID(e.target.value)} value={forgotID} style={{border: '1px solid #CFCBCF', borderRadius: '4px'}}/>
                    <input type = "submit" style={{cursor:"pointer"}} onClick={Continue} value ="Continue" className = "submit-button w-100 m-0"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword