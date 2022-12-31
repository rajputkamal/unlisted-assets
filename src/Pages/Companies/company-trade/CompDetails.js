import React, { useState } from "react";
import useSWR from "swr";
// import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css";
import "./CompanyDetails.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import { Breadcrumbs } from "@material-ui/core";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@material-ui/core/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  apiCall25,
  apiCall12,
  apiCall,
  apiCall1,
  downloadurl,
  setAccessToken,
  imgurl,
  isLoggedIn,
} from "../../../Utils/Network";

import CompanyLogo from "../company-logo.jpg";
import DownloadIcon from "../download.png";
import c2 from "../c2.svg";
import LoginModalImg from "./LoginModalImg.png";
import IndustryIndicativePricingLogo from "../../CommonAssets/IndustryIndicativePricingLogo.svg";
import Nologo from "../../CommonAssets/nologo.jpeg";
import breathumbs from "../../../assets/breathumbs.svg";

import CompanyTab from "../CompanyTabs/CompanyTabs";
import TradeModal from "../TradeModal";
import Allcompanies from "../company-trade/Allcompanies";
import MobileVerification from "../../MobileVerification/index";
import Companies from "../../Companies";
import ResponsiveAppBar from "../../../Website/Appbar/Index";

import DashboardHeader from "../../../Components/DashboardHeader";
import AlertDialog from "../../../Components/DialogBox/dialogbox";
import Loadbutton from "../../../Components/Loadbutton/Index";
import Buttons from "../../../Components/Buttons";
import { errorToast, successToast } from "../../../Components/Toast/index";
import { numberFormat } from "../../../Utils/NumberFormat";

