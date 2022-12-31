import React from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import SuccessPopup from "./SuccessPopup";
import Vector from './Vector.svg';
import Dialog from '@material-ui/core/Dialog';
import DownloadLink from "react-download-link";
import GetAppIcon from '@material-ui/icons/GetApp';
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
    successToast, errorToast
} from "../../../../src/Components/Toast/index";
import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";

export default function TransactionCompleted(props) {
    const [showDialog, setShowDialog] = React.useState(false);
    const [tradeaggid, settradeaggid] = React.useState(props.agreement.id);
    const [aadharVerification, setAadharVerification] = React.useState('');
    const [panVerification, setPanVerification] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);

    let history = useHistory();

    console.log("tradeaggid", tradeaggid)

    React.useEffect(() => {
        getProfile()
    }, []);

    async function getProfile() {
        const response = await apiCall("useronboarding/accountonboarding", "GET", history);
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();

        console.log("responseJSON", responseJSON)

        setAadharVerification(responseJSON.aadharNumberVerified)
        setPanVerification(responseJSON.panNumberVerified)
    }

    console.log("aadharVerification", aadharVerification)
    console.log("aadharVerification1", panVerification)


    const checkKYC = () => {
        setModalOpen(true)
        // errorToast("Invalid", "Invalid Aadhar and Pan card not verified please vreified first to  download invoice");
    }

    return (
        <div className="adaharbased-sec">
            <div className="text-dark">
                <h6><b>No Action Required</b></h6>
            </div>
            <div style={{ borderBottom: "2px solid #721B65", width: "100px" }}></div>
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <p className="m-0 text-small mt-4">Congratulations, the transaction is completed</p>
                    </div>
                </div>
                {/*<div className="col-md-4">*/}
                {/*    <div className="buyeragreement_sign_timer mt-4">*/}
                {/*        <h4 className="m-0 pt-1 pb-1"> 05 : 30 : 00</h4>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/* <div className="col-md-8 col-12">
                    <div className="download-button mt-3">
                        <GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" />
                        <a download="txnsummary" href={downloadurl("tradeagreement/downloadTxnSummary/" + tradeaggid)}>Download Txn Summary</a>
                    </div>
                </div>
                <div className="col-md-12 col-12">
                    <div className="download-button mt-3">
                        <GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" />
                        <a download="txninvoice" href={downloadurl("tradeagreement/downloadInvoice/" + tradeaggid)}>
                            Download Invoice</a>
                    </div>
                </div> */}

                <div className="col-md-6 col-12">
                    {(aadharVerification && panVerification) ?
                        <a download="txnsummary" href={downloadurl("tradeagreement/downloadTxnSummary/" + tradeaggid)}>
                            <button className='btn btn-primary-default mt-2 w-100'><GetAppIcon className="mr-2 text-white downloadIcon" style={{ width: "20px", height: "20px" }} width="100" /> Download Txn Summary</button>
                        </a> :
                        <button className='btn btn-primary-default mt-2 w-100' onClick={checkKYC}><GetAppIcon className="mr-2 text-white downloadIcon" style={{ width: "20px", height: "20px" }} width="100" /> Download Txn Summary </button>
                    }

                </div>
                <div className="col-md-6 col-12">
                    {(aadharVerification && panVerification) ?
                        <a download="txninvoice" href={downloadurl("tradeagreement/downloadInvoice/" + tradeaggid)}>
                            <button className='btn btn-primary-default mt-2 w-100' ><GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" /> Download Invoice</button>
                        </a> :
                        <button className='btn btn-primary-default mt-2 w-100' onClick={checkKYC}><GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" /> Download Invoice</button>
                    }
                </div>
                <div className="col-md-6 col-12">
                    {(aadharVerification && panVerification) ?
                        <a download="txninvoice" href={downloadurl("tradeagreement/downloadagreement/" + tradeaggid)}>
                            <button className='btn btn-primary-default mt-2 w-100'><GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" /> Download Signed Agreement</button>
                        </a> :
                        <button className='btn btn-primary-default mt-2 w-100' onClick={checkKYC}><GetAppIcon className="mr-2 text-white" style={{ width: "20px", height: "20px" }} width="100" /> Download Signed Agreement</button>
                    }
                </div>


                <Dialog
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="pyment_modal">
                        {/*    <div>*/}
                        {/*   <CloseIcon className="default_closeIcon" onClick={() => setPaymentInprocess(false)} />*/}
                        {/*</div>*/}
                        <div className="addcompanyrequest px-2 pb-2">
                            <div className="pyment_modal_padding">
                                <div>
                                    <div className="text-center">
                                        <h5>Aadhar and Pan not verified!</h5>
                                        <p className="m-0 text-small">
                                            Aadhar and Pan card not verified please verified first to download invoice
                                        </p>
                                        <div className="addcompanyrequest_buttonContainer text-center mt-3 d-flex justify-content-between">
                                            <Buttons.SecondaryButton value="Cancel" style={{ width: "50%", margin: "0px 5px" }}
                                                onClick={() => setModalOpen(false)}
                                            />
                                            <Buttons.PrimaryButton value="Verify" style={{ width: "50%", margin: "0px 5px" }}
                                                onClick={() => ( history.push('/profilewig'))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        </div>
    )
}