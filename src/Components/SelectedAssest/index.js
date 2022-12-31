import React from "react";
import HDFC from "../../Pages/Negotiations/hdfc.svg";
import "./selectedAssest.css";
import more from "./more.svg";
import dots from "./dots.svg";
import Portal from '@material-ui/core/Portal';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandLessIcon from '@mui/icons-material/ArrowDropUp';
import ExpandMoreIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";
import { apiCall, setAccessToken } from "../../Utils/Network"
const useStyles = makeStyles((theme) => ({
    alert: {
      padding: theme.spacing(0),
      margin: theme.spacing(0, 0),
    },
  }));

let SelectedAssest = (props) => {


    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    // let selectedTrade = location.state.selectedTrade;
    const [selectedTrade1, setselectedTrade1] = React.useState({});

    const [associationPrice, setassociationPrice] = React.useState({});

    const classes = useStyles();
    const [showtrasnsferinstructions, setShowshowtrasnsferinstructions] = React.useState(false);
    const [showdetails, setShowdetails] = React.useState(false);
    const [showcompanydetailsmobile, setShowcompanydetailsmobile] = React.useState(false);

    const container = React.useRef(null);
    const container2 = React.useRef(null);

    React.useEffect(() => {

            getAllInventory()

        getPriceUSMWT()
    }, [selectedTradeOngoingTxn, props]); // <-- Have to pass in [] here!


    const getAllInventory = async function (){

        let allinventoryresponse = await apiCall("trade/"+selectedTradeOngoingTxn.tradeId,'GET')
        if(allinventoryresponse.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(allinventoryresponse)
        let allinventoryresponseJSON = await allinventoryresponse.json(); 
        //console.log(allinventoryresponseJSON)
        {console.log("uuuuuuu1" +allinventoryresponseJSON.isTradeOwner)}
        setselectedTrade1(allinventoryresponseJSON)


    }

    const getPriceUSMWT = async function (){

        let allinventoryresponse = await apiCall("association/findbyCompanyId/"+selectedTradeOngoingTxn.companyId,'GET')
        if(allinventoryresponse.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(allinventoryresponse)
        let allinventoryresponseJSON = await allinventoryresponse.json();
        //console.log(allinventoryresponseJSON)
        setassociationPrice(allinventoryresponseJSON)

    }

    const handleTrasnsferInstructions = () => {
       {showtrasnsferinstructions?setShowshowtrasnsferinstructions(false):setShowshowtrasnsferinstructions(true)};
    };
    const handleDetails = () => {
        {showdetails?setShowdetails(false):setShowdetails(true)};
     };
    const handleCompanyDetailsMobile = () => {
        setShowcompanydetailsmobile(!showcompanydetailsmobile);
    };
    // console.log("selectedTrade1" ,selectedTrade1)

    return (
        <>
       <div className="listing-details p-margin dbmn px-3 pt-2">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="Negotiation_logo">
                        <img src={selectedTrade1.companyLogo} className="img-fluid"/>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="">
                        <h6 className=""><b>{selectedTrade1.companyName}</b></h6>
                        <p className="text-extra-small nego_headings">{selectedTrade1.sector}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-6 pr-0">
                    <div >
                        {console.log("uuuuuuu" +selectedTrade1.tradeOwner)}
                        <p className="text-extra-small nego_headings"> {!selectedTrade1.isTradeOwner ? "Your ID":
                            "Buyer ID"}</p>
                        <p className="text-extra-small nego_title">{selectedTradeOngoingTxn.onboardingTradeNONOwnerId}</p>
                    </div>
                </div>
                
                <div className="col-lg-6 col-md-6 col-6 p-0">
                    <div>
                        <p className="text-extra-small nego_headings"> {selectedTrade1.isTradeOwner ? "Your ID":
                            "Seller ID"} </p>
                        <p className="text-extra-small nego_title">{selectedTrade1.onboardingAccountId}</p>
                    </div>
                </div>
            </div>

            {/* ==============change============ */}
            <div className="row">
                
                <div className="col-lg-6 col-md-6 col-6 pr-0">
                    <div >
                        <p className="text-extra-small nego_headings"> Transaction ID</p>
                        <p className="text-extra-small nego_title_transationid">TXN{selectedTradeOngoingTxn.id}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 p-0">
                    <div>
                        <p className="text-extra-small  nego_headings">Share Type</p>
                        <p className="text-extra-small  nego_title">{selectedTrade1.commodityName}</p>
                    </div>
                </div>
            </div>
            
            <div className="row">
                
                <div className="col-lg-6 col-md-6 col-6 pr-0">
                    <div >
                        <p className="text-extra-small nego_headings"> Quantity </p>
                        <p className="text-extra-small nego_title">{selectedTrade1.qty}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 p-0">
                    <div>
                        <p className="text-extra-small nego_headings"> Minimum Accepted price </p>
                        <p className="text-extra-small mb-0 nego_title">₹{selectedTrade1.minBidPriceAccepted}</p>
                    </div>                    
                </div>
            </div>
            <div className="negotiation-selectedSsets-horizontalrow"></div> 

            <div className="row mt-2">
                
                <div className="col-lg-10 col-md-10 col-12 pr-0">
                    <div>
                        <p className="text-extra-small nego_headings2"> Market Price <sapn>

                            <a href="https://usmwt.org/" target="_blank"><i>USMWT.org</i></a>

                        </sapn> <InfoOutlinedIcon/>

                        </p>
                        <p className="text-extra-small nego_headings">{associationPrice.sell_price}</p>
                    </div>
                </div>
                               
            </div>

            <div className="row mt-2">

                <div className="col-lg-6 col-md-6 col-6">
                    <div className="">
                        <p className="text-extra-small nego_headings2">Created on : {selectedTrade1.createDate}</p>
                        {/*<p className="text-extra-small nego_headings">{selectedTrade1.createDate}</p>*/}
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                    <div className="">
                        <p className="text-extra-small nego_headings2">Last edited on : {selectedTrade1.updateDate}</p>
                        {/*<p className="text-extra-small nego_headings">{selectedTrade1.updateDate}</p>*/}
                    </div>
                </div>
            </div>
            {/*<div className="row mt-2">*/}
            {/*    */}
            {/*    <div className="col-lg-6 col-md-6 col-6 pr-0">*/}
            {/*        <div>*/}
            {/*            <p className="text-extra-small nego_headings2"> DIP Slip Used</p>*/}
            {/*            <p className="text-extra-small nego_headings">{selectedTrade1.onboardingAccountId}</p>*/}
            {/*        </div>                    */}
            {/*    </div>*/}
            {/*                 */}
            {/*</div>*/}

             {/* ============== showtrasnsferinstructions ============ */}           
             <div className="text-start cursor-pointer mt-2">
                <p className="cursor-pointer" onClick={handleTrasnsferInstructions}>
                    {showtrasnsferinstructions ? null : <span className="SelectedAssest-text">Transfer Instructions <ExpandMoreIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/></span>}
                </p>
                <div className="show-details">
                    <div className={classes.alert} ref={container} />
                </div>
            </div>
            <div className={classes.alert}>


            {showtrasnsferinstructions ? (
            <div container={container.current}>
            <p className="cursor-pointer text-start" onClick={handleTrasnsferInstructions}>
                    {showtrasnsferinstructions ?  <span className="SelectedAssest-text">Less Details <ExpandLessIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/> </span> : <span className="SelectedAssest-text">Transfer Instructions <ExpandMoreIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/> </span>}
                </p>
                <div className="mt-2 mb-4">
                    <div className="">
                        <div className="Other_transaction_costs">
                            <ol className="pl-3">
                                <li className="text-extra-small">While transferring the shares,<b> the seller should ideally carry cheque book, KYC’s </b>and ensure that the stamp duty is duly paid for the said transfer?  </li>
                                <li className="text-extra-small"><b>Seller can timely reach-out to their broker </b>for timely issuance of relevant document to ensure a seamless transfer for this transaction?</li>
                                <li className="text-extra-small"><b>Seller to ensure acting within NSDL/CDSL and Broker operation timings </b>to ensure a timely transfer of shares?</li>
                                <li className="text-extra-small"> Seller should ensure that he has<b> the relevant DIS slips</b> for this proposed transaction (transfer of shares)?</li>
                                <li className="text-extra-small"><b>Broker specific payment details Annexures</b> to be obtained and submitted to seller’s Broker. Seller to ensure these annexures for a seamless transfer. Seller can find the Buyer’s payment details on the <b>“Escrow screen” </b>(once activated) for this transaction.</li>
                                
                            </ol>                           
                            
                        </div>
                    </div>                    
                </div>
                
            </div>
            ) : null}
        </div>
       

             {/* ==============See More Details ============ */}           
            <div className="text-start cursor-pointer mt-4">
                <p className="cursor-pointer" onClick={handleDetails}>
                    {showdetails ? null : <span className="SelectedAssest-text">See More Details <ExpandMoreIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/> </span>}
                </p>
                <div className="show-details">
                    <div className={classes.alert} ref={container2} />
                </div>
            </div>
            <div className={classes.alert}>
            {showdetails ? (
            <div container={container.current}>
            <p className="cursor-pointer text-start" onClick={handleDetails}>
                    {showdetails ?  <span className="SelectedAssest-text">Less Details <ExpandLessIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/> </span> : <span className="SelectedAssest-text">See More Details <ExpandMoreIcon className="SelectedAssest-text mr-2" style={{width:"20px", height:"20px"}}/> </span>}
                </p>
                <div className="mt-2 mb-4">
                    <div className="">
                        <div className="Other_transaction_costs">
                            <p className="text-extra-small mb-0"><b>*Note </b>- Other Transaction cost</p>
                            <p className="text-extra-small">Transaction Value is the Price per Share multiplied with the number of shares negotiated</p>
                            <p className="text-extra-small">TDS (On Facilitation Fee) will be collected at the time of transaction</p>
                            <p className="text-extra-small">Facilitation fee charged by platform for this transaction</p>
                            <p className="text-extra-small">Stamp duty charges are to be paid by seller for transaction. This is to be mandatorily paid/ensured on/before the date of transfer to ensure that the transfer is not rejected by the Depository Participant.Please click on below link to see stamp duty indicative charges grid.You can contact your broker for further details.</p>
                        </div>
                    </div>                    
                </div>                
                
            </div>
            ) : null}
        </div>
        </div>
        {/* for mobile view  */}
            <div className="dnmb">
                <div className="default-shadow p-3 mt-2  rounded company-details">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-between">
                            <div className="w-25">
                                <div className="Negotiation_logo ml-2 m-0">
                                    <img src={selectedTradeOngoingTxn.companyLogo} width={30} />
                                </div>
                            </div>
                            <div className="w-75">
                                <h6 className="m-0"><b>{selectedTradeOngoingTxn.companyName}</b></h6>
                                <p className="cursor-pointer text-left m-0" onClick={handleCompanyDetailsMobile}>
                                    {showcompanydetailsmobile ?  
                                    <span className="text-default-primary text-extra-small">
                                        <ExpandLessIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> Less Details</span> : <span className="text-extra-small text-default-primary"> <ExpandMoreIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> Company Details</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="show-details ">
                        <div className={classes.alert} ref={container2} />
                    </div>
                </div>
                <div className={classes.alert}>
            {showcompanydetailsmobile ? (
                <Portal container={container.current}>
                    <div className="row mt-3 border-top pt-3">
                        <div className="col-6">
                            <div className="d-flex justify-content-between">
                                <p className="text-extra-small mb-1"> Price/Share - </p>
                                <p className="text-extra-small mb-1"><b>{selectedTrade1.price}</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-extra-small mb-1">Price Range - </p>
                                <p className="text-extra-small mb-1"><b>{selectedTrade1.minBidPriceAccepted} - {selectedTrade1.price}</b></p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-between">
                                <p className="text-extra-small mb-1"> Amount - </p>
                                <p className="text-extra-small mb-1"><b>{selectedTrade1.price}</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-extra-small mb-1"> Qty - </p>
                                <p className="text-extra-small mb-1"><b>{selectedTrade1.qty}</b></p>
                            </div>
                        </div>
                    </div>
                </Portal>
                ) : null}
            </div>
            </div>
        </>
    )
}

export default SelectedAssest