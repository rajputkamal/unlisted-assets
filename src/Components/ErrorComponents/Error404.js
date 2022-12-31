import React from "react";
import "./Error.css";
import Error404img from "./assets/Error404.svg";
import { imgurl } from "../../Utils/Network";
import Buttons from "../Buttons";
import { useHistory } from "react-router-dom";

export default function Error404() {
  let history = useHistory();
  return (
    <>
      <div className="container error_container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-4 col-12 error-div mt-5 mb-5">
            <div>
              <h1>ERROR 404</h1>
              <h6>Page Not Found</h6>
              <Buttons.PrimaryButton
                value="Go To Homepage"
                style={{ width: "100%" }}
                onClick={() => history.replace("")}
              />
            </div>
          </div>

          <div className="col-md-8 col-12">
            <img src={imgurl("Error404.svg")} className="error-img" />
          </div>
        </div>
      </div>
    </>
  );
}
