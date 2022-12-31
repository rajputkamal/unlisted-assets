import React from 'react'
import backButton from "../back_button.png"
import logo from "../logo.png"
import forgotImg from "./forgot_user_id.png"
import "./forgotuserid.css"
import {
    errorToast, successToast,
  } from "../../../../src/Components/Toast/index";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {BrowserRouter as Router,useHistory} from "react-router-dom";

let ForgotUserId = () =>{
    let history = useHistory();
    const [forgotID,setForgotID]=React.useState()
    
    // const Continue = async function(event){
    //     event.preventDefault();
    // if (Number(forgotID) && forgotID.length === 10){
    //
    //     let response = await apiCall1("sendotponmobileNotloggedin/"+forgotID,
    //         {method:"POST"}, '', history)
    //
    // console.log("apicalled",response)
    //         if (response.status !== 200) {
    //             errorToast("Invalid", "Mobile no Does not exists");
    //             return;
    //         }else if (response.status === 200){
    //             successToast("Success","OTP Sent to your mobile, please check")
    //        }
    //         }
    // }

    let Continue1 = async function(event){

        event.preventDefault()


try {
        let response = await apiCall("profile/resettinguseridnotloggedinotpmobile",
            "POST",{"emailId" : forgotID}, history)

        // console.log("apicalled",response)
        // console.log("apicalled1",response.status)
        if (response.status !== 200) {
            errorToast("Invalid", "Email ID Does not exists");
            return;
        }else if (response.status === 200){
            successToast("Success","Email sent to your mail ID, please check")
        }}
catch (error) {
        // console.log("error", error);
        console.error(error);
        errorToast("Invalid", "Internet or Service is down, try after some time...");
        // setLoadingbutton(false);
    }
    }


    return (
        <div className = "forgotuser">
        <img src={logo} className="unlisted-assests-logo-header"/>
        <div className="horizontal-line" />

        <img src={backButton} className="back-button" onClick={()=>{history.push("/login")}} />

            <div className = "main-content">
                <img src={forgotImg} className="forget-logo" />
                <div className = "content-text">
                    <p className = "heading">Forgot your user ID?</p>
                    <p>Enter your email address and we'll providing you user ID.</p> 
                </div>
                <form>
                    <label>Email *</label>
                    <input type = "text" onChange={(e)=>setForgotID(e.target.value)} value={forgotID}/>
                    <input type = "submit" style={{cursor:"pointer"}} onClick={Continue1} value ="Continue" className = "submit-button"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotUserId