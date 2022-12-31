import React, { useState, useEffect } from "react";
import "./tradereadystep7.css"
import bank from "./Bank.png"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "../../Components/Buttons"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiCall } from "../../Utils/Network";
import UploadIcon from "../../assets/upload_icon.svg";
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as TooltipIcon } from './TooltipIcon.svg'
import Alert from '@mui/material/Alert';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// profile 
import PhoneInput from 'react-phone-number-input'
// Risk profile
import "../RiskProfileQuestions/riskProfileQuestions.css"
import GreenCheckIcon from "../RiskProfileQuestions/GreenCheck.svg";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";

import {
    successToast, errorToast
} from "../../../src/Components/Toast/index";
// import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css'; 
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import StepRiskIcon from "./risk.svg";
import StepCompleteIcon from "./modal-notice.svg";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem', color: '#721B65' }} />}

        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: '',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const useStyles = makeStyles((theme) => ({
    FormControl: {
        marginLeft: "7px",
        justifyContent: "space-between",
        paddingLeft: "10px"
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
    }
}))

const handletryagain = () => {
    // // console.log("aaaahandletryagain")
}

let KYCDetails = (props) => {
    const classes = useStyles()
    let history = useHistory();

    const [details, setDetails] = useState({});
    const [profileaddress, setProfileaddress] = useState({});
    const [bankDetails, setbankDetails] = useState({});
    const [dmatDetails, setdmatDetails] = useState({});
    const [riskProfile, setriskProfile] = useState({});


    const [editrequest, setEditrequest] = useState(true);
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        getProfile()
        bankdetails()
        callDmat()
        getRiskProfile()
    }, [])

    async function getProfile() {
        const response = await apiCall("useronboarding/accountonboarding", "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseAddress = await apiCall("useronboarding/address", "GET")
        let responseJSON = await response.json();
        // // console.log("bbbbbbbb", responseJSON)
        let responseAddressJSON = await responseAddress.json();
        setDetails(responseJSON);
        // console.log("details", responseJSON)
        setProfileaddress(responseAddressJSON)
    }

    async function getRiskProfile() {
        const response = await apiCall("useronboarding/risk", "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        // // console.log('responseJSONppppppp'+responseJSON.id);
        setriskProfile(responseJSON)
        console.log('riskProfiletest', riskProfile);
        if (riskProfile == '') {
            setOpenConfirmation(false);
            return;
        } else {
            // setOpenConfirmation(true);
            confirmationModal()
        }
    }

    const bankdetails = async function () {
        const response = await apiCall("useronboarding/bankdetail/false", 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const bankresponseJSON = await response.json()
        setbankDetails(bankresponseJSON)
        // console.log("bank details", bankresponseJSON)
    }

    const callDmat = async function () {
        let response = await apiCall("useronboarding/dmat", 'GET', '', history)
        let responseJSON = await response.json()
        // console.log("demat detials", responseJSON)
        setdmatDetails(responseJSON)
    }

    const requestToedit = () => {
        setEditrequest(false)
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Dialogbox = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >

                <div className="addcompanyrequest px-2 py-2">
                    <div className="addcompanyrequest_container">
                        <div className="text-center">
                            <h5><b>Congratulations!!</b></h5>
                            <p className="m-0 text-small">Your UserName and Password has been sent to your email!!</p>
                        </div>
                        <div className="addcompanyrequest_buttonContainer text-center mt-4">
                            <Buttons.SecondaryButton value="CANCEL" onClick={handleClose} style={{ width: "50%", margin: "0px 5px" }} />
                            <Buttons.PrimaryButton value="LOGIN" onClick={handleClose} style={{ width: "50%", margin: "0px 5px" }} />
                        </div>
                    </div> 
                </div>
            </Dialog>
        )
    }

    function addressInput() {
        // // console.log("get profile data")

    }

    console.log("details", details);

    const [openConfirmation, setOpenConfirmation] = React.useState(false); 

    const handleCloseConfirmation = () => setOpenConfirmation(false);

    const confirmationModal = () => {
        if(localStorage.getItem('riskProfileModal') != 'shown'){
            setOpenConfirmation(true)
            localStorage.setItem('riskProfileModal','shown')
        }         
    };

    console.log("pan", details.panNumberVerificationStatus);
    console.log("aadhar", details.aadharNumberVerificationStatus);

   


    return (
        // <div className="container-fluid " id="BankVerification">
        <div className="row">
            <div className="col-md-12 col-12 px-4 mb-4 tradereadystep7-main">
                <div className="">
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography><h6 >Personal Details:</h6></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div className="">
                                    <div className="">
                                        <div className="profile-form_container">
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field profile-tooltip-input">
                                                    <label className="my-2 tex-small ">Full name</label>
                                                    <input className="text-capitalize disabled-field "
                                                        disabled={details.name}
                                                        value={details.name}
                                                        // onChange={(e) => onUserInput("name", e.target.value)}
                                                        style={{ height: "34px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <label className="my-2 tex-small">User ID*</label>
                                                    <input className="disabled-field"
                                                        disabled
                                                        value={details.accountId}
                                                        // onChange={(e) => onUserInput("accountId", e.target.value)}
                                                        style={{ height: "34px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field profile-tooltip-input">
                                                    <label className="my-2 tex-small">Email</label>
                                                    <input disabled className="text-capitalize disabled-field" style={{ border: "none", height: "34px" }}
                                                        value={details.email}
                                                    // onChange={(e) => onUserInput("email", e.target.value)}

                                                    />


                                                </div>
                                            </div>


                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <label className="my-2 tex-small">Mobile Number</label>
                                                    <div className="profile-form_field-PhoneInput detail-page-disbaleinput">
                                                        <PhoneInput
                                                            className="default-PhoneInput disabled-field"
                                                            disabled={true}
                                                            defaultCountry="IN"
                                                            value={details.mobileNumber}
                                                        // onChange={(e) => onUserInput("mobile", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="tradeready-horizontalrow"></div> */}
                                            {/* <h6 className="profile-title mt-2">Add Your Address Details</h6> */}
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <form className="w-100">
                                                        <label className="Trade_ready_step_3_Label my-2 text-small">Residentship</label>

                                                        <input disabled className="text-capitalize disabled-field" style={{ border: "none", height: "34px" }}
                                                            value={details.residentStatus}
                                                        // onChange={(e) => onUserInput("email", e.target.value)}

                                                        />
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <label className="my-2 tex-small">Address</label>
                                                    <textarea
                                                        className=" disabled-field"
                                                        disabled
                                                        value={profileaddress.address}
                                                        onChange={(e) => addressInput("address", e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field" >
                                                    {/* <form className="w-100 customselect" >
                                                    <label className="Trade_ready_step_3_Label my-2 text-small">State</label>
                                                    <CustomSelect value={character} onChange={setCharacter}>
                                                        {characters.map((c) => (
                                                            <StyledOption key={c.name} value={c}>
                                                                {c.name}
                                                            </StyledOption>
                                                        ))}
                                                    </CustomSelect>
                                                </form> */}
                                                    <label className="my-2 tex-small">State</label>
                                                    <input value={profileaddress.state} className="text-capitalize disabled-field"
                                                        disabled
                                                        onChange={(e) => addressInput("state", e.target.value)}
                                                        style={{ height: "34px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <label className="my-2 tex-small ">City</label>
                                                    <input value={profileaddress.city} className="text-capitalize disabled-field"
                                                        onChange={(e) => addressInput("city", e.target.value)}
                                                        disabled
                                                        style={{ height: "34px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile-form_field-container">
                                                <div className="profile-form_field">
                                                    <label className="my-2 tex-small">Pin code</label>
                                                    <input className="disabled-field"
                                                        disabled
                                                        type="number" value={profileaddress.pincode}
                                                        onChange={(e) => addressInput("pincode", e.target.value)}
                                                        style={{ height: "34px" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="py-4 d-flex justify-content-between">*/}
                                {/*    <div className="w-100 tradeready-action-button">*/}
                                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                {/*    </div>*/}
                                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                                {/*</div>*/}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tradeready-horizontalrow"></div>

                <div className="">
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">

                            <Typography><h6 >Bank Account Details:</h6></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <form className="w-100 BankAccountTab-form">
                                    <label className="Trade_ready_step_2_Label my-2 text-small">Bank Account Number</label>
                                    <input type="text" disabled={true} className={"disabled-field"}
                                        name="accountnumber" value={bankDetails.accountNumber} />
                                    <label className="m-0 my-2 text-small">IFSC Code</label>
                                    <input type="text" disabled={true} className={"disabled-field"}
                                        name="ifsc" value={bankDetails.ifscCode} />
                                    <label className="m-0 my-2 text-small">Bank Name</label>
                                    <input type="text" disabled={true} className={"disabled-field"}
                                        name="bankname" value={bankDetails.bankName} />
                                    <label className="m-0 my-2 text-small">Branch Name</label>
                                    <input type="text" disabled={true} className={"disabled-field"}
                                        name="branchname" value={bankDetails.branchName} />
                                </form>
                                {/*<div className="py-4 d-flex justify-content-between">*/}
                                {/*    <div className="w-100 tradeready-action-button">*/}
                                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                {/*    </div>*/}
                                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                                {/*</div>*/}

                                <div className="py-4 d-flex justify-content-between">
                                    {/*<div className="w-100 tradeready-action-button">*/}
                                    {/*    <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                    {/*</div>*/}
                                    {!(bankDetails.uaVerifiedStatus == "Verified") ?
                                        <Buttons.SecondaryButton value="Bank Detail Verification - Try Again" onClick={
                                            () => props.tryagaincallback("bankdetail")
                                        } /> : null}

                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tradeready-horizontalrow"></div>

                <div className="">
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography><h6 style={{ fontFamily: "Montserrat" }}>Demat Account Details:</h6></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <form className="w-100">

                                    <label className="Trade_ready_step_3_Label my-2 text-small">Depository Name</label>
                                    <input type="text" disabled={true} className={"disabled-field"}
                                        name="Depository" value={dmatDetails.depositoryName} />

                                    <label className="m-0 my-2 text-small">Broker Name</label>
                                    <input type="text" className="p-2 text-small w-100 disabled-field" disabled

                                        name="brokername" value={dmatDetails.brokerName}
                                    />
                                    {dmatDetails.depositoryName == "NSDL" ? <>
                                        <label className="m-0 my-2 text-small">DP ID</label>
                                        <input disabled={true} type="text" className="p-2 text-small disabled-field"
                                            name="dpid" maxLength="8" value={dmatDetails.dpId}
                                        />
                                        <label className="m-0 my-2 text-small">Client ID</label>
                                        <input disabled={true} type="text" className="p-2 text-small disabled-field"
                                            name="dpid" maxLength="8" value={dmatDetails.clientId}
                                        />
                                    </>
                                        :
                                        <>
                                            <label className="m-0 my-2 text-small">BO ID</label>
                                            <input disabled={true} type="text" className="p-2 text-small disabled-field "
                                                name="boid" maxlength="16" value={dmatDetails.boId}
                                            />
                                        </>

                                    }

                                </form>
                                {/*<div className="py-4 d-flex justify-content-between">*/}
                                {/*    <div className="w-100 tradeready-action-button">*/}
                                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                {/*    </div>*/}
                                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                                {/*</div>*/}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tradeready-horizontalrow"></div>

                <div className="">
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography><h6 style={{ fontFamily: "Montserrat" }}>Share Transfer Process Preference</h6>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <form className="w-100">
                                    <label className="m-0 my-2 text-small">NSDL account</label>
                                    <input disabled={true} type="text" className="p-2 text-small disabled-field "
                                        name="nsdlAccount" maxlength="16" value={details.nsdlAccount} />
                                </form>
                                {/*<div className="py-4 d-flex justify-content-between">*/}
                                {/*    <div className="w-100 tradeready-action-button">*/}
                                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                {/*    </div>*/}
                                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                                {/*</div>*/}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tradeready-horizontalrow"></div>

                <div className="">
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                            <Typography><h6 style={{ fontFamily: "Montserrat" }}>KYC Details</h6>

                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <p className={(details.panNumberVerificationStatus == "Verified") ? "text-small Verified" : "text-small notVerified"} style={{ fontFamily: "Montserrat", color: "red" }}>Pan Verification Status : {details.panNumberVerificationStatus} </p>

                                <p className={(details.aadharNumberVerified == true) ? "text-small Verified" : "text-small notVerified"} >Aadhar Verification Status: {details.aadharNumberVerificationStatus}</p>

                                <form className="w-100 ">
                                    <label className="Trade_ready_step_5_Label text-small m-0 mt-2">PAN Number</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        name="pannumber"
                                        // onChange={(e) => setPanNumber(e.target.value)}
                                        value={details.panNumber}
                                        className={"text-small mt-2 p-2 disabled-field"}
                                    />
                                    {/* {!details.panNumber?

                                     <div className="detailpage-pancard-alert mt-3">           
                                        <div className="row">
                                            <div className="col-md-1 col-2 default-padding-mobileview"><PriorityHighIcon/></div>
                                            <div className="col-md-8 col-10">
                                                <h5>PAN Verification unsucessful.</h5>
                                            </div>                                            
                                        </div>  
                                        <div className="row">
                                            <div className="col-md-12 detailpage-pancard-alert-link "><a href="#" className="text-end">Try Again</a></div>
                                        </div>                                         
                                    </div> 
                                    :
                                    <div className="detailpage-pancard-alert unsucessful-alert mt-3">           
                                        <div className="row">
                                            <div className="col-md-1 col-2 default-padding-mobileview"><DoneAllIcon/></div>
                                            <div className="col-md-8 col-10">
                                                <h5>PAN Verification Sucessful.</h5>
                                            </div>                                            
                                        </div>                                                                                 
                                    </div>} */}


                                    {/* <div className="profile-nonindian-Alert">           
                                        <Alert severity={false} color="error">
                                            <div className="row">
                                                <div className="col-md-1 col-2 default-padding-mobileview"><PriorityHighIcon/></div>
                                                <div className="col-md-11 col-10">
                                                The platform currently supports Resident Indian Citizens to transact online. If you are a Non Resident, you can reach out for an offline transaction by submitting your requirement through "Services" section "Hire a Broker".*****</div>
                                            </div>
                                        </Alert>
                                    </div>  */}

                                    <label className="Trade_ready_step_5_Label text-small m-0 mt-2">Aadhar Number</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        name="aadharNumber"
                                        // onChange={(e) => setPanNumber(e.target.value)}
                                        value={details.aadharNumberVerified ? "xxxx-xxxx-xxxx" : null}
                                        className={"text-small mt-2 p-2 disabled-field"}

                                    />
                                    {/* {!details.aadharNumber?
                                    <div className="detailpage-pancard-alert mt-3">           
                                        <div className="row">
                                            <div className="col-md-1 col-2 default-padding-mobileview"><PriorityHighIcon/></div>
                                            <div className="col-md-8 col-10">
                                                <h5>Aadhar Number Verification unsucessful.</h5>
                                            </div>                                            
                                        </div>  
                                        <div className="row">
                                            <div className="col-md-12 detailpage-pancard-alert-link "><a href="#" className="text-end">Try Again</a></div>
                                        </div>                                         
                                    </div> :
                                    <div className="detailpage-pancard-alert unsucessful-alert mt-3">           
                                        <div className="row">
                                            <div className="col-md-1 col-2 default-padding-mobileview"><DoneAllIcon/></div>
                                            <div className="col-md-8 col-10">
                                                <h5>Aadhar Number Verification Sucessful.</h5>
                                            </div>                                            
                                        </div>                                                                                 
                                    </div> } */}
                                </form>
                                <div className="py-4 d-flex justify-content-between">
                                    {/*<div className="w-100 tradeready-action-button">*/}
                                    {/*    <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                    {/*</div>*/}
                                    {!(details.panNumberVerificationStatus == "Verified") ?
                                        <Buttons.SecondaryButton value="PAN Verification - Try Again" onClick={
                                            () => props.tryagaincallback("pan")
                                        } /> : null}

                                    {!details.aadharNumberVerified ?
                                        <Buttons.SecondaryButton value="Aadhar-Phone Linkage Verification - Try Again" onClick={
                                            () => props.tryagaincallback("aadhar")
                                        } /> : null}
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="tradeready-horizontalrow"></div>


                <div className="">
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                            <Typography><h6 style={{ fontFamily: "Montserrat" }}>Risk Profile</h6>

                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>

                                <div className="">
                                    {/*<h5 class="title">Questions</h5>*/}
                                    {/*<p class="text-small">Please answer the following questions to help us determine your risk tolerance.</p>*/}
                                    <div className="question border-bottom pt-3 pb-3">
                                        <div className="d-flex align-items-center ">
                                            <img src={GreenCheckIcon} className="m-2" />
                                            <h6 className="m-0 text-small"><b>1. Have you invested in Unlisted Shares before? *</b></h6>
                                        </div>
                                        <div className="actions p-2">
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment1}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="Yes" aria-label="Yes " disabled>
                                                    Yes
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="No" aria-label="no" disabled>
                                                    No
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </div>
                                    </div>
                                    <div className="question border-bottom pt-3 pb-3">
                                        <div className="d-flex align-items-center ">
                                            <img src={GreenCheckIcon} className="m-2" />
                                            <h6 className="m-0 text-small"><b>2. What describes you the most in relation to unlisted stocks </b></h6>
                                        </div>
                                        <div className="actions p-2">
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment2}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="Individual Investor" aria-label="Individual Investor">
                                                    Individual Investor
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="Company" aria-label="Company">
                                                    Company
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            <ToggleButtonGroup
                                                value={details.currentAlignment2}
                                                exclusive
                                            >

                                                <ToggleButton className='answer-btn' value="HUF" aria-label="HUF">
                                                    HUF
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="Institution" aria-label="Institution">
                                                    Institution
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </div>
                                    </div>
                                    <div className="question border-bottom pt-3 pb-3">
                                        <div className="d-flex align-items-center ">
                                            <img src={GreenCheckIcon} className="m-2" />
                                            <h6 className="m-0 text-small"><b>3. What is your networth? </b></h6>
                                        </div>
                                        <div className="actions p-2">
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment3}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="0-5 Lakhs" aria-label="0-5 Lakhs">
                                                    0-5 Lakhs
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="0-15 Lakhs" aria-label="0-15 Lakhs">
                                                    0-15 Lakhs
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="15-50 Lakhs" aria-label="15-50 Lakhs">
                                                    15-50 Lakhs
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment3}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="50-100 Lakhs" aria-label="50-100 Lakhs">
                                                    50-100 Lakhs
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="1 Crore" aria-label="1 Crore">
                                                    1 Crore
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </div>
                                    </div>
                                    <div className="question border-bottom pt-3 pb-3">
                                        <div className="d-flex align-items-center ">
                                            <img src={GreenCheckIcon} className="m-2" />
                                            <h6 className="m-0 text-small"><b>4. How do you take your investment descisions  </b></h6>
                                        </div>
                                        <div className="actions p-2">
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment4}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="Self research" aria-label="Self research">
                                                    Self research
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="Professional Guidance" aria-label="Professional Guidance">
                                                    Professional Guidance
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment4}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="Banker" aria-label="Banker">
                                                    Banker
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </div>
                                    </div>
                                    <div className="question border-bottom pt-3 pb-3">
                                        <div className="d-flex align-items-center ">
                                            <img src={GreenCheckIcon} className="m-2" />
                                            <h6 className="m-0 text-small"><b>5. Do you want professional guidance / study material for investing in unlisted shares? </b></h6>
                                        </div>
                                        <div className="actions p-2">
                                            <ToggleButtonGroup
                                                value={riskProfile.currentAlignment5}
                                                // onChange={(e, newAlignment) => onUserInput("currentAlignment5", newAlignment)}
                                                exclusive
                                            >
                                                <ToggleButton className='answer-btn' value="Yes" aria-label="Yes ">
                                                    Yes
                                                </ToggleButton>
                                                <ToggleButton className='answer-btn' value="No" aria-label="no">
                                                    No
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="py-4 d-flex justify-content-between">*/}
                                {/*    <div className="w-100 tradeready-action-button">*/}
                                {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
                                {/*    </div>*/}
                                {/*    <Buttons.SecondaryButton value="Try Again" onClick={handleClickOpen} />*/}
                                {/*</div>*/}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            {/*<div className="w-100 px-4">*/}
            {/*    {editrequest ? <div className="d-flex  tradeready-action-button">*/}
            {/*        <Buttons.SecondaryButton value="Request To Edit" onClick={requestToedit} />*/}
            {/*    </div> :*/}

            {/*        <div className="tradeready-action-Alert">*/}

            {/*            /!* <Alert severity={false} color="error">*/}
            {/*                <LightbulbOutlinedIcon/>*/}
            {/*                Edit request recieved. Our team will get in touch with you shortly!*/}
            {/*            </Alert>  *!/*/}

            {/*            <Alert severity={false} color="error">*/}
            {/*                <div className="row">*/}
            {/*                    <div className="col-md-1 col-2 default-padding-mobileview"><LightbulbOutlinedIcon /></div>*/}
            {/*                    <div className="col-md-11 col-10">*/}
            {/*                        Edit request recieved. Our team will get in touch with you shortly!</div>*/}
            {/*                </div>*/}
            {/*            </Alert>*/}
            {/*        </div>}*/}
            {/*</div>*/}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >

                <div className="addcompanyrequest px-2 py-2">
                    <div className="addcompanyrequest_container">
                        <div className="text-center">
                            <h5><b>Try Again!!</b></h5>
                            <p className="m-0 text-small">Are you sure to Correct or Refill tha form!!</p>
                        </div>
                        <div className="addcompanyrequest_buttonContainer text-center mt-4">
                            <Buttons.SecondaryButton value="Cancel" onClick={handleClose} style={{ width: "50%", margin: "0px 5px" }} />
                            <Buttons.PrimaryButton value="Confirm" onClick={handleClose} style={{ width: "50%", margin: "0px 5px" }} />
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* Steps Complete Indicator Popup */}
            {
                riskProfile && details && profileaddress && bankDetails && dmatDetails ?
                    <div>
                        <Dialog
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="addcompanyrequest px-2 py-2">
                                <div className="addcompanyrequest_container px-4">
                                    <div className="text-center">
                                        <img src={StepRiskIcon} className="m-2 my-3" />
                                        <h5>
                                            {riskProfile ? <b>Your Risk Profile Is Complete!</b> : null
                                            }
                                        </h5>
                                        {riskProfile ?
                                            <p className="m-0 text-small">
                                                Your Risk Profile will help us optimise the experience for you! You’re now ready to buy or sell unlisted stocks with us.
                                            </p>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="row  mt-3 d-flex justify-content-center">
                                        <div className="col-md-6 col-12 d-flex justify-content-center mt-3">
                                        <Link className="w-100" to="/inventory_1">
                                            <Buttons.PrimaryButton
                                                value="Explore the marketplace"
                                                style={{ width: "100%", margin: "0px 5px" }}
                                            />
                                        </Link>
                                        </div>
                                    </div>

                                    {/* <div className="addcompanyrequest_buttonContainer text-center mt-5 d-flex justify-content-center">

                                        <Link className="w-100 m-auto d-flex justify-content-center" to="/inventory_1">
                                            <Buttons.PrimaryButton
                                                value="Explore the marketplace"
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>

                                    </div> */}
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    : null
            }

            {
                details && profileaddress && bankDetails && dmatDetails && !riskProfile ?
                    <div>
                        <Dialog
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="addcompanyrequest px-2 py-2">
                                <div className="addcompanyrequest_container px-4">
                                    <div className="text-center">
                                        <img src={StepCompleteIcon} className="m-2 my-3" />
                                        <h5>
                                            {riskProfile ? <b>Your Trade Ready Steps Are Complete!</b> : null
                                            }
                                        </h5>
                                        {riskProfile ?
                                            <p className="m-0 text-small">
                                                You’re now ready to buy or sell unlisted stocks with us. To optimise your experience complete your risk profile.
                                            </p>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="addcompanyrequest_buttonContainer text-center mt-5 d-flex justify-content-center">
                                        <Link to="/inventory_1">
                                            <Buttons.SecondaryButton
                                                value="Explore the marketplace"
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>
                                        <Link to="/profilewig">
                                            <Buttons.PrimaryButton
                                                value="Create my risk profile "
                                                style={{ width: "50%", margin: "0px 5px" }}
                                            />
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    : null
            }



        </div>
        // </div>

    )
}
export default KYCDetails;