import React, { useState } from "react";
import CompleteTransactionsteps from './rupee.svg';
import Greencheck from './green-check.svg'
import yellowsign from './not.svg'
import warning from './warning.jpg'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import "./buyeragreementrighthalf.scoped.css"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import { apiCall, setAccessToken } from "../../Utils/Network"
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Negotiation freeze', 'Buyer Agreement Signing', 'Seller Agreement Signing', 'Money received from buyer', 'Shares transfered to buyers Demat account', 'Buyers approval on receiving shares', 'Verification by Trustee', 'Transactions confirmed by Unlisted Assets', 'Transaction Complete'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return ``;
        case 1:
            return '';
        case 2:
            return ``;
        default:
            return 'Unknown step';
    }
}

let BuyerAgreementRightHalf = (props) => {
    let history = useHistory();
    const [showDialog, setShowDialog] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState(false);
    const [tradecommunication1, setTradeCommunication1] = React.useState([]);
    const location = useLocation();
    const selectedTrade = location.state.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [agreement, setagreement] = React.useState({})
    // console.log("pppppppppppppppp11"+selectedTrade.id+selectedOnGoingTxn.agreedQty)
    // console.log("selectedTrade", props.selectedTrade)
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(3);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        //setActiveStep(0);
    };


    React.useEffect(() => {
        GetAgrrementObject()
    }
        , [props])


    const GetAgrrementObject = async () => {
        let response = await apiCall("tradeagreement/" + selectedOnGoingTxn.id, 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json()
        // console.log("iiii"+responseJSON.buyerAgreementStatus+responseJSON.sellerAgreementStatus)
        setagreement(responseJSON);
    }

    const [completeTransactionCard, setcompleteTransactionCard] = useState(false)

    const openCard = () => {
        completeTransactionCard ? setcompleteTransactionCard(false) : setcompleteTransactionCard(true)
    }

    // ========================

    // For Loader  Journey Progess
    function CircularProgressWithLabel(props) {
        return (
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" id="buyeragreementrighthalf-CircularProgress" {...props} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div" color="textSecondary"><span className="d-flex align-items-end "><h5 className="font-weight-bold">{`${(Math.round(
                        props.value,
                    ) / 10).toFixed(0)}`}/</h5><h6 className="font-weight-bold ">9</h6></span></Typography>
                </Box>
            </Box>
        );
    }

    CircularProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };


    const [progress, setProgress] = React.useState(10);

    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 90 ? 0 : prevProgress + 11.11));
    //     }, 100);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    return (
        <div className="Buyer-Agreement-Signup">

            <div className=" buyeragreement_left mb-3 dnmb">
                <div className="buyeragreement_left-card buyeragreement_left text-center">
                    <div>
                        <h6 className="heading2 mb-1">Step 2 of 9</h6>
                        <h5 className="heading1 mb-1">Buyer Agreement Signup</h5>
                        <p className="title m-0 mb-2">Next - Seller Agreement Signing</p>
                        <div className="" onClick={openCard}>
                            {!completeTransactionCard ?
                                <p className="heading2 m-0 mb-1">Show All Steps <KeyboardArrowDownIcon className="theme-color" /> </p> :
                                <p className="heading2 m-0 mb-1">Hide All Steps <KeyboardArrowUpIcon className="theme-color" /></p>}
                        </div>
                    </div>



                    {
                        completeTransactionCard ?
                            <>
                                <div className="mobile-stepper dnmb">
                                    <Stepper activeStep={activeStep} orientation="vertical" >

                                        <Step className="d-flex stepper">
                                            <StepLabel className="label " sx={{
                                        marginLeft: "-4px"
                                    }}></StepLabel>


                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Buyer Accepts Terms</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Money received from buyer</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Buy Now Order received</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Shares transfered to buyers Demat account</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Seller Accepts Terms</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Buyer's confirmation on receiving shares</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Verification by Trustee</p></div>
                                            </Step>
                                        </Step>

                                        <Step className="d-flex">
                                            <StepLabel className="label "></StepLabel>
                                            <Step className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                <div><p className="text-small m-0">Transaction Complete</p></div>
                                            </Step>
                                        </Step>

                                    </Stepper>
                                    {activeStep === steps.length && (
                                        <Paper square elevation={0} className={classes.resetContainer}>
                                            <Typography>All steps completed - you&apos;re finished</Typography>
                                            <Button onClick={handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                        </Paper>
                                    )}
                                </div>


                                {/* <div className="mobile-stepper dnmb">
                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((label, index) => (
                                            <Step key={label} className="d-flex">
                                                <StepLabel className="label "></StepLabel>
                                                <Step key={label} className="default-shadow ml-2 w-100 p-3 border-2 rounded">
                                                    <div><p className="text-small m-0">{label}</p></div>
                                                </Step>
                                            </Step>

                                        ))}
                                    </Stepper>
                                    {activeStep === steps.length && (
                                        <Paper square elevation={0} className={classes.resetContainer}>
                                            <Typography>All steps completed - you&apos;re finished</Typography>
                                            <Button onClick={handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                        </Paper>
                                    )}
                                </div> */}



                            </> : null
                    }
                </div>
            </div>

            <div className="steps-title steps-title2 d-none" onClick={openCard}>
                <div className="d-flex align-items-center">
                    <div className="buyagreementMobileSignup-progress buyagreementMobile-progress mr-1  dnmb">
                        <CircularProgressWithLabel value={progress} />
                    </div>
                    <div className="dnmb">
                        <h6 style={{ fontSize: "14px", marginBottom: "0px" }}><b>Buyer Agreement Signup</b></h6>
                        <p className="text-small Complete-Transaction-Steps pt-0">Next-Seller Agreement signin</p>
                    </div>
                    <img className="p-2 dbmn" width="50" src={CompleteTransactionsteps} />
                    <h6 style={{ fontSize: "14px" }} className="mobi-none"><b>Complete Transaction Steps </b></h6>
                </div>
            </div>

            <div className="buyeragreement_completetransactionsteps">
                <div className="custom-radios d-flex align-items-center">
                    {/*{console.log("hihihihihihihihihihih"+agreement.sellerAgreementStatus+agreement.buyerAgreementStatus)}*/}
                    <input type="radio" id="Transaction-2" name="color2" value="Transaction-2"
                           checked={true}
                           disabled />
                    <label htmlFor="Transaction-2">
                            <span className="agreement-Greenuncheck-icon">
                                <img src={Greencheck} alt="Checked Icon" />
                            </span>
                    </label>
                    <p className={agreement.buyerAgreementStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Buyer Accepts Terms</p>
                </div>
            </div>




            <div className="buyeragreement_completetransactionsteps">
                <div className="custom-radios d-flex align-items-center">
                    <input type="radio" id="Transaction-4" name="color4" value="Transaction-4"
                           checked={true}
                           disabled />
                    <label htmlFor="Transaction-4">
                            <span className="agreement-Greenuncheck-icon">
                                <img src={Greencheck} alt="Checked Icon" />
                            </span>
                    </label>
                    <p className={agreement.buyerMoneyReceivedForTradeStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Money
                        received from buyer</p>
                </div>
            </div>

            <div className="phone-none">
                <div className="buyeragreement_completetransactionsteps">
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-1" name="color1" value="Transaction-1"
                            checked={true}
                            disabled
                        />
                        <label for="Transaction-1">
                            <span className="agreement-Greenuncheck-icon">
                                <img src={Greencheck} alt="Checked Icon" />
                            </span>
                        </label>
                        {/* <p className={isActive ? "app" : "container"}>Negotiation</p> */}
                        <p className={agreement.buyerAgreementStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Buy Now Order received </p>
                    </div>
                </div>

                <div className="buyeragreement_completetransactionsteps">
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-5" name="color5" value="Transaction-5"
                            checked={true}
                            disabled />
                        <label for="Transaction-5">
                            <span className="agreement-Greenuncheck-icon">
                                {!agreement.sellerTradeTransferStatus ?
                                    <div className="HourglassBottom-Icon"><HourglassBottomIcon /></div> :
                                    <img src={Greencheck} alt="Checked Icon" />}
                            </span>
                        </label>
                        <p className={agreement.sellerTradeTransferStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Shares transfered to buyers Demat account</p>
                    </div>
                </div>

                <div className="buyeragreement_completetransactionsteps">
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-3" name="color3" value="Transaction-3"
                            checked={agreement.sellerAgreementStatus || props.displayAgreementSignSeller}
                            disabled />
                        <label htmlFor="Transaction-3">
                            <span className="agreement-Greenuncheck-icon">
                                {!agreement.sellerAgreementStatus ?
                                    <div className="HourglassBottom-Icon"><HourglassBottomIcon /></div> :
                                    <img src={Greencheck} alt="Checked Icon" />}
                            </span>
                        </label>
                        <p className={agreement.sellerAgreementStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Seller Accepts Terms</p>
                    </div>
                </div>

                <div className="buyeragreement_completetransactionsteps">
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-6" name="color6" value="Transaction-6"
                            checked={agreement.buyerTradeTransferConfirmation_STATUS || props.displaybuyerTradeTransferConfirmation_STATUS1}
                            disabled />
                        <label for="Transaction-6">
                            <span className="agreement-Greenuncheck-icon">
                                {!agreement.buyerTradeTransferConfirmation_STATUS ?
                                    <div className="HourglassBottom-Icon"><HourglassBottomIcon /></div> :
                                    <img src={Greencheck} alt="Checked Icon" />}
                            </span>
                        </label>
                        <p className={agreement.buyerTradeTransferConfirmation_STATUS ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Buyer's confirmation on receiving shares</p>
                    </div>
                </div>




                <div className="buyeragreement_completetransactionsteps">
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-7" name="color7" value="Transaction-7"
                            checked={agreement.trusteeApprovalStatus || agreement.buyerTradeTransferConfirmation_STATUS}
                            disabled />
                        <label for="Transaction-7">
                            <span className="agreement-Greenuncheck-icon">
                                {!agreement.trusteeApprovalStatus ?
                                    <div className="HourglassBottom-Icon"><HourglassBottomIcon /></div> :
                                    <img src={Greencheck} alt="Checked Icon" />}
                            </span>
                        </label>
                        <p className={agreement.trusteeApprovalStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Verification by Trustee</p>
                    </div>
                </div>
                {/*<div className="buyeragreement_completetransactionsteps">*/}
                {/*    <div className="custom-radios d-flex align-items-center">*/}
                {/*        <input type="radio" id="Transaction-8" name="color8" value="Transaction-8" checked={agreement.uaApprovalStatus}*/}
                {/*               disabled />*/}
                {/*        <label for="Transaction-8">*/}
                {/*        <span>*/}
                {/*            <img src={Greencheck} alt="Checked Icon" />*/}
                {/*        </span>*/}
                {/*        </label>*/}
                {/*    <p className="m-0">Transactions confirmed by Unlisted Assets</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="buyeragreement_completetransactionsteps" style={{ borderBottom: "1px solid #CFCBCF", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
                    <div className="custom-radios d-flex align-items-center">
                        <input type="radio" id="Transaction-9" name="color9" value="Transaction-9"
                            checked={agreement.trusteeApprovalStatus || (agreement.buyerTradeTransferConfirmation_STATUS)}
                            disabled />
                        <label for="Transaction-9">
                            <span className="agreement-Greenuncheck-icon">
                                {!agreement.trusteeApprovalStatus ?
                                    // <img src={warning} alt="Checked Icon" className="img-fluid" />
                                    <div className="HourglassBottom-Icon"><HourglassBottomIcon /></div> :
                                    <img src={Greencheck} alt="Checked Icon" />}
                            </span>
                        </label>
                        <p className={agreement.trusteeApprovalStatus ? "agreement-steps-checked" : "agreement-steps-unchecked"}>Transaction Complete</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BuyerAgreementRightHalf