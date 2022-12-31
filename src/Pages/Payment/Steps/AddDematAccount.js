import React, { useState, useEffect } from "react";
import "./AddDematAccount.css";
// import Demat from "./Demat.png"
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { apiCall } from "../../../Utils/Network";
import Buttons from "../../../Components/Buttons";
import Loadbutton from "../../../Components/Loadbutton/LoadbuttonSmall";

import {
  successToast,
  errorToast,
} from "../../../../src/Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { ReactComponent as TooltipIcon } from "../../TradeReadySteps/TooltipIcon.svg";
import Button from "@material-ui/core/Button";

// below code
import Dialog from "@mui/material/Dialog";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import HDFC_Bank_Logo from "./Assets/HDFC_Bank_Logo.png";
import FormControl from "@mui/material/FormControl";

import CompanyIconWithCircle from "./Assets/CompanyIconWithCircle.svg";

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

// uper code

// const useStyles = makeStyles((theme) => ({
//     FormControl: {
//         marginLeft: "7px",
//         justifyContent: "space-between",
//         paddingLeft: "10px"
//     },
//     label: {
//         fontWeight: "500",
//         fontSize: 14,
//         color: "#2E384D",
//         marginLeft: "7px",
//     },
//     droplabel: {
//         fontWeight: "500",
//         fontSize: 14,
//         color: "#2E384D",
//         marginLeft: "-2px",
//     }
// }))

const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft: "50px",
    paddingRight: "50px",
    textTransform: "capitalize !important",
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

