import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg";
import "./service.scoped.css";
import Loan from "./assets/loan.svg";
import { ReactComponent as LoanIcon } from './assets/loan.svg';

import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import { isLoggedIn, apiCall, setAccessToken } from "../../Utils/Network"
import {
    successToast, errorToast
} from "../../../src/Components/Toast/index";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function LoanAgainstShares() {

    const [selectedCompany, setSelectedCompany] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')
    const [qtyHolding, setQtyHolding] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    const [comment, setComment] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([])
    const [isLogin, setisLogin] = useState(isLoggedIn())

    React.useEffect(() => GetAllcompany(), [])
    const GetAllcompany = async () => {
        let response = await apiCall("company/allcompaniesnames", 'GET')
        let responseJSON = await response.json()
        let companies = responseJSON.map((company) => { return { value: company.id, label: company.name } })
        setAllCompany(companies)

    }

    const handleCreate = async (event) => {


        event.preventDefault()

        if(isLogin) {

            if ((qtyHolding == undefined || qtyHolding == "")
                || (companyName == undefined || companyName == "")) {

                errorToast("Failed", "Except comment, All other fields are mandatory!!");
                return
            }
        } else {
            if ((userEmail == undefined || userEmail == "")
                || (qtyHolding == undefined || qtyHolding == "")
            || (companyName == undefined || companyName == "")) {

                errorToast("Failed", "Except comment, All other fields are mandatory!!");
                return
            }
        }

        //console.log("selected company ", selectedCompany)
        let requestBody = {
            "writecompanyName": companyName,
            "companyName": selectedCompany.label,
            "companyId": selectedCompany.value,
            "qtyHolding": qtyHolding,
            "EmailAddress": userEmail,
            "comment": comment,
        }

        let stringifiedRequestBody = JSON.stringify(requestBody)

        console.log("request body stringified", stringifiedRequestBody)

        let response = await apiCall("offering/loanagainstshares", 'POST', requestBody)

        if (response.status === 200) {

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            errorToast("Failed", "Request not Submitted!!");
        }



    }

    // const companySelect = (e ,value) =>{
    //     if(companyName == true){
    //         setSelectedCompany("")
    //     }
    //     else{ setSelectedCompany(value)
    //     }
    // }


    // const genders = [
    //     {
    //       value: 'M',
    //       label: 'Male',
    //     },
    //     {
    //       value: 'F',
    //       label: 'Female',
    //     },
    //     {
    //       value: 'O',
    //       label: 'Other',
    //     },
    //   ];
      
    //   const useStyles = makeStyles(theme => ({
    //     container: {
    //       display: 'flex',
    //       flexWrap: 'wrap',
    //     },
    //     textField: {
    //       marginLeft: theme.spacing(1),
    //       marginRight: theme.spacing(1),
    //       width: 100
    //     },
    //     dense: {
    //       marginTop: theme.spacing(2),
    //     },
    //     menu: {
    //       width: 100,
    //     },
    //   }));

    // const classes = useStyles();
    // const [gender, setGender] = React.useState("");
  
    // const handleChange = event => {
    //   setGender(event.target.value);
    // };

    return (
        <div className="LoanAgainstShares_container mb-5 bg-white">

            <div className="w-75 p-3">
                <LoanIcon className="primary-svg-color" />
                <h5 className="mt-2">Loan/Liquidity Against Shares</h5>
                <div className="service_line"></div>
                <p className="m-0 mt-3 mb-2 text-small">If you are an ESOP holder or a Share holder in Unlisted Companies and you want to create liquidity for various purposes including:
                </p>
                <ul className="mb-1">
                    <li className="text-small">Paying Statutory taxes/Dues for ESOP conversion to shares</li>
                    <li className="text-small">Meeting emergency requirement</li>
                    <li className="text-small">Buying house or any other real estate from market </li>
                    <li className="text-small">Investing elsewhere in any assets class</li>
                </ul>
                <p className="mb-1 text-small">You may reach out by filling below details:</p>
                {isLogin ? null :
                    <div className="mt-3">
                        <label className="text-small">Email Address *</label>
                        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                            type="text" className="service_input_box text-small" />
                    </div>}


                <div className="mt-3 service-select-input">
                    <label className="text-small">{isLogin ? <span>Name of the entity</span> : <sapn>Company Name *</sapn>} </label>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={allCompany}
                            // value={selectedCompany}
                            onChange={(event, value) => setSelectedCompany(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onSelect={(e) => setCompanyName(e.target.value)}
                                    onKeyDown={(e, value) => setCompanyName(e.target.value)}
                                    variant="outlined"
                                    placeholder="Select..."                                    
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />

                        
                    {/* <label className="text-small">{isLogin?<span>Name of the entity</span>:<sapn>Company Name *</sapn>} </label>
        <Select options={allCompany} onChange={selectedOption=>setSelectedCompany(selectedOption)} value={selectedCompany} className="text-small"/> */}


                </div>

                {/* ==================== */}


                {/* <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <div class="form-group has-search mb-0 ml-3 small-icon w-50">
                            <div className='inventory-search-icon form-control-feedback'>
                            </div>
                            <Autocomplete
                                style={{ width: "100%" }}
                                freeSolo
                                value={selectedCompany}
                                onChange={(event, value) => setSelectedCompany(value)}
                                options={allCompany}
                                renderInput={(params) => (
                                    <TextField {...params}
                                    onChange={(e) => (setCompanyName(e.target.value), setSelectedCompany(""))}
                                        className="inventory-search-bar"
                                        placeholder="Search Company Name"
                                        variant="outlined"


                                    />
                                )}
                            />
                        </div>
                    </div>
                </div> */}

            {/* ==================== */}

            



            <div className="mt-3">
                <label className="text-small">{isLogin ? <span>Qty held by</span> : <sapn>Quantity Holding *</sapn>}</label>
                <input value={qtyHolding} onChange={(e) => setQtyHolding(e.target.value)}
                    type="text" className="service_input_box text-small" />
            </div>
            {/*<div className="mt-1">*/}
            {/*<label className="text-small">Qty which you are looking for Selling*</label>*/}
            {/*<input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}*/}
            {/*    type="text"  className="service_input_box text-small"/>*/}
            {/*</div>*/}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                placeholder="Comments" className="service_input_box text-small" style={{ height: "200px", resize: "none" }} />
            <div className="service_aware mb-4">
                <img src={Aware} style={{ margin: "0px 10px", }} />
                <p className="m-0 p-3 "><b>Note:</b> The charges for valuation/loan will vary according to the number of days left for the deadline.</p>
            </div>

                {
                    isLogin ?
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                        :
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                }
        </div>
    </div >
)

}