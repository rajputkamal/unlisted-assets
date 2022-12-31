import React, { useEffect, useState } from "react";
import "./riskProfileQuestions.css"
import riskProfileImage from "./risk_profile_card_image.png"
import GreenCheckIcon from "./GreenCheck.svg"
import Buttons from "../../Components/Buttons/index"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import { apiCall } from "../../Utils/Network";

import {
    successToast,errorToast
} from "../../../src/Components/Toast/index";

import '../Companies/bootstrap4/css/bootstrap.scoped.css';


let RiskProfileQuestions = (props) => {
    const [details, setdetails] = React.useState([]);
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        const response = await apiCall("useronboarding/risk", "GET");

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        //console.log('responseJSONppppppp'+responseJSON.id);
        setdetails(responseJSON)

        if(responseJSON.id != undefined && responseJSON.id != "") {
            props.Submitnextpage()
        }
        // props.Submitnextpage()
    }

    async function updateProfile() {
        setLoadingbtn(true);
        const response = await apiCall(
            "useronboarding/risk",
            "POST",
            details
        );
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON = await response.json();

        successToast("Success", "Risk Profile successfully Saved or updated");
        setLoadingbtn(false);
        props.Submitnextpage()
    }

    function onUserInput(field, val) {
        details[field] = val;
        //console.log('yo1'+val);
        setdetails({ ...details });
        //console.log('yo'+{details});
    }

    return (
        <div className="my-card risk_card">
            <div className="risk_profile_content">
                <div className="main-content">
                    <div className="my-card ">
                        <div className="Card_info">
                            <div className="text">
                                <p class="title">Fill Your Risk Profile Questions</p>
                                <p class="text-small ">
                                A risk profile is an evaluation of an individual's willingness and ability to take risks. It can also refer to the threats to which an organization is exposed. A risk profile is important for determining a proper investment asset allocation.</p>                                
                            </div>
                            <div className="risk-profile-image-container">
                                <img src={riskProfileImage}/>
                            </div>                            
                        </div>
                        <div className="risk-profile-ul">
                            <ol>
                                <li class="text-small custom-width">A risk profile is important for determining a proper investment asset allocation for a portfolio</li>
                                <li class="text-small custom-width">Organizations use a risk profile as a way to mitigate potential risks and threats.</li>
                            </ol>
                        </div>
                        <p class="text-small custom-width">The risk profile needs to be completed to ascertain the Risk tolerance as well as time horizon in investing.  All information collected on the platform is for internal  research and learning purposes , your information is safe with us.</p>
                    </div>
                    <div className="mt-5 questions_content">
                        <h5 class="title">Questions</h5>
                        <p class="text-small">Please answer the following questions to help us determine your risk tolerance.</p>
                        <div className="question border-bottom pt-3 pb-3">
                            <div className="d-flex align-items-center ">
                                <img src={GreenCheckIcon} className="m-2"/>
                                <h6 className="m-0 text-small"><b>1. Have you invested in Unlisted Shares before? *</b></h6>
                            </div>
                            <div className="actions p-2">
                                <ToggleButtonGroup
                                    value={details.currentAlignment1}
                                    onChange={(e, newAlignment) => onUserInput("currentAlignment1", newAlignment)}
                                    exclusive
                                >
                                    <ToggleButton className='answer-btn' value="Yes" aria-label="Yes ">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="No" aria-label="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="question border-bottom pt-3 pb-3">
                            <div className="d-flex align-items-center ">
                                <img src={GreenCheckIcon} className="m-2"/>
                                <h6 className="m-0 text-small"><b>2. What describes you the most in relation to unlisted stocks *</b></h6>
                            </div>
                            <div className="actions p-2">
                                <ToggleButtonGroup
                                    value={details.currentAlignment2}
                                    onChange={(e, newAlignment) => onUserInput("currentAlignment2", newAlignment)}
                                    exclusive className="row d-flex justify-content-center"
                                >
                                       
                                            <ToggleButton className='answer-btn' value="Individual Investor" aria-label="Individual Investor">
                                                Individual Investor
                                            </ToggleButton> 
                                            <ToggleButton className='answer-btn' value="Company" aria-label="Company">
                                                Company
                                            </ToggleButton>                                     
                                       
                                            <ToggleButton className='answer-btn' value="HUF" aria-label="HUF">
                                                HUF
                                            </ToggleButton>
                                            <ToggleButton className='answer-btn' value="Institution" aria-label="Institution">
                                                Institution
                                            </ToggleButton>                                
                                    
                                    
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="question border-bottom pt-3 pb-3">
                            <div className="d-flex align-items-center ">
                                <img src={GreenCheckIcon} className="m-2"/>
                                <h6 className="m-0 text-small"><b>3. What is your networth? </b></h6>
                            </div>
                            <div className="actions p-2">
                                <ToggleButtonGroup
                                    value={details.currentAlignment3}
                                    onChange={(e, newAlignment) => onUserInput("currentAlignment3", newAlignment)}
                                    exclusive
                                >
                                    <ToggleButton className='answer-btn' value="0-5 Lakhs" aria-label="0-5 Lakhs">
                                        0-5 Lakhs
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="0-15 Lakhs" aria-label="0-15 Lakhs">
                                        0-15 Lakhs
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="15-50 Lakhs" aria-label="15-50 Lakhs">
                                        15-50 Lakhs
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <ToggleButtonGroup
                                value={details.currentAlignment3}
                                onChange={(e, newAlignment) => onUserInput("currentAlignment3", newAlignment)}
                                exclusive
                            >
                                    <ToggleButton className='answer-btn' value="50-100 Lakhs" aria-label="50-100 Lakhs">
                                        50-100 Lakhs
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="1 Crore" aria-label="1 Crore">
                                        1 Crore
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="question border-bottom pt-3 pb-3">
                            <div className="d-flex align-items-center ">
                                <img src={GreenCheckIcon} className="m-2"/>
                                <h6 className="m-0 text-small"><b>4. How do you take your investment decision  *</b></h6>
                            </div>
                            <div className="actions p-2">
                                <ToggleButtonGroup
                                    value={details.currentAlignment4}
                                    onChange={(e, newAlignment) => onUserInput("currentAlignment4", newAlignment)}
                                    exclusive
                                >
                                    <ToggleButton className='answer-btn' value="Self research" aria-label="Self research">
                                        Self research
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="Professional Guidance" aria-label="Professional Guidance">
                                        Professional Guidance
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="Banker" aria-label="Banker">
                                        Banker
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="question border-bottom pt-3 pb-3">
                            <div className="d-flex align-items-center ">
                                <img src={GreenCheckIcon} className="m-2"/>
                                <h6 className="m-0 text-small"><b>5. Do you want professional guidance / study material for investing in unlisted shares? *</b></h6>
                            </div>
                            <div className="actions p-2">
                                <ToggleButtonGroup
                                    value={details.currentAlignment5}
                                    onChange={(e, newAlignment) => onUserInput("currentAlignment5", newAlignment)}
                                    exclusive
                                >
                                    <ToggleButton className='answer-btn' value="Yes" aria-label="Yes ">
                                        Yes
                                    </ToggleButton>
                                    <ToggleButton className='answer-btn' value="No" aria-label="no">
                                        No
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                        {/*<Buttons.SecondaryButton value="skip" style={{width:"160px", margin:"5px"}} />*/}
                        {!isLoadingbtn && (
                            <Buttons.PrimaryButton value="Save" onClick={updateProfile} style={{width:"160px", margin:"5px"}}/>
                        )}
                        {isLoadingbtn && (
                            <Loadbutton />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiskProfileQuestions