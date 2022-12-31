import React from "react";
import "./stepper.css";
import tradeready from "./tradeready.svg"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { RadioGroup, StepContent, StepIcon } from "@material-ui/core";
import StepConnector from '@material-ui/core/StepConnector';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Table from "../../Components/DashboardHeader/tablecontent.js"


// const ColorlibConnector = withStyles({
    // alternativeLabel: {
    //   top: 22,
    // },
    // active: {

    //   '& $line': {
    //     backgroundImage:
    //       'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    //   },
    // },
    // completed: {
    //   '& $line': {
    //     backgroundImage:
    //       'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    //   },
    // },
    // line: {
    // height: 4,
    //   border: 0,
    //   backgroundColor: '#721B65;',
    //   borderRadius: 1,
    //   width: 4
    // lineHeightStep:16,
    // },
    // lineVertical:{
    // height:50,        
    //   borderColor: '#721B65;',
    //   borderRadius:1,
    //   width:0,
      
    // }
    
//   })(StepConnector);
//   const useStyles = makeStyles((theme) => ({
//     stepicon:{

        
//     }
//   }));

// const QontoConnector = withStyles({
//     alternativeLabel: {
//       top: 10,
//       left: 'calc(-50% + 16px)',
//       right: 'calc(50% + 16px)',
//     },
//     active: {
//       '& $line': {
//         borderColor: '#784af4',
//       },
//     },
//     completed: {
//       '& $line': {
//         borderColor: '#784af4',
//       },
//     },
//     line: {
//       borderColor: '#eaeaf0',
//       borderTopWidth: 3,
//       borderRadius: 1,
//     },
//   })(StepConnector);

//   const useQontoStepIconStyles = makeStyles({
//     root: {
//       color: '#eaeaf0',
//       display: 'flex',
//       height: 22,
//       alignItems: 'center',
//     },
//     active: {
//       color: '#784af4',
//     },
//     circle: {
//       width: 8,
//       height: 8,
//       borderRadius: '50%',
//       backgroundColor: 'currentColor',
//     },
//     completed: {
//       color: '#784af4',
//       zIndex: 1,
//       fontSize: 18,
//     },
//   });
  
//   function QontoStepIcon(props) {
//     const classes = useQontoStepIconStyles();
//     const { active, completed } = props;
  
//     return (
//       <div
//         className={clsx(classes.root, {
//           [classes.active]: active,
//         })}
//       >
//         {completed ? <RadioButtonUncheckedIcon className={classes.completed} /> : <div className={classes.circle} />}
//       </div>
//     );
//   }

let StepperArea = () => {

    //const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const nextStep = ()=>{
      if (activeStep < 5)
      setActiveStep((currentStep)=> currentStep + 1)
  }
  const previousStep = ()=>{
    if (activeStep !== -1)
    setActiveStep((currentStep)=> currentStep - 1)
}

    return (
    // <div className="dboard">
        <div className="trade_ready">
            <div className="trade_ready_head">
                <div >
                    <img src={tradeready}/>
                </div>
                <div className="trade_ready_head_right">
                    <p>Trade Ready <br></br> Steps </p>
                    
                </div>
            </div>

            <div className="stepper_list">
                <Stepper  
                // alternativeLabel 
                orientation="vertical" activeStep={activeStep} 
                // connector={<QontoConnector />}
                >
                {/* {[1,2,3,4].map((label) => (
          <         Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))} */}
                    <Step>
                    <StepLabel >10%</StepLabel>
                    <StepContent>Profile</StepContent>
                    </Step>
                    <Step>
                    <StepLabel>20%</StepLabel>
                    <StepContent>Bank Account</StepContent>
                    </Step>
                    <Step>
                    <StepLabel>40%</StepLabel>
                    <StepContent>Demant Account</StepContent>
                    </Step>
                    <Step>
                    <StepLabel>60%</StepLabel>
                    <StepContent>Select Share Transfer Process</StepContent>
                    </Step> 
                    <Step>
                    <StepLabel>80%</StepLabel>
                    <StepContent>PAN KYC Verification</StepContent>
                    </Step> 
                    <Step>
                    <StepLabel>100%</StepLabel>
                    <StepContent>Aadhar Confirmation</StepContent>
                    </Step>    
                    
                </Stepper>
                {/* <h3>{activeStep}</h3> */}
                {/* <button onClick={()=>previousStep()}>Prev Step</button>
                <button onClick={()=>nextStep()}>Next Step</button> */}
            </div>
            
        </div>
       
        )
    }
export default StepperArea