import React, { Component, useState, useRef} from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import TradesGridThree from './company-trade/TradesGridThree';
import PriceRangeSlider from './PriceRangeSlider';
import loadingImg from './loading.gif'
// import "./bootstrap3/css/bootstrap.min.scoped.css"
import './bootstrap4/css/bootstrap.scoped.css';
import Skeleton from 'react-loading-skeleton';
import TradeImage from './company-trade/TradeImage';

import "./style.scoped.css"
import Breadcrumb from "../../Components/Breadcrumbs";
import Buttons from '../../Components/Buttons';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FilterIcon from './filter.svg'
import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../Utils/Network"

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
// import SearchIcon from '@material-ui/icons/Search';

// import InfiniteScroll from "react-infinite-scroll-component";

export default function Companies(props) {

  let history = useHistory();
  const [rowInformation, setRowInformation] = React.useState([{},{},{},{},
    {},{},{},{}, {},{},{},{}])
  const [SectorList, setSectorList] = React.useState([])
  const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])
  const [companyTypeList, setcompanyTypeList] = React.useState([])

  const [postPerpage, setpostPerpage] = React.useState(1000)
  const [totalPosts, settotalPosts] = React.useState(0)

  const [maxprice, setmaxprice] = React.useState(999999)
  const [minprice, setminprice] = React.useState(0)
  const [isLoading, setisLoading] = React.useState(false)
  const [panelShow1, setpanelShow1] = React.useState(false)
  const [panelShow2, setpanelShow2] = React.useState(false)
  const [panelShow3, setpanelShow3] = React.useState(false)

  const [assetSectoroptions, setassetSectoroptions] = React.useState([])
  const [assetSeriesOfFundingoptions, setassetSeriesOfFundingoptions] = React.useState([])
  const [assetCompanyTypeoptions, setassetCompanyTypeoptions] = React.useState([])

  const [num, setnum] = React.useState(20)
  const [hasmore, sethasmore] = React.useState(true)

  const [clearall, setclearall] = React.useState(false)

    const [fetchdiscard, setfetchdiscard] = React.useState(false)
  
  const [searchOptions, setsearchOptions] = useState([])

  const refssector = useRef([])

  const refsfundingseries = useRef([])

  const refscompanytype = useRef([])

  const getSearchOption = async function (){
    let response1 = await apiCall("company/allcompaniesnames",'GET', '', history)
    //console.log(response1)
    let responseJSON1 = await response1.json();
    //console.log(responseJSON1)

    setsearchOptions(responseJSON1.map(ssa=>ssa.name))
  }

  let searchkey = 'nothing'

  React.useEffect(() => {

    getSearchOption()
    getAllInventory()
    getAllSectors()
    getAllFundingList()
    getAllCompanyTypeList()
    // setTimeout(() => {
    //   setLoad(true)
    //
    // }, 5000);
  }, [clearall]);

  const reqbody = {
    "a": assetSectoroptions,
    "b": assetSeriesOfFundingoptions,
    "c": assetCompanyTypeoptions
  }

  const fetchMoreData = () => {

    if(fetchdiscard == false) {

      rowInformation.push({},{},{},{},{},{},{},{})

      setRowInformation([...rowInformation])
      getAllInventory(false)
    }
    setfetchdiscard(true)
  };

  const getAllInventory = async function (sizereset) {
    if(searchkey =="") {
      searchkey ="nothing"
    }
    if(sizereset == true) {
      setisLoading(false)
      let num1 = 20
      //console.log("aaaaaassspp"+searchkey+sizereset+num1)
      let response = await apiCall("company/findAllportal/"+searchkey+"/"+num1, 'POST', reqbody, history)
      //console.log(response)
      let responseJSON = await response.json();
      //console.log(responseJSON)
      if(responseJSON[0] != undefined) {
        settotalPosts(responseJSON[0].totalRecordsGlobalViewPArameter)
        //console.log("oduiosksh"+responseJSON[0].totalRecordsGlobalViewPArameter)
      } else {
        settotalPosts(0)
      }
      setRowInformation(responseJSON)
      setisLoading(true)
      setnum(num1+20)
      if(responseJSON.length % 20 != 0) {
        sethasmore(false)
      } else {
        sethasmore(true)
      }

    //count

      // let response1 = await apiCall("company/findAllportal/searchcount/"+searchkey, 'POST', reqbody, history)
      // console.log("yuyuyuyuyuy"+response1.body)
      //settotalPosts(response1)
    } else {
      //console.log("aaaaaassspp"+searchkey+sizereset+num)
      let response = await apiCall("company/findAllportal/"+searchkey+"/"+num, 'POST', reqbody, history)
      //console.log(response)
      let responseJSON = await response.json();
      //console.log(responseJSON)
      if(responseJSON[0] != undefined) {
        settotalPosts(responseJSON[0].totalRecordsGlobalViewPArameter)
        //console.log("oduiosksh"+responseJSON[0].totalRecordsGlobalViewPArameter)
      } else {
        settotalPosts(0)
      }
      setRowInformation(responseJSON)
      setisLoading(true)
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

    setfetchdiscard(false)

  }

  const getAllSectors = async function () {
    // console.log("aaaaaassspp"+searchkey)

    let response = await apiCall("filter/sector", 'GET', '', history)
    //console.log(response)
    let responseJSON = await response.json();
    //console.log(responseJSON+"ddddddddddddddddddf")
    setSectorList(responseJSON)
  }

  const getAllFundingList = async function () {
    // console.log("aaaaaassspp"+searchkey)

    let response = await apiCall("filter/fundingseries", 'GET', '', history)
    //console.log(response)
    let responseJSON = await response.json();
    //console.log(responseJSON)
    setSeriesOfFundingList(responseJSON)
 }

  const getAllCompanyTypeList = async function () {
    // console.log("aaaaaassspp"+searchkey)

    let response = await apiCall("filter/companytype", 'GET', '', history)
    //console.log(response)
    let responseJSON = await response.json();
    //console.log(responseJSON)
    setcompanyTypeList(responseJSON)
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
    // refssector.currents[0].checked = false;

    refssector.current.map(element=>element.checked=false)
    refsfundingseries.current.map(element=>element.checked=false)
    refscompanytype.current.map(element=>element.checked=false)

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
      setRowInformation([{},{},{},{},
        {},{},{},{}, {},{},{},{}])
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
    setRowInformation([{},{},{},{},
      {},{},{},{}, {},{},{},{}])
    getAllInventory(true)
  }

  const companyTypeChange = (e) => {
    // setisLoading(true)
    // setnum(20)
    let index
    if (e.target.checked) {
      assetCompanyTypeoptions.push(e.target.value)
    } else {
      index = assetCompanyTypeoptions.indexOf(e.target.value)
      assetCompanyTypeoptions.splice(index, 1)
    }
    setRowInformation([{},{},{},{},
      {},{},{},{}, {},{},{},{}])
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
      setisLoading(false)
      getAllInventory(true)
    }

  };

  return (
      <>
        <section className="company-section mt-3">
          <div className="container dbmn">
            <Breadcrumb />
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-3 col-12 pr-1 ">
                <div className="sun bg-white">
                  <div className="moon d-flex align-items-center justify-content-between">
                    <h4>Filter</h4>
                    <span className="pull-right float-right cursor-pointer clear-all-link" onClick={(e)=>{
                      //console.log("tttttttttttt")
                       clearFilters(e)
                    }}>Clear All</span>
                  </div>
                  <div className="earth">
                    <button className={panelShow1 ? "accor active1" : "accor"} onClick={showPanel1}>Sector</button>
                    <div className={panelShow1 ? "panel1 show-panel1 overflow-auto hide_scrollbar" : "panel1"} >
                      {SectorList.map((item, index) => {
                        //console.log("yyyyyyyyyyyyyyyyyyyyypp")

                        return <div className="form-group " key={index}>
                          <p className="d-flex align-items-center">                          
                                <input  key={index} ref={(element) => {refssector.current[index] = element}} type="checkbox" name={item.label} value={item.value} onChange={(e) =>sectorChange(e)} class="styled-checkbox-primary" id={item.label} />
                                <label className="label-text" for={item.label}>{item.label}</label>                      
                          </p>
                        </div>;
                      })}
                    </div>
                    <button className={panelShow2 ? "accor active1" : "accor"} onClick={showPanel2}>Series of Funding</button>
                    <div className={panelShow2 ? "panel1 show-panel1 overflow-auto hide_scrollbar" : "panel1"}>
                      {SeriesOfFundingList && SeriesOfFundingList.map((item, index) => {
                        return <div className="form-group" key={index}>
                          <p className="d-flex align-items-center">                         
                          <input  key={index} ref={(element) => {refsfundingseries.current[index] = element}} type="checkbox" name={item.label} value={item.value} onChange={(e) =>fundingChange(e)} class="styled-checkbox-primary" id={item.label}   />
                                <label className="label-text" for={item.label}>{item.label}</label>  
                          </p>
                        </div>;
                      })}
                    </div>
                    <button className={panelShow3 ? "accor active1" : "accor"} onClick={showPanel3}>Company Type
                    </button>
                    <div className={panelShow3 ? "panel1 show-panel1 overflow-auto hide_scrollbar" : "panel1"}>
                      {companyTypeList && companyTypeList.map((item, index) => {
                        return <div className="form-group" key={index}>
                          <p className="d-flex align-items-center">
                            <input   key={index} ref={(element) => {refscompanytype.current[index] = element}} type="checkbox" name={item.label} value={item.value}
                                   onChange={(e) => companyTypeChange(e)} className="styled-checkbox-primary"
                                   id={item.label}/>
                            <label className="label-text" htmlFor={item.label}>{item.label}</label>
                          </p>
                        </div>;
                      })}
                    </div>
                    {/*<button className={panelShow3 ? "accor active1" : "accor"} onClick={showPanel3}>Valuation</button>*/}
                    {/*<div className={panelShow3 ? "panel1 show-panel1 px-2 pt-3" : "panel1"}>*/}
                    {/*  {*/}
                    {/*    <PriceRangeSlider minVal={minprice} maxVal={maxprice} finalChange={finalChange} />*/}
                    {/*  }*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              <React.Fragment>
              <div className="col-xl-10 col-lg-9 col-md-9 col-12 company-conatiner pt-3">
                <div className="search-area">
                  <form className="w-100">
                    <div className="w-100">
                      <div className="form-group">
                        <div className="form-group has-search mb-0 small-icon w-100 ">
                              <div className='inventory-search-icon form-control-feedback'>
                                  <SearchIcon /> 
                              </div>
                              <Autocomplete
                                  style={{ width: 1000}}
                                  freeSolo                                           

                                  options={searchOptions}
                                  renderInput={(params) => (
                                      <TextField {...params}
                                                  // onChange={(event, value) => ""}
                                                  onSelect={(event, value) => {

                                                      searchkey = event.target.value
                                                      getAllInventory()
                                                  }}
                                                  className="inventory-search-bar"
                                                  placeholder="Search Company Name"
                                                  onKeyDown={(event, value) => handleKeypress(event)}
                                              //    label="Search Company Name"
                                              variant="outlined"
                                              

                                      />
                                  )}
                              />

                          {/* <FontAwesomeIcon className="form-control-feedback" icon={faSearch}/>
                          <input type="text" className="form-control" placeholder="Search Companies with name, CIN, ISIN..."
                                 onKeyPress={handleKeypress}/> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="galaxy">

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
                        <TradesGridThree postPerpage={postPerpage} currentPost={rowInformation} totalPosts={totalPosts} />
                        </InfiniteScroll>

                      
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
              <button className="btn btn-secoundary-default mx-2">
                <img src={FilterIcon} width="20" height="20" />
              </button>
            </div>
            <div className="galaxy" style={{ borderRadius: "none !important" }}>


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
                      <TradesGridThree postPerpage={postPerpage} currentPost={rowInformation} totalPosts={totalPosts} />
                    </div>
                    </InfiniteScroll>

            </div>
          </div>
        </section>
      </>
    )

}
