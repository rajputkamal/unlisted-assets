import React, {useState} from "react";
import "./tradereadystep5.css";
import pan from "./pan.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { apiCall, setAccessToken } from "../../Utils/Network";
import {
  successToast,errorToast
} from "../../../src/Components/Toast/index";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft:"50px",
    paddingRight:"50px",
    textTransform: "capitalize !important",        
  },
  label: {
    fontWeight: "500",
    fontSize: '14px',
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

let PANVerification = (props) => {
  let details = props.details
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [pannumber, setPanNumber] = React.useState("");
  const [aadharnumber, setAadharNumber] = React.useState("");

  const [panVerifiedStatus,setpanVerifiedStatus]=React.useState(false)
  const [panVerifiedStatusDescription,setpanVerifiedStatusDescription]=React.useState('')
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  let tryagain = false

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if(props.tryagain != undefined &&
      props.tryagain == "pan"
  ) {
    tryagain = true;
  }

React.useEffect(() => {

    // console.log("iiiiiiiiiiijjjhjpp", details)

    setPanNumber(details.panNumber);

    if(details.panNumberVerificationStatus == undefined ||
        details.panNumberVerificationStatus == "") {

      setpanVerifiedStatusDescription("Not Yet Verified!!")
    } else {
      setpanVerifiedStatusDescription(details.panNumberVerificationStatus)
    }




    if(details.panNumberVerificationStatus == "Verified" ||
        details.panNumberVerificationStatus == "Temporarily Service not available, Please wait, pending on us") {

      if(props.tryagain != undefined &&
          props.tryagain == "pan"
      ) {
        // props.nextPage()
      } else {
        props.nextPage()
      }

      setpanVerifiedStatus(true)

    } else {
      setpanVerifiedStatus(false)
    }

  }, [details]);

  const validate = async (field, errorMessage) => {
    // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)

    switch (field) {
      case 'panNumber':
        // console.log("hooooooooooooooooo1"+errorMessage)
        // errorToast("Invalid", errorMessage);
        errorToast("Invalid", "Pan Number already exists/incorrect");
        break;

      default:
        // console.log("hooooooooooooooooonijhibibibibib")
    }
  }
  const saveContinue = async (event) => {

    event.preventDefault();

    let requestBody = {


      panNumber: pannumber
    };
    // console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "useronboarding/accountonboarding/pan",
      "PUT",
      requestBody
    );
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }

    let responseJSON = await response.json();

    // console.log("response ", response);

    // console.log("responseJson", responseJSON);

    if(response.status == 400) {
      let i = 0;
      const arrayerrormessages = responseJSON.details1;
      // console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>
          validate(errorResponse.field,errorResponse.errorMessage)
      );

    }else if (response.status != 200) {
      errorToast("Invalid", "PAN not Updated Successfully, please re-enter an appropriate Pan Number!!");
      return;
    }else if (response.status === 200){


      setpanVerifiedStatusDescription(responseJSON.panNumberVerificationStatus)

      if(responseJSON.panNumberVerificationStatus == "Verified") {
        setpanVerifiedStatus(true)
        successToast("Success","PAN Updated Successfully")
        props.nextPage()
      } else {
        setpanVerifiedStatus(false)

        if(responseJSON.panNumberVerificationStatus == "Rejected, Pl provide correct PAN or contact Admin") {
          errorToast("Invalid","Rejected, Pl provide correct PAN or contact Admins")
        } else {
          errorToast("Invalid","Temporarily Service not available, Please wait, pending on us")
          props.nextPage()
        }

      }

      setPanNumber(pannumber);
      //setPanverificationstatus(responseJSON.panNumberVerified)

    }

  };

  const handleBack=() =>{
    props.previousPage() 
  }

  return (
    <div className="row PAN_KYC-Tab-section">
      <div className="col-md-12 col-12 px-4 mb-4">
        <div className="">
          <p className="text-small Verification" style={{fontFamily: "Montserrat",color:"red"}}>Verification Status: {panVerifiedStatusDescription}</p>
          <form className="w-100 ">
            <label className="Trade_ready_step_5_Label text-small m-0 mt-2">Enter PAN Number*</label>
            <input
            // disabled = {panVerifiedStatus==true ||
            // panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"
            //     ? true : false}
              type="text"
              name="pannumber"
              onChange={(e) => setPanNumber(e.target.value)}
              value={pannumber}
            className={panVerifiedStatus==true ||
            panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"
                ?"text-small mt-2 p-2 disabled-field":"text-small mt-2 p-2"}

            />

            {/*<label className="Trade_ready_step_5_Label text-small m-0 mt-2">Enter Aadhar Number*</label>*/}
            {/*<input*/}
            {/*disabled = {panVerifiedStatus==true ||*/}
            {/*panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"*/}
            {/*    ? true : false}*/}
            {/*  type="text"*/}
            {/*  name="pannumber"*/}
            {/*  onChange={(e) => setAadharNumber(e.target.value)}*/}
            {/*  value={pannumber}*/}
            {/*className={panVerifiedStatus==true ||*/}
            {/*panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"*/}
            {/*    ?"text-small mt-2 p-2 disabled-field":"text-small mt-2 p-2"}*/}

            {/*/>*/}
          </form>

          {/* <div className="Trade_ready_step_5_save_button dbmn">
            {panverificationstatus ? null :
                <Buttons.PrimaryButton
                    value="Save"
                    onClick={saveContinue}
                    style={{margin:"0px 8px"}}
                />
            }
          </div>  */}
        </div>
      </div>
      

            <div className="w-100 px-3">
                {!isLoadingbtn && (
                    <div className="d-flex px-2 tradeready-action-button">
                        {/*<Button  onClick={handleBack} className={classes.button } >Back</Button>*/}
                        <Buttons.PrimaryButton value="Save & Continue"  onClick={saveContinue} disabled={!(pannumber)} />
                    </div>                   
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
            </div>

           
              {/* <div className="tradeready-save-mobilebutton px-3 ">
                {!isLoadingbtn && (
                    <>
                       {panVerifiedStatus ||
                       panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"
                           ? null :
                            <Buttons.PrimaryButton
                                value="Save & continue"
                                onClick={saveContinue}
                            />
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
export default PANVerification;
