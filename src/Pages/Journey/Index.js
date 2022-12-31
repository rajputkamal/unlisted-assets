import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Progress from '../../Components/Journey/Progress';
import BorderProgress from '../../Components/Journey/BorderProgress';
import Profile1 from '../../Components/Journey/Profile/Profile1';
import Profile2 from '../../Components/Journey/Profile/Profile2';
import ProfileMobile from '../../Components/Journey/Profile/ProfileMobile';

import Profile3 from '../../Components/Journey/Profile/Profile3';
import Profile4 from '../../Components/Journey/Profile/Profile4';
import TradeReady0 from '../../Components/Journey/TradeReady/TradeReady0';
import TradeReady1 from '../../Components/Journey/TradeReady/TradeReady1';
import TradeReady2 from '../../Components/Journey/TradeReady/TradeReady2';
import TradeReady3 from '../../Components/Journey/TradeReady/TradeReady3';
import Negotiation1 from '../../Components/Journey/Negotiation/Negotiation1';
import Negotiation2 from '../../Components/Journey/Negotiation/Negotiation2';
import Negotiation3 from '../../Components/Journey/Negotiation/Negotiation3';
import Negotiation4 from '../../Components/Journey/Negotiation/Negotiation4';
import Transaction1 from '../../Components/Journey/BuySellStock/Transaction1';
import Transaction2 from '../../Components/Journey/BuySellStock/Transaction2';
import Transaction3 from '../../Components/Journey/BuySellStock/Transaction3';
import Transaction4 from '../../Components/Journey/BuySellStock/Transaction4';
import { apiCall } from '../../Utils/Network';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory
} from "react-router-dom";

import './journey.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function getSteps() {
  return ['Complete Profile', 'Trade Ready Steps', 'Negotiation'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProfileMobile />;
    case 1:
      return 'Content-2';
    case 2:
      return 'Content-3';
    default:
      return 'Unknown step';
  }
}
export default function VerticalTabs() {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState(1);
  const [rowInformation, setrowInformation] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue",newValue)
  };

  React.useEffect(() => {
    getAllInventory()
    
  }, []);

  const getAllInventory = async function (){
    let response = await apiCall("useronboarding/onboardingjourney",'GET','', history) 
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    //console.log(response)
    let responseJSON = await response.json();
    //console.log(responseJSON)
    setrowInformation(responseJSON)
  }

  
//For Journey mobile Stepers
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }
  //
  
  // console.log("rowInformation" ,rowInformation )
  // console.log("activeStep" ,activeStep )

  return (
      <div>
        <div className="dbmn">
        <div className="MarketPlace-jorney-section " id="jorney-sec">
          <div>
            <div className="d-flex align-items-center border-bottom pb-2 pl-3 border-right">
              <h6 className="m-0 text-small d-flex justify-content-between align-items-center w-100"><b> Your Journey so far </b></h6>
              <Progress journeyCompleted={rowInformation.overallJourneyCompleted}/>
            </div>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                  <Tab label={
                    <React.Fragment>
                      <div className="w-100 py-2">
                        <div className="journey_radio_btns mr-2">
                          <input type="radio" id="CompleteProfile" name="radio-group1" checked={rowInformation.profileJourneyCompleted == "100"}/>
                          <label for="CompleteProfile">Complete Profile</label>
                        </div>
                        <div className="px-4">
                          <BorderProgress journeyCompleted={rowInformation.profileJourneyCompleted}/>
                        </div>
                      </div>
                    </React.Fragment>
                } {...a11yProps(0)} />
                  <Tab label={
                    <React.Fragment>
                      <div className="w-100 py-2">
                        <div className="journey_radio_btns mr-2">
                          <input type="radio" id="Negotiation" name="radio-group" checked={rowInformation.tradeReadyJourneyCompleted == "100"}/>
                          <label for="Negotiation">Negotiation In Marketplace</label>
                        </div>
                        <div className="px-4">
                          <BorderProgress journeyCompleted={rowInformation.tradeReadyJourneyCompleted}/>
                        </div>
                      </div>
                    </React.Fragment>
                } {...a11yProps(1)} />


              {/*
              <div className="d-flex align-items-center my-2">
                <div className="left-tab-sec d-flex align-items-center journey_radio_btns">
                  <input type="radio" id="TradeReady" name="radio-group"  />
                  <label for="TradeReady"></label>
                </div>
                <div className="right-tab-sec">
                  <BorderProgress journeyCompleted={rowInformation.tradeReadyJourneyCompleted}/>
                </div>
              </div>
               <div className="d-flex align-items-center">
                <div className="left-tab-sec d-flex align-items-center journey_radio_btns">
                  <input type="radio" id="Negotiate" name="radio-group"  />
                  <label for="Negotiate"></label>
                </div>
                <div className="right-tab-sec">
                  <Tab label="Negotiate in Marketplace" {...a11yProps(2)} />
                  <BorderProgress />
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="left-tab-sec d-flex align-items-center journey_radio_btns">
                  <input type="radio" id="Buy_Sell" name="radio-group"  />
                  <label for="Buy_Sell"></label>
                </div>
                <div className="right-tab-sec">
                  <Tab label="Buy/Sell Stocks" {...a11yProps(3)} />
                  <BorderProgress />
                </div>
              </div> */}
            </Tabs>
          
          </div>
          <TabPanel value={value} index={0} className="jorney-tabpanel">
            <Profile1 rowInformation={rowInformation}/>
            {/* <Profile2 /> */}
            {/* <Profile3 /> */}
            {/* <Profile4 /> */}

          </TabPanel>
          <TabPanel value={value} index={1} className="jorney-tabpanel">
            {/* <TradeReady1 /> */}
            <TradeReady0 rowInformation={rowInformation}/>
            {/* <TradeReady2/> */}
            {/* <TradeReady3 /> */}
          </TabPanel>
          <TabPanel value={value} index={2} className="jorney-tabpanel">
            {/* <Negotiation1 /> */}
            {/* <Negotiation2 /> */}
            <Negotiation3 />
            {/* <Negotiation4 /> */}
          </TabPanel>
          <TabPanel value={value} index={3} className="jorney-tabpanel">
            {/* <Transaction1 /> */}
            {/* <Transaction2 /> */}
            {/* <Transaction3 /> */}
            <Transaction4 />

          </TabPanel>
        </div>
        </div>
        <div className="jorney-steps-mobile dnmb">
          <div>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 px-3 border-right">
              <h6 className="m-0 text-default-secoundary text-small "><b> Your Journey so far </b></h6>
              <Progress journeyCompleted={rowInformation.overallJourneyCompleted}/>
            </div>
            <div className="px-3">
            <div className={classes.root}>
              <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const buttonProps = {};
                  // if (isStepOptional(index)) {
                  //   buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                  // }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton
                        onClick={handleStep(index)}
                        completed={isStepComplete(index)}
                        {...buttonProps}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {allStepsCompleted() ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    {/* <div>
                      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                      {isStepOptional(activeStep) && !completed.has(activeStep) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSkip}
                          className={classes.button}
                        >
                          Skip
                        </Button>
                      )}

                      {activeStep !== steps.length &&
                        (completed.has(activeStep) ? (
                          <Typography variant="caption" className={classes.completed}>
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button variant="contained" color="primary" onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                          </Button>
                        ))}
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

  );
}
