import { Button } from '@material-ui/core';
import React from 'react';
import "./addcompanyrequest.css"
import Buttons from "../../Components/Buttons";
import { SettingsInputComponent } from '@material-ui/icons';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import {
    successToast,errorToast
} from "../../../src/Components/Toast/index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall, downloadurl } from "../../Utils/Network"

export default function AddCompanyRequest(props) {

    let history = useHistory();

    const [havestock,setHavestock]=React.useState("No")
    const [buystock,setBuystock]=React.useState("buystockYes")
    const [companyName,setCompanyName]=React.useState("")
    const [comment,setComment]=React.useState("Yes")
    const [selectedCompanyError, setSelectedCompanyError] = React.useState('')
    const [showSelectedCompanyError, setShowSelectedCompanyError] = React.useState(false)

    let InlineValidationBoxExistingSelectedCompanyError = () => {
        return (
            <div className="inline-validation-box ">
                <p>
                    {selectedCompanyError}
                </p>

            </div>
        )
    }

    const clearErrorMessages = async () => {
        await setShowSelectedCompanyError(false);
        await setSelectedCompanyError('');
     }

    const validate = async (field, errorMessage) => {
        // console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearErrorMessages();
        switch (field) {
            case 'companyName':
                // console.log("hooooooooooooooooo1"+errorMessage)
                await setShowSelectedCompanyError(true);
                await setSelectedCompanyError(errorMessage);
                break;

             default:
                // console.log("hooooooooooooooooonijhibibibibib")

        }
    }

    let addCompany = async (event) => {

        event.preventDefault();

        let reqbody = {
            companyName : companyName,
            comment: comment,
            buystock : buystock,
            havestock : havestock
        }

        let response = await apiCall(
            "company/addfromcustomer",
            "POST",
            reqbody, history
        );



        if (response.status === 200) {
            successToast("Success", "Request received successfully!!")

            await clearErrorMessages();
            // setLoadingbtn(false);
            props.onClose()
        } else if (response.status === 409) {
            errorToast("Not SuccessFul", "Request could not be received, try again or contact Admin!!")
            // setLoadingbtn(false);

            return
        } else if (response.status === 400) {
            errorToast("Not SuccessFul", "Request could not be received, try again or contact Admin!!")

            let responseJSON = await response.json()
            let i = 0;
            const arrayerrormessages = responseJSON.details1;
            // console.log(arrayerrormessages)
            const listItems = arrayerrormessages.map((errorResponse) =>

                validate(errorResponse.field,errorResponse.errorMessage)
            );
            // setLoadingbtn(false);

        }  else {
            errorToast("Not SuccessFul", "Request could not be received, try again or contact Admin!!")
            // setLoadingbtn(false);
        }

    }

  return (
    <div className="addcompanyrequest px-4 py-5">
        <div className="addcompanyrequest_container">
            <div className="text-center">    
                <h5><b>Add Company Request</b></h5>
            </div>
            <div className="addcompanyrequest_FirstHalf mt-3">
                <label className="text-small">Company Name</label>
                <input type="text" className="form-control" onChange={(e)=>{setCompanyName(e.target.value)}}/>
                {showSelectedCompanyError ?
                    <InlineValidationBoxExistingSelectedCompanyError />: null}
                <label className="text-small mt-2">Comments</label>
                <textarea type="text" onChange={(e)=>{setComment(e.target.value)}} style={{borderRadius: "5px",borderColor:"#CFCBCF",marginBottom: "10px",resize:"none",height:"100px"}}/>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <label className="text-small">Do you have stocks for this company?</label>
                </div>
                <div className="col-md-6 col-12 customRadio" >
                    <input className="radio-control" type="radio" value="Yes"
                        name="Yes" id="Yes" checked={ havestock === "Yes" ? true: false } onChange={(e)=>{setHavestock("Yes")}}/>
                    <label className="m-0" htmlFor="Yes"> Yes <span className="checkmark" /></label>
                </div>
                <div className="col-md-6 col-12 customRadio" >
                    <input className="radio-control" type="radio" name="No" id="No"
                        checked={ havestock === "No" ? true: false }
                        onChange={(e)=>{setHavestock("No")}}
                        value="No"
                        />
                    <label className="m-0" htmlFor="No"> No <span className="checkmark" /></label>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <label className="text-small">Do you want to buy this stocks?</label>
                </div>
                <div className="col-md-6 col-12 customRadio" >
                    <input className="radio-control" type="radio" value="buystockYes"
                        name="buystockYes" id="buystockYes" checked={ buystock === "Yes" ? true: false } onChange={(e)=>{setBuystock("Yes")}}/>
                    <label className="m-0" htmlFor="buystockYes"> Yes <span className="checkmark" /></label>
                </div>
                <div className="col-md-6 col-12 customRadio" >
                    <input className="radio-control" type="radio" name="buystockNo" id="buystockNo"
                        checked={ buystock === "No" ? true: false }
                        onChange={(e)=>{setBuystock("No")}}
                        value="buystockNo"
                        />
                    <label className="m-0" htmlFor="buystockNo"> No <span className="checkmark" /></label>
                </div>
            </div>
            {/* <div className="mt-3">
            <p style={{fontSize:"14px"}}> <b>Note:</b> 
                Send Documents Related to company <b style={{color:"#721B65",cursor:"pointer"}}>info@unlistedassets.com</b></p>
            </div> */}
            
            <div className="addcompanyrequest_buttonContainer text-center mt-4">
                <Buttons.SecondaryButton value="Cancel" onClick={props.onClose} style={{width:"50%", margin:"0px 5px"}}/>
                <button className="submit-button" value="Submit" onClick={addCompany}>Submit</button>
               
            </div>
        </div>
    </div>);
}
