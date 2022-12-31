import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./negotiations.css";
import BuyerCard from "../../Components/BuyerCard";
import BuyerCardInvalid from "../../Components/BuyerCard_Invalid";
import BuyerCardSoldOut from "../../Components/BuyerCardSoldOut";
import SellerCard from "../../Components/SellerCard";
import SellerCardInvalid from "../../Components/SellerCardInvalid";
import SellerCardTimeout from "../../Components/SellerCardTimeout";
// import {
//     successToast,errorToast
// } from "./../../../../Toast/index";
import {unstable_batchedUpdates} from 'react-dom'

import Buttons from "../../Components/Buttons"

import BuyersTab from "../../Components/Negotiation CompanyList/BuyersTabs"
import SelectedAssest from "../../Components/SelectedAssest";
import successImage from "../../Components/Toast/green_check_small_filled.png";
import rejectImage from "./red_cross_circle_filled.png"
import NegotiationCompanyList from "../../Components/Negotiation CompanyList/negotiationcompanylist"
import {
    BrowserRouter as Router,
    useLocation, useHistory, Link
} from "react-router-dom";
import NegotiateActions from "../../Components/NegotiateActions/NegotiateActions"
import { apiCall } from "../../Utils/Network";
import { store } from "../../Utils/uaredux";
import { connectToChat } from "../../Utils/chat";
import 'bootstrap/dist/css/bootstrap.min.css';
import { tr } from "date-fns/locale";
import BuyerCardListingUpdate from "../../Components/BuyerCardListingUpdate/BuyerCardListingUpdate";
import SellerCardListingUpdate from "../../Components/SellerCardListingUpdate/SellerCardListingUpdate";

import loadingImg from './loading.gif'
import { successToast, errorToast } from "../../Components/Toast/index";
import OnboardingAlertDialog from "../../Components/OnboardingVarificationDialogBox/OnboardingVarificationDialogBox";

