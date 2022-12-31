
import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg"
import "./service.scoped.css"
import Valuation from "./valuation.png"
import { ReactComponent as BrokerIcon } from './assets/broker.svg';

import {isLoggedIn, apiCall, setAccessToken } from "../../Utils/Network"
import {
    successToast,errorToast
} from "../../../src/Components/Toast/index";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FindABroker  () {

    const [selectedCompany, setSelectedCompany] = React.useState('')
    const [qtyHolding, setQtyHolding] = React.useState('')
    const [buyorSell, setbBuyorSell] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [isLogin,setisLogin] = useState(isLoggedIn())
    const [userEmail, setUserEmail] = React.useState('')
    const [companyName, setCompanyName] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([])

    React.useEffect(() => GetAllcompany(), [])
    const GetAllcompany = async () => {
        let response = await apiCall("company/allcompaniesnames", 'GET')
        let responseJSON = await response.json()
        let companies = responseJSON.map((company) => {return {value: company.id , label: company.name}})
        setAllCompany(companies)

    }

    const handleCreate = async (event) => {


        event.preventDefault()

        if(isLogin) {

            if ((qtyHolding == undefined || qtyHolding == "")
                || (companyName == undefined || companyName == "")
                || (buyorSell == undefined || buyorSell == "")) {

                errorToast("Failed", "Except comment, All other fields are mandatory!!");
                return
            }
        } else {
            if ((userEmail == undefined || userEmail == "")
                || (qtyHolding == undefined || qtyHolding == "")
                || (companyName == undefined || companyName == "")
                    || (buyorSell == undefined || buyorSell == "")) {

                errorToast("Failed", "Except comment, All other fields are mandatory!!");
                return
            }
        }

        //console.log("selected company ", selectedCompany)
        let requestBody = {
            "EmailAddress":userEmail,
            "writecompanyName": companyName,
            "companyName": selectedCompany.label,
            "companyId": selectedCompany.value,
            "qtyHolding": qtyHolding,
            "buyorSell": buyorSell,
            "comment": comment,
        }
        //console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        console.log("request body stringified", stringifiedRequestBody)

        let response = await apiCall("offering/findbroker", 'POST', requestBody)

        if(response.status === 200){

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            errorToast("Failed", "Request not Submitted!!");
        }
        

    }

    return(
        <div className="LoanAgainstShares_container mb-5 bg-white">
            <div className="w-75 p-3">
            <BrokerIcon className="primary-svg-color"/>
            <h5 className="mt-2">Find a Buyer/Seller Offline</h5 >
            <div className="service_line"></div>
            <p className="text-small m-0 mt-3">Our associate entity has domain expertise in finding appropriate Buyer for your unlisted stocks and you may raise your query with us for any assistance for professional services for buying and selling unlisted shares and we will connect you to the relevant desk that will help you find the right Buy/Sell deals for Unlisted Shares. This window is currently open for a minimum transaction size of INR 10 million. We will have a detailed offline discussion for your requirements and will help you with a faster and best solution.
            </p>
            <p className="my-2 text-small">You may reach out by filling the below details:</p>
            {isLogin ? null :
                    <div className="mt-3">
                        <label className="text-small">Email Address *</label>
                        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                            type="text" className="service_input_box text-small" />
                    </div>}
            <div className="mt-3 service-select-input">
                <label className="text-small ">Company Name*</label>
                {/* <Select options={allCompany}  onChange={selectedOption=>setSelectedCompany(selectedOption)} value={selectedCompany} className="text-small "/> */}

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
            <div className="mt-1">
                <label className="text-small ">Buy/Sell*</label>
                <input value={buyorSell} onChange={(e)=>setbBuyorSell(e.target.value)}
                       type="text"  className="service_input_box text-small"/>
            </div>
            <div className="mt-1">
                <label className="text-small ">Qty*</label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box text-small"/>
            </div>
            {/*<div style={{marginTop:"10px"}}>*/}
            {/*    <label>Price *</label>*/}
            {/*    <input type="text"  className="service_input_box"/>*/}
            {/*</div>*/}
            {/*<div style={{marginTop:"10px"}}>*/}
            {/*    <label>Deadline *</label>*/}
            {/*    <input type="text"  className="service_input_box"/>*/}
            {/*</div>*/}
            <textarea value={comment} onChange={(e)=>setComment(e.target.value)}
                      placeholder="Comments" className="service_input_box text-small" style={{height:"200px",resize:"none"}}/>

                {
                    isLogin ?
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                        :
                        <Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} />

                }

            {/*<Buttons.PrimaryButton value="Send" onClick={handleCreate} style={{ width: "50%" }} disabled={!((isLogin ? null : userEmail) && comment && qtyHolding && buyorSell && selectedCompany || companyName)}/>*/}
            </div>
        </div>
    )

}