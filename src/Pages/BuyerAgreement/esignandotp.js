import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import esign from "./esign.png";
import download from "./download.svg"
import "./buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import AddVirtualAccount from "../VirtualAccount/virtualaccount";
import BuyerVirtualAccount from "./buyervirtualaccount";
export default function EsignAndOtp (){
    return(<div style={{display:"flex",color: "#2E384D"}}>
        <div className="buyeragreement_left">
            <BuyerAgreementLeftHalf/>
        </div>

    <div style={{display:"flex",flexDirection:"column"}}>           
    
        <div className="buyeragreement_container" >
        
        <div className="buyeragreement_container1" style={{height:"70%"}}>
               
              <div>
           <div >
            <h2>Buyer Agreement Signup</h2>
            </div>
            <div style={{borderBottom:"2px solid #721B65",width:"150px"}}></div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                <h2 style={{color: "#721B65"}}>E-Sign and OTP Verification</h2>
                </div>
                <div className="buyeragreement_sign_timer" style={{width:"30%",marginRight:"10px"}}>
                    <h2> 05 : 30 : 00</h2>
                </div>
            </div>
            <div className="buyeragreement_main">
            <div>
                <img src={esign}/>
            </div>
            <div className="buyeragreement_main2"> 
                <div >
                    <p>Please type your name to esign on the box below and OTP verification.</p>
                    <div className="buyeragreement_main download_agreement">
                    <img src={download} /><p style={{marginLeft:"10px"}}>Download Agreement</p>
                    </div>
                </div>
                <div >
                    <Buttons.PrimaryButton value="E - Sign Agreement" style={{marginTop:"10px",marginLeft:"0px"}}/>
                </div>
                </div>
                
                </div> 
                   
            </div>
            <BuyerAgreementRightHalf/>
            </div>
        
        <div className="buyeragreement_bottom" style={{height:"25%"}}>
        <div>
        <h3>What's going on?</h3>
        <p >Buyer: The seller has signed the agreement please e-sign copy ot the agreement soon and verify the OTP.<br/>
            <br/>Please go ahead and transfer the required amount to your virtual account.
        </p>
        </div>
        <div>
            <Buttons.PrimaryButton value="Virtual Account Dashboard" style={{width:"50%",marginLeft:"0%"}}/>
        </div>
        </div> 
        </div>
        </div>
        </div> )
}