import React, { useState, useEffect } from "react";
import "./addBankAccount.css";
import "../../Inventory_old_1/Components/modal.scoped.css";
import { ReactComponent as TooltipIcon } from "../../TradeReadySteps/TooltipIcon.svg";
import { ReactComponent as AngelOneLogo } from "./Assets/AngelOneLogo.svg";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { successToast, errorToast } from "../../../Components/Toast/index";
import Loadbutton from "../../../Components/Loadbutton/LoadbuttonSmall";
import Buttons from "../../../Components/Buttons";
import { apiCall, downloadurl } from "../../../Utils/Network";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tooltip from "@mui/material/Tooltip";
import { Add } from "@material-ui/icons";
import AddDematAccount from "./AddDematAccount";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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
}));

let AddBankAccount = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const [accountnumber, setAccountNumber] = useState("");
  const [confirmaccountnumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankname, setBankName] = useState("");
  const [branchname, setBranchName] = useState("");
  const [bankDetails, setBankDetails] = useState({});
  const [
    uaVerifiedStatusDescription,
    setuaVerifiedStatusDescription,
  ] = useState("");
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  // add demat account
  // const [uaVerifiedStatus, setuaVerifiedStatus] = useState(false)
  const [
    uaBankDetailsVerifiedStatus,
    setuaBankDetailsVerifiedStatus,
  ] = useState(false);
  const [
    uaDematDetailsVerifiedStatus,
    setuaDematDetailsVerifiedStatus,
  ] = useState(false);

  const [addNewDematAccount, setAddNewDematAccount] = useState(true);
  const [depositoryName, setDepositoryname] = useState("NSDL");
  const [brokerName, setBrokerName] = useState("");
  const [dematid, setDematid] = useState("");
  const [confirmdematid, setConfirmDematid] = useState("");
  const [dpid, setDpId] = useState("IN");
  const [boid, setBoId] = useState("");
  const [clientid, setClientid] = useState("");
  const [dmatcall, setDmatcall] = useState("");

  const [depository, setDepository] = useState(false);
  const [showDPID, setshowDPID] = useState(false);
  const [showBOID, setshowBOID] = useState(true);
  const [expanded, setExpanded] = React.useState("panel1");

  // Demat Account Validation
  const [dpError, setDPError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [boidError, setBOidError] = useState(false);

  useEffect(async () => {
    bankdetails();
    // callDmat()
  }, []);

  useEffect(() => {
    callDmat();
  }, []);

  const callDmat = async function() {
    let response = await apiCall("useronboarding/dmat", "GET", "", history);
    let responseJSON = await response.json();
    // console.log("demat detail", responseJSON.depositoryName)

    // console.log("iiiiiiiiiii", responseJSON)

    if (responseJSON.uaVerifiedStatus == "Verified") {
      setDmatcall(responseJSON);
      setDematid(responseJSON.dmatId);
      setDpId(responseJSON.dpId);
      setBoId(responseJSON.boId);
      setBrokerName(responseJSON.brokerName);
      setDepositoryname(responseJSON.depositoryName);
      setClientid(responseJSON.clientId);

      setuaDematDetailsVerifiedStatus(true);
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
    setBankDetails(bankresponseJSON);
    setAccountNumber(bankresponseJSON.accountNumber);
    setConfirmAccountNumber(bankresponseJSON.accountNumber);
    setIfsc(bankresponseJSON.ifscCode);
    setBankName(bankresponseJSON.bankName);
    setBranchName(bankresponseJSON.branchName);
    setuaVerifiedStatusDescription(bankresponseJSON.uaVerifiedStatus);

    // console.log("bbbbbbbbaaaa",bankresponseJSON.uaVerifiedStatus)

    if (
      bankresponseJSON.uaVerifiedStatus == "Verified" ||
      bankresponseJSON.uaVerifiedStatus == "verified"
    ) {
      setuaBankDetailsVerifiedStatus(true);
      setExpanded("panel2");
    }
  };

  const saveContinue = async function() {
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
        // bankdetails()
        // props.nextPage()
      } else if (responseJSON.uaVerifiedStatus !== "Verified") {
        successToast("Success", "Bank Account Updated and Verified!!");
        setuaBankDetailsVerifiedStatus(true);

        setExpanded("panel2");
        // setExpanded(true)

        // bankdetails()
        // props.nextPage()
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
  };

  const handleChange = (e) => {
    setDepository({ value: e.target.value });

    setDepositoryname(e.target.value);

    if (depository.value == "CDSL") {
      setshowBOID(true);
      setshowDPID(false);
    } else {
      setshowBOID(false);
      setshowDPID(true);
    }
  };

  const handleChange1 = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)

    switch (field) {
      case "accountNumber":
        // console.log("hooooooooooooooooo1"+errorMessage)
        errorToast("Invalid", errorMessage);

        break;

      default:
      // console.log("hooooooooooooooooonijhibibibibib")
    }
  };

  const saveContinueDmt = async function(e) {
    e.preventDefault();
    // setAddNewDematAccount(false)

    // console.log("hihihihihhih")
    let requestBody = {
      dmatId: dematid,
      clientId: clientid,
      dpId: dpid,
      boId: boid,
      depositoryName: depositoryName,
      brokerName: brokerName,
    };

    let response = await apiCall(
      "useronboarding/dmat",
      "POST",
      requestBody,
      history
    );

    // console.log("api called ",response)

    let responseJSON = await response.json();

    // console.log("responseJson", responseJSON)

    if (response.status == 400) {
      let i = 0;
      const arrayerrormessages = responseJSON.details1;
      // console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>
        validate(errorResponse.field, errorResponse.errorMessage)
      );
    } else if (response.status != 200) {
      errorToast("Invalid", "Demat Account Not Updated...");
      return;
    } else if (response.status === 200) {
      successToast("Success", "Demat Account Updated");
      // setDisabledDematField(true)

      props.nextPage();
    }
  };

  // *****************************Demat Account validation Code***********************

  const dpIdHandler = (e) => {
    if (dpid === "ININ") {
      setDpId("IN");
    } else {
      if (e.target.value.length > 8) {
        setDPError(true);
        return;
      } else {
        setDpId(e.target.value);
        setDPError(false);
      }
    }
  };

  const clientIdHandler = (e) => {
    if (e.target.value.length > 8) {
      setClientIdError(true);
      return;
    } else {
      setClientid(e.target.value);
      setClientIdError(false);
    }
  };

  const boIdHandler = (e) => {
    if (e.target.value.length > 16) {
      setBOidError(true);
      return;
    } else {
      setBoId(e.target.value);
      setBOidError(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-12 px-3 bankdetail-main">
          {uaBankDetailsVerifiedStatus ? null : (
            <div className="">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={
                  !uaBankDetailsVerifiedStatus && handleChange1("panel1")
                }
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={
                    !uaBankDetailsVerifiedStatus ? (
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
                    <div className="">
                      <h6
                        className="font2 m-0"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Bank Details
                      </h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row">
                      <div className="col-md-12 col-12 px-3">
                        <p className="text-small m-0">
                          These details are required by the seller to transfer
                          shares. You must be the account holder of this bank
                          account.
                        </p>

                        <div className="">
                          <form className="w-100 BankAccountTab-form">
                            <div className="d-flex align-items-center">
                              <label className="Trade_ready_step_2_Label my-2 text-small">
                                Bank Account Number
                              </label>
                              <Tooltip
                                title="Bank Account Number"
                                placement="top"
                                arrow
                              >
                                <TooltipIcon className="tradready-tooltipicon" />
                              </Tooltip>
                            </div>
                            <input
                              type="number"
                              disabled={uaBankDetailsVerifiedStatus}
                              className={
                                uaBankDetailsVerifiedStatus
                                  ? "disabled-field"
                                  : ""
                              }
                              //  disabled={uaVerifiedStatus?true:false}
                              name="accountnumber"
                              onChange={(e) => setAccountNumber(e.target.value)}
                              value={accountnumber}
                            />

                            <label className="m-0 my-2 text-small">
                              IFSC Code
                            </label>
                            <input
                              type="text"
                              disabled={uaBankDetailsVerifiedStatus}
                              className={
                                uaBankDetailsVerifiedStatus
                                  ? "disabled-field"
                                  : ""
                              }
                              // disabled={uaVerifiedStatus?true:false}
                              name="ifsc"
                              onChange={(e) => setIfsc(e.target.value)}
                              value={ifsc}
                            />
                          </form>
                          <div>
                            {/*<div className="addinventory-form_field addinventory-form_upload-photo">*/}
                            {/*    <img src={UploadIcon} width="70" className="mr-4"/>*/}
                            {/*    <p style={{color: "#2E384D"}}>*/}
                            {/*        Drop files to upload <br /> or <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>*/}
                            {/*    </p>*/}
                            {/*    <input type="file" id="myfile" name="myfile" />*/}
                            {/*</div>*/}
                            <FormControl variant="outlined">
                              {/*
                            <InputLabel required></InputLabel>*/}{" "}
                              {/*
                            <FormHelperText classes={{root:classes.droplabel}}>Country*</FormHelperText>*/}{" "}
                              {/*
                            <Select className="Trade_ready_step_2_Select_container" labelId='select-demo' id='florida-select' displayEmpty name="branchname" value={branchname} onChange={(e)=>setBranchName(e.target.value)} >
                                <MenuItem value=''>Empty</MenuItem>
                                <MenuItem value={ 'first'}>first</MenuItem>
                                <MenuItem value={ 'second'}>second</MenuItem>
                                <MenuItem value={ 'third'}>Third</MenuItem>
                                <MenuItem value={ 'fourth'}>fourth</MenuItem>
                            </Select>*/}
                            </FormControl>
                          </div>

                          {/* <div className="dbmn Trade_ready_step_2_save_button d-flex justify-content-end m-0">
                            {uaVerifiedStatus ? null :
                                <Buttons.PrimaryButton value="Save" style={{margin:"10px"}} disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)} onClick={saveContinue} />
                            }
                        </div> */}
                        </div>
                      </div>

                      <div className="px-4 w-100">
                        {/* <div className="tradeready-save-mobilebutton px-3"> */}
                        {!isLoadingbtn && (
                          <>
                            {/*disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)*/}
                            {uaBankDetailsVerifiedStatus ? null : (
                              <div className="tradeready-action-button d-flex justify-content-end">
                                <Buttons.PrimaryButton
                                  value="Save"
                                  onClick={saveContinue}
                                />
                              </div>
                            )}
                          </>
                        )}
                        {isLoadingbtn && <Loadbutton />}
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          <div className="makepayment-horizontalrow" />

          <div className="">
            <Accordion
              expanded={expanded === "panel2"}
              onChange={
                !uaDematDetailsVerifiedStatus && handleChange1("panel2")
              }
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
                  <h6
                    className="font2 m-0"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Demat Account Details
                  </h6>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <>
                    <div className="row">
                      <div className="col-md-12 col-12 px-3 mb-4">
                        <p className="text-small m-0">
                          All the shares you purchase on this platform will be
                          transferred to the demat account you provide.
                        </p>
                        {/* <h6 style={{ fontFamily: "Montserrat" }}>Add Demat Account</h6> */}
                        <div className="">
                          <form className="w-100 DepositoryTab-form">
                            <label className="m-0 my-2 text-small">
                              Broker Name
                            </label>
                            <input
                              type="text"
                              className={
                                uaDematDetailsVerifiedStatus
                                  ? "p-2 text-small w-100 disabled-field"
                                  : "p-2 text-small w-100"
                              }
                              name="brokername"
                              onChange={(e) => setBrokerName(e.target.value)}
                              value={brokerName}
                              disabled={uaDematDetailsVerifiedStatus}
                            />
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <label className="Trade_ready_step_3_Label my-2 text-small">
                                  Depository Name
                                </label>
                                {/* <Tooltip title="Confirm Bank Account Number" placement="top" arrow><TooltipIcon className="tradready-tooltipicon" /></Tooltip> */}
                              </div>
                              <div className="d-flex align-items-center">
                                <label className="my-2 tex-small dbmn">
                                  <span className="buynow-modal-link">
                                    <a
                                      href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                      target="_blank"
                                    >
                                      How to find my DP ID and Client ID?
                                    </a>
                                  </span>
                                </label>
                              </div>
                            </div>

                            <select
                              class={
                                uaDematDetailsVerifiedStatus
                                  ? "disabled-field form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox"
                                  : "form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox"
                              }
                              aria-label="Default select example"
                              value={depositoryName}
                              onChange={handleChange}
                              disabled={uaDematDetailsVerifiedStatus}
                            >
                              <option value="NSDL">NSDL</option>
                              <option value="CDSL">CDSL</option>
                            </select>
                            <div className="d-flex align-items-center ">
                              <label className="my-2 tex-small dnmb">
                                <span className="buynow-modal-link">
                                  <a
                                    href="hhttps://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                    target="_blank"
                                  >
                                    How to find my DP ID and Client ID?
                                  </a>
                                </span>
                              </label>
                            </div>

                            {// !showDPID ?
                            depositoryName == "NSDL" ? (
                              <>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <label className="m-0 my-2 text-small">
                                      DP ID*
                                    </label>
                                    {/* <Tooltip title="Confirm Bank Account Number" placement="top" arrow><TooltipIcon className="tradready-tooltipicon" /></Tooltip> */}
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="my-2 tex-small dbmn">
                                      <span className="buynow-modal-link">
                                        <a
                                          href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                          target="_blank"
                                        >
                                          How to find my DP ID?
                                        </a>
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <input
                                  disabled={uaDematDetailsVerifiedStatus}
                                  type="text"
                                  className={
                                    uaDematDetailsVerifiedStatus
                                      ? "p-2 text-small disabled-field"
                                      : "p-2 text-small "
                                  }
                                  name="dpid"
                                  onChange={dpIdHandler}
                                  value={dpid}
                                  style={
                                    dpError
                                      ? { border: "1px solid #FF4D4F" }
                                      : {}
                                  }
                                  // onChange={(e) => { setDpId(e.target.value) }}
                                />
                                {dpError ? (
                                  <p
                                    className="m-0 mt-1"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#FF4D4F",
                                    }}
                                  >
                                    DP ID must starts with "IN" and 8 digits
                                    long
                                  </p>
                                ) : (
                                  ""
                                )}
                                <label className="my-2 tex-small dnmb">
                                  <span className="buynow-modal-link">
                                    <a
                                      href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                      target="_blank"
                                    >
                                      How to find my DP ID and Client ID?
                                    </a>
                                  </span>
                                </label>

                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <label className="m-0 my-2 text-small">
                                      Client ID*
                                    </label>
                                    {/* <Tooltip title="Confirm Bank Account Number" placement="top" arrow><TooltipIcon className="tradready-tooltipicon" /></Tooltip> */}
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="my-2 tex-small dbmn">
                                      <span className="buynow-modal-link">
                                        <a
                                          href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                          target="_blank"
                                        >
                                          How to find my Client ID?
                                        </a>
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <input
                                  disabled={uaDematDetailsVerifiedStatus}
                                  type="number"
                                  className={
                                    uaDematDetailsVerifiedStatus
                                      ? "p-2 text-small disabled-field"
                                      : "p-2 text-small"
                                  }
                                  name="dpid"
                                  value={clientid}
                                  onChange={clientIdHandler}
                                  style={
                                    clientIdError
                                      ? { border: "1px solid #FF4D4F" }
                                      : {}
                                  }
                                  // onChange={(e) => setClientid(e.target.value)}
                                />
                                {clientIdError ? (
                                  <p
                                    className="m-0 mt-1"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#FF4D4F",
                                    }}
                                  >
                                    Client ID must be 8 digits long
                                  </p>
                                ) : (
                                  ""
                                )}
                                <label className="my-2 tex-small dnmb">
                                  <span className="buynow-modal-link">
                                    <a
                                      href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                      target="_blank"
                                    >
                                      How to find my Client ID?
                                    </a>
                                  </span>
                                </label>
                              </>
                            ) : null}
                            {// !showBOID ?
                            depositoryName == "CDSL" ? (
                              <>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <label>BO ID*</label>
                                    {/* <Tooltip title="Confirm Bank Account Number" placement="top" arrow><TooltipIcon className="tradready-tooltipicon" /></Tooltip> */}
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <label className="my-2 tex-small dbmn">
                                      <span className="buynow-modal-link">
                                        <a
                                          href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                          target="_blank"
                                        >
                                          How to find my BO ID?
                                        </a>
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <input
                                  disabled={uaDematDetailsVerifiedStatus}
                                  type="number"
                                  className={
                                    uaDematDetailsVerifiedStatus
                                      ? "p-2 text-small disabled-field "
                                      : "p-2 text-small "
                                  }
                                  name="boid"
                                  value={boid}
                                  onChange={boIdHandler}
                                  style={
                                    boidError
                                      ? { border: "1px solid #FF4D4F" }
                                      : {}
                                  }
                                  // onChange={(e) => setBoId(e.target.value)}
                                />
                                {boidError ? (
                                  <p
                                    className="m-0 mt-1"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#FF4D4F",
                                    }}
                                  >
                                    Demat ID must be 16 digits long
                                  </p>
                                ) : (
                                  ""
                                )}
                                <label className="my-2 tex-small dnmb">
                                  <span className="buynow-modal-link">
                                    <a
                                      href="https://newaccount1627031572442.freshdesk.com/support/solutions/articles/82000886977-how-to-find-your-bo-or-demat-id-dp-id-client-id-"
                                      target="_blank"
                                    >
                                      How to find my BO ID?
                                    </a>
                                  </span>
                                </label>
                              </>
                            ) : null}
                          </form>
                        </div>
                      </div>
                      <div className="angel-one-section d-flex flex-column align-items-center px-3 pb-3">
                        <div className="d-flex">
                          <div className="mx-2">
                            <AngelOneLogo />
                          </div>
                          <div>
                            <p className="m-0 text-small">
                              Don’t have a Demat Account? Open one in 5 minutes
                              using this link:
                              <br />
                              <span className="buynow-modal-link">
                                <a
                                  href="https://angel-one.onelink.me/Wjgr/wbzxvmmq"
                                  target="_blank"
                                >
                                  https://angel-one.onelink.me/Wjgr/mil7ujv5
                                </a>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-100 px-3">
                        {!isLoadingbtn && (
                          <>
                            {/*disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)*/}
                            {uaDematDetailsVerifiedStatus ? (
                              <div className="row d-flex justify-content-end px-2 tradeready-action-button add_demat_acc_btns">
                                <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                  {/*<Buttons.SecondaryButton value="Cancel" style={{ width: "50%", height: "35px", marginRight: "5px" }} id="dbmn" />*/}
                                  <Buttons.PrimaryButton
                                    value="Edit Demat Account"
                                    style={{
                                      width: "50%",
                                      height: "35px",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() =>
                                      setuaDematDetailsVerifiedStatus(false)
                                    }
                                  />
                                  <Buttons.PrimaryButton
                                    value="continue"
                                    style={{
                                      width: "50%",
                                      height: "35px",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => props.nextPage()}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="row d-flex justify-content-end px-2 tradeready-action-button add_demat_acc_btns">
                                <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                  {/*<Buttons.SecondaryButton value="Cancel" style={{ width: "50%", height: "35px", marginRight: "5px" }} id="dbmn" />*/}

                                  {(dpid != undefined &&
                                    clientid != undefined &&
                                    dpid.includes("IN") &&
                                    dpid &&
                                    clientid.length == 8) ||
                                  (boid != undefined && boid.length === 16) ? (
                                    <Buttons.PrimaryButton
                                      value="Save Demat Account"
                                      style={{
                                        width: "50%",
                                        height: "35px",
                                        marginLeft: "5px",
                                      }}
                                      onClick={saveContinueDmt}
                                    />
                                  ) : (
                                    <Buttons.InactiveButton
                                      value="Save Demat Account"
                                      style={{
                                        width: "50%",
                                        height: "35px",
                                        marginLeft: "5px",
                                        cursor: "notAllowed",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        {isLoadingbtn && <Loadbutton />}
                      </div>
                    </div>

                    {/* <div>
                                        <div className="">
                                            <form className="w-100 DepositoryTab-form">
                                                <label className="m-0 my-2 text-small">Broker Name</label>
                                                <input type="text" className="p-2 text-small w-100"
                                                    name="brokername" onChange={(e) => setBrokerName(e.target.value)} value={brokerName}
                                                />

                                                <div className="d-flex align-items-center">
                                                    <label className="Trade_ready_step_3_Label my-2 text-small">Depository  Name</label>
                                                    <Tooltip title="Confirm Bank Account Number" placement="top" arrow><TooltipIcon className="tradready-tooltipicon" /></Tooltip>
                                                </div>
                                                <select class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox" aria-label="Default select example" onChange={handleChange}
                                                >
                                                    <option selected value="NSDL">NSDL</option>
                                                    <option value="CDSL">CDSL</option>
                                                </select>

                                                {
                                                    !showDPID ?
                                                        <>
                                                            <label className="m-0 my-2 text-small">DP ID*</label>
                                                            <input disabled={showDPID} type="text" className={showDPID ? "p-2 text-small disabled-field" : "p-2 text-small "}
                                                                name="dpid" maxlength="8" onChange={(e) => { setDpId(e.target.value) }} value={!showDPID ? dpid : ''}
                                                            />
                                                            <label className="m-0 my-2 text-small">Client ID*</label>
                                                            <input disabled={showDPID} type="text" className={showDPID ? "p-2 text-small disabled-field" : "p-2 text-small"}
                                                                name="dpid" maxlength="8" onChange={(e) => setClientid(e.target.value)} value={!showDPID ? clientid : ''}
                                                            />
                                                        </>
                                                        : null
                                                }
                                                {
                                                    !showBOID ?
                                                        <>
                                                            <label className="m-0 my-2 text-small">BO ID*</label>
                                                            <input disabled={showBOID} type="text" className={showBOID ? "p-2 text-small disabled-field " : "p-2 text-small "}
                                                                name="boid" maxlength="16" onChange={(e) => setBoId(e.target.value)} value={!showBOID ? boid : ''}
                                                            />
                                                        </> : null
                                                }

                                            </form>
                                        </div>
                                        <div className="">
                                            <div>
                                                <div className="profile-form_container add_demat_acc_btns">
                                                    <div className="profile-form_field-container">
                                                        <div className="profile-form_field profile-tooltip-input">
                                                            <div className="row">
                                                                <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                                                    <Buttons.SecondaryButton value="Back" style={{ width: "50%", height: "35px", marginRight: "5px" }} id="dbmn" />
                                                                    <Buttons.PrimaryButton value="Finish Transaction" style={{ width: "50%", height: "35px", marginLeft: "5px" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                  </>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        {/* <Dialog
                        open={walletCreated}
                        onClose={() => setWalletCreated(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="addcompanyrequest px-2 py-2">
                            <div className="addcompanyrequest_container px-4">
                                <div className="text-center">
                                    <img src={CompanyIconWithCircle} className="mx-2" alt="u-icon" />
                                    <h5>Transaction Successful!
                                    </h5>
                                    <p className="my-2 text-small">Your transaction is successfully completed. Shares will be reflected in your demat account within 2 business days.</p>
                                    <p className="my-2 text-small">You will receive an email at your registered email id with the invoice attached.
                                    </p>
                                </div>
                                <div className="addcompanyrequest_buttonContainer text-center d-flex justify-content-center">

                                    <Buttons.PrimaryButton
                                        value="Track My Transaction"
                                        style={{ margin: "0px 5px" }}
                                    // onClick={AddMoney}
                                    />

                                </div>
                            </div>
                        </div>
                    </Dialog> */}
      </div>

      {/* <div className="tradeready-horizontalrow"></div> */}
    </>
  );
};
export default AddBankAccount;
