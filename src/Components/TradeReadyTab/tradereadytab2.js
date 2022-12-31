import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChooseRole from "../../Pages/TradeReadySteps/tradereadystep1";
import AddBankAccount from "../../Pages/TradeReadySteps/tradereadystep2";
import AddDematAccount from "../../Pages/TradeReadySteps/tradereadystep3";
import NSDLActiveAccount from "../../Pages/TradeReadySteps/tradereadystep4";
import PANVerification from "../../Pages/TradeReadySteps/tradereadystep5";
import AadharLinked from "../../Pages/TradeReadySteps/tradereadystep6";
import KYCDetails from "../../Pages/TradeReadySteps/tradereadystep7";

import "./tradereadytab.css";
import { apiCall } from "../../Utils/Network";
import {useHistory} from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
// import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Buttons from "../../Components/Buttons";
// import Buttons from "../../Components/Buttons";
import Tooltip from '@mui/material/Tooltip';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft:"50px",
    paddingRight:"50px",
    textTransform: "capitalize !important",

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




export default function HorizontalNonLinearAlternativeLabelStepper(props) {


  const theme = useTheme();
  const classes = useStyles();
  let history = useHistory()
  var uri = window.location.pathname.split("/").pop();
  var tab = 0;
  if(!isNaN(uri)) {
    tab = parseInt(uri);
  }




  const [activeStep, setActiveStep] = React.useState(0);
  const [activeTooltipTitle, setActiveTooltipTitle] = React.useState();

  const handleNext = () => {
    setActiveStep(activeStep+ 1);
  };

  const [details, setDetails] = React.useState({});


  React.useEffect(() => {
    print_array_element(tooltipTitle, index)
    getProfile();
  }, [props]);

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET", '', history);
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    setDetails(responseJSON);
  }

  function getSteps() {
    return [ 'Verify Bank Account', 'Add Demat Account', 'Pan Verfication','Aadhar-Phone Linkage Verification'];
  }

  const tooltipTitle = ['Provide your residence status', 
  'Bank account will be linked for Buying/Selling Unlisted Shares' ,
  'Demat account will be linked for Buying/Selling Unlisted Shares' ,
  'Verify your PAN for transacting in Unlisted Shares',
  'Verify your Aadhar for transacting in Unlisted Shares' ]



var index = activeStep;

function print_array_element(tooltipTitle, i) {
console.log("activeStep",activeStep);
setActiveTooltipTitle(tooltipTitle[activeStep+1])

}

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <>        
        <AddBankAccount nextPage={handleNext} details={details} tryagain={props.tryagain} />
        </>;
      case 1:
        return <AddDematAccount nextPage={handleNext} details={details} />;
      // case 2:
      //   return <NSDLActiveAccount nextPage={handleNext} details={details} />;
      case 2:
        return <PANVerification nextPage={handleNext} details={details} tryagain={props.tryagain}/>;
      case 3:
        return <AadharLinked nextPage={handleNext} details={details} tryagain={props.tryagain}/>;
      // case 5:
      //   return <>
      //   <KYCDetails />
      //   </>;
        
      default:
        props.Submitnextpage()
    }
  }

  return (
      <div className="my-card Tradeready-tabs-section">

        {activeStep<=3 ? <>

          <div className='d-flex justify-content-between'>
            <div className='py-0 my-0'>
              <p className='tradereadytab-para'>Step {activeStep+1}/{(getSteps().length-1)+1}:</p>
              <Tooltip title={activeTooltipTitle} arrow placement="top-start">
                  <Button style={{ color: "#721B65", textTransform: "capitalize" }}><h5 className='tradereadytab-heading mb-0'>{getSteps()[activeStep]}</h5></Button>
              </Tooltip>

            </div>
            {activeStep<=2 ?
                <div className='py-0 my-0'>
                  <p className='tradereadytab-para-nextpage'>Next Step:</p>                  
                  <h5 className='tradereadytab-heading-nextpage mb-0'>{getSteps()[activeStep+1]}</h5>
                </div> : null}

          </div>

          <div className='tradereadytab-mobilestepper'>
            <MobileStepper
                variant="progress"
                steps={6}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 1000, flexGrow: 1 }}

            />
          </div>
        </>: null}




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

            <div >
              <Typography cslassName={classes.instructions}>{getStepContent(activeStep)}</Typography>

            </div>

          </div>
        </div>
      </div>
  );
}
