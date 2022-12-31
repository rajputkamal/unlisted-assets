import React from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import SuccessPopup from "./SuccessPopup";
import Vector from './Vector.svg';
import Dialog from '@material-ui/core/Dialog';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

export default function BuyerSellerWaitingForTrusteeApproval (props){
    let history = useHistory();

    const [showDialog,setShowDialog] = React.useState(false);
    const [timerexpired,settimerexpired] = React.useState(false);


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

    // React.useEffect(() => setPageTitle11(), [])
    // const setPageTitle11 = async () => {
    //
    //     selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")
    //
    //     let response = await apiCall("tradeagreement/"+selectedOnGoingTxn.id, 'GET')
    //     let responseJSON = await response.json()
    //     setAgreement(responseJSON);
    // }
    //
    //
    //
    // const [showDialog,setShowDialog] = React.useState(false);
    //
    // const handleDone = async (event) => {
    //     event.preventDefault();
    //
    //     let requestBody = {
    //
    //         aadharNumber: aadharNumber,
    //     };
    //     console.log("request body", requestBody);
    //
    //     let stringifiedRequestBody = JSON.stringify(requestBody);
    //
    //     console.log("request body stringified", stringifiedRequestBody);
    //
    //     let response = await apiCall(
    //         "tradeagreement/aadharagreementsign/"+selectedOnGoingTxn.id,
    //         "POST",
    //         requestBody
    //     );
    //
    //     let responseJSON = await response.json();
    //     console.log("response ", response);
    //
    //     console.log("responseJson", responseJSON);
    //
    //     setShowDialog(true);
    // };


    return(
        <div className="adaharbased-sec">
            <div className="text-dark">
                <h6><b>No Action Required</b></h6>
            </div>
            <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <p className="m-0 text-small mt-4">The Trustee is notified to Approve/disapprove the transaction</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="buyeragreement_sign_timer mt-4">
                        <h4 className="m-0 pt-1 pb-1"> {counterhour}:{counterminute}:{countersecond}</h4>
                        {/* <h4 className="m-0 pt-1 pb-1"> {counterhour}:{counterminute}:{countersecond}</h4> */}
                    </div>
                </div>
            </div>


        </div>
    )
}