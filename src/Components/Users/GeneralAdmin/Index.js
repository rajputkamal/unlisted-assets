import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../../Components/Buttons";
// import Aware from "./not.svg";
// import "./../../../service.scoped.css";
// import Loan from "./assets/loan.svg";
import '../../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import { apiCall, setAccessToken } from "../../../Utils/Network"
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";


export default function GeneralAdmin  () {

    const [selectedCompany, setSelectedCompany] = React.useState('')
    const [qtyHolding, setQtyHolding] = React.useState('')
    // const [selectedCompany, setSelectedCompany] = React.useState('')
    // const [qtyHolding, setQtyHolding] = React.useState('')
    // const [selectedCompany, setSelectedCompany] = React.useState('')
    // const [qtyHolding, setQtyHolding] = React.useState('')
    // const [selectedCompany, setSelectedCompany] = React.useState('')
    // const [qtyHolding, setQtyHolding] = React.useState('')


    React.useEffect(() => GetAllcompany(), [])
    const GetAllcompany = async () => {
        let response = await apiCall("admincontroller/generaladmin", 'GET')
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json()
        //slet companies = responseJSON.map((company) => {return {value: company.id , label: company.name}})
        // setAllCompany(companies)
   }

    const handleCreate = async (event) => {


        event.preventDefault()

        // console.log("selected company ", selectedCompany)
        let requestBody = {
            "companyName": selectedCompany.label,
            "companyId": selectedCompany.value,

            "qtyHolding": qtyHolding,

        }
        // console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        // console.log("request body stringified", stringifiedRequestBody)

        let response = await apiCall("admincontroller/generaladmin", 'PUT', requestBody)

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        if(response.status === 200){

            successToast("Success", "Saved, Successfully!!");
        } else {

            errorToast("Failed", "Not Saved!!");
        }
    }

    return(
    <div className="LoanAgainstShares_container mb-5 bg-white">
        <div className="w-75 p-3">
        <h5 className="mt-2">General Admin</h5>
        <div className="service_line"></div>

        <div style={{marginTop:"10px"}}>
        <label>How many active buyers can bid on one inventory*</label><br/>
        <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
            type="text"  className="service_input_box"/>
            <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
        </div>

        <div style={{marginTop:"10px"}}>
                <label>How many items (Paytm, Swiggy, Zomato etc) can a buyer negotiate/bid for*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
            <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
        </div>
            <div style={{marginTop:"10px"}}>
                <label>Overall number of active bids by a buyer cannot exceed x number of sellers at any point in time*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>
            <div style={{marginTop:"10px"}}>
                <label>For what time a new inventory will be live before ULS system auto terminates the live status*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>

            <div style={{marginTop:"10px"}}>
                <label>Maximum time for buyer to deposit and make payment after signing of buyer/seller agreement*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>

            <div style={{marginTop:"10px"}}>
                <label>Maximum time for seller to transfer shares after receipt of payment in escrow account*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>

            <div style={{marginTop:"10px"}}>
                <label>For what time an offer will be valid for the other party to accept/react upon*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>

            <div style={{marginTop:"10px"}}>
                <label>Maximum time in which buyer has to acknowledge the share transfer by the seller*  </label>
                <input value={qtyHolding} onChange={(e)=>setQtyHolding(e.target.value)}
                       type="text"  className="service_input_box"/>
                <Buttons.PrimaryButton value="Save" onClick={handleCreate} style={{width:"25%"}}/>
            </div>

            <br/>
            <br/>

    </div>
    </div>
)

}