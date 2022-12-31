import React from "react";
import AddHoldingForm from "./addHoldingForm/index";
import "./style.css";
import VideoPreviewAddholding from "../../../assets/video_preview_addholding.png";
import PlayIcon from "./play.svg";
import Breadcrumb from "../../../Components/Breadcrumbs";
function AddHoldings() {
  return (
    <div className="container add-holding-section">
      <Breadcrumb />
      <div className="mb-5 my-card overflow-hidden">
        <div className="row overflow-hidden">
          <div className="col-md-7 col-12">
            <div className="addholding_right">
              <div className="addholding_form-container">
                <AddHoldingForm />
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="my-card py-5 px-5 holding-details-box">
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
  );
}

export default AddHoldings;