const fetcher = (...args) => fetch(...args).then((response) => response.json());
function CompDetails(props) {
  let history = useHistory();
  const [showMore, setShowMore] = useState(false);
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState("");
  const [listings, setlistings] = React.useState([]);
  const [allComapyForWebsite, setAllComapyForWebsite] = React.useState([]);
  const [intrest_stock, setintrest_stock] = React.useState("To buy stocks");
  const [isLogedIn, setisLogedIn] = useState(isLoggedIn());

  const [openModal, setOpenModal] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [AddWatchlist, setAddWatchlist] = useState(false);
  const [DeleteWatchlist, setDeleteWatchlist] = useState(false);
  const [allcompanyDetails, setAllcompanyDetails] = React.useState();

  const [associationPrice, setassociationPrice] = React.useState({});

  const [postPerpage, setpostPerpage] = React.useState(1000);
  const [totalPosts, settotalPosts] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [selectbutton, setSelectbutton] = React.useState("");

  function openBuyNowModal(event, name, id, trade) {
    // setModal(true);
    // setItem_id(id);
    // setitem_name(name)
    // setAllCompanyDetails(trade)
  }

  const AddtoWatchList = async (trade) => {
    let response = await apiCall("company/usercompanywatchlist", "PUT", trade);
    //console.log("apicalled",response.status)
    if (response.status !== 200) {
      // console.log("Invalid", "Mobile Number Does not exists");
      return;
    } else if (response.status === 200) {
      // console.log(trade.addedWatchList+"kokokokokoko")
      trade.addedWatchList ? setAddWatchlist(true) : setDeleteWatchlist(true);
      //setMobiletext('Verify your mobile number with otp verification')
      //successToast("Success","OTP sent to your mobile please check")
      //setOpen(true)
    }
  };

  function showModalWatchlist(event, name, id) {
    if (isLogedIn == false) {
      handleClickOpen();
    } else {
      data.addedWatchList = !data.addedWatchList;
      AddtoWatchList(data);
    }
  }
  const handleClickOpen = () => {
    setOpenModal(true);
    setWatchlist(true);
  };
  const handleClickOpenWatchlist = () => {
    setOpenModal(true);
    setWatchlist(false);
  };

  const handleClose = () => {
    setModal(false);
    setOpenModal(false);
    setDeleteWatchlist(false);
    setAddWatchlist(false);
  };

  // loging design added
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [showNameError, setShowNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonenumberError, setPhoneNumberError] = useState("");
  const [dialogPage, setDialogPage] = useState(false);
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [loginModalState, setLoginModalState] = React.useState(false);
  const [explorePage, setExplorePage] = useState(false);
  const [createPassword, setCreatePassword] = useState(true);

  const [showPhoneNumberError, setShowPhoneNumberError] = useState("");
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState("");
  const [showUserAlreadyExistsError, setShowUserAlreadyExistsError] = useState(
    ""
  );

  let InlineValidationName = () => {
    return (
      <div className="inline-validation-box">
        <p>{nameError}</p>
      </div>
    );
  };

  let InlineValidationEmail = () => {
    return (
      <div className="inline-validation-box">
        <p>{emailError}</p>
      </div>
    );
  };

  let InlineValidationBoxPhoneNumber = () => {
    return (
      <div className="inline-validation-box">
        <p>{phonenumberError}</p>
      </div>
    );
  };

  let InlineValidationBoxUserAlreadyExists = () => {
    return (
      <div className="inline-validation-box">
        <p>{userAlreadyExistsError}</p>
      </div>
    );
  };

  const clearValidationMessages = async () => {
    await setShowEmailError(false);
    await setEmailError("");

    await setShowNameError(false);
    await setNameError("");

    await setShowPhoneNumberError(false);
    await setPhoneNumberError("");

    await setShowUserAlreadyExistsError(false);
    await setUserAlreadyExistsError("");
  };

  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
    await clearValidationMessages();
    switch (field) {
      case "email":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowEmailError(true);
        await setEmailError(errorMessage);
        break;

      case "mobile":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowPhoneNumberError(true);
        await setPhoneNumberError(errorMessage);
        break;

      case "name":
        // console.log("hooooooooooooooooo1"+errorMessage)
        await setShowNameError(true);
        await setNameError(errorMessage);
        break;

      default:
      // console.log("hooooooooooooooooonijhibibibibib")
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingbutton(true);

    let requestBody = {
      email: email,
      mobile: phoneNumber,
      name: name,
    };
    // console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody)

    try {
      let response = await apiCall(
        `profile/signup`,
        "POST",
        requestBody,
        history
      );

      // let response = await fetch("http://api1.unlistedassets.com/profile/signup",
      //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
      // )

      setLoadingbutton(false);

      // console.log("response ", response)

      if (response.status === 409) {
        return;
      } else if (response.status === 400) {
        let responseJSON = await response.json();
        let i = 0;
        const arrayerrormessages = responseJSON.details1;
        // console.log(arrayerrormessages)
        const listItems = arrayerrormessages.map((errorResponse) =>
          validate(errorResponse.field, errorResponse.errorMessage)
        );
        setLoadingbutton(false);
      } else if (response.status === 500) {
        setLoadingbutton(false);
        setShowUserAlreadyExistsError(true);
        setUserAlreadyExistsError(
          "User already exists with the provided email or mobile..."
        );
      } else if (response.status === 200) {
        setLoadingbutton(false);
        setCreatePassword(false);
        history.push({
          pathname: "/create-password",
          state: { phone: phoneNumber },
        });
      }
    } catch (error) {
      // console.log("error", error);
      console.error(error);
      errorToast(
        "Invalid",
        "Internet or Service is down, try after some time..."
      );
      setLoadingbutton(false);
    }
  };

  // login modal

  const openLoginModal = () => {
    setLoginModalState(true);
  };
  const closeLoginModal = () => {
    setLoginModalState(false);
  };

  const closeDialog = () => {
    // console.log('aaaaaaa')
    setDialogPage(false);
  };

  // -----xxx----

  const action = (
    <React.Fragment>
      <Buttons.PrimaryButton
        value="OK"
        id="add-holdings-button"
        onClick={handleClose}
      />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );

  function showModal(event, id, name, data) {
    if (isLogedIn == false) {
      handleClickOpenWatchlist();
    } else {
      setModal(true);
      setItem_id(id);
      setitem_name(name);
      setAllcompanyDetails(data);
    }
  }

  function hideModal(e) {
    setModal(false);
  }
  const c_slug = props.match.params.cslug;
  const apiEndpoint = downloadurl("company/companydetail/" + c_slug);
  const { data, error } = useSWR(apiEndpoint, fetcher, {
    refreshInterval: 20000000,
  });

  React.useEffect(() => {
    handleChangeStockavailablelisting();
    findAllCompanies();
    // if (isLogedIn == false) {
    //   setTimeout(() => {
    //     openLoginModal()
    //   }, 5000)
    // }
    setExplorePage(true);
  }, []);

  React.useEffect(() => {
    getPriceUSMWT();
  }, []);

  const getPriceUSMWT = async function() {
    let allinventoryresponse = await apiCall(
      "association/findbyCompanySlug/" + c_slug,
      "GET"
    );
    if (allinventoryresponse.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    // console.log(allinventoryresponse)
    let allinventoryresponseJSON = await allinventoryresponse.json();
    //console.log(allinventoryresponseJSON)
    setassociationPrice(allinventoryresponseJSON);
  };

  let handleChangeStockavailablelisting = async () => {
    let response = await apiCall(
      "trade/findbuysell/" + c_slug,
      "GET",
      "",
      history
    );
    // console.log(response, "response");

    let responseJSON = await response.json();
    //console.log(responseJSON, "responseJSON")
    setlistings(responseJSON);
  };
  const handleBuyNow = (event) => {
    event.preventDefault();
    console.log("compdetail", data.name);
    history.push({
      pathname: "/inventory_1",
      state: {
        companyName: data.name,
      },
    });
  };

  const [allComapyName, setAllComapyName] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState();

  let findAllCompanies = async () => {
    let response = await apiCall("trade/findAll1website", "GET", "", history);
    // console.log(response, "response");

    let responseJSON = await response.json();
    //console.log(responseJSON, "responseJSON")
    setAllComapyForWebsite(responseJSON);

    let companyTradeList = responseJSON.filter(
      (company) => company.companySlug == c_slug
    );

    let min = Math.min(
      ...companyTradeList.map((item) => parseFloat(item.price))
    );

    setMinPrice(min);
  };

  // const filtered = allComapyForWebsite.filter(company =>{
  //   return company.companyName == data.name })

  // console.log("data.name", data.name)

  // console.log("allComapyName", allComapyName)
  

  function ShowMore() {
    setShowMore(!showMore);
  }
  function ValuationConvertion(val) {
    var final_amt = val / 1000000;
    if (final_amt >= 1000) {
      final_amt = final_amt / 1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }
  if (error) return <h1>{error}</h1>;

  const download1 = async (event, filename, text) => {
    event.preventDefault();

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };



  // const [showCardResult, setshowCardResult] = React.useState('');

  const CardData = (event, value) => {
    // setshowCardResult(value)
  };

  // console.log("listings", listings)

  // login form

  const sendotp = async (event) => {
    event.preventDefault();
    console.log("phone" + phoneNumber);
    let response = await apiCall(
      "profile/sendotponmobileNotloggedin/" + phoneNumber,
      "POST",
      "",
      history
    );

    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    // console.log("apicalled", response)
    if (response.status !== 200) {
      errorToast("Invalid", "Mobile Number Does not exists");
      return;
    } else if (response.status === 200) {
      let isOTPSent = await response.text();

      if (isOTPSent == "true") {
        successToast("Success", "OTP sent to your mobile please check");
        setOpen(true);
      } else {
        errorToast("Invalid", "OTP not sent, try again or contact admin!!");
        setOpen(false);
      }
    }
  };


  return (
    <>
      {/* <DashboardHeader /> */}
      {isLogedIn ? <DashboardHeader /> : <ResponsiveAppBar />}

      <Breadcrumbs />
      {data ? (
        <section className="company-section m-0 mb-3">
          <Helmet>
            <title>{data.titleMetaTag}</title>
            <meta
              name="description"
              content={`Find Pre IPO trading share price with unlistedassests.com. You may buy & selling ${
                data.descriptionMetaTag
              } unlisted share price, and Pre IPO trading share price.`}
              data-react-helmet="true"
            />
          </Helmet>

          <Snackbar
            open={AddWatchlist}
            autoHideDuration={3000}
            onClose={handleClose}
            message={
              data.name +
              " has been added to your watchlist. You will be notified about all its updates"
            }
            action={action}
          />
          <Snackbar
            open={DeleteWatchlist}
            autoHideDuration={5000}
            onClose={handleClose}
            message={
              data.name +
              " has been removed from your Watchlist. You will not be Notified about any Further Updates"
            }
            action={action}
          />

          <div className="container">
            <div className="dbmn Breadcrumbs-defaul-margin">
              <div className="col-md-12 px-0">
                <div className="top">
                  <div className="breathumbs-top">
                    <ul>
                      <li>
                        <Link
                          to="/inventory_1"
                          className="text-default-primary"
                        >
                          <FontAwesomeIcon icon={faHome} />
                        </Link>
                      </li>
                      <li>
                        <img src={breathumbs} />
                      </li>
                      <li>
                        <Link
                          to="/companies"
                          className="com text-default-primary"
                        >
                          Explore Companies
                        </Link>
                      </li>
                      <li>
                        <img src={breathumbs} />
                      </li>
                      <li>
                        <Link to="#" className="hdfc text-default-primary">
                          {data.name}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="order-1 order-md-0 col-lg-9 col-md-12 col-12 company-explore-details mt-2">
                <div className="company-details bg-white p-2">
                  {/* for Desktop view */}
                  <div className="dbmn">
                    <div className="row px-3 pt-3">
                      <div className="col-md-6 col-8 d-flex align-items-center ">
                        <div className="c_logo d-flex align-items-center">
                          <img src={data.logo} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-4 d-flex align-items-end flex-column">
                        <div className="c_inactive  text-right">
                          <div>
                            <div className="d-flex">
                              <div>
                                {" "}
                                <img src={imgurl("hd.svg")} className="mr-2" />
                              </div>
                              <div className="text-left">
                                <p className="m-0 text-small">
                                  Welfare Association Pricing
                                  <Tooltip
                                    title={
                                      <>
                                        <p className="mb-0">
                                          Indicative Pricing <b />
                                        </p>
                                      </>
                                    }
                                    placement="right"
                                    arrow
                                    enterTouchDelay={0}
                                  >
                                    <InfoOutlinedIcon className="marketplace-infoicon" />
                                  </Tooltip>
                                </p>
                                <h6 className="m-0 buynow_heading">
                                  {associationPrice.sell_price}
                                </h6>
                              </div>
                            </div>
                          </div>
                          {/* <p className="text-left">Indicative Pricing : <span style={{ color: "#721c65" }}><b>₹ 200{data.indicativePricing}</b> </span></p> */}
                          {data.temporarilyActive ? null : (
                            <div>
                              <button className="btn btn-inctive mb-2">
                                Temporarily Inactive
                              </button>
                            </div>
                          )}
                        </div>
                        <a
                          className="btn-inctive mt-auto "
                          target="_blank"
                          href={data.downloadReport}
                          download
                        >
                          <img src={DownloadIcon} alt="download-img" />
                        </a>
                      </div>
                      {/* <div className="col-lg-12 col-md-12 col-12 d-flex align-items-center ">
                          <div className="c_name my-3 px-1 w-100">
                            <h4 className='c_name-heading'><b>{data.name}</b></h4>
                            <div className="d-flex justify-content-around w-100 ">
                              <p className="text-left ">Industry :  <b>Pharma</b></p>
                              <p className="text-left">Website :<a href="#" className="text-default-secoundary">{data.legalWebsiteLink} </a></p>
                              <p className="text-left ">Crunchbase Link :<a href="#" className="text-default-secoundary">{data.legalWebsiteLink} </a></p>
                            </div>
                          </div>
                        </div> */}
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="row company-links mt-4 align-items-center">
                          <div className="col-md-6 col-12">
                            <Tooltip
                              title="Industry classified by Unlisted Assets"
                              placement="top-start"
                            >
                              <p>
                                <Button>Industry: </Button>{" "}
                                <b>{data.sector}</b>
                              </p>
                            </Tooltip>
                            {/* <p >Industry :  <b>{data.sector}</b></p> */}
                          </div>
                          <div className="col-md-6 col-12">
                              <p className="text-right"> <Button>Company Name: </Button>{" "}<b>{data.legalName}</b></p>
                            </div>
                          {/*data.legalWebsiteLink.slice(12, -1)*/}
                          {/* <div className="col-md-4 col-12"> 
                              <p >Crunchbase Link :<a href="#" className="text-default-secoundary">{data.legalWebsiteLink} </a></p>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* for mobile view */}
                  <div className="dnmb">
                    <div className="row">
                      <div className="col-md-3 col-12">
                        <div className="marketplace-Company-thumbnail">
                          {data.id == undefined ? (
                            <Skeleton circle={true} height={40} width={40} />
                          ) : (
                            <img
                              src={
                                data.logo == undefined || data.logo == ""
                                  ? Nologo
                                  : data.logo
                              }
                              alt=" No Company Logo"
                            />
                          )}
                        </div>
                        {/* <div className="c_logo d-flex align-items-center justify-content-center">
                            <img src={data.logo} width="100" height="100" />
                          </div> */}
                      </div>
                      <div className="col-md-9 col-12 mb-2">
                        <div className="c_name">
                          <h4>
                            <b>{data.name}</b>
                          </h4>
                        </div>
                      </div>

                      <div className="col-md-3 col-3">
                        <div>
                          <img
                            src={IndustryIndicativePricingLogo}
                            className=""
                          />
                        </div>
                      </div>
                      <div className="col-md-9 col-9 d-flex align-items-center pl-0 justify-content-end">
                        <div className="text-left">
                          <p className="m-0 text-small">
                             Association Pricing
                            <Tooltip
                              title={
                                <>
                                  <p className="mb-0">
                                    Indicative Pricing <b />
                                  </p>
                                </>
                              }
                              placement="right"
                              arrow
                              enterTouchDelay={0}
                            >
                              <InfoOutlinedIcon className="marketplace-infoicon" />
                            </Tooltip>
                          </p>
                          <h6 className="m-0 buynow_heading">
                          {associationPrice.sell_price}
                          </h6>
                        </div>
                      </div>

                      {/* <div className="col-md-12 col-12">
                          <div className="c_inactive m-3">
                            <button className="btn btn-inctive">Temporarily Inactive</button>
                          </div>
                        </div> */}
                      <div className="col-md-12 col-12 mt-2">
                        <div className="row">
                          <div className="col-3 pr-0">
                            <p className="text-left mb-2 text-small text-grey-default">
                              Industry
                            </p>
                          </div>
                          <div className="col-9 pl-0">
                            <p className="mb-2 text-small text-right w-100">
                              <b>{data.sector} </b>
                            </p>
                          </div>
                        </div>
                        <div className="row">
                            <div className="col-3 pr-0">
                              <p className="text-left mb-2 text-small text-grey-default">Company Name</p>
                            </div>
                            <div className="col-9 pl-0">
                              <p className="mb-2 text-small text-right w-100">
                                <b>{data.legalName} </b>
                              </p>
                            </div>
                          </div>
                        {/* <div className="row">
                            <div className="col-6 pr-0">
                              <p className="text-left w-50 mb-2 text-small text-grey-default">Crunchbase Link</p>
                            </div>
                            <div className="col-6 pl-0">
                              <p className="mb-2 text-small text-left w-100"><span>
                                <a href="#"> {data.legalWebsiteLink} </a> </span>
                              </p>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Company-details-tabs-section">
                  <CompanyTab companyId={data.id} companydetail={data} />
                </div>
              </div>

              {!isLogedIn ? (
                <>
                  {/* nego card section  */}

                  <div className="order-0 order-md-1 col-lg-3 col-md-12 col-12 px-1">
                    {allComapyForWebsite
                      .filter((company) => company.companyName == data.name)
                      .map((company, index) => {
                        return (
                          <>
                            {company.price == minPrice && (
                              <>
                                <div className="explore-page-negotiation-card">
                                  <div className="p-3">
                                    <h5 className="text-small text-white">
                                      <b>
                                        Check out Live Listings for{" "}
                                        {company.companyName}
                                      </b>
                                    </h5>
                                    <div className="marketplace-company-col-main">
                                      <div className="marketplace-company-col-top">
                                        <div className="marketplace-company-top-thumb">
                                          <div className="row overflow-hidden">
                                            <div className="col-md-10 col-10">
                                              <div className="marketplace-Company-thumbnail">
                                                {data.id == undefined ? (
                                                  <Skeleton
                                                    circle={true}
                                                    height={40}
                                                    width={40}
                                                  />
                                                ) : (
                                                  <img
                                                    src={
                                                      data.logo == undefined ||
                                                      data.logo == ""
                                                        ? Nologo
                                                        : data.logo
                                                    }
                                                    alt=" No Company Logo"
                                                  />
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-2 ">
                                              <Tooltip
                                                title={
                                                  <>
                                                    <p className="mb-0">
                                                      Listing ID:{" "}
                                                      <b> LIST{data.id}</b>
                                                    </p>
                                                  </>
                                                }
                                                placement="right"
                                                arrow
                                                enterTouchDelay={0}
                                              >
                                                {data.id == undefined ? (
                                                  <Skeleton
                                                    circle={true}
                                                    height={15}
                                                    width={15}
                                                  />
                                                ) : (
                                                  <InfoOutlinedIcon className="marketplace-infoicon" />
                                                )}
                                              </Tooltip>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="marketplace-tags my-2">
                                        <div className="row d-flex justify-content-between align-items-center">
                                          <div className="col-md-6 col-6">
                                            {data.id == undefined ? (
                                              <Skeleton
                                                width={100}
                                                height="1"
                                              />
                                            ) : (
                                              <h4 className="mb-0">
                                                {data.name}
                                              </h4>
                                            )}{" "}
                                          </div>
                                          <div className="col-md-6 col-6 text-right">
                                            {data.isTradeOwner === false ? (
                                              <>
                                                {data.id == undefined ? (
                                                  <Skeleton
                                                    width={100}
                                                    height="1"
                                                  />
                                                ) : (
                                                  <h4 className="mb-0">
                                                    Hot Listing 🔥
                                                  </h4>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                {data.id == undefined ? (
                                                  <Skeleton
                                                    width={100}
                                                    height="1"
                                                  />
                                                ) : (
                                                  <Chip
                                                    label="Soonicorn"
                                                    icon={
                                                      <HourglassBottomIcon />
                                                    }
                                                    variant="outlined"
                                                  />
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="marketplace-horizontalrow" />

                                      <div className="row marketplace-card-listingid d-flex justify-content-between ">
                                        <div className="col-md-12 d-flex justify-content-between ">
                                          {data.id == undefined ? (
                                            <Skeleton
                                              width={100}
                                              height={15}
                                              className="mt-2"
                                            />
                                          ) : (
                                            <p>
                                              Quantity:{" "}
                                              <span> {company.qty}</span>
                                            </p>
                                          )}
                                          {data.id == undefined ? (
                                            <Skeleton
                                              width={100}
                                              height={15}
                                              className="mt-2"
                                            />
                                          ) : (
                                            <p>
                                              Expiry: <span> 8 hrs</span>
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div className="marketplace-actions">
                                        {data.id == undefined ? (
                                          <Skeleton width={248} height={30} />
                                        ) : (
                                          <>
                                            {loadingbutton &&
                                            selectbutton === data.id ? (
                                              <Loadbutton />
                                            ) : (
                                              <>
                                                <button
                                                  className="btn btn-secoundary-default w-100"
                                                  type="button"
                                                  onClick={() => {
                                                    history.push("/login");
                                                  }}
                                                >
                                                  Buy now ₹{company.price}{" "}
                                                  <p className="share mb-0">
                                                    {" "}
                                                    / share
                                                  </p>
                                                  {/* Negotiate from ₹ 150{data.minBidPriceAccepted} <p className='share mb-0'> / share</p> */}
                                                </button>

                                                {/* <button className="btn btn-secoundary-default w-100" type="button"

                      onClick={async () => {

                          try {
                              const responseprofile = await apiCall("useronboarding/accountonboarding", "GET", '', history);
                              let responseprofileJSON = await responseprofile.json();

                              if (responseprofileJSON != undefined
                                  && responseprofileJSON.uaVerifiedStatus == "Verified") {
                              } else {
                                  setDialogPage(true);
                                  return
                              }
                          } catch (e) {
                              setDialogPage(true);
                              return
                          }

                          await setSelectbutton(data.id)
                          setLoadingbutton(true)


                          let response = await apiCall("dataongoingtranaction/dataaccount/" + data.id, 'GET', '', history)
                          if (response.status == undefined) {
                              return
                          }
                          let responseJSON = await response.json();
                          if (response.status != 200) {
                              const reqBody = {
                                  "communicationStatus": "donotcreatecoomunicationrecord",
                                  "message": "it's a dummy comment",
                                  "offeredPrice": data.minBidPriceAccepted,
                                  "offeredQuantity": data.qty,
                                  "dataId": data.id
                              }
                              const response1 = await apiCall("datacommunication/", 'POST', reqBody, history)
                              const responseJSON1 = await response1.json();

                              const response12 = await apiCall("dataongoingtranaction/ongoingtransaction/" + responseJSON1.dataOnGoingTransactionId, 'GET', '', history)
                              const responseJSON12 = await response12.json();

                              responseJSON = responseJSON12;
                          }

                          history.push({ pathname: "/transactions", state: { selectedTrade: data, selectedongoingtxn: responseJSON } })
                      }}>Buy now ₹{data.minBidPriceAccepted} <p className='share mb-0'> / share</p>
                      </button> */}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}

                    <div className="dbmn explore-page-login-container">
                      <h5 className="login_Page_heading mt-2">
                        Sign Up To Buy/ Sell Sun {data.name}
                      </h5>

                      {showUserAlreadyExistsError ? (
                        <InlineValidationBoxUserAlreadyExists />
                      ) : null}
                      <form
                        className="login-form w-100"
                        onSubmit={handleSubmit}
                      >
                        <label>
                          Name<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        {showNameError ? <InlineValidationName /> : null}
                        <label>
                          Email<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        {showEmailError ? <InlineValidationEmail /> : null}
                        <label>
                          Mobile Number<span className="red-star">*</span>
                        </label>
                        <div className="d-flex align-items-center pl-2 bg-white signup-mobile-input">
                          <span className="m-0 text-medium border-right pr-2">
                            +91
                          </span>
                          <input
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            size="38"
                            style={{ border: "none", width: "100%" }}
                          />
                        </div>
                        {showPhoneNumberError ? (
                          <InlineValidationBoxPhoneNumber />
                        ) : null}

                        <AlertDialog
                          dialogPage={dialogPage}
                          onClose={closeDialog}
                        />

                        {/* <input type="submit" value="Sign Up" className="submit-button text-white mt-4" /> */}

                        {!loadingbutton && (
                          <Buttons.PrimaryButton
                            value="Create My Account"
                            className="login-submit-button mt-4"
                          />
                        )
                        // !loadingbutton && <Buttons.PrimaryButton value="Create My Account" className="login-submit-button mt-4" onClick={sendotp} />
                        }
                        {loadingbutton && (
                          <div className="mt-4">
                            <Loadbutton />
                          </div>
                        )}
                      </form>
                      <div class="login_Page_horizontal-line my-3" />
                      <div className="SignUp_page_sign-up my-3">
                        <p>
                          Already have an account?{" "}
                          <Link to="/Login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* login section  */}
                  <div className="dnmb order-2 order-md-2 col-lg-3 col-md-12 col-12 px-1">
                    <div className="explore-page-login-container">
                      <h5 className="login_Page_heading mt-2">
                        Sign Up To Buy/ Sell Sun {data.name}
                      </h5>

                      {showUserAlreadyExistsError ? (
                        <InlineValidationBoxUserAlreadyExists />
                      ) : null}
                      <form
                        className="login-form w-100"
                        onSubmit={handleSubmit}
                      >
                        <label>
                          Name<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        {showNameError ? <InlineValidationName /> : null}
                        <label>
                          Email<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        {showEmailError ? <InlineValidationEmail /> : null}
                        <label>
                          Mobile Number<span className="red-star">*</span>
                        </label>
                        <div className="d-flex align-items-center pl-2 bg-white signup-mobile-input">
                          <span className="m-0 text-medium border-right pr-2">
                            +91
                          </span>
                          <input
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            size="38"
                            style={{ border: "none", width: "100%" }}
                          />
                        </div>
                        {showPhoneNumberError ? (
                          <InlineValidationBoxPhoneNumber />
                        ) : null}

                        <AlertDialog
                          dialogPage={dialogPage}
                          onClose={closeDialog}
                        />

                        {/* <input type="submit" value="Sign Up" className="submit-button text-white mt-4" /> */}

                        {!loadingbutton && (
                          <Buttons.PrimaryButton
                            value="Create My Account"
                            className="login-submit-button mt-4"
                          />
                        )
                        // !loadingbutton && <Buttons.PrimaryButton value="Create My Account" className="login-submit-button mt-4" onClick={sendotp} />
                        }
                        {loadingbutton && (
                          <div className="mt-4">
                            <Loadbutton />
                          </div>
                        )}
                      </form>
                      <div class="login_Page_horizontal-line my-3" />
                      <div className="SignUp_page_sign-up my-3">
                        <p>
                          Already have an account?{" "}
                          <Link to="/Login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="order-2 order-md-2 col-lg-3 col-md-12 col-12 mt-2">
                  <div className="">
                    <div className="company-explore-sidebarinner">
                      <div className="code bg-white text-center">
                        <img
                          src={imgurl("c2.65909344.svg")}
                          alt="c2"
                          className="center-block"
                        />
                        <h5 className="text-center mt-2">
                          Reach out to us and <br />
                          place an order to buy or sell!
                        </h5>
                        <div className="company-details-btn">
                          <div className="d-flex justify-content-center">
                            <Button
                              className="btn btn-primary-default mx-2 w-100"
                              onClick={(event) =>
                                showModal(event, data.id, data.name, data)
                              }
                            >
                              <CompareArrowsOutlinedIcon className="mr-2" />
                              Buy / Sell
                            </Button>
                          </div>
                          <div className="d-flex justify-content-center mt-2">
                            <Button
                              className="btn btn-secoundary-default mx-2 w-100"
                              onClick={(event) =>
                                showModalWatchlist(event, data.id, data.name)
                              }
                            >
                              {data.addedWatchList ? (
                                <BookmarkIcon className="mr-2" />
                              ) : (
                                <BookmarkBorderIcon className="mr-2" />
                              )}
                              Add To Watchlist
                            </Button>
                          </div>
                        </div>
                      </div>
                      {listings.length > 0 ? <> 
                        <div className="card mt-3">
                        <div className="p-1 text-center">
                          <h6 className="available-listing m-0">
                            Available Stocks
                          </h6>
                        </div>
                        <div className="listing-table">
                          <table className="w-100">
                            <thead>
                              <tr>
                                <th className="w-25">Qty</th>
                                <th className="w-50">Price</th>
                                <th className="w-25">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listings.map((trade, index) => (
                                <tr>
                                  <td>{trade.qty}</td>
                                  <td> {numberFormat(trade.price)}</td>
                                  <td className="d-flex align-items-center">
                                    <span>
                                      <Buttons.SecondaryButton
                                        style={{ width: "100%" }}
                                        value="Buy Now"
                                        onClick={(event) => handleBuyNow(event)}
                                      />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      </> : <></>}{" "}
                     
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!isLogedIn && (
              <div className="mt-5">
                <h5 className="login_Page_heading mt-2 px-2">
                  Checkout Other Companies Like {data.name}
                </h5>
                <Companies explorePage={explorePage} />
              </div>
            )}
          </div>
        </section>
      ) : null}

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="allcompany-modal-closeIcon text-right">
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="addcompanyrequest px-5 pb-5">
          <div className="">
            <div className="text-center">
              {watchlist ? (
                <>
                  <h5>
                    <b>
                      Company will be added to your watchlist. You will be
                      notified about all its updates.
                    </b>
                  </h5>
                  <p className="m-0 text-small">
                    Please log in for Add watchlist to company!
                  </p>
                </>
              ) : (
                <>
                  <h5>
                    <b>Ready to trade this unlisted share?</b>
                  </h5>
                  <p className="m-0 text-small">
                    Please log in to start investing right away!
                  </p>
                </>
              )}
            </div>
            <div className="d-flex justify-content-center text-center mt-4">
              <Buttons.PrimaryButton
                value="Login / Sign Up "
                onClick={() => {
                  history.push("/login");
                }}
                style={{ width: "50%", margin: "0px 5px" }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={tradeModal}
        onClose={hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TradeModal
          handleClose={hideModal}
          c_id={item_id}
          c_name={item_name}
          allcompanyDetails={allcompanyDetails}
        />
      </Dialog>

      <Dialog
        open={loginModalState}
        onClose={closeLoginModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="login_modal_closeIcon text-right">
          <CloseIcon onClick={closeLoginModal} />
        </div>

        <div className="login_modal_img-container">
          <div className="login_modal_img-div">
            <img src={LoginModalImg} alt="modal-img" />
          </div>
        </div>

        <div className="default_modal_main">
          <div className="">
            <h5>
              <b>Check Out More Similar Companies</b>
            </h5>
            <p className="m-0 text-small">
              Log into the platform and check out all available inventories for
              similar companies, and start trading seamlessly!
            </p>
          </div>

          <div className="">
            {showUserAlreadyExistsError ? (
              <InlineValidationBoxUserAlreadyExists />
            ) : null}
            <form
              className="login-form w-100"
              // onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-12 col-12">
                  <label>
                    Name<span className="red-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-100"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {/* {showNameError ? <InlineValidationName /> : null} */}
                </div>
                <div className="col-md-6 col-12">
                  <label>
                    Email<span className="red-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-100"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {/* {showEmailError ? <InlineValidationEmail /> : null} */}
                </div>
                <div className="col-md-6 col-12">
                  <label>
                    Mobile Number<span className="red-star">*</span>
                  </label>
                  <div className="d-flex align-items-center pl-2 bg-white signup-mobile-input">
                    <span className="m-0 text-medium border-right pr-2">
                      +91
                    </span>
                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      size="38"
                      style={{ border: "none", width: "100%" }}
                    />
                  </div>
                  {/* {showPhoneNumberError ? <InlineValidationBoxPhoneNumber /> : null} */}
                </div>
              </div>

              <AlertDialog dialogPage={dialogPage} onClose={closeDialog} />

              {/* <input type="submit" value="Sign Up" className="submit-button text-white mt-4" /> */}

              {!loadingbutton && (
                <Buttons.PrimaryButton
                  value="Create My Account"
                  className="login-submit-button mt-4"
                />
              )}
              {loadingbutton && (
                <div className="mt-4">
                  <Loadbutton />
                </div>
              )}
            </form>
            <div class="login_Page_horizontal-line my-3" />
            <div className="SignUp_page_sign-up my-3">
              <p className="m-0">
                Already have an account? <Link to="/Login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ height: "100vh" }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <MobileVerification
          // type={type}
          // closeMobileVerification1={closeMobileVerification}
          // callbackfunc={callbackfunc}
          // confirmPassword={confirmPassword}
          mobilenumber={phoneNumber}
        />
      </Dialog>

      {/* <InventoryTableContent /> */}
    </>
  );
}

export default CompDetails;
