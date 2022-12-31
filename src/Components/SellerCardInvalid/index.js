import React from "react";
import "./sellerCard.css"
import HDFC from "./hdfc.svg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
let SellerCard = (props) => {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;

    return (
        <>
        <div className={props.values.communicationStatus != "accepted" ?"seller-card seller-card-invalid": "seller_card_rejected"}>
            <div className="d-flex align-items-center justify-content-end">
                <MoreHorizIcon className="text-default cursor-pointer" style={{width:"30px", height:"25px"}} />
            </div>
            <div className="seller_card_Company_logo"> <img src={selectedTradeOngoingTxn.companyLogo} width={20} /> </div>
            <div className="seller_card_first_row d-flex">
                <p className="m-0">{selectedTradeOngoingTxn.companyName}</p>
                <h6 className="m-0 text-dark mr-2"><b>{props.values.offeredQuantity}s</b></h6>
            </div>
            {/*<div className="seller-card-desc mt-3 d-flex justify-content-between">*/}
            {/*    <p className="m-0">Quantity</p>*/}
            {/*    <p className="price m-0">₹ {props.values.offeredQuantity}</p>*/}
            {/*</div>*/}
            <div className="seller-card-desc mt-3 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {props.values.offeredPrice}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ {props.values.sellerFinalTransactionFee} </p>
            </div>
            {/*<div className="seller-card-desc d-flex justify-content-between">*/}
            {/*    <p className="m-0">Transaction Fees Discount<br/><span style={{fontSize:"10px"}}>*Including GST</span></p>*/}
            {/*    <p className="price m-0">₹ {props.values.sellerFinalTransactionFeeDiscount} </p>*/}
            {/*</div>*/}
            <div className="Sellercard_horizontal_line"> </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="seller-proposed_amt m-0">Proposed Amount</p>
                <p className="seller-proposed-amt-in-numbers m-0">₹ {props.values.offeredQuantity * props.values.offeredPrice}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="user-comment text-small">*User Comment</p>
                <p className="user-message text-small">{props.values.message}</p>
            </div>
        </div>
        </>
    )
}
export default SellerCard

