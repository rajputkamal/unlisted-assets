import React, { useState } from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import SuccessPopup1 from "./SuccessPopup1";
import Vector from './Vector.svg';
import Dialog from '@material-ui/core/Dialog';
import { apiCall, apiCall1, setAccessToken } from "../../../Utils/Network";
import closeIcon from "../../../Pages/Companies/cross.svg";

import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import {
    successToast, errorToast
} from "../../../../src/Components/Toast/index";
import UploadIcon from './upload.png';
export default function SellerTradeTransferConfirmation(props) {

    let history = useHistory();
    const location = useLocation();
    const [showDialog, setShowDialog] = React.useState(false);
    const [agreement, setAgreement] = React.useState(props.agreement);
    // const selectedTrade = location.state.selectedTrade;
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [timerexpired, settimerexpired] = React.useState(false);

    React.useEffect(() => setPageTitle11(), [])
    const setPageTitle11 = async () => {

        // selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")

        // let response = await apiCall("tradeagreement/"+selectedOnGoingTxn.id, 'GET', '',history)
        // let responseJSON = await response.json()
        // setAgreement(responseJSON);
    }

    const [counterhour, setcounterhour] = React.useState(props.agreement.hoursLeft);
    const [counterminute, setcounterminute] = React.useState(props.agreement.minuteLeft);
    const [countersecond, setcountersecond] = React.useState(59);


    const [openDetailModal, setopenDetailModal] = React.useState(0);
    const [details, setDetails] = React.useState({});
    const [profileaddress, setProfileaddress] = React.useState({});
    const [riskProfile, setriskProfile] = React.useState({});
    const [bankDetails, setbankDetails] = React.useState({});
    const [dmatDetails, setdmatDetails] = React.useState({});
    const [paymentStatus, setpaymentStatus] = React.useState({});
    const [buyerdata, setBuyerData] = React.useState(false)
    const [accountIdBuyer, setaccountIdBuyer] = React.useState(agreement.id);




    console.log("agreement", agreement)



    // On file upload (click the upload button)
    let updateCompanyLogo = async (proof) => {

        const shareTrnsferProofForm = new FormData();

        // Update the formData object
        shareTrnsferProofForm.append(
            "file",
            proof
        );

        let response = await apiCall1("storage/uploadHoldingTransferProof/" + agreement.id, "POST", shareTrnsferProofForm, "")

        // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Some Problem Occured, try again or contact later!!");
            return;
        } else if (response.status === 200) {
            // setOpenPhotoModal(false)
            let picurl = await response.text()
            // setpic(picurl)
            successToast("Success", "Proof Uploaded Successfully!!")
        }
    };

    React.useEffect(() => {
    getPaymentStatus(agreement.id)
        const timer =
            countersecond > 0 && setInterval(() => {
                setcountersecond(countersecond - 1)

                if ((countersecond - 1) <= 0) {
                    setcountersecond(59)
                    setcounterminute(counterminute - 1)

                    if ((counterminute - 1) <= 0) {
                        setcounterminute(59)

                        setcounterhour(counterhour - 1)

                        if ((counterhour - 1) <= 0) {
                            settimerexpired(true)

                            setcountersecond(0)
                            setcounterminute(0)
                            setcounterhour(0)
                        }

                    }
                }

            }, 1000);
        return () => clearInterval(timer);
    }, [countersecond]);

    const [proof, setProof] = useState('');

    const isValidFileUploaded = (file) => {
        const validExtensions = ['png', 'jpeg', 'jpg', 'pdf']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    const handleOnFileChange = e => {
        if (e.target.files.length < 1) {
            return;
        }
        const file = e.target.files[0];
        const fsize = file.size;
        const file2 = Math.round((fsize / 1024));

        if (isValidFileUploaded(file) && (file2 <= 1024)) {
            updateCompanyLogo(e.target.files[0])

            setProof(file);
            console.log("file2", file2)
            console.log("file is valid")
        } else {
            errorToast("Invalid", "Please Upload valid file You Can Only Upload less then 1Mb and PNG, JPG and PDF format...");
            console.log("file is invalid")
        }
    }

    // console.log('proofdocument', proof.name);
    const handleDone = async (event) => {
        event.preventDefault();

        // let requestBody = {
        //
        //     sellerTradeTransferStatus: "true"
        // };
        // console.log("request body", requestBody);
        //
        // let stringifiedRequestBody = JSON.stringify(requestBody);
        //
        // console.log("request body stringified", stringifiedRequestBody);


        let response = await apiCall(
            "tradeagreement/sellertradetransferconfirmation/" + agreement.id,
            "PUT",
            "", history
        );

        // let responseJSON = await response.json();
        // console.log("response ", response);

        // console.log("responseJson", responseJSON);

        if (response.status !== 200) {
            errorToast("Invalid", "Not updated, contact admin!!");

            // setShowDialog(false); //failure
            props.callbackfunc();
            return;
        } else if (response.status === 200) {

            successToast("Success", "Successfully updated!!")
            // setShowDialog(true); // success
            props.callbackfunc();
            return
        }
    };

    const buyerDetails = async () => {

        await getProfile(agreement.onboardingBuyerAccountId)
        await getBankdetails(agreement.onboardingBuyerAccountId)
        await getCallDmat(agreement.onboardingBuyerAccountId)
        await getRiskProfile(agreement.onboardingBuyerAccountId)

        setopenDetailModal(true)
    }
    



    const getProfile = async function (accId) {
        const response = await apiCall("useronboarding/adminaccountonboarding/" + accId, "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseAddress = await apiCall("useronboarding/adminaccountonboardingaddress/" + accId, "GET")

        let responseJSON = await response.json();
        // // console.log("bbbbbbbb", responseJSON)

        let responseAddressJSON = await responseAddress.json();
        setDetails(responseJSON);
        setProfileaddress(responseAddressJSON)
    }
    const getBankdetails = async function (accId) {
        const response = await apiCall("useronboarding/adminaccountonboardingbankkprofile/" + accId, 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const bankresponseJSON = await response.json()
        setbankDetails(bankresponseJSON)
    }
    const getCallDmat = async function (accId) {
        let response = await apiCall("useronboarding/adminaccountonboardingdmatprofile/" + accId, 'GET', '', history)
        let responseJSON = await response.json()
        // // console.log("cccccccc", responseJSON)
        setdmatDetails(responseJSON)
    }

    const getRiskProfile = async function (accId) {
        const response = await apiCall("useronboarding/adminaccountonboardingriskprofile/" + accId, "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        // // console.log('responseJSONppppppp'+responseJSON.id);
        setriskProfile(responseJSON)
    }
    const getPaymentStatus = async function (aggId) {
        let response = await apiCall("payment/adminauditorpaymentorderstatus/"+aggId, 'GET', '', history)
    
        // console.log("response", response)
        let responseJSON = await response.json()
        // console.log("cccccccc", responseJSON)
        setpaymentStatus(responseJSON)
      }


    return (
        <div className="adaharbased-sec">
            <div className="text-dark">
                <h6><b>Shares Transfer Confirmation</b></h6>
            </div>
            <div style={{ borderBottom: "2px solid #721B65", width: "100px" }}></div>
            <div className="row">
                <div className="col-md-8">
                    <h6 className="mt-3 " style={{ color: "#721B65", fontSize: "14px" }}><b>When you transfer Shares, please confirm</b></h6>
                </div>
                <div className="col-md-4">
                    <div className="buyeragreement_sign_timer mt-4">
                        <h4 className="m-0 pt-1 pb-1"> {counterhour}:{counterminute}:{countersecond}</h4>
                    </div>
                </div>
            </div>
            <div className="uploadproof-row mt-5">
                <div className="uploadproof">
                    <input type="file" onChange={handleOnFileChange} />
                    <img src={UploadIcon} />
                    <p className="m-0 text-medium">
                        {!proof ? <span>Upload Proof of Transfer of shares</span> : <span className="text-primary-default">{proof.name + "   click here to change"}</span>} </p>
                </div>
            </div>

            {(agreement.buyerPaidUsingVa != undefined
            && agreement.buyerPaidUsingVa == true) ?
                <div className="row my-2">
                    <div className='col-md-12 col-12'>
                        <div className="my-card mt-2">
                            <div className="">
                                <h6><b>Payment Status</b></h6>
                                <div className="title-border"></div>
                                <div className='mt-2'>
                                    {/* {console.log("aaaaaa" + paymentStatus.orderStatus + paymentStatus.moneySettledUA)} */}
                                    {<p className="text-medium">Payment is Successful using Buyer's Wallet</p>
                                       }
                                </div>
                            </div>
                            <div ><Buttons.PrimaryButton value="View Wallet Details" style={{ height: "35px", width: "50%" }} /></div>
                        </div>
                    </div>
                </div>
            :
                (agreement.buyerPaidNoMoneyPartOfCampaign == true?
                        <div className="row my-2">
                            <div className='col-md-12 col-12'>
                                <div className="my-card mt-2">
                                    <div className="">
                                        <h6><b>Payment Status</b></h6>
                                        <div className="title-border"></div>


                                        <div className='mt-2'>
                                            <p className="text-medium">1 oyo share free for every KYC completion - No payment required</p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                :
                        <div className="row my-2">
                            <div className='col-md-12 col-12'>
                                <div className="my-card mt-2">
                                    <div className="">
                                        <h6><b>Payment Status</b></h6>
                                        <div className="title-border"></div>
                                        <div className='mt-2'>
                                            {/* {console.log("aaaaaa" + paymentStatus.orderStatus + paymentStatus.moneySettledUA)} */}
                                            {paymentStatus.orderStatus == "success" ? <p className="text-medium">Payment is Successful</p>
                                                : <p className="text-medium">Payment is Failed</p>}
                                        </div>
                                        <div className='mt-2'>
                                            {paymentStatus.moneySettledUA == true ?<p className="text-medium">Payment is Settled into UA account Sccessfully</p>
                                                : <p className="text-medium">Payment is not yet Settled</p>}
                                        </div>

                                        <div className='mt-2'>
                                            <p className="text-medium">Amount Transfered By Buyer : {paymentStatus.amount}</p>

                                        </div>

                                        <div className='mt-2'>
                                            <p className="text-medium">Buyer's UPI Handle :   {(paymentStatus.customerUPIID == undefined
                                                || paymentStatus.customerUPIID == "") ? "Not Known - Done using QR code"
                                                : paymentStatus.customerUPIID}</p>


                                        </div>

                                        <div className='mt-2'>
                                            <p className="text-medium">Buyer's UTR/RRN payment Mode reference ID :   {(paymentStatus.bank_reference == undefined
                                                || paymentStatus.bank_reference == "") ? "Not Known"
                                                : paymentStatus.bank_reference}</p>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                )

            }

            <div className="row d-flex align-items-center justify-content-end my-2">
                <div className="col-md-6 col-12"></div>
                <div className="col-md-6 col-12"> <Buttons.PrimaryButton value="See Buyer Onboarding Details" onClick={buyerDetails} style={{ height: "35px", width: "100%" }} /></div>
                
               
            </div>

            
            <div className="d-flex align-items-center justify-content-between">




                {/*<div className="my-4 w-100">*/}
                {/*        /!* <Buttons.PrimaryButton value="Upload Proof" /> *!/*/}
                {/*        <button className="btn btn-secoundary-default w-100">Upload Proof</button>*/}
                {/*</div>*/}
                {proof == '' ? null : <div className="my-4 w-100"> 
                    {/* <Buttons.PrimaryButton value=""  /> */}
                    <button className="btn btn-secoundary-default w-100" onClick={handleDone}>Confirm Share Transfer</button>
                </div>}
            </div>


            <div className="d-flex aadhar-based">
                <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                    <SuccessPopup1 />
                </Dialog>
            </div>



            <Dialog
                open={openDetailModal}
                onClose={() => setopenDetailModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <section className="transation-detail-pdf-modal">
                    <div className="">
                        <div class="close-icon border-none" onClick={() => setopenDetailModal(false)}>
                            <button type="button" className="close" ><img src={closeIcon} width="20" /></button>
                        </div>
                        <div >
                            <div className="">
                                <h4 className="mb-2 heading"> <b>Buyer's Details</b></h4>
                            </div>
                            <div class="row scroll-default">
                                <div class="col-md-12 ">
                                    <div className='default-modal-height'>
                                        <div className="transation-detail-modal">
                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"> <b> Personal Details </b></h6>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Full name :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.name}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">User ID :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.accountId}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Email :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.email}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Mobile Number :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.mobileNumber}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Residentship :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.residentStatus}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Address :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.address}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">State :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.state}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">City :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.city}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Pin code :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.pincode}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"> <b>Bank Account Details: </b></h6>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Bank Account Number :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.accountNumber}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">IFSC Code :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.ifscCode}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Bank Name :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.bankName}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Branch Name :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.branchName}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"> <b>Demat Account Details: </b></h6>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Depository Name :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.depositoryName}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Broker Name :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.brokerName}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">DP ID :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.dpId}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Client ID :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.clientId}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">BO ID :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.boId}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"> <b>Share Transfer Process Preference: </b></h6>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">NSDL account :</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.nsdlAccount}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"> <b>KYC Details:</b></h6>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">PAN Number:</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.panNumber}</b></p>
                                                    </div>
                                                    <div className='col-md-3 col-12'><p className="tex-small ">Aadhar Number:</p></div>
                                                    <div className='col-md-9 col-12'><p className="tex-small "><b>{details.aadharNumberVerified}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="py-2">
                                                    <h6 className="mb-2 heading"><b>Risk Profile:</b></h6>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-7 col-12'><p className="tex-small ">1. Have you invested in Unlisted Shares before?</p></div>
                                                    <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment1 == null ? "-" : riskProfile.currentAlignment1}
                                                    </b></p>
                                                    </div>
                                                    <div className='col-md-7 col-12'><p className="tex-small ">2. What describes you the most in relation to unlisted stocks</p></div>
                                                    <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment2 == null ? "-" : riskProfile.currentAlignment2}
                                                    </b></p>
                                                    </div>
                                                    <div className='col-md-7 col-12'><p className="tex-small ">3. What is your networth?</p></div>
                                                    <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment3 == null ? "-" : riskProfile.currentAlignment3}</b></p>
                                                    </div>
                                                    <div className='col-md-7 col-12'><p className="tex-small ">4. How do you take your investment descisions</p></div>
                                                    <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment4 == null ? "-" : riskProfile.currentAlignment5}
                                                    </b></p>
                                                    </div>
                                                    <div className='col-md-7 col-12'><p className="tex-small ">5. Do you want professional guidance / study material for investing in unlisted shares?</p></div>
                                                    <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment5 == null ? "-" : riskProfile.currentAlignment5}</b></p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Dialog>
        </div>
    )
}