import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StepConnector from '@material-ui/core/StepConnector';
import './Steper.css'
import Typography from '@material-ui/core/Typography';
import TransactionDetails from './TransactionDetails'
import Datasancity from './Datasancity'
import KycVerification from './KycVerification';
import ApiOtp from './ApiOtp';
import NillOutstanding from './NillOutstanding';
import StatutoryCompliances from './StatutoryCompliances';
import SignedAgreements from './SignedAgreements';
import Unauthorised from "./UnauthorisedActions";
import OtherCompliances from "./OtherCompliances";
import ApprovedIcon from '../../Components/AuditorTransactionDetails/assets/approved.svg'
import WarningIcon from '../../Components/AuditorTransactionDetails/assets/warning.svg'
import Modal from 'react-bootstrap/Modal'
import Buttons from "../../Components/Buttons";
import { apiCall, downloadurl, setAccessToken } from "../../Utils/Network"

import {
  errorToast, successToast,
} from "../../Components/Toast/index";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
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
    color: '#2E384D',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    fontWeight: '700'
  },
  active: {
    color: '#784af4',
    fontWeight: '700'
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
    fontWeight: '700',
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
    top: 8,
    fontWeight: '700',
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  active: {
    '& $line': {
      background:'#00CC83',
    },
  },
  completed: {
    '& $line': {
      background:'#00CC83',
    },
  },
  line: {
    height: 5,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width:20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
  },
  active: {
    background:'#00CC83',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    fontWeight: '700',
  },
  completed: {
      background:'#00CC83',
      fontWeight: '700',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <FiberManualRecordIcon />,
    2: <FiberManualRecordIcon />,
    3: <FiberManualRecordIcon />,
    4: <FiberManualRecordIcon />,
    5: <FiberManualRecordIcon />,
    6: <FiberManualRecordIcon />,
    7: <FiberManualRecordIcon />,
    8: <FiberManualRecordIcon />,
    9: <FiberManualRecordIcon />,
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
  return ['Transaction Details', 'KYC Verification'];

  // return ['Transaction Details', 'Data Sancity', 'KYC Verification' , 'API & OTP', 'Nill Outstanding', 'Statutory compliances', 'Signed Agreements', 'Unauthorised actions', 'Other Compliances'];
}

function getStepContent(step, row, checker) {
  switch (step) {
    case 0:
      return <>

            <TransactionDetails row={row} type={"TransactionDetails"}/>
            <Datasancity row={row} checker={checker} type={"TransactionDetails"}/>
    </>
    case 1:
      return <>
        <Datasancity row={row} checker={checker} type={"KYCVerification"}/>
        <Datasancity row={row} checker={checker} type={"TransactionDetails"}/>
      </>

    // case 2:
    //   return <Datasancity row={row} checker={checker} type={"KYCVerification"}/>;
    // case 3:
    //   return <Datasancity row={row} checker={checker} type={"APIOtp"}/>;
    // case 4:
    //   return <Datasancity row={row} checker={checker} type={"NillOutstanding"}/>;
    // case 5:
    //   return <Datasancity row={row} checker={checker} type={"StatutoryCompliances"}/>;
    // case 6:
    //   return <Datasancity row={row} checker={checker} type={"SignedAgreements"}/>;
    // case 7:
    //   return <Datasancity row={row} checker={checker} type={"Unauthorised"}/>;
    // case 8:
    //   return <Datasancity row={row} checker={checker} type={"OtherCompliances"}/>;
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [show, setShow] = useState(false);
  const [trusteeApprovalId, settrusteeApprovalId] = useState(props.row.id);


  const handleClose = () => setShow(false);
  const approvebutton = () => {

    // if nothing is flag
    setShow1(true)
    //if atleast one flag is set
    //setShow(true);

  }

  React.useEffect(() => {
    settrusteeApprovalId(props.row.id)
  }, [props]);

  const finalassigntoua = async () => {

    let approvalStatus = "approved"

    let response = await apiCall("trustee/assigntoua/"+trusteeApprovalId, 'PUT', {})

    setShow(false)
    setShow1(false)
    setShow2(false)
    // let responseJSON = await response.json()

    if (response.status !== 200) {
      errorToast("Invalid", "Not assigned to UA, try after sometime or reach Admin!!");
      return;
    }else if (response.status === 200){

      successToast("Success","Successfully Assigned to UA!!")
      props.refreshData()
    }

  }

  const finalassigntotrustee = async () => {

    let approvalStatus = "approved"

    let response = await apiCall("trustee/assigntotrustee/"+trusteeApprovalId, 'PUT', {})
    setShow(false)
    setShow1(false)
    setShow2(false)
    // let responseJSON = await response.json()

    if (response.status !== 200) {
      errorToast("Invalid", "Not assigned to UA, try after sometime or reach Admin!!");
      return;
    }else if (response.status === 200){

      successToast("Success","Successfully Assigned to Trustee!!")
      props.refreshData()

    }


  }

  const finalApproveButtonByTrustee = async () => {

    let approvalStatus = "approved"

    let response = await apiCall("trustee/trustee/"+trusteeApprovalId+"/"+approvalStatus, 'PUT', {})
    //
    // let responseJSON = await response.json()

    if (response.status !== 200) {
      errorToast("Invalid", "Not yet Approved, try after sometime or reach Admin!!");
      return;
    }else if (response.status === 200){

      successToast("Success","Successfully Approved !!")
      props.refreshData()
    }
    setShow(false)
    setShow1(false)
    setShow2(false)
  }

  const finalApproveButtonByUA = async () => {

    let approvalStatus = "approved"

    let response = await apiCall("trustee/ua/"+trusteeApprovalId+"/"+approvalStatus, 'PUT', {})

    // let responseJSON = await response.json()

    if (response.status !== 200) {
      errorToast("Invalid", "Not yet Approved, try after sometime or reach Admin!!");
      return;
    }else if (response.status === 200){

      successToast("Success","Successfully Approved !!")
      props.refreshData()
    }
  }

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const assigntouaortrusteebutton = () => setShow2(true);

  const handleNextbutton = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackbutton = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetbutton = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div className="transaction_steps">
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div className="mt-5">
            <Buttons.PrimaryButton onClick={handleResetbutton}  value="Reset" />
            {/* <ApprovedModal /> */}
            {/*<WarningModal />*/}
          </div>
        ) : (
          
          <div>
            
            <Typography className={classes.instructions}>{getStepContent(activeStep, props.row, props.checker)}</Typography>
            
            <div className="col-12 col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  {/*<div className="timig_remain text-center">*/}
                  {/*    <h6 className="m-0">Time Remaining For Audit</h6>*/}
                  {/*    <div className="auditorscreen_Timer mt-2">*/}
                  {/*      <h4 className="m-0 p-2">40h : 30mins</h4>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                  <div>
                    <div className="d-flex align-items-center">
                      {/*<h6 className="text-small" style={{ margin:"2px"}}>Save Progress as Draft</h6>*/}
                      {
                        props.row.approvalStatusTrustee != "approved" ?
                            <><Buttons.SecondaryButton onClick={approvebutton}  value="Approve" style={{ margin:"2px"}}/>
                            {props.checker == "external" ? <Buttons.SecondaryButton onClick={assigntouaortrusteebutton}  value="Assign UA" style={{ margin:"2px"}}/>
                                  : <Buttons.SecondaryButton onClick={assigntouaortrusteebutton}  value="Assign Trustee" style={{ margin:"2px"}}/>}

                            </>
                        : null
                      }

                      {/*<Buttons.SecondaryButton disabled={activeStep === 0} value="Cancel" style={{ margin:"2px"}}/>*/}
                      <Buttons.SecondaryButton disabled={activeStep === 0} onClick={handleBackbutton}  value="Back" style={{ margin:"2px"}}/>
                      <Buttons.PrimaryButton variant="contained" onClick={handleNextbutton} value="Next" style={{ margin:"2px"}}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Buttons.PrimaryButton>

                    </div>
                    {/* <div>
                      <Button className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={WarningIcon} />
          <Modal.Title><b>Marked steps warning</b></Modal.Title>
          <span>You have marked some steps to review later <br />
          are you sure you want to approve the transaction.</span>
          <div className="d-flex justify-content-around mt-5 mb-4">
            { props.checker == "external" ? <Buttons.SecondaryButton onClick={finalApproveButtonByTrustee} style={{width:"100%", margin:"0px 5px"}} value="Approve Transaction" />
                                          : <Buttons.SecondaryButton onClick={finalApproveButtonByUA} style={{width:"100%", margin:"0px 5px"}} value="Approve Transaction" />

            }
            <Buttons.SecondaryButton onClick={handleClose} style={{width:"100%", margin:"0px 5px"}} value="No, take me back" />

          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={ApprovedIcon} />
          <Modal.Title><b>Are you sure you want to approve the transaction!</b></Modal.Title>
          <span>We will go ahead, and complete the transaction</span>

          <div className="d-flex justify-content-around mt-5 mb-4">
            { props.checker == "external" ? <Buttons.SecondaryButton onClick={finalApproveButtonByTrustee} style={{width:"100%", margin:"0px 5px"}} value="ok, thanks" />
                : <Buttons.SecondaryButton onClick={finalApproveButtonByUA} style={{width:"100%", margin:"0px 5px"}} value="ok, thanks" />

            }
            <Buttons.SecondaryButton onClick={handleClose1} style={{width:"100%", margin:"0px 5px"}} value="No, take me back" />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={ApprovedIcon} />
          <Modal.Title><b>Are you Sure,</b></Modal.Title>
          {props.checker == "external" ? <span>you want to assign the transaction to UA</span>
          : <span>you want to assign the transaction to Trustee</span>}

          <div className="d-flex justify-content-around mt-5 mb-4">
            {props.checker == "external" ? <Buttons.PrimaryButton onClick={finalassigntoua} style={{width:"100%", margin:"0px 5px"}} value="Yes, please assign" />
                : <Buttons.PrimaryButton onClick={finalassigntotrustee} style={{width:"100%", margin:"0px 5px"}} value="Yes, please assign" />}

            <Buttons.SecondaryButton onClick={handleClose2} style={{width:"100%", margin:"0px 5px"}} value="No, take me back" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
