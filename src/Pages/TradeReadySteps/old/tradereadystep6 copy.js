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
  Link,useHistory
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

let AadharLinked = (props) => {
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
    setAadharNumber(details.aadharNumber);
    setAadharLinked(details.aadharNumberVerified);
    setAadharverificationstatus(details.aadharNumberVerified)
    setaadharverificationstatusdescription(details.aadharNumberVerificationStatus)
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
        errorToast("Invalid", errorMessage);

        break;

      default:
        // console.log("hooooooooooooooooonijhibibibibib")
    }
  }

  const handleDone = async (event) => {
    event.preventDefault();
    setLoadingbtn(true);
    let requestBody = {

      aadharNumber: aadharnumber,
    };
    // console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "useronboarding/accountonboarding/aadharlinkage",
      "PUT",
      requestBody, history
    );

    let responseJSON = await response.json();
    // console.log("response ", response);

    // console.log("responseJson", responseJSON);
    //successToast("Success", "Aadhar Updated Successfully");

    //code to sent otp on the adhar number linked mobile

    // console.log("apicalled",response)
    if(response.status == 400) {
       let i = 0;
      const arrayerrormessages = responseJSON.details1;
      // console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>
          validate(errorResponse.field,errorResponse.errorMessage)
      );

    }else if (response.status !== 200) {
      errorToast("Invalid", "OTP not sent to your mobile, please check or contact admin");
      setLoadingbtn(false);
      return;
    }else if (response.status === 200){
      successToast("Success","OTP sent to your mobile please check")
      setOpen(true)
      setLoadingbtn(false);
    }

    setType("aadharLinkage");
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
      <div className="col-md-6 col-12">
        <div className="mt-3 mb-3">
          <h6 style={{fontFamily: "Montserrat"}}><b>Aadhar Linked ?</b></h6>
          {/* <p className="text-small">Aadhar card  and the verification is critical to making transactions. Details entered will be verified  through OTP. Please enter the correct details  and proceed to making your first trade.</p> */}
          <p className="text-small Verification" style={{fontFamily: "Montserrat"}}>Verification Status: {aadharverificationstatusdescription}</p>
          <div style={{display:"flex",flexDirection:"column",lineHeight:"40px"}}>
            <label className="Trade_ready_step_2_Label text-small m-0">
              Enter Your Aadhar Number
            </label>
            <input 

            style={{border: "1px solid #CFCBCF", backgroundColor:"#f2f2f2"}}
              type="text"
                disabled={aadharverificationstatus == true ? true : false}
              name="aadharnumber"
              onChange={(e) => setAadharNumber(e.target.value)}
              value={aadharnumber}
              maxLength="12"
              className="p-2"
            />
          </div>
          {aadharverificationstatus ? null :
          <div className="mt-2">
            <label className="text-small m-0">Aadharcard Linked to mobile Number?</label>
              <div className="profile-form_field-container">
                <div className="profile-form_field-radio ">
                <div className="customRadio w-100">
                <input className="radio-control" type="radio"  id="aadharlinked_yes" name="aadharlinked" value="yes" checked={aadharlinked === "yes" ? true : false} onChange={(e) => {setAadharLinked("yes")}}/>
                <label className="m-0 " htmlFor="aadharlinked_yes"> Yes <span className="checkmark" /></label>
                </div>
                </div>
                <div className="profile-form_field-radio " >
                  <div className="customRadio w-100">
                    <input className="radio-control" type="radio" id="aadharlinked_no" name="aadharlinked" value="no" checked={aadharlinked === "yes" ? false : true} onChange={(e) => setAadharLinked("no")}/>
                    <label className="m-0" htmlFor="aadharlinked_no">No<span className="checkmark"/></label>
                  </div>
                </div>
              </div>
            {aadharlinked === "no"? <p className="info">Please Link aadhar with mobile number, it is manditory for Buy and Sell</p>:null}

          <div className="p-2 mt-3 d-flex align-items-center" style={{background: "#2E384D",borderRadius: "10px",}}>
            <div className="px-2">
              <img src={Noteimage} />
            </div>
            <div>
              <p className="m-0"
                style={{
                  fontSize: "12px",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                }}
              >
                <b>Note:</b> Your agreement will be signed using aadhar based OTP
                verification. Please Keep your mobile phone ready, which is linked
                to your aadhar card.{" "}
              </p>
            </div>
          </div>
          </div>
          }

          {/* { <div className="Trade_ready_step_6_save_button w-100 dbmn">
            {aadharlinked === "no"?<Buttons.PrimaryButton value="Click to Verify" style={{margin:"0px 5px"}} onClick={handleDone} disabled={disabled}/>:null}

          </div> } */}

          <Dialog
          style={{height:"100vh"}}   
          open={open}
          onClose={() => { setOpen(false) }}
          >


                  <MobileVerification type={type} closeMobileVerification1={closeMobileVerification}
                                      callbackfunc={callbackfunc}/>
        </Dialog>
        </div>
      </div>
      <div className="col-md-6 col-12">
        <div className="my-card my-4 ">
            <div className="my-2">
                <img src={Aadharcard} width="150"/>
            </div>
            <div className="my-2">
              {/* <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a> */}
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How can I complete my KYC on the platform ?</p></b></a>
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Which address is required while creating my profile ?</p></b></a>
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What are the documents required for buying, selling or bidding in a stock ?</p></b></a>
              <p className="text-small mb-1">Aadhar card  and the verification is critical to making transactions. Details entered will be verified  through OTP. Please enter the correct details  and proceed to making your first trade.</p>

            </div>                        
        </div>
      </div>
      <div className="tradeready-save-mobilebutton px-3 ">

      {/*<Buttons.PrimaryButton value="Re-verify" style={{marginTop:"10px",marginLeft:"10px"}}  />*/}
      


            {!isLoadingbtn && (
              <>{aadharverificationstatus ? null :
                  aadharlinked === "no" ? null :
                  <div className="d-flex"> <Buttons.PrimaryButton value="Click to Verify" onClick={handleDone}/>
                            </div>
              }
              </>
            )}
            {isLoadingbtn && (
              <Loadbutton />
            )}
      </div>
    </div>
  );
};
export default AadharLinked;
