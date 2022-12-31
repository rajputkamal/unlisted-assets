import React,{useState, useEffect} from "react";
import "./tradereadystep2.css"
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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

import {
    successToast, errorToast
} from "../../../src/Components/Toast/index";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';

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

let AddBankAccount =(props)=>{
    const classes = useStyles()
    let history = useHistory();

    const [accountnumber,setAccountNumber]=useState('')
    const [confirmaccountnumber,setConfirmAccountNumber]=useState('')
    const [ifsc,setIfsc]=useState('')
    const [bankname,setBankName]=useState('')
    const [branchname,setBranchName]=useState('')
    const [bankDetails,setBankDetails]=useState({})
    const [uaVerifiedStatus,setuaVerifiedStatus]=useState(false)
    const [uaVerifiedStatusDescription,setuaVerifiedStatusDescription]=useState("")
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    useEffect(()=>{
        bankdetails()
    },[])
    const bankdetails = async function (){
        const response = await apiCall("useronboarding/bankdetail/false",'GET','', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const bankresponseJSON = await response.json()
        setBankDetails(bankresponseJSON)
        setAccountNumber(bankresponseJSON.accountNumber)
        setIfsc(bankresponseJSON.ifscCode)
        setBankName(bankresponseJSON.bankName)
        setBranchName(bankresponseJSON.branchName)
        setuaVerifiedStatusDescription(bankresponseJSON.uaVerifiedStatus)

        if(bankresponseJSON.uaVerifiedStatus == "Verified") {
            setuaVerifiedStatus(true)
        } else {
            setuaVerifiedStatus(false)
        }
    }

    const saveContinue = async function () {

        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        let requestBody = {
            "accountNumber": accountnumber,
            "ifscCode": ifsc,
            "bankName": bankname,
            "branchName": branchname,
            "isVirtualAccount": false
        }

        let response = await apiCall("useronboarding/bankdetail", 'POST',requestBody, history)

        //console.log("api called ",response)

        let responseJSON = await response.json()

        //console.log("responseJson", responseJSON)

        if (response.status !== 200) {
            errorToast("Invalid", "Bank Account not Updated");
            return;
        }else if (response.status === 200){
            successToast("Success","Bank Account Updated")
            bankdetails()
            props.nextPage()
        }
    }

    return(
        // <div className="container-fluid " id="BankVerification">
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="mt-3">
                        <h6 style={{fontFamily: "Montserrat"}}><b>Bank Account Verification.</b></h6>
                        {/* <p className="text-small"> Please provide your bank account details. The account holder name must be same as the user name that was used while making the profile. Third party A/C will not be accepted.</p> */}
                        {/* <p className="text-small"><b>Please note :</b>  We accept all Indian banks to be linked to your trade. We need your bank account details to ease the transaction process while trading.</p> */}
                        <p className="text-small Verification" style={{fontFamily: "Montserrat"}}>Verification Status: {uaVerifiedStatusDescription}</p>
                        <h6 style={{fontFamily: "Montserrat"}}>Add Your bank account Details.</h6>
                        <form className="w-100 BankAccountTab-form">
                            <label className="Trade_ready_step_2_Label my-2 text-small">Account Number</label>
                            <input type="text" disabled={uaVerifiedStatus?true:false} className={uaVerifiedStatus?"disabled-field":""}
                            //  disabled={uaVerifiedStatus?true:false} 
                             name="accountnumber" onChange={(e)=>setAccountNumber(e.target.value)} value={accountnumber}/>
                            <label className="m-0 my-2 text-small">Confirm Account Number</label>
                            <input type="text" disabled={uaVerifiedStatus?true:false} className={uaVerifiedStatus?"disabled-field":""}
                            // disabled={uaVerifiedStatus?true:false}
                             name="confirmaccountnumber" onChange={(e)=>setConfirmAccountNumber(e.target.value)} value={confirmaccountnumber} />
                            <label className="m-0 my-2 text-small">IFSC Code</label>
                            <input type="text" disabled={uaVerifiedStatus?true:false} className={uaVerifiedStatus?"disabled-field":""}
                            // disabled={uaVerifiedStatus?true:false} 
                            name="ifsc" onChange={(e)=>setIfsc(e.target.value)} value={ifsc}/>
                            <label className="m-0 my-2 text-small">Bank Name</label>
                            <input type="text" disabled={uaVerifiedStatus?true:false} className={uaVerifiedStatus?"disabled-field":""}
                            // disabled={uaVerifiedStatus?true:false}
                             name="bankname" onChange={(e)=>setBankName(e.target.value)} value={bankname}/>
                            <label className="m-0 my-2 text-small">Branch Name</label>
                            <input type="text" disabled={uaVerifiedStatus?true:false} className={uaVerifiedStatus?"disabled-field":""}
                            // disabled={uaVerifiedStatus?true:false} 
                            name="branchname" onChange={(e)=>setBranchName(e.target.value)} value={branchname}/></form>
                        <div>
                            {/*<div className="addinventory-form_field addinventory-form_upload-photo">*/}
                            {/*    <img src={UploadIcon} width="70" className="mr-4"/>*/}
                            {/*    <p style={{color: "#2E384D"}}>*/}
                            {/*        Drop files to upload <br /> or <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>*/}
                            {/*    </p>*/}
                            {/*    <input type="file" id="myfile" name="myfile" />*/}
                            {/*</div>*/}
                            <FormControl variant="outlined">{/*
                            <InputLabel required></InputLabel>*/} {/*
                            <FormHelperText classes={{root:classes.droplabel}}>Country*</FormHelperText>*/} {/*
                            <Select className="Trade_ready_step_2_Select_container" labelId='select-demo' id='florida-select' displayEmpty name="branchname" value={branchname} onChange={(e)=>setBranchName(e.target.value)} >
                                <MenuItem value=''>Empty</MenuItem>
                                <MenuItem value={ 'first'}>first</MenuItem>
                                <MenuItem value={ 'second'}>second</MenuItem>
                                <MenuItem value={ 'third'}>Third</MenuItem>
                                <MenuItem value={ 'fourth'}>fourth</MenuItem>
                            </Select>*/}</FormControl>
                        </div>


                        {/* <div className="dbmn Trade_ready_step_2_save_button d-flex justify-content-end m-0">
                            {uaVerifiedStatus ? null :
                                <Buttons.PrimaryButton value="Save" style={{margin:"10px"}} disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)} onClick={saveContinue} />
                            }
                        </div> */}
                    </div>
                </div>
                <div className="col-md-6 col-12 mt-4" >
                    <div className="my-card my-4">
                        <div className="my-2">
                            <img src={bank} width="100"/>
                        </div>
                        <div className="my-2">
                            <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a>                           

                            <a href="#" target="_blank"  className="tradeready_question"><b><p className="mb-1">Why do you need to verify Bank Details ?</p></b></a>
                            <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">I have multiple bank accounts. Which one should I update ?</p></b></a>
                            <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">Can I use someone else's account number ?</p></b></a>  
                            <p className="text-small mb-1"> Please provide your bank account details. The account holder name must be same as the user name that was used while making the profile. Third party A/C will not be accepted.</p>
                            <p className="text-small mb-1"><b>Please note :</b>  We accept all Indian banks to be linked to your trade. We need your bank account details to ease the transaction process while trading.</p>          
                        </div>                        
                    </div>
                </div>

                <div className="tradeready-save-mobilebutton px-3">
                {!isLoadingbtn && (
                    <>
                        {uaVerifiedStatus ?  null:
                        <div className="d-flex">
                            <Buttons.PrimaryButton value="Save & continue" style={{marginTop:"10px"}} disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)} onClick={saveContinue} />

                            {/*<Buttons.PrimaryButton value="Re-verify" style={{marginTop:"10px",marginLeft:"10px"}}  />*/}
                            </div>
                            
                        }
                    </>
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
                
                </div>
            </div>
        // </div>

    )
}
export default AddBankAccount