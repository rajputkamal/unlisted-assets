
import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import esign from "./esign.png";
import download from "./download.svg"
import "./buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import cloud from "./cloud.svg"
export default function ManualSign (){
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
                <h2 style={{color: "#721B65"}}>Manual Sign</h2>
                </div>
                <div style={{marginRight:"10px"}}>
                    <p><pre>   UTR Number<br/>
                        <b>TNRT909876789</b></pre></p>
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
                <div>
                        <p>Sign Agreement Within</p>
                        <div className="buyeragreement_sign_timer" style={{width:"50%"}}>
                            <h2> 05 : 30 : 00</h2>
                        </div>
                </div>
                <div className="buyeragreement_upload">
                    <img src={cloud} style={{marginRight:"10px"}}/>
                    <p>Drop files to Upload <br/>or <b style={{color:"#721B65",cursor:"pointer"}}>Browse</b></p>
                </div>
                <div >
                    <Buttons.PrimaryButton value="Upload" style={{marginTop:"10px",marginLeft:"0px"}}/>
                </div>
                </div>
                
                </div>
                   
            </div>
            <BuyerAgreementRightHalf/>
            </div>
        
        <div className="buyeragreement_bottom" style={{height:"25%"}}>
        <div>
        <h3>What's going on?</h3>
        <p>Money has been received from the buyer into the virtual account.<br/>
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