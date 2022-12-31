import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import aadhar from "./aadhar.svg";
import download from "./download.svg"
import "./buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import MobileVerification from "../MobileVerification";
import Dialog from '@material-ui/core/Dialog';

export default function BuyerAgreement (){
    const [showDialog,setShowDialog] = React.useState(false);
    return(
    <div className="BuyerAgreementSignup-Sec" style={{display:"flex",color: "#2E384D"}}>
        <div className="buyeragreement_left">
            <BuyerAgreementLeftHalf/>
        </div>

    <div style={{display:"flex",flexDirection:"column"}}>           
        <div className="buyeragreement_container">
        <div className="buyeragreement_container1" style={{height:"80%"}}>
               
            <div>
            <div >
            <h2>Buyer Agreement Signup</h2>
            </div>
            <div style={{borderBottom:"2px solid #721B65",width:"150px"}}></div>
            <h2 style={{color: "#721B65"}}>Aadhar Based Agreement</h2>
            <div className="buyeragreement_main">
            <div>
                <img src={aadhar}/>
            </div>
            <div className="buyeragreement_main2"> 
                <div >
                    <p>In this agreement you have to add your Aadhar card and automatically agreement will be sign.</p>
                    <div className="buyeragreement_main download_agreement">
                    <img src={download} /><p style={{marginLeft:"10px"}}>Download Agreement</p>
                    </div>
                </div>
                <div>
                        <p>Sign Agreement Within</p>
                        <div className="buyeragreement_sign_timer">
                            <h2> 05 : 30 : 00</h2>
                        </div>
                </div>
                <div>
                        <p>Aadhar card Number</p>
                        <input type="text" className="buyeragreement_aadhar_input"/>
                </div>
                <div >
                    <Buttons.PrimaryButton value="Submit"  style={{marginTop:"10px",marginLeft:"0px"}}
                    onClick={()=>setShowDialog(true)}
                    />
                </div>
                </div>
                <Dialog
                open={showDialog}
                onClose={() => { setShowDialog(false) }}
                >
                        <MobileVerification/>
                </Dialog>
                </div>
                   
            </div>
            <BuyerAgreementRightHalf/>
        </div>
        
        <div className="buyeragreement_bottom">
        <h3>What's going on?</h3>
        <p >Dear Buyer this transaction has been verified by us. Currently seller is signing the transaction agreement.Please download the agreement and upload the signed copy of the same.</p>
        </div>
        </div>
        </div>
        </div> )
}