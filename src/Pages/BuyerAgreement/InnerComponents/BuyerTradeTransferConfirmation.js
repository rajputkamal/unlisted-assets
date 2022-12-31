import React from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import SuccessPopup1 from "./SuccessPopup1";
import Vector from './Vector.svg';
import Dialog from '@material-ui/core/Dialog';
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network";
import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import {
    successToast, errorToast
} from "../../../../src/Components/Toast/index";


export default function BuyerTradeTransferConfirmation(props) {
    let history = useHistory();
    const location = useLocation();
    const [showDialog, setShowDialog] = React.useState(false);
    const [agreement, setAgreement] = React.useState(props.agreement);
    // const selectedTrade = location.state.selectedTrade;
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [pageTitle, setPageTitle] = React.useState('');
    const [timerexpired, settimerexpired] = React.useState(false);

    React.useEffect(() => setPageTitle11(), [])
    const setPageTitle11 = async () => {

        //selectedTrade.isTradeOwner ? setPageTitle("Seller Trade Transfer") : setPageTitle("Buyer Money Transfer")

        // if (!selectedTrade.isTradeOwner) {
        //     if (agreement.buyerTradeTransferConfirmation_STATUS == "expired") {
        //         settimerexpired(true)
        //     }
        // }
    }



    const [counterhour, setcounterhour] = React.useState(props.agreement.hoursLeft);
    const [counterminute, setcounterminute] = React.useState(props.agreement.minuteLeft);
    const [countersecond, setcountersecond] = React.useState(59);

    React.useEffect(() => {
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
                            // settimerexpired(true)

                            setcountersecond(0)
                            setcounterminute(0)
                            setcounterhour(0)
                        }

                    }
                }

            }, 1000);
        return () => clearInterval(timer);
    }, [countersecond]);

    const handleDone = async (event) => {
        event.preventDefault();

        // let requestBody = {
        //
        //     buyerTradeTransferConfirmation_STATUS: "true"
        // };
        // console.log("request body", requestBody);
        //
        // let stringifiedRequestBody = JSON.stringify(requestBody);
        //
        // console.log("request body stringified", stringifiedRequestBody);

        let response = await apiCall(
            "tradeagreement/buyertradetransferconfirmation/" + agreement.id,
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

    let abc2 = () => {
        return (
            <div className="adaharbased-sec">
                <div className="text-dark">
                    <h6><b>Shares Transfer Confirmation - Time Expired</b></h6>
                </div>
            </div>
        )
    }

    let abc1 = () => {
        return (
            <div className="adaharbased-sec">
                <div className="text-dark">
                    <h6><b>Shares Transfer Confirmation</b></h6>
                </div>
                <div style={{ borderBottom: "2px solid #721B65", width: "100px" }}></div>
                <div className="row">
                    <div className="col-md-8">
                        <h6 className="mt-3 " style={{ color: "#721B65", fontSize: "14px" }}><b>When you get Shares, please confirm</b></h6>
                    </div>

                    {/*<div className="UserProfile">*/}
                    {/*    <div className="UserIcon">*/}
                    {/*        <a href={agreement.sellerShareTransferProof} download>*/}
                    {/*            Download Share Transfer Proof as uploaded by the Seller</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="col-md-4">
                        <div className="buyeragreement_sign_timer mt-4">
                            <h4 className="m-0 pt-1 pb-1">{counterhour}:{counterminute}:{countersecond}</h4>
                        </div>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <Buttons.PrimaryButton value="Confirm Share Transfer" onClick={handleDone} />
                </div>
                <div className="d-flex aadhar-based">
                    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                        <SuccessPopup1 />
                    </Dialog>
                </div>
            </div>
        )
    }

    const NewComponent = () => {
        return (
            <>
                <h1>test</h1>
            </>
        )
    }

    return (
        <>
            <div className="adaharbased-sec">

                <div className="text-dark">
                    <h6><b>Shares Transfer Confirmation</b></h6>
                </div>
                <div style={{ borderBottom: "2px solid #721B65", width: "100px" }}></div>
                <div className="row">
                    <div className="col-md-8">
                        <h6 className="mt-3 " style={{ color: "#721B65", fontSize: "14px" }}><b>When you get Shares, please confirm</b></h6>
                    </div>

                    {/* <div className="UserProfile">
                        <div className="UserIcon">
                            <a href={downloadurl(agreement.sellerShareTransferProof)} download>
                                Download Share Transfer Proof as uploaded by the Seller</a>
                        </div>
                    </div> */}


                    <div className="col-md-4">
                        <div className="buyeragreement_sign_timer mt-4">
                            <h4 className="m-0 pt-1 pb-1">{counterhour}:{counterminute}:{countersecond}</h4>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <Buttons.PrimaryButton value="Confirm Share Transfer" onClick={handleDone} />
                </div>

                <div className="my-2">
                    <a href={agreement.sellerShareTransferProof}  target="_blank"   style={{ color: "#721B65", fontSize: "14px", textDecoration: "underline" }}>Download Share Transfer Proof</a>
                </div>

                <div className="d-flex aadhar-based">
                    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                        <SuccessPopup1 />
                    </Dialog>
                </div>
            </div>

            {/* <div className="adaharbased-sec">
            <div className="text-dark">
                <h6><b>Shares Transfer Confirmation</b></h6>
            </div>
            <div style={{ borderBottom: "2px solid #721B65", width: "100px" }}></div>
            <div className="row">
                <div className="col-md-8">
                    <h6 className="mt-3 " style={{ color: "#721B65", fontSize: "14px" }}><b>When you get Shares, please confirm</b></h6>
                </div>

               

                <div className="col-md-4">
                    <div className="buyeragreement_sign_timer mt-4">
                        <h4 className="m-0 pt-1 pb-1">{counterhour}:{counterminute}:{countersecond}</h4>
                    </div>
                </div>

                 <div className="UserProfile">
                    <div className="UserIcon">
                    <a href={downloadurl(agreement.sellerShareTransferProof)} download>
                                Download Share Transfer Proof as uploaded by the Seller</a>
                    
                    </div>
                </div>
            </div>
            <div className="d-flex mt-4">
                <Buttons.PrimaryButton value="Confirm Share Transfer" onClick={handleDone} />
            </div>
            <div className="d-flex aadhar-based">
                <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                    <SuccessPopup1 />
                </Dialog>
            </div>
        </div> */}

        </>
    )
}