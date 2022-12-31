import React,{useState} from 'react';
import TradeModal from "../TradeModal"
import { Link } from "react-router-dom";
import TradeImage from './TradeImage';
import PlusIcon from './pluslogo.png';
import MinusIcon from './minuslogo.png';
import Skeleton from 'react-loading-skeleton';

import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Buttons from '../../../Components/Buttons';
import AddCompanyRequest from '../../../Components/AddCompanyRequest';
import Dialog from '@material-ui/core/Dialog';
import { Breadcrumbs } from '@material-ui/core';
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network"
// import { successToast, errorToast } from "../../../../../../src/Components/Toast/index";

export default function TradesGridThree(props) {
    const [open,setOpen]=useState(false);
    const [tradeModal, setModal] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const postPerpage = 6;
    const [item_id, setItem_id] = useState(0);
    const [item_name, setitem_name] = useState('');

    const [show, setShow] = React.useState(false);
    const [AddWatchlist,setAddWatchlist]=useState(false);
    const [DeleteWatchlist,setDeleteWatchlist]=useState(false);

 
    const AddtoWatchList = async (trade) => {

        let response = await apiCall("company/usercompanywatchlist","PUT", trade)
        //console.log("apicalled",response.status)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        if (response.status !== 200) {


            //errorToast("Invalid", "Mobile Number Does not exists");
            return;
        }else if (response.status === 200){
            //console.log(trade.addedWatchList+"kokokokokoko")
            trade.addedWatchList ? setAddWatchlist(true): setDeleteWatchlist(true)

            //setMobiletext('Verify your mobile number with otp verification')
            //successToast("Success","OTP sent to your mobile please check")
            //setOpen(true)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDeleteWatchlist(false)
        setAddWatchlist(false);
    };
    const action = (
        <React.Fragment>
            <Buttons.PrimaryButton value="OK" id="add-holdings-button" onClick={handleClose} /> 
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                OK
            </Button> */}
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


    function showModal(event, name, id) {
        setModal(true);
        setItem_id(id);
        setitem_name(name)

    }
    function hideModal(e) {
        setModal(false);
    }


    function ValuationConvertion(val) {
        var final_amt = val/1000000;
        if(final_amt >= 1000 ){
            final_amt = final_amt/1000;
            return final_amt + "B";
        }
        return final_amt + "M";
    }
    // function paginate(pageNumber) {
    //   setCurrentPage(pageNumber)
    // }
    // const apiEndpoint = "http://13.232.34.18:8080/company/findAll";
    // const { data: conpanies } = useSWR(apiEndpoint, {refreshInterval:2});
    // const indexOfLastpost = currentPage * postPerpage;
    // const indexOfFirstPost = indexOfLastpost - postPerpage;
    // const currentPost = conpanies ? conpanies.slice(indexOfFirstPost, indexOfLastpost) : null;
    // const totalPosts = conpanies ? conpanies.length : 0;

    //console.log(props.totalPosts);
    //console.log("TradeGridThree.js")

    return (
        <>

            <div className="d-flex align-items-center justify-content-between">
                <h4 className="m-0"><span>({ props.totalPosts })</span> Results : </h4>
                <Buttons.SecondaryButton value="Add Company Request" style={{background:"transparent", height:"30px"}}
                                         onClick={()=>{setOpen(true)}}
                />
                <Dialog open={open} onClose={()=>{setOpen(false)}} >
                    <AddCompanyRequest onClose={()=>{setOpen(false)}}/>
                </Dialog>
            </div>
            <Snackbar
                open={AddWatchlist}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Indian oil corporation has been added to your watchlist. You will be notified about all its updates"
                action={action}
            />
            <Snackbar
                open={DeleteWatchlist}
                autoHideDuration={5000}
                onClose={handleClose}
                message=" IOC has been removed from your Watchlist. You will not be Notified about any Further Updates"
                action={action}
            />
            <div className="dbmn">
                <div className="row mt-2 px-2 ">

                    {
                        props.currentPost ? (
                            props.currentPost.map((trade, index) => (

                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 px-1 m-0" key={index}>
                                    <div className="box">
                                        <div className="box1">
                                            <div className="row pl-2" style={{overflow:"hidden"}}>
                                                <div className="col-md-2 col-xs-2 col-2 p-0">
                                                    <div className="CompanyLogo">
                                                        {trade.id == undefined ?  <Skeleton circle={true} height={42} width={40} /> : <TradeImage imgSrc={trade.logo}/>  }
                                                    </div>
                                                </div>
                                                <div className="col-md-10 col-xs-10 col-10 pl-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="w-100 ">

                                                             {trade.id == undefined ? <Skeleton width={100} height="1" /> : <p className="p2 company-name " style={{fontWeight: 'bold'}}> {trade.name}</p>   }
                                                            {trade.id == undefined ? <Skeleton width={100} height="1" /> : <p className="pharmacy">{ trade.sector }</p>  }


                                                            {/* <p className="pharmacy">{ trade.isin }</p> */}
                                                           
                                                        </div>


                                                        <div className="plus-icon" onClick={(e) => {
                                                            trade.addedWatchList = !trade.addedWatchList;

                                                            AddtoWatchList(trade)
                                                        }}>
                                                            {trade.id == undefined ? <Skeleton circle={true} height={30} width={30} /> : trade.addedWatchList ? <img className='plusminus-img' src={MinusIcon} /> : <img className='plusminus-img' src={PlusIcon} />}


                                                             
                                                           
                                                        </div>
                                                        {/* <div className="plus-icon">
                              <img src={PlusIcon} />
                            </div> */}
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-2 col-xs-2">
                        <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                      </div> */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="value content-box bg-white py-3 px-2">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                    

                                                            {trade.id == undefined ? <Skeleton width={75} height="1" /> :<div className="pre-ipo"> <span>{trade.type}</span></div>}



                                                        
                                                        {trade.uaListingAvailable ?<>
                                                        
                                                            <div className="listing-available">
                                                                {trade.id == undefined ? <Skeleton width={75} height="1" /> : <span>Listing Available</span>}

                                                            </div>
                                                            
                                                            </>: null }
                                                    </div>
                                                    <div className="company-desc mt-2">
                                                        {/* <p className="m-0">Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.lastFundRaisingValuation) }</span></p>
                         <p className="mb-1">Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p> */}
                                                        {trade.id == undefined ? <Skeleton width={200} height="1" /> : <p>{ (trade.description == undefined)?"":trade.description.substring(0, 120) }...</p> }
                                                        {trade.id == undefined ? <Skeleton width={200} height="1" />  :null}
                                                        {trade.id == undefined ? <Skeleton width={200} height="1" /> : null}

                                                        {trade.id == undefined ? null  :<>

                                                            <div className="hover-box">
                                                                <Link className="explore-btn w-75"  to={{pathname: `/company/${trade.slug}`}}>
                                                                    Explore</Link>
                                                                <button className="mt-2 btn btn-primary-default w-75 mb-3" type="button" onClick={(event) => showModal(event, trade.name, trade.id)} > Buy / Sell </button>
                                                            </div>
                                                             
                                                            </>}


                                                    </div>
                                                    {trade.id == undefined ? null  :
                                                    <div className="Buy_Sell mt-4">
                                                    
                                                        <button className="btn btn-secoundary-default w-75 text-center bg-white">Buy / Sell</button>
                                                        
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                </div>
                            ))

                        ):"Data Loading...."
                    }
                </div>
            </div>
            {/* For Mobile View */}
            <div className="dnmb">

                {
                    props.currentPost ? (
                        props.currentPost.map((trade, index) => (

                            <div className="" key={index}>
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
                                                        <p className="p2 company-name" style={{fontWeight: 'bold'}}> { trade.company_name } </p>
                                                        <p className="pharmacy">{ trade.sector }</p>
                                                        <p className="pharmacy">{ trade.isin }</p>
                                                    </div>


                                                    <div className="" onClick={(e) => {
                                                        trade.addedWatchList = !trade.addedWatchList;

                                                        AddtoWatchList(trade)
                                                    }}>
                                                        {trade.addedWatchList ? <img className='plusminus-img' src={MinusIcon} /> : <img className='plusminus-img' src={PlusIcon} />}
                                                    </div>

                                                    {/* <div className="plus-icon">
                              <img src={PlusIcon} />
                            </div> */}
                                                </div>
                                            </div>
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
                                                    <p>Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.lastFundRaisingValuation) }</span></p>
                                                    <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p>
                                                    <p>{ (trade.description == undefined)?"":trade.description.substring(0, 120) }...</p>
                                                    <div className="hover-box">
                                                        <Link className="explore-btn w-75"  to={{pathname: `/company/${trade.slug}`}}>
                                                            Explore</Link>

                                                        <button className="mt-2 btn btn-primary-default w-75 mb-3" type="button" onClick={(event) => showModal(event, trade.id, trade.name)} > Buy / Sell </button>
                                                    </div>
                                                </div>
                                                <div className="Buy_Sell mt-4">
                                                    <button className="btn bnt-buysell w-75">Buy / Sell </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        ))

                    ):"Data Loading...."
                }

            </div>

            {/* <CompanyPagination postsPerpage ={props.postPerpage} totalPosts={props.totalPosts} paginate={props.paginate}/> */}
            { !tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id } c_name={item_name} />
            }
        </>
    )
}
