import React, { Component } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import TradesGridThree from './company-trade/TradesGridThree';
import PriceRangeSlider from './PriceRangeSlider';
import loadingImg from './loading.gif'
// import "./bootstrap3/css/bootstrap.min.scoped.css"
import './bootstrap4/css/bootstrap.scoped.css';
import Allcompanies from './company-trade/Allcompanies';
import "./style.scoped.css"
import Breadcrumb from "../../Components/Breadcrumbs";
import Buttons from '../../Components/Buttons';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FilterIcon from './filter.svg'
import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../Utils/Network"

import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Companies(props) {

  let history = useHistory();
  const [rowInformation, setRowInformation] = React.useState([])
  const [SectorList, setSectorList] = React.useState([])
  const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])
  const [postPerpage, setpostPerpage] = React.useState(1000)
  const [totalPosts, settotalPosts] = React.useState(0)

  const [maxprice, setmaxprice] = React.useState(999999)
  const [minprice, setminprice] = React.useState(0)
  const [isLoading, setisLoading] = React.useState(true)
  const [panelShow1, setpanelShow1] = React.useState(false)
  const [panelShow2, setpanelShow2] = React.useState(false)
  const [panelShow3, setpanelShow3] = React.useState(false)

  const [assetSectoroptions, setassetSectoroptions] = React.useState([])
  const [assetSeriesOfFundingoptions, setassetSeriesOfFundingoptions] = React.useState([])
  const [num, setnum] = React.useState(20)
  const [hasmore, sethasmore] = React.useState(true)

  const [clearall, setclearall] = React.useState(false)

  let searchkey = 'nothing'

  React.useEffect(() => {
    getAllInventory(true)
    // getAllSectors()
    // getAllFundingList()
  }, [clearall]);

  const reqbody = {
    "a": assetSectoroptions,
    "b": assetSeriesOfFundingoptions
  }

  const fetchMoreData = () => {
    getAllInventory(false)
  };

  const getAllInventory = async function (sizereset) {

    if(sizereset == true) {
      setisLoading(true)
      let num1 = 20
      //console.log("aaaaaassspp"+searchkey+sizereset+num1)
      let response = await apiCall("company/findAllportalwatchlist/"+num1, 'POST', reqbody, history)
      //console.log(response)
      let responseJSON = await response.json();
      //console.log(responseJSON)
      setRowInformation(responseJSON)
      setisLoading(false)
      setnum(num1+20)
      if(responseJSON.length % 20 != 0) {
        sethasmore(false)
      } else {
        if(responseJSON.length == 0) {
          sethasmore(false)
        } else {
          sethasmore(true)
        }
      }

    //count

      // let response1 = await apiCall("company/findAllportal/searchcount/"+searchkey, 'POST', reqbody, history)
      // console.log("yuyuyuyuyuy"+response1.body)
      //settotalPosts(response1)
    } else {
      //console.log("aaaaaassspp"+searchkey+sizereset+num)
      let response = await apiCall("company/findAllportalwatchlist/"+num, 'POST', reqbody, history)
      //console.log(response)
      let responseJSON = await response.json();
      //console.log(responseJSON)
      setRowInformation(responseJSON)
      setisLoading(false)
      setnum(num+20)
      if(responseJSON.length % 20 != 0) {
        sethasmore(false)
      } else {
        sethasmore(true)
      }

      // let response1 = await apiCall("company/findAllportal/searchcount/"+searchkey, 'POST', reqbody, history)
      //
      // console.log("yuyuyuyuyuy"+response1.body)
      //settotalPosts(response1)
    }



  }




  const showPanel1 = (e) => {
    setpanelShow1(!panelShow1)
  }
  const showPanel2 = (e) => {
    setpanelShow2(!panelShow2)
  }
  const showPanel3 = (e) => {
    setpanelShow3(!panelShow3)
  }

  const clearFilters = (e) => {
    //e.preventDefault()
    //setSectorList(...[SectorList])
    setclearall(!clearall)
  }
  const sectorChange = (e) => {

    // setisLoading(true)

    //console.log("123232323232323232" + e.target.checked)

      let index
      if (e.target.checked) {
        assetSectoroptions.push(e.target.value)
      } else {
        index = assetSectoroptions.indexOf(e.target.value)
        assetSectoroptions.splice(index, 1)
      }

      //console.log("ppppp1"+assetSectoroptions.length)
      //console.log("ppppp"+assetSectoroptions)
      getAllInventory(true)
  }


  const fundingChange = (e) => {
    // setisLoading(true)
    // setnum(20)
    let index
    if (e.target.checked) {
      assetSeriesOfFundingoptions.push(e.target.value)
    } else {
      index = assetSeriesOfFundingoptions.indexOf(e.target.value)
      assetSeriesOfFundingoptions.splice(index, 1)
    }

    getAllInventory(true)
  }

  const handleKeypress = e => {


    //it triggers by pressing the enter key
    //console.log("aaaaaasss"+e.keyCode+e.code)
    if (e.code === "Enter") {

      e.preventDefault();
      searchkey = e.target.value
      //handleSubmit();
      if(searchkey=="") {
        searchkey = "nothing"
      }
      //console.log("aaaaaasss11"+searchkey)
      setisLoading(true)
      getAllInventory(true)
    }

  };

  return (
      <>
        <section className="company-section mt-3">
          <div className="container dbmn">
            <Breadcrumb />
            <div className="row">
              {/* <div className="col-xl-2 col-lg-3 col-md-3 col-12 pr-1 ">
                <div className="sun bg-white">
                  <div className="moon moon_filter d-flex align-items-center justify-content-between">
                    <h4>Filter</h4>
                    <span className="pull-right float-right cursor-pointer clear-all-link" onClick={(e)=>{
                      console.log("tttttttttttt")
                       clearFilters(e)
                    }}>Clear All</span>
                  </div>
                  <div className="earth">
                    <button className={panelShow1 ? "accor active1" : "accor accor_filter"} onClick={showPanel1}>Sector</button>
                    <div className={panelShow1 ? "panel1 show-panel1" : "panel1"} >
                      {SectorList.map((item, index) => {
                        console.log("yyyyyyyyyyyyyyyyyyyyy")
                        return <div className="form-group " key={index}>
                          <p className="d-flex align-items-center">                          
                                <input  key={index} type="checkbox" name={item.label} value={item.value} onChange={(e) =>sectorChange(e)} class="styled-checkbox-primary" id={item.label} />
                                <label className="label-text" for={item.label}>{item.label}</label>                      
                          </p>
                        </div>;
                      })}
                    </div>
                    <button className={panelShow2 ? "accor active1" : "accor accor_filter"} onClick={showPanel2}>Series of Funding</button>
                    <div className={panelShow2 ? "panel1 show-panel1" : "panel1"}>
                      {SeriesOfFundingList && SeriesOfFundingList.map((item) => {
                        return <div className="form-group">
                          <p className="d-flex align-items-center">                         
                          <input type="checkbox" name={item.label} value={item.value} onChange={(e) =>fundingChange(e)} class="styled-checkbox-primary" id={item.label}   />
                                <label className="label-text" for={item.label}>{item.label}</label>  
                          </p>
                        </div>;
                      })}
                    </div>
                    
                  </div>
                </div>
              </div> */}
              <React.Fragment>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                {/*<div className="search-area">*/}
                {/*  <form className="w-100">*/}
                {/*    <div className="w-100">*/}
                {/*      <div className="form-group">*/}
                {/*        <div className="form-group has-search mb-0 small-icon w-100 ">*/}
                {/*          <FontAwesomeIcon className="form-control-feedback" icon={faSearch}/>*/}
                {/*          <input type="text" className="form-control" placeholder="Search Companies with name, CIN, ISIN..."*/}
                {/*                 onKeyPress={handleKeypress}/>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </form>*/}
                {/*</div>*/}
                <div className="galaxy ">

                  {
                    !isLoading ?
                        <InfiniteScroll
                            dataLength={rowInformation.length}
                            next={fetchMoreData}
                            hasMore={hasmore}
                            loader={<>
                              <Box className="d-flex justify-content-center align-items-center">
                                <CircularProgress />
                              </Box></>}
                            endMessage={
                              <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                        >
                          <Allcompanies postPerpage={postPerpage} currentPost={rowInformation} totalPosts={rowInformation.length} />
                        </InfiniteScroll>
                      : <div className="product-loader"><img src={loadingImg} alt="" /></div>
                  }
                </div>
              </div>
              </React.Fragment>
            </div>
          </div>
          {/* For Mobile View  */}
          <div className="dnmb">

            <div className="search-area px-4 d-flex align-items-center justify-content-between mb-3">
              {/* <Link onClick={ (event) => event.preventDefault() } class="icon">
                      <SearchIcon />
                    </Link>
                    <input type="text" placeholder="Search here..." name="search_text" className="form-control control w-100" onChange={this.searchChange} /> */}
              <div class="form-group has-search mb-0 small-icon w-100 ">
                <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                <input type="text" class="form-control" placeholder="Search Companies with name, CIN, ISIN..."
                       onKeyPress={handleKeypress}/>
              </div>
              {/* <button className="btn btn-secoundary-default mx-2">
                <img src={FilterIcon} width="20" height="20" />
              </button> */}
            </div>
            <div className="galaxy" style={{ borderRadius: "none !important" }}>

              {
                !isLoading ?
                    <InfiniteScroll
                        dataLength={rowInformation.length}
                        next={fetchMoreData}
                        hasMore={hasmore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                          <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                    >
                    <div className="px-3">
                      <Allcompanies postPerpage={postPerpage} currentPost={rowInformation} totalPosts={rowInformation.length} />
                    </div>
                    </InfiniteScroll>
                  : <div className="product-loader"><img src={loadingImg} alt="" /></div>
              }
            </div>
          </div>
        </section>
      </>
    )

}
