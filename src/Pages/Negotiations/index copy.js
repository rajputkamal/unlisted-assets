import React, { useEffect, useRef } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./negotiations.css";
import BuyerCard from "../../Components/BuyerCard";
import BuyerCardInvalid from "../../Components/BuyerCard_Invalid";
import BuyerCardSoldOut from "../../Components/BuyerCardSoldOut";
import SellerCard from "../../Components/SellerCard";
import SellerCardInvalid from "../../Components/SellerCardInvalid";
import SellerCardTimeout from "../../Components/SellerCardTimeout";

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
import 'bootstrap/dist/css/bootstrap.min.css';
import { tr } from "date-fns/locale";
let Negotiations = (props) => {

    //const [tradecommunication,setTradeCommunication] = React.useState({});
    const [tradecommunication1, setTradeCommunication1] = React.useState([]);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
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
    const selectedTrade = location.state.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [newoffer, setNewoffer] = React.useState(false);
    const [offeraccepted, setOfferaccepted] = React.useState(false);
    const [offerrejected, setOfferrejected] = React.useState(false);
    const [qtyupdated, setqtyupdated] = React.useState(false);
    const [islastoffermine1, setislastoffermine1] = React.useState(false);
    const [newOfferButtonText, setNewOfferButtonText] = React.useState("New Offer");
    const [ongoingtxnid, setOngoingtxnid] = React.useState('');
    const [lastOfferCommunicationId, setLastOfferCommunicationId] = React.useState('');
    const acceptorreject = function () {
        setNewoffer(false)
        setOfferaccepted(false)
        setOfferrejected(false)
        setqtyupdated(false)
        setislastoffermine1(true)
        setNewOfferButtonText("Revised Offer")
        //console.log("acceptorreject called",x)
    }

    let chatBalloons = [];
    let tradecommunication = {};

    let isRejected = false;
    let isAccepted = false;

    let isQtyUpdated = false;

    let isLastOfferMine = false;

    var reqBody = {

        "communicationStatus": "",
        "nonTradeOwnerAccountId": "",
        "tradeOnGoingTransactionId": "",
        "message": "it's a dummy comment",
        "offeredPrice": "1",
        "offeredQuantity": "0",
        "tradeId": selectedOnGoingTxn.tradeId,
        "lastOfferCommunicationId": lastOfferCommunicationId
    }

    React.useEffect(() => {
        // console.log("hi calling**********")
        GetTradeCommunication();

        // const interval = setInterval(() => {
        //     GetTradeCommunication();
        //     acceptorreject()
        //     //setSeconds(seconds => seconds + 1);
        // }, 25000);
        //
        // return () => clearInterval(interval);
    }, [selectedOnGoingTxn, selectedTrade])

    const GetTradeCommunication = async () => {

        //when people press negotiate button (marketplace)
        //we got to create ongoing transaction record

        //console.log("ytytytytytytytytytytytytyty22" + selectedTrade.id)
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
            }
            if (isAccepted) {
                // console.log("abababsbababa1")
                setOfferaccepted(true)
            }
            if (isQtyUpdated) {
                // console.log("abababsbababa2")
                setqtyupdated(true)
            }


            if (isLastOfferMine) {
                setislastoffermine1(true)
                setNewOfferButtonText("Revised Offer")
            } else if (!isRejected && !isAccepted) {
                setNewOfferButtonText("Counter Offer")
            }

            // console.log("ma2" + tradecommunication.length)
        } catch (err) {
            //console.log(err);
        }
    }

    const [MakeAnOffer, setMakeAnOffer] = React.useState(false);
    const [makeoffer, setMakeoffer] = React.useState(true);

    const [NegotiateActionsButton, setNegotiateActionsButton] = React.useState(true);
    const MakeAnOfferButton = () => {
        setMakeAnOffer(true);
        setMakeoffer(false);
    }


    const acceptButton = function () {
        return (<React.Fragment>
            <Buttons.SecondaryButton value="Accept" onClick={async () => {
                //
                reqBody.communicationStatus = "accepted"
                reqBody.tradeOnGoingTransactionId = ongoingtxnid
                await apiCall("tradecommunication/", 'POST', reqBody, history)
                //console.log(reqBody)
                //console.log("accept called")

                GetTradeCommunication()
                setOfferaccepted(true)
                setNewoffer(false)
                setOfferrejected(false)
                setqtyupdated(false)
                setislastoffermine1(false)
                setislastoffermine1("New Offer")
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
                await apiCall("tradecommunication/", 'POST', reqBody, history)
                //console.log(reqBody)
                //console.log("reject called")

                GetTradeCommunication()
                setOfferrejected(true)
                setqtyupdated(false)
                setOfferaccepted(false)
                setNewoffer(false)
                setislastoffermine1(false)
                setislastoffermine1("New Offer")

            }} style={{ width: "100%", marginLeft: "5px" }} />
        </React.Fragment>
        )
    }
    const newOfferButton = function () {
        return (

            <React.Fragment>
                <Buttons.PrimaryButton value={newOfferButtonText} onClick={async () => {
                    // setNewoffer(true)
                    setislastoffermine1(true) //not needed still setting up, setNewoffer is enough
                    setOfferrejected(false)
                    setqtyupdated(false)
                    setOfferaccepted(false)
                    setislastoffermine1("New Offer")
                }} style={{ width: "100%" }} />
            </React.Fragment>
        )
    }

    const newOfferCard = function () {
        // {setNewoffer(false)}
        return (<React.Fragment>
            <br />
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <NegotiateActions newoffer={newoffer} setNewoffer={setNewoffer} callback={GetTradeCommunication} tradecommunication1={tradecommunication}
                    acceptorreject={acceptorreject} offerReject={offerrejected} ongoingtxnid1={ongoingtxnid}
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
                                <p className="text-small ">Oops! your order has been<br /> Rejected!
                                    You can proceed to the<br /> our safe transaction portal!
                                </p>
                            </div>
                            <div>
                                <Link to="/ongoingtransaction">
                                    <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Goto Transactions</button>
                                </Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <h6 className="text-default-secoundary"><b>Don't worry, you still make<br/> a counter offer !</b></h6>
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-over
    const StopCardQtyOver = function () {
        return (
            <React.Fragment>

                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div>
                        <div className="reject-tost">
                            <div className="d-flex align-items-center">
                                <img src={rejectImage} className="m-2" width="30" height="30" />
                                <h5 className="m-0 ">Quantity Over Alert</h5>
                            </div>
                            <div style={{ marginLeft: "40px" }}>
                                <p className="text-small ">OOPS! Seller's Qty has been<br /> over!
                                    you no longer can proceed with negotiation<br /> further!
                                </p>
                            </div>
                            {/*<div>*/}
                            {/*    <Link to="/ongoingtransaction">*/}
                            {/*        <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Goto Transactions</button>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className="text-center py-4">
                            <h6 className="text-default-secoundary"><b> Please go on negotiating <br/> another trade..</b></h6>
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-decreased
    const StopCardQtyDecreased = function () {
        return (
            <React.Fragment>

                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div>
                        <div className="reject-tost">
                            <div className="d-flex align-items-center">
                                <img src={rejectImage} className="m-2" width="30" height="30" />
                                <h5 className="m-0 ">Quantity Decreased Alert</h5>
                            </div>
                            <div style={{ marginLeft: "40px" }}>
                                <p className="text-small ">Oops! Seller's Qty has been<br /> decreased!
                                    Please bid for<br /> lower Qty now!
                                </p>
                            </div>
                            {/*<div>*/}
                            {/*    <Link to="/ongoingtransaction">*/}
                            {/*        <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Goto Transactions</button>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className="text-center py-4">
                            <h6 className="text-default-secoundary"><b>Please start the negotiation <br/> by placing a fresh offer !</b></h6>
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }

    //stopbyua-quantity-stopbyua-quantity-increased
    const StopCardQtyIncreased = function () {
        return (
            <React.Fragment>

                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div>
                        <div className="reject-tost">
                            <div className="d-flex align-items-center">
                                <img src={rejectImage} className="m-2" width="30" height="30" />
                                <h5 className="m-0 ">Quantity Decreased Alert</h5>
                            </div>
                            <div style={{ marginLeft: "40px" }}>
                                <p className="text-small ">Great! Seller's Qty has been<br /> increased!
                                    Feel free to bid for<br /> highedr Qty as well now!
                                </p>
                            </div>
                            {/*<div>*/}
                            {/*    <Link to="/ongoingtransaction">*/}
                            {/*        <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Goto Transactions</button>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className="text-center py-4">
                            <h6 className="text-default-secoundary"><b>Please continue <br/> with your ongoing negotiation...</b></h6>
                        </div>
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
                        <p className="text-small">Congratulations! your order has been<br /> Accepted!
                            You can proceed to the<br /> our safe transaction portal!
                        </p>
                    </div>
                    <div>
                        <Link to="/ongoingtransaction">
                            <button className="btn btn-sm btn-default-secoundary text-white border text-small w-100">Goto Transactions</button>
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
        //console.log("ytytytytytytytytytytytytyty2222233333")

        let a = "";
        let b = "";

        //console.log(tradecommunication.length + "ytytytytytytytytytytytytyty1")
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
            //console.log(tradecommunication.length + "ytytytytytytytytytytytytyty2")

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
            //console.log("hyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyh" + tradecommunication[i].communicationStatus)

            if (tradecommunication[i].tradeNegotiatorType === "buy"
                && (tradecommunication[i].communicationStatus == "newoffer"
                    || tradecommunication[i].communicationStatus == "invalidoffer")) {

                if (i == tradecommunication.length - 1
                    && tradecommunication[i].isYourCommunication) {
                    isLastOfferMine = true;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }
                let buyerInvalid = false;


                if (tradecommunication[i].communicationStatus == "invalidoffer") {
                    buyerInvalid = true;
                }

                chatBalloons.push(
                    <React.Fragment>
                        {/*<h6 className="lastseen">yesterday1</h6>*/}
                        <div className="buyercard mb-2">
                            <h6 className="text-dark my-2 mt-4"><b>Buyer {a}</b> <span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].offerInValidReason}</span>
                            </h6>
                            {buyerInvalid ?
                                <BuyerCardInvalid values={tradecommunication[i]} /> :
                                <>
                                    <BuyerCard values={tradecommunication[i]} />
                                    {/* <BuyerCardSoldOut values={tradecommunication[i]}/> */}
                                </>
                            }
                        </div>
                    </React.Fragment>
                )
            }
            else if (tradecommunication[i].tradeNegotiatorType === "sell"
                && (tradecommunication[i].communicationStatus == "newoffer"
                    || tradecommunication[i].communicationStatus == "invalidoffer")) {

                if (i == tradecommunication.length - 1
                    && tradecommunication[i].isYourCommunication) {
                    isLastOfferMine = true;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }
                let sellerInvalid = false;

                if (tradecommunication[i].communicationStatus == "invalidoffer") {
                    sellerInvalid = true;
                }

                chatBalloons.push(
                    <React.Fragment>
                        <div className="seller-side-info">
                            <h6 className="text-dark my-2 mt-4"><b>Seller {b}</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].offerInValidReason}</span>
                            </h6>
                        </div>
                        <div className="sellercard">
                            {sellerInvalid ?
                                <SellerCardInvalid values={tradecommunication[i]} /> :
                                <>
                                    <SellerCard values={tradecommunication[i]} />
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
                        isRejected = true
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
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
                            <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                            </h6>
                        </div>
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
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
                            <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                            </h6>
                        </div>
                        <div className="sellercard">

                            <StopCardQtyIncreased />

                        </div>
                    </React.Fragment>
                )



                // no change in system, last offer is ramins valid if any
            }
            else if (tradecommunication[i].communicationStatus == "stopbyua-quantity-over") {

                if (i == tradecommunication.length - 1) {
                    isQtyUpdated = true;
                }

                if (i == tradecommunication.length - 1) {
                    setLastOfferCommunicationId(tradecommunication[i].id)
                }

                chatBalloons.push(
                    <React.Fragment>
                        <div style={{ display: "flex", justifyContent: "center", paddingLeft: "250px" }}>
                            <h6 className="text-dark my-2"><b>---</b><span className="time text-small text-dark">{tradecommunication[i].updateDate}</span>
                                <span className="time text-small text-dark">{tradecommunication[i].communicationStatus}</span>
                            </h6>
                        </div>
                        <div className="sellercard">

                            <StopCardQtyOver />

                        </div>
                    </React.Fragment>
                )

                //last offer stands invalid
                // No action buttons
                //stop chat
            }

        }

        setTradeCommunication1(chatBalloons);
    }

    return (
        <div className="bg-white negotiate-transaction-chat ">
            <div className="container">
                <Breadcrumbs />                          
                                
                <div className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-12 order-lg-1 dbmn">
                            <div className="ongoing-negotiations Negotiations-left-section">
                                <NegotiationCompanyList />
                                
                            </div>
                        </div>

                        <div className="col-md-6 col-12 order-2 order-lg-2">
                            <div className="active-negotiation Negotiations-chat-section w-100 ">

                                <div className="conversation" >
                                    <div className="conversation_inner" >

                                        {tradecommunication1}
                                        <div ref={messagesEndRef} />
                                        {
                                            tradecommunication1.length != 0 ?
                                                null
                                                :
                                                <>
                                                    {
                                                        makeoffer ?
                                                            <>
                                                                <div className="row text-center justify-content-center text-center">
                                                                    <div className="col-md-9" style={{ marginBottom: "40%", marginTop: "10%" }}>
                                                                        <h5><b>Make an offer to the seller<br />
                                                                            before its sold out.</b></h5>
                                                                        <p className="text-small mt-3">Sendingan offer is only the beginning of the negotiation<br /> with seller. Seller reserves the right to reject your offer or<br /> sell the stock to best bidder.</p>
                                                                        <Buttons.PrimaryButton value="Make an offer" onClick={MakeAnOfferButton} style={{ width: "35%", marginLeft: "30%", marginTop: "35px" }} />
                                                                    </div>
                                                                </div>
                                                            </> : null
                                                    }

                                                </>
                                        }

                                    </div>
                                    <>
                                        <div className="Negotiate-actions ">

                                            {offeraccepted ? null :
                                                tradecommunication1.length == 0 || newoffer || offerrejected || qtyupdated|| islastoffermine1 ? <> {tradecommunication1.length != 0 || MakeAnOffer ? newOfferCard() : null}  </> :
                                                    acceptrehectnewofferbutton()
                                            }
                                        </div>
                                    </>
                                  


                                </div>

                            </div>

                        </div>
                        <div className="col-md-3 col-lg-3 col-12 order-1 order-lg-3 p-0">
                            <div className="Negotiation-details ">
                                <SelectedAssest />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Negotiations