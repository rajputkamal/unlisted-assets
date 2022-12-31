import React from "react";
import "./buyeragreementlefthalf.scoped.css";
import HDFC from "./Framehdfc.png"
import More from "./company.svg"
import Aware from "./not.svg"
import seemore from "./seemore-details.svg";
import aadhar from "../../Pages/BuyerAgreement/aadhar.svg";
import download from "../../Pages/BuyerAgreement/download.svg"
import "../../Pages/BuyerAgreement/buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import MobileVerification from "../../Pages/MobileVerification";
import Dialog from '@material-ui/core/Dialog';
import {
    BrowserRouter as Router,
    useLocation
} from "react-router-dom";

let BuyerAgreementLeftHalf = (props) => {

    const [showDialog,setShowDialog] = React.useState(false);
    const [tradecommunication1,setTradeCommunication1] = React.useState([]);
    const location = useLocation();
    const selectedTrade = location.state.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    //console.log("pppppppppppppppp11"+selectedTrade.id+selectedOnGoingTxn.agreedQty)

    return(
        <div className="row TransactionDetail ">
            <div className="TransactionDetail-info col-md-12 col-12 order-md-1 order-2 ">
                <h6><b>Transaction Detail</b></h6>
                <div className="buyeragreement_transactionDetails">
                    <p className="buyeragreement_transactionDetails_leftside">Share/Price</p><p><b>₹ {selectedOnGoingTxn.agreedPrice}</b></p>
                </div>
                <div className="buyeragreement_transactionDetails">
                    <p>{selectedOnGoingTxn.agreedQty} x {selectedOnGoingTxn.agreedPrice}</p><p><b>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice}</b></p>
                </div>
                <div className="buyeragreement_transactionDetails">
                    <p>Transaction fee <br/><span style={{fontSize: "10px"}}>*Including GST</span></p><p><b>₹ 15.7</b></p>
                </div>
                <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total">
                    <p>Total</p><p>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice + 15.7}</p>
                </div>
            </div>

            <div className=" border-top pt-3 order-md-2 order-1 col-md-12 col-12">
                <div className="buyeragreement_transactionDetails">
                    <div className="d-flex">
                        <div className="company-logo d-flex align-items-center">
                            <img width="50" height="50" src={selectedOnGoingTxn.companyLogo}/>
                        </div>
                        <div className="px-1 company-info">
                            <p><b>{selectedOnGoingTxn.companyName}</b></p>
                            <p className="m-0">Banking</p>
                            <p className="m-0">INO98765456</p>
                        </div>
                    </div>
                    <div className="more">
                        <img src={More} width="20" className=" cursor-pointer"/>
                    </div>

                </div>
                <div className="buyeragreement_transactionDetails mt-3">
                    <div className="desc">
                        <p className="text-small">Date & Time</p>
                        <p className="text-small"><b>{selectedOnGoingTxn.updateDate}</b></p>
                    </div>
                    <div >
                        <p className="text-small">Share Type</p>
                        <p className="text-small"><b>{selectedOnGoingTxn.commodityName}</b></p>
                    </div>

                </div>
                <div className="buyeragreement_seemore desktop-none  text-center">
                    <img src={seemore} className="cursor-pointer w-50"/>
                </div>
            </div>
            <div className="col-md-12 col-12 order-2">
                <div className="buyeragreement_seemore mobi-none">
                    <img src={seemore} className="cursor-pointer w-50"/>
                </div>
                <div className="timing mobi-none mt-3">
                    <h6 className="text-center text-small">Time Remaining For transaction</h6>
                    <div className="buyeragreement_Timer mt-3">
                        <h4 className="m-0 pt-2 pb-2">40h : 30mins</h4>
                    </div>
                </div>

                <div className="note mobi-none">
                    <div className="buyeragreement_aware ">
                        <img src={Aware} className="mr-2"/>
                        <p >
                            If not completed after 48 hours from start, this transaction will restart with
                            new agreement sigining automatically.
                            Additional charges are applicable immediately <br/><b className="buyeragreement_readmore">Read more.</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-12 order-3">
                <div className="adaharbased-sec desktop-none">
                    <h6 className="mt-3 " style={{color: "#721B65"}}><b>Aadhar Based Agreement</b></h6>
                    <div className="d-flex aadhar-based">
                        <div className="p-2">
                            <img src={aadhar} className="Adhar-asset" width="150" />
                        </div>
                        <div className="p-2">
                            <div className="mt-3">
                                <p>In this agreement you have to add your Aadhar card and automatically agreement will be sign.</p>
                                <div className="buyeragreement_main download_agreement">
                                    <img src={download} />
                                    <p className="ml-2 mb-0">Download Agreement</p>
                                </div>
                            </div>
                            <div className="signup-timer mt-5">
                                <p className="m-0"><b>Sign Agreement Within</b>
                                </p>
                                <div className="buyeragreement_sign_timer">
                                    <h2 className="m-0 pt-1 pb-1"> 05 : 30 : 00</h2>
                                </div>
                            </div>
                            <div className="adharnumber mt-3">
                                <p className="m-0"><b>Aadhar card Number</b>
                                </p>
                                <input type="text" className="buyeragreement_aadhar_input" />
                            </div>
                            <div className="text-center">
                                <Buttons.PrimaryButton value="Submit" style={{width: "100%", marginTop: "30px"}} onClick={()=>setShowDialog(true)} /></div>
                        </div>
                        <Dialog open={showDialog} onClose={()=>{ setShowDialog(false) }} >
                            <MobileVerification/>
                        </Dialog>
                    </div>
                    <div className="buyeragreement_bottom p-4 mt-5 mobi-none">
                        <h6>What's going on?</h6>
                        <p className="text-small">Dear seller, shares to have been transferred to your demat account number xxxxxxx. Please verify and approve the transaction.</p>
                        <Buttons.PrimaryButton value="virtual account dashboard" style={{marginTop: "30px"}} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BuyerAgreementLeftHalf
