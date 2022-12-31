import React, { useState, useRef } from "react";
import logo from "../logo.png"
import backButton from "../back_button.png"
import mobileVerificationMainImage from "./mobile_verification.png"
import { Link, useHistory } from "react-router-dom";
import "./mobileVerification.css";
import {
    successToast,errorToast
  } from "../../../src/Components/Toast/index";
import { apiCall, clearAccessToken} from "../../Utils/Network";
import { PinDropSharp } from "@material-ui/icons";
import Buttons from "../../Components/Buttons/index";
import styled from 'styled-components'




let MobileVerification = (props) => { 

    let history = useHistory();

    // console.log("aaaaaaaaaaaaaaa1")

    const maskMobile = (mobile) => {
        try {
            let maskedMobile = "xxxxxxx" +mobile.substring(7);

            return maskedMobile
        } catch (e) {
            return "xxxxxxxxxx"
        }
        return "xxxxxxxxxx"
    }
    const [mobilenumbermasked, setmobilenumbermasked] = useState("")

    const otpArrayRefs1 = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    const otpArrayRefs2 = [useRef(null), useRef(null), useRef(null), useRef(null)]

    let otpArrayRefs = []
    if(props.type === "aadharLinkage") {
        otpArrayRefs = otpArrayRefs1
    } else {
        otpArrayRefs = otpArrayRefs2
    }
    const [otpArray, setOtpArray] = useState(["", "", "", "","",""])

    const [counter, setCounter] = React.useState(59);
    React.useEffect(() => {
        if(props.mobilenumber != undefined && props.mobilenumber != "" ) {
            setmobilenumbermasked(maskMobile(props.mobilenumber))
        } else {
            setmobilenumbermasked(maskMobile("9912160777"))
        }

        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const otpOnChangeHandler = (index, element) => {
        let valueToChange = element

       if(!(/[0-9]/.exec(valueToChange))) {
           // alert("a4"+valueToChange)
            return;
        }

        let otpArrayClone = [...otpArray]

        otpArrayClone[index] = valueToChange
        // alert("a5"+valueToChange)
        setOtpArray(otpArrayClone)

        if(valueToChange === "")
            return
        // alert("a6"+index)
        if(otpArrayRefs.length > index+1)
            otpArrayRefs[index+1].current.focus()
    }

    const otpOnKeyPressHandler = (index, e) => {

        let key = e.key

        // alert("a5"+key)
        // alert("a6"+e.target.value)


        if (key === "Backspace" || key === "Delete") {

            let otpArrayClone = [...otpArray]
            otpArrayClone[index] = ""
            setOtpArray(otpArrayClone)

            if((index-1) >=0)
                otpArrayRefs[index-1].current.focus()
        } else {


            otpOnChangeHandler(index, e.target.value)
        }
   }

    let inputArrayBoxes = otpArrayRefs.map((ref, index) => {
        return <input type="number"
            maxlength={1}
            autoComplete="none"
            value={otpArray[index]}
            onChange={(e) => otpOnKeyPressHandler(index, e)}
            ref={ref}
            />
    })
    const verifyMobileOTP = async function(){

            if(props.type === "mobile"){
        let response = await apiCall("profile/verifymobilenumberloggedinotp/"+otpArray.join(''),"POST",'', history)
          // console.log("apicalled",response)
                  if (response.status !== 200) {
                      errorToast("Invalid", "OTP Invalid");
                      setOtpArray(["", "", "", "","",""]);
                      return;
                  }else if (response.status === 200){

                    successToast("Success","Mobile verified Successfully!")
                      props.closeMobileVerification1();
                      props.callbackfunc();
                    return
                  }
                }else if(props.type === "email"){
                    let response = await apiCall("profile/verifyemailloggedinotp/"+otpArray.join(''),"POST",'', history)
                    // console.log("apicalled",response)
                            if (response.status !== 200) {
                                errorToast("Invalid", "OTP Invalid");
                                return;
                            }else if (response.status === 200){

                              successToast("Success","Mail verified Successfully!")
                              return
                            }

                } else if(props.type === "aadharsign") {
                    let response = await apiCall("tradeagreement/aadharagreementsign1/"+props.agreementId+"/otp/"+otpArray.join(''),"POST",'', history)

                    // console.log("apicalled11",response+response.status)

                    if (response.status !== 200) {
                        errorToast("Invalid", "OTP Invalid");
                        setOtpArray(["", "", "", "","",""]);
                        return;
                    }else if (response.status === 200){

                        successToast("Success","Agreement successfully signed!")
                        props.closeMobileVerification1();
                        props.callbackfunc();
                        return
                    }
            } else if(props.type === "aadharLinkage") {
                let response = await apiCall("useronboarding/accountonboarding/aadharlinkage/"+otpArray.join(''),"POST",'', history)

                if (response.status !== 200) {
                    errorToast("Invalid", "OTP Invalid");
                    setOtpArray(["", "", "", "","",""]);
                    return;
                }else if (response.status === 200){

                    let isSuccess = await response.text();
                    if ( isSuccess == "true") {
                        successToast("Success","Aadhar is linked - confirmed!")
                        props.closeMobileVerification1("success");
                    } else {
                        // errorToast("Invalid", "Coud not process, try again");
                        props.closeMobileVerification1("failed");
                    }

                    //props.callbackfunc();
                    return
                }
            }else if(props.type === "resetpasswordfirsttime") {

                const response = await apiCall("profile/resetpasswordfirsttime/"+otpArray.join('')+"/"+props.confirmPassword,
                    "PUT",'', history)
                // console.log("apicalled",response)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                if (response.status !== 200) {
                    errorToast("Invalid", "Password Not Changed! OTP is invalid");
                    setOtpArray(["", "", "", "","",""]);
                    return;
                }else if (response.status === 200){


                    response.text().then(data=>
                    {

                        let isSuccess = data

                        if ( isSuccess == "true") {
                            successToast("Success","Password Changed Successfully!, please login again")
                            props.closeMobileVerification1();
                            clearAccessToken()
                            history.replace("/login")
                        } else {
                            errorToast("Invalid","Password cannot be the same as last one!")
                            props.closeMobileVerification1();
                        }

                    } );


                }
            }else if(props.type === "resetpasswordfirsttimenotloggedin") {

                const response = await apiCall("profile/resetpasswordfirsttimenotloggedin/"+props.mobilenumber+"/"+otpArray.join('')+"/"+props.confirmPassword,
                    "PUT",'', history)
                // console.log("apicalled",response)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                if (response.status !== 200) {
                    errorToast("Invalid", "Password Not Changed! OTP is invalid");
                    setOtpArray(["", "", "", "","",""]);
                    return;
                }else if (response.status === 200){


                    response.text().then(data=>
                    {

                        let isSuccess = data

                        if ( isSuccess == "true") {
                            successToast("Success","Password Changed Successfully!, please login again")
                            props.closeMobileVerification1();
                            clearAccessToken()
                            history.replace("/login")
                        } else {
                            errorToast("Invalid","Password cannot be the same as last one!")
                            props.closeMobileVerification1();
                        }

                    } );


                }
            }else if(props.type === "resetpassword") {

                const response = await apiCall("profile/resetpasswordloggedinmobile/"+otpArray.join('')+"/"+props.confirmPassword+"/"+props.oldPassword,
                    "PUT",'', history)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                // console.log("apicalled",response)
                if (response.status == 417) {
                    errorToast("Invalid", "Old Password Not Matched!, please enter the correct one");
                    setOtpArray(["", "", "", "","",""]);
                    props.closeMobileVerification1();
                    return;
                }
                else if (response.status !== 200) {
                    errorToast("Invalid", "Password Not Changed! OTP is invalid");
                    setOtpArray(["", "", "", "","",""]);
                    return;
                }else if (response.status === 200){

                    response.text().then(data=>
                    {

                        let isSuccess = data

                        if ( isSuccess == "true") {
                            successToast("Success","Password Changed Successfully!, please login again")
                            props.closeMobileVerification1();
                            clearAccessToken()
                            history.replace("/login")
                        } else {
                            errorToast("Invalid","Password cannot be the same as last one!")
                            props.closeMobileVerification1();
                        }

                    } );
                }
            }else if(props.type === "resetpasswordnotloggedin") {

                const response = await apiCall("profile/resettingpasswordnotloggedinotpmobile/"+props.confirmPassword+"/"+props.mobilenumber+"/"+otpArray.join(''),
                    "POST",'', history)
                // console.log("apicalled11",response)
                if(response.status == undefined) {
                    // errorToast("Invalid", "Invalid User ID or password");
                    return
                }
                if (response.status !== 200) {
                    errorToast("Invalid", "Password Not Changed! OTP is invalid");
                    setOtpArray(["", "", "", "","",""]);
                    return;
                }else if (response.status === 200){


                    response.text().then(data=>
                    {

                        let isSuccess = data

                        if ( isSuccess == "true") {
                            successToast("Success","Password set Successfully!, please login")
                            props.closeMobileVerification1();
                            clearAccessToken()
                            history.replace("/login")
                        } else {
                            errorToast("Invalid","Password cannot be the same as last one!")
                            props.closeMobileVerification1();
                        }

                    } );
                }
            }

    }
    const mobileVerifyResend = async function(e){
        e.preventDefault()
        setCounter(59)
        if (props.type === 'mobile' || props.type === 'aadharsign' || props.type === 'resetpassword' || props.type === "resetpasswordfirsttime"
        ){
        let response = await apiCall("profile/resendotponmobileloggedin/","POST",'', history)
          // console.log("apicalled",response)
                  if (response.status !== 200) {
                      errorToast("Invalid", "Mobile Number Does not exists");
                      return;
                  }else if (response.status === 200){
                      setOtpArray(["", "", "", "","",""]);
                    successToast("Success","OTP resent to your mobile please check")

                  }
         }else if (props.type === 'email'){
            let response = await apiCall("profile/sendotponemailloggedin","POST",'', history)
            // console.log("apicalled",response)
                    if (response.status !== 200) {
                        errorToast("Invalid", "Email ID Does not exists");

                        return;
                    }else if (response.status === 200){

                        successToast("Success","Email sent to your mail ID please check")

                    }
         }else if (props.type === 'aadharsign'){
            let response = await apiCall("profile/resendotponmobileloggedin/","POST",'', history)
            // console.log("apicalled",response)
            if (response.status !== 200) {

                errorToast("Invalid", "Mobile Number Does not exists");

                return;
            }else if (response.status === 200){
                setOtpArray(["", "", "", "","",""]);
                successToast("Success","OTP resent to your mobile please check")

            }
        }else if (props.type === 'aadharLinkage'){
            let response = await apiCall("profile/resendotponmobileloggedin/","POST",'', history)
            // console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Mobile Number Does not exists");

                return;
            }else if (response.status === 200){
                setOtpArray(["", "", "", "","",""]);
                successToast("Success","OTP resent to your mobile please check")

            }
        }else if (props.type === 'resetpasswordnotloggedin' || props.type === "resetpasswordfirsttimenotloggedin"){
            let response = await apiCall("profile/resendotponmobilenotloggedin/"+props.mobilenumber,"POST",'', history)
            // console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Mobile Number Does not exists");

                return;
            }else if (response.status === 200){
                setOtpArray(["", "", "", ""]);
                successToast("Success","OTP resent to your mobile please check")

            }
        }

        }

        console.log("props.type", props.type)
    return (
        <div className="mobile-verification-createpassword">
            {/* <div>
                <img src={logo} className="unlisted-assests-logo-header"/>
                <div className="horizontal-line" />
                <img src={backButton} className="back-button"/>
            </div> */}


            <div className="mobile-verification_main-content">
                <img src={mobileVerificationMainImage} className="mobile-verification_main-image"/>
                <Title>OTP Sent To Your Mobile!</Title>
                {props.type === 'resetpasswordfirsttimenotloggedin' && <p className="mobile-verification_heading-createpassword">Mobile verification</p> }
                
                {props.type === 'mobile'?
                <p className="mobile-verification_heading-createpassword">Mobile verification</p>:props.type === 'email'?
                <p className="mobile-verification_heading-createpassword">Email verification</p>:null
            }
                <p className="mobile-verification_description p-2 text-small">A verification code has been sent to your mobile number {mobilenumbermasked} . Please add your code here.</p>
   
                    <div className="mobile-verification_otp-boxes-group d-flex justify-content-center">
                        {inputArrayBoxes}
                    </div>
                    <div className="mobile-verification_submit-container d-flex justify-content-center mt-4">
                        <Buttons.SecondaryButton value="Cancel" style={{marginRight:"10px", width:"100%"}} onClick={props.closeMobileVerification1}/>
                        <Buttons.PrimaryButton value="Verify" style={{ width:"100%"}} onClick={verifyMobileOTP}/>
                    </div>

                   
                {counter <= 0 ? <Link onClick={(e)=>mobileVerifyResend(e)} className="d-block mt-2"><b >Resend Code </b></Link> :  <p className="py-3 m-0 text-small">Didn’t receive a code? <b>Resend Code in {counter} sec</b></p>}

                <div >

                </div>
            </div>

            <div className="mobile-verification_dummy-div"/>
        </div>
    )
}

const Title = styled.h5`
margin-top: 10px;
@media (max-width: 600px) {
   margin-top: 0;
  }
`

export default MobileVerification
