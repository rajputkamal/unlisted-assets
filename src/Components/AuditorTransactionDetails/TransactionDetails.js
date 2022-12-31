import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg"
import FlagIcon from './Flag.svg'
import CommentIcon from './comment.svg'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import loadingImg from './loading.gif'
import Buttons from "../../Components/Buttons"
import './TransactionDetails.css'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Greencheck from '../../Pages/CommonAssets/green-check.svg'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useHistory
} from "react-router-dom";
import { apiCall, downloadurl } from '../../Utils/Network';
import CloseIcon from '@material-ui/icons/Close';
import closeIcon from "../../Pages/Companies/cross.svg";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from '@mui/material/CircularProgress';
import { getTransactionFee } from "../../Utils/utils";

import VirtualModalTableContent from "../Users/MoneyTransfer/modal-table/VirtualModalTableContent";
import { ReactComponent as DownloadIcon } from '../../Pages/VirtualAccount/DownloadIcon.svg';


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
export default function AuditorTransactionDetails(props) {
  let history = useHistory();
  // const [trusteeApproval, settrusteeApproval] = React.useState([]);
  const [txn, settxn] = React.useState([]);
  const [company, setCompany] = React.useState({});
  const [isload, setLoad] = React.useState(false);
  const [onboardingDetail, setOnboardingDetail] = React.useState([]);
  // const [agreementId, setagreementId] = React.useState(props.row.tradeAgreementId1);
  const [agreement, setagreement] = React.useState({});
  const [tradeOngoingTxn, setTradeOngoingTxn] = React.useState({});

  const [accountIdBuyer, setaccountIdBuyer] = React.useState("");
  const [accountIdSeller, setaccountIdSeller] = React.useState("");

  // const [isloading, setisloading] = React.useState(false);
  // const [txnId, settxnId] = React.useState(props.row.ongoingTxnId);

  const [transactionFee, settransactionFee] = React.useState(0);
  const [openPdfModal, setopenPdfModal] = React.useState(0);
  const [openDetailModal, setopenDetailModal] = React.useState(0);

  const [details, setDetails] = React.useState({});
  const [profileaddress, setProfileaddress] = React.useState({});
  const [riskProfile, setriskProfile] = React.useState({});
  const [bankDetails, setbankDetails] = React.useState({});
  const [dmatDetails, setdmatDetails] = React.useState({});
  const [paymentStatus, setpaymentStatus] = React.useState({});

  const [invoiceDetail, setInvoiceDetail] = React.useState(false)
  const [dealSlipHeading, setDealSlipHeading] = React.useState(false)
  const [buyerdata, setBuyerData] = React.useState(false)
  const [transactiondata, setTransactionData] = React.useState(false)

  const [accountId, setAccountId] = React.useState("1ua24Ank077");
  const [tradeAggId, setTradeAggId] = React.useState(28440);
  const [trusteeApprovalStatus, settrusteeApprovalStatus] = React.useState(props.row.approvalStatusTrustee)

  console.log("trusteeApprovalStatus", trusteeApprovalStatus)


  // React.useEffect(() => {
  //
  //
  //
  //   const timer = setTimeout(() => {
  //     setLoad(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  React.useEffect(() => {
    // getAllInventory()
    // setagreementId(props.row.tradeAgreementId1)

    getAllInventory1()
    getPaymentStatus()
    GetAgrrementObject()
    // getCompany() this should be called after getting the txn object
    // getProfile()
    // bankdetails()
    // callDmat()
    // getRiskProfile()

    settrusteeApprovalStatus(props.row.approvalStatusTrustee)
  }, [props]);

  // user detail start here

  const GetAgrrementObject = async () => {
    let response = await apiCall("tradeagreement/agreement/" + props.row.tradeAgreementId1, 'GET', '', history)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json()
    // console.log("iiii"+responseJSON.buyerAgreementStatus+responseJSON.sellerAgreementStatus)
    setagreement(responseJSON);
  }


  const getProfile = async function (accId) {
    const response = await apiCall("useronboarding/adminaccountonboarding/" + accId, "GET");
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    const responseAddress = await apiCall("useronboarding/adminaccountonboardingaddress/" + accId, "GET")

    let responseJSON = await response.json();
    // // console.log("bbbbbbbb", responseJSON)

    let responseAddressJSON = await responseAddress.json();
    setDetails(responseJSON);
    setProfileaddress(responseAddressJSON)
  }

  const getRiskProfile = async function (accId) {
    const response = await apiCall("useronboarding/adminaccountonboardingriskprofile/" + accId, "GET");
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    // // console.log('responseJSONppppppp'+responseJSON.id);
    setriskProfile(responseJSON)
  }

  const getBankdetails = async function (accId) {
    const response = await apiCall("useronboarding/adminaccountonboardingbankkprofile/" + accId, 'GET', '', history)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    const bankresponseJSON = await response.json()
    setbankDetails(bankresponseJSON)
  }

  const getCallDmat = async function (accId) {
    let response = await apiCall("useronboarding/adminaccountonboardingdmatprofile/" + accId, 'GET', '', history)
    let responseJSON = await response.json()
    // // console.log("cccccccc", responseJSON)
    setdmatDetails(responseJSON)
  }

  const getPaymentStatus = async function () {
    let response = await apiCall("payment/adminauditorpaymentorderstatus/" + props.row.tradeAgreementId1, 'GET', '', history)

    // console.log("response", response)
    let responseJSON = await response.json()
    // console.log("cccccccc", responseJSON)
    setpaymentStatus(responseJSON)
  }

  // user detail end


  // const getAllInventory = async function () {
  //
  //   let response = await apiCall("tradeagreement/withoutcounter/" + agreementId, 'GET', '', history)
  //   if (response.status == undefined) {
  //     // errorToast("Invalid", "Invalid User ID or password");
  //     return
  //   }
  //   // console.log(response)
  //   let responseJSON = await response.json();
  //   // console.log(responseJSON)
  //   settrusteeApproval(responseJSON)
  //
  // }

  const getAllInventory1 = async function () {

    let response11 = await apiCall("tradeagreement/" + props.row.ongoingTxnId, 'GET', '', history)
    if (response11.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }

    //conole.log("message received from server - loading agreement again ----111111")
    let responseJSON11 = await response11.json()


    let response = await apiCall("tradeongoingtranaction/specifictxn/" + props.row.ongoingTxnId, 'GET', '', history)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    // console.log(response)
    let responseJSON = await response.json();
    setTradeOngoingTxn(responseJSON)

    setaccountIdSeller(responseJSON.onboardingTradeOwnerId)
    setaccountIdBuyer(responseJSON.onboardingTradeNONOwnerId)

    let totalAmountInvolved = responseJSON.agreedPrice * responseJSON.agreedQty

    // if (selectedTrade.isTradeOwner) {
    //   transactionFee = getTransactionFee(false, totalAmountInvolved)
    // } else {
    //   transactionFee = getTransactionFee(true, totalAmountInvolved)
    //
    // }

    settransactionFee(getTransactionFee(false, totalAmountInvolved))

    settxn(responseJSON)
    getCompany(responseJSON.companyId)
  }

  const getCompany = async function (companyId) {


    let response = await apiCall("company/companydetailbyid/" + companyId, 'GET', '', history)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }

    //conole.log("message received from server - loading agreement again ----111111")
    let responseJSON = await response.json()

    setCompany(responseJSON)
  }

  const buyerDetails = async () => {

    await getProfile(accountIdBuyer)
    await getRiskProfile(accountIdBuyer)
    await getBankdetails(accountIdBuyer)
    await getCallDmat(accountIdBuyer)
    await getProfile(accountIdBuyer)

    setTransactionData(false)
    setopenDetailModal(true)
    setBuyerData(true)
  }
  const sellerDetails = async () => {

    await getProfile(accountIdSeller)
    await getRiskProfile(accountIdSeller)
    await getBankdetails(accountIdSeller)
    await getCallDmat(accountIdSeller)
    await getProfile(accountIdSeller)

    setTransactionData(false)
    setopenDetailModal(true)
    setBuyerData(false)
  }

  const [loading, setLoading] = React.useState(true)

  const [accountBalance, setAccountBalance] = React.useState('');
  const [balancefreeze, setbalancefreeze] = React.useState('')
  const [modalOpenById, setModalOpenById] = React.useState('');
  const [virtualAccountUserId, setVirtualAccountUserId] = React.useState('');
  const [virtualAccountModal, setVirtualAccountModal] = React.useState(false);
  const [moneyReleaseModal, setMoneyReleaseModal] = React.useState(false);
  const [rowUser, setRowUser] = React.useState([])

  const [userName, setUserName] = React.useState('')

  const moneyTransferDetailModalOpen = async function (e, accountIdBuyer) {

    let response2 = await apiCall("uservirtualaccount/adminvirtualaccountbalance/" + accountIdBuyer, 'GET', '', history)
    if (response2.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON2 = await response2.json();
    // console.log("POST responseJSON2" , responseJSON2)
    if (response2.status === 200) {
      // successToast("Success", "Money Transfer successfully!!")
      setAccountBalance(responseJSON2)
    } else {
      // errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }

    let response3 = await apiCall("uservirtualaccount/adminvirtualaccountfreezebalance/" + accountIdBuyer, 'GET', '', history)
    if (response3.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON3 = await response3.json();
    // console.log("POST responseJSON3" , responseJSON3)
    if (response3.status === 200) {
      // successToast("Success", "Money Transfer successfully!!")
      setbalancefreeze(responseJSON3)
    } else {
      // errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }

    setModalOpenById(accountIdBuyer)

    setVirtualAccountUserId(accountIdBuyer)
    setVirtualAccountModal(true)

  }

  const modalClose = () => {
    setVirtualAccountModal(false)
    setMoneyReleaseModal(false)
  };


  return (
      <div className="transactiondetails-cmp mt-4">
        <div className="my-card">
          <div className="card-title">
            <h5><b>Transaction Details</b></h5>
            <div className="title-border"></div>
          </div>
          <div className="row mt-3">
            <div className="col-md-8 col-12">
              <div className="row">
                <div className="col-md-3 col-12">
                  <div className="d-flex">
                    <div>
                      <img src={txn.companyLogo} width={50} />
                      <p className="m-0 text-small"><b>{txn.companyName}</b></p>
                    </div>
                    <div>
                      {/* <p className="m-0 "><b>{txn.companyName}</b></p> */}
                      {/*<p className="m-0 text-small">Banking</p>*/}
                      {/*<p className="m-0 text-small">TNX{txn.id}</p>*/}
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-12 p-0">
                  <div className="details">
                    <p className="m-0 text-small">Txn ID</p>
                    <p className="m-0 text-small"><b>TNX{txn.id}</b></p>
                  </div>
                </div>
                {/*<div className="col-md-2 col-12">*/}
                {/*  <div className="details">*/}
                {/*    <p className="m-0 text-small">Deal ID</p>*/}
                {/*    <p className="m-0 text-small"><b>TNX{txn.id}</b></p>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="col-md-2 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Seller ID</p>
                    <p className="m-0 text-small text-nowrap"><b>{txn.onboardingTradeOwnerId}</b></p>
                  </div>
                </div>
                <div className="col-md-2 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Buyer ID</p>
                    <p className="m-0 text-small text-nowrap"><b>{txn.onboardingTradeNONOwnerId}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Transaction Status</p>
                    <p className="m-0 text-small"><b>Active</b></p>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                  <div className="">
                    <p className="m-0 text-small">ISIN</p>
                    <p className="m-0 text-small"><b>{(company.isin != undefined && company.isin != "") ? company.isin : "not available"}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12 p-0">
                  <div className="details d-flex align-items-center">
                    {/* <div className="mr-3">
                    <img src={FlagIcon} />
                  </div> */}
                    <div>
                      <p className="m-0 text-small">Amount</p>
                      <p className="m-0 text-small"><b>₹ {txn.agreedPrice * txn.agreedQty}</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details d-flex align-items-center">
                    {/* <div className="mr-3">
                    <img src={FlagIcon} />
                  </div> */}
                    <div>
                      <p className="m-0 text-small">Qty</p>
                      <p className="m-0 text-small"><b>{txn.agreedQty}</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Price/Share</p>
                    <p className="m-0 text-small"><b>₹ {txn.agreedPrice}</b></p>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                <div className="col-md-3 col-12 p-0">
                  <div className="details">
                    <p className="m-0 text-small">Buyer Conv Fee</p>
                    <p className="m-0 text-small"><b>₹ {transactionFee}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Seller Conv Fee</p>
                    <p className="m-0 text-small"><b>₹ {transactionFee}</b></p>
                  </div>
                </div>
                {/*<div className="col-md-3 col-12">*/}
                {/*  <div className="details">*/}
                {/*    <p className="m-0 text-small">Virtual Account UTR </p>*/}
                {/*    <p className="m-0 text-small"><b>ID 3508</b></p>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                <div className="col-md-3 col-12 p-0">
                  <div className="details">
                    <p className="m-0 text-small">Date of acceptance</p>
                    <p className="m-0 text-small"><b>{txn.createDate}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Date of Payment</p>
                    <p className="m-0 text-small"><b>{txn.createDate}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Date of share transfer</p>
                    <p className="m-0 text-small"><b>{txn.createDate}</b></p>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                {/* <div className="col-md-3 col-12">
                <div className="details">
                  <p className="m-0 text-small">Sale Conditions</p>
                  <p className="m-0 text-small"><b>-na-</b></p>
                </div>
              </div> */}
                {/* <div className="col-md-3 col-12">
                <div className="details">
                  <p className="m-0 text-small">Conditions For Transfer</p>
                  <p className="m-0 text-small"><b>-na-</b></p>
                </div>
              </div> */}

                {/* <div className="col-md-3 col-12">
                <div className="details">
                 <p className="m-0 text-small">Money Transfered On</p>
                 <p className="m-0 text-small"><b>{trusteeApproval.createDate}</b></p>
                </div>
              </div> */}
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                <div className="col-md-3 col-12 p-0">
                  <div className="details">
                    <p className="m-0 text-small">Mode of money Transfer</p>
                    <p className="m-0 text-small"><b>
                      {(agreement.buyerPaidNoMoneyPartOfCampaign == undefined ||
                          agreement.buyerPaidNoMoneyPartOfCampaign == false)
                          ?   (agreement.buyerPaidUsingVa == true) ?
                              "Wallet"
                              : "UPI"
                          : "Free Oyo Campaign"
                      }
                    </b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Product Type</p>
                    <p className="m-0 text-small"><b>{txn.commodityName}</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Spot Delivery Transaction</p>
                    <p className="m-0 text-small"><b>Yes</b></p>
                  </div>
                  {/* <div className="details">
                  <p className="m-0 text-small">Date of Share Transfer</p>
                  <p className="m-0 text-small"><b>{txn.createDate}</b></p>
                </div> */}
                </div>

              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                <div className="col-md-3 col-12 p-0">
                  <div className="details">
                    <p className="m-0 text-small">Mode of agreement signing</p>
                    <p className="m-0 text-small"><b>Registered Mobile OTP based</b></p>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details d-flex">
                    {/* <div className="mr-3">
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit"><b className="text-small">UA Commented</b></Typography>
                          <p>{"Pending service ticket , please review"}</p>
                        </React.Fragment>
                      }
                    >
                      <img src={''} />
                    </HtmlTooltip>
                  </div> */}
                    <div>
                      <p className="m-0 text-small">Mode of Transaction</p>
                      <p className="m-0 text-small"><b>Buy Now</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="totalfee d-flex">
                    {/* <div className="mr-3">
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit"><b className="text-small">UA Commented</b></Typography>
                          <p>{"Pending service ticket , please review"}</p>
                        </React.Fragment>
                      }
                    >
                      <img src={''} />
                    </HtmlTooltip>
                  </div> */}
                    <div>
                      <p className="m-0 text-small">TDS</p>
                      <p className="m-0 text-small"><b>₹ 0</b></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row mt-4">
              <div className="col-md-3 col-12">
              </div>
              <div className="col-md-3 col-12 p-0">
               
              </div>
              <div className="col-md-3 col-12"></div>
              <div className="col-md-3 col-12"></div>
            </div> */}


              <div className="row mt-4">
                <div className="col-md-3 col-12">
                </div>
                <div className="col-md-6 col-12 p-0">

                  <div className="details">
                    <p className="m-0 text-small">Transaction Trail</p>

                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Buyer Accepts Terms</b></p>
                    </div>

                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Buy Now Order received</b></p>
                    </div>

                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Money received from buyer</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Seller Accepts Terms</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Shares transfered to buyers Demat account</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {false ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Buyer's confirmation on receiving shares</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress") ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Verification by internal Trustee</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress") ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Verification by external Trustee</b></p>
                    </div>
                    <div className="transactiontrial-icon d-flex align-items-center">
                      {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress" ) ?
                          <div className="transactiontrial-hourglassBottomIcon"><HourglassBottomIcon /></div> :
                          <img src={Greencheck} alt="Checked Icon" />}
                      <p className="m-0 text-small"><b>Transaction Complete</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div className="details">
                    <p className="m-0 text-small">Timestamp</p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.buyerAcceptTermsDate== undefined ?"not available" : agreement.buyerAcceptTermsDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.orderReceivedDate== undefined ?"not available" : agreement.orderReceivedDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.buyerPaymentReceivedDate== undefined ?"not available" : agreement.buyerPaymentReceivedDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.sellerAcceptTermsDate== undefined ?"not available" : agreement.sellerAcceptTermsDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.sellerShareTransferDate== undefined ?"not available" : agreement.sellerShareTransferDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.buyerShareReceivedDate== undefined ?"not available" : agreement.buyerShareReceivedDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.internalTrusteeLastUpdatedDate== undefined ?"not available" : agreement.internalTrusteeLastUpdatedDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.externalTrusteeLastUpdatedDate== undefined ?"not available" : agreement.externalTrusteeLastUpdatedDate}</b></p>
                    <p className="m-0 text-small transactiontrial-icon"><b>{agreement.txnCompletionDate== undefined ?"not available" : agreement.txnCompletionDate}</b></p>
                  </div>
                </div>
              </div>



            </div>


            <div className="col-md-4 col-12">
              <div className="transaction_receipt">
                <div className="transaction_receipt_box">
                  <div>
                    <h4 style={{ color: "#721B65" }}>Transaction Receipt</h4>
                  </div>
                  <div>
                    <div className="auditorscreen_transactionDetails">
                      <p className="m-0">Price/Share</p>
                      <p className="m-0"><b>₹ {txn.agreedPrice}</b>
                      </p>
                    </div>
                    <div className="auditorscreen_transactionDetails">
                      <p className="m-0">{txn.agreedPrice} x {txn.agreedQty}</p>
                      <p className="m-0"><b>₹ {txn.agreedPrice * txn.agreedQty}</b>
                      </p>
                    </div>
                    <div className="auditorscreen_transactionDetails">
                      <p className="m-0">Transaction fee
                        <br /><span style={{ fontSize: "10px" }}>*Including GST</span>
                      </p>
                      <p className="m-0"><b>₹ {transactionFee + (.18 * transactionFee)}</b>
                      </p>
                    </div>
                    <div className="auditorscreen_transactionDetails auditorscreen_taransaction_total">
                      <p className="m-0">Total</p>
                      <p className="m-0"><b>₹ {(txn.agreedPrice * txn.agreedQty) + transactionFee + (.18 * transactionFee)}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-md-4 col-12'>
            <div className="my-card mt-2">
              <div className="card-title">
                <h5><b>Buyer's Details</b></h5>
                <div className="title-border"></div>
                <div className='mt-4'>
                  <Buttons.SecondaryButton value="View Onboarding Details" onClick={buyerDetails} style={{ height: "35px", width: "100%" }} />
                  {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress" )?
                      <Buttons.InactiveButton value="Buyer Invoice" style={{ height: "35px", width: "100%", marginTop: "5px" }} /> :
                      <a href={downloadurl("tradeagreement/admindownloadInvoice/" + props.row.tradeAgreementId1 + "/" + accountIdBuyer)} target="_blank" rel="noreferrer" ><button className='btn btn-primary-default mt-2 w-100'>Buyer Invoice</button></a>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className="my-card mt-2">
              <div className="card-title">
                <h5><b>Seller's Details</b></h5>
                <div className="title-border"></div>
                <div className='mt-4'>
                  <Buttons.SecondaryButton value="View Onboarding Details" onClick={sellerDetails} style={{ height: "35px", width: "100%" }} />

                  {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress" ) ?
                      <Buttons.InactiveButton value="Seller Invoice" style={{ height: "35px", width: "100%", marginTop: "5px" }} /> :
                      <a href={downloadurl("tradeagreement/admindownloadInvoice/" + props.row.tradeAgreementId1 + "/" + accountIdSeller)} target="_blank" rel="noreferrer" ><button className='btn btn-primary-default mt-2 w-100'>Seller Invoice</button></a>
                  }




                  {/*<Buttons.PrimaryButton value="View Invoice" onClick={adminDownloadInvoice(accountIdSeller)} style={{ height: "35px", width: "100%", marginTop: "5px" }} />*/}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className="my-card mt-2">
              <div className="card-title">
                <h5><b>Transaction Details</b></h5>
                <div className="title-border"></div>
                <div className='mt-4'>
                  {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress" ) ?
                      <Buttons.InactiveButton value="Txn Summary" style={{ height: "35px", width: "100%", marginTop: "5px" }} /> :
                      <a href={downloadurl("tradeagreement/admindownloadagreement/" + props.row.tradeAgreementId1 + "/" + accountIdSeller)} target="_blank" rel="noreferrer" ><button className='btn btn-primary-default mt-2 w-100'>Txn Summary</button></a>}

                  {/* <Buttons.SecondaryButton value="View Deal Slip Details" onClick={adminDownloadTxnSummary} style={{ height: "35px", width: "100%" }} /> */}
                  {/* <a href={downloadurl("tradeagreement/admindownloadTxnSummary/" + props.row.tradeAgreementId1 + "/" + accountIdSeller)} target="_blank" rel="noreferrer" ><button className='btn btn-secondary-default mt-2 w-100'>Txn Summary</button></a> */}

                  {(trusteeApprovalStatus == undefined || trusteeApprovalStatus == "inprogress" ) ?
                      <Buttons.InactiveButton value="Buyer/Seller Agreement" style={{ height: "35px", width: "100%", marginTop: "5px" }} /> :
                      <a href={downloadurl("tradeagreement/admindownloadagreement/" + props.row.tradeAgreementId1 + "/" + accountIdSeller)} target="_blank" rel="noreferrer" ><button className='btn btn-primary-default mt-2 w-100'>Buyer/Seller Agreement</button></a>}
                  {/*<Buttons.PrimaryButton value="View Buyer/Seller Agreement" onClick={adminDownloadAgreement} style={{ height: "35px", width: "100%", marginTop: "5px" }} />*/}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className="my-card mt-3">
              <div className="card-title">
                <h5><b>Terms of Sale & Purchase</b></h5>
                <div className="title-border"></div>
                <div className='mt-4'>
                  <a
                      href={downloadurl("myholding/downloaddisclaimeragreement/buynowtermsofsalepurchase")}
                      target="_blank" rel="noreferrer" ><button className='btn btn-secondary-default mt-2 w-100'>View Terms of Sale & Purchase</button></a>
                </div>
              </div>
            </div>
          </div>




          {(agreement.buyerPaidUsingVa != undefined
              && agreement.buyerPaidUsingVa == true) ?
              <div className="row my-2 mx-0">
                <div className='col-md-12 col-12'>
                  <div className="my-card mt-2">
                    <div className="card-title">
                      <h5><b>Payment Status</b></h5>
                      <div className="title-border"></div>
                      <div className='mt-2'>
                        {/* {console.log("aaaaaa" + paymentStatus.orderStatus + paymentStatus.moneySettledUA)} */}
                        {<p className="text-medium text-success">Payment is Successful using Buyer's Wallet</p>
                        }
                      </div>

                      <div className="my-2">
                        <a href={agreement.sellerShareTransferProof} target="_blank" style={{ color: "#721B65", fontSize: "14px", textDecoration: "underline" }}>Download Share Transfer Proof</a>
                      </div>

                    </div>
                    <div>
                      <Buttons.PrimaryButton value="View Buyers's Wallet Details"
                                             onClick={(e) => moneyTransferDetailModalOpen(e, accountIdBuyer)}
                          //  onClick={(e) => moneyTransferDetailModalOpen(e, user.username, user)}
                                             style={{ height: "35px", width: "100%", marginTop: "5px", textAlign: 'center' }} />
                    </div>
                  </div>
                </div>
              </div>
              :
              (agreement.buyerPaidNoMoneyPartOfCampaign == true ?
                      <div className="row my-2 mx-0">
                        <div className='col-md-12 col-12'>
                          <div className="my-card mt-2">
                            <div className="card-title">
                              <h5><b>Payment Status</b></h5>
                              <div className="title-border"></div>


                              <div className='mt-2'>
                                <p className="text-medium">1 oyo share free for every KYC completion - No payment required</p>

                              </div>

                              <div className="my-2">
                                <a href={agreement.sellerShareTransferProof} target="_blank" style={{ color: "#721B65", fontSize: "14px", textDecoration: "underline" }}>Download Share Transfer Proof</a>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="row my-2 mx-0">
                        <div className='col-md-12 col-12'>
                          <div className="my-card mt-2">
                            <div className="card-title">
                              <h5><b>Payment Status</b></h5>
                              <div className="title-border"></div>
                              <div className='mt-2'>
                                {/* {console.log("aaaaaa" + paymentStatus.orderStatus + paymentStatus.moneySettledUA)} */}
                                {paymentStatus.orderStatus == "success" ? <p className="text-medium">Payment is Successful</p>
                                    : <p className="text-medium">Payment is Failed</p>}
                              </div>
                              <div className='mt-2'>
                                {paymentStatus.moneySettledUA == true ? <p className="text-medium">Payment is Settled into UA account Sccessfully</p>
                                    : <p className="text-medium">Payment is not yet Settled</p>}
                              </div>

                              <div className='mt-2'>
                                <p className="text-medium">Amount Transfered By Buyer : {paymentStatus.amount}</p>

                              </div>

                              <div className='mt-2'>
                                <p className="text-medium">Buyer's UPI Handle :   {(paymentStatus.customerUPIID == undefined
                                    || paymentStatus.customerUPIID == "") ? "Not Known - Done using QR code or Other Payment Modes"
                                    : paymentStatus.customerUPIID}</p>


                              </div>

                              <div className='mt-2'>
                                <p className="text-medium">Buyer's UTR/RRN payment Mode reference ID :   {(paymentStatus.bank_reference == undefined
                                    || paymentStatus.bank_reference == "") ? "Not Known"
                                    : paymentStatus.bank_reference}</p>

                              </div>


                              <div className="my-2">
                                <a href={agreement.sellerShareTransferProof} target="_blank" style={{ color: "#721B65", fontSize: "14px", textDecoration: "underline" }}>Download Share Transfer Proof</a>
                              </div>

                            </div>


                          </div>
                        </div>
                      </div>
              )

          }

        </div>

        <Dialog
            open={openPdfModal}
            onClose={() => setopenPdfModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <section className="transation-detail-pdf-modal">
            <div>
              <div class="close-icon border-none" onClick={() => setopenPdfModal(false)}>
                <button type="button" className="close" ><img src={closeIcon} width="20" /></button>
              </div>
              <div>
                <div className="py-2">
                  {invoiceDetail ?
                      <h4 className="mb-2 heading"> <b>Invoice Details</b></h4> :
                      <h4 className="mb-2 heading"> {dealSlipHeading ? <b>Deal Slip Details</b> :
                          <b>Buyer/Seller Agreement Details</b>}</h4>
                  }
                </div>
                {loading ? <div className='pdf-loader d-flex justify-content-center align-items-center default-modal-height'>
                      <CircularProgress />
                    </div> :
                    <div class="row scroll-default">
                      <div class="col-md-12 px-0">
                        <div className='default-modal-height'>
                          <div className="modal">
                            <div className="modalContent">
                              <iframe src="http://www.africau.edu/images/default/sample.pdf"
                                      style="width:600px; height:500px;" frameBorder="0"></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
              </div>
            </div>
          </section>
        </Dialog>

        {/* user all details  modal*/}

        <Dialog
            open={openDetailModal}
            onClose={() => setopenDetailModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <section className="transation-detail-pdf-modal">
            <div className="">
              <div class="close-icon border-none" onClick={() => setopenDetailModal(false)}>
                <button type="button" className="close" ><img src={closeIcon} width="20" /></button>
              </div>
              <div >
                <div className="">

                  {transactiondata ?
                      <h4 className="mb-2 heading"> <b>Transaction's Details</b></h4> :
                      <h4 className="mb-2 heading"> {buyerdata ? <b>Buyer's Details</b> :
                          <b>Seller's Details</b>}</h4>
                  }

                </div>
                <div class="row scroll-default">
                  <div class="col-md-12 ">
                    <div className='default-modal-height'>
                      <div className="transation-detail-modal">
                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b> Personal Details </b></h6>
                          </div>

                          <div className='row'>
                            <div className='col-md-3 col-12'><p className="tex-small ">Full name :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.name}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">User ID :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.accountId}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Email :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.email}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Mobile Number :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.mobileNumber}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Residentship :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.residentStatus}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Address :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.address}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">State :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.state}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">City :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.city}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Pin code :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{profileaddress.pincode}</b></p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b>Bank Account Details: </b></h6>
                          </div>
                          <div className='row'>
                            <div className='col-md-3 col-12'><p className="tex-small ">Bank Account Number :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.accountNumber}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">IFSC Code :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.ifscCode}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Bank Name :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.bankName}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Branch Name :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{bankDetails.branchName}</b></p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b>Demat Account Details: </b></h6>
                          </div>
                          <div className='row'>
                            <div className='col-md-3 col-12'><p className="tex-small ">Depository Name :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.depositoryName}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Broker Name :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.brokerName}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">DP ID :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.dpId}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Client ID :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.clientId}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">BO ID :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{dmatDetails.boId}</b></p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b>Share Transfer Process Preference: </b></h6>
                          </div>
                          <div className='row'>
                            <div className='col-md-3 col-12'><p className="tex-small ">NSDL account :</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.nsdlAccount}</b></p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b>KYC Details:</b></h6>
                          </div>
                          <div className='row'>
                            <div className='col-md-3 col-12'><p className="tex-small ">PAN Number:</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.panNumber}</b></p>
                            </div>
                            <div className='col-md-3 col-12'><p className="tex-small ">Aadhar Number:</p></div>
                            <div className='col-md-9 col-12'><p className="tex-small "><b>{details.aadharNumberVerified}</b></p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="py-2">
                            <h6 className="mb-2 heading"><b>Risk Profile:</b></h6>
                          </div>
                          <div className='row'>
                            <div className='col-md-7 col-12'><p className="tex-small ">1. Have you invested in Unlisted Shares before?</p></div>
                            <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment1 == null ? "-" : riskProfile.currentAlignment1}
                            </b></p>
                            </div>
                            <div className='col-md-7 col-12'><p className="tex-small ">2. What describes you the most in relation to unlisted stocks</p></div>
                            <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment2 == null ? "-" : riskProfile.currentAlignment2}
                            </b></p>
                            </div>
                            <div className='col-md-7 col-12'><p className="tex-small ">3. What is your networth?</p></div>
                            <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment3 == null ? "-" : riskProfile.currentAlignment3}</b></p>
                            </div>
                            <div className='col-md-7 col-12'><p className="tex-small ">4. How do you take your investment descisions</p></div>
                            <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment4 == null ? "-" : riskProfile.currentAlignment5}
                            </b></p>
                            </div>
                            <div className='col-md-7 col-12'><p className="tex-small ">5. Do you want professional guidance / study material for investing in unlisted shares?</p></div>
                            <div className='col-md-2 col-12'><p className="tex-small "><b>{riskProfile.currentAlignment5 == null ? "-" : riskProfile.currentAlignment5}</b></p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Dialog>

        <Dialog
            open={virtualAccountModal}
            onClose={modalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

          <section className="virtual-account-modal">
            <div className="default_modal_padding">
              <div class="">
                <>
                  <div class="close-icon border-none" onClick={modalClose}>
                    <button type="button" className="close " ><img src={closeIcon} width="20" /></button>
                  </div>
                  {modalOpenById !== rowUser ?
                      <div class="trade-modal">
                        <div className="py-2">
                          <h6 className="mb-2 heading"> <b> virtual account Details </b></h6>

                          <div className="row ">
                            <div className="col-md-4 col-12 my-2 ">
                              <div className="">
                                <h5 className="text-small mb-1">Virtual Account Balance</h5>
                                <h5 className="text-small m-0"><b>Rs. {accountBalance}</b></h5>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 my-2">
                              <div className="">
                                <h5 className="text-small mb-1">Amount Frozen In Ongoing Transaction</h5>
                                <h5 className="text-small m-0"><b>Rs. {balancefreeze}</b></h5>
                              </div>
                            </div>
                          </div>

                          <div className="row ">
                            <div className="col-md-4 col-12 my-2 ">
                              <div className="">
                                <h5 className="text-small mb-1">User ID</h5>
                                <h5 className="text-small2 m-0">{virtualAccountUserId}</h5>
                              </div>
                            </div>
                            <div className="col-md-4 col-12 my-2">

                              <div className="">
                                <h5 className="text-small mb-1">Virtual Account Number</h5>
                                <h5 className="text-small2 m-0">****************</h5>
                              </div>
                            </div>
                            {/*<div className="col-md-12 d-flex justify-content-end my-2">*/}

                            {/*  <a href={downloadurl("uservirtualaccount/downloadvirtualbookexcel")}>*/}
                            {/*    <div className='SelectedAssest-text transfer-modal-text d-flex align-items-start'>*/}
                            {/*      <DownloadIcon className="download-icon" /> <p className="m-0 mx-2">Download Statement</p>*/}
                            {/*    </div></a>*/}
                            {/*</div>*/}
                          </div>

                        </div>


                        <div class="row modal-center-row scroll-default">
                          <div class="col-md-12 ">
                            <div className='modal-height '>
                              <div className="virtual-modal-table-main " >
                                <VirtualModalTableContent rowUser={rowUser} virtualAccountUserId={virtualAccountUserId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      : <p>User id not match</p>}
                </>
              </div>
            </div>
          </section>
        </Dialog>
      </div >
  )
}
