import React from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import AddHoldings from "./addholdings.svg";
import "./holdings.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";

let Holdings = () => {
    let history = useHistory();
    return (
        <div className="w-100 p-3 no-stock-section">
            <div className="my-card d-flex align-items-center justify-content-center w-100 ">
                <div className="w-50 text-center py-5 px-5">
                    <div>
                        <img src={AddHoldings} className="mb-3"/>
                    </div>
                    <div>
                        <h5 className="text-default-secoundary"> 
                            <b>
                                Create a holding of your Stocks to start selling them in the marketplace
                            </b> 
                        </h5>
                        <p className="text-small mt-3 mb-0 p-0">
                        Our platform enables you to create your holdings and then listings which will be available on the marketplace and visible to sellers for bidding and then transacting on the platform.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary-default" onClick={()=>{history.push("/addholdings")}} style={{width:"200px"}}
                        >Add Holding</button>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-default-secoundary cursor-pointer " onClick={() => history.goBack()}><b style={{borderBottom:"1px solid"}}> Go back</b></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Holdings