import React from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import { apiCall, setAccessToken } from "../../../../Utils/Network"
import { Link, useHistory } from "react-router-dom";



const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

let InlineValidationBoxExistingHolding = () => {
  return (
      <div className="inline-validation-box">
          <p>
              Note: Holding already exists for this company’s Share type “ESOP”. You can continue to create a “New Holding” for another share type or add edit your existing holding.
      </p>
          <Link to="/holdings">Go to my existing Holdings</Link>
      </div>
  )
}


function AddHoldingsForm() {
    let history = useHistory();

  const [selectedCompany, setSelectedCompany] = React.useState('')
  const [selectedCommodity, setSelectedCommodity] = React.useState('')

  const [shareType, setShareType] = React.useState('')
  const [qtyHeld, setQtyHeld] = React.useState('')
  const [demated, setDemated] = React.useState('')
  const [vested, setVested] = React.useState(true)


  const [allCompany, setAllCompany] = React.useState([])
  const [allCommodity, setAllCommodity] = React.useState([])

  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);




  React.useEffect(() => GetAllcompany(), [])
  const GetAllcompany = async () => {
      let response = await apiCall("company/", 'GET','', history)
      if(response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return
      }
      let responseJSON = await response.json()
      let companies = responseJSON.map((company) => {return {value: company.id , label: company.name}})
      setAllCompany(companies)

  }

  React.useEffect(() => GetAllCommodity(), [])

  const GetAllCommodity = async () => {
      let response = await apiCall("commodity/", 'GET','', history)
      if(response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return
      }
      let responseJSON = await response.json()
      let commodity = responseJSON.map((item) => {return {value: item.id, label: item.name }})
      setAllCommodity(commodity)

  }

  const handleCreate = async (event) => {
    event.preventDefault()
    let dematBoolean, vestedBoolean
    if (demated === "yes") {
      dematBoolean = true
    } else {
      dematBoolean = false
    }
    if (vested === "yes") {
      vestedBoolean = true
    } else {
      vestedBoolean = false
    }
    // console.log("selected company ", selectedCompany)
    let requestBody = {
      "companyName": selectedCompany.label,
      "companyId": selectedCompany.value,
      "productId": 2,
      "commodityId": selectedCommodity.value,
      "commodityName": selectedCommodity.label,
      "qtyTotal": qtyHeld,
      "qtySale": 0,
      "qtyFreezed": 2,
      "isDemated": dematBoolean,
      "isVested": vestedBoolean,
      // "specialConditionTransfer": specialConditionForTransfer,
      "createDate": null,
      "updateDate": null,
      "uaVerificationStatus": "2",
      "uaVerificationRemark": "2",
      "proofDocument": null

    }
    // console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody)

    // console.log("request body stringified", stringifiedRequestBody)

    // let response = await fetch("http://api1.unlistedassets.com/myholding/?access_token=b175ef54-e6af-41c3-ba0b-a5bbad752b9d", 
    //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
    //     )
    let response = await apiCall("myholding/", 'POST', requestBody, history)
      if(response.status == undefined) {
          // errorToast("Invalid", "Invalid User ID or password");
          return
      }
      if (response.status === 409) {
      setShowExistingHoldingInlineValidation(true)
      return
    }
    else {
      setShowExistingHoldingInlineValidation(false)
      let responseJSON = await response.json()

      // console.log("response ", response)

      // console.log("responseJson", responseJSON)

      setOpen(true);
    }


  }

  
  return (
    <form className="addholding-form">
      <div>
        <h1>Create Holding</h1>
      </div>
      <div className="addholding-form_field ">
        <label>Company Name*</label>
        <Select options={allCompany} onChange={selectedOption => setSelectedCompany(selectedOption)} value={selectedCompany}/>
      </div>

      {showExistingHoldingInlineValidation ? <InlineValidationBoxExistingHolding /> : null}

      <div className="addholding-form_field addholding-form_field-2">
        <div>
          <label>Share Type*</label>
          <Select options={allCommodity} onChange={selectedOption => setSelectedCommodity(selectedOption)} value={selectedCommodity}/>
        </div>
        <div>
          <label>Quantity*</label>
          <input value={qtyHeld} onChange={(e) => setQtyHeld(e.target.value)}/>
        </div>
      </div>
      <div className="addholding-form_field">
        <p>Vested*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input type="radio" id="vested" name="vested" value="yes" checked={vested === "yes" ? true : false} onChange={(e) => {setVested("yes")}}/>
          </div>
          <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input type="radio" id="vested" name="vested" value="no" checked={vested === "no" ? true : false} onChange={(e) => setVested("no")}/>
          </div>
        </div>
      </div>
      <div className="addholding-form_field">
        <p>Demated*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input type="radio" id="demated" name="demated" value="yes" checked={demated === "yes" ? true : false} onChange={(e) => {setDemated("yes")}}/>
          </div>
          <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input type="radio" id="demated" name="demated" value="no" checked={demated === "no" ? true : false} onChange={(e) => {setDemated("no")}}/>
          </div>
        </div>
      </div>
      <div className="addholding-form_field "></div>
      <div className="addholding-form_field ">
        <label>Special conditions for transfer*</label>
        <Select isMulti options={options} />
      </div>
      <div className="addholding-form_field addholding-form_upload-photo">
        <img src={UploadIcon} />
        <p>
          Upload your proof of holding. You can upload the screenshot (share
          certificate/demat holding) as proof or browse
        </p>
      </div>
      <div className="addholding-form_note">
        <p>
          Note: Uploading a fake or an outdated inventory is punishable by law.
          Please verify your inventory thoroughly to avoid any Infringement.
          This will lead to permanent blocking of your credentials from our
          platform. Click here to read guideleines.
        </p>
      </div>
      <div className="addholding-form_button_container">
        <button>Discard</button>
        <button onClick={handleCreate}>Create Holding</button>
      </div>
    </form>
  );
}

export default AddHoldingsForm;
