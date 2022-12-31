import React, { useEffect, useState, useRef } from "react";
import PhoneEmail from "./PhoneEmail.svg";
import { apiCall } from "../../Utils/Network";
import ChoosePhoto from "./choosePhoto";
import Buttons from "../../Components/Buttons";
import {
  successToast,errorToast
} from "../../../src/Components/Toast/index";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MobileVerification from "../../Pages/MobileVerification/index";
import mobileVerificationMainImage from "../../Pages/MobileVerification/mobile_verification.png"
import { Link } from "react-router-dom";
import smallGreenCheck from "../Signup/green_check_small_filled.png"
import smallRedCross from "../Signup/red_cross_circle_filled.png"
import '../Companies/bootstrap4/css/bootstrap.scoped.css';
import './Index_Profile.css'
import DateFnsUtils from '@date-io/date-fns';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Box } from "@material-ui/core";
function Profile({props , Submitnextpage }) {

  const closeMobileVerification = () =>{
    setOpen(false)
  }

  const [details, setDetails] = useState({});
  const [profileaddress,setProfileaddress]= useState({});
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    const responseAddress = await apiCall("useronboarding/address", "GET")

    let responseJSON = await response.json();
    let responseAddressJSON = await responseAddress.json();
    // console.log(responseAddressJSON)
    setDetails(responseJSON);
    setProfileaddress(responseAddressJSON)

    
  }

  async function updateProfile() {

    const response = await apiCall(
      "useronboarding/accountonboarding",
      "PUT",
      details
    );
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    const responseJSON = await response.json();
    const responseAddress = await apiCall("useronboarding/address/"+responseJSON.addressId,"PUT",profileaddress);
  }
  const [emailtext,setEmailtext]=React.useState('')
  const [mobiletext,setMobiletext]=React.useState('')
  const [type,setType] = React.useState(null);

  const [sendstate,setSendstate] = React.useState("")


  const emailVerify = async function(){
          setType("email");
  let response = await apiCall("profile/sendotponemailloggedin","POST")
    // console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Email ID Does not exists");
                setLoadingbtn(false);

                return;
            }else if (response.status === 200){
              setEmailtext('Verification link has been sent to your email address, please verify')
                successToast("Success","Email sent to your mail ID please check")
                setOpen(true)
                setLoadingbtn(false);
            }
  }
  const mobileVerify = async function(){

    setType("mobile");

    let response = await apiCall("profile/sendotponmobileloggedin","POST")
      // console.log("apicalled",response)
              if (response.status !== 200) {
                  errorToast("Invalid", "Mobile Number Does not exists");
                  return;
              }else if (response.status === 200){
                setMobiletext('Verify your mobile number with otp verification')
                successToast("Success","OTP sent to your mobile please check")
                setOpen(true)
              }

    }
  function onUserInput(field, val) {
    details[field] = val;
    setDetails({ ...details });

  }
  function addressInput(field, val){
    profileaddress[field] = val;
    setProfileaddress({ ...profileaddress })
  }
  function submit() {
    setLoadingbtn(true);
    updateProfile();
    successToast("Success", "Profile successfully edited");
    setLoadingbtn(false);
    
    Submitnextpage()
  }

  const callbackfunc = () => {
    //setAnythingchanged(!anythingchanged)

    setTimeout(() => {
      window.location.reload();
    },3000)

  }

  async function onFileSelect(file) {
    const img = await convertImgTOBase64(file);
    details["profilePic"] = img;
    setDetails({ ...details });
  }

  function convertImgTOBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      }
    });
  }
