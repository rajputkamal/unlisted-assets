import React from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HDFC from "./hdfc.svg";
import './SellerCardListingUpdate.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";
import { getTransactionFee } from "../../Utils/utils";

let BuyerCard = (props) => {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;
    const [quantity,setQuantity]=React.useState(props.values.offeredQuantity);
    const [price,setPrice]=React.useState(props.values.offeredPrice);

    const [txnAmount,settxnAmount]=React.useState((props.values.offeredQuantity *
        props.values.offeredPrice));

    let totalAmountInvolved = txnAmount

    let transactionFee = 0


    transactionFee  = getTransactionFee(false, totalAmountInvolved)

    const [txnFee,settxnFee]=React.useState((transactionFee)+(.18*transactionFee));




    const [txnTotal,settxnTotal]=React.useState(txnAmount+txnFee);

    //console.log("props of buyer card111111", props.values.offerInValidReason)
    return (
        <div className={props.values.communicationStatus != "accepted" ? "buyer-card buyer-card-soldout": "buyer_card_accepted"}>
            <div className="seller-card-listingupdate-overlay">
                {props.values.offerInValidReason == "anotherOffer"? <p>invalid due to Counter Offer</p>
                :props.values.offerInValidReason == "SharesQuantityUpdated"?<p>invalid due to Updated Listing</p>
                : props.values.offerInValidReason == "timeCounter"?<p>invalid due to Time Out</p>
                : props.values.offerInValidReason == "invalided by self"?<p>invalid as cancelled by seller</p>
                : props.values.offerInValidReason == "offerRejected"?<p>invalid as rejected by buyer</p>
                                :<p>invalid due to some reason, contact admin</p>}
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
                    <h6 className="m-0 text-dark mr-2"><b>{quantity}</b></h6>
                </div>
            </div>
         
            <div className="buyer-card-desc mt-3 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {price}</p>
            </div>
            <div className="buyer-card-desc mt-3 d-flex justify-content-between">
                <p className="m-0">Proposed Amount</p>
                <p className="price m-0">₹ {txnAmount}</p>
            </div>
            <div className="buyer-card-desc  d-flex justify-content-between">
                <p className="text-small m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ {txnFee} </p>
            </div>

            <div className="Buyercard_horizontal_line"> </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-proposed_amt m-0 text-small">Total Amount</p>
                <p className="buyer-proposed-amt-in-numbers m-0 text-small">₹ {txnTotal}</p>
            </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-user-comment m-0">*User Comment</p>
                <p className="buyer-user-message m-0">{props.values.message}</p>
            </div>
        </div>
    )
}
export default BuyerCard