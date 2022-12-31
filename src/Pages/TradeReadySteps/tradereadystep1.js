import React, { useEffect, useState } from "react";
import "./tradereadystep1.scoped.css";
import bank from "./Bank.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import { apiCall } from "../../Utils/Network";
import {
  successToast, errorToast
} from "../../../src/Components/Toast/index";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import { Link, useHistory } from "react-router-dom";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';

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
    // marginLeft: "7px",
  },
  droplabel: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2e384d",
    marginLeft: "-2px",
  },
}));

// const Update=(props)=>{
//   handleNext()
//   // console.log('clicked')

// }

let ChooseRole = (props) => {
  let details = props.details
  const classes = useStyles();
  let history = useHistory();
  const [role, setRole] = React.useState("");
  const [isLoadingbtn, setLoadingbtn] = useState(false);

  
  const [resident, setResident] = useState();
  const [showSavebtn, setshowSavebtn] = useState();


  React.useEffect(() => {
    setRole(details.residentStatus);
    // console.log('aaaaaa'+details.residentStatus)
  }, [details]);

  const saveContinue = async function () {

    
    // let response = await fetch('getholding').toJson()
    // setRowInformation(response)
    setLoadingbtn(true);
    let requestBody = {
       residentStatus: role,
      };

    let response = await apiCall(
      "useronboarding/accountonboarding/role",
      "PUT",
      requestBody, history
    );
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }

    // console.log("api called ", response);

    let responseJSON = await response.json();

    // console.log("responseJson", responseJSON);

    if (response.status !== 200) {
      errorToast("Invalid", "Residential Status not Updated");
      setLoadingbtn(false);
      return;
    }else if (response.status === 200){
      successToast("Success","Residential Status Updated")
      details.residentStatus = role
      setLoadingbtn(false);
      props.nextPage()
    }
  };

  
  const handleChange = (e) => {   
    setResident(e.target.value);


    //  if(role === "Resident Indian"){
    //   setshowSavebtn(true)
    // }    
    // else{
    //   setshowSavebtn(false)
    // }
    e.preventDefault();
    
  } 
  // console.log(showSavebtn ,"mayur showSavebtn")

  // console.log("mayur resident check", resident)
 

  return (
    <div className="row chooserole-section-tab">
      <div className="col-lg-6 col-md-6 col-12">
        <div className="mt-3">
        <h6 style={{fontFamily: "Montserrat"}}><b>Select your profile</b></h6>
        {/* <p className="text-small">All users are required to identify their status for our records and enable us to provide a seamless transaction experience!!</p> */}
        <form>
          <FormControl component="fieldset">
            <RadioGroup
              className="trade_ready_step_1_Choose_radio_group"
              aria-label="position"
              name="position"
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                name="Resident_Indian"
                value="Resident Indian"
                control={<Radio color="#721B65" />}
                label="Resident Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Resident Indian"}
                onChange={handleChange}
              />
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                value="Non Resident Indian"
                control={<Radio color="#721B65" />}
                label="Non Resident Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Non Resident Indian"}
                onChange={handleChange}
              />
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                value="Non Indian"
                control={<Radio color="#721B65" />}
                label="Non Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Non Indian"}
                onChange={handleChange}
              />
            </RadioGroup>
          </FormControl>
        </form>
        </div>
        <hr />
      </div>

      <div className="col-lg-6 col-md-6 col-12">
        <div className="my-card my-4">
          <div className="my-2">
            <img src={bank} width="100"/>
          </div>
          <div className="my-2">
            {/* <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a> */}
            <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Who is a Indian Resident ?</p></b></a>
            <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Who is a Non -Resident ?</p></b></a>
            <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Is there a restriction on buying Unlisted Shares ?</p></b></a> 
            <p className="text-small mb-1">All users are required to identify their status for our records and enable us to provide a seamless transaction experience!!</p>

          </div>
        </div>
      </div>
        <div className="tradeready-save-mobilebutton px-3">
          {
            resident !==  "Resident Indian" ? <Buttons.PrimaryButton value="Accept only Resident Indian"   /> : !isLoadingbtn && (
                <Buttons.PrimaryButton value="Save & Continue"   onClick={
                  saveContinue} />
              )
          }
           
            {isLoadingbtn && (
              <Loadbutton />
            )}
        </div>
    </div>
  );
};
export default ChooseRole;
