import React from "react";
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import PaymentSuccess from "./PaymentSuccess";
import Dialog from '@material-ui/core/Dialog';
import { apiCall, setAccessToken } from "../../../Utils/Network";
import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";
import { getTransactionFee } from "../../../Utils/utils";

export default function AddmoneyVirtualAccount (props){
    let history = useHistory();

    const [showDialog,setShowDialog] = React.useState(false);

    const location = useLocation();

    const [agreement,setAgreement] = React.useState(props.agreement);
    const [virtualBankDetails, setVirtualbankdetails] = React.useState({})

    // const selectedTrade = location.state.selectedTrade;
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [pageTitle,setPageTitle] = React.useState('');
    const [timerexpired,settimerexpired] = React.useState(false);
    const [balance,setbalance]=React.useState('')

    const [txnAmount,settxnAmount]=React.useState((selectedOnGoingTxn.agreedPrice *
        selectedOnGoingTxn.agreedQty));

    let totalAmountInvolved = txnAmount


    let transactionFee = 0

    if(selectedTrade.isTradeOwner) {
        transactionFee  = getTransactionFee(false, totalAmountInvolved)
    } else {
        transactionFee  = getTransactionFee(true, totalAmountInvolved)
    }

    const [txnFee,settxnFee]=React.useState((transactionFee)+(.18*transactionFee));

    const [txnTotal,settxnTotal]=React.useState(txnAmount+txnFee);


    React.useEffect(() => setPageTitle11(), [])
    const setPageTitle11 = async () => {

        // selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")

        selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")

        // if(!selectedTrade.isTradeOwner) {
        //     if(agreement.offerValidTimeBuyerESCROWMoneyTransferStatus =="expired") {
        //         settimerexpired(true)
        //     }
        // }

        // let response = await apiCall("tradeagreement/"+selectedOnGoingTxn.id, 'GET','', history)
        // let responseJSON = await response.json()
        // setAgreement(responseJSON);

        const response1 = await apiCall("uservirtualaccount/virtualaccountbalance",'GET','', history)
        const responseJSON1 = await response1.json()
        // console.log(responseJSON1)
        setbalance(responseJSON1)

        const response111 = await apiCall("useronboarding/bankdetail/true", 'GET', '', history)
        if(response111.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON111 = await response111.json()
        setVirtualbankdetails(responseJSON111)
    }


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
        //     buyerMoneyReceivedForTradeStatus: "true"
        // };
        //// console.log("request body", requestBody);

        //let stringifiedRequestBody = JSON.stringify(requestBody);

        //// console.log("request body stringified", stringifiedRequestBody);

        let response = await apiCall(
            "tradeagreement/moneyreceivedsconfirmation/"+agreement.id,
            "PUT",
            '', history
        );

        let responseJSON = await response.json();
        // console.log("response ", response);

        // console.log("responseJson", responseJSON);

        if (response.status !== 200) {
            errorToast("Invalid", "Money Not yet Added!! - confirm again after sometime or contact admin");

            // setShowDialog(false); //failure
            //props.callbackfunc();
            return;
        }else if (response.status === 200){


            if(responseJSON.buyerVirtualAccountAddedRequiredMoneyStatus == true) {
                successToast("Success","Money Added Successfully!!")
                // setShowDialog(true); // success
                props.callbackfunc();
            } else {
                errorToast("Invalid", "Please add money to your wallet before confirmation...");
                //setShowDialog(true); // success
                //props.callbackfunc();
            }

            return
        }
    };

    let abc2 = () => {return(
        <div className="adaharbased-sec">
            <div className="text-dark">
                <h6><b>Add money to your virtual account - Time Expired</b></h6>
            </div>
        </div>
    )}

    let abc1 = () => {return(
      <div className="adaharbased-sec">
        <div className="text-dark">
          <h6><b>Add money to your virtual account.</b></h6>
        </div>
        <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
        <div className="row">
          <div className="col-md-8 col-12">
            <h6 className="mt-3 " style={{color: "#721B65",fontSize:"14px"}}><b>Payment Method </b></h6>
            <div>
              <form action="#">
                <p className="custom-radio">
                  <input type="radio" id="test1" name="radio-group" checked />
                  <label for="test1 " className="text-small">Bank transfer- RTGS/NEFT/IMPS </label>
                </p>
                <span className="small-text m-1">Note: It may take a few hours for amount to reflect on this screen post the transfer</span>
              </form>
            </div>
            <div className="transfer-details p-3">
                <p className="m-0 small-text">*Send the exact amount to this account and
                the balance amount will be added to your wallet.</p>
                <p className="small-text m-1">Account Holder name : {"Unlisted Tech Private Limited"}</p>
                <p className="small-text m-1">Account number      : {virtualBankDetails.accountNumber}</p>
                <p className="small-text m-1">Bank name           : {virtualBankDetails.bankName}</p>
                <p className="small-text m-1">Branch name         : {virtualBankDetails.branchName}</p>
                <p className="small-text m-1">Account Ifsc        : {virtualBankDetails.ifscCode}</p>
                <p className="small-text m-1">Account Type        : {"Current"}</p>
                <p className=" mt-3 small-text"><b>*Use this reference code in message</b></p>
                <b className="text-primary-color">UA-In-{virtualBankDetails.accountNumber}</b>
            </div>  
            <div className="border-top">
                <div className="d-flex justify-content-between m-2">
                  <span className="small-text">Your current balance</span>
                  <span className="small-text">Amount to send</span>
                </div>
                <div className="d-flex justify-content-between m-2">
                    <h6><b>Rs.{balance.toFixed(2)}</b></h6>
                    <h6><b>₹ {txnTotal.toFixed(2)}</b></h6>
                </div>
            </div>
          </div>
          <div className="col-md-4">
              <div className="buyeragreement_sign_timer mt-4">
                <h4 className="m-0 pt-1 pb-1"> {counterhour}:{counterminute}:{countersecond}</h4>
              </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          {/*<Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px"}} />*/}
          <Buttons.PrimaryButton value="I have paid the money" onClick={handleDone} />
        </div>
        <div className="d-flex aadhar-based">
          <Dialog open={showDialog} onClose={()=>{ setShowDialog(false) }} >
            <PaymentSuccess/>
          </Dialog>
        </div>
      </div>
     )}


    return(<div className="adaharbased-sec">
        <div className="text-dark">
            <h6><b>Add money to your virtual account.</b></h6>
        </div>
        <div style={{borderBottom: "2px solid #721B65", width: "100px"}}></div>
        <div className="row ">
            <div className="col-md-8 col-12">
                <h6 className="mt-3 " style={{color: "#721B65", fontSize: "14px"}}><b>Payment Method </b></h6>                
                <div>
                    <form action="#">
                        <p className="custom-radio">
                            <input type="radio" id="test1" name="radio-group" checked/>
                            <label htmlFor="test1 " className="text-small">Bank transfer- RTGS/NEFT/IMPS </label>
                        </p>
                        <span className="small-text m-1">Note: It may take a few hours for amount to reflect on this screen post the transfer</span>
                    </form>
                </div>
                <div className="transfer-details p-3">
                    <p className="m-0 small-text">*Send the exact amount to this account and
                        the balance amount will be added to your wallet.</p>
                    <p className="small-text m-1">Bank name           : {virtualBankDetails.bankName}</p>
                    <p className="small-text m-1">Branch name         : {virtualBankDetails.branchName}</p>
                    <p className="small-text m-1">Account Ifsc        : {virtualBankDetails.ifscCode}</p>
                    <p className="small-text m-1">Account number      : {virtualBankDetails.accountNumber}</p>
                    <p className=" mt-3 small-text"><b>*Use this reference code in message</b></p>
                    <b className="text-primary-color">UA-In-{virtualBankDetails.accountNumber}</b>
                </div>
                <div className="border-top">
                    <div className="d-flex justify-content-between m-2">
                        <span className="small-text">Your current balance</span>
                        <span className="small-text">Amount to send</span>
                    </div>
                    <div className="d-flex justify-content-between m-2">
                        <h6><b>Rs.{balance}</b></h6>
                        <h6><b>₹ {txnTotal.toFixed(2)}</b></h6>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="buyeragreement_sign_timer ">
                    <h4 className="m-0 pt-1 pb-1"> {counterhour}:{counterminute}:{countersecond}</h4>
                </div>
            </div>
            
        </div>
        <div className="d-flex mt-4">
            {/*<Buttons.SecondaryButton value="Cancel" style={{marginRight: "5px"}}/>*/}
            <Buttons.PrimaryButton value="I have added the required money, Go Ahead" onClick={handleDone}/>
        </div>
        <div className="d-flex aadhar-based">
            <Dialog open={showDialog} onClose={() => {
                setShowDialog(false)
            }}>
                <PaymentSuccess/>
            </Dialog>
        </div>
    </div>)
}