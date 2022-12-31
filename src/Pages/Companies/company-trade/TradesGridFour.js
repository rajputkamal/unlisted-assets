import React,{useState} from 'react';
import { Link } from "react-router-dom";
import TradeModal from '../TradeModal';
import loadingImg from './loading.gif'
import useSWR from "swr";
// import "../bootstrap3/css/bootstrap.min.scoped.css"
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network"

function TradesGridFour() {
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);

  function ValuationConvertion(val) {
    var final_amt = val/1000000;
    if(final_amt >= 1000 ){
      final_amt = final_amt/1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }

  function showModal(event, data) {
    setModal(true);
    setItem_id(data);
  }
  function hideModal() {
    setModal(false);
  }
  
  const noOfPost = 8;
  const apiEndpoint = downloadurl("company/findAll");
  const { data: conpanies } = useSWR(apiEndpoint, {refreshInterval:20000});
  const currentPost = conpanies ? conpanies.slice(0, noOfPost) : null;

  // console.log("TradeGridFour.js")
  return (
    <>
    <div className="container"> 
    
          <div className="row"> 
        {
          currentPost ? (
            currentPost.map((trade, index) => (
              <div className="col-md-3" key={index}>
              <div className="box">
                  <div className="box1">
                    <div className="row">
                      <div className="col-md-2 col-xs-2">
                        <div className="border1">
                          <img src={trade.company_logo} alt="logo" className="center-block" />
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-8 pl-25">
                        <p className="p2" style={{fontWeight: 'bold'}}> { trade.company_name } test</p>
                        <p className="pharmacy">{ trade.sector }</p>
                        <p className="pharmacy">{ trade.company_isin }</p>
                      </div>
                      {/* <div className="col-md-2 col-xs-2">
                        <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="value content-box">
                        <p>Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.last_fund_raising_valuation) }</span></p>
                        <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p>
                        <p>{ trade.company_desc.substring(0, 120) }...</p>
                        <div className="hover-box">
                        <button type="button" onClick={(event) => showModal(event, trade.company_name)} > Trade </button><Link  to={{pathname: `/company/${trade.companySlug}`}}>Explore</Link>
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
        
        { currentPost && currentPost.length < 8 ? null :
                <div className="row">
                <div className="col-md-12">
                  <div className="view">
                    <p className="text-center p1"><Link to="/companies" className="btn2">View All</Link></p>
                  </div>
                </div>
              </div>
                }
        </div>
       { !tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id }/>
         }
    </>
  )
}

export default TradesGridFour
