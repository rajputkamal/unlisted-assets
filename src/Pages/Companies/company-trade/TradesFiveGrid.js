import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Buttons from "../../../Components/Buttons"
import TradeModal from '../TradeModal';
import TradeImage from './TradeImage';
import loadingImg from './loading.gif'
import PlusIcon from './plus.svg';
import MinusIcon from './minus.svg';
import useSWR from "swr";
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"


function TradesGridFour() {
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState('');

  function ValuationConvertion(val) {
    var final_amt = val/1000000;
    if(final_amt >= 1000 ){
      final_amt = final_amt/1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }

  function showModal(event, id, name) {
    setModal(true);
    setItem_id(id);
    setitem_name(name)
  }
  function hideModal() {
    setModal(false);
  }
  
  const noOfPost = 8;
  const apiEndpoint = downloadurl("company/findAll");
  const { data: conpanies } = useSWR(apiEndpoint, {refreshInterval:20000});
  const currentPost = conpanies ? conpanies.slice(0, noOfPost) : null;

  // console.log("TradeGridFour.js")

  // company add to watch list  

  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const [AddWatchlist,setAddWatchlist]=useState(false);
  const [DeleteWatchlist,setDeleteWatchlist]=useState(false);

  const AddtoWatchList = async (trade) => {

    let response = await apiCall("company/usercompanywatchlist","PUT", trade)
    // console.log("apicalled",response.status)
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    if (response.status !== 200) {


      //errorToast("Invalid", "Mobile Number Does not exists");
      return;
    }else if (response.status === 200){
      // console.log(trade.addedWatchList+"kokokokokoko")
      trade.addedWatchList ? setAddWatchlist(true): setDeleteWatchlist(true)
      //setMobiletext('Verify your mobile number with otp verification')
      //successToast("Success","OTP sent to your mobile please check")
      //setOpen(true)
    }
  };

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
// console.log("uuuuuuuuuuuu")
    setDeleteWatchlist(false)
    setAddWatchlist(false);
  };
  const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          ok
        </Button>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
          {/* <CloseIcon fontSize="small" /> */}
        </IconButton>
      </React.Fragment>
  );
  return (
    <>
    <div className='discover_companies'>
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h6 className="text-default-secoundary"><b>Discover Companies</b></h6>
         { currentPost && currentPost.length < 8 ? null :
          <Link to="/companies" style={{color:"#721B65"}}><Buttons.SecondaryButton value="View All" id="add-holdings-button" style={{height: "34px",background: "transparent",border: "1px solid #721B65",width:"140px"}} /></Link>
         }
      </div>
      <Snackbar
          open={AddWatchlist}
          autoHideDuration={3000}
          onClose={handleClose}
          message="company has been added to your watchlist and you will be notified for updates..."
          action={action}
      />
      <Snackbar
          open={DeleteWatchlist}
          autoHideDuration={3000}
          onClose={handleClose}
          message="company has been removed from your watchlist and you will not be notified for updates..."
          action={action}
      />
      <Box>
        {show ? (
          <Portal container={container.current}>
            <span className="text-small"></span>
          </Portal>
        ) : null}
      </Box>
      <Box ref={container} />
   
    </div>
    <div className="container dbmn"> 
          <div className="row "> 
          
        {
          currentPost ? (
            currentPost.map((trade, index) => (
              <div className="col-md-3" key={index}>
             <div className="box">
                  <div className="box1">
                  <div className="row pl-2" style={{overflow:"hidden"}}>
                      <div className="col-md-2 col-xs-2 col-2 p-0">
                        <div className="CompanyLogo">
                          <TradeImage imgSrc={trade.logo}/>
                        </div>
                      </div>
                      <div className="col-md-10 col-xs-10 col-10 pl-3 d-flex align-items-center ">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="w-100">
                              <p className="p2 company-name" style={{fontWeight: 'bold'}}> { trade.name }</p>
                              <p className="pharmacy">{ trade.sector }</p>
                              {/*<p className="pharmacy">{ trade.isin }</p>*/}
                            </div>
                          <div className="plus-icon" onClick={(e) => {
                            trade.addedWatchList = !trade.addedWatchList;

                            AddtoWatchList(trade)
                          }}>
                            {trade.addedWatchList ? <img src={MinusIcon} /> : <img src={PlusIcon} />}
                          </div>

                        </div>
                        </div>
                      {/* <div className="col-md-2 col-xs-2">
                        <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    <div className="value content-box bg-white py-3 px-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pre-ipo">
                              <span>{trade.type}</span>
                            </div>
                          {trade.uaListingAvailable ?
                              <div className="listing-available">
                                <span>Listing Available</span>
                              </div>
                              : null }
                        </div>
                        <div className="company-desc mt-2">
                         {/* <p>Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.lastFundRaisingValuation) }</span></p>
                         <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p> */}
                         <p>{ trade.description.substring(0, 120) }...</p>
                          <div className="hover-box">
                            <Link className="explore-btn w-75"  to={{pathname: `/company/${trade.slug}`}}>
                             Explore</Link>
                             <button className="mt-2 btn btn-primary-default w-75 mb-3" type="button" onClick={(event) => showModal(event, trade.id, trade.name)} > Buy / Sell </button>
                          </div>
                        </div>
                        <div className="Buy_Sell mt-4"> 
                          <button className="btn btn-secoundary-default w-75 text-center">Buy / Sell</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
               
                </div>   
          ))
         
        ):<div className="product-loader"><img src={loadingImg}  alt=""/></div>
        }
        
        </div>
        
        {/* { currentPost && currentPost.length < 8 ? null :
                <div className="row">
                <div className="col-md-12">
                  <div className="view">
                    <p className="text-center p1 p-0"><Link to="/companies" className="btn2 text-small">View All</Link></p>
                  </div>
                </div>
              </div>
                } */}
        </div>
        {/* for mobile */}
        <div className="dnmb"> 
          <div className="formobile-componies-slide"> 
          
        {
          currentPost ? (
            currentPost.map((trade, index) => (
              <div className="componies-slide-box" key={index}>
              <div className="box">
                  <div className="box1">
                  <div className="row pl-2" style={{overflow:"hidden"}}>
                      <div className="col-md-2 col-xs-2 col-2 p-0">
                        <div className="CompanyLogo">
                          <TradeImage imgSrc={trade.logo}/>
                        </div>
                      </div>
                      <div className="col-md-10 col-xs-10 col-10 pl-3">
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                              <p className="p2 company-name" style={{fontWeight: 'bold'}}> { trade.company_name }</p>
                              <p className="pharmacy">{ trade.sector }</p>
                              <p className="pharmacy">{ trade.isin }</p>
                            </div>
                            <div className="plus-icon">
                              <img src={PlusIcon} />
                            </div>
                          </div>
                        </div>
                      {/* <div className="col-md-2 col-xs-2">
                        <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    <div className="value content-box bg-white py-3 px-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pre-ipo">
                              <span>Startup</span>
                            </div>
                            <div className="listing-available">
                              <span>Listing Available</span>
                            </div>
                        </div>
                        <div className="company-desc mt-2">
                         {/* <p>Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.lastFundRaisingValuation) }</span></p>
                         <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p> */}
                         <p>{ trade.description.substring(0, 120) }...</p>
                          <div className="hover-box">
                            <Link className="explore-btn w-75"  to={{pathname: `/company/${trade.slug}`}}>
                             Explore</Link>
                             <button className="mt-2 btn btn-primary-default w-75 mb-3" type="button" onClick={(event) => showModal(event, trade.id, trade.name)} > Buy / Sell </button>
                          </div>
                        </div>
                        <div className="Buy_Sell mt-4"> 
                          <button className="btn btn-secoundary-default w-75 text-center">Buy / Sell</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
               
                </div>   
          ))
         
        ):<div className="product-loader"><img src={loadingImg}  alt=""/></div>
        }
        
        </div>
        
        </div>
        
       { !tradeModal ? null :
           <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id } c_name={item_name} />
         }
    </>

  )
}

export default TradesGridFour
