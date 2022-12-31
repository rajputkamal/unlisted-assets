import React, { useState, useEffect } from "react";
import "./paymentsteps.css";
// import { ReactComponent as UserIcon } from './user.svg';
// import { ReactComponent as TradeReadtIcon } from './tradereadystep.svg';
// import { ReactComponent as RiskIcon } from './riskprofile.svg';
// import { ReactComponent as WalletIcon } from './wallet.svg';
// import { ReactComponent as ChangePassIcon } from './changepwd.svg';

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ReactComponent as ShareTransferIcon } from "./ShareTransferIcon.svg";
import { ReactComponent as ShareTransferDetailIcon } from "./ShareTransferDetailIcon.svg";
import { ReactComponent as MakePaymentIcon } from "./MakePaymentIcon.svg";
import { ReactComponent as AddTransferDetailIcon } from "./AddTransferDetailIcon.svg";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { apiCall } from "../../../Utils/Network";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLocation } from "react-router-dom";

const steps = [
  {
    id: 0,
    img: <CompareArrowsIcon className="profile_widget_UserIcon" />,
    label: "Confirm Shares",
  },
  {
    id: 1,
    img: <MakePaymentIcon className="profile_widget_UserIcon" />,
    label: "Make Payment",
  },
  {
    id: 2,
    img: <AddTransferDetailIcon className="profile_widget_UserIcon" />,
    label: "Share Transfer Details",
  },
  {
    id: 3,
    img: <ShareTransferIcon className="profile_widget_UserIcon" />,
    label: "Transfer Status",
  },
];

let ProfileWidget = (props) => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [username, setusername] = React.useState("");
  const [OnboardingStatus, setOnboardingStatus] = React.useState(false);

  const location = useLocation();
  const selectedTrade = location.state.trade;

  const [trade, settrade] = React.useState(selectedTrade);

  useEffect(() => {
    // getProfile();
    setActiveStep(props.currentpage);
  }, [props]);
  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    setusername(responseJSON.name);

    // console.log("profilewidget executed"+responseJSON.uaVerifiedStatus)

    if (responseJSON.uaVerifiedStatus == "Verified") {
      setOnboardingStatus(true);
    } else {
      setOnboardingStatus(false);
    }
    // setprofilepic(responseJSON.profilePic)
  }
  return (
    <>
      <div className="profile_widget_container">
        <div className="profile_widget_head p-2">
          <h5 className="m-0  p-2 profile_widget_heading">
            {trade.companyName}
          </h5>
          <p className="m-0  pb-2 px-2 profile_widget_para">
            Fill in your details{" "}
          </p>
        </div>
        <div className="profile_widget_list">
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, idx, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    <div
                      // onClick={(e) => {props.setCurrentPage(idx); addclass(e, step.id)}}
                      className={
                        activeStep == step.id
                          ? "profile_widget_row d-flex justify-content-between align-items-center profile_widget_tab active"
                          : "d-flex justify-content-between align-items-center profile_widget_tab profile_widget_row d-flex align-items-center "
                      }
                    >
                      <div className="d-flex align-items-center ">
                        <div>{step.img}</div>
                        <p className={"profile_widget_row_label m-0 ml-2 "}>
                          {step.label}
                        </p>
                      </div>

                      <span className="ArrowForwardIosIcon">
                        {(activeStep == step.id && (
                          <ArrowForwardIosIcon className="ArrowForwardIosIcon" />
                        )) || (
                          <Chip
                            className="profile_widget_CompleteChip"
                            icon={<DoneIcon />}
                            label="Completed"
                          />
                        )}
                      </span>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* {activeStep === steps.length && (
      <Paper square elevation={0} sx={{ p: 3 }}>
        <Typography>All steps completed - you&apos;re finished</Typography>
        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
          Reset
        </Button>
      </Paper>
    )} */}
          </Box>

          {/* {options.map((option, idx , key) => {
          console.log(option.id)
          return (
            <div
            onClick={(e) => {props.setCurrentPage(idx); addclass(e, option.id)}}
            className={ profiletabid == option.id || (window.location.pathname == "/profilewig" && option.id==1 && !profiletabid) || (window.location.pathname == "/profilewig/1" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/2" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/3" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/4" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/5" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/6" && option.id==2 && !profiletabid)   ? "profile_widget_row d-flex align-items-center mt-2 mb-2 active" : "profile_widget_row d-flex align-items-center mt-2 mb-2 " }
          >
          
              <div>
                {option.img}
              </div>
              <p
                style={{
                  textAlign: "left",
                }}
                className={"profile_widget_row_label m-0 ml-2 "}
              >
                {option.label}
              </p>
            </div>
          );
        })} */}
        </div>
      </div>
    </>
  );
};

export default ProfileWidget;
