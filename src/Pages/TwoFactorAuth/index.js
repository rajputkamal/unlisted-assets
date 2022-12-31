import React, { useState, useRef } from "react";
import logo from "../logo.png"
import "./twofactorauth.css"
import backButton from "../back_button.png"
import twoFactorMainImage from "./two_factor_auth.png"
import { Link } from "react-router-dom";


let TwoFactorAuth = () => {

    const otpArrayRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const [otpArray, setOtpArray] = useState(["", "", "", ""])

    const otpOnChangeHandler = (index, element) => {
        let valueToChange = element.target.value

        if(!(/[0-9]/.exec(valueToChange)))
            return

        let otpArrayClone = [...otpArray]
        otpArrayClone[index] = valueToChange
        setOtpArray(otpArrayClone)

        if(valueToChange === "")
            return

        if(otpArrayRefs.length > index+1)
            otpArrayRefs[index+1].current.focus()
    }

    let inputArrayBoxes = otpArrayRefs.map((ref, index) => {
        return <input type="textbox" 
            maxlength={1} 
            autoComplete="none" 
            value={otpArray[index]} 
            onChange={(e) => otpOnChangeHandler(index, e)}
            ref={ref}
            />
    })

    return (
        <div className="TFA_mobile-verification">
            <div>
                <img src={logo} className="unlisted-assests-logo-header"/>
                <div className="horizontal-line" />
                <img src={backButton} className="back-button"/>
            </div>
            

            <div className="TFA_main-content">
                <img src={twoFactorMainImage} className="TFA_main-image"/>
                <p className="TFA_heading">Mobile verification</p>
                <p className="TFA_description">A verification code has been sent to your
                    mobile number. Please add
                    your code here.
                </p>
                <form>
                    <div className="TFA_otp-boxes-group">
                        {inputArrayBoxes}
                    </div>
                    <div className="TFA_submit-container">
                        <input type="submit" value="Verify" className="TFA_submit-button" />
                    </div>
                </form>

                <div className="TFA_post-script-container">
                    <p>If you didn’t receive a code! <Link to="">Resend Code</Link></p>
                </div>
            </div>

            <div className="TFA_dummy-div"/>
        </div>
    )
}

export default TwoFactorAuth
