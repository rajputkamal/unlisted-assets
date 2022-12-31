import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHeader from './myinventorytableheader';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./inventorytablecontent.css"
import "../../Components/FilterCard/filterCard.css"
import Buttons from "../../Components/Buttons"
import "../Companies/bootstrap4/css/bootstrap.scoped.css"
import "../Companies/style.scoped.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall } from '../../Utils/Network';
import Journey from '../Journey/Index';
import MobileJourney from '../Journey/MobileIndex';

import BlankIcon from './blank.svg'
import PlusIcon from './Plus.svg'
import EmptyIcon from './empty.svg'
import Skeleton from 'react-loading-skeleton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Loadbutton from '../../Components/Loadbutton/Index';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

  // marketplace new design start here
  import Nologo from "./nologo.jpeg";
  import Infologo from "./infologo.svg";
  import BookmarkIcon from '@mui/icons-material/Bookmark';
  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as SortIcon } from './sort-icon.svg';
import Popper from '@material-ui/core/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



  // marketplace new design end here



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

    // marketplace new design start here
    const [allcompanies, setallcompanies]= useState([]);
    const [showData,setshowData]=useState(false);
    const [showCardResult, setshowCardResult]= useState();

    const CardData = (event, value) =>{
        // console.log('value', value);

        setshowCardResult(value);
       {showData?setshowData(false):setshowData(true)} 
    }

    // marketplace new design end here



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
    
    const [modalStyle] = React.useState(getModalStyle);
    const [openfilter, setOpenfilter] = React.useState(false);
    const [completegetreadysteps,setCompletegetreadysteps]=useState(false)
    const [openmodal, setOpenmodal] = React.useState(false);
    const [globalhelp, setglobalhelp] = React.useState([])
    const [globalnews, setglobalnews] = React.useState([])

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
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

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
        // // console.log("aaaaaassspp"+searchkey)
        // managefilters()

        let response = await apiCall("useronboarding/accountonboarding/", 'GET', '', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(response)
        let responseJSON = await response.json();
        // console.log(responseJSON)
        setname(responseJSON.name)
    }

    const getAllInventory = async function () {
        // setLoad(false);

        // console.log("aaaaaassspp"+searchkey)
        managefilters()


        let response = await apiCall("trade/findAll1/"+searchkey+"/"+num, 'POST', reqbody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(response)
        let responseJSON = await response.json();
        // console.log(responseJSON)

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
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1._embedded.globalHelps)
        setglobalhelp(responseJSON1._embedded.globalHelps)
    }

    const getGlobalNews = async function (){
        let response1 = await apiCall("globalNews",'GET', '', history)
        if(response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1._embedded.globalNews)
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

        // console.log("ppppp1"+assetTypeoptions.length)
        // console.log("ppppp"+assetTypeoptions)
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


    const handleKeypress = e => {
        
        if (e.code === "Enter") {


            searchkey = e.target.value
            //handleSubmit();
            if(searchkey=="") {
                searchkey = "nothing"
            }
            // console.log("aaaaaasss11"+searchkey)
            getAllInventory()
        }
    };

    const getTradeId = value => event => {
        // console.log("mayur", value);
        alert(value);
    };

    // filter 
  const [postPerpage, setpostPerpage] = React.useState(1000)
  const [totalPosts, settotalPosts] = React.useState(0)



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
                        {/* {rowInformation.map((trade, index) => ( */}

                        {sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trade, index) => (
                        
                        <div className="accordion-details coql-6 " key={index}>
                          <div class="boxes filter-options-main ">
                            <input className='filter-options' type="checkbox" id={trade.id}/>
                            <label for={trade.id} >{trade.companyName}</label>
                          </div>
                                             
                        </div> ))
                        
                        }
                        </div>
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




    return (
        <div className="marketplace-section " >
            {/* <div>Section : 1 </div> */}

            <div className="mb-3 dbmn">
                <div className="row">
                    <div className="col-md-12 col-12">
                        <div className="jorney-for-mobile dnmb">

                            {/* <MobileJourney /> */}
                        </div>
                        <div className="jorney-main-div my-card pl-0 dbmn" onClick={handleFilterClose}>


                            {/* <Journey /> */}
                        </div>
                    </div>
                    {/* <div className="col-md-3 col-12 dbmn need-help-col" onClick={handleFilterClose}>
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
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="my-holdings-page row">
            {/* <div>Section : 2 </div> */}

                <React.Fragment>
                    <div className="col-md-12 col-12">
                        <div className="table-container">                                    
                            <div className="Table_title ">
                                <div className="d-flex align-items-center justify-content-between w-100" >
                                <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: "999" }} >
                                    <FilterInner />
                                </Popper>
                                    <div className="search-area dbmn">
                                        <div className='row'>
                                            <div className='col-md-8 col-12'>
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
                                                    </div>                     
                                                </form>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <div className='d-flex'>                                         
                                                    
                                                    <Button className="btn btn-secoundary-default mx-2 company-filter-btns" >
                                                        <SortIcon width="15" height="16" className="mr-2" />
                                                        Sort
                                                    </Button>
                                                    <Button className="btn btn-secoundary-default mx-2 company-filter-btns"  onClick={handleFilter} >
                                                        <FilterIcon width="15" height="16" className="mr-2" />
                                                        Filter
                                                    </Button>                      

                                                </div>
                                            </div>
                                        </div>              
                                    </div>

                                    



                                    {/* <div className="form-group has-search mb-0 small-icon">
                                        <div className='inventory-search-icon form-control-feedback'>
                                            <SearchIcon /> 
                                        </div>
                                        <Autocomplete
                                            style={{ width: 900}}
                                            freeSolo                                           

                                            options={searchOptions}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                           onSelect={(event, value) => {

                                                               searchkey = event.target.value
                                                               getAllInventory()
                                                           }}
                                                           className="inventory-search-bar"
                                                           placeholder="Search Company Name"
                                                           onKeyDown={(event, value) => handleKeypress(event)}
                                                        variant="outlined"
                                                        

                                                />
                                            )}
                                        />
                                        

                                    </div>
                                    <div className="marketplace-searchbutton">
                                        <Buttons.SecondaryButton value="Search" />

                                    </div> */}


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
                                        {/* <Button className="btn btn-secoundary-default mx-3" onClick={() => { history.push("/holdings") }} >
                                            <AddIcon /> Holding
                                        </Button> */}
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

                                    {/* For Mobile View  */}
                                    <div className="dnmb">
                                        <div className="search-area px-2 mt-0 d-flex align-items-center justify-content-between">
                                            <div className='row'>
                                                <div className='col-7 pr-1 pl-1'>
                                                    <div class="form-group has-search mb-0 small-icon w-100 ">
                                                        <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                                        <input type="text" class="form-control" placeholder="Search Companies with name, CIN, ISIN..."
                                                            onKeyPress={handleKeypress}/>
                                                    </div>                                            
                                                </div>
                                                <div className=' col-5 d-flex pr-2'>
                                                    <Button className="btn btn-secoundary-default company-filter-mobile "  >
                                                        <SortIcon width="15" height="16" />                                                
                                                    </Button>
                                                    <Button className="btn btn-secoundary-default company-filter-mobile "  onClick={handleFilter} >
                                                        <FilterIcon width="15" height="16" />                                                
                                                    </Button>
                                                </div>                                            
                                            </div>
                                        </div>                                        
                                    </div>
                            
                            {/* <div className='marketplace-nolistingfound-section text-center'>
                                <h4>No listings found.***</h4>
                                <p><AddAlertOutlinedIcon/>Get notified when the next listing for <b>HDFC Bank</b> Is live?</p>
                                <div className="marketplace-TurnOnAlerts">
                                    <Buttons.PrimaryButton value="Turn On Alerts" />
                                </div>
                            </div>

                            <div className='marketplace-NoCompanyfound-section text-center'>
                                <h4>“MuscleBlaze” Not Found</h4>
                                <p>Would you like to add <b>“MuscleBlaze”</b> on Unlisted Assets? </p>
                                <div className="marketplace-TurnOnAlerts">
                                    <Buttons.PrimaryButton value="Add MuscleBlaze" />
                                </div>
                            </div>
                            <div className="tradeready-horizontalrow"></div> */}


                            <div className='marketplace-Chip-main my-3'>
                                <div className='row marketplace-Chips m-0'>
                                    <Chip className='px-2 mr-2 mb-1' label="Active"  variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="Expired" variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="Retail" variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="Power & infra" variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="BSFI" variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="Consumer Durable" variant="outlined" />
                                    <Chip className='px-2 mr-2 mb-1' label="Media" variant="outlined" />
                                </div> 
                            </div >

                            <h3 className='marketplace-card-heading mb-0'>Hot Listings</h3>

                            <div className=" mb-3 myholding-right-sec marketplace-table" onClick={handleFilterClose}>
                                <div className="allcompanies-section-main">
                                    <div className="row">
                                    {/* {allcompanies.map((trade, index) => ( */}
                                        {sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trade, index) => ( <>
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-2 px-2 mt-2" key={index}>

                                            <div className="marketplace-company-col-main">
                                                <div className="marketplace-company-col-top">
                                                    <div className="marketplace-company-top-thumb">
                                                        <div className="row">
                                                            <div className="col-md-10 col-10 py-3 ">
                                                                <div className="marketplace-Company-thumbnail">

                                                                {trade.id == undefined ? <Skeleton circle={true} height={50} width={50} /> 
                                                                : <img src={(trade.companyLogo == undefined) || (trade.companyLogo == '') ? Nologo : trade.companyLogo} alt=" No Company Logo"/>
                                                                }                                                            
                                                                </div>
                                                                
                                                            </div>
                                                            <div className="col-md-2 col-2">
                                                                <InfoOutlinedIcon className="marketplace-infoicon"/>                                                            
                                                            </div>
                                                        </div>                                    
                                                    </div>                                                    
                                                </div>
                                                
                                                {/* { showCardResult == trade.id ? showData && <div className="company-col-bottom ">
                                                    <div className="marketplace-tags">
                                                        <Stack direction="row" spacing={1}>
                                                            {trade.id == undefined ? <Skeleton width={100} height="1" /> : <h4> {trade.companyName}</h4> }  
                                                            
                                                            {trade.id == undefined ? <Skeleton width={100} height="1" /> : <Chip icon={<WorkOutlineIcon />} label="Soonicon" variant="outlined" />   }                                                            
                                                        </Stack>
                                                    </div>
                                                    
                                                    <div className="company-actions">                                  
                                                        {trade.id == undefined ? <Skeleton width={100} height={30} /> : <Link className="btn btn-explore w-50"  to={{pathname: `/company/${trade.slug}`}}> Explore</Link>   } 
                                                    
                                                        {trade.id == undefined ? <Skeleton width={100} height={30} /> : <button className="btn btn-secoundary-default w-50" type="button" onClick={(event) => showModal(event, trade.name, trade.id)} > Buy / Sell </button>  } 
                                                        
                                                    </div>
                                                </div> :
                                                    <> */}
                                                <div className="marketplace-tags mb-1">
                                                    <Stack direction="row" spacing={1} className="d-flex justify-content-between align-items-center">
                                                        {trade.id == undefined ? <Skeleton width={100} height="1" /> : <h4 className='mb-0'>{trade.companyName}</h4>  }

                                                        {trade.id == undefined ? <Skeleton width={100} height="1" /> : <Chip icon={<HourglassBottomOutlinedIcon />} label="Soonicon" variant="outlined" />   }
                                                    </Stack>
                                                </div>
                                                <div className="marketplace-horizontalrow"></div> 

                                                <div className='row'>
                                                        <div className="company-top-details d-flex justify-content-between col-md-12 col-10">
                                                            {/* {trade.id == undefined ? <><Skeleton height={20} /> <br/></>: <h4> {trade.companyName}</h4>   }    */}

                                                            {trade.id == undefined ? <Skeleton height={15} className="mt-2"/> : <p>Quantity: <span>150</span></p>   }   
                                                            {trade.id == undefined ? <Skeleton height={15} className="mt-2"/> : <p>Expiry: <span>8 hrs</span></p>   }                      
                                                            
                                                        </div>           
                                                    </div>
                                                <div className="marketplace-actions">                               

                                                    {trade.id == undefined ? <Skeleton width={100} height={30} /> :
                                                    
                                                    <>
                                                    <button className="btn btn-secoundary-default w-100" type="button"
                                                    

                                                                         onClick={async () => {
                                                                            await setSelectbutton(trade.id)
                                                                            setLoadingbutton(true)


                                                                            let response = await apiCall("tradeongoingtranaction/tradeaccount/" + trade.id, 'GET', '', history)
                                                                             if(response.status == undefined) {
                                                                                 // errorToast("Invalid", "Invalid User ID or password");
                                                                                 return
                                                                             }
                                                                            let responseJSON = await response.json();
                                                                            // console.log("hihihihihihko11" + responseJSON)
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
                                                                            Negotiate from ₹250 <p className='share mb-0'> / share</p>

                                                                            {/* {
                                                                                console.log("sppp"+selectbutton)
                                                                            }
                                                                            {
                                                                                loadingbutton && selectbutton === trade.id ? <Loadbutton />  : <span >Negotiate</span>

                                                                            } */}


                                                                                            </button> 

                                                                        {/* <button className="btn btn-secoundary-default w-100" type="button"
                                                    > Negotiate from ₹250 <p className='share mb-0'> / share</p> </button> */}


                                                                    </>
                                                                    
                                                                      }
                                                </div>
                                                {/* </>
                                                } */}
                                            </div>
                                        </div>                                       
                                        </>
                                        ))}                                       
                                    </div>
                                </div>



                                {/* old design of marketplace  */}

                                {/* <TableContainer className={classes.container} >
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
                                                    {console.log('tsetss', trade)}

                                                    <TableCell className="table-link">
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
                                                                            let responseJSON = await response.json();
                                                                            console.log("hihihihihihko11" + responseJSON)
                                                                            console.log(response.status + "juju")
                                                                            if (response.status != 200) {
                                                                                console.log("hihihihihihko")
                                                                                const reqBody = {
                                                                                    "communicationStatus": "donotcreatecoomunicationrecord",
                                                                                    "message": "it's a dummy comment",
                                                                                    "offeredPrice": trade.minBidPriceAccepted,
                                                                                    "offeredQuantity": trade.qty,
                                                                                    "tradeId": trade.id
                                                                                }
                                                                                const response1 = await apiCall("tradecommunication/", 'POST', reqBody, history)
                                                                                const responseJSON1 = await response1.json();

                                                                                const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/" + responseJSON1.tradeOnGoingTransactionId, 'GET', '', history)
                                                                                const responseJSON12 = await response12.json();

                                                                                console.log("hihihihihihko113" + responseJSON.tradeId)
                                                                                responseJSON = responseJSON12;
                                                                                console.log("hihihihihihko14" + responseJSON.tradeId)
                                                                            }

                                                                            console.log("hihihihihihko15" + responseJSON.tradeId)
                                                                            console.log("hihihihihihko15" + responseJSON.companyLogo)
                                                                            history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
                                                                        }}>

                                                                            {
                                                                                console.log("sppp"+selectbutton)
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
                                </TableContainer> */}


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
                        </div>
                    </div>
                    
                </React.Fragment>
            </div>
        </div>
    )
}