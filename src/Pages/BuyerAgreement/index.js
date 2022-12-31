import React from "react";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import "./buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import  Breadcrumbs from "../../Components/Breadcrumbs";
import AadharBasedAgreement from './InnerComponents/AadharBasedAgreement';
import WaitingForBothSignAgreement from './InnerComponents/WaitingForBothSignAgreement';
import { connectToChat } from "../../Utils/chat";

import VirtualAccount from './InnerComponents/VirtualAccount';
import AddMoneyVirtualAccount from './InnerComponents/AddMoneyVirtualAccount';

import SellerWaitingForBuyerMoneyTransfer from './InnerComponents/SellerWaitingForBuyerMoneyTransfer';

import SellerTradeTransferConfirmation from './InnerComponents/SellerTradeTransferConfirmation';
import SellerWaitingForBuyerTradeConfirmation from './InnerComponents/SellerWaitingForBuyerTradeConfirmation';

import BuyerTradeTransferConfirmation from './InnerComponents/BuyerTradeTransferConfirmation';
import BuyerSellerWaitingForTrusteeApproval from './InnerComponents/BuyerSellerWaitingForTrusteeApproval';
import TransactionCompleted from './InnerComponents/TransactionCompleted';
import { store } from "../../Utils/uaredux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory, useLocation
} from "react-router-dom";


import { apiCall, setAccessToken } from "../../Utils/Network";


