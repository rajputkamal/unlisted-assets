import React, {useState} from "react";
import "./tradereadystep6.css";
import Aadharcard from "./aadharlinked.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import Noteimage from "./not.svg";
import { apiCall, setAccessToken } from "../../Utils/Network";
import DigioSDKCall from "../../Utils/digocall";
import {
  successToast,errorToast
} from "../../../src/Components/Toast/index";
import MobileVerification from "../../Pages/MobileVerification/index";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import Dialog from '@material-ui/core/Dialog';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory, useLocation
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
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
  },
}));

let  AadharLinked = (props) => {
  let details = props.details
  const classes = useStyles();
  let history = useHistory();

  const [aadharnumber, setAadharNumber] = React.useState("");
  const [aadharlinked, setAadharLinked] = React.useState("no");
  const [aadharverificationstatus,setAadharverificationstatus]=React.useState(false)
  const [aadharverificationstatusdescription,setaadharverificationstatusdescription]=React.useState("")
  const [open, setOpen] = React.useState(false);
  const [type,setType] = React.useState('aadharLinkage');
  const [disabled,setDisabled] = React.useState(false)
  const [isLoadingbtn, setLoadingbtn] = useState(false);

   React.useEffect(() => {
    // console.log("iiiiiiiiiiijjjhjppoo", details)
    // details.aadharNumberVerified = true

    if(details.aadharNumberVerified == true
    ||
        (details.aadharNumberVerificationStatus != undefined &&
        details.aadharNumberVerificationStatus == "Temporarily Service not available, try after some time, or contact admin!!")) {

      if(props.tryagain != undefined &&
          props.tryagain == "aadhar"
      ) {
        // props.nextPage()
      } else {
        props.nextPage()
      }
    }

    setAadharNumber(details.aadharNumber);
    setAadharLinked(details.aadharNumberVerified);
    setAadharverificationstatus(details.aadharNumberVerified)

    if(details.aadharNumberVerificationStatus == undefined ||
        details.aadharNumberVerificationStatus == "") {

      setaadharverificationstatusdescription("Not Yet Verified!!")
    } else {
      setaadharverificationstatusdescription(details.aadharNumberVerificationStatus)
    }


  }, [details]);
  
  React.useEffect( ()=>{

    // console.log('tttttttttttttt'+aadharlinked+details.aadharNumberVerified)
    if (aadharlinked === false ){
      //setDisabled(true)
      setAadharLinked("no")
    
    }else if(aadharlinked === true){
      //setDisabled(false)
      setAadharLinked("yes")

    }
    // console.log('tttttttttttttt'+aadharlinked+details.aadharNumberVerified)
    },[aadharlinked,aadharnumber])

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET", history);
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();

    if(responseJSON.aadharNumberVerified == true ||
        (responseJSON.aadharNumberVerificationStatus != undefined &&
        responseJSON.aadharNumberVerificationStatus == "Temporarily Service not available, try after some time, or contact admin!!")) {

      if(responseJSON.aadharNumberVerificationStatus != undefined &&
          responseJSON.aadharNumberVerificationStatus == "Temporarily Service not available, try after some time, or contact admin!!") {
        errorToast("Invalid", "Temporarily Service not available, try after some time, or contact admin!!");
      }
      props.nextPage()

    }

    setAadharNumber(responseJSON.aadharNumber);
    setAadharLinked(responseJSON.aadharNumberVerified);
    setAadharverificationstatus(responseJSON.aadharNumberVerified)
    setaadharverificationstatusdescription(responseJSON.aadharNumberVerificationStatus)
   }

  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)

    switch (field) {
      case 'aadharNumber':
        // console.log("hooooooooooooooooo1"+errorMessage)
        // errorToast("Invalid", errorMessage);
        errorToast("Invalid", "Aadhar Number already exists/incorrect");

        break;

      default:
        // console.log("hooooooooooooooooonijhibibibibib")
    }
  }

  const callBackAadharFromDigio = (msg) => {

    // alert(msg+"hihihihihihihihihihih1111")

    if(msg == "ServiceNotAvailable") {
      errorToast("Invalid", "Temporarily Service Not Available!!, pl try agin later!!")
    } else {
      // alert(msg+"1")
      if(msg == true) {
        successToast("Success", "Aadhar Verified Successfully!!")
      } else {
        errorToast("Invalid", "Aadhar entered is incorrect/time out, pl try again!!")
      }
    }

    props.nextPage()
  }


  const handleDone = async (event) => {
    event.preventDefault();

    DigioSDKCall.triggerDigioSDK()

  };

  const closeMobileVerification = (msg) =>{
    setOpen(false)
    getProfile()
  }

  const callbackfunc = () => {
    //setAnythingchanged(!anythingchanged)

    // setTimeout(() => {
    //   window.location.reload();
    // },3000)

  }

  return (
    <div className="row  Aadharlink-tab-section">
      <div className="col-md-12 col-12">
        <div className="mt-3 mb-3">
          <h6 style={{fontFamily: "Montserrat"}}><b>Aadhar Linked ?</b></h6>
          {/* <p className="text-small">Aadhar card  and the verification is critical to making transactions. Details entered will be verified  through OTP. Please enter the correct details  and proceed to making your first trade.</p> */}
          {/*<p className="text-small Verification" style={{fontFamily: "Montserrat"}}>Verification Status: {aadharverificationstatusdescription}</p>*/}
          <p className="text-small Verification" style={{fontFamily: "Montserrat"}}>Click on Submit Button to Verify Aadhar-Phone Linkage</p>

          <DigioSDKCall callBackAadharFromDigio={callBackAadharFromDigio}></DigioSDKCall>

          {/*<div style={{display:"flex",flexDirection:"column",lineHeight:"40px"}}>*/}
          {/*  <label className="Trade_ready_step_2_Label text-small m-0">*/}
          {/*    Enter Your Aadhar Number*/}
          {/*  </label>*/}
          {/*  <div className="row Trade_ready_step_6 align-items-center">*/}
          {/*    <div className="col-md-9">              */}
          {/*      <input*/}
          {/*        style={{ backgroundColor:"#f2f2f2"}}*/}
          {/*          type="text"*/}
          {/*            disabled={aadharverificationstatus == true ? true : false}*/}
          {/*          name="aadharnumber"*/}
          {/*          onChange={(e) => setAadharNumber(e.target.value)}*/}
          {/*          value={aadharnumber}*/}
          {/*          maxLength="12"*/}
          {/*          className="aadhar-input"*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*    <div className="col-md-3">*/}
          {/*      <DigioSDKCall></DigioSDKCall>*/}

          {/*    </div>*/}
          {/*  </div>*/}

          {/*  */}

          {/*</div>*/}
          {/*{aadharverificationstatus ? null :*/}
          {/*<div className="mt-2">*/}
          {/*  <label className="text-small m-0">Aadharcard Linked to mobile Number?</label>*/}
          {/*    <div className="profile-form_field-container">*/}
          {/*      <div className="profile-form_field-radio ">*/}
          {/*      <div className="customRadio w-100">*/}
          {/*      <input className="radio-control" type="radio"  id="aadharlinked_yes" name="aadharlinked" value="yes" checked={aadharlinked === "yes" ? true : false} onChange={(e) => {setAadharLinked("yes")}}/>*/}
          {/*      <label className="m-0 " htmlFor="aadharlinked_yes"> Yes <span className="checkmark" /></label>*/}
          {/*      </div>*/}
          {/*      </div>*/}
          {/*      <div className="profile-form_field-radio " >*/}
          {/*        <div className="customRadio w-100">*/}
          {/*          <input className="radio-control" type="radio" id="aadharlinked_no" name="aadharlinked" value="no" checked={aadharlinked === "yes" ? false : true} onChange={(e) => setAadharLinked("no")}/>*/}
          {/*          <label className="m-0" htmlFor="aadharlinked_no">No<span className="checkmark"/></label>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  {aadharlinked === "no"? <p className="info">Please Link aadhar with mobile number, it is manditory for Buy and Sell</p>:null}*/}

          {/*<div className="p-2 mt-3 d-flex align-items-center" style={{background: "#2E384D",borderRadius: "10px",}}>*/}
          {/*  <div className="px-2">*/}
          {/*    <img src={Noteimage} />*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <p className="m-0"*/}
          {/*      style={{*/}
          {/*        fontSize: "12px",*/}
          {/*        color: "#FFFFFF",*/}
          {/*        fontFamily: "Montserrat",*/}
          {/*        fontStyle: "normal",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <b>Note:</b> Your agreement will be signed using aadhar based OTP*/}
          {/*      verification. Please Keep your mobile phone ready, which is linked*/}
          {/*      to your aadhar card.{" "}*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*}*/}

          {/* { <div className="Trade_ready_step_6_save_button w-100 dbmn">
            {aadharlinked === "no"?<Buttons.PrimaryButton value="Click to Verify" style={{margin:"0px 5px"}} onClick={handleDone} disabled={disabled}/>:null}

          </div> } */}

        {/*  <Dialog*/}
        {/*  style={{height:"100vh"}}*/}
        {/*  open={open}*/}
        {/*  onClose={() => { setOpen(false) }}*/}
        {/*  >*/}


        {/*          <MobileVerification type={type} closeMobileVerification1={closeMobileVerification}*/}
        {/*                              callbackfunc={callbackfunc}/>*/}
        {/*</Dialog>*/}
        </div>
      </div>
      {/*<div className="col-md-6 col-12">*/}
      {/*  <div className="my-card my-4 ">*/}
      {/*      <div className="my-2">*/}
      {/*          <img src={Aadharcard} width="150"/>*/}
      {/*      </div>*/}
      {/*      <div className="my-2">*/}
      {/*        /!* <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a> *!/*/}
      {/*        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How can I complete my KYC on the platform ?</p></b></a>*/}
      {/*        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Which address is required while creating my profile ?</p></b></a>*/}
      {/*        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What are the documents required for buying, selling or bidding in a stock ?</p></b></a>*/}
      {/*        <p className="text-small mb-1">Aadhar card  and the verification is critical to making transactions. Details entered will be verified  through OTP. Please enter the correct details  and proceed to making your first trade.</p>*/}

      {/*      </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="w-100 px-2">
            {!isLoadingbtn && (
            <>{aadharverificationstatus ? null :
              aadharlinked === "no" ? null :
                <div className="d-flex px-2 tradeready-action-button">                        
                    <Buttons.PrimaryButton value="Click to Verify" onClick={handleDone}/>
                </div>
            }
            </>                                  
            )}
            {isLoadingbtn && (
                <Loadbutton />
            )}
        </div>


      {/* <div className="tradeready-save-mobilebutton px-3 ">
        {    console.log('ttttttttttttttww'+aadharlinked+details.aadharNumberVerified)}
            {!isLoadingbtn && (
              <>{!aadharverificationstatus ? null :
                  aadharlinked === "no" ? null :
                  <div className="d-flex"> <Buttons.PrimaryButton value="Click to Verify" onClick={handleDone}/>
                            </div>
              }
              </>
            )}
            {isLoadingbtn && (
              <Loadbutton />
            )}
      </div> */}

    </div>
  );
};
export default AadharLinked;
