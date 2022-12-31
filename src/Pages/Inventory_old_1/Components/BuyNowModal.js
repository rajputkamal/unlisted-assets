import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";

import './modal.scoped.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { successToast, errorToast } from "../../../Components/Toast/index";
import Select from "react-select";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Dialog from "@material-ui/core/Dialog";

import { apiCall, downloadurl } from '../../../Utils/Network';
import Buttons from "../../../Components/Buttons"
import closeIcon from "../../CommonAssets/cross.svg"
import Nologo from "../../CommonAssets/nologo.jpeg"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';

import IndustryIndicativePricingLogo from '../../CommonAssets/IndustryIndicativePricingLogo.svg'
import { getTransactionFee } from "../../../Utils/utils";
import OnboardingAlertDialog from "../../../Components/OnboardingVarificationDialogBox/OnboardingVarificationDialogBox";
import { AiOutlineClose } from "react-icons/ai";
import { numberFormat } from '../../../Utils/NumberFormat';

export default function TradeModal(props) {

    const [modalhide, setModalhide] = React.useState();
    // setModalhide(props.TradeModal)
    let history = useHistory()
    const [intrest_stock, setintrest_stock] = React.useState('To buy stocks')
    const [listings, setlistings] = React.useState([])
    const [holding, setholding] = React.useState([])
    const [trade, settrade] = React.useState(props.trade)
    const [company_Id, setcompany_Id] = React.useState(props.c_id)
    const [buyRequest, setBuyRequest] = React.useState(true)

    const [quantity, setQuantity] = React.useState(trade.qty);
    const [price, setPrice] = React.useState(props.trade.price);
    const [txnAmount, settxnAmount] = React.useState(0);
    const [txnFee, settxnFee] = React.useState(0);
    const [txnTotal, settxnTotal] = React.useState(0);
    const [isCampaign, setisCampaign] = React.useState(props.isCampaign);
    const [onboardingDialogue, setonboardingDialogue] = React.useState(false);

    React.useEffect(() => {
        // handleChangeStockavailablelisting("")
        initialCalculations()
    }, []);

    let closeonboardingDialogue = async () => {
        setonboardingDialogue(false)
    }

    let handleChangeStockavailablelisting = async (e) => {

        let response = await apiCall("trade/find/" + props.c_id, 'GET', '', history)
        //console.log(response ," modal response")
        let responseJSON = await response.json();
        //console.log(responseJSON ,"modal responseJSON 123")
        if (e.target != undefined) {
            setintrest_stock(e.target.value)
        }
        setlistings(responseJSON)
    };

    let handleChangeStockmyholding = async (e) => {

        let response1 = await apiCall("myholding/specificforacompany/" + props.c_id, 'GET', '', history)
        //console.log('ttttttt'+response1)
        let responseJSON1 = await response1.json();
        if (e.target != undefined) {
            setintrest_stock(e.target.value)
        }
        if (response1.status == 200) {
            setholding(responseJSON1)
        }
    };

    const CustomBuyRequest = () => {
        { buyRequest ? setBuyRequest(false) : setBuyRequest(true) }
    }

    const [checkbox1, setCheckbox1] = React.useState(false);
    const [checkbox2, setCheckbox2] = React.useState(false);
    const [loadingbutton, setLoadingbutton] = React.useState(false);
    const [selectbutton, setSelectbutton] = React.useState("");
    const [dialogPage, setDialogPage] = React.useState(false);
    const [closeModal, setCloseModal] = React.useState(false);
    const [openMoreDetails, setOpenMoreDetails] = React.useState(false);


    function hideModal(e) {
        props.hideModalCallBack();
        // setCloseModal(closeModal);
        // // if(props.tradeModal==true){
        // //     alert('ok')
        // // }
        // setModalhide(false);
        // console.log('closeModal', hidemodal);
    }

    const getQuantity = (e) => {


        setQuantity(e.target.value)
        settxnAmount((e.target.value) * (price))

        let totalAmountInvolved = e.target.value * price
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

    const initialCalculations = () => {


        settxnAmount((quantity) * (price))

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

    let createAgreement = async () => {

        let response = await apiCall("buynow/agreementcreation/" + trade.id + "/" + quantity, 'POST', '', history)
        //console.log(response ," modal response")
        let responseText = await response.text();

        // alert("selectedAggId"+responseText)

        return responseText
    };

    let checkISKYCCompleted = async () => {

        try {

            if(isCampaign == false) {
                buyNowStock()

                return
            }
            const responseprofile = await apiCall("useronboarding/accountonboarding", "GET", '', history);
            let responseprofileJSON = await responseprofile.json();

            if (responseprofileJSON != undefined
                && responseprofileJSON.uaVerifiedStatus == "Verified") {

                buyNowStock()
            } else {
                setonboardingDialogue(true);
                return
            }
        } catch (e) {
            setonboardingDialogue(true);
            return
        }
    }

    const buyNowStock = async () => {

        if (isInt(quantity)) {
            if (checkbox1  && checkbox2) {

                if (quantity != "") {

                    // alert(trade.qty+""+quantity)

                    if (parseInt(quantity) > 0 && (parseInt(quantity) <= parseInt(trade.qty))) {

                        if (parseInt(quantity) < parseInt(trade.minQtyAccepted)) {
                            errorToast("Invalid", "Quantity should be equal or more than the minimum Qty Accepted");
                        } else {

                            // if(parseInt(quantity) * parseInt(price) > parseInt(100000)) {
                            //     errorToast("Invalid", "Transaction value can not exceed 1 Lakh, please reduce the quantity");
                            //     return 
                            // }
                            let aggId = await createAgreement()
                            history.push({ pathname: "/payment-steps", state: { aggId: aggId, trade: trade,isCampaign: isCampaign } })
                        }
                    } else {
                        errorToast("Invalid", "Quantity should be less or equal to the available quantity");
                    }
                } else {
                    errorToast("Invalid", "Please enter required Qty...");
                }
            } else {
                errorToast("Invalid", "Please Check and agree with the Terms of Agreement...");
            }
        } else {
            errorToast("Invalid", "Entered Qty is invalid!");
        }

    }

    function isInt(n) {
        if (Number(n) == n && n % 1 == 0) {

            return true
        }
        return false
    }

    function isFloat(n) {
        if (Number(n) == n && n % 1 != 0) {

        }
    }

    function float2int(value) {
        return value | 0;
    }

    return (
        <>
            <div>
                <section className="modal-main trade-modal-main">
                    <div>   
                    <AiOutlineClose
                  className="closeBtnAddMoneyModal"
                  onClick={hideModal}
                />
                        <div className='modal-section-padding'>
                            {buyRequest && <>

                                <div className='row'>
                                    <div className='col-md-12 col-12 custom-buy-request-main'>
                                        <div class="">
                                            {trade.id == company_Id &&
                                                <div className="">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        {/* <div className='ArrowBackIos-Icon' onClick={CustomBuyRequest} ><ArrowBackIosIcon /></div> */}
                                                        {!isCampaign?
                                                        <h4 className="w-100 m-0 buynow_heading">
                                                            How many shares would you like to buy?</h4>:
                                                            <h4 className="w-100 m-0 buynow_heading">
                                                            Your one free OYO share checkout  Page !!</h4>}
                                                    </div>
                                                    <div className="trademodal-listing-img">
                                                        <img src={(trade.companyLogo == '') ? Nologo : trade.companyLogo} alt=" No Company Logo" />
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0 buynow_heading">{trade.companyName} </h6>
                                                        {/*<p className="m-0 text-small">Holding ID : HOLD{trade.id}</p>*/}
                                                        <p className="m-0 text-small">Hub ID: LIST{trade.id}</p>
                                                    </div>
                                                    <div className='row mt-3'>
                                                        <div className='col-md-4 col-6 mb-2'>
                                                            <p className="m-0 text-small">Quantity of Shares Available:</p>
                                                            <h6 className="m-0 buynow_heading">{trade.qty} </h6>
                                                        </div>
                                                        <div className='col-md-3 col-6 mb-2'>
                                                            <p className="m-0 text-small">Min Qty Accepted:</p>
                                                            <h6 className="m-0 buynow_heading">{trade.minQtyAccepted}</h6>
                                                        </div>

                                                        <div className='col-md-3 col-6 mb-2'>
                                                            <p className="m-0 text-small">Price per share:</p>
                                                            <h6 className="m-0 buynow_heading">{numberFormat(trade.price)}</h6>
                                                        </div>

                                                        {/*<div className='col-md-5 col-12 d-flex '>*/}
                                                        {/*    <div> <img src={IndustryIndicativePricingLogo} className="mr-2" /></div>*/}
                                                        {/*    <div>*/}
                                                        {/*        <p className="m-0 text-small">Industry Indicative Pricing</p>*/}
                                                        {/*        <h6 className="m-0 buynow_heading">₹120 - 140</h6>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                        <div className='col-md-2 col-12 px-0 mb-2'>
                                                            <p className="m-0 text-small buynow-modal-link" onClick={() => { openMoreDetails ? setOpenMoreDetails(false) : setOpenMoreDetails(true) }}>{openMoreDetails ? <>Less Details <KeyboardArrowUpIcon /></> : <>More Details <KeyboardArrowDownIcon /></>}</p>
                                                        </div>
                                                    </div>

                                                    {
                                                        openMoreDetails &&
                                                        <>
                                                            <div className='row'>
                                                                <div className='col-md-4 col-6 mb-2'>
                                                                    <p className="m-0 text-small">Sector:</p>
                                                                    <h6 className="m-0 buynow_heading2">{trade.sector} </h6>
                                                                </div>
                                                                <div className='col-md-3 col-6 mb-2 '>
                                                                    <p className="m-0 text-small">Share Type:</p>
                                                                    <h6 className="m-0 buynow_heading2">{trade.commodityName}</h6>
                                                                </div>
                                                                {/*<div className='col-md-3 col-6 mb-2'>*/}
                                                                {/*    <p className="m-0 text-small">Your ID:</p>*/}
                                                                {/*    <h6 className="m-0 buynow_heading2">{trade.onboardingAccountId}</h6>*/}
                                                                {/*</div>*/}
                                                                <div className='col-md-3 col-6 mb-2'>
                                                                    <p className="m-0 text-small">Seller ID:</p>
                                                                    <h6 className="m-0 buynow_heading2">{trade.onboardingAccountId}</h6>
                                                                </div>
                                                                <div className='col-md-2 col-6 mb-2 '>
                                                                    <p className="m-0 text-small">Last Edited:</p>
                                                                    <h6 className="m-0 buynow_heading2">{trade.updateDate}</h6>
                                                                </div>
                                                            </div>

                                                            <div className='row'>
                                                            <div className='col-md-12 col-12 mb-2'>
                                                                    <p className="m-0 text-small">Address:</p>
                                                                    <h6 className="m-0 buynow_heading2">{trade.onboardingAccountId} , Plot no. 242-243, AIHP Palms, Udyog Vihar Phase-IV, Gurgaon, Haryana, 122015</h6>
                                                                </div>
                                                                {/*<div className='col-md-3 col-6'>*/}
                                                                {/*    <p className="m-0 text-small">Your DP:</p>*/}
                                                                {/*    <h6 className="m-0 buynow_heading">NSDL </h6>*/}
                                                                {/*</div>*/}
                                                                {/*<div className='col-md-3 col-6'>*/}
                                                                {/*    <p className="m-0 text-small">Seller DP:</p>*/}
                                                                {/*    <h6 className="m-0 buynow_heading">CDSL</h6>*/}
                                                                {/*</div>*/}
                                                                {/* <div className='col-md-3 col-6 '>
                                                                    <p className="m-0 text-small">Last Edited:</p>
                                                                    <h6 className="m-0 buynow_heading">{trade.updateDate}</h6>
                                                                </div> */}
                                                            </div>

                                                        </>
                                                    }
                                                </div>}
                                        </div>
                                        <hr />
                                        <div className="defaul-px-0">
                                            <div className="my-2">
                                                <label className="text-small"> <sapn>Please enter the number of shares you want to buy*</sapn></label>
                                                {/* <input type="number" className="form-control service_input_box text-small" placeholder="shares qty" aria-label="Recipient's username" aria-describedby="button-addon2" value={quantity} onChange={(e) => (setQuantity(e.target.value), settxnAmount((e.target.value) * (price)))} /> */}

                                                <input type="number" min="1" step="1" oninput="validity.valid||(value='')"
                                                    className="form-control service_input_box text-small" placeholder="shares qty" aria-label="Recipient's username" aria-describedby="button-addon2" value={quantity} onChange={(e) => getQuantity(e)} />

                                            </div>
                                            <div className="my-2">
                                                <div className="checklist-form my-2">
                                                    <div class="custom-control custom-checkbox">
                                                        <div className="d-flex align-items-center mt-3">
                                                            <input type="checkbox" id="styled-checkbox-2" className="custom-control-input" onChange={e => setCheckbox1(e.target.checked)} />
                                                            <label class="custom-control-label text-small" for="styled-checkbox-2">I have read and accepted the 
                                                            <span className="buynow-modal-link"> <a href={downloadurl("myholding/downloaddisclaimeragreement/buynowtermsofuse")}><b> Terms of Use</b></a></span> and <span className="buynow-modal-link"><a href={downloadurl("myholding/downloaddisclaimeragreement/buynowtermsofsalepurchase")}><b>Sale Purchase Agreement</b></a></span>
                                                            </label> 
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <input type="checkbox" id="styled-checkbox-3" className="custom-control-input" onChange={e => setCheckbox2(e.target.checked)} />
                                                            <label class="custom-control-label text-small" for="styled-checkbox-3">I have read the 
                                                            <span className="buynow-modal-link"> <a href={downloadurl("myholding/downloaddisclaimeragreement/buynowdisclaimer")}><b>Disclaimer</b></a></span> and acknowledged the same.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className='row request-to-buy-button'>
                                                    <div className='col-md-3 col-12'></div>
                                                    <div className='col-md-9 col-12'>
                                                        {checkbox1 && checkbox2 && quantity &&

                                                            <div className="buynow-total-section">
                                                                <div className="d-flex justify-content-between">
                                                                    <label className="text-small">Qty x Price ({quantity && price !== 0 ? <span>{float2int(quantity)} x {price}</span> : null}) :</label>  <span className="text-small"> {numberFormat(txnAmount)}</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <label className="m-0 text-small">Convenience Fee*
                                                                        <Tooltip title={<>
                                                                            {/*<p className="mb-0">Transaction Fees (1% of TXN Amount) = ₹ {(txnAmount/100).toFixed(2)}</p>*/}
                                                                            <p className="mb-0">Convenience Fee (flat fee*) = ₹ {(txnFee).toFixed(2)}</p>
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
                                                                    <label className="m-0" style={{ color: "#721B65" }}><b>Total Amount</b>
                                                                        <Tooltip title={<p className="mb-0">Total Value of Purchase = {txnTotal.toFixed(2)}</p>}
                                                                            placement="right" arrow enterTouchDelay={0}>
                                                                            <ErrorOutlineRoundedIcon className="marketplace-infoicon" style={{ color: "#721B65" }} />
                                                                        </Tooltip>
                                                                    </label>
                                                                    {/* <span style={{ color: "#721B65" }}><b>₹ {txnTotal.toFixed(2)}</b></span> */}
                                                                    <span style={{ color: "#721B65" }}><b> {numberFormat(txnTotal)}</b></span>
                                                                </div>
                                                            </div>}
                                                    </div>
                                                    <div className='col-md-12 col-12'>

                                                        <div className=" row buynow-modal-button ">
                                                            <div className='col-md-6 col-12'>  
                                                            </div>
                                                            <div className='col-md-6 col-12 d-flex justify-content-end'>

                                                                <Buttons.SecondaryButton value="Back" style={{ width: "50%", marginRight: "5px" }} onClick={hideModal} />
                                                                {/* <Link to="/payment-steps"> */}
                                                                {/* <Buttons.PrimaryButton value={"Buy for ₹" + txnTotal.toFixed(2)} disabled={!(checkbox1 && quantity)} onClick={buyNowStock}/> */}
                                                                {(checkbox1 && checkbox2) ?<Buttons.PrimaryButton style={{ width: "50%" }} value={"Buy for ₹" + txnTotal.toFixed(2)} onClick={checkISKYCCompleted} /> :<Buttons.InactiveButton value={"Buy for ₹" + txnTotal.toFixed(2)} style={{width: '50%'}}/>}
                                                                
                                                                {/* </Link> */}




                                                                {/* {(checkbox1) ?
                                                                <Buttons.PrimaryButton value="Buy for ₹ 30,600.00" style={{ width: "50%" }} onClick={CustomBuyRequest} /> :
                                                                <Buttons.InactiveButton value="Buy for ₹ 30,600.00" style={{ width: "50%" }} />} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                </section>
            </div >
            {isCampaign ? <OnboardingAlertDialog isCampaign={isCampaign} dialogPage={onboardingDialogue} onClose={closeonboardingDialogue} />
            : null}
        </>
    )

}