let BuyerAgreement = (props) => {

    let history = useHistory()

    const [showDialog,setShowDialog] = React.useState(false);

        const [tradecommunication1,setTradeCommunication1] = React.useState([]);
        const location = useLocation();
    const [selectedTrade, setselectedTrade] = React.useState({});
        const selectedOnGoingTxn = location.state.selectedongoingtxn;
        // //conole.log("pppppppppppppppp"+selectedTrade.id+selectedOnGoingTxn.id)



    const getTrade = async function () {

        let response = await apiCall("tradeongoingtranaction/trade/specifictxn/"+selectedOnGoingTxn.id, 'GET', '', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // //conole.log(response)
        let responseJSON = await response.json();
        // //conole.log("yoyo1",responseJSON)
        await setselectedTrade(responseJSON)
    }
    const [fetchinprogress,setfetchinprogress] = React.useState(false);

    const [agreement,setAgreement] = React.useState({});
    const [displayAgreementSignBuyer,setDisplayAgreementSignBuyer] = React.useState(false);
    const [displayAgreementSignSeller,setDisplayAgreementSignSeller] = React.useState(false);

    const [displayBuyerVirtualAccountCreated,setDisplayBuyerVirtualAccountCreated] = React.useState(false);
    const [displaySellerVirtualAccountCreated,setDisplaySellerVirtualAccountCreated] = React.useState(false);

    const [displaybuyerVirtualAccountAddedRequiredMoneyStatus,setDisplaybuyerVirtualAccountAddedRequiredMoneyStatus] = React.useState(false);

    const [displaybuyerMoneyReceivedForTradeStatus,setDisplaybuyerMoneyReceivedForTradeStatus] = React.useState(false);

    const [displaysellerTradeTransferStatus,setDisplaysellerTradeTransferStatus] = React.useState(false);
    const [displaysellerTradeTransferStatus1,setDisplaysellerTradeTransferStatus1] = React.useState(false);

    const [waitingForMoneyTransferStatus,setWaitingForMoneyTransferStatus] = React.useState(false);

    const [waitingForBothToSignAgreement,setWaitingForBothToSignAgreement] = React.useState(false);

    const [sellerWaitingForBuyerTradeConfirmation,setSellerWaitingForBuyerTradeConfirmation] = React.useState(false);

    const [displaybuyerTradeTransferConfirmation_STATUS,setDisplaybuyerTradeTransferConfirmation_STATUS] = React.useState(false);
    const [displaybuyerTradeTransferConfirmation_STATUS1,setDisplaybuyerTradeTransferConfirmation_STATUS1] = React.useState(false);

    const [waitingForTrusteeToApproveStatus,setWaitingForTrusteeToApproveStatus] = React.useState(false);

    const [transactionCompletedStatus,setTransactionCompletedStatus] = React.useState(false);
    const [balancefreeze, setbalancefreeze] = React.useState('')

    const [anythingchanged,setAnythingchanged] = React.useState({});
    console.log("sssssssssssss"+anythingchanged)

    const callbackredux = async () => {
        console.log("buyer agreement yo yo honey singh"+anythingchanged+!anythingchanged)
        try {

                setAnythingchanged({})

            // callbackfunc()
        } catch (error) {
            //conole.log("error buyer", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }
    }

    const virtualbankdetails = async function () {

        const response22 = await apiCall("uservirtualaccount/virtualaccountfreezebalance", 'GET', '', history)
        const responseJSON22 = await response22.json()
        // console.log(responseJSON22)
        setbalancefreeze(responseJSON22)
    }


    React.useEffect( () => {
        // connectToChat()
        const unsubscribe = store.subscribe(callbackredux)
        return unsubscribe;
    }, [])

    React.useEffect(  async () => {


            // await getTrade()


            let response1 = await apiCall("tradeongoingtranaction/trade/specifictxn/"+selectedOnGoingTxn.id, 'GET', '', history)
            if(response1.status == undefined) {
                console.log(response.status)
                return
            }
            // //conole.log(response1)
            let responseJSON1 = await response1.json();
            //conole.log(responseJSON1)
            await setselectedTrade(responseJSON1)

            let response = await apiCall("tradeagreement/" + selectedOnGoingTxn.id, 'GET','', history)
            if(response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return
            }
            let pageSelected = false;
            //conole.log("message received from server - loading agreement again ----111111")
            let responseJSON = await response.json()
            console.log("message received from server - loading agreement again", responseJSON)
            await setAgreement(responseJSON);

            //getting frozen amount
            virtualbankdetails()

            // //conole.log("yoyo072119999999999" + !responseJSON.sellerAgreementStatus+!responseJSON.buyerAgreementStatus + !responseJSON1.isTradeOwner + !pageSelected)


            // Money Transfer - to be uncommented - just for buy now

            // if (!responseJSON.buyerVirtualAccountStatus && !responseJSON1.isTradeOwner && !pageSelected) {
            //
            //     setDisplayBuyerVirtualAccountCreated(true)
            //     pageSelected = true
            //     return
            //
            // }else {
            //     setDisplayBuyerVirtualAccountCreated(false)
            // }

            if (!responseJSON.sellerVirtualAccountStatus && responseJSON1.isTradeOwner && !pageSelected) {
                // //conole.log("yoyo072119999999999virtualaccounts" + responseJSON.sellerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
                //conole.log("inside setDisplaySellerVirtualAccountCreated")
                setDisplaySellerVirtualAccountCreated(true)
                pageSelected = true
                return
            }else {
                setDisplaySellerVirtualAccountCreated(false)
            }

            // to be uncommented - just for buy now

            // if (!responseJSON.buyerVirtualAccountAddedRequiredMoneyStatus && !responseJSON1.isTradeOwner && !pageSelected) {
            //     // //conole.log("yoyo411" + responseJSON.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
            //     //conole.log("inside setDisplaybuyerVirtualAccountAddedRequiredMoneyStatus")
            //     setDisplaybuyerVirtualAccountAddedRequiredMoneyStatus(true)
            //     pageSelected = true
            //     return
            // }else {
            //     setDisplaybuyerVirtualAccountAddedRequiredMoneyStatus(false)
            // }


            if (!responseJSON.buyerMoneyReceivedForTradeStatus && !responseJSON1.isTradeOwner && !pageSelected) {
                // //conole.log("yoyo1" + responseJSON.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
                //conole.log("inside setDisplaybuyerVirtualAccountAddedRequiredMoneyStatus")
                setDisplaybuyerMoneyReceivedForTradeStatus(true)
                pageSelected = true
                return
            }else {
                setDisplaybuyerMoneyReceivedForTradeStatus(false)
            }

            // Agreement Signing buyer
            if (!responseJSON.buyerAgreementStatus && !responseJSON1.isTradeOwner && !pageSelected) {
                ////conole.log("yoyo072119999999999yoyo1" + responseJSON.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
                //conole.log("inside setDisplayAgreementSign - buyer")
                setDisplayAgreementSignBuyer(true)
                pageSelected = true;
                return
            } else {
                setDisplayAgreementSignBuyer(false)
            }

            //seller waiting for buyer to transfer Money
            if (!responseJSON.buyerMoneyReceivedForTradeStatus && responseJSON1.isTradeOwner && !pageSelected) {
                //conole.log("inside setWaitingForMoneyTransferStatus")
                setWaitingForMoneyTransferStatus(true)
                pageSelected = true
                return
            }else {
                setWaitingForMoneyTransferStatus(false)
            }


            //buyer waiting for seller's agreement signing
            if ((!responseJSON.sellerAgreementStatus) && !responseJSON1.isTradeOwner && !pageSelected) {
                // //conole.log("yoyo072119999999999wait" + responseJSON.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
                //conole.log("inside setWaitingForBothToSignAgreement if")
                setWaitingForBothToSignAgreement(true)
                pageSelected = true
                return
            } else {
                //conole.log("inside setWaitingForBothToSignAgreement else")
                setWaitingForBothToSignAgreement(false)
            }

            // Trade Transfer
            if (!responseJSON.buyerTradeTransferConfirmation_STATUS && !responseJSON.sellerTradeTransferStatus && responseJSON1.isTradeOwner && !pageSelected) {
                //conole.log("inside setDisplaysellerTradeTransferStatus")
                setDisplaysellerTradeTransferStatus(true)
                pageSelected = true
                return
            }else {
                setDisplaysellerTradeTransferStatus(false)
            }



            if (!responseJSON.buyerTradeTransferConfirmation_STATUS && !responseJSON1.isTradeOwner && !pageSelected) {
                //conole.log("inside setDisplaybuyerTradeTransferConfirmation_STATUS")
                setDisplaybuyerTradeTransferConfirmation_STATUS(true)
                setDisplaysellerTradeTransferStatus1(true)
                pageSelected = true
                return
            }else {
                setDisplaybuyerTradeTransferConfirmation_STATUS(false)

                setDisplaysellerTradeTransferStatus1(false)
            }

            if (!responseJSON.sellerAgreementStatus && responseJSON1.isTradeOwner && !pageSelected) {
                // //conole.log("yoyo072119999999999yoyo2" + responseJSON.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + responseJSON.sellerAgreementStatus)
                //conole.log("inside setDisplayAgreementSign - seller")
                setDisplayAgreementSignSeller(true)
                pageSelected = true
                return
            } else {
                setDisplayAgreementSignSeller(false)
            }

            //seller waiting for buyer trade transfer confirmation
            if (!responseJSON.buyerTradeTransferConfirmation_STATUS && responseJSON1.isTradeOwner && !pageSelected) {
                //conole.log("inside setSellerWaitingForBuyerTradeConfirmation")
                setSellerWaitingForBuyerTradeConfirmation(true)
                setDisplaybuyerTradeTransferConfirmation_STATUS1(true)
                pageSelected = true
                return
            }else {
                setSellerWaitingForBuyerTradeConfirmation(false)

                setDisplaybuyerTradeTransferConfirmation_STATUS1(false)
            }

            // Trustee Approval

            if (!responseJSON.trusteeApprovalStatus && !pageSelected) {
                //conole.log("inside setWaitingForTrusteeToApproveStatus")
                setWaitingForTrusteeToApproveStatus(true)
                pageSelected = true
                return
            }  else {
                setWaitingForTrusteeToApproveStatus(false)
            }

            if (!responseJSON.trusteeApprovalStatus && !pageSelected) {

            }
            else {
                //conole.log("inside setTransactionCompletedStatus")
                setTransactionCompletedStatus(true)
                pageSelected = true
                return
            }


            // //conole.log("yoyo12" + agreement.buyerAgreementStatus + responseJSON1.isTradeOwner + pageSelected + agreement.sellerAgreementStatus)

        }
,[anythingchanged]
    )

const callbackfunc = () => { 
    setAnythingchanged({})
}

    return(
    <div className="BuyerAgreementSignup-Sec container mt-4">
        <div className="row">
            <div className="col-md-12 col-12">
                <Breadcrumbs/>
            </div>
            <div className="col-lg-3 col-md-4 col-12 order-12 order-md-1">
                <div className="">
                    <BuyerAgreementLeftHalf selectedTrade={selectedTrade} balancefreeze={balancefreeze}/>
                </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12 order-1 order-md-12">
                <div className="buyeragreement_right my-card">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 col-12 order-12 order-md-1">
                                <div className="change-component-section">

                                    {displaySellerVirtualAccountCreated ? <VirtualAccount   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}
                                    {displayBuyerVirtualAccountCreated ? <VirtualAccount   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}
                                    {displaybuyerVirtualAccountAddedRequiredMoneyStatus ? <AddMoneyVirtualAccount   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}
                                    {/*//Seller Waiting for Buyer to transfer the money to UA*/}
                                    {waitingForMoneyTransferStatus ? <SellerWaitingForBuyerMoneyTransfer   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}

                                    {displayAgreementSignBuyer ? <AadharBasedAgreement selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc} /> : null}

                                    {waitingForBothToSignAgreement ? <WaitingForBothSignAgreement  selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}

                                    {/*****************/}
                                    {displaysellerTradeTransferStatus ? <SellerTradeTransferConfirmation   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}
                                    {displaybuyerTradeTransferConfirmation_STATUS ? <BuyerTradeTransferConfirmation   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}

                                    {displayAgreementSignSeller ? <AadharBasedAgreement selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc} /> : null}

                                    {/*//Buyer/Seller Waiting for Trustee to approve the transaction*/}
                                    {sellerWaitingForBuyerTradeConfirmation ? <SellerWaitingForBuyerTradeConfirmation   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}

                                    {/**********************/}
                                    {/*{displayAgreementSignBuyer ? <AadharBasedAgreement selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc} /> : null}*/}

                                    {/**************************/}
                                    {waitingForTrusteeToApproveStatus ? <BuyerSellerWaitingForTrusteeApproval   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}
                                    {/*//transaction completed*/}
                                    {transactionCompletedStatus ? <TransactionCompleted   selectedTrade={selectedTrade} agreement={agreement} callbackfunc={callbackfunc}/> : null}

                               </div>
                            </div>
                            <div className="col-lg-5 col-md-12 col-12 order-1 order-md-12">
                                <BuyerAgreementRightHalf

                                    selectedTrade={selectedTrade}
                                    displayAgreementSignBuyer={displayAgreementSignBuyer}
                                    displayAgreementSignSeller={displayAgreementSignSeller}
                                    displayBuyerVirtualAccountCreated={displayBuyerVirtualAccountCreated}
                                    displaybuyerVirtualAccountAddedRequiredMoneyStatus={displaybuyerVirtualAccountAddedRequiredMoneyStatus}
                                    waitingForBothToSignAgreement={waitingForBothToSignAgreement}
                                    displaysellerTradeTransferStatus={displaysellerTradeTransferStatus}
                                    displaysellerTradeTransferStatus1={displaysellerTradeTransferStatus1}
                                    waitingForMoneyTransferStatus={waitingForMoneyTransferStatus}
                                    displaybuyerTradeTransferConfirmation_STATUS={displaybuyerTradeTransferConfirmation_STATUS}
                                    displaybuyerTradeTransferConfirmation_STATUS1={displaybuyerTradeTransferConfirmation_STATUS1}
                                    sellerWaitingForBuyerTradeConfirmation={sellerWaitingForBuyerTradeConfirmation}
                                    waitingForTrusteeToApproveStatus={waitingForTrusteeToApproveStatus}
                                    transactionCompletedStatus={transactionCompletedStatus}
                                />
                            </div>

                        </div>

                </div>
            </div>
        </div>
    </div>
     )
}

export default BuyerAgreement