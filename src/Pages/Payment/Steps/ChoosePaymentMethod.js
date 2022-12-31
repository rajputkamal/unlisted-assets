import React, { useState, useEffect } from "react";
import "./style.css";
// import "../../../App.css"
// import "./tradereadystep7.css"

import Buttons from "../../../Components/Buttons";
import { apiCall, downloadurl } from "../../../Utils/Network";
import { ReactComponent as TooltipIcon } from "../../TradeReadySteps/TooltipIcon.svg";
import Tooltip from "@mui/material/Tooltip";

import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { makeStyles } from "@material-ui/core/styles";
import { getTransactionFee } from "../../../Utils/utils";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BsQuestionCircle } from "react-icons/bs";

import CompanyIcon from "./Assets/CompanyIcon.svg";
import VirtualAccountModalIcon03 from "./Assets/VirtualAccountModalIcon01.svg";
import VirtualAccountModalIcon01 from "./Assets/VirtualAccountModalIcon02.svg";
import VirtualAccountModalIcon02 from "./Assets/VirtualAccountModalIcon03.svg";
import ExclamationMarkIcon from "./Assets/ExclamationMarkIcon.svg";
import CheckMarkIcon from "./Assets/CheckMarkIcon.svg";

import paymentSuccessIcon from "./Assets/paymentSuccessIcon.svg";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

// profile
import PhoneInput from "react-phone-number-input";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { successToast, errorToast } from "../../../Components/Toast/index";
import { numberFormat } from "../../../Utils/NumberFormat";

// Risk profile
// import "../RiskProfileQuestions/riskProfileQuestions.css"
// import StepRiskIcon from "./risk.svg";
// import StepCompleteIcon from "./modal-notice.svg";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));


const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(180deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2E384D",
    marginLeft: "7px",
  }, 
  droplabel: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2E384D",
    marginLeft: "-2px",
  },
  errorInput: {
    border: '1px solid #FF4D4F'
  }
}));

const handletryagain = () => {
  // // console.log("aaaahandletryagain")
};

