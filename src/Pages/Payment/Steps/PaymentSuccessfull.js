import React, { useState, useEffect } from "react";
import "./style.css";
import Buttons from "../../../Components/Buttons"
import { apiCall } from "../../../Utils/Network";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useHistory, useLocation } from "react-router-dom";
import { successToast, errorToast } from "../../../Components/Toast/index";
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

let PaymentSuccessfull = (props) => {
    let history = useHistory();


    const location = useLocation();
    let selectedAggId = location.state.aggId;

    const [paymentSuccess, setPaymentSuccess] = React.useState(false);
    const [paymentInprocess, setPaymentInprocess] = React.useState(false);
    const [aggId, setaggId] = useState(selectedAggId);
    const [orderStatusObject, setorderStatusObject] = useState({});
    const [orderPayUPIObject, setorderPayUPIObject] = useState({});
    const [enterUpiId, setEnterUpiId] = useState('');


    async function payUsingUPI(event) {
        event.preventDefault()

        const response = await apiCall("payment/order/checkout/upi/" + aggId + "/" + enterUpiId, "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        let responseJSON = await response.json();
        // // console.log("bbbbbbbb", responseJSON)

        if (response.status == 200) {
            setPaymentInprocess(true)
            setPaymentSuccess(false)

        }
        setorderPayUPIObject(responseJSON);
    }



    return (
        // <div className="container-fluid " id="BankVerification">
        <div className="row">
            <div className="col-md-12 col-12 px-3 paymentsuccessfull_main">
                <div className="">
                    <div className="row d-flex align-items-center mb-3">
                        <div className="col-md-6 col-6">
                            <h6 className="pb-0"> Payment Status</h6>
                        </div>
                        <div className="col-md-6 col-6">
                            <span className="custom-chip">
                                <Chip className="" icon={<DoneIcon />} label="Payment Successful" />
                            </span>
                        </div>
                    </div>
 
                    <div className="row d-flex align-items-center mb-3">
                        <div className="col-md-6 col-6">
                            <h6 className="pb-0">Transfer Share Status</h6>
                        </div>
                        <div className="col-md-6 col-6">
                        <span className="custom-Inprogress-chip">
                            <Chip className="" label="Transfer In Progress" />
                        </span>
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-3">
                        <div className="col-md-6 col-6">
                            <h6 className="pb-0">Transaction Status</h6>
                        </div>
                        <div className="col-md-6 col-6 d-flex justify-content-end">
                            <Link to="/ongoingtransaction">
                                <Buttons.SecondaryButton value="Track My Transaction" style={{ height: "35px" }}
                                /></Link>
                        </div>
                    </div>





                    {/* <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-2">Transfer Share Status</h6>
                        <span className="custom-Inprogress-chip">
                            <Chip className="" label="Transfer In Progress" />
                        </span>
                    </div> */}

                    {/*<div className="d-flex justify-content-between mb-2">*/}
                    {/*    <h6 className="mb-2">Do KYC</h6>*/}
                    {/*    <Buttons.PrimaryButton value="KYC" style={{ height: "35px" }} onClick={payUsingUPI} />*/}
                    {/*</div>*/}

                    {/* <div className="d-flex justify-content-between mb-2">
                        <h6 className="mb-2">Transaction Status</h6>
                        <Link to="/ongoingtransaction">
                            <Buttons.SecondaryButton value="Track My Transaction" style={{ height: "35px" }}
                            /></Link>
                    </div> */}
                </div>
            </div>
        </div>
        // </div>

    )
}
export default PaymentSuccessfull;