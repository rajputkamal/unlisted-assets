import React from "react";
import AddHoldings from "../../Holdings/addholdings.svg";
import "./CreateHoldings.css";
import Buttons from "../../../Components/Buttons";
import HourglassIcon from './HourglassIcon.svg'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";

let CreateHoldings = () => {
    let history = useHistory();
    const [requestToOnboarding,setRequestToOnboarding] = React.useState(false)

    const RequestOnboard =()=>{
        setRequestToOnboarding(true)
    }
    return (
        <div className="w-100 p-3 no-stock-section">
            <div className="my-card CreateHoldings-main d-flex align-items-center justify-content-center w-100 ">
                <div className="w-50 text-center py-5">
                    <div>
                        <img src={HourglassIcon} />
                        {/* <img src={AddHoldings} className="mb-3"/> */}
                    </div>
                    <div>
                        <h5 className="text-default-secoundary my-3"> 
                        {!requestToOnboarding? <b>Stay Tuned!
                            {/* Want to sell unlisted shares with us? <br/>Join the waitlist! */}
                            </b> :<b>
                            We look forward to have you onboard!  
                            </b>} 
                        </h5>

                        
                        
                        {!requestToOnboarding? <b>
                            <p className="text-small  mb-0 p-0">“Sell Stocks” feature is coming soon.</p>
                            <p className="text-small mt-3 mb-0 p-0">
                            Meanwhile, you could check out our marketplace and <br/>make offers on shares of your choice! 
                        </p>
                            </b> :<p className="text-small mt-3 mb-0 p-0">
                            We have received your request to become a seller. Our team will reach out to you as soon as our waitlist opens up. 
                        </p>}
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <Buttons.SecondaryButton value="Explore Marketplace" style={{ width: "35%" }} onClick={()=>{history.push("/inventory_1")}}/>
                        {/* <button className="btn btn-primary-default" onClick={()=>{history.push("/addholdings")}} style={{width:"200px"}}
                        >Join sellers waitlist</button> */}
                        {/* {!requestToOnboarding && <Buttons.PrimaryButton  value="Join sellers waitlist" style={{ width: "35%" }} id="add-holdings-button" 
                        onClick={RequestOnboard} 
                        />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateHoldings