import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './myinventorytableheader';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SunPharma from "./sun_pharma.svg";
import "./inventorytablecontent.css"
import "../../Components/FilterCard/filterCard.css"
import Buttons from "../../Components/Buttons"
import "../Companies/bootstrap4/css/bootstrap.scoped.css"
import PriceRangeSlider from '../Companies/PriceRangeSlider';
import "../Companies/style.scoped.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall } from '../../Utils/Network';
import Journey from '../Journey/Index';
import MobileJourney from '../Journey/MobileIndex';

import DiscoverCompanies from '../Companies/company-trade/TradesFiveGrid'
import News from '../../Pages/Companies/CompanyTabsSteps/Tab5';
import BlankIcon from './blank.svg'
import { ReactComponent as FilterIcon } from './filter.svg';
import PlusIcon from './Plus.svg'
import EmptyIcon from './empty.svg'
import Skeleton from 'react-loading-skeleton';
import Popper from '@material-ui/core/Popper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { apiCall25, apiCall12, apiCall1, downloadurl, setAccessToken } from "../../Utils/Network"
import Loadbutton from '../../Components/Loadbutton/Index';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}
const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        // maxHeight: 1500,
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


// for mobile filter
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


export default function InventoryTableContent(props) {

    let loaderArray = [{},
        {}]
    const [isload, setLoad] = React.useState(false);
    let history = useHistory();
    const classes = useStyles();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('company');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2000);
    const [rowInformation, setRowInformation] = React.useState(loaderArray)

    ///// for pagination
    const [Showpagination,setShowpagination]=useState(false)
    const [PaginationButtontext,setPaginationButtontext]=useState("Show pagination")

    // filter popper
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [open, setOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'filter-popper' : undefined;
    const [panelShow1, setPanelShow1] = React.useState(false)
    const [panelShow2, setPanelShow2] = React.useState(false)
    const [panelShow3, setPanelShow3] = React.useState(false)
    const [SectorList, setSectorList] = React.useState([])
    const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])

    const [postPerpage, setpostPerpage] = React.useState(8)
    const [companies, setcompanies] = React.useState([])
    const [filterCompanies, setfilterCompanies] = React.useState([])
    const [filtercompanyLenght, setfiltercompanyLenght] = React.useState(0)
    const [companyLenght, setcompanyLenght] = React.useState(0)
    const [isLoading, setisLoading] = React.useState(true)
    const [currentPage, setcurrentPage] = React.useState(1)
    const [maxprice, setmaxprice] = React.useState(0)
    const [minprice, setminprice] = React.useState(0)
    const [maxpricerange, setmaxpricerange] = React.useState(0)
    const [minpricerange, setminpricerange] = React.useState(0)
    const [sectorOptions, setsectorOptions] = React.useState([])
    const [fundingOptions, setfundingOptions] = React.useState([])
    const [searchTxt, setsearchTxt] = React.useState('')
    const [modalStyle] = React.useState(getModalStyle);
    const [openfilter, setOpenfilter] = React.useState(false);
    const [completegetreadysteps,setCompletegetreadysteps]=useState(false)
    const [openmodal, setOpenmodal] = React.useState(false);
    const [globalhelp, setglobalhelp] = React.useState([])
    const [globalnews, setglobalnews] = React.useState([])
    const [TradeId, setTradeId] = React.useState([])

    const [hasmore, sethasmore] = React.useState(true)
    const [num, setnum] = React.useState(0)

    const [name, setname] = React.useState('')

    //Filter
    const [assetTypeList, setassetTypeList] = React.useState([{ "value": "vested-share", "selet": false},
        { "value": "esop-share", "selet": false}])
    const [assetTypeoptions, setassetTypeoptions] = React.useState([])
    const [assetTypeoptionsall, setassetTypeoptionsall] = React.useState(["vested-share","esop-share"])
    // filter popper For Desktop

    //Search
    let searchkey = 'nothing'

    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');

    }

    const [loadingbutton, setLoadingbutton] = React.useState(false);
    const [selectbutton, setSelectbutton] = React.useState("");


    const [searchOptions, setsearchOptions] = useState([])


    const getSearchOption = async function (){
        let response1 = await apiCall("company/allcompaniesnames",'GET', '', history)
        if(response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)

        setsearchOptions(responseJSON1.map(ssa=>ssa.name))
    }

    const PaginationShow =()=>{
        if(Showpagination==true){
            setShowpagination(false)
            setPaginationButtontext("Hide pagination")
        }
        else if(Showpagination==false){
            setShowpagination(true)
            setPaginationButtontext("Show pagination")
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleFilter = (event) => {
        setAnchorEl(event.currentTarget);

        // setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleFilterClose = (event) => {

        if (anchorEl) {
            // alert();
            setAnchorEl(null);
        }
    };

    /////////////// popper end /////////////////

    // table Loader
    // React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoad(true);
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // }, []);

    React.useEffect(() => {
        getSearchOption()
        getAllInventory()
        getGlobalHelp()
        // getGlobalNews()
        getuserinfo()

    }, []);

    const fetchMoreData = () => {
        getAllInventory()
    };

    const reqbody = {
        "a": assetTypeoptions
    }

    const managefilters = function() {
        if(assetTypeoptions.length == 0) {
            reqbody.a = assetTypeoptionsall
        } else {
            reqbody.a = assetTypeoptions
        }

        if(searchkey =="") {
            searchkey ="nothing"
        }
    }
    const getuserinfo = async function () {
        // console.log("aaaaaassspp"+searchkey)
        // managefilters()

        let response = await apiCall("useronboarding/accountonboarding/", 'GET', '', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response)
        let responseJSON = await response.json();
        //console.log(responseJSON)
        setname(responseJSON.name)
    }

    const getAllInventory = async function () {
        // setLoad(false);

        //console.log("aaaaaassspp"+searchkey)
        managefilters()


        let response = await apiCall("trade/findAll1/"+searchkey+"/"+num, 'POST', reqbody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response)
        let responseJSON = await response.json();
        //console.log(responseJSON)

        if(num == 0) {
            setRowInformation(responseJSON)
        } else {
            responseJSON.map(record => rowInformation.push(record))
            setRowInformation([...rowInformation])
        }
        setnum(num+1)
        if(responseJSON.length % 20 != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }


        setLoad(true);
    }

    const getGlobalHelp = async function (){
        let response1 = await apiCall("globalHelps",'GET', '', history)
        if(response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1._embedded.globalHelps)
        setglobalhelp(responseJSON1._embedded.globalHelps)
    }

    const getGlobalNews = async function (){
        let response1 = await apiCall("globalNews",'GET', '', history)
        if(response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1._embedded.globalNews)
        setglobalnews(responseJSON1._embedded.globalNews)
    }

    let showPanel1 = () => {
        setPanelShow1(!panelShow1)
    }

    let showPanel2 = () => {
        setPanelShow2(!panelShow2)
    }

    let showPanel3 = () => {
        setPanelShow3(!panelShow3)
    }

    let assetTypeChange = (e) => {

        let index
        if (e.target.checked) {
            assetTypeoptions.push(e.target.value)
        } else {
            index = assetTypeoptions.indexOf(e.target.value)
            assetTypeoptions.splice(index, 1)
        }

        //console.log("ppppp1"+assetTypeoptions.length)
        //console.log("ppppp"+assetTypeoptions)
        //getData()

        //setassetTypeoptions(assetTypeoptions)
    }

    let applyFilter1 = (e) => {

        getAllInventory()
        if (anchorEl) {
            // alert();
            setAnchorEl(null);
        }
    }

    let FilterInner = () => {

        return (
            <>
                <div className="bg-white p-2 rounded custom-filter border-0 " >
                    <div className="filter-top-action border-bottom py-2 pb-2 d-flex align-items-center justify-content-between">
                        <div className="cursor-pointer w-100 dbmn" >
                            <CloseIcon className="dbmn" onClick={handleFilterClose} />
                        </div>
                        <div className="w-100">
                            <h6 className="text-default"><b>Filter</b></h6>
                        </div>
                        <div className="cursor-pointer w-100">
                            <h6 className="text-right text-small">Clear All</h6>
                        </div>
                    </div>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ControlPointIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="border-0">Asset Type</Typography>
                        </AccordionSummary>
                        <div className="px-1 accordion-details">
                            {assetTypeList && assetTypeList.map((item, index) => {

                                return <div className="filter-checkbox" key={index}>
                                    <input key={index} class="styled-checkbox-primary" type="checkbox" name="sector_value styled-checkbox-primary" id={item.value} checked={item.selet} value={item.value}
                                           onChange={(e) => {
                                               //console.log("123232323232323232" + e.target.checked)
                                               if(e.target.checked == true) {
                                                   assetTypeList[assetTypeList.indexOf(item)].selet = true

                                                   //document.getElementById(item.value).checked = true;
                                               } else {
                                                   assetTypeList[assetTypeList.indexOf(item)].selet = false
                                                   //document.getElementById(item.value).checked = false;
                                               }

                                               // var element = document.getElementById(item.value);
                                               //
                                               // if (element.getAttribute("checked") == null) {
                                               //     element.setAttribute("checked", "checked");
                                               //
                                               // } else {
                                               //     element.removeAttribute("checked");
                                               //
                                               // }


                                               setassetTypeList([...assetTypeList])

                                               assetTypeChange(e)
                                           }}/>

                                    <label className="text-small" for={item.value}>{item.value}</label>
                                </div>;
                            })}
                        </div>
                    </Accordion>

                    <div className="filter-action-bottom m-2">
                        <Buttons.PrimaryButton value="Apply"  style={{ width: "100%" }}
                                               onClick={applyFilter1}/>
                    </div>

                </div>
            </>
        )
    }


    // mobile Filter
    // getModalStyle is not a pure function, we roll the style only on the first render

    const handleMobileFilterOpen = () => {
        setOpenfilter(true);
    };

    const handleMobileFilterClose = () => {
        setOpenfilter(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {/*<FilterInner />*/}
        </div>
    );

    const showModal=()=>{
        setOpenmodal(true)
    }

    // const handleChange = e => {
    //     //setValue(e.target.value);
    // };

    // const handleSubmit = e => {

    //     setLoadingbutton(true);

    //     e.preventDefault();
    //     // alert("you have searched for - ");
    //     // or you can send data to backend
    // };

    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        //console.log("aaaaaasss"+e.keyCode+e.code)
        if (e.code === "Enter") {


            searchkey = e.target.value
            //handleSubmit();
            if(searchkey=="") {
                searchkey = "nothing"
            }
            //console.log("aaaaaasss11"+searchkey)
            getAllInventory()
        }
    };

    const getTradeId = value => event => {
        //console.log("mayur", value);
        alert(value);
    };




    return (
        <div className="marketplace-section" >
            {/* <div>hello <Myclasscomoponent/></div> */}

            <div className="mb-3">
                <div className="row">
                    <div className="col-md-9 col-12">
                        <div className="jorney-for-mobile dnmb">

                            <MobileJourney />
                        </div>
                        <div className="my-card pl-0 dbmn" onClick={handleFilterClose}>


                            <Journey />
                        </div>
                    </div>
                    <div className="col-md-3 col-12 dbmn need-help-col" onClick={handleFilterClose}>
                        <div className="my-card need-help-card">
                            <div>
                                <h6><b>Need help?</b></h6>

                                {globalhelp.map((help,index) => (
                                        <div>
                                            <a href={help.associatedLink} target="_blank">
                                                <p className="mb-1 text-normal">{help.title}</p>
                                            </a>
                                        </div>
                                    )

                                )}

                                {/*<a href='//www.moneycontrol.com' target="_blank">*/}
                                {/*    <p className="mb-1 text-normal">How to sell unlisted shares?</p>*/}
                                {/*</a>*/}
                                {/*<a href='//www.moneycontrol.com' target="_blank">*/}
                                {/*    <p className="mb-1 text-normal">How to check the credit of shares?</p>*/}
                                {/*</a>*/}
                                {/*<a href='//www.moneycontrol.com' target="_blank">*/}
                                {/*    <p className="mb-1 text-normal">How to buy unlisted shares?</p>*/}
                                {/*</a>*/}

                                {/*<a href='//www.moneycontrol.com' target="_blank">*/}
                                {/*    <p className="mb-1 text-normal">How to sell unlisted shares?</p>*/}
                                {/*</a>*/}

                                {/*<div className="d-flex justify-content-end mt-4">*/}
                                {/*    <Buttons.PrimaryButton value="View Demo" />*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-holdings-page row" >
                <React.Fragment>
                    <div className="col-md-12 col-12">
                        <div className="table-container">
                            <div className="Table_title">
                                <div className="d-flex align-items-center justify-content-start w-100" onClick={handleFilterClose}>
                                    <h6 style={{ marginTop: "10px" }}><strong className="text-dark"> Listings currently available</strong></h6>
                                    <div class="form-group has-search mb-0 ml-3 small-icon">
                                        {/*autoHighlight*/}
                                        <div className='inventory-search-icon form-control-feedback'>
                                            <SearchIcon /> 
                                        </div>
                                        <Autocomplete
                                            style={{ width: 500}}
                                            freeSolo                                           

                                            options={searchOptions}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                           // onChange={(event, value) => searchkey = event.target.value}
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
                                        {/*<FontAwesomeIcon className="form-control-feedback" icon={faSearch} />*/}
                                        {/*<input type="text" class="form-control" placeholder="Search Companies"*/}
                                        {/*    // onChange={handleChange}*/}
                                        {/*       onKeyPress={handleKeypress}/>*/}


                                        {/*<div style={{ marginLeft: '40%', marginTop: '60px' }}>*/}
                                        {/*    <h3>Search Company Name</h3>*/}

                                        {/*    <Autocomplete*/}
                                        {/*        style={{ width: 500 }}*/}
                                        {/*        freeSolo*/}

                                        {/*        autoComplete*/}
                                        {/*        autoHighlight*/}
                                        {/*        options={myOptions}*/}
                                        {/*        renderInput={(params) => (*/}
                                        {/*            <TextField {...params}*/}
                                        {/*                       onChange={getDataFromAPI}*/}
                                        {/*                       // variant="outlined"*/}
                                        {/*                       label="Search Company Name"*/}
                                        {/*            />*/}
                                        {/*        )}*/}
                                        {/*    />*/}
                                        {/*</div>*/}

                                    </div>
                                </div>
                                <div className="MarketplaceTable-actions dbmn ">

                                    <div className="d-flex">
                                        {/*  <Tooltip title="Filter List" arrow placement="top-start">*/}
                                        {/*/!* ================== working... ================ *!/*/}

                                        {/*      <Button className="btn btn-secoundary-default mx-2" onClick={handleFilter} >*/}
                                        {/*         <FilterIcon width="20" height="20" className="mr-2" />*/}
                                        {/*          Filter*/}
                                        {/*      </Button>*/}

                                        {/*  </Tooltip>*/}
                                        {/*  <Tooltip title="Add Holding" arrow placement="top-start">*/}
                                        {/*      <Button className="btn btn-secoundary-default mx-2" onClick={() => { history.push("/holdings") }} >*/}
                                        {/*          Add Holding*/}
                                        {/*      </Button>*/}
                                        {/*  </Tooltip>*/}
                                    </div>
                                </div>
                                <div className="dnmb">
                                    <div className="MarketplaceTable-actions">
                                        {/*<Button className="btn btn-secoundary-default mx-3" onClick={handleMobileFilterOpen} >*/}
                                        {/*    /!* <img src={FilterIcon} style={{ width: "20px", height: "20px", cursor: "pointer" }} aria-describedby={id} type="button" className="mr-2" /> *!/*/}
                                        {/*    <FilterIcon width="15" height="16" className="mr-2" />*/}
                                        {/*    Filter*/}
                                        {/*</Button>*/}
                                        <Button className="btn btn-secoundary-default mx-3" onClick={() => { history.push("/holdings") }} >
                                            <AddIcon /> Holding
                                        </Button>
                                    </div>
                                    {/*<Modal open={openfilter}*/}
                                    {/*    onClose={handleMobileFilterClose}*/}
                                    {/*    aria-labelledby="simple-modal-title"*/}
                                    {/*    aria-describedby="simple-modal-description"*/}
                                    {/*>*/}
                                    {/*    {body}*/}
                                    {/*</Modal>*/}
                                </div>
                                {/*<Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: "999" }} >*/}
                                {/*    <FilterInner />*/}
                                {/*</Popper>*/}
                            </div>
                            <div className="mt-3 mb-3 myholding-right-sec marketplace-table" onClick={handleFilterClose}>
                                <TableContainer className={classes.container} >
                                    <Table stickyHeader style={{ backgroundColor: "white" }}>
                                        <InfiniteScroll
                                            dataLength={rowInformation.length}
                                            next={fetchMoreData}
                                            hasMore={hasmore}
                                            loader={<>
                                            <Box className="d-flex justify-content-center align-items-center">
                                                <CircularProgress />
                                            </Box></>}
                                            endMessage={
                                                <p className="text-center py-4">
                                                    <b>Yay! You have seen it all</b>
                                                </p>
                                            }
                                        >
                                            <TableHeader  valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                                            <TableRow className="custom_table_row ">
                                                <TableCell >
                                                    <div className="d-flex align-items-center">
                                                        <div className="blank_add">
                                                            <img src={BlankIcon} alt="img" />
                                                            <div className="blank_plus">
                                                                <img src={PlusIcon} onClick={() => { history.push("/holdings") }} alt="img" />
                                                            </div>
                                                        </div>
                                                        <b className="ml-2 text-dark text-small">Your Stocks / ESOP’s  </b>
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <img src={EmptyIcon} width='40' />
                                                </TableCell>
                                                <TableCell >
                                                    <img src={EmptyIcon} width='40' />
                                                </TableCell>
                                                <TableCell >
                                                    <img src={EmptyIcon} width='40' />
                                                </TableCell>
                                                <TableCell >
                                                    <img src={EmptyIcon} width='40' />
                                                </TableCell>
                                                <TableCell >
                                                    {name}
                                                </TableCell>

                                                <TableCell className="text-small">
                                                    <Link to="/holdings" className="add-stock-action">
                                                        <div className="d-flex">
                                                            <img src={PlusIcon} onClick={() => { history.push("/holdings") }} alt="img" /><span style={{ color: "#721c65" }}> List your stocks  in marketplace</span>
                                                        </div>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>

                                            {sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trade, index) => (
                                                <TableRow key={index}>


                                                    <TableCell className="table-link">
                                                    {/* <Link to="/companies" to={{pathname: `/company/${trade.slug}`}} > */}
                                                    <Link to="/companies"  >
                                                        <div className="company_cell1 d-flex align-items-center">                                                        
                                                            <div className="company-logo-img ">
                                                                {isload ?
                                                                    <img src={trade.companyLogo} width={50} className="product-company-logo" />
                                                                    :
                                                                    <Skeleton circle={true} height={50} width={50} />
                                                                }

                                                            </div>
                                                            <div className="company_details1 ml-2">
                                                                <h6 className="company_name m-0 text-default-secoundary">
                                                                    {isload ? <> <b>{trade.companyName}</b> </> : <Skeleton width={100} />}
                                                                </h6>
                                                                <p className="Share_type m-0 text-small">
                                                                    {isload ? <>{trade.commodityName}</> : <Skeleton width={100} height="2" />}
                                                                </p>
                                                                <p className="myHoldings_id m-0 text-small">
                                                                    {isload ? <>LIST{trade.id}</> : <Skeleton width={100} height="2" />}
                                                                </p>
                                                            </div>                                                            
                                                        </div>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        {isload ? <>{trade.qty}</> : <Skeleton width={100} height="2" />}
                                                    </TableCell>
                                                    <TableCell>
                                                        {isload ? <>{trade.price}</> : <Skeleton width={100} height="2" />}
                                                    </TableCell>
                                                    <TableCell>
                                                        {isload ? <>{trade.minBidPriceAccepted}</> : <Skeleton width={100} height="2" />}
                                                    </TableCell>
                                                    {/*<TableCell>*/}
                                                    {/*    {isload ? <>{trade.isNegotiable ? "Yes" : "No"} {console.log('aaaa' + trade.isNegotiable)}</> : <Skeleton width={100} height="2" />}*/}
                                                    {/*</TableCell>*/}
                                                    <TableCell>
                                                        {isload ? <>{trade.updateDate}</> : <Skeleton width={100} height="2" />}
                                                    </TableCell>

                                                    <TableCell>
                                                        {isload ? <>{trade.onboardingAccountId}</> : <Skeleton width={100} height="2" />}
                                                    </TableCell>
                                                    <TableCell className="text-right pr-3">
                                                        {isload ?
                                                            <>
                                                                {trade.isTradeOwner === false ?
                                                                    <>
                                                                        <h5 className="action-negotiate" onClick={async () => {
                                                                            await setSelectbutton(trade.id)
                                                                            setLoadingbutton(true)


                                                                            let response = await apiCall("tradeongoingtranaction/tradeaccount/" + trade.id, 'GET', '', history)
                                                                            if(response.status == undefined) {
                                                                                // errorToast("Invalid", "Invalid User ID or password");
                                                                                return
                                                                            }
                                                                            let responseJSON = await response.json();
                                                                            //console.log("hihihihihihko11" + responseJSON)
                                                                            //console.log(response.status + "juju")
                                                                            if (response.status != 200) {
                                                                                //console.log("hihihihihihko")
                                                                                const reqBody = {
                                                                                    "communicationStatus": "donotcreatecoomunicationrecord",
                                                                                    "message": "it's a dummy comment",
                                                                                    "offeredPrice": trade.minBidPriceAccepted,
                                                                                    "offeredQuantity": trade.qty,
                                                                                    "tradeId": trade.id
                                                                                }
                                                                                const response1 = await apiCall("tradecommunication/", 'POST', reqBody, history)
                                                                                if(response1.status == undefined) {
                                                                                    // errorToast("Invalid", "Invalid User ID or password");
                                                                                    return
                                                                                }
                                                                                const responseJSON1 = await response1.json();

                                                                                const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/" + responseJSON1.tradeOnGoingTransactionId, 'GET', '', history)
                                                                                if(response12.status == undefined) {
                                                                                    // errorToast("Invalid", "Invalid User ID or password");
                                                                                    return
                                                                                }
                                                                                const responseJSON12 = await response12.json();

                                                                                //console.log("hihihihihihko113" + responseJSON.tradeId)
                                                                                responseJSON = responseJSON12;
                                                                                //console.log("hihihihihihko14" + responseJSON.tradeId)
                                                                            }

                                                                            //console.log("hihihihihihko15" + responseJSON.tradeId)
                                                                            //console.log("hihihihihihko15" + responseJSON.companyLogo)
                                                                            history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
                                                                        }}>

                                                                            {
                                                                                //console.log("sppp"+selectbutton)
                                                                            }
                                                                            {
                                                                                loadingbutton && selectbutton === trade.id ? <Loadbutton />  : <span >Negotiate</span>

                                                                            }




                                                                        </h5>


                                                                    </>
                                                                    :
                                                                    <p className="ur-owner">You are the Owner</p>}

                                                            </> : <Skeleton width={100} height="2" />}
                                                    </TableCell>
                                                </TableRow>)) }
                                        </InfiniteScroll>


                                    </Table>
                                </TableContainer>
                            </div>

                            {/* ======= getreadysteps modal ========= */}
                            {/* <Buttons.PrimaryButton value="Confirm" 
                            onClick={showModal}/> */}
                            <Dialog className="delete-dialog"
                                    open={openmodal}
                                    onClose={() => { setOpenmodal(false) }}
                            >
                                <div className="holding-delete-model">
                                    {completegetreadysteps ? <p style={{paddingLeft:"120px"}}> Loading...</p> :
                                        <>
                                            <div className="p-5 text-center">
                                                <PermIdentityIcon style={{height:"60px", width:"60px",color:"#731b67"}}/>
                                                <div className="d-flex justify-content-center">
                                                    <h6 className="px-5 py-3  w-75"><b>Complete trade ready steps to start negotiation </b></h6>
                                                </div>
                                                <p className="text-small mb-0 pb-4">To start bidding on share listing, you need to complete your trade ready steps, it will take upto 5 minutes</p>
                                                <div className="d-flex justify-content-center">
                                                    <Buttons.SecondaryButton value="Cancel" style={{ width: "45%",marginRight:"20px"   }} />
                                                    <Buttons.PrimaryButton value="Get Trade Ready" style={{ width: "45%",   }} />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </Dialog>

                            {/* =============== pagination =========== */}
                            {/* <div className="d-flex align-items-center justify-content-between pb-3">
                                <Buttons.SecondaryButton value={PaginationButtontext} id="add-holdings-button" onClick={PaginationShow} />
                                <div>
                                {
                                    Showpagination?null:

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    component="div"
                                    count={rowInformation.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                }
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/*<div className="col-md-12 col-12 dbmn">*/}
                    {/*    <div className="discover-componies-sec p-3 mb-3">*/}
                    {/*        <DiscoverCompanies />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="dnmb MobileCompanies w-100">*/}
                    {/*    <DiscoverCompanies />*/}
                    {/*</div>*/}
                    {/* <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <div className="Marketplace-news-sec p-3 mb-3 mt-3 ">
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <h6 className="text-default-secoundary"><b>News Update</b></h6>
                                        <Buttons.SecondaryButton value="View All" id="add-holdings-button" style={{height: "34px",background: "transparent",border: "1px solid #721B65"}} />
                                    </div>
                                    <News globalnews={globalnews} />
                                    999 a dummy company which represents global recent news and not
                                    for any particular company
                                </div>
                            </div>
                        </div>
                    </div> */}
                </React.Fragment>
            </div>
        </div>
    )
}