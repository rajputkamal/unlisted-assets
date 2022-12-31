import React, { useState, useRef } from "react";
import SuccessIcon from "./success.svg"
import { Link, useHistory } from "react-router-dom";
import "./SuccessPopup.css";
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";
import { apiCall } from "../../../Utils/Network";
import { PinDropSharp } from "@material-ui/icons";
import Buttons from "../../../Components/Buttons/index";


let MobileVerification1 = (props) => {

    let history = useHistory();

    return (
        <div className="mobile-verification">
            <div className="mobile-verification_main-content">
                <img src={SuccessIcon} className="mobile-verification_main-image"/>
                <h6 className="mt-3"><b>Thanks for the confirmation!</b></h6>
                <p className="mobile-verification_description p-2 text-small">
                    ...
                </p>

                <div className="mobile-verification_submit-container py-2">
                    {/*<Buttons.SecondaryButton value="View virtual account details" style={{width:"100%"}} />*/}
                    <Buttons.PrimaryButton value="Continue " style={{ width:"100%", marginTop:"10px"}} />
                </div>

                <div >

                </div>
            </div>

            <div className="mobile-verification_dummy-div"/>
        </div>
    )
}

export default MobileVerification1