let ChoosePaymentMethod = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const [walletCreated, setWalletCreated] = React.useState(false);
  const [createVirtualAcc, setCreateVirtualAcc] = React.useState(false);

  //kamal
  const [addMoneyNewModal, setAddMoneyNewModal] = React.useState(false);
  const [UPIModal, setUPIModal] = React.useState(false);
  const [maxAmountError, setMaxAmountError] = useState(false);
  const [enteredAmount, setEnteredAmount] = React.useState('₹')
  const [disable ,setDisable] = useState(false)
  const [bankTransferModal, setBankTransferModal] = useState(false)

  const [confirmVirtualAcc, setConfirmVirtualAcc] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState(false);
  const [paymentInprocess, setPaymentInprocess] = React.useState(false);
  const [paymentFailed, setPaymentFailed] = React.useState(false);
  const [addMoneyToWallet, setAddMoneyToWallet] = React.useState(false);
  const [buyerAccountId, sebuyerAccountId] = React.useState("");

  const [totalAmount, settotalAmount] = React.useState(0);

  const [details, setDetails] = useState({});
  const [profileaddress, setProfileaddress] = useState({});
  const [bankDetails, setbankDetails] = useState({});
  const [dmatDetails, setdmatDetails] = useState({});
  const [riskProfile, setriskProfile] = useState({});
  const [isloading, setLoading] = useState(false);

  const [userId, setuserId] = React.useState("");
  const [addMoneyWalletAmount, setaddMoneyWalletAmount] = React.useState(0);

  const location = useLocation();
  let selectedAggId = "";
  let isCampaign1 = false;
  if (location.state !== undefined) {
    selectedAggId = location.state.aggId;
    isCampaign1 = location.state.isCampaign;
  } else {
    // alert("hiiiiiii")
  }
  // alert("selectedAggId"+selectedAggId+location.state.aggId)
  const [aggId, setaggId] = useState(selectedAggId);
  const isEnabled = enteredAmount.length > 0;

  async function moneyconfirmationcampaign() {
    // let requestBody = {
    //
    //     buyerMoneyReceivedForTradeStatus: "true"
    // };
    //// console.log("request body", requestBody);

    //let stringifiedRequestBody = JSON.stringify(requestBody);

    //// console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "tradeagreement/moneyconfirmationcampaign/" + aggId,
      "PUT",
      "",
      history
    );

    let responseJSON = await response.json();
    // console.log("response ", response);

    // console.log("responseJson", responseJSON);

    if (response.status !== 200) {
      errorToast("Invalid", "Something went wrong!!, please reach Admin");

      // setShowDialog(false); //failure
      //props.callbackfunc();
      return;
    } else if (response.status === 200) {
      if (responseJSON.buyerPaidNoMoneyPartOfCampaign == true) {
        // successToast("Success","Money Added Successfully!!")
        // setShowDialog(true); // success
        // props.callbackfunc();
        props.nextPage();
      } else {
        // errorToast("Invalid", "Please add money to your wallet before confirmation...");
        //setShowDialog(true); // success
        //props.callbackfunc();
        errorToast("Invalid", "Something went wrong!!, please reach Admin");
      }

      return;
    }
  }

  useEffect(async () => {
    if (isCampaign1 == true) {
      // its 1 oyo free share campaign use case
      //bye passing payment
      moneyconfirmationcampaign();
    }
  }, []);

  const [isCampaign, setisCampaign] = React.useState(isCampaign1);
  const [amountMore, setAmountMore] = React.useState(true);
  const [insufficientBalance, setInsufficientBalance] = React.useState(false);
  const [virtualAccountCreated, setVirtualAccountCreated] = React.useState(
    false
  );
  const [addMonetTowallet, setaddMonetTowallet] = useState(false);
  const [addMoneyNew, setAddMoneyNew] = React.useState(false);
  const [showUpiIdError, setShowUpiIdError] = useState("");
  const [UPIError, setUPIError] = useState("");

  const [orderObject, setorderObject] = useState({});
  const [orderObjectAddMoney, setorderObjectAddMoney] = useState({});

  const [qrCodeObject, setqrCodeObject] = useState({});
  const [qrCodeObjectAddMoney, setqrCodeObjectAddMoney] = useState({});

  const [orderStatusObject, setorderStatusObject] = useState({});
  const [orderStatusObjectAddMoney, setorderStatusObjectAddMoney] = useState({});

  const [orderPayUPIObject, setorderPayUPIObject] = useState({});
  const [orderPayUPIObjectAddMoney, setorderPayUPIObjectAddMoney] = useState({});

  const [editrequest, setEditrequest] = useState(true);
  const [expanded, setExpanded] = React.useState("panel1");

  const [UpiId, setUpiId] = React.useState("");

  const [grandTotal, setGrandTotal] = React.useState("");

  const [enterUpiId, setEnterUpiId] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [iFSCCode, setIFSCCode] = useState("");
  const [moneyRadioBtn, setMoneyRadioBtn] = useState('upi')

  var interval;
  var intervalAddMoney;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const handleUPIID = (event: SelectChangeEvent) => {
  //   setUpiId(event.target.value);
  // };

  const handleUPIID = (event) => {
    setUpiId(event.target.value);
  };

  const moneyHandler = (e) => {
    setMoneyRadioBtn(e.target.value)
   
  }

  const onContinueHandler = async (e) => {
    e.preventDefault()
    setAddMoneyNewModal(false)
    setaddMonetTowallet(true)
    // if(moneyRadioBtn === 'upi'){

    //   await createOrderAddMoney();
    //   await getQRCodeAddMoney();
    //   setUPIModal(true)
    // }else {
    //   setaddMonetTowallet(true)
    // }
}
  

  const moneyAddHandler = (e) => {
    if((e.target.value) > 100000){
      setMaxAmountError(true)
      return
    }else {
      setEnteredAmount((e.target.value))
      setMaxAmountError(false)
    }
  }
  useEffect(async () => {
    // props.nextPage()
    if (isCampaign == true) {
    } else {
      await createOrder();
      await getQRCode();
      getAggreement();
    }
  }, []);

  async function getAggreement() {
    let response = await apiCall(
      "tradeagreement/agreement/" + aggId,
      "GET",
      "",
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();

    // setagreement(responseJSON);
    let totalAmountInvolved =
      responseJSON.agreedQuantity * responseJSON.agreedPrice;
    let transactionFee = 0;
    transactionFee = getTransactionFee(true, totalAmountInvolved);

    let total1 = totalAmountInvolved + transactionFee + 0.18 * transactionFee;

    settotalAmount(total1);

    let balance1 = await virtualbankdetails();

    if (balance1 != undefined) {
      if (parseFloat(balance1) - parseFloat(total1) >= 0) {
        setInsufficientBalance(false);
      } else {
        setInsufficientBalance(true);
      }
    }

    // this is to disable the UPI option
    if (parseFloat(total1) > 100000) {
      setAmountMore(true);
      setExpanded("panel2");
    } else {
      setAmountMore(false);
    }
  }

  async function createOrder() {
    try {
      const response = await apiCall("payment/order/create/" + aggId, "GET");
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      setorderObject(responseJSON);

      checkStatus();
    } catch (e) {}
  }

  async function checkStatus() {
    interval = setInterval(() => {
      // var condition = navigator.onLine ? 'online' : 'offline';

      getOrderStatus();

      // clearInterval(interval);
      // console.log("condition check")
    }, 10000);

    // return function stopTimer() {
    //     clearInterval(interval)
    // }
  }

  async function payUsingUPI(event) {
    event.preventDefault();

    const response = await apiCall(
      "payment/order/checkout/upi/" + aggId + "/" + enterUpiId,
      "GET"
    );
    if (response.status == undefined) {
      errorToast("Invalid", "Invalid User ID or password");
      return;
    }

    let responseJSON = await response.json();
    console.log("bbbbbbbb", responseJSON);

    if (response.status == 200) {
      setPaymentInprocess(true);
      setPaymentSuccess(false);
      setorderPayUPIObject(responseJSON);
    } else {
      errorToast("Invalid", "UPI ID entered is invalid!!");
      setShowUpiIdError(true);
    }
  }

  // Once order is placed, keep on checking the status after every 10 seconds for now
  //later this needs to be modified

  async function getOrderStatus() {
    try {
      const response = await apiCall("payment/order/status/" + aggId, "GET");
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      if (responseJSON.payment_status == "SUCCESS") {
        clearInterval(interval);

        setPaymentInprocess(true);
        setPaymentSuccess(true);

        setTimeout(() => {
          props.nextPage();
        }, 3000);
      }
      setorderStatusObject(responseJSON);
    } catch (e) {}
  }

  async function getQRCode() {
    try {
      const response = await apiCall(
        "payment/order/checkout/upiqrcode/" + aggId,
        "GET"
      );
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      setqrCodeObject(responseJSON);
    } catch (e) {}
  }

  //ensuring status check interval is cleared when the component is destroyed

  useEffect(() => {
    // virtualbankdetails()
    // getAggreement()
    return function stopTimer() {
      clearInterval(interval);
    };
  }, []);


  //add money related UPI functions

  async function createOrderAddMoney() {
    try {
      const response = await apiCall("payment/order/create/addMoneyToWallet/"+"10", "GET");
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      setorderObjectAddMoney(responseJSON);

      checkStatusAddMoney();
    } catch (e) {}
  }

  async function checkStatusAddMoney() {
    intervalAddMoney = setInterval(() => {
      // var condition = navigator.onLine ? 'online' : 'offline';

      getOrderStatusAddMoney();

      // clearInterval(interval);
      // console.log("condition check")
    }, 10000);

    // return function stopTimer() {
    //     clearInterval(interval)
    // }
  }

  async function payUsingUPIAddMoney(event) {
    event.preventDefault();

    const response = await apiCall(
        "payment/order/checkout/upi/addMoneyWallet" + "/" + enterUpiId,
        "GET"
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }

    let responseJSON = await response.json();
    console.log("bbbbbbbb", responseJSON);

    if (response.status == 200) {
      setPaymentInprocess(true);
      setPaymentSuccess(false);
      setorderPayUPIObjectAddMoney(responseJSON);
    } else {
      // errorToast("Invalid", "UPI ID entered is invalid!!");
      // setShowUpiIdError(true);
    }
  }

  // Once order is placed, keep on checking the status after every 10 seconds for now
  //later this needs to be modified

  async function getOrderStatusAddMoney() {
    try {
      const response = await apiCall("payment/order/status/addMoneyWallet", "GET");
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      if (responseJSON.payment_status == "SUCCESS") {
        clearInterval(intervalAddMoney);

        setPaymentInprocess(true);
        setPaymentSuccess(true);

        setTimeout(() => {

          setPaymentInprocess(false);
          setPaymentSuccess(false);

          // setaddMonetTowallet(false)
          setUPIModal(false)
        }, 3000);
      }
      setorderStatusObjectAddMoney(responseJSON);
    } catch (e) {}
  }

  async function getQRCodeAddMoney() {
    try {
      const response = await apiCall(
          "payment/order/checkout/upiqrcode/addMoneyWallet",
          "GET"
      );
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let responseJSON = await response.json();
      // // console.log("bbbbbbbb", responseJSON)

      setqrCodeObjectAddMoney(responseJSON);
    } catch (e) {}
  }

  useEffect(() => {
    // virtualbankdetails()
    // getAggreement()
    return function stopTimer() {
      clearInterval(intervalAddMoney);
    };
  }, []);

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    const responseAddress = await apiCall("useronboarding/address", "GET");
    let responseJSON = await response.json();
    // // console.log("bbbbbbbb", responseJSON)
    let responseAddressJSON = await responseAddress.json();
    setDetails(responseJSON);
    setProfileaddress(responseAddressJSON);
  }

  async function getRiskProfile() {
    const response = await apiCall("useronboarding/risk", "GET");
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    // // console.log('responseJSONppppppp'+responseJSON.id);
    setriskProfile(responseJSON);
    console.log("riskProfiletest", riskProfile);
    if (riskProfile == "") {
      setOpenConfirmation(false);
      return;
    } else {
      setOpenConfirmation(true);
    }
  }

  // virtual acc details

  const [virtualBankDetails, setVirtualbankdetails] = useState({});
  const [accountnumber, setAccountNumber] = useState("");
  const [vaccountnumber, setVAccountNumber] = useState("");
  const [vAccountData, setVAccountData] = useState("");
  const [accountholdername, setaccountholdername] = useState("");
  const [accountType, setaccountType] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankname, setBankName] = useState("");
  const [branchname, setBranchName] = useState("");

  const [balance, setbalance] = useState("");
  const [balancefreeze, setbalancefreeze] = useState("");
  const [withdrawamount, setwithdrawamount] = useState(0);
  const [addamount, setaddamount] = useState(0);
  const [vacreated, setvacreated] = useState(false);
  const [isLoadingbtn, setLoadingbtn] = useState(false);
  const [username, setusername] = React.useState("");
  const [accountId, setaccountId] = React.useState("");

  const accoutBalance = async function() {
    const response1 = await apiCall(
        "uservirtualaccount/virtualaccountbalance",
        "GET",
        "",
        history
    );
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    const responseJSON1 = await response1.json();
    console.log(responseJSON1);
    let Balance1 = Number(responseJSON1).toFixed(2);

    if((parseFloat(Balance1) - parseFloat(balance)) >= parseFloat(addMoneyWalletAmount)) {
      successToast("Success","Money has been added sussessfully!!")

      setaddMonetTowallet(false)
      // setUPIModal(false)
    } else {
      errorToast("Fail","Money has not been added yet, pl check after 1 min or contact admin")
    }

    setbalance(Balance1);
  }

  const virtualbankdetails = async function() {
    const response = await apiCall(
      "useronboarding/bankdetail/true",
      "GET",
      "",
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    const responseJSON = await response.json();
    setVirtualbankdetails(responseJSON);
    if (responseJSON.accountNumber == undefined) {
      setVAccountNumber("Not Yet Activated...");
      setaccountholdername("Not Yet Activated...");
      setaccountType("Not Yet Activated...");

      return undefined;
    } else {
      setVAccountData(responseJSON);
      setVAccountNumber(responseJSON.accountNumber);
      setvacreated(true);
      setVirtualAccountCreated(true);
      setaccountholdername("Unlisted Tech Private Limited");
      setaccountType("Current");
      setIfsc(responseJSON.ifscCode);
      setBankName(responseJSON.bankName);
      setBranchName(responseJSON.branchName);
      // setUserID(responseJSON.userID)

      const response1 = await apiCall(
        "uservirtualaccount/virtualaccountbalance",
        "GET",
        "",
        history
      );
      if (response1.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }
      const responseJSON1 = await response1.json();
      let Balance = Number(responseJSON1).toFixed(2);

      setbalance(Balance);

      const response22 = await apiCall(
        "uservirtualaccount/virtualaccountfreezebalance",
        "GET",
        "",
        history
      );
      if (response22.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }
      const responseJSON22 = await response22.json();
      // console.log(responseJSON22)
      const BalanceFreez = Number(responseJSON22).toFixed(2);
      setbalancefreeze(BalanceFreez);

      const response222 = await apiCall(
        "uservirtualaccount/virtualbook",
        "GET",
        "",
        history
      );

      const responseJSON222 = await response222.json()

      const response3 = await apiCall(
        "useronboarding/accountonboarding",
        "GET"
      );
      if (response3.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return;
      }
      let responseJSON3 = await response3.json();
      setusername(responseJSON3.name);
      setaccountId(responseJSON3.accountId);
      return Balance;
    }
  };

  const bankdetails = async function() {
    const response = await apiCall(
      "useronboarding/bankdetail/false",
      "GET",
      "",
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    const bankresponseJSON = await response.json();
    setbankDetails(bankresponseJSON);
    setAccountNumber(bankresponseJSON.accountNumber);
    setIfsc(bankresponseJSON.ifscCode);

    return bankresponseJSON;
  };

  const callDmat = async function() {
    let response = await apiCall("useronboarding/dmat", "GET", "", history);
    let responseJSON = await response.json();
    // // console.log("cccccccc", responseJSON)
    setdmatDetails(responseJSON);
  };

  const saveContinue = async function() {
    if (!enterUpiId) {
      errorToast("Invalid", "Enter Vaild UPI ID...");
      return;
    } else {
      // successToast("Success","NSDL Updated sussessfully!!")
      props.nextPage();
      setPaymentSuccess(false);
    }
  };

  const cancelPayment = async function() {
    setPaymentInprocess(false);
  };

  // console.log("addMonetTowallet", addMonetTowallet);
  // console.log("details", details);
  // console.log("pan", details.panNumberVerificationStatus);
  // console.log("aadhar", details.aadharNumberVerificationStatus);

  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const handleOpenConfirmation = () => setOpenConfirmation(true);
  const handleCloseConfirmation = () => setOpenConfirmation(false);

  const AddMoney = async () => {
    await bankdetails();
    setaddMonetTowallet(true);
  };

  const AddMoneyNew = () => {
    setAddMoneyNewModal(true);
    console.log("clicked");
  };

  const payusingUAWallet = async (event) => {
    event.preventDefault();

    // let requestBody = {
    //
    //     buyerMoneyReceivedForTradeStatus: "true"
    // };
    //// console.log("request body", requestBody);

    //let stringifiedRequestBody = JSON.stringify(requestBody);

    //// console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "tradeagreement/moneyreceivedsconfirmation/" + aggId,
      "PUT",
      "",
      history
    );

    let responseJSON = await response.json();
    // console.log("response ", response);

    // console.log("responseJson", responseJSON);

    if (response.status !== 200) {
      errorToast(
        "Invalid",
        "Money Not yet Added!! - confirm again after sometime or contact admin"
      );

      // setShowDialog(false); //failure
      //props.callbackfunc();
      return;
    } else if (response.status === 200) {
      if (responseJSON.buyerPaidUsingVa == true) {
        successToast("Success", "Money Paid Successfully!!");

        clearInterval(interval);

        setPaymentInprocess(true);
        setPaymentSuccess(true);

        setTimeout(() => {
          props.nextPage();
        }, 3000);

        // setShowDialog(true); // success
        // props.callbackfunc();
      } else {
        errorToast(
          "Invalid",
          "Please add money to your wallet before confirmation..."
        );
        //setShowDialog(true); // success
        //props.callbackfunc();
      }

      return;
    }
  };

  // const payusingUAWalletAddMoney = async (event) => {
  //   event.preventDefault();
  //
  //   // let requestBody = {
  //   //
  //   //     buyerMoneyReceivedForTradeStatus: "true"
  //   // };
  //   //// console.log("request body", requestBody);
  //
  //   //let stringifiedRequestBody = JSON.stringify(requestBody);
  //
  //   //// console.log("request body stringified", stringifiedRequestBody);
  //
  //   let response = await apiCall(
  //       "tradeagreement/moneyreceivedsconfirmation/" + aggId,
  //       "PUT",
  //       "",
  //       history
  //   );
  //
  //   let responseJSON = await response.json();
  //   // console.log("response ", response);
  //
  //   // console.log("responseJson", responseJSON);
  //
  //   if (response.status !== 200) {
  //     errorToast(
  //         "Invalid",
  //         "Money Not yet Added!! - confirm again after sometime or contact admin"
  //     );
  //
  //     // setShowDialog(false); //failure
  //     //props.callbackfunc();
  //     return;
  //   } else if (response.status === 200) {
  //     if (responseJSON.buyerPaidUsingVa == true) {
  //       successToast("Success", "Money Paid Successfully!!");
  //
  //       clearInterval(interval);
  //
  //       setPaymentInprocess(true);
  //       setPaymentSuccess(true);
  //
  //       setTimeout(() => {
  //         props.nextPage();
  //       }, 3000);
  //
  //       // setShowDialog(true); // success
  //       // props.callbackfunc();
  //     } else {
  //       errorToast(
  //           "Invalid",
  //           "Please add money to your wallet before confirmation..."
  //       );
  //       //setShowDialog(true); // success
  //       //props.callbackfunc();
  //     }
  //
  //     return;
  //   }
  // };

  const CreateVirtualAcc = async () => {
    const bankresponseJSON = await bankdetails();

    if (
      bankresponseJSON == undefined ||
      !(bankresponseJSON.uaVerifiedStatus == "Verified")
    ) {
      setCreateVirtualAcc(true);
    } else {
      createVirtualAccount();
    }
  };

  const createVirtualAccount = async (event) => {
    if (event != undefined) {
      event.preventDefault();
    }

    //console.log("request body", requestBody);

    //let stringifiedRequestBody = JSON.stringify(requestBody);

    //console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "uservirtualaccount/createvirtualaccountaggsignin/" + aggId,
      "POST",
      "",
      history
    );

    //console.log("response11 ", response);

    let responseJSON = await response.json();

    //console.log("responseJson11", responseJSON);

    if (response.status !== 200) {
      errorToast(
        "Invalid",
        "Virtual Account Not Created - try again or contact admin!!"
      );
      // setShowDialog(false);

      return;
    } else if (response.status == 200) {
      if (
        responseJSON != undefined &&
        responseJSON.lastCreationRequestRemarks != undefined &&
        responseJSON.lastCreationRequestRemarks == "already created"
      ) {
        successToast("Success", "Virtual Account Alreadt existed!!");
        // setShowDialog(true);
        // props.callbackfunc();
        setCreateVirtualAcc(false);
        setVirtualAccountCreated(true);
        setVAccountNumber(responseJSON.accountNumber);
        setConfirmVirtualAcc(true);
        return;
      } else if (
        responseJSON != undefined &&
        responseJSON.lastCreationRequestRemarks != undefined &&
        responseJSON.lastCreationRequestRemarks == "created"
      ) {
        successToast("Success", "Virtual Account Created Successfully!!");
        setCreateVirtualAcc(false);
        setVirtualAccountCreated(true);
        setVAccountNumber(responseJSON.accountNumber);
        setConfirmVirtualAcc(true);
        // // setShowDialog(true);
        // props.callbackfunc();
        return;
      } else {
        errorToast(
          "Invalid",
          "Something weng wrong, please try again or contact admin!!"
        );
        return;
      }

      successToast(
        "Success",
        "Please refresh the Page, Virtual Account is created!!"
      );

      return;
    }
  };

  const saveBankDetailsWalletFlow = async function() {
    // let response = await fetch('getholding').toJson()
    // setRowInformation(response)
    let requestBody = {
      accountNumber: accountnumber,
      ifscCode: ifsc,
      bankName: "",
      branchName: "",
      isVirtualAccount: false,
    };

    let response = await apiCall(
      "useronboarding/bankdetail",
      "POST",
      requestBody,
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    // console.log("api called ",response)

    // let responseJSON = await response.json()

    // console.log("responseJson", responseJSON)

    if (response.status != 200) {
      if (response.status == 400) {
        errorToast(
          "Invalid",
          "Bank Account details already exists/incorrect!!"
        );
      } else {
        errorToast(
          "Invalid",
          "Bank Account not Updated, try again or contact admin"
        );
      }

      return;
    } else if (response.status == 200) {
      const responseJSON = await response.json();

      if (responseJSON.uaVerifiedStatus == "tempservicenotavailable") {
        errorToast("Invalid", "Service Not Available!!");
      } else if (responseJSON.uaVerifiedStatus == "Verified") {
        successToast("Success", "Bank Account Updated and Verified!!");

        createVirtualAccount();
      } else if (responseJSON.uaVerifiedStatus == "Rejected") {
        errorToast(
          "Invalid",
          "Bank Account details already exists/incorrect!!"
        );
      } else {
        errorToast(
          "Invalid",
          "Bank Account details already exists/incorrect!!"
        );
      }
    }
    setaddMonetTowallet(false);
  };

  let InlineValidationName = () => {
    return (
      <div className="inline-validation-box">
        <p>{UPIError}</p>
      </div>
    );
  };

  let InlineAmountValidation = () => {
    return (
      <div className="inline-validation-box">
        <p>{maxAmountError}</p>

      </div>
    )
  }

 

  return (
    // <div className="container-fluid " id="BankVerification">
    <div className="row">
      <div className="col-md-12 col-12 px-3 tradereadystep7-main choosepayment_method_main">
        <div className="">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={!amountMore && handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={
                !amountMore ? (
                  expanded === "panel1" ? (
                    <RadioButtonCheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                  )
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{ fontSize: "2rem", color: "#CFCBCF" }}
                  />
                )
              }
            >
              <Typography>
                {/* !grandTotal > 100000 */}
                {amountMore ? (
                  <div className="">
                    <h6 className="disabled-text">Pay via UPI</h6>
                    <p className="text-small m-0 w-75 disabled-text">
                      UPI Payment is disabled for transactions greater than ₹1
                      Lakh{" "}
                    </p>
                  </div>
                ) : (
                  <h6>Pay via UPI</h6>
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="">
                  {/* {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null} */}

                  <div>
                    <div className="profile-form_container">
                      <p className="text-small dbmn">
                        Please note that transfer of shares to your demat1
                        account will be completed in T+1 days. In case of delay,
                        the full amount will be returned back to your payment
                        account. You can cancel this transaction anytime within
                        24 hours.
                      </p>
                      <p className="text-small dbmn">
                        <span className="theme-color">Note </span>- For T+1, "T"
                        is the day of Acceptance of Terms of Sale & Purchase by
                        the Seller
                      </p>
                      <p className="text-small dnmb">
                        You can cancel this transaction anytime within 24 hours.
                      </p>

                      <div className="payment-qr-scaner my-2 dbmn">
                        <div className="row">
                          <div className="col-md-5 col-6 d-flex justify-content-end align-items-center">
                            <div className="scaner-pic d-flex  align-items-center">
                              {qrCodeObject.data == undefined ? null : (
                                <img
                                  className="img-fluid"
                                  src={qrCodeObject.data.payload.qrcode}
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-md-7 col-6 d-flex justify-content-start align-items-center">
                            <p className="text-small">
                              Scan this QR code in your UPI <br />
                              app to make payment
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-4 dbmn">
                        <div className="d-flex justify-content-center my-4">
                          <h6>OR</h6>
                        </div>
                      </div>

                      <div className="profile-form_field-container">
                        <div className="profile-form_field profile-tooltip-input">
                          <div className="row">
                            <div className="col-md-12 col-12 d-flex justify-content-between">
                              <label className="my-2 text-small ">
                                Enter your UPI ID
                              </label>
                              <label className="dbmn my-2 text-small ">
                                <span className="buynow-modal-link">
                                  <a
                                    href="http://faq.unlistedassets.com/support/solutions/articles/82000888719-how-to-find-my-upi-id-"
                                    target="_blank"
                                  >
                                    <b>How to find my UPI ID?</b>
                                  </a>
                                </span>
                              </label>
                            </div>

                            <div className="col-md-12 col-12 my-1">
                              <input
                                className="w-100"
                                placeholder="Enter UPI ID"
                                value={enterUpiId}
                                onChange={(e) => setEnterUpiId(e.target.value)}
                                style={{ height: "34px" }}
                              />
                              {showUpiIdError ? <InlineValidationName /> : null}

                              <label className="dnmb my-2 text-small ">
                                <span className="buynow-modal-link">
                                  <a
                                    href="http://faq.unlistedassets.com"
                                    target="_blank"
                                  >
                                    <b>How to find my UPI ID?</b>
                                  </a>
                                </span>
                              </label>
                            </div>

                            {/* <div className="col-md-6 col-12 my-2">
                                                            <div className="text-small">
                                                                <span className="buynow-modal-link">
                                                                    <a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>Download Terms Of Agreement</b></a>
                                                                </span>
                                                            </div>
                                                        </div> */}

                            <div className="col-md-12 col-12  my-2">
                              <div className="row w-100 d-flex justify-content-end mx-0">
                                <div className="col-md-6 col-12 px-0">
                                  <Buttons.PrimaryButton
                                    value="Pay"
                                    style={{ height: "35px", width: "100%" }}
                                    onClick={payUsingUPI}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* <div className="col-md-12 col-12 d-flex justify-content-between align-items-center mt-3">
                                                            <div className="text-small "><span className="buynow-modal-link">
                                                                <a href={downloadurl("myholding/downloaddisclaimeragreement/agreementtermsconditions")}><b>Download Terms Of Agreement</b></a>
                                                            </span></div>

                                                            <Buttons.PrimaryButton value="Pay" style={{ height: "35px", width: "50%" }} onClick={payUsingUPI} />
                                                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<div className="py-4 d-flex justify-content-between">*/}
                {/*    <div className="w-100 tradeready-action-button">*/}
                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                {/*    </div>*/}
                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                {/*</div>*/}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="makepayment-horizontalrow " />
        <div className="">
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              expandIcon={
                expanded === "panel2" ? (
                  <RadioButtonCheckedIcon
                    sx={{ fontSize: "2rem", color: "#721B65" }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{ fontSize: "2rem", color: "#721B65" }}
                  />
                )
              }
            >
              <Typography>
                <h6>Pay via Virtual Account</h6>
                {/* <h6 >Pay via<img src={CompanyIcon} className="mx-1 heading-img" alt="u-icon" /> wallet</h6> */}

                {virtualAccountCreated ? (
                  insufficientBalance ? (
                    <p className="text-small theme-color m-0 red-highlighter">
                      Insufficient Balance: ₹ {balance}
                    </p>
                  ) : (
                    <p className="text-small theme-color m-0">
                      Balance: ₹ {balance}{" "}
                    </p>
                  )
                ) : (
                  <p className="text-small m-0 disabled-text">Balance: ₹ 0 </p>
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="">
                  <div>
                    {virtualAccountCreated ? (
                      <div className="profile-form_container">
                        <p className="text-small">
                          Enjoy a seamless experience with{" "}
                          <span className="green-highlighter">
                            0% processing fee
                          </span>{" "}
                          on all transactions!
                        </p>

                        <div className="profile-form_field-container">
                          <div className="profile-form_field profile-tooltip-input">
                            <div className="row my-2">
                              <div className="col-md-6 col-12">
                                <p className="m-0 text-small">
                                  Virtual Account Number
                                </p>
                                <p className="m-0 text-small">
                                  <b>{vaccountnumber}</b>
                                </p>
                              </div>

                              <div className="col-md-6 col-12">
                                <p className="m-0 text-small">User ID</p>
                                <p className="m-0 text-small">
                                  <b>{accountId}</b>
                                </p>
                              </div>
                              {/* <div className="col-md-12 col-12">
                                                                <label className="my-2 tex-small ">Enter Amount </label>
                                                                <input className="text-capitalize w-100"
                                                                    placeholder="Enter Amount"
                                                                    type="number"
                                                                    min="0" oninput="validity.valid||(value='')"
                                                                    value={addMonetTowallet}
                                                                    onChange={(e) => setaddMonetTowallet(e.target.value)}
                                                                    style={{ height: "34px" }}
                                                                />
                                                            </div> */}
                            </div>

                            <div className="row my-2">
                              <div className="col-md-6 order-md-1 order-2 col-12 mt-3">
                                {insufficientBalance ?<Buttons.SecondaryButton
                                  value="Add Money "
                                  style={{
                                    height: "35px",
                                    width: "100%",
                                    marginRight: "5px",
                                  }}
                                  onClick={AddMoneyNew}
                                /> : null}
                              </div>

                              <div className="col-md-6 order-md-2 order-1 col-12 mt-3">
                                {insufficientBalance ? (
                                  <Buttons.InactiveButton
                                    value={"Pay " + numberFormat(totalAmount)}
                                    style={{ height: "35px", width: "100%" }}
                                  />
                                ) : (
                                  <Buttons.PrimaryButton
                                    value={"Pay " + numberFormat(totalAmount)}
                                    style={{ height: "35px", width: "100%" }}
                                    onClick={payusingUAWallet}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-form_container">
                        <p className="text-small">
                          Add money to your Virtual Account using Netbanking to
                          enjoy a hassle-free and secure experience with{" "}
                          <span className="green-highlighter">
                            0% transaction fee
                          </span>{" "}
                          on all transactions!
                        </p>
                        {/* <p className="text-small">
                                                    Virtual Account creation is a one-time process. Create your account with our<img src={CompanyIcon} className="mx-1 content-img" alt="u-icon" />
                                                    wallet and enjoy a hassle free experience with <span className="green-highlighter">0% processing fee</span> on all transactions.
                                                </p> */}

                        <div className="profile-form_field-container">
                          <div className="profile-form_field profile-tooltip-input">
                            <div className="row my-2">
                              <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                <Buttons.PrimaryButton
                                  value="Create My Virtual Account"
                                  style={{ height: "35px" }}
                                  onClick={CreateVirtualAcc}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* <div className="makepayment-horizontalrow "></div> */}

        {/*<div className="">*/}
        {/*    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>*/}
        {/*        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"*/}
        {/*            expandIcon={expanded === 'panel3' ? <RadioButtonCheckedIcon sx={{ fontSize: '2rem', color: '#721B65' }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: '2rem', color: '#721B65' }} />}>*/}

        {/*            <Typography> <h6 >Pay via Payment Gateway </h6>*/}
        {/*            </Typography>*/}
        {/*        </AccordionSummary>*/}
        {/*        <AccordionDetails>*/}
        {/*            <Typography>*/}
        {/*                <div className="">*/}
        {/*                    <div >*/}
        {/*                        <div className="profile-form_container">*/}
        {/*                            <p className="text-small">*/}
        {/*                                A <span className="red-highlighter">2% processing fee</span> will be applicable on all transactions made via payment gateway*/}
        {/*                            </p>*/}

        {/*                            <div className="row my-2">*/}
        {/*                                <div className="col-md-12 col-12 d-flex justify-content-end mt-3">*/}
        {/*                                    <Buttons.PrimaryButton value="Make Payment" style={{ height: "35px", width: '50%', marginLeft: "5px" }}*/}
        {/*                                    // onClick={testfunc} */}
        {/*                                    />*/}
        {/*                                </div>*/}
        {/*                            </div>*/}

        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </Typography>*/}
        {/*        </AccordionDetails>*/}
        {/*    </Accordion>*/}
        {/*</div>*/}

        <Dialog
          open={confirmVirtualAcc}
          onClose={() => setConfirmVirtualAcc(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest">
            <div className="addcompanyrequest_container virtual_acc_modal_padding">
              <div className="virtual-account-created-padding">
                <h5 className="text-center">
                  Your Virtual Account is Created!
                </h5>

                <p className="text-small text-center mb-1">
                  Add money to this virtual account using your Netbanking App.
                  You can now enjoy a hassle free experience with{" "}
                  <span className="green-highlighter">0% processing fee</span>{" "}
                  on all transactions
                </p>
              </div>
              <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-center">
                <div className="col-md-8 col-12">
                  <Buttons.PrimaryButton
                    value="Add Money to my Virtual Account"
                    style={{ margin: "0px 5px", width: "100%" }}
                    onClick={() => (
                      setaddMonetTowallet(true), setConfirmVirtualAcc(false)
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        {/* **********************************kamal start************************************ */}

        <Dialog
          open={addMoneyNewModal}
          onClose={() => setAddMoneyNewModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest" style={{ position: "relative" }}>
            <div className="addcompanyrequest_container virtual_acc_modal_padding">
              <div className="virtual-account-created-padding">
                <h5>Add Money to Your Virtual Account</h5>

                <p className="text-small mb-2">Please choose your reference</p>
                <FormControl className='mb-4 mt-4 ml-2 gap-2'>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="bankTransfer"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                  className="gap-2"
                    value='upi'
                    onChange={moneyHandler}
                    control={
                      <Radio
                        sx={{ fontSize: "2rem", color: "#721B65"}}
                        color="secondary"
                        disabled = {true}
                      />
                    }
                    label="Add Money via UPI"
                  />
                  
                  <FormControlLabel
                    value='bankTransfer'
                    onChange={moneyHandler}
                    control={
                      <Radio
                        sx={{ fontSize: "2rem", color: "#721B65" }}
                        color="secondary"
                      />
                    }
                    label="Add Money via Bank Transfer"
                  />
                </RadioGroup>
              </FormControl>
                {/* <div className="radios">
                  <div className="d-flex mb-4 mt-4">
                    <RadioButtonCheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                    <p className="text-small mb-1 ml-1">Add Money via UPI</p>
                  </div>
                  <div className="d-flex">
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                   
                  </div>
                </div> */}
                <AiOutlineClose
                 className="closeBtnAddMoneyModal"
                  onClick={() => setAddMoneyNewModal(false)}
                />
              </div>
              

              <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-end">
                <div className="col-md-5 col-12">
                  <Buttons.PrimaryButton
                    value="Continue"
                    style={{ width: "100%" }}
                    onClick = {onContinueHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={UPIModal}
          onClose={() => setUPIModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest" style={{ position: "relative" }}>
            <div className="addcompanyrequest_container virtual_acc_modal_padding">
              <div style={{ padding: "30px 0" }}>
                <h5>Add Money to Your Virtual Account</h5>

                <p className="mb-2" style={{ fontSize: "12px" }}>
                  <AiOutlineInfoCircle style={{color: '#25A9EF'}}/> Please note that
                  you can only add up to ₹ 1,00,000 using UPI
                </p>

                <AiOutlineClose
                  className="closeBtnAddMoneyModal"
                  onClick={() => setUPIModal(false)}
                />
                <div className="payment-qr-scaner my-4 dbmn">
                  <div className="row justify-content-center">
                    <div className="col-md-5 col-6 d-flex justify-content-end align-items-center">
                      <div className="scaner-pic d-flex  align-items-center">
                        {qrCodeObjectAddMoney.data == undefined ? null : (
                          <img
                            className="img-fluid"
                            src={qrCodeObjectAddMoney.data.payload.qrcode}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-6 d-flex justify-content-start align-items-center">
                      <p className="text-small">
                        Scan this QR code in your UPI <br />
                        app to make payment
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-2 dbmn">
                  <div className="d-flex justify-content-center my-2">
                    <h6>OR</h6>
                  </div>
                </div>
                <div className="profile-form_field-container">
                  <div className="profile-form_field profile-tooltip-input">
                    <div className="row">
                      <div className="col-md-12 col-12 d-flex justify-content-between">
                        <label className="my-2 text-small ">Enter Amount <BsQuestionCircle className="ml-1" style={ maxAmountError ? { color:'#FF4D4F'} : {}}/></label>
                      </div>
                      <div className="col-md-12 col-12 my-1">
                        <input
                          type='number'
                          className="w-100"  
                          placeholder="Enter Amount upto ₹1,00,000"
                          value={enteredAmount}
                          onChange={moneyAddHandler}
                          style={ maxAmountError ? { border:'1px solid #FF4D4F', height: '34px'} : {height: '34px'}}
                        />
                        {maxAmountError ? <p className="m-0 mt-1" style={{fontSize: '12px', fontWeight: '500',color: '#FF4D4F'}}>You can only add up to ₹1,00,000 using UPI</p> : ''}
                        {/* {!invalidAmount  ? <p>You can only add up to ₹1,00,000 using UPI</p>: ''} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-form_field-container">
                  <div className="profile-form_field profile-tooltip-input">
                    <div className="row">
                      <div className="col-md-12 col-12 d-flex justify-content-between">
                        <label className="my-2 text-small ">
                          Enter your UPI ID <BsQuestionCircle className="ml-1" />
                        </label>
                        <label className="dbmn my-2 text-small ">
                          <span className="buynow-modal-link">
                            <a
                              href="http://faq.unlistedassets.com/support/solutions/articles/82000888719-how-to-find-my-upi-id-"
                              target="_blank"
                            >
                              <b>How to find my UPI ID?</b>
                            </a>
                          </span>
                        </label>
                      </div>
                      <div className="col-md-12 col-12 my-1">
                        <input
                          className="w-100"
                          placeholder="Enter UPI ID"
                          value={enterUpiId}
                          onChange={(e) => setEnterUpiId(e.target.value)}
                          style={{ height: "34px" }}
                        />
                        {showUpiIdError ? <InlineValidationName /> : null}

                        <div className="col-md-12 col-12 d-flex justify-content-end mt-2 p-0">
                          <label className="dbmn my-2 text-small ">
                            <span className="buynow-modal-link">
                            <a href={downloadurl("myholding/downloaddisclaimeragreement/buynowtermsofsalepurchase")}><b>Download Terms Of Agreement</b></a>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-end gap-2">
                <div className="col-md-4 col-12">
                  <Buttons.SecondaryButton
                    value="Back"
                    style={{ width: "100%" }}
                    onClick={() => (
                      setUPIModal(false), setAddMoneyNewModal(true)
                    )}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <Buttons.PrimaryButton
                    value="Pay"
                    style={{ width: "100%" }}
                    onClick={payUsingUPIAddMoney}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>




       
        {/* ************************kamal end********************* */}

        <Dialog
          open={createVirtualAcc}
          onClose={() => setCreateVirtualAcc(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest virtual_acc_modal">
            <div className="addcompanyrequest_container virtual_acc_modal_padding">
              <div className="">
                <h5 className="text-center">Create Virtual Account</h5>

                {/* <div className="row d-flex justify-content-center ">
                                    <div className="col-md-3">
                                        <div className="d-flex justify-content-center  m-2 my-3" >
                                            <img src={VirtualAccountModalIcon01} />
                                        </div>
                                        <p className="text-small text-center">0% Trans-action Fee</p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex justify-content-center  m-2 my-3" >
                                            <img src={VirtualAccountModalIcon02} />
                                        </div>
                                        <p className="text-small text-center">100% Secure
                                            Transactions</p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex justify-content-center  m-2 my-3" >
                                            <img src={VirtualAccountModalIcon03} />
                                        </div>
                                        <p className="text-small text-center">Seamless
                                            Trade</p>
                                    </div>
                                </div> */}
                <p className="text-small mb-1">
                  Add a bank account that you will use for netbanking to add and
                  withdraw funds from your Virtual Account.
                </p>

                <div className=" mt-3">
                  <div className="my-2">
                    <label className="text-small">
                      {" "}
                      <sapn>Bank Account Number </sapn>
                      <Tooltip
                        title="You must be the account holder of this bank account."
                        placement="top"
                        arrow
                      >
                        <TooltipIcon className="tradready-tooltipicon" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      min="1"
                      step="1"
                      oninput="validity.valid||(value='')"
                      className="form-control service_input_box text-small"
                      placeholder="account number"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={accountnumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-12 d-flex justify-content-between align-items-center">
                      <label className="text-small mb-1">
                        {" "}
                        <sapn>IFSC Code</sapn>
                        <Tooltip
                          title="Confirm IFSC Code"
                          placement="top"
                          arrow
                        >
                          <TooltipIcon className="tradready-tooltipicon" />
                        </Tooltip>
                      </label>
                      <label className="dbmn text-small mb-1 ">
                        <span className="buynow-modal-link">
                          <a
                            href="https://www.rbi.org.in/Scripts/IFSCMICRDetails.aspx"
                            target="_blank"
                          >
                            <b>Search for IFSC</b>
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="col-md-12 col-12 my-1">
                      <input
                        type="text"
                        min="1"
                        step="1"
                        oninput="validity.valid||(value='')"
                        className="form-control service_input_box text-small"
                        placeholder="IFSC code"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value)}
                      />
                      <label className="dnmb text-small my-2 ">
                        <span className="buynow-modal-link">
                          <a
                            href="https://www.rbi.org.in/Scripts/IFSCMICRDetails.aspx"
                            target="_blank"
                          >
                            <b>Search for IFSC</b>
                          </a>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row addcompanyrequest_buttonContainer text-center mt-3 d-flex justify-content-end">
                <div className="col-md-6 col-12 d-flex mt-3">
                  <Buttons.PrimaryButton
                    value="Create My Virtual Account"
                    style={{ width: "100%" }}
                    onClick={saveBankDetailsWalletFlow}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={addMonetTowallet}
          onClose={() => setaddMonetTowallet(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest virtual-acc-modal">
            <div className="addcompanyrequest_container virtual_acc_modal_padding w-100">
              <div className="">
                <h6 className="font1">Add Money To Virtual Account</h6>
                <p className="text-small">
                  <span className="theme-color">Add {numberFormat(totalAmount)}</span> (or
                  more) to Virtual Account using netbanking for your
                  account number {accountnumber}.
                </p>
                <AiOutlineClose
                  className="closeBtnAddMoneyModal"
                  onClick={() => setaddMonetTowallet(false)}
                />
                <div className="row">
                  <div className="col-md-12"> 
                    <div className="">
                      <h6 className="mb-1 heading font2">
                        Beneficiary Details:
                      </h6>
                      <p className="font3">
                        Please add Unlisted Assets as the beneficiary using the
                        following details-
                      </p>

                      {/*<div className="row d-flex justify-content-between my-1">*/}
                      {/*    <div className="col-md-6 col-12 my-1">*/}
                      {/*        <h5 className="text-small mb-1">Beneficiary Name</h5>*/}
                      {/*        <h5 className="text-small m-0"><b>{username}</b></h5>*/}
                      {/*    </div>*/}
                      {/*    <div className="col-md-6 col-12 my-1">*/}
                      {/*        <h5 className="text-small mb-1">User ID</h5>*/}
                      {/*        <h5 className="text-small m-0"><b>{accountId}</b></h5>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                      <div className="row d-flex justify-content-between my-1">
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">Account Number</h5>
                          <h5 className="text-small m-0">
                            <b>{vaccountnumber}</b>
                          </h5>
                        </div>
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">
                            Account Holder Name
                          </h5>
                          <h5 className="text-small m-0">
                            <b>Unlisted Tech Private Limited</b>
                          </h5>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-between my-1">
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">Bank Name</h5>
                          <h5 className="text-small m-0">
                            <b>{vAccountData.bankName}</b>
                          </h5>
                        </div>
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">Branch Name</h5>
                          <h5 className="text-small m-0">
                            <b>{vAccountData.branchName}</b>
                          </h5>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-between my-1">
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">Account Type</h5>
                          <h5 className="text-small m-0">
                            <b>Current</b>
                          </h5>
                        </div>
                        <div className="col-md-6 col-12 my-1">
                          <h5 className="text-small mb-1">IFSC Code</h5>
                          <h5 className="text-small m-0">
                            <b>{vAccountData.ifscCode}</b>
                          </h5>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-small m-0">
                      Please verify by clicking on the button below when you
                      have made the payment!
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-end">
                <div className="col-md-6 col-12">
                  {UPIModal?
                      <Buttons.SecondaryButton
                          value="I have added the Money - refresh"
                          style={{ margin: "0px 5px", width: "100%" }}
                          onClick={accoutBalance}
                      />
                  :
                      <Buttons.SecondaryButton
                          value="I Have Made The Payment"
                          style={{ margin: "0px 5px", width: "100%" }}
                          onClick={payusingUAWallet}
                      />
                  }

                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={walletCreated}
          onClose={() => setWalletCreated(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest px-2 py-2">
            <div className="addcompanyrequest_container px-4">
              <div className="text-center">
                <h5>
                  <img src={CompanyIcon} className="mx-2" alt="u-icon" />
                  Wallet Created!
                </h5>
                <p className="m-0 text-small">
                  Congratulations! Your virtual account on Unlisted Assets has
                  been created! You can now add money to your
                  <img
                    src={CompanyIcon}
                    className="mx-1 content-img"
                    alt="u-icon"
                  />
                  wallet in advance and enjoy a hassle free trading experience!
                </p>
              </div>
              <div className="addcompanyrequest_buttonContainer text-center mt-5 d-flex justify-content-center">
                <Buttons.PrimaryButton
                  value="Add Money to my wallet"
                  style={{ margin: "0px 5px" }}
                  onClick={AddMoney}
                />
              </div>
            </div>
          </div>
        </Dialog>

        {/* payment inprocess , success and faild modal  */}

        <Dialog
          open={paymentInprocess}
          // onClose={() => setPaymentInprocess(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="pyment_modal">
            {/*    <div>*/}
            {/*   <CloseIcon className="default_closeIcon" onClick={() => setPaymentInprocess(false)} />*/}
            {/*</div>*/}
            <div className="addcompanyrequest px-2 pb-2">
              <div>
                {paymentSuccess ? (
                  <div className="pymentSuccessful_modal_padding">
                    <div className="text-center">
                      <img
                        src={CheckMarkIcon}
                        className="mb-3"
                        alt="u-icon"
                        style={{ width: "45px" }}
                      />
                      {/* <img src={paymentSuccessIcon} className="mb-3" alt="u-icon" style={{ width: '45px' }} /> */}
                      <h5>Payment Successful!</h5>
                      <p className="m-0 text-small">
                        We have processed your payment and funds have been added
                        to your Virtual Account. You can now proceed to complete
                        your transaction.
                      </p>
                      {/*    <div className="addcompanyrequest_buttonContainer text-center mt-3 d-flex justify-content-center">*/}
                      {/*    <Buttons.PrimaryButton value="Proceed" style={{ width: "70%", margin: "0px 5px"}}*/}
                      {/*                           onClick={cancelPayment}*/}
                      {/*    />*/}
                      {/*</div>*/}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="paymentProcessing_modal_padding">
                      <div className="text-center paymentInprocess-modal-gif">
                        <CircularProgress className="mb-2" />
                        <h5>Payment Processing...</h5>
                        <p className="m-0 text-small">
                          Please wait a few moments while we process your
                          payment. Do not press refresh or back button.
                          {/* Please pay using your UPI-app <br />payment. Do not press refresh or back button. */}
                        </p>
                      </div>
                      <div className="addcompanyrequest_buttonContainer text-center mt-3 d-flex justify-content-center">
                        <Buttons.SecondaryButton
                          value="cancel Payment"
                          style={{
                            width: "50%",
                            margin: "0px 5px",
                            color: "#FF4D4F",
                            border: "1px solid #FF4D4F",
                          }}
                          onClick={cancelPayment}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={paymentFailed}
          onClose={() => setPaymentFailed(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="pyment_modal">
            <div className="addcompanyrequest px-2 pb-2">
              <div>
                <div className="paymentProcessing_modal_padding">
                  <div className="text-center paymentInprocess-modal-gif">
                    <img
                      src={ExclamationMarkIcon}
                      className="mb-3"
                      alt="u-icon"
                      style={{ width: "45px" }}
                    />
                    <h5>Payment Failed!</h5>
                    <p className="m-0 text-small">
                      We were unable to process your payment. Please try again
                      or contact your bank operator for more details.
                    </p>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 col-12">
                      <Buttons.PrimaryButton
                        value="Try Again"
                        style={{ width: "100%", margin: "0px 5px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* Steps Complete Indicator Popup */}
      {/* {
                riskProfile && details && profileaddress && bankDetails && dmatDetails ?
                    <div>
                        <Dialog
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="addcompanyrequest px-2 py-2">
                                <div className="addcompanyrequest_container px-4">
                                    <div className="text-center">
                                        <img src={StepRiskIcon} className="m-2 my-3" />
                                        <h5>
                                            {riskProfile ? <b>Your Risk Profile Is Complete!</b> : null
                                            }
                                        </h5>
                                        {riskProfile ?
                                            <p className="m-0 text-small">
                                                Your Risk Profile will help us optimise the experience for you! You’re now ready to buy or sell unlisted stocks with us.
                                            </p>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="addcompanyrequest_buttonContainer text-center mt-5 d-flex justify-content-center">
                                        <Link className="w-100 m-auto d-flex justify-content-center" to="/inventory_1">
                                            <Buttons.PrimaryButton
                                                value="Explore the marketplace"
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    : null
            } */}

      {/* {
                details && profileaddress && bankDetails && dmatDetails && !riskProfile ?
                    <div>
                        <Dialog
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="addcompanyrequest px-2 py-2">
                                <div className="addcompanyrequest_container px-4">
                                    <div className="text-center">
                                        <img src={StepCompleteIcon} className="m-2 my-3" />
                                        <h5>
                                            {riskProfile ? <b>Your Trade Ready Steps Are Complete!</b> : null
                                            }
                                        </h5>
                                        {riskProfile ?
                                            <p className="m-0 text-small">
                                                You’re now ready to buy or sell unlisted stocks with us. To optimise your experience complete your risk profile.
                                            </p>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="addcompanyrequest_buttonContainer text-center mt-5 d-flex justify-content-center">
                                        <Link to="/inventory_1">
                                            <Buttons.SecondaryButton
                                                value="Explore the marketplace"
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>
                                        <Link to="/profilewig">
                                            <Buttons.PrimaryButton
                                                value="Create my risk profile "
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    : null
            } */}
    </div>
    // </div>
  );
};
export default ChoosePaymentMethod;

{
  /* <div className="">
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                            expandIcon={expanded === 'panel2' ? <RadioButtonCheckedIcon sx={{ fontSize: '2rem', color: '#721B65' }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: '2rem', color: '#721B65' }} />}>

                            <Typography>{addMoneyToWallet ? <h6 >Pay via<img src={CompanyIcon} className="mx-1 content-img" alt="u-icon" /> wallet</h6> : <h6 >Net Banking</h6>}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {addMoneyToWallet ? <>
                                    <div className="">
                                        <div >
                                            <div className="profile-form_container">
                                                <p className="text-small">You can add funds in your<img src={CompanyIcon} className="mx-1 content-img" alt="u-icon" />       wallet in advance and enjoy a seamless and hassle-free trading experience!</p>

                                                <div className="profile-form_field-container">
                                                    <div className="profile-form_field profile-tooltip-input">
                                                        <div className="row my-2">
                                                            <div className="col-md-6 col-12">
                                                                <p className="m-0 text-small">Virtual Account Number</p>
                                                                <p className="m-0 text-small"><b>utple000010000406</b></p>
                                                            </div>
                                                            <div className="col-md-3 col-12">
                                                                <p className="m-0 text-small">Balance</p>
                                                                <p className="m-0 text-small"><b>₹ 0</b></p>
                                                            </div>
                                                            <div className="col-md-3 col-3">
                                                                <p className="m-0 text-small">User ID</p>
                                                                <p className="m-0 text-small"><b>uauat12123</b></p>
                                                            </div>                                                            
                                                            <div className="col-md-12 col-12">
                                                                <label className="my-2 tex-small ">Enter Amount </label>
                                                                <input className="text-capitalize w-100"
                                                                    placeholder="Enter Amount"
                                                                    type="number" 
                                                                    min="0" oninput="validity.valid||(value='')"
                                                                    value={addMonetTowallet}
                                                                    onChange={(e) => setaddMonetTowallet(e.target.value)}
                                                                    style={{ height: "34px" }}
                                                                />
                                                            </div>


                                                            <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                                                <Buttons.PrimaryButton value="Add ₹ 32000" style={{ height: "35px" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div></> :
                                    <div className="">
                                        <div >
                                            <div className="profile-form_container">
                                                <p className="text-small">When you fill in the details, we will create a virtual account for you, wherein you can add funds in advance and enjoy a seamless and hassle-free trading experience!</p>

                                                <div className="profile-form_field-container">
                                                    <div className="profile-form_field profile-tooltip-input">
                                                        <div className="row">
                                                            <div className="col-md-12 col-12">
                                                                <label className="my-2 tex-small ">Bank Account Number</label>
                                                                <input className="text-capitalize w-100"
                                                                    placeholder="Enter Account Number"
                                                                    value={accNumber}
                                                                    onChange={(e) => setAccNumber(e.target.value)}
                                                                    style={{ height: "34px" }}
                                                                />
                                                            </div>

                                                            <div className="col-md-12 col-12">
                                                                <div className="d-flex justify-content-between">
                                                                    <label className="my-2 tex-small ">IFSC Code</label>
                                                                    <label className="my-2 tex-small "><span className="buynow-modal-link">Search for IFSC</span></label>
                                                                </div>
                                                                <input className="text-capitalize w-100"
                                                                    // disabled={details.name}
                                                                    placeholder="Enter IFSC Code"
                                                                    value={iFSCCode}
                                                                    onChange={(e) => setIFSCCode(e.target.value)}
                                                                    style={{ height: "34px" }}
                                                                />
                                                            </div>
                                                            <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                                                <Buttons.PrimaryButton value="Create My Virtual Account" style={{ height: "35px" }} onClick={CreateVirtualAcc} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>}

                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div> */
}
