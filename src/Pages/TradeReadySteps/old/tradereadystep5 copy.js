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

const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
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
  const [panVerifiedStatus,setpanVerifiedStatus]=React.useState(false)
  const [panVerifiedStatusDescription,setpanVerifiedStatusDescription]=React.useState('')
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

React.useEffect(() => {
    setPanNumber(details.panNumber);
    setpanVerifiedStatusDescription(details.panNumberVerificationStatus)

    if(details.panNumberVerificationStatus == "Verified") {
      setpanVerifiedStatus(true)
    } else {
      setpanVerifiedStatus(false)
    }
  }, [details]);

  const validate = async (field, errorMessage) => {
    //console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)

    switch (field) {
      case 'panNumber':
        //console.log("hooooooooooooooooo1"+errorMessage)
        errorToast("Invalid", errorMessage);

        break;

      default:
        // console.log("")
    }
  }
  const saveContinue = async (event) => {

    event.preventDefault();

    let requestBody = {


      panNumber: pannumber
    };
    //console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    //console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "useronboarding/accountonboarding/pan",
      "PUT",
      requestBody
    );

    let responseJSON = await response.json();

    //console.log("response ", response);

    //console.log("responseJson", responseJSON);

    if(response.status == 400) {
      let i = 0;
      const arrayerrormessages = responseJSON.details1;
      //console.log(arrayerrormessages)
      const listItems = arrayerrormessages.map((errorResponse) =>
          validate(errorResponse.field,errorResponse.errorMessage)
      );

    }else if (response.status !== 200) {
      errorToast("Invalid", "PAN not Updated Successfully, please re-enter an appropriate Pan Number!!");
      return;
    }else if (response.status === 200){
      successToast("Success","PAN Updated Successfully")



      setpanVerifiedStatusDescription(responseJSON.panNumberVerificationStatus)

      if(details.panNumberVerificationStatus == "Verified") {
        setpanVerifiedStatus(true)
      } else {
        setpanVerifiedStatus(false)
      }

      setPanNumber(pannumber);
      //setPanverificationstatus(responseJSON.panNumberVerified)
      props.nextPage()
    }

  };

  return (
    <div className="row PAN_KYC-Tab-section">
      <div className="col-md-6 col-12">
        <div className="mt-3 ">
          <h6 style={{fontFamily: "Montserrat"}}><b>PAN KYC Verification.</b></h6>
          {/* <p className="text-small">Pan card is essential to get   Know your Customer  KYC. KYC is mandatory before any financial investment. Pan card is mandatory for opening a Demat account  and any wrong input will not get approved  and   you will not be able to proceed further.</p> */}
          <p className="text-small Verification" style={{fontFamily: "Montserrat",color:"red"}}>Verification Status: {panVerifiedStatusDescription}</p>
          <form className="w-100 mt-5">
            <label className="Trade_ready_step_5_Label text-small m-0">Pan Number*</label>
            <input
            disabled = {panVerifiedStatus==true ||
            panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"
                ? true : false}
              type="text"
              name="pannumber"
              onChange={(e) => setPanNumber(e.target.value)}
              value={pannumber}
            className={panVerifiedStatus==true ||
            panVerifiedStatusDescription == "Temporarily Service not available, Please wait, pending on us"
                ?"text-small mt-2 p-2 disabled-field":"text-small mt-2 p-2"}

            />
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
      <div className="col-md-6 col-12 p-4">
        <div className="my-card my-4">
            <div className="my-2">
                <img src={pan} width="150"/>
            </div>
            <div className="my-2">
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Why is Pan card important ?</p></b></a>
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">My PAN card is not being verified ?</p></b></a>
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How can I complete my KYC on the platform ?</p></b></a>
              <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What are the Pre-requisite for making your first trade ?</p></b></a>
              <p className="text-small mb-1">Pan card is essential to get   Know your Customer  KYC. KYC is mandatory before any financial investment. Pan card is mandatory for opening a Demat account  and any wrong input will not get approved  and   you will not be able to proceed further.</p>

            </div>                         
        </div>
      </div>
      <div className="tradeready-save-mobilebutton px-3 ">
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
      
      </div>
    </div>
  );
};
export default PANVerification;
