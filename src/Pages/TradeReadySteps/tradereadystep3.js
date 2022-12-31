import React, { useState, useEffect } from "react";
import "./tradereadystep3.css";
import Demat from "./Demat.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { apiCall } from "../../Utils/Network";
import { successToast, errorToast } from "../../../src/Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import Loadbutton from "../../Components/Loadbutton/LoadbuttonSmall";
import Tooltip from "@mui/material/Tooltip";
import { ReactComponent as TooltipIcon } from "./TooltipIcon.svg";
import Button from "@material-ui/core/Button";

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
  const [dpid, setDpId] = useState("IN");
  const [boid, setBoId] = useState("");
  const [clientid, setClientid] = useState("");
  const [dmatcall, setDmatcall] = useState("");
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  const [depository, setDepository] = useState(false);
  const [showDPID, setshowDPID] = useState(false);
  const [showBOID, setshowBOID] = useState(true);
  const [dpError, setDPError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [boidError, setBOidError] = useState(false);

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
      props.nextPage(); // move to the next page
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

  const saveContinue = async function() {
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

      props.nextPage();
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

  const dpIdHandler = (e) => {
    const value = e.target.value;
    if (!value.includes("IN") && value.length > 8) {
      setDPError(true);
      return;
    } else {
      setDpId(value);
      setDPError(false);
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

  const clientIdHandler = (e) => {
    if (e.target.value.length > 8) {
      setClientIdError(true);
      return;
    } else {
      setClientid(e.target.value);
      setClientIdError(false);
    }
  };

  return (
    <div className="row ">
      <div className="col-md-12 col-12 px-4 mb-4">
        <div className="">
          {/* <h6 style={{fontFamily: "Montserrat"}}><b>Add Your Demat account</b></h6> */}
          {/* <p className="text-small">Please ensure the Demat ID & Client ID is correct  and for self. Third party Demat A/c details  are not allowed  and  will be rejected. Please select the Depository name from the drop down and Broker name  carefully  before  you proceed to the next step.</p> */}
          <form className="w-100 DepositoryTab-form">
            {/* <label className="Trade_ready_step_3_Label my-2 text-small">Demat ID*</label>
                    <input type="text" className="p-2 text-small"
                    name="dematid" onChange={(e) => setDematid(e.target.value)} value={dematid}
                    /> */}
            {/* <label className="my-2 text-small">Confirm Demat ID*</label>
                    <input type="text" className="p-2 text-small"
                    name="confirmdematid" onChange={(e) => setConfirmDematid(e.target.value)} value={confirmdematid}
                    /> */}
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
            <label className="m-0 my-2 text-small">Broker Name</label>
            <input
              type="text"
              className="p-2 text-small w-100"
              name="brokername"
              onChange={(e) => setBrokerName(e.target.value)}
              value={brokerName}
            />
            {!showDPID ? (
              <>
                <label className="m-0 my-2 text-small">
                  DP ID
                  <span style={dpError ? { color: "#FF4D4F" } : {}}>*</span>
                </label>
                <input
                  disabled={showDPID}
                  type="text"
                  className={
                    showDPID
                      ? "p-2 text-small disabled-field"
                      : "p-2 text-small "
                  }
                  // name="dpid" maxlength="8" onChange={(e) => {setDpId(e.target.value) }} value={!showDPID ? dpid : ''}
                  name="dpid"
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
                  Client ID
                  <span style={clientIdError ? { color: "#FF4D4F" } : {}}>
                    *
                  </span>
                </label>
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
                  onChange={clientIdHandler}
                  value={!showDPID ? clientid : ""}
                  style={clientIdError ? { border: "1px solid #FF4D4F" } : {}}
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
                  BO ID
                  <span style={boidError ? { color: "#FF4D4F" } : {}}>*</span>
                </label>
                <input
                  disabled={showBOID}
                  type="number"
                  className={
                    showBOID
                      ? "p-2 text-small disabled-field "
                      : "p-2 text-small "
                  }
                  // name="boid" maxlength="16"  onChange={(e) => setBoId(e.target.value)} value={!showBOID ? boid : '' }
                  name="boid"
                  maxlength="16"
                  onChange={boIdHandler}
                  value={!showBOID ? boid : ""}
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
                    Demat/BO ID must be 16 digits long
                  </p>
                ) : (
                  ""
                )}
              </>
            ) : null}

            {/* <label className="my-2 text-small">Depository Name</label>
                    <input type="text" className="p-2 text-small"
                    name="boid" onChange={(e) => setDepositoryname(e.target.value)} value={depositoryName}
                    /> */}
          </form>
          {/* <div>
                    <form className="w-100">
                        
                    </form>
                </div> */}

          {/* <div className="Trade_ready_step_3_save_button mt-3 dbmn">
                    <div className="mt-2 d-flex align-items-center justify-content-end w-100">
                        <Buttons.PrimaryButton value="Save" onClick={saveContinue} />
                    </div>
                </div>  */}
        </div>
      </div>
      {/* <div className="col-md-6 col-12">
            <div className="my-card my-4">
                <div className="my-2">
                    <img src={Demat} width="150"/>
                </div>
                <div className="my-2">
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is the difference between broker and DP ?</p></b></a>
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is the Client Master Report or CMR or Client Master List ?</p></b></a>
                    <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is intra and inter-depository transfer ?</p></b></a>       
                    <p className="text-small mb-1">Please ensure the Demat ID & Client ID is correct  and for self. Third party Demat A/c details  are not allowed  and  will be rejected. Please select the Depository name from the drop down and Broker name  carefully  before  you proceed to the next step.</p>
                </div>                       
            </div>
        </div> */}
      <div className="w-100 px-3">
        {!isLoadingbtn && (
          // <Buttons.PrimaryButton value="Save & continue" onClick={saveContinue} />
          <div className="d-flex px-2 tradeready-action-button">
            {/*<Button  onClick={handleBack} className={classes.button } >Back</Button>*/}
            {/*disabled={!(dpid && boid && brokerName && depositoryName && clientid)}*/}
            {!(dpid && clientid || boid) ?
              <Buttons.InactiveButton value ='Save & Continue' style={{width: '50%'}} /> :
              <Buttons.PrimaryButton
                value="Save & Continue"
                style={{ with: "50%" }}
                onClick={saveContinue}
              />
            }
          </div>
        )}
        {isLoadingbtn && <Loadbutton />}
      </div>
    </div>
  );
};
export default AddDematAccount;
