import React, {useState} from 'react'
import { Link } from "react-router-dom";
import TradeModal from '../TradeModal'
import useSWR from "swr";
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css";
import "./CompanyDetails.css";
import DashboardHeader from "../../../Components/DashboardHeader";
import { Breadcrumbs } from '@material-ui/core';
import c2 from "../c2.svg";
import CompanyLogo from "../company-logo.jpg";
import breathumbs from "../../../assets/breathumbs.svg";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttons from "../../../Components/Buttons";
import CompanyTab from "../CompanyTabs/CompanyTabs";
import DownloadIcon from '../download.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"

const fetcher = (...args) => fetch(...args).then((response) => response.json());
function CompDetails(props) {
  let history = useHistory()
  const [showMore, setShowMore] = useState(false);
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState("");
  const [listings,setlistings]=React.useState([])
  const [intrest_stock,setintrest_stock]=React.useState('To buy stocks')







  function showModal(event, id, name) {
    setModal(true);
    setItem_id(id);
    setitem_name(name)
  }
  function hideModal(e) {
    setModal(false);
  }
  const c_slug = props.match.params.cslug;
  const apiEndpoint = downloadurl("company/companydetail/"+c_slug);
  const { data, error} = useSWR(apiEndpoint, fetcher, {refreshInterval:20000000});

    React.useEffect(() => {
        handleChangeStockavailablelisting()
    }, []);

    let handleChangeStockavailablelisting = async () => {
        let response = await apiCall("trade/findbuysell/"+c_slug,'GET','', history)
        //console.log(response ,"response");

        let responseJSON = await response.json();
        //console.log(responseJSON ,"responseJSON")

        setlistings(responseJSON)
    };

    function ShowMore() {
    setShowMore(!showMore);
  }
  function ValuationConvertion(val) {
    var final_amt = val/1000000;
    if(final_amt >= 1000 ){
      final_amt = final_amt/1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }
  if(error) return <h1>{error}</h1>

  const download1 = async (event, filename, text) => {

    event.preventDefault()

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
      <>
        <DashboardHeader/>
        <Breadcrumbs/>
        {
          data ?

              <section className="company-section m-0 mb-3">
                <div className="container">
                  <div className="dbmn">
                    <div className="col-md-12 ">
                      <div className="top">
                        <div className="breathumbs-top">
                          <ul>
                            <li><Link to="/inventory_1" className="text-default-primary"><FontAwesomeIcon icon={faHome} /></Link></li>
                            <li><img src={breathumbs} /></li>
                            <li><Link to="/companies" className="com text-default-primary">Explore Companies</Link></li>
                            <li><img src={breathumbs} /></li>
                            <li><Link to="#" className="hdfc text-default-primary">{data.name}</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-9 col-md-12 col-12 company-explore-details">
                      <div className="company-details bg-white p-2">
                        {/* for Desktop view */}
                        <div className="dbmn">
                          <div className="row ">
                            <div className="col-md-3 col-3 d-flex align-items-center justify-content-center">
                              <div className="c_logo d-flex align-items-center justify-content-center">
                                <img src={data.logo}  width="100" height="100"/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-10 d-flex align-items-center">
                              <div className="c_name my-3">
                                <h4 className='c_name-heading'><b>{data.name}</b></h4>
                                <div className="d-flex">
                                  <p className="text-left w-50">Industry</p> <p className="text-left w-100"><b>{data.sector} </b></p>
                                </div>
                                <div className="d-flex">
                                  <p className="text-left w-50">For More information </p> <p className="text-left w-50 "><span> <a href={data.legalWebsiteLink}> Click here </a></span></p>
                                </div>
                                {/* <div className="d-flex">
                                  <p className="text-left w-50">Crunchbase Link</p > <p className="text-left w-50 "> <span><a href="#"> {data.legalWebsiteLink} </a></span></p>
                                </div> */}
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12 d-flex align-items-end flex-column">
                              <div className="c_inactive  text-right">
                                {data.temporarilyActive ?
                                    null
                                    :
                                    <button className="btn btn-inctive">Temporarily Inactive</button> }

                              </div>
                              <a className='btn-inctive mt-auto ' target="_blank" href={data.downloadReport} download>
                                <img src={DownloadIcon} alt="download-img" />
                              </a >
                              {/* <button className="btn btn-inctive mt-auto m-3">Download </button> */}


                            </div>
                          </div>
                        </div>
                        {/* for mobile view */}
                        <div className="dnmb">
                          <div className="row ">
                            <div className="col-md-3 col-3 d-flex align-items-center justify-content-center">
                              <div className="c_logo d-flex align-items-center justify-content-center">
                                <img src={data.logo}  width="100" height="100"/>
                              </div>
                            </div>
                            <div className="col-md-9 col-9 d-flex align-items-center pl-0">
                              <div className="c_name">
                                <h4><b>{data.name}</b></h4>
                              </div>
                            </div>
                            <div className="col-md-12 col-12">
                              <div className="c_inactive m-3">
                                <button className="btn btn-inctive">Temporarily Inactive</button>
                              </div>
                            </div>
                            <div className="col-md-12 col-12">
                              <div className="row">
                                <div className="col-6 pr-0">
                                  <p className="text-left w-50 mb-2 text-small text-grey-default">Industry</p>
                                </div>
                                <div className="col-6 pl-0">
                                  <p className="mb-2 text-small text-left w-100"><b>{data.sector} </b></p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 pr-0">
                                  <p className="text-left w-50 mb-2 text-small text-grey-default">Website</p>
                                </div>
                                <div className="col-6 pl-0">
                                  <p className="mb-2 text-small text-left w-100"><span>
                              <a href="#"> {data.legalWebsiteLink} </a></span>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 pr-0">
                                  <p className="text-left w-50 mb-2 text-small text-grey-default">Crunchbase Link</p>
                                </div>
                                <div className="col-6 pl-0">
                                  <p className="mb-2 text-small text-left w-100"><span>
                              <a href="#"> {data.legalWebsiteLink} </a> </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Company-details-tabs-section mt-3">
                        <CompanyTab companyId={data.id} companydetail={data}/>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-12 px-1">
                      <div className="company-explore-sidebar">
                        <div className="company-explore-sidebarinner">
                          <div className="code bg-white text-center">
                            <img src={c2} alt="c2" className="center-block" />
                            <p className="text-center mt-2">Directly reach out to place Buy/Sell orders</p>
                            <div className="d-flex justify-content-center">
                              <Buttons.PrimaryButton onClick={(event) => showModal(event, data.id, data.name)} style={{width:"75%"}} value="Buy / Sell" />
                            </div>
                            {/*<div className="d-flex justify-content-center mt-2">*/}
                            {/*  <Buttons.SecondaryButton style={{width:"75%"}} value="Add To Watchlist" />*/}
                            {/*</div>*/}
                          </div>
                          <div className="card mt-3">
                            <div className="p-1 text-center">
                              <h6 className="available-listing m-0">Available Listing</h6>
                            </div>
                            <div className="listing-table">
                              <table className="w-100">
                                <thead>
                                <tr>
                                  <th>Seller Name</th>
                                  <th>Qty</th>
                                  <th className="text-right">Price/Share</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {listings.map((trade,index) => (
                                        <tr>
                                            <td>{trade.onboardingAccountId}</td>
                                            <td>{trade.qty}</td>
                                            <td>₹ {trade.price}</td>
                                        </tr>
                                        )

                                    )}
                                {/* <tr>
                                  <td>{data.name}</td>
                                  <td className="text-center">{data.qty}</td>
                                  <td className="text-right">₹{data.price}</td>
                                </tr> */}
                                {/* <tr>
                                  <td>John Doe <br /> <span> 9 Oct 2020, 02:00 PM</span></td>
                                  <td className="text-center">12</td>
                                  <td className="text-right">₹ 100</td>
                                </tr>
                                <tr>
                                  <td>John Doe <br /> <span> 9 Oct 2020, 02:00 PM</span></td>
                                  <td className="text-center">12</td>
                                  <td className="text-right">₹ 100</td>
                                </tr> */}
                                </tbody>
                              </table>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                              <Link to="/inventory_1" className="text-default-primary w-75 text-center">
                                <Buttons.PrimaryButton style={{width:"100%"}} value="View All Listing" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> : null
        }
        { !tradeModal ? null :
            <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id } c_name={item_name} />

        }
        {/* <InventoryTableContent /> */}
      </>

  )
}

export default CompDetails
