import React, { useState, Component, Suspense } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import closeIcon from "./cross.svg";
import "react-phone-input-2/lib/style.css";
import "./modal.scoped.css";
import "./style.scoped.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { apiCall } from "../../Utils/Network";
import Buttons from "../../Components/Buttons";
import Nologo from "./company-trade/nologo.jpeg";
import Select from "react-select";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Dialog from "@material-ui/core/Dialog";
import { successToast, errorToast } from "../../Components/Toast/index";
import BuyNowModal from "../../Pages/Inventory_old_1/Components/BuyNowModal";
import { unstable_batchedUpdates } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { numberFormat } from "../../Utils/NumberFormat";

const Texth = styled.div`
  padding: 1rem 0 0 0;
  margin: 0;
  @media (max-width: 600px) {
    margin-top: 10px;
    margin-left: 15px;
  }
  @media(max-width: 400px){
    margin-top: 26px;
  }
  h6 {
    @media(max-width: 400px){
      font-size: 13px;
      font-weight: 400;
    }
  }
`;
const stockChoices = [
  { id: 1, el_id: "pickup-1", value: "To buy stocks", label: "To buy stocks" },
  {
    id: 2,
    el_id: "pickup-2",
    value: "To sell stocks, I have inventory",
    label: "To sell stocks, I have inventory",
  },
];
export default function TradeModal(props) {
  let history = useHistory();
  const [company_name, setcompany_name] = React.useState(props.c_name);
  const [intrest_stock, setintrest_stock] = React.useState("To buy stocks");
  const [listings, setlistings] = React.useState([]);
  const [holding, setholding] = React.useState([]);
  const [allcompanyDetails, setAllcompanyDetails] = React.useState(
    props.allcompanyDetails
  );
  const [company_Id, setcompany_Id] = React.useState(props.c_id);
  const [buyRequest, setBuyRequest] = React.useState(true);
  const [sellRequest, setSellRequest] = React.useState(true);

  React.useEffect(() => {
    handleChangeStockavailablelisting("");
  }, []);

  let handleChangeStockavailablelisting = async (e) => {
    let response = await apiCall(
      "trade/find/" + props.c_id,
      "GET",
      "",
      history
    );
    //console.log(response ," modal response")
    let responseJSON = await response.json();
    //console.log(responseJSON ,"modal responseJSON 123")
    if (e.target != undefined) {
      setintrest_stock(e.target.value);
    }
    setlistings(responseJSON);
  };

  let handleChangeStockmyholding = async (e) => {
    let response1 = await apiCall(
      "myholding/specificforacompany/" + props.c_id,
      "GET",
      "",
      history
    );
    //console.log('ttttttt'+response1)
    let responseJSON1 = await response1.json();

    if (e.target != undefined) {
      setintrest_stock(e.target.value);
    }
    if (response1.status == 200) {
      setholding(responseJSON1);
    }
  };

  // ================ CustomBuyRequest section

  const [companyName, setCompanyName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [privateCompany, setPrivateCompany] = React.useState(false);
  const [seller, setSeller] = React.useState(false);
  const [show, setShow] = React.useState(props.show);

  const [qtyHolding, setQtyHolding] = React.useState("");
  const [howSeriousForBuy, setHowSeriousForBuy] = React.useState("");
  const [customBuyContact, setCustomBuyContact] = React.useState("");
  const [comment, setComment] = React.useState("");

  const [pricePerShare, setpricePerShare] = React.useState("");
  const [sellQty, setSellQty] = React.useState("");
  const [interestLevel, setInterestLevel] = React.useState("");
  const [shareType, setShareType] = React.useState("");
  const [transferCondition, setTransferCondition] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [dematForm, setDematForm] = React.useState("");
  const [commentForSell, setCommentForSell] = React.useState("");
  const [custumBuyPopup, setCustumBuyPopup] = useState(false);
  const [custumSellPopup, setCustumSellPopup] = useState(false);

  // BUY NOW MODAL

  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState("");
  const [tradeModal, setModal] = useState(false);
  const [isCampaign, setisCampaign] = useState(false);
  const [allcompanyDetailsNew, setAllCompanyDetailsNew] = useState();

  function hideModal(e) {
    setModal(false);
  }

  function hideModalCallBack() {
    setModal(false);
  }

  const CustomBuyRequestForm = () => {
    {
      buyRequest ? setBuyRequest(false) : setBuyRequest(true);
    }
  };

  const CustomBuyRequest = async (event) => {
    event.preventDefault();

    let requestBody = {
      company_name: allcompanyDetails.name,
      company_id: allcompanyDetails.id,
      moneyInvestmentPreference: qtyHolding,
      interestLevel: howSeriousForBuy.value,
      communicationChannel: customBuyContact,
      comment: comment,
    };
    // console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody)

    try {
      let response = await apiCall(
        `offering/customeBuyRequest`,
        "POST",
        requestBody,
        history
      );
      console.log("response", response);
      if (response.status === 409) {
        return;
      } else if (response.status === 400) {
        errorToast("Invalid", "Unable to send request");
      } else if (response.status === 500) {
        // setLoadingbutton(false);
        // setShowUserAlreadyExistsError(true);
        // setUserAlreadyExistsError("User already exists with the provided email or mobile...");
      } else if (response.status === 200) {
        successToast("Success", "Buy request send successfully!!");
        setBuyRequest(true);
        setQtyHolding("");
        setHowSeriousForBuy("");
        setCustomBuyContact("");
        setComment("");
        setCustumBuyPopup(false);

        // setLoadingbutton(false);
      }
    } catch (error) {
      errorToast(
        "Invalid",
        "Internet or Service is down, try after some time..."
      );
    }
  };

  const CustomSellRequestForm = () => {
    {
      sellRequest ? setSellRequest(false) : setSellRequest(true);
    }
  };

  const CustomSellRequest = async (event) => {
    event.preventDefault();
    let requestBody = {
      company_name: allcompanyDetails.name,
      company_id: allcompanyDetails.id,
      sellQty: sellQty,
      pricePerShare: pricePerShare,
      interestLevel: interestLevel.value,
      shareType: shareType,
      additionalConditions: transferCondition.value,
      communicationChannel: contact,
      sharesInDematForm: dematForm,
      comment: commentForSell,
    };

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody)

    try {
      let response = await apiCall(
        `offering/customeSellRequest`,
        "POST",
        requestBody,
        history
      );

      if (response.status === 409) {
        return;
      } else if (response.status === 400) {
        errorToast("Invalid", "Unable to send request");
      } else if (response.status === 500) {
      } else if (response.status === 200) {
        successToast("Success", "Sell request send successfully!!");
        setSellRequest(true);

        setpricePerShare("");
        setSellQty("");
        setInterestLevel("");
        setShareType("");
        setTransferCondition("");
        setContact("");
        setDematForm("");
        setCommentForSell("");
        setCustumSellPopup(false);
      }
    } catch (error) {
      errorToast(
        "Invalid",
        "Internet or Service is down, try after some time..."
      );
    }
  };

  const TransferConditions = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
  ];
  const Interest = [
    { value: "Exploratory", label: "Exploratory" },
    { value: "Near Term requirement ", label: "Near Term requirement " },
    { value: "Urgent requirement", label: "Urgent requirement" },
  ];

  function openBuyNowModal(event, name, id, trade) {
    unstable_batchedUpdates(() => {
      setModal(true);
      setItem_id(id);
      setitem_name(name);
      setAllCompanyDetailsNew(trade);
    });
  }

  return (
    <>
      <section className="modal-main trade-modal-main">
        <div className="modal-topsection-padding">
          <div class="close-icon border-none">
            {/* <h4 className="w-100 m-0"><b>Trade Unlisted Stocks</b></h4> */}
            <button type="button" className="close" onClick={props.handleClose}>
              <img src={closeIcon} width="20" />
            </button>
          </div>
          {buyRequest && sellRequest && (
            <div class="modal-content">
              <div class="trade-modal">
                <div class="row modal-center-row">
                  <div class="col-md-12 ">
                    <h4 className="w-100 m-0">
                      <b>Trade Unlisted Stocks</b>
                    </h4>
                    <div className="trademodal-listing-img">
                      <img
                        src={
                          allcompanyDetails.logo == ""
                            ? Nologo
                            : allcompanyDetails.logo
                        }
                        alt=" No Company Logo"
                      />
                    </div>
                    <div>
                      <h6 className="m-0 ">
                        <strong> {allcompanyDetails.name} </strong>
                      </h6>
                      <p className="m-0 text-small">
                        Holding ID : HOLD{allcompanyDetails.id}
                      </p>
                    </div>

                    <div className="heading-section m-0">
                      {/* <p className="m-0 text-small"> We are soon launching a transparent and secure platform for buying and selling of unlisted shares. Till then, we will provide you with a safe and secure offline support.</p> */}
                    </div>
                    <div className="form-wrapper">
                      {/* <div className="form-group row">
                                            <div className="col-md-12">
                                                <label className="text-small" htmlFor="company_of_interest">Company of interest *</label>
                                                  <p className="Companyofinterest">{props.c_name}<img src={closeIcon} width="10" /></p>
                                            </div>
                                        </div> */}
                      <div className="form-group row">
                        <div className="col-md-12">
                          <label className="m-0" htmlFor="company_of_interest">
                            I am interested to*
                          </label>
                        </div>
                        <div className="form-group radio-button-control w-100 default-d-flex">
                          {stockChoices.map((choice, index) => (
                            <>
                              {/* {choice.id == 2 ? */}

                              <>
                                <div
                                  className="col-md-6 customRadio"
                                  key={index}
                                >
                                  <div>
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      value={choice.value}
                                      key={index}
                                      name="stock"
                                      id={choice.el_id}
                                      checked={intrest_stock === choice.value}
                                      onChange={
                                        intrest_stock ==
                                        "To sell stocks, I have inventory"
                                          ? handleChangeStockmyholding
                                          : handleChangeStockavailablelisting
                                      }
                                    />
                                    <label
                                      className="m-0"
                                      htmlFor={choice.el_id}
                                    >
                                      {" "}
                                      {choice.label}{" "}
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                                {seller && (
                                  <div className="col-md-6">
                                    <div className="">
                                      <Buttons.SecondaryButton
                                        value="Learn how to sell stocks"
                                        style={{
                                          width: "100%",
                                          padding: "10px 0px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                              {/* : null} */}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {privateCompany ? (
          <div className="privateCompany-bottomsection-padding">
            {intrest_stock == "To buy stocks" ? (
              <div className="buy-sell-modal-button d-flex justify-content-center">
                <Buttons.PrimaryButton
                  value="Custom Buy Request"
                  style={{ width: "50%", margin: "0px 5px" }}
                />
              </div>
            ) : (
              <div className="buy-sell-modal-button d-flex justify-content-center">
                <Buttons.PrimaryButton
                  value="Join Sellers Waitlist"
                  style={{ width: "50%", margin: "0px 5px" }}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              buyRequest && sellRequest
                ? "trademodal-table-main modal-bottomsection-padding"
                : " modal-bottomsection-padding"
            }
          >
            {/* Buy stocks popup section */}
            <div>
              <div>
                {intrest_stock == "To sell stocks, I have inventory" ? null : (
                  <>
                    {listings.length == 0 ? (
                      <>
                        {buyRequest && (
                          <>
                            <Texth>
                              <h6 className="available-listing mb-0">
                                No listings available to buy!
                              </h6>
                              <p style={{fontSize: '13px', marginTop: '10px'}}>You could create a custom buy request, and our team will get back to you shortly!</p>
                            </Texth>
                            <div className="col-md-6 col-12 d-flex justify-content-center mt-3 p-4 ml-auto">
                              <Buttons.SecondaryButton
                                value="Send Custom Buy Request"
                                style={{ width: "100%", margin: "0px 5px" }}
                                onClick={CustomBuyRequestForm}
                              />
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {buyRequest && (
                          <>
                            <div className="">
                              <Texth>
                                <h6 className="available-listing mb-0">
                                  {listings.length} Availaible listings to buy
                                  from
                                </h6>
                              </Texth>
                              <hr style={{width: '90%'}} />
                              <div className="card" style={{width: '90%', margin: '0 auto'}}>
                                <div className=" listing-table w-100 scroll-default">
                                  <table className="w-100" style={{backgroundColor: '#fbfbff'}}>
                                    <thead>
                                      <tr>
                                        {/* <th>Company Name</th> */}
                                        <th>Qty</th>
                                        <th>Price/Share</th>
                                        {/* <th>Date & Time</th> */}
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {listings.map((trade, index) => (
                                        <tr>
                                          {/* <td>{trade.companyName}</td> */}
                                          <td>{trade.qty}</td>
                                          <td> {numberFormat(trade.price)}</td>
                                          {/* <td>{trade.createDate} </td> */}
                                          {/* <td>{trade.isNegotiable+""}</td> */}
                                          <td>
                                            {trade.isTradeOwner === false ? (
                                              <h5
                                                className="text-small  m-0"
                                                onClick={(event) =>
                                                  openBuyNowModal(
                                                    event,
                                                    trade.name,
                                                    trade.id,
                                                    trade,
                                                    tradeModal
                                                  )
                                                }
                                                // onClick={async () => {

                                                //     let response = await apiCall("tradeongoingtranaction/tradeaccount/" + trade.id, 'GET', '', history)
                                                //     let responseJSON = await response.json();
                                                //     //console.log("hihihihihihko11"+responseJSON)

                                                //     //console.log(response.status+"juju")
                                                //     if (response.status != 200) {
                                                //         console.log("hihihihihihko")
                                                //         const reqBody = {
                                                //             "communicationStatus": "donotcreatecoomunicationrecord",
                                                //             "message": "it's a dummy comment",
                                                //             "offeredPrice": "1",
                                                //             "offeredQuantity": "0",
                                                //             "tradeId": trade.id
                                                //         }
                                                //         // const response1 = await apiCall("tradecommunication/", 'POST', reqBody, history)
                                                //         // const responseJSON1 = await response1.json();

                                                //         // const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/" + responseJSON1.tradeOnGoingTransactionId, 'GET', '', history)
                                                //         // const responseJSON12 = await response12.json();

                                                //         // console.log("hihihihihihko113"+responseJSON.tradeId)
                                                //         // responseJSON = responseJSON12;
                                                //         // console.log("hihihihihihko14"+responseJSON.tradeId)
                                                //     }
                                                //     //console.log("hihihihihihko15"+responseJSON.tradeId)
                                                //     //console.log("hihihihihihko15"+responseJSON.companyLogo)
                                                //     history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
                                                // }}

                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "11px",
                                                  color: "#721c65",
                                                  fontWeight: "700",
                                                }}
                                              >
                                                Buy Now
                                              </h5>
                                            ) : (
                                              <p className="text-small mb-0">
                                                You are the Owner
                                              </p>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="col-md-6 col-12 buy-sell-modal-button d-flex justify-content-center ml-auto">
                                  <Buttons.SecondaryButton
                                    value="Send Custom Buy Request"
                                    style={{ width: "100%", margin: "0px 5px" }}
                                    onClick={CustomBuyRequestForm}
                                  />
                                  {/* <Link to="/inventory_1" className="text-default-primary w-100">
                                                            <Buttons.PrimaryButton value="View All Listing" style={{ width: "100%", margin: "0px 5px" }} />
                                                             </Link> */}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {/*<div className="form-group row">*/}
                        {/*<div className="col-md-12 btn-trade-section">*/}
                        {/*<button className="cancel-btn" type="button" onClick={props.handleClose}> Custom buy request </button>*/}
                        {/*<button className="sbt-btn" onClick={props.handleClose} type="submit"> View all listings </button>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* ======================= buyRequest form start============================= */}
              <div>
                {!buyRequest && (
                  <>
                    <div className="row custom-buy-request-form">
                      <div className="col-md-12 col-12 custom-buy-request-main">
                        <div className="">
                          <div class="buyRequest-modal-content">
                            <div class="trade-modal">
                              <div class="row modal-center-row">
                                <div class="col-md-12 px-0">
                                  {allcompanyDetails.id == company_Id && (
                                    <div className="">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <div
                                          className="ArrowBackIos-Icon"
                                          onClick={CustomBuyRequestForm}
                                        >
                                          <ArrowBackIosIcon />
                                        </div>
                                        <h4 className="w-100 m-0 mx-2">
                                          <b>Custom Buy Request</b>
                                        </h4>
                                      </div>
                                      <div className="trademodal-listing-img">
                                        <img
                                          src={
                                            allcompanyDetails.logo == ""
                                              ? Nologo
                                              : allcompanyDetails.logo
                                          }
                                          alt=" No Company Logo"
                                        />
                                      </div>
                                      <div>
                                        <h6 className="m-0 ">
                                          <strong>
                                            {" "}
                                            {allcompanyDetails.name}{" "}
                                          </strong>
                                        </h6>
                                        <p className="m-0 text-small">
                                          Holding ID : HOLD
                                          {allcompanyDetails.id}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 defaul-px-0">
                            <div className="mt-3">
                              <label className="text-small">
                                {" "}
                                <sapn>
                                  How much would you like to invest in this
                                  company? *
                                </sapn>
                              </label>
                              <input
                                value={qtyHolding}
                                onChange={(e) => setQtyHolding(e.target.value)}
                                type="number"
                                className="custombuymodal_input_box text-small"
                                placeholder="Enter Amount"
                              />
                            </div>
                            <div className="">
                              <div className="mt-2 service-select-input">
                                <label className="text-small">
                                  {" "}
                                  <sapn>
                                    How serious is your interest? *
                                  </sapn>{" "}
                                </label>
                                <Select
                                  options={Interest}
                                  onChange={(selectedOption) =>
                                    setHowSeriousForBuy(selectedOption)
                                  }
                                  value={howSeriousForBuy}
                                  className="text-small"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="text-small">
                                  {" "}
                                  <sapn>How should we contact you? *</sapn>{" "}
                                </label>
                                <div
                                  className="form-group radio-button-control w-100 d-flex"
                                  onChange={(e) =>
                                    setCustomBuyContact(e.target.value)
                                  }
                                >
                                  <div className="customRadio w-50 pr-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Email"
                                      value="Email"
                                      name="stock"
                                    />
                                    <label className="m-0" htmlFor="Email">
                                      {" "}
                                      Email <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="customRadio w-50 pl-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Phone"
                                      value="Phone"
                                      name="stock"
                                    />
                                    <label className="m-0" htmlFor="Phone">
                                      {" "}
                                      Phone <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <label className="text-small">
                                  {" "}
                                  <sapn>Comments</sapn>
                                </label>
                                <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Comments"
                                  className="custombuymodal_input_box text-small"
                                  style={{ height: "65px", resize: "none" }}
                                />
                              </div>
                              <div className="col-md-6 col-12 buy-sell-modal-button d-flex justify-content-end mt-2 ml-auto">
                                {qtyHolding &&
                                howSeriousForBuy &&
                                customBuyContact ? (
                                  // {(qtyHolding && Interest && comment && customBuyContact) ?
                                  <Buttons.PrimaryButton
                                    value="Request to Buy"
                                    style={{ width: "100%", marginLeft: 'auto' }}
                                    onClick={() => setCustumBuyPopup(true)}
                                  />
                                ) : (
                                  <Buttons.InactiveButton
                                    value="Request to Buy"
                                    style={{ width: "100%" }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* ======================= buyRequest form end============================= */}
            </div>

            {/* Sell stocks popup section */}
            <div>
              <div>
                {intrest_stock == "To buy stocks" ? null : (
                  <>
                    {holding.length == 0 ? (
                      <>
                        {sellRequest && (
                          <>
                            <Texth>
                              <h6 className="available-listing mb-0">
                                You do not have any holdings!
                              </h6>
                              <p style={{fontSize: '13px', marginTop: '10px'}}>You could add a new holding or create a custom sell request, and our team will get back to you shortly!</p>
                            </Texth>
                            <div className="row">
                              {seller ? <div className="col-md-6 col-12 buy-sell-modal-button d-flex justify-content-center">
                                
                                <Buttons.PrimaryButton
                                  value="Add Holdings"
                                  style={{ width: "90%", margin: "0px 5px" }}
                                  onClick={() => history.push("/addholdings")}
                                />
                              </div> : <div className="col-md-6 col-12 buy-sell-modal-button d-flex justify-content-center ml-auto">
                                <Buttons.SecondaryButton
                                  value="Send Custom Sell Request"
                                  style={{ width: "90%", margin: "0px 5px" }}
                                  onClick={CustomSellRequestForm}
                                />
                              </div>}
                              
                              
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {sellRequest && (
                          <div>
                            <Texth>
                              <h6 className="available-listing mb-0">
                                Your Holding of {props.c_name}
                              </h6>
                            </Texth>

                            <div className="card">
                              <div className="listing-table listing-table-sell">
                                <table className="w-100">
                                  <thead>
                                    <tr>
                                      <th>Company Name</th>
                                      <th>Holding Id</th>
                                      <th className="text-center">
                                        Share Type
                                      </th>
                                      <th className="text-center">
                                        Quantity Held
                                      </th>
                                      {/* <th className="text-center">Action</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {holding.map((holdng, index) => (
                                      <tr>
                                        <td>
                                          {holdng.companyName}
                                          <br />
                                        </td>
                                        <td>{holdng.id}</td>
                                        <td>{holdng.commodityName}</td>
                                        {/* <td >{holdng.qtyTotal}</td> */}
                                        <td>
                                          {holdng.tradeId != null ? (
                                            <Buttons.SecondaryButton
                                              value="Edit Listing"
                                              style={{
                                                height: "34px",
                                                background: "transparent",
                                                border: "1px solid #721B65",
                                              }}
                                              onClick={() => {
                                                history.push({
                                                  pathname: "/edit_inventory",
                                                  state: {
                                                    selectedHolding: holdng,
                                                  },
                                                });
                                              }}
                                            />
                                          ) : (
                                            <Buttons.SecondaryButton
                                              value="Add Listing"
                                              style={{
                                                height: "34px",
                                                background: "transparent",
                                                border: "1px solid #721B65",
                                              }}
                                              onClick={() => {
                                                history.push({
                                                  pathname: "/create_inventory",
                                                  state: {
                                                    selectedHolding: holdng,
                                                  },
                                                });
                                              }}
                                            />
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="buy-sell-modal-button d-flex justify-content-center">
                                <div className="d-flex w-50">
                                  <Buttons.SecondaryButton
                                    value="Edit Holding"
                                    style={{ width: "50%", margin: "0px 5px" }}
                                  />
                                  <Link
                                    to="/inventory_1"
                                    className="text-default-primary w-50"
                                  >
                                    <Buttons.PrimaryButton
                                      value="Add Listing"
                                      style={{
                                        width: "100%",
                                        margin: "0px 5px",
                                      }}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            {/* <div className="form-group row">
                    <div className="col-md-12 btn-trade-section">
                        <button className="cancel-btn" type="button" onClick={props.handleClose}> Edit Holding </button>
                        <button className="sbt-btn" type="submit"> Add Listing </button>
                    </div>
                </div> */}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* ======================= sellRequest form start============================= */}
              <div>
                {!sellRequest && (
                  <>
                    <div className="row custom-buy-request-form">
                      <div className="col-md-12 col-12 custom-buy-request-main">
                        <div className="">
                          <div class="buyRequest-modal-content">
                            <div class="trade-modal">
                              <div class="row modal-center-row">
                                <div class="col-md-12 px-0">
                                  {allcompanyDetails.id == company_Id && (
                                    <div className="">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <div
                                          className="ArrowBackIos-Icon"
                                          onClick={CustomSellRequestForm}
                                        >
                                          <ArrowBackIosIcon />
                                        </div>
                                        <h4 className="w-100 m-0 mx-2">
                                          <b>Custom Sell Request</b>
                                        </h4>
                                      </div>
                                      <div className="trademodal-listing-img">
                                        <img
                                          src={
                                            allcompanyDetails.logo == ""
                                              ? Nologo
                                              : allcompanyDetails.logo
                                          }
                                          alt=" No Company Logo"
                                        />
                                      </div>
                                      <div>
                                        <h6 className="m-0 ">
                                          <strong>
                                            {" "}
                                            {allcompanyDetails.name}{" "}
                                          </strong>
                                        </h6>
                                        <p className="m-0 text-small">
                                          Holding ID : HOLD
                                          {allcompanyDetails.id}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row scroll-default sellrequest-modal-form">
                          <div className="col-12 defaul-px-0">
                            <div className="row mt-1">
                              <div className="col-md-6 col-12">
                                <label className="text-small">
                                  {" "}
                                  <sapn>
                                    How many shares do you want to sell? *
                                  </sapn>
                                </label>
                                <input
                                  value={sellQty}
                                  onChange={(e) => setSellQty(e.target.value)}
                                  type="number"
                                  className="custombuymodal_input_box text-small"
                                  placeholder="Enter No. of Shares"
                                />
                              </div>
                              <div className="col-md-6 col-12">
                                <label className="text-small">
                                  {" "}
                                  <sapn>Price Expectations per share. *</sapn>
                                </label>
                                <input
                                  value={pricePerShare}
                                  onChange={(e) =>
                                    setpricePerShare(e.target.value)
                                  }
                                  type="amount"
                                  className="custombuymodal_input_box text-small"
                                  placeholder="Enter Amount"
                                />
                              </div>
                            </div>

                            <div className="">
                              <div className="mt-1 service-select-input">
                                <label className="text-small">
                                  {" "}
                                  <sapn>
                                    How serious is your interest? *
                                  </sapn>{" "}
                                </label>
                                <Select
                                  options={Interest}
                                  onChange={(selectedOption) =>
                                    setInterestLevel(selectedOption)
                                  }
                                  value={interestLevel}
                                  className="text-small"
                                />
                              </div>

                              <div className="mt-1">
                                <label className="text-small">
                                  <sapn>Share type*</sapn>{" "}
                                </label>
                                <div className="form-group radio-button-control w-100 d-flex">
                                  <div className="customRadio w-50 pr-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Preferenceshares"
                                      value=""
                                      name="stock"
                                      onClick={() =>
                                        setShareType("Preference shares")
                                      }
                                    />
                                    <label
                                      className="m-0"
                                      htmlFor="Preferenceshares"
                                    >
                                      {" "}
                                      Preference shares{" "}
                                      <span className="checkmark mobile_view" />
                                    </label>
                                  </div>
                                  <div className="customRadio w-50 pl-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Ordinaryshares"
                                      value=""
                                      name="stock"
                                      onClick={() =>
                                        setShareType("Ordinary shares")
                                      }
                                    />
                                    <label
                                      className="m-0"
                                      htmlFor="Ordinaryshares"
                                    >
                                      {" "}
                                      Ordinary shares{" "}
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-1 service-select-input">
                                <label className="text-small">
                                  {" "}
                                  <sapn>Any Transfer Conditions? *</sapn>{" "}
                                </label>
                                <Select
                                  // isMulti
                                  name="colors"
                                  options={TransferConditions}
                                  onChange={(selectedOption) =>
                                    setTransferCondition(selectedOption)
                                  }
                                  value={transferCondition}
                                  className="basic-multi-select"
                                  // classNamePrefix="select"
                                />
                              </div>
                              <div className="mt-1">
                                <label className="text-small">
                                  <sapn>How should we contact you? *</sapn>{" "}
                                </label>
                                <div className="form-group radio-button-control w-100 d-flex">
                                  <div className="customRadio w-50 pr-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Email"
                                      value=""
                                      name="contact"
                                      onClick={() => setContact("Email")}
                                    />
                                    <label className="m-0" htmlFor="Email">
                                      {" "}
                                      Email <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="customRadio w-50 pl-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Phone"
                                      value=""
                                      name="contact"
                                      onClick={() => setContact("Phone")}
                                    />
                                    <label className="m-0" htmlFor="Phone">
                                      {" "}
                                      Phone <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-1">
                                <label className="text-small">
                                  <sapn>Are your shares in Demat form? *</sapn>{" "}
                                </label>
                                <div className="form-group radio-button-control w-100 d-flex">
                                  <div className="customRadio w-50 pr-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="Yes"
                                      value=""
                                      name="Dematform"
                                      onClick={() => setDematForm("Yes")}
                                    />
                                    <label className="m-0" htmlFor="Yes">
                                      {" "}
                                      Yes <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="customRadio w-50 pl-2">
                                    <input
                                      className="radio-control"
                                      type="radio"
                                      id="No"
                                      value=""
                                      onClick={() => setDematForm("No")}
                                      name="Dematform"
                                    />
                                    <label className="m-0" htmlFor="No">
                                      {" "}
                                      No <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-1">
                                <label className="text-small">
                                  {" "}
                                  <sapn>Comments</sapn>
                                </label>
                                <textarea
                                  value={commentForSell}
                                  onChange={(e) =>
                                    setCommentForSell(e.target.value)
                                  }
                                  placeholder="Comments"
                                  className="custombuymodal_input_box text-small"
                                  style={{ height: "65px", resize: "none" }}
                                />
                              </div>
                              <div className="buy-sell-modal-button request-to-buy-button d-flex flex-column mt-1">
                                <div className="expected-amount d-flex justify-content-between mb-2">
                                  <h5>Expected Amount:</h5>
                                  <h3>₹ {sellQty * pricePerShare}</h3>
                                </div>

                                <div className="col-md-6 col-12 d-flex justify-content-end ml-auto p-0">
                                  {pricePerShare &&
                                  sellQty &&
                                  interestLevel &&
                                  shareType &&
                                  transferCondition &&
                                  contact &&
                                  dematForm ? (
                                    <Buttons.PrimaryButton
                                      value="Request to sell"
                                      style={{ width: "100%" }}
                                      onClick={() => setCustumSellPopup(true)}
                                    />
                                  ) : (
                                    <Buttons.InactiveButton
                                      value="Request to Sell"
                                      style={{ width: "100%" }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* ======================= sellRequest form end============================= */}
            </div>
          </div>
        )}
      </section>

      <Dialog
        open={tradeModal}
        onClose={hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Suspense fallback="Loading...">
          <BuyNowModal
            isCampaign={isCampaign}
            tradeModal={tradeModal}
            show={tradeModal}
            handleClose={hideModal}
            c_id={item_id}
            c_name={item_name}
            trade={allcompanyDetailsNew}
            hideModalCallBack={hideModalCallBack}
          />
        </Suspense>
      </Dialog>

      <Dialog
        open={custumBuyPopup}
        onClose={() => setCustumBuyPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="addcompanyrequest" style={{ position: "relative" }}>
          <div className="addcompanyrequest_container virtual_acc_modal_padding">
            <div className="virtual-account-created-padding">
              <h5 className="text-center">Custom Buy Request Received!</h5>

              <p className="text-small mb-2 text-center">
                We have received your custom buy request, and our team will be
                getting in touch with you within 24 hours.
              </p>
              <AiOutlineClose
                className="closeBtnAddMoneyModal"
                onClick={() => setCustumBuyPopup(false)}
              />
            </div>

            <div className="row addcompanyrequest_buttonContainer d-flex justify-content-center">
              <div className="col-md-10 col-12">
                <Buttons.PrimaryButton
                  value="Okay, Got It"
                  style={{ width: "100%" }}
                  onClick={CustomBuyRequest}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={custumSellPopup}
        onClose={() => setCustumSellPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="addcompanyrequest" style={{ position: "relative" }}>
          <div className="addcompanyrequest_container virtual_acc_modal_padding">
            <div className="virtual-account-created-padding">
              <h5 className="text-center">Custom Sell Request Received!</h5>

              <p className="text-small mb-2 text-center">
                We have received your custom sell request, and our team will be
                getting in touch with you within 24 hours.
              </p>
              <AiOutlineClose
                className="closeBtnAddMoneyModal"
                onClick={() => setCustumSellPopup(false)}
              />
            </div>

            <div className="row addcompanyrequest_buttonContainer d-flex justify-content-center">
              <div className="col-md-10 col-12">
                <Buttons.PrimaryButton
                  value="Okay, Got It"
                  style={{ width: "100%" }}
                  onClick={CustomSellRequest}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
