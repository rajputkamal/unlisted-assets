import React from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import SuccessPopup from "./SuccessPopup";
import Dialog from '@material-ui/core/Dialog';

import "../buyeragreement.scoped.css"
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";

import { apiCall, setAccessToken } from "../../../Utils/Network";
import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";

export default function VirtualAccount (props){
    let history = useHistory();

    const location = useLocation();
    const [showDialog,setShowDialog] = React.useState(false);
    const [agreement,setAgreement] = React.useState(props.agreement);
    // const selectedTrade = location.state.selectedTrade;
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [timerexpired,settimerexpired] = React.useState(false);

    React.useEffect(() => setPageTitle11(), [])
    const setPageTitle11 = async () => {

        // selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")

        // let response = await apiCall("tradeagreement/"+selectedOnGoingTxn.id, 'GET','', history)
        // let responseJSON = await response.json()
        // setAgreement(responseJSON);
    }

    const [counterhour, setcounterhour] = React.useState(props.agreement.hoursLeft);
    const [counterminute, setcounterminute] = React.useState(props.agreement.minuteLeft);
    const [countersecond, setcountersecond] = React.useState(59);
    React.useEffect(() => {
        handleDone()
    }, []);

    React.useEffect(() => {
        // handleDone()

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



    const handleDone = async (event) => {
        if(event != undefined) {
            event.preventDefault();
        }


        //console.log("request body", requestBody);

        //let stringifiedRequestBody = JSON.stringify(requestBody);

        //console.log("request body stringified", stringifiedRequestBody);

        let response = await apiCall(
            "uservirtualaccount/createvirtualaccountaggsignin/"+props.agreement.id,
            "POST",
            '', history
        );

        //console.log("response11 ", response);

        let responseJSON = await response.json();

        //console.log("responseJson11", responseJSON);

        if (response.status !== 200) {

            errorToast("Invalid", "Virtual Account Not Created - try again or contact admin!!");
            setShowDialog(false);

            return;
        }else if (response.status == 200){

            if(responseJSON != undefined && responseJSON.lastCreationRequestRemarks != undefined
                            && responseJSON.lastCreationRequestRemarks == "already created") {

                successToast("Success","Virtual Account Alreadt existed!!")
                // setShowDialog(true);
                props.callbackfunc();
                return

            } else if(responseJSON != undefined && responseJSON.lastCreationRequestRemarks != undefined
                && responseJSON.lastCreationRequestRemarks == "created") {

                successToast("Success","Virtual Account Created Siuccessfully!!")
                // setShowDialog(true);
                props.callbackfunc();
                return
            } else {

                errorToast("Invalid","Something weng wrong, please try again or contact admin!!")
                return
            }

            successToast("Success","Please refresh the Page, Virtual Account is created!!")

            return
        }
    };

    let callback1 = () => {
        setShowDialog(false)
        props.callbackfunc();
    }

    return(
      <div className="adaharbased-sec">
        <div className="text-dark">
          <h6><b>Create Virtual Account</b></h6>
        </div>
        <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
        <div className="row">
          <div className="col-md-8">
             <h6 className="mt-3 " style={{color: "#721B65",fontSize:"14px"}}><b>To continue this transaction we need to create a virtual for you to do payments.   </b></h6>
            {/*<h6 className="mt-3 " style={{color: "#721B65",fontSize:"14px"}}><b>Please wait till the time  the transaction is approved by the Trustee. We will notify you as soon as it's done !   </b></h6>*/}
          </div>
          <div className="col-md-4">
              <div className="buyeragreement_sign_timer mt-4">
                <h4 className="m-0 pt-1 pb-1">{counterhour}:{counterminute}:{countersecond}</h4>
              </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          {/*<Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px"}} />*/}
          <Buttons.PrimaryButton value="Agree and Continue" onClick={handleDone} />
        </div>
        <div className="d-flex aadhar-based">
          <Dialog open={showDialog} onClose={()=> {
              props.callbackfunc();

          }}>
            <SuccessPopup callback1={callback1}/>
          </Dialog>
        </div>
      </div>
     )
}