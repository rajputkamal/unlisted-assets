import React, { useState, useEffect } from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import {Link, useHistory} from "react-router-dom";
import { apiCall } from "../../../Utils/Network";

export default function WaitingForBothSignAgreement (props){

    let history = useHistory();

    const [showDialog,setShowDialog] = React.useState(false);
    const [timerexpired,settimerexpired] = React.useState(false);
    const [kycRequired,setkycRequired] = React.useState(true);

    const [counterhour, setcounterhour] = React.useState(props.agreement.hoursLeft);
    const [counterminute, setcounterminute] = React.useState(props.agreement.minuteLeft);
    const [countersecond, setcountersecond] = React.useState(59);

    React.useEffect(() => {
        const timer =
            countersecond > 0 && setInterval(() => {
                setcountersecond(countersecond - 1)

                if((countersecond - 1) <= 0) {
                    setcountersecond(59)
                    setcounterminute(counterminute-1)

                    if((counterminute - 1) <= 0) {
                        setcounterminute(59)

                        setcounterhour(counterhour-1)

                        if((counterhour - 1) <= 0) {
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


    useEffect(async () => {
        let isCompleted = await bankdetails()
        callDmat(isCompleted)
    }, [])

    const callDmat = async function (isBankDetailCompleted) {
        let response = await apiCall("useronboarding/dmat", 'GET', '', history)
        let responseJSON = await response.json()
        // console.log("iiiiiiiiiii", responseJSON)

        if (responseJSON.uaVerifiedStatus == "Verified" && isBankDetailCompleted) {

            setkycRequired(false)

        }

        if (!isBankDetailCompleted) {

            return
        }

        if (!(responseJSON.uaVerifiedStatus == "Verified")) {


            return
        }
    }

    const bankdetails = async function () {
        const response = await apiCall("useronboarding/bankdetail/false", 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const bankresponseJSON = await response.json()

        // console.log("bbbbbbbbaaaa",bankresponseJSON.uaVerifiedStatus)

        if (bankresponseJSON.uaVerifiedStatus == "Verified" ||
            bankresponseJSON.uaVerifiedStatus == "verified" ||
            bankresponseJSON.uaVerifiedStatus == "tempservicenotavailable") {


            if (bankresponseJSON.uaVerifiedStatus == "tempservicenotavailable") {

            } else {

                return true
            }
        } else {

            // props.nextPage()
        }
        return false
    }

    return(
        <div className="adaharbased-sec">


            {kycRequired ?
                <>
                <div className="text-dark">
                    <h6><b>Action Required</b></h6>
                </div>
                <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <p className="m-0 text-small mt-4">Your Bank Account/Dmat details are required
                                to complete the Share Transfer process</p>
                        </div>
                    </div>
                    <Link to="./profilewig">
                        <Buttons.PrimaryButton value="Provide Details" style={{ height: "35px" }}
                        /></Link>
                </div>
                </>
            :
                <>
                <div className="text-dark">
                    <h6><b>No Action Required</b></h6>
                </div>
                <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <p className="m-0 text-small mt-4">You need to wait for futher action, We will notify you as soon as the seller transfers the share
                                and accepts the terms</p>
                        </div>
                    </div>
                    <div className="col-md-4 buyeragreement_sign_timer-div">
                        <div className="buyeragreement_sign_timer mt-4">
                            <h4 className="m-0 pt-1 pb-1">{counterhour}:{counterminute}:{countersecond}</h4>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    )
}