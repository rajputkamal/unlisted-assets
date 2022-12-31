import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Clear as ClearIcon,
} from "@material-ui/icons";
import Profileuserpiclogo from "./Profileuserpiclogo.png"; 
// import './Index_Profile.css';
import Buttons from "../../Components/Buttons";
import {
  successToast,errorToast
} from "../../../src/Components/Toast/index"; 

function ChoosePhoto({ open, close, onFileSelect, name }) { 

  const isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }


    const fileChange = e => {
        if(e.target.files.length < 1){
            return;
        }
        const file = e.target.files[0];
        const fsize = file.size;
        const file2 = Math.round((fsize / 1024));

        if(isValidFileUploaded(file) && (file2 <= 1024)){
          onFileSelect(e.target.files[0])

            console.log("file2",file2)
            console.log("file is valid")
        }else{
            errorToast("Invalid", "Please Upload valid file You Can Only Upload less then 1Mb and PNG, JPG and PDF format...");
            console.log("file is invalid")
        }
    }



  return (
      <>

      <Modal open={open} onClose={close} className="profile-form_photo-modal">
        <div className="profile-form_photo-content">
          {/* <AccountCircleIcon style={{ width: "100px", height: "100px" }} /> */}
          <img src={Profileuserpiclogo} style={{ width: "100px", height: "100px", margin:"20px" }}  />
          {/* <p>Choose Photo for your profile</p> */}
          {/* <span style={{ paddingLeft:"120px"}}><input type="file" onChange={(e) => onFileSelect(e.target.files[0])} /></span> */}
          <span style={{ paddingLeft:"120px"}}><input type="file" onChange={fileChange} /></span>
          <button onClick={close}>{name}</button>
        </div>
      </Modal>
      
      </>

      
  );
}

export default ChoosePhoto;