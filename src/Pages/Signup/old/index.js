import React, { useState } from "react";
import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import googleLogo from "./google_logo.png"
import { Link, useHistory } from "react-router-dom";
import "./signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from "../../Components/Toast/index"
import AlertDialog from "../../Components/DialogBox/dialogbox";
import { apiCall, setAccessToken } from "../../Utils/Network"
import Loadbutton from '../../Components/Loadbutton/Index';
import Buttons from "../../Components/Buttons";

let SignUp = () => {

    let history = useHistory();

    const [email, setEmail] = useState("")
    const [emailError,setEmailError] = useState("")
    const [showEmailError,setShowEmailError] = useState("")
    const [name, setName] = useState("")
    const [nameError,setNameError] = useState("")
    const [showNameError,setShowNameError] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phonenumberError,setPhoneNumberError] = useState('')
    const [showPhoneNumberError,setShowPhoneNumberError] = useState('')
    const [userAlreadyExistsError,setUserAlreadyExistsError] = useState('')
    const [showUserAlreadyExistsError,setShowUserAlreadyExistsError] = useState('')
    const [dialogPage, setDialogPage ] = useState(false);
    const [loadingbutton, setLoadingbutton] = React.useState(false);

    let InlineValidationName = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {nameError}
                </p>
            </div>
        )
    }

    let InlineValidationEmail = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {emailError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxPhoneNumber = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {phonenumberError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxUserAlreadyExists = () => {
    return (
        <div className="inline-validation-box">
            <p>
                {userAlreadyExistsError}
            </p>
        </div>)
}

    const clearValidationMessages = async () => {
        await setShowEmailError(false);
        await setEmailError('');

        await setShowNameError(false);
        await setNameError('');

        await setShowPhoneNumberError(false);
        await setPhoneNumberError('');

        await setShowUserAlreadyExistsError(false);
        await setUserAlreadyExistsError('');
    }

    const validate = async (field, errorMessage) => {
        // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearValidationMessages();
        switch (field) {
            case 'email':
                // console.log("hooooooooooooooooo1"+errorMessage)
                await setShowEmailError(true);
                await setEmailError(errorMessage);
                break;

            case 'mobile':
                // console.log("hooooooooooooooooo1"+errorMessage)
                await setShowPhoneNumberError(true);
                await setPhoneNumberError(errorMessage);
                break;

            case 'name':
                // console.log("hooooooooooooooooo1"+errorMessage)
                await setShowNameError(true);
                await setNameError(errorMessage);
                break;

            default:
                // console.log("hooooooooooooooooonijhibibibibib")

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingbutton(true);

        let requestBody = {
            "email": email,
            "mobile": phoneNumber,
            "name": name
        }
        // console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        // console.log("request body stringified", stringifiedRequestBody)

        try {
        let response = await apiCall(`profile/signup`, 'POST',requestBody, history)

        // let response = await fetch("http://api1.unlistedassets.com/profile/signup",
        //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
        // )

        setLoadingbutton(false);

        // console.log("response ", response)

        if (response.status === 409) {

            return
        } else if (response.status === 400) {
            
            let responseJSON = await response.json()
            let i = 0;
            const arrayerrormessages = responseJSON.details1;
            // console.log(arrayerrormessages)
            const listItems = arrayerrormessages.map((errorResponse) =>

                validate(errorResponse.field,errorResponse.errorMessage)
            );
            setLoadingbutton(false);

        } else if(response.status === 500) {
                setLoadingbutton(false);
                setShowUserAlreadyExistsError(true);
                setUserAlreadyExistsError("User already exists with the provided email or mobile...");
        }
        else if (response.status === 200) {
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
            setDialogPage(true);
        }
    } catch (error) {
        // console.log("error", error);
        console.error(error);
        errorToast("Invalid", "Internet or Service is down, try after some time...");
        setLoadingbutton(false);
    }
    }


const closeDialog=()=>{
     // console.log('aaaaaaa')
    setDialogPage(false)
};

return (
    <div className="SignUpPageContainer row mobile-flex-column-reverse">
        <div className="SignUp_page_left-half col-md-6 col-12">
            <div className="p-3">
                <div className="SignUp_page_main-image-container">
                    <img src={loginPageMainImage} className="SignUp_page_main-image" />
                </div>
                <h5 className="SignUp_page_heading mt-5">Your data is 100% secure <br/> with us</h5>
                {/* <p className="SignUp_page_heading">Your data 100% safe<br/> with us</p>  */}
            </div>
        </div>
        <div className="SignUp_page_right-half col-md-6 col-12">
            <div className="SignUp_page_contents">
                <div className="SignUp_page_logo-container">
                    <img src={logo} className="SignUp_page_logo" />
                </div>
                <h5 className="login_Page_heading mt-5">Create New Account</h5>

                { showUserAlreadyExistsError ? <InlineValidationBoxUserAlreadyExists/> : null}
                <form className="login-form w-100" onSubmit={handleSubmit}>
                    <label>
                        Email *
                    </label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    { showEmailError ? <InlineValidationEmail/> : null}
                    <label>
                        Mobile Number *
                    </label>
                    <div className="d-flex align-items-center pl-2 bg-white signup-mobile-input">
                        <span className="m-0 text-medium border-right pr-2">+91</span>
                        <input type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} size="38" style={{border:"none"}}/>
                    </div>
                    { showPhoneNumberError ? <InlineValidationBoxPhoneNumber/> : null}
                    <label>
                        Name (Full Name e.g Sachin Tendulkar) <br/>
                        as in your Aadhar Card) *
                    </label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                    { showNameError ? <InlineValidationName/> : null}

                    <AlertDialog dialogPage={dialogPage} onClose={closeDialog}/> 

                    {/* <input type="submit" value="Sign Up" className="submit-button text-white mt-4" /> */}

                    {
                  !loadingbutton && <Buttons.PrimaryButton value="Sign Up" className="login-submit-button mt-4"/>
                }
                 {
                  loadingbutton && <div className="mt-4">
                    <Loadbutton />
                  </div>
                  
                }
                    
                    {/* {
                  !loadingbutton && <button className="btn btn-primary-default mt-4"><b>Sign Up</b></button>
                }
                 {
                  loadingbutton && <div className="mt-4">
                    <Loadbutton />
                  </div>
                 
                } */}
                </form>

                <div class="login_Page_horizontal-line my-5" />

                <div className="SignUp_page_sign-up">
                    <p>Already have an account? <Link to="/Login">Login</Link></p>
                </div>
            </div>
        </div>
    </div>)
}

export default SignUp
