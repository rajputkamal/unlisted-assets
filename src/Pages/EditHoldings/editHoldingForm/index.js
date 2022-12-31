import React from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../assets/upload_icon.svg";
import Buttons from "../../../Components/Buttons";

const additionalConditions = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

function EditHoldingsForm({ allCommodity, editedData, handleChange, submit }) {

  
  return (
    <form className="editholding-form">
      <div className="editholding-form_field addholding-form_field-2">
        <div>
          <label>Share Type*</label>
          <Select
            options={allCommodity}
            defaultValue={{
              value: editedData.commodityId, label: editedData.commodityName
            }}
            onChange={(e) => {
              handleChange("commodityId", e.value);
            }}
          />
        </div>
        <div>
          <label>Quantity*</label>
          <input
            className="editholding-form_qty"
            value={editedData.qtyTotal}
            onChange={(e) => handleChange("qtyTotal", e.target.value)}
          />
        </div>
       </div>
      <div className="editholding-form_field">
        <p>Vested*</p>
        <form className="editholding-form_radio-btn-group">
          <div className="editholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="drone"
              value="yes"
              checked={editedData.isVested}
              onChange={() => handleChange("isVested", true)}
            />
          </div>
          <div className="editholding-form_radio-btn">
            <label for="no">No</label>
            <input
              type="radio"
              id="no"
              name="drone"
              value="no"
              checked={!editedData.isVested}
              onChange={() => handleChange("isVested", false)}
            />
          </div>
        </form>
      </div>

      <div className="editholding-form_field">
        <p>Demated*</p>
        <form className="editholding-form_radio-btn-group">
          <div className="editholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="drone"
              value="yes"
              checked={editedData.isDemated}
              onChange={() => handleChange("isDemated", true)}
            />
          </div>
          <div className="editholding-form_radio-btn">
            <label for="no">No</label>
            <input
              type="radio"
              id="no"
              name="drone"
              value="no"
              checked={!editedData.isDemated}
              onChange={() => handleChange("isDemated", false)}
            />
          </div>
        </form>
      </div>
      <div className="editholding-form_field "></div>
      <div className="editholding-form_field ">
        <label>Special conditions for transfer*</label>
        <Select
          isMulti
          options={editedData.specialConditionTransfer}

          // onChange={a11 =>{console.log(a11)}}
        />
      </div>
    
        <div className="addinventory-form_field addinventory-form_upload-photo">
            <div className="custom-file-upload">
              <input type="file" className="form-control fileupload-input" ></input>
                <img src={UploadIcon} width='100' className="mr-3"/>
                <p style={{color: "#2E384D", fontSize:"13px"}}>
                    Upload proof of share such as CML copy, Screenshot of holdings from NSDL/CDSL etc with timestamp, <br /> You can upload it as <br/> a PDF
                  <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>
                </p>
            </div>
        </div>
       

      <div className="editholding-form_button_container">
        <Buttons.PrimaryButton onClick={submit} value="Submit"/>
      </div>
    </form>
  );
}

export default EditHoldingsForm;
