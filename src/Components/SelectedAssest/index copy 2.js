import React from "react";
import HDFC from "../../Pages/Negotiations/hdfc.svg";
import "./selectedAssest.css";
import more from "./more.svg";
import dots from "./dots.svg";
import Portal from '@material-ui/core/Portal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    alert: {
      padding: theme.spacing(0),
      margin: theme.spacing(0, 0),
    },
  }));

let SelectedAssest = (props) => {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const [showcompanydetails, setShowcompanydetails] = React.useState(false);

    const container = React.useRef(null);

    const handleClick = () => {
        setShow(!show);
    };
    const handleCompanyDetails = () => {
        setShowcompanydetails(!showcompanydetails);
    };
    return (
        <>
        <div className="listing-details dbmn">
            <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                    <div className="Negotiation_logo">
                        <img src={selectedTradeOngoingTxn.companyLogo} width={30}/>
                    </div>
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <h6 className="m-0"><b>{selectedTradeOngoingTxn.companyName}</b></h6>
                        <p className="text-small m-0">{selectedTradeOngoingTxn.commodityName}</p>
                        <p className="text-small m-0">LIST{selectedTradeOngoingTxn.tradeId}</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div>
                        <p className="text-small m-0 ">Share Type</p>
                        <p className="text-small m-0"><b>General Euity Stock</b></p>
                    </div>
                </div>
            </div>

                <div className="row mt-2">
                    <div className="col-lg-1 col-md-1 col-12">
                        
                    </div>
                    <div className="col-lg-10 col-md-10 col-6">
                        <div className="Other_transaction_costs">
                            <p className="text-small m-0"> Price/Share </p>
                            <p className="text-small"><b>*Note: Other transaction costs</b></p>
                            <p className="text-small"><b>TCS</b>(if applicable) willbe collected at the time of transaction</p>
                            <p className="text-small"><b>Brokerage</b> for transfer to be seller. Please contact your broer for further details</p>
                            <p className="text-small"><b>Stamp duty charges</b> are to be paid by seller for transaction. This is to be mandatorily paid/ensured on/before the date of trasfer to ensure that the transfer is not rejected by the Depository Participant.Please click on below link to see stamp duty indicative charges grid.You can contact your broker for further details. </p>
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-12">
                       
                    </div>
                </div>
            
            <div className="row mt-4">
                <div className="col-lg-2 col-md-2 col-12">
                    
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <p className="text-small "> Quantity </p>
                        <p className="text-small"><b>12</b></p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div>
                        <p className="text-small"> Min. Price/Share </p>
                        <p className="text-small"><b>{selectedTradeOngoingTxn.priceUnderNegotiation}</b></p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-2 col-md-2 col-12">
                    
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <p className="text-small">Last edited on</p>
                        <p className="text-small"><b>{selectedTradeOngoingTxn.updateDate}</b></p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div>
                        <p className="text-small">Demate</p>
                        <p className="text-small"><b>Yes</b></p>
                    </div>
                </div>
            </div>



            {/* <div className="row mt-4">
                <div className="col-lg-2 col-md-2 col-12">
                    
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <p className="text-small "> Price/Share </p>
                        <p className="text-small"><b>{selectedTrade1.price}</b></p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div>
                        <p className="text-small"> Amount </p>
                        <p className="text-small"><b>{selectedTradeOngoingTxn.priceUnderNegotiation}</b></p>
                    </div>
                </div>
            </div> */}
            {/* <div className="row mt-2">
                <div className="col-lg-2 col-md-2 col-12">
                    
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <p className="text-small"> Offer Price Range </p>
                        <p className="text-small"><b>{selectedTrade1.minBidPriceAccepted} - {selectedTrade1.price}</b></p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div className="">
                        <p className="text-small"> Qty </p>
                        <p className="text-small"><b>{selectedTrade1.qty}</b></p>
                    </div>
                </div>
            </div> */}
            {/* <div className="row mt-2">
                <div className="col-lg-2 col-md-2 col-12">
                    
                </div>
                <div className="col-lg-5 col-md-4 col-6">
                    <div className="">
                        <p className="text-small">Last edited on</p>
                        <p className="text-small"><b>{selectedTradeOngoingTxn.updateDate}</b></p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                    <div>
                        <p className="text-small"> Seller Id  </p>
                        <p className="text-small"><b>{selectedTrade1.id}</b></p>
                    </div>
                </div>
            </div> */}

            <div className="text-center border-bottom cursor-pointer mt-2">
                <p className="cursor-pointer" onClick={handleClick}>
                    {show ?  <span className="text-default-primary text-small"><ExpandLessIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> Less Details</span> : <span className="text-default-primary text-small"> <ExpandMoreIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> See More Details</span>}
                </p>
                <div className="show-details">
                    <div className={classes.alert} ref={container} />
                </div>
            </div>
            <div className={classes.alert}>
            {show ? (
            <Portal container={container.current}>
                <div className="row mt-2">
                    <div className="col-lg-2 col-md-2 col-12">
                        
                    </div>
                    <div className="col-lg-5 col-md-4 col-6">
                        <div className="">
                            <p className="text-small m-0"> Price/Share </p>
                            <p className="text-small"><b>{selectedTrade1.price}</b></p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-6">
                        <div>
                            <p className="text-small"> Amount </p>
                            <p className="text-small"><b>{selectedTradeOngoingTxn.priceUnderNegotiation}</b></p>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-lg-2 col-md-2 col-12">
                        
                    </div>
                    <div className="col-lg-5 col-md-4 col-6">
                        <div className="">
                            <p className="text-small"> Offer Price Range </p>
                            <p className="text-small"><b>{selectedTrade1.minBidPriceAccepted} - {selectedTrade1.price}</b></p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-6">
                        <div className="">
                            <p className="text-small"> Qty </p>
                            <p className="text-small"><b>{selectedTrade1.qty}</b></p>
                        </div>
                    </div>
                </div>
            </Portal>
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
                                {/* <p className="text-small m-0">{selectedTradeOngoingTxn.commodityName}</p>
                                <p className="text-small m-0">LIST{selectedTradeOngoingTxn.tradeId}</p> */}
                                <p className="cursor-pointer text-left m-0" onClick={handleCompanyDetails}>
                                    {showcompanydetails ?  
                                    <span className="text-default-primary text-small">
                                        <ExpandLessIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> Less Details</span> : <span className="text-small text-default-primary"> <ExpandMoreIcon className="text-default-primary mr-2" style={{width:"20px", height:"20px"}}/> Company Details</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="show-details ">
                        <div className={classes.alert} ref={container} />
                    </div>
                </div>
                <div className={classes.alert}>
            {showcompanydetails ? (
                <Portal container={container.current}>
                    <div className="row mt-3 border-top pt-3">
                        <div className="col-6">
                            <div className="d-flex justify-content-between">
                                <p className="text-small mb-1"> Price/Share - </p>
                                <p className="text-small mb-1"><b>{selectedTrade1.price}</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-small mb-1">Price Range - </p>
                                <p className="text-small mb-1"><b>{selectedTrade1.minBidPriceAccepted} - {selectedTrade1.price}</b></p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-between">
                                <p className="text-small mb-1"> Amount - </p>
                                <p className="text-small mb-1"><b>{selectedTrade1.price}</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="text-small mb-1"> Qty - </p>
                                <p className="text-small mb-1"><b>{selectedTrade1.qty}</b></p>
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