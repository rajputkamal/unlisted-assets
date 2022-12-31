import React from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./signagreement.css";
import SelectedAssest from "../../Components/SelectedAssest"
import TransactionDetail from "../../Components/TransactionDetail"
import SignedBy from "../../Components/SignedBy"
import aadhar from "./aadhar.svg"
import Buttons from "../../Components/Buttons"
import download from "./download.svg"
let SignAgreement = () => {
    return (
        <div className="signagreement_container">
            <Breadcrumbs/>
            <div className="sign_container">
                
            <div className="sign_ongoing"></div>
            <div className="sign_content_area">
                <div className="sign-agreement">
                <p className="sign_agreement_title">Sign Agreement</p>
                <div className="small_line"></div>
            </div>
            
            <SelectedAssest/>
                <div className="main_area">
                <div className="selectedassest">
                   <TransactionDetail/>
                   <div className="aadhar_container">
                       <p className="aadhar_area_title">Aadhar Based Agreement</p>
                       <div className="aadhar_image_container">
                            <div className="aadhar_image" >        <img src={aadhar}/>   </div>
                                <div>
                                    <p className="aadhar_sign_description">
                                        In this agreement you have to add your aadhar card and automatically
                                    agreement will be sign.
                                    </p>
                                    <p className="download_agreement"><img src={download}/> <span>Download Agreement</span></p>
                                </div>
                        </div>
                            <div className="agreement_sign_timer">
                               <span className="sign_timer">Sign Agreement within</span>
                               <div className="timer">
                                   <span>05</span><span>:</span><span>03</span><span>:</span><span>00</span>
                                </div>
                               
                            </div>
                            <div className="enter_aadhar_number">
                               <span>Aadhar card Number</span>
                               <input type="Text"></input>
                               <br></br>
                               <Buttons.PrimaryButton value="Submit" />
                            </div>
                   </div>
                </div>
                <div className="signedby_component">
                   <SignedBy/>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignAgreement