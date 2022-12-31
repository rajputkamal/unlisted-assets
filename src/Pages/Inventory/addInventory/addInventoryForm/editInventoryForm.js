import React from "react";
import Select from "react-select";
import "./style.scoped.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import { apiCall, setAccessToken } from "../../../../Utils/Network";
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

let InlineValidationBoxExistingHolding = () => {
  return (
    <div className="inline-validation-box">
      <p>
        Note: Holding already exists for this company’s Share type. You
        can continue to create a “New Holding” for another share type or add
        edit your existing holding.
      </p>
      <Link to="/holdings">Go to my existing Holdings</Link>
    </div>
  );
};

function EditInventoryForm() {
  let location = useLocation();
  let selectedHolding = location.state.selectedHolding;

  // console.log("selectedHolding in add inventory", selectedHolding);

  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [selectedCommodity, setSelectedCommodity] = React.useState("");

  const [shareType, setShareType] = React.useState("");
  const [qtyHeld, setQtyHeld] = React.useState("");
  const [qtySold, setQtySold] = React.useState("");
  const [minbid, setMinbid] = React.useState("");
  const [buyprice, setBuyprice] = React.useState("");

  const [allCompany, setAllCompany] = React.useState([]);
  const [allCommodity, setAllCommodity] = React.useState([]);

  const [
    showExistingHoldingInlineValidation,
    setShowExistingHoldingInlineValidation,
  ] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => GetAllcompany(), []);
  const GetAllcompany = async () => {
    let response = await apiCall("company/", "GET");
    let responseJSON = await response.json();
    let companies = responseJSON.map((company) => {
      return { value: company.id, label: company.name };
    });
    setAllCompany(companies);
  };

  React.useEffect(() => GetAllCommodity(), []);

  const GetAllCommodity = async () => {
    let response = await apiCall("commodity/", "GET");
    let responseJSON = await response.json();
    let commodity = responseJSON.map((item) => {
      return { value: item.id, label: item.name };
    });
    setAllCommodity(commodity);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    // let dematBoolean, vestedBoolean
    // if (demated === "yes") {
    //   dematBoolean = true
    // } else {
    //   dematBoolean = false
    // }
    // if (vested === "yes") {
    //   vestedBoolean = true
    // } else {
    //   vestedBoolean = false
    // }
    // console.log("selected company ", selectedCompany);
    let requestBody = {
      companyName: selectedCompany.label,
      companyId: selectedCompany.value,
      productId: 2,
      commodityId: selectedCommodity.value,
      commodityName: selectedCommodity.label,
      qtyTotal: qtyHeld,
      qtySale: 0,
      qtyFreezed: 2,
      isDemated: true,
      isVested: true,
      // "specialConditionTransfer": specialConditionForTransfer,
      createDate: null,
      updateDate: null,
      uaVerificationStatus: "2",
      uaVerificationRemark: "2",
      proofDocument: null,
    };
    // console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    // console.log("request body stringified", stringifiedRequestBody);

    // let response = await fetch("http://api1.unlistedassets.com/myholding/?access_token=b175ef54-e6af-41c3-ba0b-a5bbad752b9d",
    //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
    //     )
    let response = await apiCall("myholding/", "POST", requestBody);
    if (response.status === 409) {
      setShowExistingHoldingInlineValidation(true);
      return;
    } else {
      setShowExistingHoldingInlineValidation(false);
      let responseJSON = await response.json();

      // console.log("response ", response);

      // console.log("responseJson", responseJSON);

      setOpen(true);
    }
  };

  return (
    <form className="addinventory-form">
      <div>
        <h1>Edit Lisiting</h1>
      </div>

      <div>
        <h3>{selectedHolding.companyName}</h3>
        {/* <p>Holding ID : {selectedHolding.id}</p> */}
      </div>

      {showExistingHoldingInlineValidation ? (
        <InlineValidationBoxExistingHolding />
      ) : null}

      <div className="addInventory-form_field addinventory-form_field-2">
        <div>
          <label className="m-0"> Quantity*
          <Tooltip title={<p className="mb-0">Your total verified shares for this company</p>}
                placement="right" arrow enterTouchDelay={0}><InfoOutlinedIcon className="marketplace-infoicon"/>
          </Tooltip></label>
          <input value={selectedHolding.qtyTotal} disabled />
        </div>
        <div>
          <label className="m-0"> Quantity to be sold*</label>
          <input value={qtySold} onChange={(e) => setQtySold(e.target.value)} />
        </div>
      </div>

      <div className="addInventory-form_field addinventory-form_field-2">
        <div>
          <label className="m-0"> Minimum bid accepted*</label>
          <input value={minbid} onChange={(e) => setMinbid(e.target.value)} />
        </div>
        <div>
          <label className="m-0"> Buy it now price*</label>
          <input
            value={buyprice}
            onChange={(e) => setBuyprice(e.target.value)}
          />
        </div>
      </div>

      <div className="addinventory-form_field addinventory-form_upload-photo">
        <div className="custom-file-upload">
          <input type="file" className="form-control fileupload-input" ></input>
            <img src={UploadIcon} width='150' className="mr-3"/>
            <p style={{color: "#2E384D", fontSize:"13px"}}>
              Upload your proof of holding. You can upload the screenshot (share certificate/demat holding) 
                  as proof or  as proof or{" "} 
              <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>
            </p>
        </div>
      </div>
      <div className="addinventory-form_note">
        <div>
          <img src={not} style={{ margin: "5px", paddingTop: "15px" }} />
        </div>
        <div>
          <p>
            Note: You cannot add inventory without verifying it. Here is the
            guideline for uploading documents.
            <span>Click here</span>
          </p>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ color: "#2E384D", marginRight: "10px" }}>
            Total value of Listing: ₹ {qtySold} x {buyprice}
          </h3>

          <p
            style={{
              color: "#721B65",
              paddingRight: "20px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            {" "}
            ₹ {qtySold * buyprice}
          </p>
        </div>
        <div className="addinventory-form_button_container">
          <button className="discard_button">Discard</button>
          <Buttons.PrimaryButton
            onClick={handleCreate}
            value="Edit Listing"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </form>
  );
}

export default EditInventoryForm;
