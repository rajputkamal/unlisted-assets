import React from "react";
import "./card.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HDFC from "./hdfc.svg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";

let BuyerCard = (props) => {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;

    //console.log("props of buyer card", props.values)
    return (
        <div className={props.values.communicationStatus != "accepted" ? "buyer-card buyer-card-soldout" : "buyer_card_accepted"}>
            <div className="buyer-card-soldout-overlay">
                <p>Listing has been sold out</p>
            </div>
            <div className="d-flex align-items-center justify-content-end">
                <MoreHorizIcon className="text-default cursor-pointer" style={{width:"30px", height:"25px"}} />
            </div>
            <div className="d-flex justify-content-between">
                <div className="buyer_card_Company_logo d-flex"> 
                    <img src={selectedTradeOngoingTxn.companyLogo} width={20} />
                    <p className="m-0 ml-2"><b>{selectedTradeOngoingTxn.companyName}</b></p>
                </div>
                <div>
                    <h6 className="m-0 text-dark mr-2"><b>{props.values.offeredQuantity}</b></h6>
                </div>
            </div>
         
            <div className="buyer-card-desc mt-3 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {props.values.offeredPrice}</p>
            </div>
            <div className="buyer-card-desc  d-flex justify-content-between">
                <p className="text-small m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ {props.values.buyerFinalTransactionFee} </p>
            </div>
           
            <div className="Buyercard_horizontal_line"> </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-proposed_amt m-0 text-small">Proposed Amount</p>
                <p className="buyer-proposed-amt-in-numbers m-0 text-small">₹ {props.values.offeredQuantity * props.values.offeredPrice}</p>
            </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-user-comment m-0">*User Comment</p>
                <p className="buyer-user-message m-0">{props.values.message}</p>
            </div>
        </div>
    )
}
export default BuyerCard