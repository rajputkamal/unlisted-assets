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

let PaymentSuccess = (props) => {
    let history = useHistory();

    return (
        <div className="mobile-verification">
            <div className="mobile-verification_main-content">
                <img src={SuccessIcon} className="mobile-verification_main-image"/>
                <h6 className="mt-3"><b>Payment successful</b></h6>
                <p className="mobile-verification_description p-4 text-small">
                  Seller will be notified to start the shares transfer
                  {/*Meanwhile, please finish the agreement.  */}
                </p>
                   
                    {/*<div className="mobile-verification_submit-container">*/}
                    {/*    <Buttons.PrimaryButton value="Go to transaction page " style={{ width:"100%"}} />*/}
                    {/*    <Buttons.SecondaryButton value="Continue transaction" style={{width:"100%", marginTop:"10px"}} />*/}
                    {/*</div>*/}
 {/*               <span className="text-small mt-3">*If you click continue, your money will be frozen for the*/}
 {/*duration of transaction </span>*/}
                <div >
                   
                </div>
            </div>

            <div className="mobile-verification_dummy-div"/>
        </div>
    )
}

export default PaymentSuccess
