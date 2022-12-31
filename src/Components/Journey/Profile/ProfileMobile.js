import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import GreenCheck from '../Green-chek.svg'

import './Profile.css'
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color:'#721B65',
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color:'#2E384D',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 25,
  },
  active: {
    '& $line': {
      background: '#2E384D ',
    boxShadow: '0px 0px 1px 0px #ccc',
    color:'#721B65',
    },
  },
  completed: {
    '& $line': {
      background: '#2E384D ',
      boxShadow: '0px 0px 1px 0px #ccc',
      color:'#721B65',
    },
  },
  line: {
    height: 1,
    border: 0,
    backgroundColor: '#ccc',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    zIndex: 1,
    color: '#787878',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff ',
    boxShadow: '0px 4px 15px rgba(46, 56, 77, 0.2)',
  },
  active: {
    background: '#fff ',
    boxShadow: '0px 4px 15px rgba(114, 27, 101, 0.2)',
    color:'#721B65',
  },
  completed: {
    background: '#fff ',
    boxShadow: '0px 4px 15px rgba(46, 56, 77, 0.2)',
    color:'#2E384D',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <AccountBalanceIcon />,
    3: <AccountBalanceWalletIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Person Detail', 'Bank Account', 'Wallet Creation'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Person Detail';
    case 1:
      return 'Bank Account';
    case 2:
      return 'Wallet Creation';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="JourneyMobileStepActive">
      <div className={classes.root}>
              <div >
                <div className="d-flex align-items-center justify-content-center mobile-display">
                  <div className="text-center" >
                    <img src={BotIcon} width="40"/>
                  </div>
                  <p className='m-0 text-small-profile text-left'> 
                  <b className='text-small-profile'>“You will need to fill in your bank details. We make sure  that your information is safely processed” <span className="text-primary-color"> Read More </span></b></p>
                  <Buttons.SecondaryButton style={{margin: "auto"}} value="Lets Complete Your Profile" />
                </div>
              </div>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label} <img className="GreenCheck-icon-mobile" src={GreenCheck} /></StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div> */}
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
