import React from 'react';
import TCS from "../../Pages/Negotiations/Group 990TCS.png"
import hatti from "../../Pages/Negotiations/hatti.jpg"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as OptionsCloseIcon } from "./OptionsClose.svg";
import { ReactComponent as OptionsOpenIcon } from "./OptionsOpen.svg";
import { ReactComponent as ChatLogo } from "./Chatlogo.svg";
import { ReactComponent as SearchIcon } from "./SearchIcon.svg";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import Nologo from "./nologo.jpeg"


import "./Negotiationcompanylist.css"
import { apiCall, setAccessToken } from "../../Utils/Network"
import {
    BrowserRouter as Router, Link,
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import FavoriteIcon from '@mui/icons-material/Favorite';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink } from '@mui/material/colors';

export default function NegotiationCompanyList(props) {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    // let selectedTrade1 = location.state.selectedTrade;

    let history = useHistory();
    const [submenu, setSubmenu] = React.useState(false);
    const [RowInformation, setRowInformation] = React.useState([]);
    const [showclass, setShowclass] = React.useState();
    const [NegotiationChatActiveId, setNegotiationChatActiveId] = React.useState(selectedTradeOngoingTxn.id);
    const [allinventory, setAllinventory] = React.useState([]);
    const [NegotiationInterrupted, setNegotiationInterrupted] = React.useState(false);
    // const [selectedTrade1,settrade]=React.useState(location.state.selectedTrade);
    const [showCardResult, setshowCardResult] = React.useState();

    const CardData = (event, value) => {
        setshowCardResult(value)
        setShowFilterById(false)
        // { showData ? setshowData(false) : setshowData(true) }
        CloseFilter()
    }

    React.useEffect(() => {

        //console.log("health wealth pyar - once"+props.communicationLength)
        getData();
    }, [selectedTradeOngoingTxn]); // <-- Have to pass in [] here!

    React.useEffect(() => {

        //console.log("health wealth pyar - second change with props"+props.communicationLength)

        if (props.communicationLength == 1) {
            //console.log("health wealth pyar - second query change with props"+props.communicationLength)
            getData();
        }

    }, [props]); // <-- Have to pass in [] here!

    const getData = async function () {

        let response = await apiCall("tradeongoingtranaction/tradeaccount/ongoingnegotiations/companies", 'GET')
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("api called ",response)

        let responseJSON = await response.json()

        //
        // console.log("api called 11",responseJSON)


        // console.log("ppppp"+NegotiationChatActiveId)

        // let responseJSON1 = responseJSON.filter(item => item.id == NegotiationChatActiveId);
        // var first = responseJSON1[0];
        // responseJSON.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });

        setRowInformation(responseJSON);
    }

    // const getAllInventory = async function (){
    //     let allinventoryresponse = await apiCall("trade/findAll",'GET')
    //     console.log(allinventoryresponse)
    //     let allinventoryresponseJSON = await allinventoryresponse.json();
    //     console.log(allinventoryresponseJSON)
    //     setAllinventory(allinventoryresponseJSON)
    // }
    const selecteNegotiationChat = async (ev, rowInformation) => {
        ev.preventDefault()

        let allinventoryresponse = await apiCall("trade/" + rowInformation.tradeId, 'GET')

        let allinventoryresponseJSON = await allinventoryresponse.json();


        // console.log('rowInformation11111111122' , rowInformation.ongoingTransactionStatus+rowInformation.action);

        history.push({
            pathname: "/transactions",
            state: {
                selectedTrade: allinventoryresponseJSON,
                selectedongoingtxn: rowInformation
            }
        })

        setNegotiationChatActiveId(rowInformation.id)
        // console.log('NegotiationChatActiveId', NegotiationChatActiveId);
    }
    // Negotiation Tabs 
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("RowInformation", RowInformation)

    const FavoriteIcon = () => {
        <>
            <h6 className="text-dark bg-info">2</h6></>
    }
    const [showFilter,setShowFilter]= React.useState(false)
    const [showFilterById,setShowFilterById]= React.useState(false)

    const OpenFilter =(event , value) =>{
        setShowFilterById(value)

        {showFilter?setShowFilter(false):setShowFilter(true)}
    }
    const CloseFilter =() =>{
        setShowFilter(false)

    }

    const NegotiationCompanyFilter = () => {
        return (
            <>
            {/* <div class="box2 sb10">I'm speech bubble</div> */}
                <div className="negotiation-company-fillter mt-2">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio className='negotiation-company-radio' checked/>} label="Newest First (Desault)" />
                            <FormControlLabel value="2" control={<Radio className='negotiation-company-radio'/>} label="Price Offered (High-Low)" />
                            <FormControlLabel value="3" control={<Radio className='negotiation-company-radio'/>} label="Price Offered (Low-High)" />
                            <FormControlLabel value="4" control={<Radio className='negotiation-company-radio'/>} label="Shares Bought (High-Low)" />
                            <FormControlLabel value="5" control={<Radio className='negotiation-company-radio'/>} label="Shares Bought (Low-High)" />
                            <FormControlLabel value="6" control={<Radio className='negotiation-company-radio'/>} label="Buy Now (Earliest First)" />
                        </RadioGroup>
                    </FormControl>


                    {/* <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Default radio
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Default checked radio
                    </label>
                </div> */}
                </div>

            </>
        )
    }

     const [showItems , setshowItems]= React.useState(5)

     const NoOfCompany = RowInformation.length;

    const viewMore = () =>{
        if(showItems== 5){
            setshowItems(RowInformation.length)
        }else{
            setshowItems(5)
        }
    }
   

    // console.log("RowInformation.length",RowInformation.length)
    // console.log("No Of Company",NoOfCompany)


    return (
        <div className="mt-3">
            <div>
                <h6 className="text-dark"><b>Negotiation</b></h6>
            </div>
            <div className="search-sec mt-3">
                <div class="form-group has-search nego-shearch-icon">
                    {/* <FontAwesomeIcon className="form-control-feedback" icon={faSearch} /> */}
                    <SearchIcon className="form-control-feedback mx-2" />
                    <input type="text" class="form-control" placeholder="Search" />
                </div>
            </div>
            {/* <p className={showclass ? "text-danger" : ""}>Navigation menu</p> */}
            <div className="Negotiation-listing-main scroll-default">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">

                                <Tab label="Selling" value="1" className='nego-tab-notification-sellingBtn'/>
                                <div className='nego-tab-notification Selling'>
                                    <h6 className='m-0'>1</h6>
                                </div>
                                <Tab label="Buying" value="2" className='nego-tab-notification-buyingBtn'/>
                                <div className='nego-tab-notification Buying'>
                                    <h6 className='m-0'>10</h6>
                                </div>
                                {/* <Tab label="Inprogress" value="3" /> */}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {/* All Lisiting content   */}
                            {RowInformation.map((rowInformation, index) => (
                                <>
                                    <div className='position-relative' key={index} >

                                        <div className="Negotiation-listing  filter-position-relative cursor-pointer row mx-0 pl-0">
                                        

                                            <div className="col-md-8 px-1">
                                                <div className="nego-companylist-image">
                                                    {rowInformation.companyLogo == "" ? null : <img src={(rowInformation.companyLogo == "") ? Nologo : rowInformation.companyLogo} className="img-fluid" />}
                                                </div>
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info nego-companylist-companyname">
                                                        <div className="row m-0 text-default-secoundary d-flex">
                                                            <div className='col-md-6 p-0'>
                                                                <h6 className='companyName'>{rowInformation.companyName}</h6> 
                                                            </div>
                                                            {showCardResult == rowInformation.id ?
                                                                <div className='col-md-6 p-0' onClick={CardData}>
                                                                    <p>(3 Offers) <ArrowDropUpIcon /></p>
                                                                </div> :
                                                                <div className='col-md-6 p-0' onClick={(event) => CardData(event, rowInformation.id)}>
                                                                    <p>(3 Offers) <ArrowDropDownIcon /></p>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 p-0 py-2">
                                                <div className="d-flex align-items-start justify-content-end py-2 nego-company-optionicon filter-position-relative">
                                                   {showFilterById == rowInformation.id ? <OptionsOpenIcon className="company-optionicon" onClick={OpenFilter}/>:
                                                    <OptionsCloseIcon className="company-optionicon"
                                                    onClick={(event) => OpenFilter(event, rowInformation.id)}/>}
                                                </div>
                                                <div className='nego-companylist-companyoffer d-flex        align-items-center justify-content-end py-2'>
                                                    <div><ChatLogo className="mx-1" /></div>
                                                    <h6>1 new offer</h6>
                                                </div>
                                            </div>

                                            
                                        </div>
                                        {showFilterById == rowInformation.id ? <NegotiationCompanyFilter />:null}
                                    </div>
                                    {showCardResult === rowInformation.id ? <>
                                        <div>{console.log("rowInformation" , rowInformation)}

                                            {RowInformation.slice(0,showItems).map((rowInformation, index) => (
                                                <div
                                                    onClick={(e) => selecteNegotiationChat(e, rowInformation)}
                                                    className={NegotiationChatActiveId == rowInformation.id ? 'negotiation-comapny-list-active d-flex align-items-center' : "negotiation-comapny-list"} key={index} >
                                                    {rowInformation.ongoingTransactionStatus == "agreement completed" ? <>
                                                        <div className='nego-border-left'></div>
                                                        <div className="Negotiation-listing cursor-pointer row mx-1 px-2">
                                                            <div className="col-md-2 px-1">
                                                                <div className="Negotiation-logo-image ">
                                                                    <img src={(rowInformation.companyLogo == "") ? Nologo : rowInformation.companyLogo} width={50} height={50} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8 px-1 d-flex align-items-center">
                                                                <div className="Negotiation-list-desc">
                                                                    <div className="Negotiation-list-info">
                                                                        <h6 className="mb-1 text-default-secoundary">
                                                                            {rowInformation.onboardingTradeOwnerId}
                                                                        </h6>
                                                                        <p className="d-flex align-items-center m-0">
                                                                            ₹ 1,440 / share | <WatchLaterOutlinedIcon className="mx-1" />  4d 3h
                                                                        </p>
                                                                        {/* <p>
                                                                            <span>10 min ago</span>
                                                                        </p> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 px-1 d-flex align-items-start justify-content-center">
                                                                <div className='nego-list-info p-1'>
                                                                    <p>
                                                                        2 hrs ago
                                                                    </p>
                                                                    {/* <p>2 hrs ago</p> */}
                                                                </div>
                                                                {/* {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                } */}
                                                            </div>
                                                        </div> </>

                                                        : null}
                                                </div>

                                            )
                                            )}

                                            <div className='d-flex justify-content-center nego-list-viewmore' >
                                                <div onClick={viewMore}>
                                                    {showItems == 5 ? <h6>View {NoOfCompany} More</h6>:
                                                    <h6>View Less</h6>}
                                                </div>
                                            </div>
                                            

                                        </div>
                                    </> : null}
                                </>

                            )
                            )}
                        </TabPanel>
                        <TabPanel value="2">
                            {/* All Lisiting content   */}
                            {RowInformation.map((rowInformation, index) => (
                                <>
                                    <div className='position-relative' key={index} >

                                        <div className="Negotiation-listing  filter-position-relative cursor-pointer row mx-0 pl-0">
                                        

                                            <div className="col-md-8 px-1">
                                                <div className="nego-companylist-image">
                                                    {rowInformation.companyLogo == "" ? null : <img src={(rowInformation.companyLogo == "") ? Nologo : rowInformation.companyLogo} className="img-fluid" />}
                                                </div>
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info nego-companylist-companyname">
                                                        <div className="row m-0 text-default-secoundary d-flex">
                                                            <div className='col-md-6 p-0'>
                                                                <h6 className='companyName'>{rowInformation.companyName}</h6> 
                                                            </div>
                                                            {showCardResult == rowInformation.id ?
                                                                <div className='col-md-6 p-0' onClick={CardData}>
                                                                    <p>(3 Offers) <ArrowDropUpIcon /></p>
                                                                </div> :
                                                                <div className='col-md-6 p-0' onClick={(event) => CardData(event, rowInformation.id)}>
                                                                    <p>(3 Offers) <ArrowDropDownIcon /></p>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 p-0 py-2">
                                                <div className="d-flex align-items-start justify-content-end py-2 nego-company-optionicon filter-position-relative">
                                                   {showFilterById == rowInformation.id ? <OptionsOpenIcon className="company-optionicon" onClick={OpenFilter}/>:
                                                    <OptionsCloseIcon className="company-optionicon"
                                                    onClick={(event) => OpenFilter(event, rowInformation.id)}/>}
                                                </div>
                                                <div className='nego-companylist-companyoffer d-flex        align-items-center justify-content-end py-2'>
                                                    <div><ChatLogo className="mx-1" /></div>
                                                    <h6>1 new offer</h6>
                                                </div>
                                            </div>

                                            
                                        </div>
                                        {showFilterById == rowInformation.id ? <NegotiationCompanyFilter />:null}
                                    </div>
                                    {showCardResult === rowInformation.id ? <>
                                        <div>{console.log("rowInformation" , rowInformation)}

                                            {RowInformation.slice(0,showItems).map((rowInformation, index) => (
                                                <div
                                                    onClick={(e) => selecteNegotiationChat(e, rowInformation)}
                                                    className={NegotiationChatActiveId == rowInformation.id ? 'negotiationchat-active d-flex align-items-center' : null} key={index} >
                                                    {rowInformation.ongoingTransactionStatus == "agreement completed" ? <>
                                                        <div className='nego-border-left'></div>
                                                        <div className="Negotiation-listing cursor-pointer row mx-1 px-2">
                                                            <div className="col-md-2 px-1">
                                                                <div className="Negotiation-logo-image ">
                                                                    <img src={(rowInformation.companyLogo == "") ? Nologo : rowInformation.companyLogo} width={50} height={50} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8 px-1 d-flex align-items-center">
                                                                <div className="Negotiation-list-desc">
                                                                    <div className="Negotiation-list-info">
                                                                        <h6 className="mb-1 text-default-secoundary">
                                                                            <b>{rowInformation.onboardingTradeOwnerId}</b>
                                                                        </h6>
                                                                        <p className="d-flex align-items-center m-0">
                                                                            ₹ 1,440 / share | <WatchLaterOutlinedIcon className="mx-1" />  4d 3h
                                                                        </p>
                                                                        {/* <p>
                                                                            <span>10 min ago</span>
                                                                        </p> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 px-1 d-flex align-items-start justify-content-center">
                                                                <div className='nego-list-info p-1'>
                                                                    <p>
                                                                        2 hrs ago
                                                                    </p>
                                                                    {/* <p>2 hrs ago</p> */}
                                                                </div>
                                                                {/* {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                } */}
                                                            </div>
                                                        </div> </>

                                                        : null}
                                                </div>

                                            )
                                            )}

                                            <div className='d-flex justify-content-center nego-list-viewmore' >
                                                <div onClick={viewMore}>
                                                    {showItems == 5 ? <h6>View {NoOfCompany} More</h6>:
                                                    <h6>View Less</h6>}
                                                </div>
                                            </div>
                                            

                                        </div>
                                    </> : null}
                                </>

                            )
                            )}
                        </TabPanel>
                        {/* <TabPanel value="3">
                            {RowInformation.map((rowInformation, index) => (
                                <div onClick={(e) => selecteNegotiationChat(e, rowInformation)} className={NegotiationChatActiveId == rowInformation.id ? 'negotiationchat-active' : null} key={index} >
                                    {rowInformation.ongoingTransactionStatus == "agreement completed" ?

                                        <div className="Negotiation-listing  cursor-pointer row mx-0 pl-0" >
                                            <div className="col-md-2 px-1">
                                                <div className="Negotiation-logo-image ">
                                                    {rowInformation.companyLogo == "" ? null : <img src={rowInformation.companyLogo} width={50} height={50} />}
                                                </div>
                                            </div>
                                            <div className="col-md-9 px-1">
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info p-2">
                                                        <h6 className="m-0 text-default-secoundary">
                                                            <b>{rowInformation.companyName}</b>
                                                        </h6>
                                                        <p className="d-flex m-0">

                                                            {rowInformation.action == "buy" ?
                                                                "Seller ID - " :
                                                                "Buyer ID - "

                                                            }
                                                            {rowInformation.action == "buy" ?
                                                                rowInformation.onboardingTradeOwnerId :
                                                                rowInformation.onboardingTradeNONOwnerId
                                                            }
                                                        </p>
                                                        <p>
                                                            <span>10 min ago</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-1 px-1 d-flex align-items-center justify-content-center">
                                                {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                }
                                            </div>
                                        </div> : null}
                                </div>

                            )
                            )}
                        </TabPanel> */}
                        
                    </TabContext>
                </Box>



            </div>

        </div>
    )
}