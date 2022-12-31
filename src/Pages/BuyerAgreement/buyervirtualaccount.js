import React from "react";
import "./buyervirtualaccount.scoped.css"
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
import { apiCall } from "../../Utils/Network"
import { withWidth } from "@material-ui/core";
import "./buyeragreement.scoped.css"
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

import {
    successToast,
  } from "../../../src/Components/Toast/index";





const useStyles = makeStyles((theme)=>({
    FormControl:{
        marginLeft:"7px",
        justifyContent:"space-between",
        paddingLeft:"10px"
    },
    label:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "7px",
        
    },
    droplabel:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "-2px",
        
    }
}))

let BuyerVirtualAccount =()=>{
    let history = useHistory();

    const classes = useStyles()
    
    const [accountnumber,setAccountNumber]=React.useState('')
    const [ifsc,setIfsc]=React.useState('')
    const [bankname,setBankName]=React.useState('')
    const [branchname,setBranchName]=React.useState('')
    const [virtualBankDetails,setVirtualbankdetails]=React.useState({})
    React.useEffect(()=>{
        virtualbankdetails()
    },[])
    const virtualbankdetails = async function (){
        const response = await apiCall("useronboarding/bankdetail/true",'GET','', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON = await response.json()
        setVirtualbankdetails(responseJSON)
        setAccountNumber(responseJSON.accountNumber)
        setIfsc(responseJSON.ifscCode)
        setBankName(responseJSON.bankName)
        setBranchName(responseJSON.branchName)
    }

    
    const saveContinue = async function () {
        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        let requestBody = {
            "accountNumber": accountnumber,
            "ifscCode": ifsc,
            "bankName": bankname,
            "branchName": branchname,
            "uaVerifiedStatus": "string",
            "uaVerifiedRemarks": "string",
            "isVirtualAccount": true
          }
       
        let response = await apiCall("useronboarding/bankdetail", 'POST', requestBody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("api called ",response)

        let responseJSON = await response.json()
        
        // console.log("responseJson", responseJSON)

        successToast("Success", "Virtual Account Updated Successfully");

        
    }

    return(<div style={{display:"flex",color: "#2E384D"}}>
    
        <div className="buyeragreement_left">
        <BuyerAgreementLeftHalf/>
        </div>

    <div className="Virtual_account_container Virtual_account_text">
        <div>
            <h3>Your virtual account Details.</h3>
            <form>
                <label className="Virtual_account_Label">Virtual Account Number</label>
                <input type="text" name="accountnumber" onChange={(e) => setAccountNumber(e.target.value)} value={accountnumber}/>
                
                <label>IFSC Code</label>
                <input type="text"name="ifsc" onChange={(e) => setIfsc(e.target.value)} value={ifsc}/>
                <label>Bank Name</label>
                <input type="text" name="bankname" onChange={(e) => setBankName(e.target.value)} value={bankname}/>
                <label>Branch Name</label>
                <input type="text" name="branchname" onChange={(e) => setBranchName(e.target.value)} value={branchname}/>
            </form>
            <div >
            
                                    
            </div>
            

            <div className="Virtual_account_save_button">
                 <div style={{display:"flex",justifyContent:"space-between"}}> 
                <div>
                <label>Virtual Account Balance</label>
                {/* <input type="text"/> */}
                <p>Rs.3300</p>
                </div>
                <div>
                <label>Amount frozen in ongoing Transaction</label>
                <p>Rs.3300</p>
                
                {/* <input type="text"/> */}
                </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}> 
            <Buttons.SecondaryButton value="Withdraw Balance" />    
            <Buttons.PrimaryButton value="Add Money to Continue"
            disabled={!(bankname && accountnumber  && branchname && ifsc)}
            onClick={saveContinue}
            />
            </div>
            
            </div>
        </div>
                <div style={{display:"flex", flexDirection:"Column"}}>
                     <div style={{display:"flex",alignItems:"right",justifyContent:"flex-end", justifyItems:"right",
                     marginBottom:"5px"}}>
                         <button className="virtualaccount_statement_download">Download Account Statement</button>
                    </div>                   
                    <div className="Virtual_account_bank_image_container">
                    
                        <div className="Virtual_account_bank_image_area"><img src={bank}/></div>
                        <div className="Virtual_account_text"><p><b>Why Bank Account Details?</b></p><p> We feel this is one of the fastest way to communicate with you and 
                             upadate you with all the information about your transaction and shortlisted companies.</p></div>
                    </div>
                </div>
        </div>
        </div>)
}
export default BuyerVirtualAccount