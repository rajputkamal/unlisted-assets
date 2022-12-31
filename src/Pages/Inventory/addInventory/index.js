import React from "react";
import AddInventoryForm from "./addInventoryForm";
import "./addlistingstyle.scoped.css";
import VideoPreviewAddholding from "../../../assets/video_preview_addholding.png";
import VideoPlay from "../../../assets/play.png";

import '../../Companies/bootstrap4/css/bootstrap.scoped.css';

function AddHoldings() {
  return (
    <div className="addinvetory-main container">
      <div className="my-card bg-white mt-5 p-3">
        <div className="row">
        <div className="col-md-6 col-12">
          <div className="addholding_form-container">
            <AddInventoryForm />
          </div>
        </div>
        <div className="col-md-6 col-12"  > 
          <div className="addholding_left-inner" >
            <div className="play-video">
              <img className="video-img"  src={VideoPreviewAddholding} />
              {/* <img className="play-icon " src={VideoPlay} /> */}
            </div>
            <div className="mt-3 holding-desc">
              <h6><strong>Listing</strong></h6>
              <p >
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
  );
}

export default AddHoldings;
