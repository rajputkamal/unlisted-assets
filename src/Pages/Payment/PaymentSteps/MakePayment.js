import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./paymentsteps.css";
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ChooseRole from "../../TradeReadySteps/tradereadystep1";
// import AddBankAccount from "../../TradeReadySteps/tradereadystep2";
// import AddDematAccount from "../../TradeReadySteps/tradereadystep3";
import NSDLActiveAccount from "../../TradeReadySteps/tradereadystep4";
import PANVerification from "../../TradeReadySteps/tradereadystep5";
import AadharLinked from "../../TradeReadySteps/tradereadystep6";
import KYCDetails from "../../TradeReadySteps/tradereadystep7";
// import "./tradereadytab.css";
import { apiCall } from "../../../Utils/Network";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import Buttons from "../../Components/Buttons";
import Tooltip from "@mui/material/Tooltip";
import ChoosePaymentMethod from "../Steps/ChoosePaymentMethod";
import AddDematAccount from "../Steps/AddDematAccount";
import PaymentSuccessfull from "../Steps/PaymentSuccessfull";
import AddBankAccount from "../Steps/addBankAccount";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import { ReactComponent as CompletedChipLabel } from "./completed.svg";
import { ReactComponent as SharesIcon } from "./shares.svg";
import { ReactComponent as PaymentIcon } from "./payment.svg";
import { ReactComponent as DematIcon } from "./dmatAccount.svg";
import { ReactComponent as AddTransferDetailIcon } from "./AddTransferDetailIcon.svg";
import { ReactComponent as ShareTransferIcon } from "./ShareTransferIcon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft: "50px",
    paddingRight: "50px",
    textTransform: "capitalize !important",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps = [
  {
    label: "Select campaign settings test",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function MakePayment(props) {
  const theme = useTheme();
  const classes = useStyles();
  let history = useHistory();
  var uri = window.location.pathname.split("/").pop();
  var tab = 0;
  if (!isNaN(uri)) {
    tab = parseInt(uri);
  }

  const [activeStep, setActiveStep] = useState(1);
  const [activeTooltipTitle, setActiveTooltipTitle] = useState();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    props.Submitnextpage();
  };

  const [details, setDetails] = useState({});

  React.useEffect(() => {
    print_array_element(tooltipTitle, index);
    getProfile();
  }, [props]);

  async function getProfile() {
    const response = await apiCall(
      "useronboarding/accountonboarding",
      "GET",
      "",
      history
    );
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    setDetails(responseJSON);
  }

  function getSteps() {
    return [
      "Confirm Shares",
      "Make Payment",
      "Share Transfer Details",
      "Transfer Status",
    ];
  }

  const tooltipTitle = [
    "Provide your residence status",
    "Bank account will be linked for Buying/Selling Unlisted Shares",
    "Demat account will be linked for Buying/Selling Unlisted Shares",
    "How would you prefer to transfer your shares",
    "Verify your PAN for transacting in Unlisted Shares",
    "Verify your Aadhar for transacting in Unlisted Shares",
  ];

  // console.log("details", details)

  var index = activeStep;

  function print_array_element(tooltipTitle, i) {
    // console.log("activeStep",activeStep);
    setActiveTooltipTitle(tooltipTitle[activeStep + 1]);
  }

  // mobile payments
  const [activeStepMobile, setActiveStepMobile] = React.useState(0);

  const handleNextMobile = () => {
    setActiveStepMobile((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackMobile = () => {
    setActiveStepMobile((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetMobile = () => {
    setActiveStepMobile(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <AddBankAccount
              nextPage={handleNext}
              details={details}
              tryagain={props.tryagain}
            />
            {/* <ChoosePaymentMethod nextPage={handleNext} details={details} tryagain={props.tryagain}/>  */}
            {/* <AddBankAccount nextPage={handleNext} details={details} tryagain={props.tryagain} /> */}
          </>
        );
      case 1:
        return (
          <ChoosePaymentMethod
            nextPage={handleNext}
            details={details}
            tryagain={props.tryagain}
          />
        );
      case 2:
        return (
          <>
            <AddBankAccount
              nextPage={handleNext}
              details={details}
              tryagain={props.tryagain}
            />
            {/* <AddDematAccount  nextPage={handleNext} details={details} tryagain={props.tryagain}/> */}
          </>
        );
      case 3:
        return (
          <PaymentSuccessfull
            nextPage={handleNext}
            details={details}
            tryagain={props.tryagain}
          />
        );
      // case 2:
      //   return <NSDLActiveAccount nextPage={handleNext} details={details} />;
      // case 3:
      //   return <PANVerification nextPage={handleNext} details={details} tryagain={props.tryagain}/>;
      // case 4:
      //   return <AadharLinked nextPage={handleNext} details={details} tryagain={props.tryagain}/>;
      // case 5:
      //   return <>
      //   <AddDematAccount  />;
      //   {/* <KYCDetails /> */}
      //   </>;

      default:
      // props.Submitnextpage()
    }
  }
  // mobiel version
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      {width <= 768 ? (
        <>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="CustomMobileStepper"
            >
              <Step>
                <StepLabel>
                  <div className="labelname">
                    <SharesIcon /> Confirm Shares
                  </div>
                  {activeStep == 1 || activeStep == 2 || activeStep == 3 ? (
                    <CompletedChipLabel />
                  ) : null}
                </StepLabel>
                <StepContent>
                  <Typography />
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#731b67",
                          color: "#fff",
                          textTransform: "capitalize",
                        }}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1
                          ? "Finish"
                          : "Continue to Payment"}
                      </Button>
                      {/* <Button
                            disabled={index === 0}
                            onClick={handleBackMobile}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button> */}
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  <div className="labelname">
                    <PaymentIcon /> Make Payment
                  </div>
                  {activeStep == 2 || activeStep == 3 || activeStep == 4 ? (
                    <CompletedChipLabel />
                  ) : null}
                </StepLabel>
                <StepContent>
                  <div className="mobileStepcard">
                    <ChoosePaymentMethod
                      nextPage={handleNext}
                      details={details}
                      tryagain={props.tryagain}
                    />
                  </div>

                  <Box sx={{ mb: 2 }}>
                    {/* <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBackMobile}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div> */}
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  <div className="labelname">
                    <AddTransferDetailIcon /> Share Transfer Details
                  </div>
                  {activeStep == 3 || activeStep == 4 ? (
                    <CompletedChipLabel />
                  ) : null}
                </StepLabel>
                <StepContent>
                  <div className="mobileStepcard">
                    <AddBankAccount
                      nextPage={handleNext}
                      details={details}
                      tryagain={props.tryagain}
                    />
                    {/* <AddDematAccount nextPage={handleNext} details={details} /> */}
                  </div>

                  <Box sx={{ mb: 2 }}>
                    {/* <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBackMobile}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div> */}
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  <div className="labelname">
                    <ShareTransferIcon /> Transfer Status
                  </div>
                  {activeStep == 4 ? <CompletedChipLabel /> : null}
                </StepLabel>
                <StepContent>
                  <div className="mobileStepcard">
                    <PaymentSuccessfull
                      nextPage={handleNext}
                      details={details}
                      tryagain={props.tryagain}
                    />
                    {/* <PaymentSuccessfull nextPage={handleNext} details={details} /> */}
                  </div>

                  <Box sx={{ mb: 2 }}>
                    {/* <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBackMobile}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div> */}
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                {/* <Typography>Share Transfer</Typography> */}
                {/* <Button onClick={handleResetMobile} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button> */}
              </Paper>
            )}
          </Box>
        </>
      ) : (
        <div className="my-card Tradeready-tabs-section">
          {activeStep <= 4 ? (
            <>
              <div className="d-flex justify-content-between">
                <div className="py-0 my-0">
                  <p className="tradereadytab-para">
                    Step {activeStep + 1}/{getSteps().length - 1 + 1}:
                  </p>
                  <Tooltip
                    title={activeTooltipTitle}
                    arrow
                    placement="top-start"
                  >
                    <h5
                      className="tradereadytab-heading mb-0"
                      style={{ cursor: "pointer" }}
                    >
                      {getSteps()[activeStep]}
                    </h5>
                  </Tooltip>
                  {/* <Tooltip title={activeTooltipTitle} arrow placement="top-start">
                  <Button style={{ color: "#721B65", textTransform: "capitalize" }}><h5 className='tradereadytab-heading mb-0'>{getSteps()[activeStep]}</h5></Button>
              </Tooltip> */}
                </div>
                {activeStep == 0 ? (
                  <div className="py-0 my-0">
                    <p className="tradereadytab-para-nextpage">Next Step:</p>
                    <h5 className="tradereadytab-heading-nextpage mb-0">
                      Make Payment
                    </h5>
                  </div>
                ) : null}
                {activeStep == 1 ? (
                  <div className="py-0 my-0">
                    <p className="tradereadytab-para-nextpage">Next Step:</p>
                    <h5 className="tradereadytab-heading-nextpage mb-0">
                      Share Transfer Details
                    </h5>
                  </div>
                ) : null}
                {activeStep == 2 ? (
                  <div className="py-0 my-0">
                    <p className="tradereadytab-para-nextpage">Next Step:</p>
                    <h5 className="tradereadytab-heading-nextpage mb-0">
                      Transfer Status
                    </h5>
                  </div>
                ) : null}
              </div>

              <div className="tradereadytab-mobilestepper">
                <MobileStepper
                  variant="progress"
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  sx={{ maxWidth: 1000, flexGrow: 1 }}
                />
              </div>
            </>
          ) : null}

          <div className={classes.root}>
            {/*<Stepper nonLinear activeStep={activeStep}>*/}
            {/*  {steps.map((label, index) => {*/}
            {/*    const stepProps = {};*/}
            {/*    const buttonProps = {};*/}
            {/*    if (isStepOptional(index)) {*/}
            {/*      buttonProps.optional = <Typography variant="caption"></Typography>;*/}
            {/*    }*/}
            {/*    if (isStepSkipped(index)) {*/}
            {/*      stepProps.completed = false;*/}
            {/*    }*/}
            {/*    return (*/}
            {/*      <Step key={label} {...stepProps}>*/}

            {/*      </Step>*/}
            {/*    );*/}
            {/*  })}*/}
            {/*</Stepper>*/}
            <div>
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
