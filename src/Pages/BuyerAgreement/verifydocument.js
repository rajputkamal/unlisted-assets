import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import verifydoc from "./verifydoc.png";
import download from "./download.svg"
import Aware from "./not.svg"
import righttick from "./righttick.png"
import file from "./file.png"
import "./buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import Greenright from "./Groupgreen right.png"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
export default function VerifyDocument (){
    const [showDialog,setShowDialog] = React.useState(false);

    return(<div style={{display:"flex",color: "#2E384D"}}>
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
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
            <h2 style={{color: "#721B65"}}>Verify Document</h2>
            </div>
            <div style={{marginRight:"10px"}}>
                    <p><pre>   UTR Number<br/>
                        <b>TNRT909876789</b></pre></p>
            </div>
            </div>
            <div className="buyeragreement_main">
            <div>
                <img src={verifydoc}/>
            </div>
            <div className="buyeragreement_main2" style={{display:"flex",justifyContent:"space-between"}}> 
                <div style={{width:"500px"}}>
                <div>
                        <div className="buyeragreement_sign_timer">
                            <h2> 05 : 30 : 00</h2>
                        </div>
                </div>
                </div>
                <div className="buyeragreement_aware">
                <img src={Aware}/>
                <p style={{marginLeft:"10px"}}><b>Note:</b> Verify Document within 24 hrs</p>
                </div>
                <div style={{display:"flex",border: "1px solid #CFCBCF",width: "363px",height: "139px",marginTop:"10px"}}>
                    <div style={{borderRight: "1px solid #CFCBCF",display:"flex",justifyContent:"center",alignItems:"center",padding:"10px"}}>
                            <img src={righttick}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <img src={file}/>
                        <p>TCS.pdf</p>
                        <p>4 mb</p>
                    </div>
                    <div className="buyeragreement_main download_agreement" style={{padding:"10px"}}>
                    <img src={download} /><p style={{marginLeft:"10px"}}>Download Agreement</p>
                    </div>
                    </div>
                </div>
                <div >
                    <Buttons.PrimaryButton value="Submit" style={{marginTop:"10px",marginLeft:"0px"}}
                    onClick={()=>setShowDialog(true)}
                    />
                </div>
                <Dialog   style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
                    open={showDialog}
                    onClose={() =>setShowDialog(false) }
                >
                        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                            <img src={Greenright} style={{marginTop:"20px"}}/>
                            <h2>Congratulations!</h2>
                            <p style={{margin:"30px"}}>Your transaction is successfully completed.You will receive an email to your registered mail id with the invoice attached.</p>
                            <DialogActions >
                    <Buttons.PrimaryButton  value="Ok" onClick={()=>setShowDialog(false)}  />                    
                    </DialogActions>
                        </div>               
                    
                </Dialog>
                </div>
                
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