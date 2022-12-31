import React, { useEffect, useState } from 'react';
import "../../../Components/FilterCard/filterCard.css"
import Buttons from "../../Buttons"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
// import './Index.css'
import { apiCall, apiCall12, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"

import AddIcon from '@material-ui/icons/Add';
import { successToast, errorToast } from "../../Toast/index";
import Dialog from "@material-ui/core/Dialog";


export default function MisHolding(props) {

    let history = useHistory();
    const [editedData, setEditedData] = React.useState({});


    const [transactionFee, settransactionFee] = React.useState(0);
    const [openPdfModal, setopenPdfModal] = React.useState(0);
    const [openDetailModal, setopenDetailModal] = React.useState(0);
    const [invoiceDetail, setInvoiceDetail] = React.useState(false)
    const [dealSlipHeading, setDealSlipHeading] = React.useState(false)
    const [buyerdata, setBuyerData] = React.useState(false)
    const [transactiondata, setTransactionData] = React.useState(false)
  
    const adminDownloadTxnSummary = async function () {
        setopenPdfModal(true)
        setInvoiceDetail(false)
        setDealSlipHeading(true)        
      }

    const buyerDetails = () => {
    setTransactionData(false)
    setopenDetailModal(true)
    setBuyerData(true)
    }
    const sellerDetails = () => {
    setTransactionData(false)
    setopenDetailModal(true)
    setBuyerData(false)
    }

    const adminDownloadInvoice = async function () {
    setopenPdfModal(true)
    setInvoiceDetail(true)        
    }
    const adminDownloadAgreement = async function () {
    setLoading(true)
    setopenPdfModal(true)
    setInvoiceDetail(false)
    setDealSlipHeading(false)        
    }



    React.useEffect(() => {
        // getAllInventoryget()
    }, []);




    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("myHoldings/" + editedData.id, 'DELETE', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            // getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

   

   

  

    return (<>
        <div className="user_table_section">

            <div className="dbmn">
                <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <h6><strong> Mis Holdings 00 </strong></h6>

                    </div>
                </div>

                <div className='row d-flex justify-content-end'>
                    <div className='col-md-8 px-0 d-flex align-items-center justify-content-end marketplace-Chip-main'>

                        <div className="text-right mb-2">
                            <button className="btn btn-primary-default" >
                                <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                            </button>
                        </div>
                    </div >
                </div>               

            </div>
        </div>

        <div className="transactiondetails-cmp mt-4">          

            <div className='row mt-3'>
                <div className='col-md-4 col-12'>
                    <div className="my-card mt-2">
                        <div className="card-title">
                            <h5><b>Buyer's Details</b></h5>
                            <div className="title-border"></div>
                            <div className='mt-4'>
                                <Buttons.SecondaryButton value="View Onboarding Details" onClick={buyerDetails} style={{ height: "35px", width: "100%" }} />
                                <Buttons.PrimaryButton value="View Invoice" onClick={adminDownloadInvoice} style={{ height: "35px", width: "100%", marginTop: "5px" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-12'>
                    <div className="my-card mt-2">
                        <div className="card-title">
                            <h5><b>Seller's Details</b></h5>
                            <div className="title-border"></div>
                            <div className='mt-4'>
                                <Buttons.SecondaryButton value="View Onboarding Details" onClick={sellerDetails} style={{ height: "35px", width: "100%" }} />
                                <Buttons.PrimaryButton value="View Invoice" onClick={adminDownloadInvoice} style={{ height: "35px", width: "100%", marginTop: "5px" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-12'>
                    <div className="my-card mt-2">
                        <div className="card-title">
                            <h5><b>Transaction Details</b></h5>
                            <div className="title-border"></div>
                            <div className='mt-4'>
                                <Buttons.SecondaryButton value="View Deal Slip Details" onClick={adminDownloadTxnSummary} style={{ height: "35px", width: "100%" }} />
                                <Buttons.PrimaryButton value="View Buyer/Seller Agreement" onClick={adminDownloadAgreement} style={{ height: "35px", width: "100%", marginTop: "5px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={openPdfModal}
                onClose={() => setopenPdfModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <section className="transation-detail-pdf-modal">
                    <div>
                        <div class="close-icon border-none" onClick={() => setopenPdfModal(false)}>
                            <button type="button" className="close" ><img src={closeIcon} width="20" /></button>
                        </div>
                        <div>
                            <div className="py-2">
                                {invoiceDetail ?
                                    <h4 className="mb-2 heading"> <b>Invoice Details</b></h4> :
                                    <h4 className="mb-2 heading"> {dealSlipHeading ? <b>Deal Slip Details</b> :
                                        <b>Buyer/Seller Agreement Details</b>}</h4>
                                }
                            </div>
                            {loading ? <div className='pdf-loader d-flex justify-content-center align-items-center default-modal-height'>
                                <CircularProgress />
                            </div> :
                                <div class="row scroll-default">
                                    <div class="col-md-12 px-0">
                                        <div className='default-modal-height'>
                                            <div>
                                                <iframe className='scroll-default' src="" width="100%" height="465px"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>
            </Dialog>

            {/* user all details  modal*/}

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

                                {transactiondata ?
                                    <h4 className="mb-2 heading"> <b>Transaction's Details</b></h4> :
                                    <h4 className="mb-2 heading"> {buyerdata ? <b>Buyer's Details</b> :
                                        <b>Seller's Details</b>}</h4> 
                                }

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
        </div ></>

    )
}