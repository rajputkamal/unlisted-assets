import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg"
import "./service.scoped.css"
import { ReactComponent as ValuationIcon } from './assets/valuation.svg';
import { isLoggedIn,apiCall, setAccessToken } from "../../Utils/Network"
import {
    successToast, errorToast
} from "../../../src/Components/Toast/index";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ValuationForTheShares() {

    const [selectedCompany, setSelectedCompany] = React.useState('')
    const [qty, setQty] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [deadLine, setDeadLine] = React.useState('')
    const [purpose, setPurpose] = React.useState('')
    const [isLogin,setisLogin] = useState(isLoggedIn())
    const [userEmail, setUserEmail] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([])

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

            if ((deadLine == undefined || deadLine == "")
                || (qty == undefined || qty == "")
                || (companyName == undefined || companyName == "")) {

                errorToast("Failed", "Except purpose, All other fields are mandatory!!");
                return
            }
        } else {
            if ((userEmail == undefined || userEmail == "")
            || (deadLine == undefined || deadLine == "")
                || (qty == undefined || qty == "")
                || (companyName == undefined || companyName == "")) {

                errorToast("Failed", "Except purpose, All other fields are mandatory!!");
                return
            }
        }

        // console.log("selected company ", selectedCompany) 
        let requestBody = {
            "EmailAddress":userEmail,
            "writecompanyName": companyName,
            "companyName": selectedCompany.label,
            "companyId": selectedCompany.value,
            "qty": qty,
            "price": price,
            "deadLine": deadLine,
            "purpose": purpose,          

        }
        // console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        console.log("request body stringified", stringifiedRequestBody)

        let response = await apiCall("offering/valuationforshares", 'POST', requestBody)

        if (response.status === 200) {

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            errorToast("Failed", "Request not Submitted!!");
        }


    }


    return (
        <div className="LoanAgainstShares_container mb-5 bg-white">
            <div className="w-75 p-3">
                <ValuationIcon className="primary-svg-color" />
                <h5 className="mt-2">Valuation for Unlisted shares</h5>
                <div className="service_line"></div>
                <p className="m-0 mt-3 text-small">Our associate entity is one of the leading firms for valuation of businesses and intangibles assets and is supported by team of experts in that domain to help you with customized valuation reports if required for any particular transaction or any assistance required for your internal management analysis.</p>
                <p className="my-2 text-small">You may reach out by filling the below details:</p>

                {isLogin ? null :
                    <div className="mt-3">
                        <label className="text-small">Email Address *</label>
                        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                            type="text" className="service_input_box text-small" />
                    </div>}

                <div className="mt-3 service-select-input">
                    <label className="text-small">Company Name*</label>
                    {/* <Select options={allCompany} onChange={selectedOption => setSelectedCompany(selectedOption)} value={selectedCompany} className="text-small" /> */}

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
                </div>

                <div className="mt-3">
                    <label className="text-small">Number of shares held*</label>
                    <input value={qty} onChange={(e) => setQty(e.target.value)}
                        type="text" className="service_input_box text-small" />
                </div>
                {/* <div className="mt-3">
                <label className="text-small ">Price *</label>
                <input value={price} onChange={(e)=>setPrice(e.target.value)}
                    type="text"  className="service_input_box text-small"/>
                </div> */}
                <div className="mt-3">
                    <label className="text-small">Expected Timelines*</label>
                    <input value={deadLine} onChange={(e) => setDeadLine(e.target.value)}
                        type="text" className="service_input_box text-small" />
                </div>
                <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Purpose of Valuation" className="service_input_box text-small" style={{ height: "200px", resize: "none" }} />

                {
                    isLogin ?
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                        :
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                }
                {/*<Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} disabled={!((isLogin ? null : userEmail) && purpose && deadLine && qty && selectedCompany || companyName)}/>*/}
            </div>
        </div>
    )

}