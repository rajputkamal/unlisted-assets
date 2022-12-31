import React from "react";
import { Modal } from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Clear as ClearIcon,
} from "@material-ui/icons";
import Profileuserpiclogo from "./Profileuserpiclogo.png"

function ChoosePhoto({ open, close, onFileSelect, name }) {
  return (
    <Modal open={open} onClose={close} className="profile-form_photo-modal">
      <div className="profile-form_photo-content">
        <div className="profile-form_photo-close" onClick={close}>
          <ClearIcon />
        </div>
        {/* <AccountCircleIcon style={{ width: "100px", height: "100px" }} /> */}
        <img src={Profileuserpiclogo} style={{ width: "100px", height: "100px", margin:"20px" }}  />
        {/* <p>Choose Photo for your profile</p> */}
        <span style={{ paddingLeft:"120px"}}><input type="file" onChange={(e) => onFileSelect(e.target.files[0])} /></span>
        <button onClick={close}>{name}</button>
      </div>
    </Modal>
  );
}

export default ChoosePhoto;
