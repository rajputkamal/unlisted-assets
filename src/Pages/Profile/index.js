import React, { useEffect, useState, useRef } from "react";
import PhoneEmail from "./PhoneEmail.svg";
import Profileuserpiclogo from "./Profileuserpiclogo.png";
import { apiCall, apiCall1 } from "../../Utils/Network";
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
import smallGreenCheck from "../Signup/Assets/green_check_small_filled.png"
import smallRedCross from "../Signup/Assets/red_cross_circle_filled.png"
import '../Companies/bootstrap4/css/bootstrap.scoped.css';
import './Index_Profile.css'
import DateFnsUtils from '@date-io/date-fns';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Box } from "@material-ui/core";


// for city select 
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';


const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  width: 100%;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  width: 100%;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  width: 95%;
`;

const Paragraph = styled('p')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  margin: 10px 0;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

const Pre = styled('pre')(
  ({ theme }) => `
  font-family: monospace;
  font-size: 0.875rem;
  margin: 0px;  
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(0, 30, 60, 0.5)' : grey[50]
  };
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
};

const characters = [
  { name: "Andaman and Nicobar"},
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh"  },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chandigarh" },
  { name: "Chhattisgarh" },
  { name: "Dadra and Nagar Haveli" },
  { name: "Daman and Diu" },
  { name: "Delhi" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jammu and Kashmir" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Lakshadweep" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Orissa" },
  { name: "Puducherry" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
];

// end here 


function Profile({props , Submitnextpage }) { 

  const [character, setCharacter] = React.useState(characters[0]);
  // const [value, setValue] = useState()
  const [details, setDetails] = useState({});
  const [profileaddress,setProfileaddress]= useState({});
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  const [emailtext,setEmailtext]=React.useState('')
  const [mobiletext,setMobiletext]=React.useState('')
  const [type,setType] = React.useState(null);

  const [sendstate,setSendstate] = React.useState("")
  const [editrequest, setEditrequest] = useState(false);
  const [nonindian, setNonindian] = useState(true);
  const [profilesubmited, setProfilesubmited] = React.useState(false);
  // const [getImg,setGetImg] = useState(details.profilePicture)

// DatePicker
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [pic, setpic] = React.useState();


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
    //console.log("bbbbbbbb",responseJSON)

    let responseAddressJSON = await responseAddress.json();

    setDetails(responseJSON);

    setpic(responseJSON.profilePicture)
    setProfileaddress(responseAddressJSON)

    if(responseJSON.residentStatus == 'India') {
      Submitnextpage() // move to the next page
      setNonindian(false)
      //console.log("aass",details.residentStatus)
    } else {
      setNonindian(true)
      //console.log("aass1",details.residentStatus)
      // in all cases, it should display you can not move further
    }

  }

  //console.log("profile address",profileaddress)

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



  const closeMobileVerification = () =>{
    setOpen(false)
  }

  const requestToedit = () =>{
    setEditrequest(false)
}

  const emailVerify = async function(){
          setType("email");
  let response = await apiCall("profile/sendotponemailloggedin","POST")
    //console.log("apicalled",response)
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
      //console.log("apicalled",response)
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
    requestToedit()

    setProfilesubmited(false)
    // if name, email, mobile, residential status, address is provided
    // of all only residential status is important - rest even if user has not entered it is ok
    Submitnextpage()
  }


  const callbackfunc = () => {
    //setAnythingchanged(!anythingchanged)

    // setTimeout(() => {
    //   window.location.reload();
    // },3000)

  }

  // On file upload (click the upload button)
  let updateCompanyLogo = async (logo) => {



    const companyFormData = new FormData();

    // Update the formData object
    companyFormData.append(
        "file",
        logo
    );

    let response = await apiCall1("storage/uploadUserImage","POST", companyFormData, "")

    // console.log("apicalled",response)
    if (response.status !== 200) {
      errorToast("Invalid", "Some Problem Occured, try again or contact later!!");
      return;
    }else if (response.status === 200){
      setOpenPhotoModal(false)
      let picurl = await response.text()
      setpic(picurl)
      successToast("Success","Image Uploaded Successfully!!")
    }
  };

  async function onFileSelect(file) {
    // const img = await convertImgTOBase64(file);
    // details["profilePic"] = img;
    // setDetails({ ...details });


    updateCompanyLogo(file)
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


  const handleChange = (event) => {

    onUserInput("residentStatus", event.target.value)

    {event.target.value != "India" ?setNonindian(true):setNonindian(false)}
  };

 

  return (<>
            
    <div className="profile_container w-100 row mb-5">
      <div className="col-md-12">
        <div className="profile-form_container">
          <h6 className="profile-title mt-1">Let's Add Personal Details</h6>
          <div className="profile-form_field-photo">
              {pic?<img src={pic} width="50"/>:
              <img src={Profileuserpiclogo} width="50"/>}
              {/* <img src={getImg} style={{ width: "100px", height: "100px" }}/> */}
              <div>
                <p className="m-0 user-name">{details.name}</p>

                <button onClick={() => setOpenPhotoModal(true) } style={{fontSize:"13px"}}>
                  Change profile photo
                </button>
              </div>
            </div>
          
          <div className="profile-form_field-container">
            <div className="profile-form_field profile-tooltip-input">
              <label className="my-2 tex-small ">Full name*</label>              
              <input className={true?"text-capitalize disabled-field ":"gb-info"}
                disabled={details.name}
                value={details.name}
                // onChange={(e) => onUserInput("name", e.target.value)}
                style={{height:"40px"}}
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
                // onChange={(e) => onUserInput("email", e.target.value)}
                
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
              <div className="profile-form_field-PhoneInput position-relative">
                <PhoneInput
                className={true?"default-PhoneInput disabled-field":"default-PhoneInput"}
                disabled={true}
                  defaultCountry="IN"
                  value={`91${details.mobileNumber}`}
                  onChange={(e) => console.log("mobile number...")}
                />
                <span className="Verified-icon">{details.mobileVerified === false?<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallRedCross}/>}Not Verified</p>:<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallGreenCheck}/>}Verified</p>} </span>

              </div>

              {/* <div className="custom-verify-input">
              <input disabled className="disabled-field" style={{border:"none"}}
                value={details.mobileNumber}
                onChange={(e) => onUserInput("mobileNumber", e.target.value)}/>            

              </div> */}
            </div>
          </div>
          <div className="tradeready-horizontalrow"></div> 

          {details.mobileVerified === false?
          <div className="profile-form_field-container_Redalert">
            <div className="profile-form_field verify-msg">
              <p className="RedAlert_Text">{mobiletext}</p>
              <p>Verification link has been send to your email address, please verify.</p>
              <h6 className="RedAlert_Link mt-2" onClick={mobileVerify}>Verify Again</h6>
            </div>
          </div>
          :null }         

          <h6 className="profile-title mt-2">Add Your Address Details</h6>

          <div className="profile-form_field-container">
            <div className="profile-form_field">
              {/*<form className="w-100">                       */}
                <label className="Trade_ready_step_3_Label my-2 text-small">Select Residentship*</label>                 
                {/*<FormControl className="customSelect">*/}
                  <Select 
                   className={profilesubmited?" disabled-field":"residentship-select"}
                   disabled={profilesubmited}
                    value={details.residentStatus}
                    onChange={handleChange}
                    // displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {/* <MenuItem value="">
                      None
                    </MenuItem> */}
                    <MenuItem className="ml-2" value={"India"}>Indian</MenuItem> <br />
                    <MenuItem className="ml-2" value={"Non-Indian"}>Non-Indian</MenuItem>
                  </Select>
              {/*  </FormControl>               */}
              {/*</form> */}

              
              
              {/* <label className="my-2 tex-small">Select Residentship*</label>
              <input disabled className="disabled-field text-capitalize" value={profileaddress.country}
              onChange={(e) => addressInput("country", e.target.value)}
              style={{height:"40px"}}
              /> */}
            </div>
          </div>
            

          {nonindian ?  <>
          <div className="w-100 py-3">                      
                  
              <div className="profile-nonindian-Alert">           
                  <Alert severity={false} color="error">
                      <div className="row">
                          <div className="col-md-1 col-2 default-padding-mobileview"><PriorityHighIcon/></div>
                          <div className="col-md-11 col-10">
                          The platform currently supports Resident Indian Citizens to transact online. If you are a Non Resident, you can reach out for an offline transaction by submitting your requirement through "Services" section "Hire a Broker".*****</div>
                      </div>
                  </Alert>
              </div> 
          </div>
          

          <div className="profile-form_field-btn-container">
            <div className="w-100 py-3">               
              {editrequest ?

              <div className="tradeready-action-Alert">           
                  <Alert severity={false} color="error">
                      <div className="row">
                          <div className="col-md-1 col-2 default-padding-mobileview"><LightbulbOutlinedIcon/></div>
                          <div className="col-md-11 col-10">
                          Edit request recieved. Our team will get in touch with you shortly!</div>
                      </div>
                  </Alert>
              </div>
                  :
                  <div className="d-flex  tradeready-action-button">
                    {!isLoadingbtn && nonindian == false && (<>
                          {/*<Buttons.SecondaryButton*/}
                          {/*      value="Request To Edit"*/}
                          {/*      onClick={()=>setEditrequest(true)} disabled={!profileaddress}/>*/}

                            <Buttons.PrimaryButton value="Save & Continue" onClick={submit} />
                        </>
                    )}
                    {isLoadingbtn && (
                        <Loadbutton />
                    )}
                  </div> }
            </div>
          </div>

      </>
          
          :<>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Address</label>
              <textarea 
              className={profilesubmited?" disabled-field":""}
              disabled={profilesubmited}
               value={profileaddress.address} 
                onChange={(e) => addressInput("address", e.target.value)}
                ></textarea>
            </div>
          </div>       
          
          <div className="profile-form_field-container">          
            <div className="profile-form_field state" >           

                {/*<form className="w-100 customselect" >                       */}
                {/*  <label className="Trade_ready_step_3_Label my-2 text-small">State</label>*/}
                {/*  <CustomSelect value={character} onChange={(eee1)=> {*/}
                {/*    // addressInput("state",eee1.target.value)*/}
                {/*    console.log("eeeeee"+eee1.target.value)*/}
                {/*  }*/}
                {/*  }>*/}
                {/*    {characters.map((c) => (*/}
                {/*      <StyledOption key={c.name} value={c}>*/}
                {/*        {c.name}*/}
                {/*      </StyledOption>*/}
                {/*    ))}*/}
                {/*  </CustomSelect>*/}
                {/*  */}
                {/*</form>*/}

              {/*<form className="w-100 customselect">*/}
                <label className="Trade_ready_step_3_Label my-2 text-small">State</label>
                {/*<FormControl className="customSelect">*/}
                  <Select
                      className={profilesubmited?" disabled-field":"residentship-select"}
                      disabled={profilesubmited}
                      value={profileaddress.state}
                      onChange={(e)=>
                          {
                            console.log("state....", e.target.value)
                            addressInput("state",e.target.value)
                          }
                          }
                      // displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                  >

                    {characters.map((c) => (
                          <MenuItem className="ml-2 d-block" value={c.name}>{c.name}</MenuItem>
                    ))}

                  </Select>
              {/*  </FormControl>*/}
              {/*</form>*/}            

            </div>            
          </div>
          
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small ">City</label>
              <input value={profileaddress.city} className="text-capitalize"
              onChange={(e) => addressInput("city", e.target.value)}
              style={{height:"40px"}} />              
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label className="my-2 tex-small">Pin code</label>
              <input type="text" className={profilesubmited?" disabled-field":""}  style={{height:"40px"}}  
              disabled={profilesubmited} value={profileaddress.pincode}  maxLength={6} minLength={6}
              onChange={(e) => addressInput("pincode", e.target.value.replace(/\D/g, ''))}/>
            </div>
          </div>          

          <div className="profile-form_field-btn-container">
          <div className="w-100 py-3">
            {editrequest ?
                <div className="tradeready-action-Alert">
                  <Alert severity={false} color="error">
                    <div className="row">
                      <div className="col-md-1 col-2 default-padding-mobileview"><LightbulbOutlinedIcon/></div>
                      <div className="col-md-11 col-10">
                        Edit request recieved. Our team will get in touch with you shortly!</div>
                    </div>
                  </Alert>
                </div>
                :
                <div className="d-flex  tradeready-action-button">
                  {!isLoadingbtn && nonindian == false && (<>
                        {/*<Buttons.SecondaryButton*/}
                        {/*    value="Request To Edit"*/}
                        {/*    onClick={()=>setEditrequest(true)} disabled={!profileaddress}/>*/}

                        <Buttons.PrimaryButton value="Save & Continue" onClick={submit} />
                      </>
                  )}
                  {isLoadingbtn && (
                      <Loadbutton />
                  )}
                </div> }
            </div>

              {/* <Buttons.PrimaryButton value="Cancel"  style={{margin:"5px"}}/>
              {!isLoadingbtn && (
                <Buttons.SecondaryButton value="Submit" onClick={submit} style={{margin:"5px"}}/>
              )}
              {isLoadingbtn && (
                <Loadbutton />
              )} */}

          </div>
          </>
}
        </div>
      </div>
      
      
      <ChoosePhoto
          open={openPhotoModal}
          close={() => setOpenPhotoModal(false)}
          onFileSelect={onFileSelect}
          name={"Change Your Photo"}
      />

      <Dialog
        style={{height:"100vh"}}
        open={open}
        onClose={() => { setOpen(false) }}
        >
        <MobileVerification type={type} closeMobileVerification1={closeMobileVerification} callbackfunc={callbackfunc}/>
      </Dialog>

        
    </div>
    </>
  );
}

export default Profile;
