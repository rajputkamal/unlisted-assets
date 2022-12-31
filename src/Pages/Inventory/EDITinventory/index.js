import React from "react";
import AddHoldingForm from "./editInventoryForm";
import "./style.scoped.css";
import VideoPreviewAddholding from "../../../assets/video_preview_addholding.png";
import EditInventoryForm from "./editInventoryForm";
import PlayIcon from "../play.svg";
function EditInventory() {
  return (
    <div className="container">
      <div className="my-card mt-4 mb-4">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="editinventory_form-container">
              <EditInventoryForm />
            </div>
          </div>  
          <div className="col-md-6 col-12">
            <div className="editinventory_left">
            <div className="my-card py-5 px-5">
                <div className="holding-play">
                  <img src={VideoPreviewAddholding} />
                  <img src={PlayIcon} className="playvideo"/>
                </div>
                <div className="mt-5">
                  <p className="m-0"><b>Holding</b></p>
                  <p className="text-small">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book.
                  </p>
                </div>
              </div>
              
            </div>
          </div>  
        </div>
       
       
      </div>
    </div>
  );
}

export default EditInventory;