// DatePicker
const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }; 


  return (
    <div className="profile_container w-100 row mb-5">
      <div className="col-md-7">
        <h6 className="profile-title mt-1">Let's Add Personal Details</h6>
        <div className="profile-form_container">
          <div className="profile-form_field-photo">
            <img src={details.profilePic} width="50"/>
            <div>
              <p className="m-0 user-name">{details.name}</p>
              <button onClick={() => setOpenPhotoModal(true)} style={{fontSize:"13px"}}>
                Change profile photo
              </button>
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field profile-tooltip-input">
              <label className="my-2 tex-small ">Name*</label>
              <Tooltip title="Will be updated from your Aadhar" arrow placement="top">
                <Button  className="profile-info-button p-0 mx-0">
                  <InfoIcon/>
                </Button>
              </Tooltip>
              <input className="disabled-field "
                disabled
                value={details.name}
                onChange={(e) => onUserInput("name", e.target.value)}
                style={{height:"40px"}}
                className="text-capitalize"
              />
            </div>
            <div className="profile-form_field profile-tooltip-input">
              <label className="my-2 tex-small">User ID*</label>
              <Tooltip title="User ID on Unlisted Assets platform" arrow placement="top">
                <Button  className="profile-info-button p-0 mx-0">
                  <InfoIcon/>
                </Button>
              </Tooltip>
              <input className="disabled-field"
                disabled
                value={details.accountId}
                onChange={(e) => onUserInput("accountId", e.target.value)}
                style={{height:"40px"}} 
              />
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Email*</label>
              <div className="custom-verify-input">
              <input disabled className="disabled-field" style={{border:"none"}}
                value={details.email}
                onChange={(e) => onUserInput("email", e.target.value)}
                
              />
              <span >{details.emailVerified === false?<p style={{margin:"10px", fontSize:"12px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallRedCross}/>}Not Verified</p>:<p style={{margin:"10px", fontSize:"12px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallGreenCheck}/>}Verified</p>} </span>
              </div>
            </div>
          </div>
          {details.emailVerified === false?
          <div className="profile-form_field-container_Redalert">
            <div className="profile-form_field verify-msg">
              <p className="RedAlert_Text">{emailtext}</p>
              <p>Verification link has been send to your email address, please verify.</p>
              <h6 className="RedAlert_Link mt-2" onClick={emailVerify}>Verify Again</h6>
            </div>
          </div>
          : null}
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Mobile Number*</label>
              <div className="custom-verify-input">
              <input disabled className="disabled-field" style={{border:"none"}}
                value={details.mobileNumber}
                onChange={(e) => onUserInput("mobileNumber", e.target.value)}
                
              />
              <span>{details.mobileVerified === false?<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallRedCross}/>}Not Verified</p>:<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallGreenCheck}/>}Verified</p>} </span>
              </div>
            </div>
          </div>
          {details.mobileVerified === false?
          <div className="profile-form_field-container_Redalert">
            <div className="profile-form_field verify-msg">
              <p className="RedAlert_Text">{mobiletext}</p>
              <p>Verification link has been send to your email address, please verify.</p>
              <h6 className="RedAlert_Link mt-2" onClick={mobileVerify}>Verify Again</h6>
            </div>
          </div>
          :null }
          {/*<div>*/}
          {/*  <div>*/}
          {/*    <p className="text-small my-2">Get your Notification Via</p>*/}
          {/*   */}
          {/*    <div className="profile-form_field-container">*/}
          {/*      <div className="profile-form_field-radio ">*/}
          {/*        <div className="customRadio w-100">*/}
          {/*            <input className="radio-control" id="email" type="radio" value="email" name="notification_via" checked={details.notificationsChoice === "email"}*/}
          {/*            onChange={() => onUserInput("notificationsChoice", "email")}/>*/}
          {/*            <label className="m-0" htmlFor="email"> Email <span className="checkmark" /></label>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="profile-form_field-radio">*/}
          {/*        <div className="customRadio w-100">*/}
          {/*          <input className="radio-control" id="sms" type="radio" value="sms" name="notification_via" checked={details.notificationsChoice === "sms"}*/}
          {/*          onChange={() => onUserInput("notificationsChoice", "sms")}/>*/}
          {/*            <label className="m-0" htmlFor="sms"> SMS <span className="checkmark" /></label>*/}
          {/*        </div>*/}

          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          
            {/*<div className="mt-3">*/}
            {/*  <p className="text-small my-2">Are you subject to individual tax audit in the FY 20-21?</p>*/}
            {/*  <div className="profile-form_field-container">*/}
            {/*    <div className="profile-form_field-radio ">*/}
            {/*      <div className="customRadio w-100">*/}
            {/*          <input className="radio-control" id="yes" type="radio" value="yes" name="tax_audit" */}
            {/*          />*/}
            {/*          <label className="m-0" htmlFor="yes"> Yes <span className="checkmark" /></label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="profile-form_field-radio " >*/}
            {/*      <div className="customRadio w-100">*/}
            {/*        <input className="radio-control" id="no" type="radio" value="no" name="tax_audit" */}
            {/*        />*/}
            {/*          <label className="m-0" htmlFor="no"> No <span className="checkmark" /></label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
         
          
          <div className="profile-form_field-container mb-0">
            <div className="profile-form_field date_picker profile-tooltip-input">
              <label className="mt-3 tex-small">Date of Birth (as per Aadhar)*</label>
              <div className="d-flex align-items-center">
                <Tooltip title="User ID on Unlisted Assets platform" arrow placement="top">
                  <Button  className="profile-info-button-aadhar p-0 mx-0">
                    <InfoIcon/>
                  </Button>
                </Tooltip>
                <input value={details.dob} disabled className="w-100 disabled-field"
                      onChange={(e) =>
                          onUserInput("dob", e.target.value)
                      } style={{height:"40px"}} />
              </div>
              
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >*/}
                    {/*    <KeyboardDatePicker*/}
                    {/*      disableToolbar*/}
                    {/*      variant="inline"*/}
                    {/*      format="MM/dd/yyyy"*/}
                    {/*      margin="normal"*/}
                    {/*      id="date-picker-inline"*/}
                    {/*      label="Date picker inline"*/}
                    {/*      KeyboardButtonProps={{*/}
                    {/*        'aria-label': 'change date',*/}
                    {/*      }}*/}
                    {/*      style={{marginTop:"0"}}*/}
                    {/*      value={details.dob}*/}
                    {/*      onChange={(e) =>*/}
                    {/*      onUserInput("dob", e)*/}
                    {/*      }*/}
                    {/*    />*/}
                    {/*</MuiPickersUtilsProvider>*/}
            </div>
          </div>
          <div className="profile-form_field-container mt-0">
            <div className="profile-form_field profile-tooltip-input">
              <label className="my-2 tex-small">Father/Mother's Name (as per Aadhar)*</label>
              <Tooltip title="User ID on Unlisted Assets platform" arrow placement="top">
                <Button  className="profile-info-button p-0 mx-0">
                  <InfoIcon/>
                </Button>
              </Tooltip>
              <input className="disabled-field"
                  disabled
                value={details.spouseFatherName}
                onChange={(e) =>
                  onUserInput("spouseFatherName", e.target.value)
                }
                style={{height:"40px"}}
              />
            </div>
          </div>
          <h6 className="profile-title mt-2">Add Your Address Details</h6>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Address*</label>
              <textarea value={profileaddress.address} 
                onChange={(e) => addressInput("address", e.target.value)}
                ></textarea>
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Country*</label>
              <input disabled className="disabled-field text-capitalize" value={profileaddress.country}
              onChange={(e) => addressInput("country", e.target.value)}
              style={{height:"40px"}}
              />
            </div>
            <div className="profile-form_field">
              <label className="my-2 tex-small ">City*</label>
              <input value={profileaddress.city} className="text-capitalize"
              onChange={(e) => addressInput("city", e.target.value)}
              style={{height:"40px"}}
              />              
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">State*</label>
              <input value={profileaddress.state} className="text-capitalize"
              onChange={(e) => addressInput("state", e.target.value)}
              style={{height:"40px"}}
              />
            </div>
            <div className="profile-form_field">
              <label className="my-2 tex-small">Pin code*</label>
              <input type="number" value={profileaddress.pincode}
              onChange={(e) => addressInput("pincode", e.target.value)}
              style={{height:"40px"}}
              />
            </div>
          </div>
          <hr />

          <div className="profile-form_field-btn-container">
            <Buttons.PrimaryButton value="Cancel"  style={{margin:"5px"}}/>
            {!isLoadingbtn && (
              <Buttons.SecondaryButton value="Submit" onClick={submit} style={{margin:"5px"}}/>
            )}
            {isLoadingbtn && (
              <Loadbutton />
            )}
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="my-card mt-5">
          <div className="profile-right-banner">
            <img src={PhoneEmail} width="100"/>
            <p className="mt-3"><strong>Why Phone number and E-mail id?</strong></p>
            <p>
              We feel this is one of the fastest ways to communicate with you
              and update you with all the information about your transaction and
              shortlisted companies.
            </p>
          </div>
        </div>
      </div>
      <ChoosePhoto
        open={openPhotoModal}
        close={() => setOpenPhotoModal(false)}
        onFileSelect={onFileSelect}
      />
      <Dialog
        style={{height:"100vh"}}
        open={open}
        onClose={() => { setOpen(false) }}
        >

        <MobileVerification type={type}
                             closeMobileVerification1={closeMobileVerification}
                             callbackfunc={callbackfunc}
         />
      </Dialog>
    </div>
  );
}

export default Profile;