let AddDematAccount = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [depositoryName, setDepositoryname] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [dematid, setDematid] = useState("");
  const [confirmdematid, setConfirmDematid] = useState("");
  const [dpid, setDpId] = useState("");
  const [boid, setBoId] = useState("");
  const [clientid, setClientid] = useState("");
  const [dmatcall, setDmatcall] = useState("");
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  const [depository, setDepository] = useState(false);
  const [showDPID, setshowDPID] = useState(false);
  const [showBOID, setshowBOID] = useState(true);

  // below code

  const [walletCreated, setWalletCreated] = React.useState(false);
  const [addNewDematAccount, setAddNewDematAccount] = useState(true);
  const [expanded, setExpanded] = React.useState("panel1");
  const [details, setDetails] = useState({});

  // Demat Account Validation
  const [dpError, setDPError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [boidError, setBOidError] = useState(false);

  const handleChange1 = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // uper code

  // console.log(depository.value)

  useEffect(() => {
    callDmat();
  }, []);
  const callDmat = async function() {
    let response = await apiCall("useronboarding/dmat", "GET", "", history);
    let responseJSON = await response.json();
    setDmatcall(responseJSON);
    setDematid(responseJSON.dmatId);
    setDpId(responseJSON.dpId);
    setBoId(responseJSON.boId);
    setBrokerName(responseJSON.brokerName);
    setDepositoryname(responseJSON.depositoryName);
    setClientid(responseJSON.clientId);
    // console.log("iiiiiiiiiii", responseJSON)

    if (responseJSON.uaVerifiedStatus == "Verified") {
      // props.nextPage() // move to the next page
    }
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

  const saveContinue = async function(e) {
    e.preventDefault();
    setAddNewDematAccount(false);

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

      // props.nextPage()
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

  const [UpiId, setUpiId] = React.useState("");

  // const handleUPIID = (event: SelectChangeEvent) => {
  //   setUpiId(event.target.value);
  // };

  const handleUPIID = (event) => {
    setUpiId(event.target.value);
  };

  const [addDematAccount, setAddDematAccount] = React.useState(false);

  const AddAccount = () => {
    setAddDematAccount(true);
  };

  const DematAccountAdded = () => {
    setAddNewDematAccount(false);
    setWalletCreated(true);
  };

  // *****************************Demat Account validation Code***********************

  const dpIdHandler = (e) => {
    if (e.target.value.length > 8) {
      setDPError(true);
      return;
    }
    else {
      setDpId(e.target.value);
      setDPError(false);
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
      {addNewDematAccount ? (
        <div className="row ">
          <div className="col-md-12 col-12 px-4 mb-4">
            <div className="">
              <form className="w-100 DepositoryTab-form">
                <label className="m-0 my-2 text-small">Broker Name</label>
                <input
                  type="text"
                  className="p-2 text-small w-100"
                  name="brokername"
                  onChange={(e) => setBrokerName(e.target.value)}
                  value={brokerName}
                />
                <div className="d-flex align-items-center">
                  <label className="Trade_ready_step_3_Label my-2 text-small">
                    Depository Name
                  </label>
                  <Tooltip
                    title="Confirm Bank Account Number"
                    placement="top"
                    arrow
                  >
                    <TooltipIcon className="tradready-tooltipicon" />
                  </Tooltip>
                </div>
                <select
                  class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox"
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option selected value="NSDL">
                    NSDL
                  </option>  
                  <option value="CDSL">CDSL</option>
                </select>

                {!showDPID ? (
                  <>
                    <label className="m-0 my-2 text-small">DP ID*</label>
                    <input
                      disabled={showDPID}
                      type="text"
                      className={
                        showDPID
                          ? "p-2 text-small disabled-field"
                          : "p-2 text-small "
                      }
                      // name="dpid" maxlength="8" onChange={(e) => { setDpId(e.target.value) }} value={!showDPID ? dpid : ''}
                      name="dpid"
                      maxlength="8"
                      onChange={dpIdHandler}
                      value={!showDPID ? dpid : ""}
                      style={dpError ? { border: "1px solid #FF4D4F" } : {}}
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
                        DP ID must starts with "IN" and 8 digits long
                      </p>
                    ) : (
                      ""
                    )}
                    <label className="m-0 my-2 text-small">Client ID*</label>
                    <input
                      disabled={showDPID}
                      type="number"
                      className={
                        showDPID
                          ? "p-2 text-small disabled-field"
                          : "p-2 text-small"
                      }
                      // name="dpid" maxlength="8" onChange={(e) => setClientid(e.target.value)} value={!showDPID ? clientid : ''}
                      name="dpid"
                      maxlength="8"
                      value={!showDPID ? clientid : ""}
                      onChange={clientIdHandler}
                      style={
                        clientIdError ? { border: "1px solid #FF4D4F" } : {}
                      }
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
                  </>
                ) : null}
                {!showBOID ? (
                  <>
                    <label className="m-0 my-2 text-small">BO ID*</label>
                    <input
                      disabled={showBOID}
                      type="number"
                      className={
                        showBOID
                          ? "p-2 text-small disabled-field "
                          : "p-2 text-small "
                      }
                      // name="boid" maxlength="16" onChange={(e) => setBoId(e.target.value)} value={!showBOID ? boid : ''}
                      name="boid"
                      maxlength="16"                 
                      value={!showBOID ? boid : ""}
                      onChange={boIdHandler}
                      style={boidError ? { border: "1px solid #FF4D4F" } : {}}
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
                  </>
                ) : null}
              </form>
            </div>
          </div>
          <div className="w-100 px-3">
            {!isLoadingbtn && (
              <div className="d-flex px-2 tradeready-action-button add_demat_acc_btns">
                {/* <Buttons.SecondaryButton value="Back" style={{ with: "50%", marginRight: "5px" }} disabled={!(brokerName && boid || brokerName && dpid && clientid)} />
                        <Buttons.PrimaryButton value="Save & continue" style={{ with: "50%", marginLeft: "5px" }} onClick={DematAccountAdded} /> */}

                {/*<Buttons.SecondaryButton value="Back" style={{ width: "50%", height: "35px", marginRight: "10px" }} id="dbmn"/>*/}
                <Buttons.PrimaryButton
                  value="Save & continue"
                  style={{ height: "35px" }}
                  onClick={saveContinue}
                />
              </div>
            )}
            {isLoadingbtn && <Loadbutton />}
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12 col-12 px-3 tradereadystep7-main">
            <div className="">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange1("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={
                    expanded === "panel1" ? (
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
                    <div className="cursor-pointer row mx-0 pl-0 d-flex align-items-center">
                      <div className="col-md-3 col-3 px-1">
                        <div className="Negotiation-logo-image ">
                          <img src={HDFC_Bank_Logo} width={50} height={50} />
                        </div>
                      </div>
                      <div className="col-md-9 col-9 px-1">
                        <div className="Negotiation-list-desc">
                          <div className="Negotiation-list-info p-2">
                            <h6 className="m-0 text-default-secoundary">
                              <b>9876543212468</b>
                            </h6>
                            <p className="d-flex m-0">HDFC00002911</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </div>
            <div className="makepayment-horizontalrow" />

            <div className="">
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange1("panel2")}
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
                    {addDematAccount ? (
                      <h6>Add New Demat Account</h6>
                    ) : (
                      <>
                        <h6> Use Another Demat Account</h6>
                      </>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <>
                      <div className="">
                        <form className="w-100 DepositoryTab-form">
                          <label className="m-0 my-2 text-small">
                            Broker Name
                          </label>
                          <input
                            type="text"
                            className="p-2 text-small w-100"
                            name="brokername"
                            onChange={(e) => setBrokerName(e.target.value)}
                            value={brokerName}
                          />

                          {/* <div className="">
                                                <label className="Trade_ready_step_3_Label my-2 text-small">Depository  Name</label>
                                                <FormControl style={{ width: '100%' }} size="small">
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={UpiId}
                                                        label="UpiId"
                                                        onChange={handleChange}
                                                        className='customNoLabelSelectInput'
                                                    >
                                                        <MenuItem value="">
                                                            <em>Depository </em>
                                                        </MenuItem>
                                                        <MenuItem value="NSDL">NSDL</MenuItem>
                                                        <MenuItem value="CDSL">CDSL</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div> */}

                          <div className="d-flex align-items-center">
                            <label className="Trade_ready_step_3_Label my-2 text-small">
                              Depository Name
                            </label>
                            <Tooltip
                              title="Confirm Bank Account Number"
                              placement="top"
                              arrow
                            >
                              <TooltipIcon className="tradready-tooltipicon" />
                            </Tooltip>
                          </div>
                          <select
                            class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox"
                            aria-label="Default select example"
                            onChange={handleChange}
                          >
                            <option selected value="NSDL">
                              NSDL
                            </option>
                            <option value="CDSL">CDSL</option>
                          </select>

                          {!showDPID ? (
                            <>
                              <label className="m-0 my-2 text-small">
                                DP ID*
                              </label>
                              <input
                                disabled={showDPID}
                                type="text"
                                className={
                                  showDPID
                                    ? "p-2 text-small disabled-field"
                                    : "p-2 text-small "
                                }
                                name="dpid"
                                maxlength="8"
                                // onChange={(e) => {
                                //   setDpId(e.target.value);
                                // }}
                                onChange={dpIdHandler}
                                value={!showDPID ? dpid : ""}
                                style={dpError ? { border: "1px solid #FF4D4F" } : {}}
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
                            DP ID must starts with "IN" and 8 digits long
                          </p>
                        ) : (
                          ""
                        )}
                              <label className="m-0 my-2 text-small">
                                Client ID*
                              </label>
                              <input
                                disabled={showDPID}
                                type="number"
                                className={
                                  showDPID
                                    ? "p-2 text-small disabled-field"
                                    : "p-2 text-small"
                                }
                                name="dpid"
                                maxlength="8"
                                // onChange={(e) => setClientid(e.target.value)}
                                value={!showDPID ? clientid : ""}
                                onChange={clientIdHandler}
                                style={
                                  clientIdError ? { border: "1px solid #FF4D4F" } : {}
                                }
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
                            </>
                          ) : null}
                          {!showBOID ? (
                            <>
                              <label className="m-0 my-2 text-small">
                                BO ID*
                              </label>
                              <input
                                disabled={showBOID}
                                type="text"
                                className={
                                  showBOID
                                    ? "p-2 text-small disabled-field "
                                    : "p-2 text-small "
                                }
                                name="boid"
                                maxlength="16"
                                // onChange={(e) => setBoId(e.target.value)}
                                value={!showBOID ? boid : ""}
                                onChange={boIdHandler}
                                style={boidError ? { border: "1px solid #FF4D4F" } : {}}
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
                            </>
                          ) : null}
                        </form>
                      </div>
                      <div className="">
                        <div>
                          <div className="profile-form_container add_demat_acc_btns">
                            <div className="profile-form_field-container">
                              <div className="profile-form_field profile-tooltip-input">
                                <div className="row">
                                  <div className="col-md-12 col-12 d-flex justify-content-end mt-3">
                                    <Buttons.SecondaryButton
                                      value="Back"
                                      style={{
                                        width: "50%",
                                        height: "35px",
                                        marginRight: "5px",
                                      }}
                                      id="dbmn"
                                    />
                                    <Buttons.PrimaryButton
                                      value="Finish Transaction"
                                      style={{
                                        width: "50%",
                                        height: "35px",
                                        marginLeft: "5px",
                                      }}
                                      onClick={AddAccount}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <Dialog
            open={walletCreated}
            onClose={() => setWalletCreated(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="addcompanyrequest px-2 py-2">
              <div className="addcompanyrequest_container px-4">
                <div className="text-center">
                  <img
                    src={CompanyIconWithCircle}
                    className="mx-2"
                    alt="u-icon"
                  />
                  <h5>Transaction Successful!</h5>
                  <p className="my-2 text-small">
                    Your transaction is successfully completed. Shares will be
                    reflected in your demat account within 2 business days.
                  </p>
                  <p className="my-2 text-small">
                    You will receive an email at your registered email id with
                    the invoice attached.
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
          </Dialog>
        </div>
      )}
    </>
  );
};
export default AddDematAccount;
