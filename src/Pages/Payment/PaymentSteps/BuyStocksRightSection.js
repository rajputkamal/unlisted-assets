import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import Nologo from "../../CommonAssets/nologo.jpeg";
import companyLogo from './companyLogo.png'
import HDFC_Bank_Logo from './HDFC_Bank_Logo.png'
import './paymentsteps.css';
import { apiCall } from "../../../Utils/Network";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory, useLocation
} from "react-router-dom";
import { getTransactionFee } from "../../../Utils/utils";
import { numberFormat } from '../../../Utils/NumberFormat';

export default function BuyStocksRightSection() {
    let history = useHistory()
    const location = useLocation();

    let selectedAggId = ""
    if(location.state !== undefined) {
        selectedAggId = location.state.aggId;
    } else {
        // alert("hiiiiiii")
    }

    const [aggId, setaggId] = useState(selectedAggId);


    const [details, setDetails] = useState({});
    const [trade, settrade] = useState(location.state.trade);
    const [agreement, setagreement] = useState({});

    const [quantity, setQuantity] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [txnAmount, settxnAmount] = React.useState(0);
    const [txnFee, settxnFee] = React.useState(0);
    const [txnTotal, settxnTotal] = React.useState(0);

    React.useEffect(async () => {
       getAggreement()

    }, []);


    async function getAggreement() {
        let response = await apiCall("tradeagreement/agreement/" + aggId, 'GET', '', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json()

        setagreement(responseJSON);


        setPrice(responseJSON.agreedPrice)
        setQuantity(responseJSON.agreedQuantity)

        // console.log("iiii"+responseJSON.agreedPrice+"fffffff"+responseJSON.agreedQuantity)

        getQuantity(responseJSON.agreedQuantity, responseJSON.agreedPrice)
    }

    async function getProfile() {
        const response = await apiCall("useronboarding/accountonboarding", "GET", '', history);
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        setDetails(responseJSON);
    }

    const getQuantity = (quantity,price) => {

        let totalAmountInvolved = quantity * price
        settxnAmount(totalAmountInvolved)

        let transactionFee = 0

        transactionFee  = getTransactionFee(true, totalAmountInvolved)


        // settxnFee((.01*txnAmount1)+(.18*(.01*txnAmount1)))
        settxnFee(transactionFee)

        // let total1 = txnAmount1
        // + (.01*txnAmount1)+(.18*(.01*txnAmount1))

        let total1 = totalAmountInvolved
            + transactionFee + (.18 * transactionFee)

        settxnTotal(total1)
    }


    // console.log("details", details)

    return (
        <>
            <div className='buystock-rightside-section'>
                <div >
                    <h6 className="">Transaction Summary</h6>
                    <div className="buystock_logo">
                        <img src={trade.companyLogo} className="img-fluid" />
                    </div>
                    <h6 className="">{trade.companyName}</h6>
                </div>
                <div className="buynow-total-section mt-4">
                    <div className="d-flex justify-content-between">
                        <label className="text-small">Price/Share:</label>  <span className="text-small">  {numberFormat(price)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <label className="text-small">Qty x Price ({quantity && price !== 0 ? <span>{quantity} x {price}</span> : null}) :</label>  <span className="text-small">  {numberFormat(txnAmount)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <label className="m-0 text-small">Convenience Fee*
                            <Tooltip title={<>
                                {/*<p className="mb-0">Transaction Fees (1% of TXN Amount) = ₹ {(txnAmount/100).toFixed(2)}</p>*/}
                                <p className="mb-0">Convenience Fees (flat fee*) = ₹ {(txnFee).toFixed(2)}</p>
                                <p className="mb-0">GST (18% of TXN Fee) = {((txnFee) * .18).toFixed(2)}</p>
                                <p className="mb-0">Total = {txnFee + (txnFee * .18)}</p>

                            </>}
                                placement="right" arrow enterTouchDelay={0}>
                                <ErrorOutlineRoundedIcon className="marketplace-infoicon" />
                            </Tooltip>
                        </label><span className="text-small">₹ {txnFee + (txnFee * .18)}</span>
                    </div>
                    <div className="my-0 text-small">
                        <label className="mb-0 ">Including GST </label>
                    </div>
                    <div className="d-flex justify-content-between totalamount-label">
                        <label className="m-0" style={{ color: "#721B65" }}><b>Grand Total</b>
                            <Tooltip title={<p className="mb-0">Total Value of Purchase = {txnTotal.toFixed(2)}</p>}
                                placement="right" arrow enterTouchDelay={0}>
                                <ErrorOutlineRoundedIcon className="marketplace-infoicon" style={{ color: "#721B65" }} />
                            </Tooltip>
                        </label><span style={{ color: "#721B65" }}><b> {numberFormat(txnTotal.toFixed(2))}</b></span>
                    </div>
                </div>
            </div>





        </>
    )
}
