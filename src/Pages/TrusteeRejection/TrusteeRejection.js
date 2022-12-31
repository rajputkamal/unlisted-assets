import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import esign from "./esign.png";
import download from "./download.svg"
import cloud from "./cloud.svg"
import verifyDoc from "./verifydoc.png"
import "./trusteerejection.scoped.css"
import Buttons from "../../Components/Buttons";
// import AddVirtualAccount from "../VirtualAccount/virtualaccount";
// import BuyerVirtualAccount from "./buyervirtualaccount";

export default function TrusteeRejection (){
    return(<div style={{display:"flex",color: "#2E384D"}}>
        <div className="buyeragreement_left">
            <BuyerAgreementLeftHalf/>
        </div>

    <div style={{display:"flex",flexDirection:"column"}}>           
    
        <div className="buyeragreement_container" >
        
        <div className="buyeragreement_container1" style={{height:"70%"}}>
               
              <div>
           <div >
            <h2>Verification by Trustee</h2>
            </div>
            <div style={{borderBottom:"2px solid #721B65",width:"150px"}}></div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                <h2 style={{color: "#721B65"}}>Signature Mismatch</h2>
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
                    <p>Your signature did not match in this documents, please sign this form.</p>
                    <div className="buyeragreement_main download_agreement">
                    <img src={download} /><p style={{marginLeft:"10px"}}>Download Form</p>
                    </div>
                </div>
                <div className="buyeragreement_upload">
                    <img src={cloud} style={{marginRight:"10px"}}/>
                    <p>Drop file to Upload <br/>or <b>Browse</b></p>
                </div>
                <div >
                    <Buttons.PrimaryButton value="Upload" style={{marginTop:"10px",marginLeft:"0px"}}/>
                </div>
                </div>                
                </div> 


                 <div>
                <h2 style={{color: "#721B65"}}>Missing Document</h2>
                </div>  
                <div className="buyeragreement_main">
                    <div>
                        <img src={verifyDoc}/>
                    </div>
                    <div className="buyeragreement_main2"> 
                        <div >
                            <p>Your signature did not match in this documents, please sign this form.</p>
                            <div className="buyeragreement_main download_agreement">
                            <img src={download} /><p style={{marginLeft:"10px"}}>Download Form</p>
                            </div>
                        </div>
                        <div className="buyeragreement_upload">
                            <img src={cloud} style={{marginRight:"10px"}}/>
                            <p>Drop file to Upload <br/>or <b>Browse</b></p>
                        </div>
                        <div >
                            <Buttons.PrimaryButton value="Upload" style={{marginTop:"10px",marginLeft:"0px"}}/>
                        </div>
                    </div>                
                </div>
                
            </div>
            <BuyerAgreementRightHalf/>
            </div>
        
        
        </div>
        </div>
        </div> )
}