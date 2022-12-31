import React, { useState, useEffect } from "react";
import Loan from "./assets/loan.svg"
import Valuation from "./assets/valuation.svg"
import Broker from "../../assets/broker.svg"
import "./service.scoped.css"
import Breadcrumb from "../../Components/Breadcrumbs";
import ValuationForTheShares from "./valuationfortheshares";
import LoanAgainstShares from "./loanagainstshares";
import FindABroker from "./findabroker";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import { ReactComponent as LoanIcon } from './assets/loan.svg';
import { ReactComponent as ValuationIcon } from './assets/valuation.svg';
import { ReactComponent as BrokerIcon } from './assets/broker.svg';
import {Helmet} from "react-helmet";
import {isLoggedIn } from "../../Utils/Network"  


export default function Services() {
    const [currentpage, setCurrentPage] = useState(1);
    const [show, setShow] = React.useState(true);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [isLogin,setisLogin] = useState(isLoggedIn())

    function GetPage(){
        switch(currentpage){
            case 1:
                return <LoanAgainstShares/>;
            case 2:
                return <ValuationForTheShares/>;
            case 3:
                return <FindABroker/>;
            default:
                return <LoanAgainstShares/>;      
        }
    }
const setShowclass = () =>{
    setShow(true);
    setShow2(false);
    setShow3(false);
}
const setShowclass2 = () =>{
    setShow2(true);
    setShow3(false);
    setShow(false);
}
const setShowclass3 = () =>{
    setShow3(true);
    setShow2(false);
    setShow(false);
}
    return(
    <div className="container mt-3">
        {isLogin? null:
        <Helmet>
            <title>Buy or sell unlisted shares at the best prices on unlistedassets.com. Unlisted Shares List and Unlisted Shares Dealer/Broker. Sell ESOP Shares, Buy Pre-IPO shares stocks at best price.</title>
            <meta name="description" content="Our services -Buy Sell Unlisted Shares - Unlisted Assets." />
        </Helmet>}
        
        {isLogin?<Breadcrumb />:null}

        <div className="row">
        {isLogin?null:
                <div className='my-3'>
                  <h5 className='default-heading'><b>Our Services</b></h5>
                  <div className='d-flex justify-content-center px-5 my-3'>
                  <p className='services-default-para px-5 pb-4'>We endeavor to provide the best in-class service to our clients through our technology driven processes and ensure the time efficient completion of transaction for both buyer and seller of unlisted shares/ESOP</p>
                  </div>                  
                </div>}
        {/* <button className="toggle" onClick={() => setShow(!show)}>
        Toggle
      </button> */}
        <div className="col-md-3 col-12">
            <div className="service_widget bg-white">
                <div className="service_widget_title d-flex align-items-center" style={{borderBottom: "1px solid #CFCBCF"}}>
                    <h6 className="p-3 m-0"><strong> Services </strong></h6>
                </div>

                <div className={show ? "service_widget_List active" : "service_widget_List " } onClick={(e) => { setCurrentPage(1); setShowclass()}} >
                    <LoanIcon />
                    <p className="m-0">Loan Against Shares</p>
                </div>
                <div className={show2 ? "service_widget_List active" : "service_widget_List"} onClick={(e) => { setCurrentPage(2); setShowclass2()}} >
                    <ValuationIcon />
                    <p className="m-0">Valuation For The Shares</p>
                </div>
                <div className={show3 ? "service_widget_List active" : "service_widget_List"} onClick={(e) => { setCurrentPage(3); setShowclass3()}} >
                    <BrokerIcon />
                    <p className="m-0">Find A Broker</p>
                </div>
            </div>
        </div>
        <div className="col-md-9 col-12">
        {GetPage()}
        </div>
        </div>
        </div>   )
    
}