let Negotiations = (props) => {



    const [loaderActive, setloaderActive] = React.useState(false)
    const [dialogPage, setDialogPage ] = React.useState(false);

    //const [tradecommunication,setTradeCommunication] = React.useState({});
    const [tradecommunication1, setTradeCommunication1] = React.useState([]);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const chatEndRef =useRef(null)

    const scrollToBottom2 = () => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        // connectToChat()
        scrollToBottom2()

    });

    // for add class in body
    useEffect(() => {
        return (window.location.pathname == "/transactions" ?
            document.body.className = 'bg-white' : null)
    }, []);

    // for conversation start from bottom
    useEffect(() => {
        scrollToBottom();
    }, [tradecommunication1]);

    const location = useLocation();
    let history = useHistory();

    // const selectedTrade = location.state.selectedTrade;
    const [selectedTrade, setselectedTrade] = React.useState({});

    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    // console.log("hi calling**********1"+selectedOnGoingTxn.id)

    const [newoffer, setNewoffer] = React.useState(false);
    const [offeraccepted, setOfferaccepted] = React.useState(false);
    const [offerrejected, setOfferrejected] = React.useState(false);
    const [qtyupdated, setqtyupdated] = React.useState(false);
    const [priceupdated, setpriceupdated] = React.useState(false);
    const [qtyOver, setqtyOver] = React.useState(false);
    const [islastoffermine1, setislastoffermine1] = React.useState(false);
    const [newOfferButtonText, setNewOfferButtonText] = React.useState("New Offer");
    const [ongoingtxnid, setOngoingtxnid] = React.useState('');
    const [lastOfferCommunicationId, setLastOfferCommunicationId] = React.useState('');
    const storeRef = useRef(() => {});

    React.useEffect(async () => {
        setOfferaccepted(false)
        setqtyOver(false)
        // console.log("hi calling**********"+selectedOnGoingTxn.id)

        //console.log("health wealth pyar11"+selectedOnGoingTxn.id)
        loaderActive?setloaderActive(false):setloaderActive(true);
        getTrade()
        // GetTradeCommunication();
        setloaderActive(false)
        document. body. className = 'scroll-default bg-white';
        return () => { document. body. className = 'bg-white'; }

    }, [selectedOnGoingTxn])


    React.useEffect(async () => {
        console.log("health wealth pyar"+selectedTrade.id)

        GetTradeCommunication();

    }, [selectedTrade])

    React.useEffect( () => {
        // connectToChat()
        const unsubscribe = store.subscribe(callbackredux)
        return unsubscribe;
    }, [])



    // useEffect(() => {
    //     return () => {
    //         console.log("negotiation cleaned up");
    //         unsubscriberedux()
    //     };
    // }, []);

    const getTrade = async function () {

        let response = await apiCall("tradeongoingtranaction/trade/specifictxn/"+selectedOnGoingTxn.id, 'GET', '', history)
        // console.log(response)
        let responseJSON = await response.json();
        // console.log(responseJSON)
        // {console.log("orrrrrrrrr1"+responseJSON.isTradeOwner)}
        setselectedTrade(responseJSON)
    }
    const acceptorreject = function () {
        setNewoffer(false)
        setOfferaccepted(false)
        setOfferrejected(false)
        setqtyupdated(false)
        setpriceupdated(false)
        setislastoffermine1(true)
        setNewOfferButtonText("Revised Offer")
        setMakeAnOffer(false);
        setMakeoffer(false);
        //console.log("acceptorreject called",x)
    }

    const cancelButton = function () {

            setOfferaccepted(false)
            setqtyOver(false)

            setOfferrejected(false)
            setMakeAnOffer(false);
            setNewoffer(false)
            setOfferrejected(false)
            setqtyupdated(false)
            setpriceupdated(false)
            setislastoffermine1(false)
            setlastOfferTimeOut(false)
    }

    let chatBalloons = [];
    let tradecommunication = {};

    let isRejected = false;
    let isAccepted = false;

    let isQtyUpdated = false;

    let isLastOfferTimeOut = false;

    let isPriceUpdated = false;

    let isQtyOver = false;

    let isLastOfferMine = false;

    var reqBody = {

        "communicationStatus": "",
        "nonTradeOwnerAccountId": "",
        "tradeOnGoingTransactionId": "",
        "message": "it's a dummy comment",
        "offeredPrice": selectedTrade.minBidPriceAccepted,
        "offeredQuantity": selectedTrade.qty,
        "tradeId": selectedOnGoingTxn.tradeId,
        "lastOfferCommunicationId": lastOfferCommunicationId
    }


    //delete the last valid offer, if exists
    const deleteOffer = async (communicationid) => {

        // console.log("deleting offer")
        //ongoingtxnid
        //api call

        try {
            let response = await apiCall(`tradecommunication/deletelastvalidcommunication/`+communicationid, 'POST',{}, history)

            // let response = await fetch("http://api1.unlistedassets.com/profile/signup",
            //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
            // )

             if (response.status === 200) {
                // console.log("ooooooooopppp")
                 chatBalloons = []
                 GetTradeCommunication()

                return
            } else {
                 // errorToast("Invalid", "Offer is not deleted!!, try after sometime");
            }
        } catch (error) {
            //console.log("error", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }

    }

    const callbackredux = async () => {
        // console.log("negotiation yo yo honey singh"+store.getState().toString())
        try {

            chatBalloons = []
            GetTradeCommunication()
        } catch (error) {
            // console.log("error", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }
    }

    const editTimerOffer = async () => {

        // // console.log("editing offer")
        //ongoingtxnid
        //api call

        try {
            chatBalloons = []
            GetTradeCommunication()
        } catch (error) {
            // console.log("error", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }

    }
    const GetTradeCommunication = async () => {

        //when people press negotiate button (marketplace)
        //we got to create ongoing transaction record
        //
        // console.log("ytytytytytytytytytytytytyty22999999" + selectedTrade.id)
        try {
            const response = await apiCall("tradecommunication/specificongoingtransaction/" + selectedOnGoingTxn.id, "GET", '', history)
            if(response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return
            }
            const responseJSON = await response.json();

            //console.log("ma1"+responseJSON.length)
            // console.log(responseJSON + "ytytytytytytytytytytytytyty6666")
            // console.log("ma2")
            //await setTradeCommunication(responseJSON)
            tradecommunication = responseJSON;

            creatingChatBallons()

            if (isRejected) {
                // console.log("abababsbababa")
                setOfferrejected(true)
                setNewOfferButtonText("New Offer")
            } else {
                setOfferrejected(false)
                // setNewOfferButtonText("New Offer")
            }

            if (isAccepted) {
                // console.log("abababsbababa1")
                setOfferaccepted(true)
            } else {
                setOfferaccepted(false)
            }

            if (isQtyUpdated) {
                // console.log("abababsbababa2")
                setqtyupdated(true)
            } else {
                setqtyupdated(false)
            }

            if (isLastOfferTimeOut) {
                // console.log("abababsbababa2")
                setlastOfferTimeOut(true)
            } else {
                setlastOfferTimeOut(false)
            }

            if (isPriceUpdated) {
                // console.log("abababsbababa2")
                setpriceupdated(true)
            }

            if (isQtyOver) {
                // console.log("abababsbababa2")
                setqtyOver(true)
            } else {
                setqtyOver(false)
            }

            if (isLastOfferMine) {
                // alert("hiiii1111")
                setislastoffermine1(true)
                setNewOfferButtonText("Revised Offer")
            } else if (!isRejected && !isAccepted) {
                // alert("hiiii22222")
                setNewOfferButtonText("Counter Offer")
                setislastoffermine1(false)
            }

            //alert("hpppp1"+isLastOfferMine+isRejected+isAccepted+isQtyOver+isQtyUpdated+isPriceUpdated+isLastOfferTimeOut)

            // this means this is the counter offer of samne wala
            if (!isLastOfferMine && !isRejected && !isAccepted
            && !isQtyOver && !isQtyUpdated && !isPriceUpdated && !isLastOfferTimeOut) {
                //console.log("choccho11111")
                unstable_batchedUpdates(() => {
                    // alert("hpppp2")
                    setMakeAnOffer(false)
                    setNewoffer(false)
                    setOfferrejected(false)
                    setqtyupdated(false)
                    setpriceupdated(false)
                    setislastoffermine1(false)
                    setlastOfferTimeOut(false)

                    setOfferaccepted(false)
                    setqtyOver(false)

                })

            }

            // console.log("ma2" + tradecommunication.length)
        } catch (err) {
            //console.log(err);
        }
    }
    const [lastOfferTimeOut, setlastOfferTimeOut] = React.useState(false);
    const [MakeAnOffer, setMakeAnOffer] = React.useState(false);
    const [makeoffer, setMakeoffer] = React.useState(false);
    const [listingupdated, setListingupdated] = React.useState(true);

    const [NegotiateActionsButton, setNegotiateActionsButton] = React.useState(true);
    const MakeAnOfferButton = () => {
        setMakeAnOffer(true);
        setMakeoffer(false);
    }

    const closeDialog=()=>{
        // console.log('aaaaaaa')
        setDialogPage(false)
    };

    const acceptButton = function () {
        return (<React.Fragment>
            <Buttons.SecondaryButton value="Accept" onClick={async () => {


                try {
                    const responseprofile = await apiCall("useronboarding/accountonboarding", "GET", '', history);
                    let responseprofileJSON = await responseprofile.json();

                    if(responseprofileJSON != undefined
                        && responseprofileJSON.uaVerifiedStatus == "Verified") {
                        //accept the offer happly
                    } else {
                        errorToast("Invalid", "Not Allowed, onboarding not completed/verified!!")
                        setDialogPage(true);
                        return
                    }
                } catch (e) {
                    setDialogPage(true);
                    // errorToast("Invalid", "Not Allowed, onboarding not completed/verified!!")
                    return
                }


                //
                reqBody.communicationStatus = "accepted"
                reqBody.tradeOnGoingTransactionId = ongoingtxnid
                let response = await apiCall("tradecommunication/", 'POST', reqBody, history)
                // console.log(reqBody)
                // console.log("accept called")

                if (response.status === 409) {
                    errorToast("Invalid", "Communication has been updated, pl re-do")

                    return
                } else if(response.status === 200) {
                    successToast("Success","Request Sent Successfully")
                } else {
                    errorToast("Invalid", "Something went wrong, pl refresh and do it again or contact admin")
                    return
                }

                GetTradeCommunication()
                setOfferaccepted(true)
                setNewoffer(false)
                setOfferrejected(false)
                setqtyupdated(false)
                setpriceupdated(false)
                setislastoffermine1(false)
                // setislastoffermine1("New Offer")
                setlastOfferTimeOut(false)
            }} style={{ width: "100%" }} />
        </React.Fragment>

        )
    }

    const rejectButton = function () {

        return (<React.Fragment>
            <Buttons.SecondaryButton value="Reject" onClick={async () => {
                //setOfferrejected(true)
                reqBody.communicationStatus = "rejected"
                reqBody.tradeOnGoingTransactionId = ongoingtxnid
                let response = await apiCall("tradecommunication/", 'POST', reqBody, history)
                // console.log(reqBody)
                // console.log("reject called")
                if (response.status === 409) {
                    errorToast("Invalid", "Communication has been updated, pl re-do")

                    return
                } else if(response.status === 200) {
                    successToast("Success","Request Sent Successfully")
                }
                GetTradeCommunication()
                setOfferrejected(true)
                setqtyupdated(false)
                setpriceupdated(false)
                setOfferaccepted(false)
                setNewoffer(false)
                setislastoffermine1(false)
                // setislastoffermine1("New Offer")
                setlastOfferTimeOut(false)

            }} style={{ width: "100%", marginLeft: "5px" }} />
        </React.Fragment>
        )
    }
    const newOfferButton = function () {
        return (

            <React.Fragment>
                <Buttons.PrimaryButton value={newOfferButtonText} onClick={async () => {
                    setNewoffer(true)
                    setOfferrejected(false)
                    setqtyupdated(false)
                    setpriceupdated(false)
                    setOfferaccepted(false)
                    setislastoffermine1(false)
                    setlastOfferTimeOut(false)
                }} style={{ width: "100%" }} />
            </React.Fragment>
        )
    }


    const [getfunction,setGetfunction]=useState({});

    // console.log(getfunction,"mayur");

    const newOfferCard = function () {
        // {setNewoffer(false)}
        return (<React.Fragment>
            <br />

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <NegotiateActions newoffer={newoffer} setNewoffer={setNewoffer} callback={GetTradeCommunication} tradecommunication1={tradecommunication}
                    acceptorreject={acceptorreject} offerReject={offerrejected} ongoingtxnid1={ongoingtxnid} selectedTrade={selectedTrade}
                                  lastOfferCommunicationId={lastOfferCommunicationId}
                                  cancelButton={cancelButton} islastoffermine1={islastoffermine1}
                                  offerrejected={offerrejected}
                />
            </div>
        </React.Fragment>

        )
    }

    const RejectCard = function () {
        return (
            <React.Fragment>

                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div>
                        <div className="reject-tost">
                            <div className="d-flex align-items-center">
                                <img src={rejectImage} className="m-2" width="30" height="30" />
                                <h5 className="m-0 ">Offer Rejected</h5>
                            </div>
                            <div style={{ marginLeft: "40px" }}>
                                {/* <p className="text-small "> Hard Luck !! your offer is rejected by the seller.<br /> Unfortunately you will not be able to bid any further.<br /> Don't worry, find out more sellers in the  marketplace section and continue trading.
                                </p> */}
                                 <p className="text-small ">                                 
                                 You can still make a new offer or find out more sellers/buyers in the  marketplace section and continue trading.
                                </p>
                            </div>
                            <div>
                                <Link to="/inventory_1">
                                    <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Go To Marketplace</button>
                                </Link>
                            </div>
                        </div>
                        {/*<div className="text-center py-4">*/}
                        {/*    <h6 className="text-default-secoundary"><b>Don't worry, you still make<br/> a counter offer !</b></h6>*/}
                        {/*</div>*/}
                    </div>

                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-over
    const StopCardQtyOver = function () {
        return (
            <React.Fragment>

                <div className="text-center py-5 d-flex justify-content-center">
                    <div className="negotiation-sold">
                        <h3 className="text-primary-default py-3">Oops!</h3>
                        <h6 className=""><b>This listing was sold out</b></h6>
                        <p className="text-small px-4">Don't worry,you will get it next time.Seller reservers the right to reject your offer or sell the stocks to best bidder. </p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-decreased
    const StopCardQtyDecreased = function () {
        return (
            <React.Fragment>

                <div className="text-center py-5 d-flex justify-content-center">
                    <div className="negotiation-sold">
                        <h3 className="text-primary-default py-3">Oops!</h3>
                        <h6 className=""><b>The listing's Qty has been decreased</b></h6>
                        <p className="text-small px-4">Don't worry,Still you can make the offer considering the decreased Quantity</p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <Buttons.SecondaryButton value="Make a new offer" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </React.Fragment>

        )
    }

    //stopbyua-price-increased
    const StopCardPriceIncreased = function () {
        return (
            <React.Fragment>

                <div className="text-center py-5 d-flex justify-content-center">
                    <div className="negotiation-sold">
                        <h3 className="text-primary-default py-3">Oops!</h3>
                        <h6 className=""><b>The listing's Minimum Acceptance Bid Price has been increased</b></h6>
                        <p className="text-small px-4">Don't worry,Still you can make the offer considering the increased Minimum Acceptance Bid </p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <Buttons.SecondaryButton value="Make a new offer" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-increased
    const StopCardQtyIncreased = function () {
        return (
            <React.Fragment>

                <div className="text-center py-5 d-flex justify-content-center">
                    <div className="negotiation-sold">
                        <h3 className="text-primary-default py-3">Great!</h3>
                        <h6 className=""><b>The listing's Qty has been increased</b></h6>
                        <p className="text-small px-4">Now you can make the offer considering the increased Quantity</p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <Buttons.SecondaryButton value="Make a new offer" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*/!*    <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </React.Fragment>

        )
    }

    //stopbyua-price-decreased
    const StopCardPriceDecreased = function () {
        return (
            <React.Fragment>

                <div className="text-center py-5 d-flex justify-content-center">
                    <div className="negotiation-sold">
                        <h3 className="text-primary-default py-3">Oops!</h3>
                        <h6 className=""><b>The listing's Minimum Acceptance Bid Price has been decreased</b></h6>
                        <p className="text-small px-4">Now you can make the offer considering the decreased Minimum Acceptance Bid </p>
                        {/*<div className="d-flex justify-content-center">*/}
                        {/*    <Buttons.SecondaryButton value="Make a new offer" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*    <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </React.Fragment>

        )
    }

    const AcceptCard = function () {

        return (<React.Fragment>
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="accept-tost">
                    <div className="d-flex align-items-center">
                        <img src={successImage} className="m-2" height="30" width="30" />
                        <h5 className="m-0">Offer Accepted</h5>
                    </div>
                    <div className="accept-tost-msg">
                        <p className="text-small">Congratulations! <br />Your offer has been accepted. You can<br /> proceed to our safe Transaction Page
                        </p>
                    </div>
                    <div>
                        <Link to="/ongoingtransaction">
                            <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Go To Transactions</button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>

        )

    }



    const acceptrehectnewofferbutton = () => {
        return (<React.Fragment>
            <div className="Negotiate-actions">
                <div className="negotiation_buttons_container chat-action position-sticky">
                    {acceptButton()}
                    {rejectButton()}
                    {newOfferButton()}
                </div>
            </div>

        </React.Fragment>
        )
    }



    const creatingChatBallons = async function () {
        chatBalloons = []

        // console.log("ytytytytytytytytytytytytyty2222233333")

        let a = "";
        let b = "";

        // console.log(tradecommunication.length + "ytytytytytytytytytytytytyty1")
        if (tradecommunication.length > 0) {
            setOngoingtxnid(tradecommunication[0].tradeOnGoingTransactionId)
        }

        let pastDate;
        for (let i = 0; i < tradecommunication.length; i++) {
            if (i == 0) {
                pastDate = tradecommunication[i].createDate;
            } else {
                if (tradecommunication[i].createDate > tradecommunication[i - 1].createDate) {
                    chatBalloons.push(
                        <React.Fragment>
                            <h6 className="lastseen">{tradecommunication[i].createDate}</h6>
                        </React.Fragment>
                    )
                    pastDate = tradecommunication[i].createDate
                }
            }
            // console.log(tradecommunication.length + "ytytytytytytytytytytytytyty2")

            if (tradecommunication[i].isYourCommunication == true && tradecommunication[i].tradeNegotiatorType === "buy") {
                a = "(You)";
            } else {
                a = "";
            }

            if (tradecommunication[i].isYourCommunication == true && tradecommunication[i].tradeNegotiatorType === "sell") {
                b = "(You)";
            } else {
                b = "";
            }
            // console.log("hyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyh" + tradecommunication[i].communicationStatus)

            if (tradecommunication[i].tradeNegotiatorType === "buy"
                && (tradecommunication[i].communicationStatus == "newoffer"
                    || tradecommunication[i].communicationStatus == "invalidoffer")) {

                if (i == tradecommunication.length - 1
                    && tradecommunication[i].isYourCommunication) {
                    // alert("yoo"+1)
                    isLastOfferMine = true;
                } else {

                    isLastOfferMine = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }
                let buyerInvalid = false;


                if (tradecommunication[i].communicationStatus == "invalidoffer") {
                    buyerInvalid = true;

                    if (i == tradecommunication.length - 1) {
                        isLastOfferTimeOut = true;
                    }else {
                        isLastOfferTimeOut = false;
                    }
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<h6 className="lastseen">yesterday1</h6>*/}
                        <div className="buyercard mb-2">
                            <h6 className="text-dark my-2 mt-4"><b>Buyer {a}</b> <span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">
                                    {(tradecommunication[i].daysLeft > 0) ? tradecommunication[i].daysLeft + " day left ": null}
                                    {(tradecommunication[i].hoursLeft > 0 && tradecommunication[i].daysLeft <= 0) ? tradecommunication[i].hoursLeft + " hour left ": null}
                                    {(tradecommunication[i].minuteLeft > 0 && tradecommunication[i].daysLeft <= 0 && tradecommunication[i].hoursLeft <= 0) ? tradecommunication[i].minuteLeft + " minute left ": null}
                                </span>
                                {/*<span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                                {/*<span className="time text-small text-dark">{tradecommunication[i].offerInValidReason}</span>*/}
                            </h6>
                            {buyerInvalid ?
                                <BuyerCardListingUpdate values={tradecommunication[i]} /> :
                                <>
                                    {/*{console.log("orrrrrrrrr"+selectedTrade.isTradeOwner)}*/}
                                    <BuyerCard values={tradecommunication[i]} deleteOffer={deleteOffer}  callback={editTimerOffer} isTradeOwner={selectedTrade.isTradeOwner} />
                                    {/*<BuyerCardSoldOut values={tradecommunication[i]}/>*/}

                                </>
                             }
                        </div>

                        {/*<div className="listing-updated">*/}
                        {/*{*/}
                        {/*    listingupdated ? <>*/}
                        {/*     /!*<BuyerCardListingUpdate values={tradecommunication[i]}/>*!/*/}
                        {/*        /!* <div className="text-center buyer-card-listing-update">*/}
                        {/*            <h6><b>This listing was updated</b></h6>*/}
                        {/*            <p className="text-small">Don't worry,just make a new offer.As the listing was updated by the seller,this negotiation become invalid </p>*/}
                        {/*        </div> *!/*/}
                        {/*        <div className="text-center py-5 d-flex justify-content-center">*/}
                        {/*            <div className="negotiation-sold">*/}
                        {/*            <h3 className="text-primary-default py-3">Oops!</h3>*/}
                        {/*            <h6 className=""><b>This listing was sold out</b></h6>*/}
                        {/*            <p className="text-small px-4">Don't worry,you will get it next time.Seller reservers the right to reject your offer or sell the stocks to best bidder. </p>*/}
                        {/*            <div className="d-flex justify-content-center">*/}
                        {/*            <Buttons.SecondaryButton value="Go to marketplace" onClick={MakeAnOfferButton} style={{ width: "45%",marginRight:"10px"   }} />*/}
                        {/*            <Buttons.PrimaryButton value="View similar listing" onClick={MakeAnOfferButton} style={{ width: "45%",   }} />*/}
                        {/*            </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*     </>*/}
                        {/*     : */}
                        {/*     null*/}
                        {/*}*/}
                        {/*</div>*/}

                    </React.Fragment>
                )
            }
            else if (tradecommunication[i].tradeNegotiatorType === "sell"
                && (tradecommunication[i].communicationStatus == "newoffer"
                    || tradecommunication[i].communicationStatus == "invalidoffer")) {

                if (i == tradecommunication.length - 1
                    && tradecommunication[i].isYourCommunication) {
                    // alert("yoo"+1)
                    isLastOfferMine = true;
                } else {
                    isLastOfferMine = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }
                let sellerInvalid = false;

                if (tradecommunication[i].communicationStatus == "invalidoffer") {
                    sellerInvalid = true;

                    if (i == tradecommunication.length - 1) {
                        isLastOfferTimeOut = true;
                    } else {
                        isLastOfferTimeOut = false;
                    }
                }



                chatBalloons.push(
                    <React.Fragment>
                        <div className="seller-side-info">
                            <h6 className="text-dark my-2 mt-4"><b>Seller {b}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">
                                    {(tradecommunication[i].daysLeft > 0) ? tradecommunication[i].daysLeft + " day left ": null}
                                    {(tradecommunication[i].hoursLeft > 0 && tradecommunication[i].daysLeft <= 0) ? tradecommunication[i].hoursLeft + " hour left ": null}
                                    {(tradecommunication[i].minuteLeft > 0 && tradecommunication[i].daysLeft <= 0 && tradecommunication[i].hoursLeft <= 0) ? tradecommunication[i].minuteLeft + " minute left ": null}
                                        </span>
                                {/*<span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                                {/*<span className="time text-small text-dark">{tradecommunication[i].offerInValidReason}</span>*/}
                            </h6>
                        </div>

                        <div className="sellercard">
                            {sellerInvalid ?
                                <SellerCardListingUpdate values={tradecommunication[i]} /> :
                                <>
                                    <SellerCard values={tradecommunication[i]} deleteOffer={deleteOffer} callback={editTimerOffer} isTradeOwner={selectedTrade.isTradeOwner} />
                                    {/* <SellerCardTimeout values={tradecommunication[i]}/> */}
                                </>}
                        </div>
                    </React.Fragment>
                )
            } else if (tradecommunication[i].tradeNegotiatorType === "buy"
                && (tradecommunication[i].communicationStatus == "accepted"
                    || tradecommunication[i].communicationStatus == "rejected")) {
                if (tradecommunication[i].communicationStatus == "accepted") {
                    if (i == tradecommunication.length - 1) {
                        isAccepted = true;
                    }

                    if (i == tradecommunication.length - 1) {
                        setLastOfferCommunicationId(tradecommunication[i].id)
                    }

                    chatBalloons.push(
                        <React.Fragment>
                            <div className="buyercard">

                                <h3 className="text-dark my-2"><b>Buyer {a}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                    <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                </h3>

                                <AcceptCard />

                            </div>
                        </React.Fragment>
                    )
                } else {
                    if (i == tradecommunication.length - 1) {
                        isRejected = true;
                    } else {
                        isRejected = false;
                    }

                    if (i == tradecommunication.length - 1) {
                        setLastOfferCommunicationId(tradecommunication[i].id)
                    }

                    chatBalloons.push(
                        <React.Fragment>
                            <div className="buyercard">
                                <h3 className="text-dark my-2"><b>Buyer {a}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                    <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                </h3>

                                <RejectCard />

                            </div>
                        </React.Fragment>
                    )
                }


            } else if (tradecommunication[i].tradeNegotiatorType === "sell"
                && (tradecommunication[i].communicationStatus == "accepted"
                    || tradecommunication[i].communicationStatus == "rejected")) {
                if (tradecommunication[i].communicationStatus == "accepted") {
                    if (i == tradecommunication.length - 1) {
                        isAccepted = true;
                    }

                    if (i == tradecommunication.length - 1) {
                        setLastOfferCommunicationId(tradecommunication[i].id)
                    }

                    chatBalloons.push(
                        <React.Fragment>
                            <div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
                                <h6 className="text-dark my-2"><b>Seller {b}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                    <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                </h6>

                            </div>
                            <div className="sellercard">

                                <AcceptCard />

                            </div>
                        </React.Fragment>
                    )
                } else {
                    if (i == tradecommunication.length - 1) {
                        isRejected = true;
                    } else {
                        isRejected = false;
                    }

                    if (i == tradecommunication.length - 1) {
                        setLastOfferCommunicationId(tradecommunication[i].id)
                    }

                    chatBalloons.push(
                        <React.Fragment>
                            <div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
                                <h6 className="text-dark my-2"><b>Seller {b}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                    <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                </h6>
                            </div>
                            <div className="sellercard">

                                <RejectCard />

                            </div>
                        </React.Fragment>
                    )
                }
            }
            else if (tradecommunication[i].communicationStatus == "stopbyua-quantity-decreased") {

                if (i == tradecommunication.length - 1) {
                    isQtyUpdated = true;
                }  else {
                    isQtyUpdated = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>*/}
                        {/*    <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>*/}
                        {/*        <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                        {/*    </h6>*/}
                        {/*</div>*/}
                        <div className="sellercard">

                            <StopCardQtyDecreased />

                        </div>
                    </React.Fragment>
                )



                //last offer stands invalid
                //only new offer window opened
            }
            else if (tradecommunication[i].communicationStatus == "stopbyua-quantity-increased") {
                if (i == tradecommunication.length - 1) {
                    isQtyUpdated = true;
                }else {
                    isQtyUpdated = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>*/}
                        {/*    <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>*/}
                        {/*        <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                        {/*    </h6>*/}
                        {/*</div>*/}
                        <div className="sellercard">

                            <StopCardQtyIncreased />

                        </div>
                    </React.Fragment>
                )



                // no change in system, last offer is ramins valid if any
            }
            else if (tradecommunication[i].communicationStatus == "stopbyua-quantity-over") {

                if (i == tradecommunication.length - 1) {
                    // isQtyUpdated = true;
                    isQtyOver = true;
                }else {
                    isQtyOver = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>*/}
                        {/*    <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>*/}
                        {/*        <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                        {/*    </h6>*/}
                        {/*</div>*/}
                        <div className="sellercard">

                            <StopCardQtyOver />

                        </div>
                    </React.Fragment>
                )

                //last offer stands invalid
                // No action buttons
                //stop chat
            }            else if (tradecommunication[i].communicationStatus == "stopbyua-price-decreased") {

                if (i == tradecommunication.length - 1) {
                    isPriceUpdated = true;
                }else {
                    isPriceUpdated = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>*/}
                        {/*    <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>*/}
                        {/*        <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                        {/*    </h6>*/}
                        {/*</div>*/}
                        <div className="sellercard">

                            <StopCardPriceDecreased />

                        </div>
                    </React.Fragment>
                )



                //last offer stands invalid
                //only new offer window opened
            }
            else if (tradecommunication[i].communicationStatus == "stopbyua-price-increased") {
                if (i == tradecommunication.length - 1) {
                    isPriceUpdated = true;
                }else {
                    isPriceUpdated = false;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>*/}
                        {/*    <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>*/}
                        {/*        <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>*/}
                        {/*    </h6>*/}
                        {/*</div>*/}
                        <div className="sellercard">

                            <StopCardPriceIncreased />

                        </div>
                    </React.Fragment>
                )



                // no change in system, last offer is ramins valid if any
            }

        }

        setTradeCommunication1([...chatBalloons]);
    }

    return (
        <div className="bg-white negotiate-transaction-chat ">
            <div className="container">
                <Breadcrumbs />

                <div className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-12 order-lg-1 dbmn">
                            <div className="ongoing-negotiations Negotiations-left-section">
                                <NegotiationCompanyList  communicationLength={tradecommunication1.length}/>
                             </div>
                        </div>

                        <div className="col-md-6 col-12 order-2 order-lg-2">
                            <div className="active-negotiation Negotiations-chat-section w-100 ">

                                <div className="conversation" >
                                    <div className="conversation_inner scroll-default" >

                                        {tradecommunication1}
                                        {/* <div ref={messagesEndRef} /> */}
                                        <div  ref={chatEndRef}/>
                                        {
                                            tradecommunication1.length == 0 && !MakeAnOffer?

                                                            <>{loaderActive?<div className="negotiation-loader text-center mt-auto"><img src={loadingImg} alt="" /></div> :

                                                                <div className="row text-center justify-content-center text-center">
                                                                    <div className="col-md-9" style={{ marginBottom: "40%", marginTop: "10%" }}>
                                                                        <h5><b>Make an offer to the seller<br />
                                                                            before its sold out.</b></h5>
                                                                        <p className="text-small mt-3">Sending an offer is only the beginning of the negotiation<br /> with seller. Seller reserves the right to reject your offer or<br /> sell the stock to best bidder.</p>
                                                                        <Buttons.PrimaryButton value="Make an offer" onClick={MakeAnOfferButton} style={{ width: "35%", marginLeft: "30%", marginTop: "35px" }} />
                                                                    </div>
                                                                </div>}
                                                            </> :
                                                            <>


                                                            <div className="Negotiate-actions ">
                                                                {/*{console.log("choccho" + MakeAnOffer+newoffer + offerrejected + qtyupdated + islastoffermine1)}*/}
                                                                {(offeraccepted || qtyOver) ? null :
                                                                    tradecommunication1.length == 0 || MakeAnOffer || newoffer || offerrejected || qtyupdated || priceupdated || islastoffermine1 || lastOfferTimeOut ? newOfferCard():
                                                                        acceptrehectnewofferbutton()
                                                                }
                                                            </div></>
                                                    }

                                    </div>
                                    <>
                                        {/*<div className="Negotiate-actions ">*/}
                                        {/*    {console.log("choccho" + newoffer + offerrejected + offeraccepted + islastoffermine1)}*/}
                                        {/*    {offeraccepted ? null :*/}
                                        {/*        tradecommunication1.length == 0 || newoffer || offerrejected || qtyupdated|| islastoffermine1 ? <> {tradecommunication1.length != 0 || MakeAnOffer ? newOfferCard() : null}  </> :*/}
                                        {/*            acceptrehectnewofferbutton()*/}
                                        {/*    }*/}
                                        {/*</div>*/}
                                    </>



                                </div>

                            </div>

                        </div>
                        <div className="col-md-3 col-lg-3 col-12 order-1 order-lg-3 p-0">
                            <div className="Negotiation-details ">
                                <SelectedAssest qtyupdated={qtyupdated} priceupdated={priceupdated}/>
                            </div>
                        </div>
                    </div>
                </div>
                <OnboardingAlertDialog dialogPage={dialogPage} onClose={closeDialog}/>
            </div>
        </div>
    )
}

export default Negotiations