import React, { useState } from "react";
import "./tradereadystep3.scoped.css";
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
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import { successToast } from "../../../src/Components/Toast/index";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import "./buyeragreement.scoped.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

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

let SellerDematAccount = () => {
  const classes = useStyles();
  let history = useHistory();
  const [depositoryName, setDepositoryname] = React.useState("");
  const [brokerName, setBrokerName] = React.useState("");
  const [dematid, setDematid] = React.useState("");
  const [confirmdematid, setConfirmDematid] = React.useState("");
  const [dpid, setDpId] = React.useState("IN");
  const [boid, setBoId] = React.useState("");
  const [dmatcall, setDmatcall] = React.useState("");
  // const [disbaled, setDisabled]= useState(false);
  // const handleChange =(event)=>{
  //     setValue(event.target.value)
  // }

   // Demat Account Validation
   const [dpError, setDPError] = useState(false);
   const [clientIdError, setClientIdError] = useState(false);
   const [boidError, setBOidError] = useState(false);

  
  React.useEffect(() => {
    callDmat();
  }, []);
  const callDmat = async function() {
    let response = await apiCall("useronboarding/dmat", "GET", "", history);
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    setDmatcall(responseJSON);
    setDematid(responseJSON.dmatId);
    setDpId(responseJSON.dpId);
    setBoId(responseJSON.boId);
    setBrokerName(responseJSON.brokerName);
    setDepositoryname(responseJSON.depositoryName);
  };
  const saveContinue = async function() {
    // let response = await fetch('getholding').toJson()
    // setRowInformation(response)
    // if(depositoryName && dematid && confirmdematid && dpid && boid === '' ){

    // }
    let requestBody = {
      id: 159,
      dmatId: dematid,
      dpId: dpid,
      boId: boid,
      depositoryName: depositoryName,
      brokerName: brokerName,
      cmrCopy: null,
    };

    let response = await apiCall(
      "useronboarding/dmat",
      "POST",
      requestBody,
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }

    // console.log("api called ",response)

    let responseJSON = await response.json();

    // console.log("responseJson", responseJSON)

    successToast("Success", "Demat Account Updated");
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

  // const clientIdHandler = (e) => {
  //   if (e.target.value.length > 8) {
  //     setClientIdError(true);
  //     return;
  //   } else {
  //     setClientid(e.target.value);
  //     setClientIdError(false);
  //   }
  // };

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
    <div style={{ display: "flex", color: "#2E384D" }}>
      <div className="buyeragreement_left">
        <BuyerAgreementLeftHalf />
      </div>
      <div className="seller_virtual_account_container">
        <div className="Trade_ready_step_3_container Trade_ready_step_3_text">
          <div style={{ width: "500px" }}>
            <h3>Your Demat account Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                lineHeight: "30px",
              }}
            >
              <label className="Trade_ready_step_3_Label">Demat ID*</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="dematid"
                onChange={(e) => setDematid(e.target.value)}
                value={dematid}
              />
              <label>Confirm Demat ID*</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="confirmdematid"
                onChange={(e) => setConfirmDematid(e.target.value)}
                value={confirmdematid}
              />
              <label>DP ID*</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="dpid"
                onChange={dpIdHandler}
                value={dpid}
              />
               {dpError ? (<p  className="m-0 mt-1"   style={{fontSize: "12px",fontWeight: "500",color: "#FF4D4F"}}> DP ID must starts with "IN" and 8 digits long</p>) : ("")}
              <label>BO ID*</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="boid"
                onChange={boIdHandler}
                value={boid}
              />
              {boidError ? (<p  className="m-0 mt-1"   style={{fontSize: "12px",fontWeight: "500",color: "#FF4D4F"}}>BO ID must be 16 digits long</p>) : ("")}
              <label>Depository Name</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="boid"
                onChange={(e) => setDepositoryname(e.target.value)}
                value={depositoryName}
              />
              <label>Broker Name</label>
              <input
                type="text"
                className="sellerVirtualInput"
                name="brokername"
                onChange={(e) => setBrokerName(e.target.value)}
                value={brokerName}
              />
            </div>
            <div />
            <div className="Trade_ready_step_3_save_button">
              <Buttons.SecondaryButton value="Edit Account Details" />
              {!(dematid && confirmdematid && dpid && boid && depositoryName && brokerName) ? 
              <Buttons.InactiveButton value="Yes, this is my account" /> :
              <Buttons.PrimaryButton
                value="Yes, this is my account"
                onClick={saveContinue}
              />}
            </div>
          </div>

          <div>
            <BuyerAgreementRightHalf />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellerDematAccount;
