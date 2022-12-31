import React, { Component, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import Allcompanies from './company-trade/Allcompanies';
import "./style.scoped.css";
import Breadcrumb from "../../Components/Breadcrumbs";
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../Utils/Network";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
import Button from '@material-ui/core/Button';
import Buttons from '../../Components/Buttons';

import CloseIcon from '@material-ui/icons/Close';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as SortIcon } from './sort-icon.svg';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { isLoggedIn } from "../../Utils/Network"
import {Helmet} from "react-helmet";

import Negotiations from "../../Pages/Negotiations";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 1500,
    width: "border-box",
    border: "1px solid #CFCBCF",
    borderRadius: "10px",
    //   margin: "10px"
  },
  paper: {
    position: 'absolute',
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%) !important",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0),
    borderRadius: "10px"
  },
}));

export default function Companies(props) {

  const classes = useStyles();

  let history = useHistory();
  const [rowInformation, setRowInformation] = React.useState([{}, {}, {}, {},
  {}, {}, {}, {}])
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

  const [num, setnum] = React.useState(0)
  const [hasmore, sethasmore] = React.useState(true)

  const [clearall, setclearall] = React.useState(false)

  const [fetchdiscard, setfetchdiscard] = React.useState(false)

  const [searchOptions, setsearchOptions] = useState([])
  const [isLogin, setisLogin] = useState(isLoggedIn());

  const [isInsideExplorePage, setisInsideExplorePage] = useState(props.explorePage);


  const refssector = useRef([])

  const refsfundingseries = useRef([])

  const refscompanytype = useRef([])

  React.useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];

    // Add a Click Event Listener to the button       
    close.addEventListener("click", () => {
      searchkey = 'nothing'
      getAllInventory(true)
    })

  }, []);

  const getSearchOption = async function () {
    let response1 = await apiCall("company/allcompaniesnames", 'GET', '', history)
    // console.log(response1)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1)

    setsearchOptions(responseJSON1.map(ssa => ssa.name))
  }

  let searchkey = 'nothing'

  React.useEffect(() => {

    getSearchOption()
    getAllInventory(true)
    getAllSectors()
    getAllFundingList()
    getAllCompanyTypeList()

  }, [clearall]);

  const reqbody = {
    "a": assetSectoroptions,
    "b": assetSeriesOfFundingoptions,
    "c": assetCompanyTypeoptions
  }

  const fetchMoreData = () => {

    if (fetchdiscard == false) {

      rowInformation.push({}, {}, {}, {}, {}, {}, {}, {})

      setRowInformation([...rowInformation])
      getAllInventory(false)
    }
    setfetchdiscard(true)
  };

  const getAllInventory = async function (sizereset) {
    if (searchkey == "") {
      searchkey = "nothing"
    }
    if (sizereset == true) {
      setisLoading(false)
      let num1 = 0
      // console.log("aaaaaassspp"+searchkey+sizereset+num1)
      let response = await apiCall("company/findAllportal/" + searchkey + "/" + num1, 'POST', reqbody, history)
      // console.log(response)
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return
      }

      let responseJSON = await response.json();
      // console.log(responseJSON)
      // if(responseJSON[0] != undefined) {
      //   settotalPosts(responseJSON[0].totalRecordsGlobalViewPArameter)
      //   console.log("oduiosksh"+responseJSON[0].totalRecordsGlobalViewPArameter)
      // } else {
      //   settotalPosts(0)
      // }

      setRowInformation(responseJSON)


      setisLoading(true)
      setnum(num1 + 1)
      if (responseJSON.length % 20 != 0) {
        sethasmore(false)
      } else {
        if (responseJSON.length == 0) {
          sethasmore(false)
        } else {
          sethasmore(true)
        }

      }

      getSearchCount(searchkey, num1)
    } else {
      // console.log("aaaaaassspp"+searchkey+sizereset+num)
      let response = await apiCall("company/findAllportal/" + searchkey + "/" + num, 'POST', reqbody, history)
      // console.log(response)
      if (response.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return
      }

      let responseJSON = await response.json();
      // console.log(responseJSON)
      // if(responseJSON[0] != undefined) {
      //   settotalPosts(responseJSON[0].totalRecordsGlobalViewPArameter)
      //   console.log("oduiosksh"+responseJSON[0].totalRecordsGlobalViewPArameter)
      // } else {
      //   settotalPosts(0)
      // }

      let rowInformation1 = []

      rowInformation1 = rowInformation.filter(rec => rec.id != null)

      responseJSON.map(record => rowInformation1.push(record))
      setRowInformation([...rowInformation1])
      setisLoading(true)
      setnum(num + 1)
      if (responseJSON.length % 20 != 0) {
        sethasmore(false)
      } else {
        sethasmore(true)
      }

      // getSearchCount(searchkey, num)
    }

    setfetchdiscard(false)


  }

  const getSearchCount = async function (searchkey, num) {
    let response = await apiCall("company/findAllportalSearchCount/" + searchkey + "/" + num, 'POST', reqbody, history)
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    // console.log(responseJSON)
    // console.log(responseJSON+"ddddddddddddddddddf")
    settotalPosts(responseJSON.totalSearchCount)
  }

  const getAllSectors = async function () {
    let response = await apiCall("filter/sector", 'GET', '', history)
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    // console.log(responseJSON+"ddddddddddddddddddf")
    setSectorList(responseJSON)
  }

  const getAllFundingList = async function () {
    let response = await apiCall("filter/fundingseries", 'GET', '', history)
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    // console.log(responseJSON)
    setSeriesOfFundingList(responseJSON)
  }

  const getAllCompanyTypeList = async function () {
    let response = await apiCall("filter/companytype", 'GET', '', history)
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    // console.log(responseJSON)
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
    refssector.current.map(element => element.checked = false)
    refsfundingseries.current.map(element => element.checked = false)
    refscompanytype.current.map(element => element.checked = false)

    setclearall(!clearall)
  }
  const sectorChange = (e) => {

    // console.log("123232323232323232" + e.target.checked)

    let index
    if (e.target.checked) {
      assetSectoroptions.push(e.target.value)
    } else {
      index = assetSectoroptions.indexOf(e.target.value)
      assetSectoroptions.splice(index, 1)
    }

    // console.log("ppppp1"+assetSectoroptions.length)
    // console.log("ppppp"+assetSectoroptions)
    setRowInformation([{}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}])
    getAllInventory(true)
  }


  const fundingChange = (e) => {
    let index
    if (e.target.checked) {
      assetSeriesOfFundingoptions.push(e.target.value)
    } else {
      index = assetSeriesOfFundingoptions.indexOf(e.target.value)
      assetSeriesOfFundingoptions.splice(index, 1)
    }
    setRowInformation([{}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}])
    getAllInventory(true)
  }

  const companyTypeChange = (e) => {

    let index
    if (e.target.checked) {
      assetCompanyTypeoptions.push(e.target.value)
    } else {
      index = assetCompanyTypeoptions.indexOf(e.target.value)
      assetCompanyTypeoptions.splice(index, 1)
    }
    setRowInformation([{}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}])
    getAllInventory(true)
  }

  const handleKeypress = e => {

    if (e.code === "Enter") {

      e.preventDefault();
      searchkey = e.target.value
      //handleSubmit();
      if (searchkey == "") {
        searchkey = "nothing"
      }
      // console.log("aaaaaasss11"+searchkey)
      setisLoading(false)
      getAllInventory(true)
    }

  };




  // filter popper

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);

    if (anchorEl) {
      // alert();
      setAnchorEl(null);
    }

    // setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleFilterClose = (event) => {

    if (anchorEl) {
      // alert();
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popper' : undefined;

  /////////////// popper end /////////////////

  // console.log(rowInformation, "mayur rowInformation") 


  const [month, setMonth] = useState([]);

  const handleMonth = (index) => {
    return (value) => {
      let tmp = [...this.state.month];
      tmp[index] = value;
      setMonth({
        month: tmp
      });
    }
  };
  // console.log(month, "mayur months index")

  const [addClass, setAddclass] = useState(0)

  const [selectElement, setSelectElement] = useState(0);

  const handleClick = (id) => {
    setSelectElement(id)
  }

  const selectSector = (id) => {

    setAddclass(id)
    { addClass ? setAddclass(false) : setAddclass(true) }
    // console.log("addClass",addClass )

  }

  let FilterInner = () => {

    return (
      <>

        <div className="bg-white p-2 rounded allcompany-custom-filter border-0 " >
          <div className="filter-top-action border-bottom py-2 pb-2 d-flex align-items-center justify-content-between">
            <div className="cursor-pointer w-100 dbmn" >
              <CloseIcon className="dbmn" onClick={handleFilterClose} />
            </div>
            <div className="w-100">
              <h6 className="text-default text-center"><b>Filter</b></h6>
            </div>
            <div className="cursor-pointer w-100 dbmn">
              <h6 className="text-right text-small">Clear All</h6>
            </div>
          </div>
          {
            <>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="border-0">Sector</Typography>
                </AccordionSummary>
                <div className='filter-row'>
                  {rowInformation.map((trade, index) => (

                    <div className="accordion-details coql-6 " key={index}>
                      {/* <p className={ selectElement === trade.id? ' filter-options-selected' : 'filter-options'} onClick={() => handleClick(trade.id)}  >{trade.slug}</p> */}

                      <div class="boxes filter-options-main ">
                        <input className='filter-options' type="checkbox" id={trade.id} />
                        <label for={trade.id} >{trade.slug}</label>
                      </div>

                      {/* <p className={ month === index ? ' filter-options-selected' : 'filter-options'} onClick={() => handleMonth(index)}  >{trade.slug}</p> */}


                      {/* <p className={addClass?'filter-options':'filter-options-selected'} onClick={() => selectSector(trade.id)}>{trade.slug}</p> */}
                      {/* <p className={addClass?'filter-options':'filter-options-selected'} onClick={selectSector}>{trade.slug}</p> */}

                    </div>))

                  }
                </div>
                {/* <div className="px-1 accordion-details d-flex">
                          <p className='filter-options'>{trade.sector}</p>
                          <p className='filter-options'>Pharmacy</p>
                          <p className='filter-options'>IT Services</p>                    
                        </div>   */}
                {/* <div className="px-1 accordion-details d-flex mt-1">
                          <p className='filter-options'>Agriculture & Farming</p>
                          <p className='filter-options'>Biotechnology</p>
                        </div>   
                        <div className="px-1 accordion-details d-flex mt-1">
                          <p className='filter-options'>Consumer Goods</p>
                          <p className='filter-options'>Clothing</p>
                          <p className='filter-options'>Energy</p>                    
                        </div> 
                        <div className="px-1 accordion-details d-flex mt-1">
                          <p className='filter-options'>Healthcare</p>
                                             
                        </div>                      */}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography >Company Type</Typography>
                </AccordionSummary>
                <div className="px-1 accordion-details d-flex">
                  <p className='filter-options'>Education</p>
                  <p className='filter-options'>Pharmacy</p>
                  <p className='filter-options'>IT Services</p>
                </div>



              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography >Series Of Funding</Typography>
                </AccordionSummary>
                <div className="px-1 accordion-details d-flex">
                  <p className='filter-options'>Education</p>
                  <p className='filter-options'>Pharmacy</p>
                  <p className='filter-options'>IT Services</p>
                </div>

              </Accordion>
            </>


          }
          <div className="filter-action-bottom m-2">
            <Buttons.PrimaryButton value="Apply" style={{ width: "100%" }} />
          </div>
          <div className="filter-action-bottom m-2 dnmb">
            <Buttons.SecondaryButton value="Clear Filter" style={{ width: "100%" }} />
          </div>
        </div>
      </>
    )
  }

  // console.log("window.location.pathname ", window.location.pathname )



  return (
    <>
    {(isInsideExplorePage == undefined || isInsideExplorePage == true) ? null:
        <Helmet>
            <title>All-companies</title>
            <meta name="description" content="all-companies" />
        </Helmet>}

      <section className="company-section mt-2" >

        <div className="container dbmn">
          {isInsideExplorePage ? null : <>{isLogin ? <Breadcrumb /> : null}</>}

          <div className="row">
            <React.Fragment>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12 company-conatinern position-relative  ">
                {isLogin ? null :
                  window.location.pathname === "/all-companies" &&

                  <div className='my-3'>
                    <h5 className='default-heading'>Explore Over 200+ Companies!</h5>
                    <div className='default-para d-flex justify-content-center px-5 my-3'>
                      <p className='default-para px-5 pb-4'>We have shares of over 200+ companies on our platform. You can easily start investing through our transparent and secure process, leveraging intelligence and technology for a seamless transactional experience.</p>
                    </div>
                  </div>
                  
                  }
                <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: "999" }} >
                  <FilterInner />
                </Popper>

                <div className={isInsideExplorePage ? "d-none" : "search-area d-flex justify-content-between"}>
                  <div className='row'>
                    <div className='col-md-8 col-12'>
                      <form className="w-100">
                        <div className="form-group">
                          <div className="form-group has-search mb-0 small-icon w-100 ">
                            <div className='inventory-search-icon form-control-feedback'>
                              <SearchIcon />
                            </div>
                            <Autocomplete
                              style={{ width: 1000 }}
                              freeSolo
                              options={searchOptions}
                              renderInput={(params) => (
                                <TextField {...params}
                                  onSelect={(event, value) => {

                                    searchkey = event.target.value
                                    getAllInventory(true)
                                  }}
                                  className="inventory-search-bar"
                                  placeholder="Search Company Name"
                                  onKeyDown={(event, value) => handleKeypress(event)}
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className='col-md-4 col-12'>
                      {/* <div className='d-flex'>                          
                            
                              
                              <Button className="btn btn-secoundary-default mx-2 company-filter-btns"   >
                                  <SortIcon width="15" height="16" className="mr-2" />
                                  Sort
                              </Button>
                              
                              <Button className="btn btn-secoundary-default mx-2 company-filter-btns"  onClick={handleFilter} >
                                  <FilterIcon width="15" height="16" className="mr-2" />
                                  Filter
                              </Button>                      

                          </div> */}
                    </div>
                  </div>
                </div>

                <div className="galaxy">

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
                    <Allcompanies postPerpage={postPerpage} currentPost={rowInformation} totalPosts={totalPosts} />
                  </InfiniteScroll>


                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        {/* For Mobile View  */}
        <div className="dnmb">
          <div className="px-4">
            <div className="search-area d-flex justify-content-between">
              <div className='row'>
                <div className='col-md-8 col-12'>
                  <form className="w-100">
                    <div className="form-group">
                      <div className="form-group has-search mb-0 small-icon w-100 ">
                        <div className='inventory-search-icon form-control-feedback'>
                          <SearchIcon />
                        </div>
                        <Autocomplete
                          style={{ width: 1000 }}
                          freeSolo
                          options={searchOptions}
                          renderInput={(params) => (
                            <TextField {...params}
                              onSelect={(event, value) => {

                                searchkey = event.target.value
                                getAllInventory(true)
                              }}
                              className="inventory-search-bar"
                              placeholder="Search Company Name"
                              onKeyDown={(event, value) => handleKeypress(event)}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>



              <div className='col-12 pr-1 pl-1 d-none'>
                <div className="form-group has-search mb-0 small-icon">
                  <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                  <input type="text" class="form-control" placeholder="Search Companies with name, CIN, ISIN..."
                    onKeyPress={handleKeypress} />
                </div>

              </div>
              {/*<div className=' col-5 d-flex pl-1'>*/}
              {/*  <Button className="btn btn-secoundary-default company-filter-mobile "  >*/}
              {/*      <SortIcon width="15" height="16" />*/}
              {/*      */}
              {/*  </Button>*/}

              {/*  <Button className="btn btn-secoundary-default company-filter-mobile "  onClick={handleFilter} >*/}
              {/*      <FilterIcon width="15" height="16" />*/}
              {/*      */}
              {/*  </Button>*/}
              {/*</div>*/}

            </div>



            {/* <button className="btn btn-secoundary-default mx-2">
                <img src={FilterIcon} width="20" height="20" />
              </button> */}
          </div>
          <div className="galaxy" style={{ borderRadius: "none !important" }}>
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
              <div className="px-3">
                <Allcompanies postPerpage={postPerpage} currentPost={rowInformation} totalPosts={totalPosts} />
              </div>
            </InfiniteScroll>

          </div>
        </div>
      </section>
    </>
  )

}
