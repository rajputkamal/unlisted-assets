import React from "react";
import aadhar from "../aadhar.svg";
import download from "../download.svg"
import "../buyeragreement.scoped.css"
import Buttons from "../../../Components/Buttons";
import MobileVerification from "../../MobileVerification";
import Dialog from '@material-ui/core/Dialog';
import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network"
import GetAppIcon from '@material-ui/icons/GetApp';
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";
import OnboardingAlertDialog from "../../../Components/OnboardingVarificationDialogBox/OnboardingVarificationDialogBox";

let AadharBasedAgreement = (props) => {

    let history = useHistory();

    const closeMobileVerification = () =>{
        setShowDialog(false)
    }
    const [tradecommunication1,setTradeCommunication1] = React.useState([]);
    const [aadharNumber,setAadharNumber] = React.useState('');
    const [mobileNumber,setmobileNumber] = React.useState('');
    const [agreement,setAgreement] = React.useState(props.agreement);
    const location = useLocation();
    // const selectedTrade = location.state.selectedTrade;
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [pageTitle,setPageTitle] = React.useState('');
    const [timerexpired,settimerexpired] = React.useState(false);
    const [dialogPage, setDialogPage ] = React.useState(false);


    React.useEffect(() => {
        setPageTitle11()

        getAadharNumber()
    }, [])

    const [counterhour, setcounterhour] = React.useState(props.agreement.hoursLeft);
    const [counterminute, setcounterminute] = React.useState(props.agreement.minuteLeft);
    const [countersecond, setcountersecond] = React.useState(59);

    async function getAadharNumber() {
        const response = await apiCall("useronboarding/accountonboarding", "GET", '', history);
        let responseJSON = await response.json();
        setAadharNumber(responseJSON.aadharNumber);
        setmobileNumber(responseJSON.mobileNumber);
    }

    React.useEffect(() => {
        const timer =
            countersecond > 0 && setInterval(() => {
                setcountersecond(countersecond - 1)

                if((countersecond - 1) <= 0) {
                    setcountersecond(59)
                    setcounterminute(counterminute-1)

                    if((counterminute - 1) <= 0) {
                        setcounterminute(59)

                        setcounterhour(counterhour-1)

                        if((counterhour - 1) <= 0) {
                            // settimerexpired(true)

                            setcountersecond(0)
                            setcounterminute(0)
                            setcounterhour(0)
                        }

                    }
                }

            }, 1000);
        return () => clearInterval(timer);
    }, [countersecond]);

    const setPageTitle11 = async () => {

        // console.log("popopopop12"+selectedTrade)
        // console.log("popopopop1"+selectedTrade.isTradeOwner)

        selectedTrade.isTradeOwner ? setPageTitle("Seller Agreement Signup") : setPageTitle("Buyer Agreement Signup")

        // if(selectedTrade.isTradeOwner) {
        //     if(agreement.offerValidTimeSellerAggrementStatus =="expired") {
        //         settimerexpired(true)
        //     }
        // } else if(!selectedTrade.isTradeOwner){
        //     if(agreement.offerValidTimeBuyerAggrementStatus =="expired") {
        //         settimerexpired(true)
        //     }
        // }


        // let response = await apiCall("tradeagreement/"+selectedOnGoingTxn.id, 'GET','', history)
        // let responseJSON = await response.json()
        // setAgreement(responseJSON);
    }

    const [showDialog,setShowDialog] = React.useState(false);

    const handleDone = async (event) => {
        event.preventDefault();

        try {
            const responseprofile = await apiCall("useronboarding/accountonboarding", "GET", '', history);
            let responseprofileJSON = await responseprofile.json();

            if(responseprofileJSON != undefined
                && responseprofileJSON.uaVerifiedStatus == "Verified") {
                //accept the offer happly
            } else {
                // errorToast("Invalid", "Not Allowed, onboarding not completed/verified!!")
                setDialogPage(true);
                return
            }
        } catch (e) {
            setDialogPage(true);
            // errorToast("Invalid", "Not Allowed, onboarding not completed/verified!!")
            return
        }

        let requestBody = {

            aadharNumber: aadharNumber,
        };
        // console.log("request body", requestBody);

        let stringifiedRequestBody = JSON.stringify(requestBody);

        // console.log("request body stringified", stringifiedRequestBody);

        // console.log('aaaaaaaaaaaa111111bbbbbbbbbbb'+aadharNumber)

        let response = await apiCall(
            "tradeagreement/aadharagreementsign/"+agreement.id,
            "PUT",
            requestBody, history
        );

        let responseJSON = await response.json();
        // console.log("response ", response);

        // console.log("responseJson", responseJSON);
        if (response.status !== 200) {
            errorToast("Invalid", "OTP not sent, Pl try after sometime or contact admin");

            setShowDialog(false); //failure
            // setShowDialog(true); // success
            // props.callbackfunc();
            return;
        }else if (response.status === 200){

            successToast("Success","OTP sent Successfully!!")
            setShowDialog(true); // success
            // props.callbackfunc();
            return
        }
    };

    const callbackfunc = () => {
        props.callbackfunc()
    }

    const closeDialog=()=>{
        // console.log('aaaaaaa')
        setDialogPage(false)
    };


    return(<div> {!timerexpired ? <div className="adaharbased-sec ">
                <div className="text-dark">
                    <h6><b>{pageTitle}</b></h6>
                </div>
                <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
                <h6 className="mt-3 " style={{color: "#721b65"}}><b>Registered Mobile OTP Based Agreement</b></h6>
                <div className="row">
                    <div className="col-xl-4 col-lg-12 col-md-12 col-12">
                        <img src={aadhar} className="Adhar-asset my-3" width="150"/>
                    </div>
                    <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                        <div className="">
                            <p className="text-small ">Congratulations you can now sign your Sale purchase agreement . The validity of this  transaction is 24 hrs and can be digitally signed by Registered Mobile OTP verification. If you fail to comply, the process of negotiation and agreement has to be restarted.</p>
                            {/*<a href={agreement.buyerAgreement} download>*/}
                            {/*    <img src={agreement.buyerAgreement} alt="buyer Agreement" />*/}
                            {/*</a>*/}
                            <div className="buyeragreement_main download_agreement">
                                <GetAppIcon className="mr-3 text-white" style={{width:"20px", height:"20px"}} width="100" />
                                <a download="txnagreement" href={downloadurl("tradeagreement/downloadagreement/"+agreement.id)}>Download Agreement</a>
                            </div>
                        </div>
                        <div className="signup-timer mt-3">
                            <p className="text-small"><b>Sign Agreement Within</b></p>
                            <div className="buyeragreement_sign_timer">
                                <h4 className="m-0 py-2">{counterhour}:{counterminute}:{countersecond}</h4>
                            </div>
                        </div>
                        {/*<div className="adharnumber mt-3">*/}
                        {/*    <p className="text-small"><b>Aadhar card Number</b></p>*/}
                        {/*    /!*<input disabled type="text" className="buyeragreement_aadhar_input"*!/*/}
                        {/*    /!*       onChange={(e) => setAadharNumber(e.target.value)} />*!/*/}
                        {/*    <input disabled type="text" value={aadharNumber} className="buyeragreement_aadhar_input"*/}
                        {/*    />                </div>*/}
                        <div className="text-center">
                            <Buttons.PrimaryButton value="Submit" style={{width:"100%", marginTop:"30px"}}
                                                   onClick={handleDone}
                            />

                        </div>
                    </div>
                    <OnboardingAlertDialog dialogPage={dialogPage} onClose={closeDialog}/>
                    <Dialog open={showDialog} onClose={()=>{ setShowDialog(false) }} >
                        <MobileVerification type={"aadharsign"} agreementId={agreement.id}
                                            closeMobileVerification1={closeMobileVerification}
                                            callbackfunc={callbackfunc}
                                            mobilenumber={mobileNumber} />
                    </Dialog>
                </div>
            </div>
            :
            <div className="adaharbased-sec ">
                <div className="text-dark">
                    <h6><b>{pageTitle}</b></h6>
                </div>
                <div style={{borderBottom: "2px solid #721B65",width: "100px"}}></div>
                <h6 className="mt-3 " style={{color: "#721b65"}}><b>Aadhar Based Agreement - Timer Expired</b></h6>

            </div>}</div>
    )
}

export default AadharBasedAgreement