import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import OngoingTransactionTableHeader from './ongoingtransactiontableheader';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import Popper from '@material-ui/core/Popper';
import Chip from '@mui/material/Chip';

import { connectToChat } from "../../Utils/chat";

import Nologo from "./nologo.jpeg"

import "./ongoingtablecontent.scoped.css"
import Buttons from "../../Components/Buttons"
import axios from 'axios'
import ToogleButton from '../../Components/ToogleButton/toogleswitch';
import FloatingActionButtons from '../../Components/FabButton/fabbutton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { apiCall12, apiCall, downloadurl, setAccessToken } from "../../Utils/Network"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import FilterCard from "../../Components/FilterCard"
import EmptyHoldings from "../Holdings/index"
import edit from "./edit.png";
import deleteicon from "./delete.png"
import '../Companies/bootstrap4/css/bootstrap.scoped.css';
import "../../Components/FilterCard/filterCard.css"
import "../Companies/style.scoped.css"
import PriceRangeSlider from '../Companies/PriceRangeSlider';
import Skeleton from 'react-loading-skeleton';
import AlertIcon from './alert.svg';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from './filter.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloseIcon from '@material-ui/icons/Close';
import {
    BrowserRouter as Router, Link,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loadbutton from '../../Components/Loadbutton/Index';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@material-ui/icons/Search';
import { store } from "../../Utils/uaredux";
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FloatingWhatsApp from 'react-floating-whatsapp';

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 1000,
        width: "border-box",
        border: "0.5px solid #E5E5E5",
        borderRadius: "4px",
    },
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        opacity: "1 !important",
        visibility: "initial !important"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
const StyledButton = withStyles({
    root: {
        background: '#ED2939',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function OngoingTransactionTableContent(props) {
    let history = useHistory();

    let loaderArray = [{},
    {}]

    const [rowInformation, setRowInformation] = React.useState(loaderArray)
    const [allinventory, setAllinventory] = React.useState([]);
    const [transactioinformation, setTransactioninformation] = React.useState([])
    const [isShown, setIsShown] = React.useState(true);
    const [isload, setLoad] = React.useState(false);
    const [Showpagination, setShowpagination] = useState(false)
    const [PaginationButtontext, setPaginationButtontext] = useState("Show pagination")
    const [Filterimg, setFilterimg] = React.useState(false);
    const classes = useStyles();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('company');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [addHoldings, setAddHoldings] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [remove, setRemove] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const [listing, setListing] = React.useState(1)
    const [openfilter, setOpenfilter] = React.useState(false);
    const [panelShow1, setPanelShow1] = React.useState(false)
    const [panelShow2, setPanelShow2] = React.useState(false)
    const [panelShow3, setPanelShow3] = React.useState(false)
    const [loadingbutton, setLoadingbutton] = React.useState(false);
    const [rowIDButtonSelected, setrowIDButtonSelected] = React.useState('');

    const [alldata, setAlldatad] = React.useState(true);
    const [currentdata, setcurrentdatad] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);


    const [searchOptions, setsearchOptions] = useState([])

    let searchkey = ''
    const getSearchOption = async function () {
        let response1 = await apiCall("company/allcompaniesnames", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // // console.log(response1)
        let responseJSON1 = await response1.json();
        // // console.log(responseJSON1)  

        setsearchOptions(responseJSON1.map(ssa => ssa.name))
        if(searchkey === null){
            setsearchOptions("")
        }else {
            setsearchOptions([...searchOptions])
        }
    }

    //Filter
    const [assetTypeList, setassetTypeList] = React.useState([
        { "value": "Equity Shares", "selet": false }])
    const [assetTypeoptions, setassetTypeoptions] = React.useState([])
    const [assetTypeoptionsall, setassetTypeoptionsall] = React.useState(["Equity Shares"])

    //Search
    

    // filter popper For Desktop

    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [open, setOpen] = React.useState(false);

    const opendeskfilter = Boolean(anchorEl);
    const id = opendeskfilter ? 'filter-popper' : undefined;

    React.useEffect(() => {
        const close = document.getElementsByClassName(
            "MuiAutocomplete-clearIndicator"
        )[0];

        // Add a Click Event Listener to the button
        close.addEventListener("click", () => {
            searchkey = 'nothing'
            getData(currentdata)
        });


    }, []);

    const callbackredux = async () => {
        // // console.log("yo yo honey singh"+store.getState().toString())
        try {
            getData();
        } catch (error) {
            // // console.log("error", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }
    }

    React.useEffect(() => {
        getSearchOption()
        getData(alldata);
        // getData(currentdata);

        // getAllData(historicaldata);

        // getAllInventory();
        // const timer = setTimeout(() => {
        //     setLoad(true);
        // }, 3000);
        // return () => clearTimeout(timer);
    }, []); // <-- Have to pass in [] here!

    console.log("historicaldata", currentdata);

    React.useEffect(() => {
        // connectToChat()
        const unsubscribe = store.subscribe(callbackredux)
        return unsubscribe;
    }, [])

    /// for pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const PaginationShow = () => {
        if (Showpagination == true) {
            setShowpagination(false)
            setPaginationButtontext("Hide pagination")
        }
        else if (Showpagination == false) {
            setShowpagination(true)
            setPaginationButtontext("Show pagination")
        }
    }

    const handleMobileFilterOpen = () => {
        setFilterimg(true);
    };

    const getAllInventory = async function () {
        let allinventoryresponse = await apiCall("trade/findAll", 'GET')
        if (allinventoryresponse.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // // console.log(allinventoryresponse)
        let allinventoryresponseJSON = await allinventoryresponse.json();
        // // console.log(allinventoryresponseJSON)
        setAllinventory(allinventoryresponseJSON)
    }
    const reqbody = {
        "a": assetTypeoptions
    }

    const managefilters = function () {
        if (assetTypeoptions.length == 0) {
            reqbody.a = assetTypeoptionsall
        } else {
            reqbody.a = assetTypeoptions
        }
        if (searchkey == "") {
            searchkey = "nothing"
        }
    }
    const getData = async function (currentdataflag) {

        // setLoad(false);

        // // console.log("aaaaaassspp"+searchkey)

        //let response = await apiCall("tradeongoingtranaction/tradeaccount", 'GET')       

        managefilters()

        let response = await apiCall("tradeongoingtranaction/tradeaccount/" + searchkey, 'POST', reqbody)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json()

        let historicaldata = []
        let currentdata = []
        let AllData = []

        if (currentdataflag == true) {
            AllData = responseJSON
            setRowInformation(AllData);
        }
        else if (currentdataflag == false) {
            currentdata = responseJSON.filter(record => !(record.ongoingTransactionStatus == "agreement completed")
                && !(record.ongoingTransactionStatus == "agreement cancelled")
                && !(record.ongoingTransactionStatus == "negotiation cancelled"))
            setRowInformation(currentdata);
        } else {
            historicaldata = responseJSON.filter(record => (record.ongoingTransactionStatus == "agreement completed")
                || (record.ongoingTransactionStatus == "agreement cancelled")
                || (record.ongoingTransactionStatus == "negotiation cancelled"))
            setRowInformation(historicaldata);
        }

        setLoad(true);
    }

    // getAllData = () =>{
    //     setRowInformation(currentdata);
    // }


    const deleterow = async function (id) {
        setLoading(true)
        try {
            let response = await apiCall(`myholding/${id}`, 'DELETE')
            if (response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return
            }
            await getData()
            // // console.log(response)
            setOpen(false)
            setLoading(false)
        }
        catch (e) {
            // // console.log(e)
        }

    }
    const DeletePopUp = (id) => {
        setOpen(true)
        setRemove(id)
    }

    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    const handleOpenFilter = () => {
        setOpenfilter(true);
    };

    const handleCloseFilter = () => {
        setOpenfilter(false);
    };

    const showAddorEditListing = (holding) => {
        if (holding.qtysale === 0) {
            setListing(2)
        }
    }
    // const body = (
    //     <div style={modalStyle} className={classes.paper} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    //         <div>
    //             <p style={{ paddingLeft: "35px" }}>Loading</p>
    //         </div>
    //     </div>
    //
    // );

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

        // // console.log("ppppp1"+assetTypeoptions.length)
        // // console.log("ppppp"+assetTypeoptions)
        //getData()

        //setassetTypeoptions(assetTypeoptions)
    }

    let applyFilter1 = (e) => {

        getData()
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

                                            if (e.target.checked == true) {
                                                assetTypeList[assetTypeList.indexOf(item)].selet = true

                                                // document.getElementById(item.value).checked = true;
                                            } else {
                                                assetTypeList[assetTypeList.indexOf(item)].selet = false
                                                // document.getElementById(item.value).checked = false;
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
                                        }} />

                                    <label className="text-small" for={item.value}>{item.value}</label>
                                </div>;
                            })}
                        </div>
                    </Accordion>

                    <div className="filter-action-bottom m-2">
                        <Buttons.PrimaryButton value="Apply" style={{ width: "100%" }}
                            onClick={applyFilter1} />
                    </div>

                </div>
            </>
        )
    }


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

    const handleSubmit = e => {
        e.preventDefault();
        alert("you have searched for - ");
        // or you can send data to backend
    };

    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        //// console.log("aaaaaasss"+e.keyCode+e.code)
        if (e.code === "Enter") {

            searchkey = e.target.value
            //handleSubmit();
            if (searchkey == "") {
                searchkey = "nothing"
            }
            //handleSubmit();
            //console.log("aaaaaasss11"+searchkey)
            getData(currentdata)
        }
    };

    return (
        <>
            <div className="mt-0 mb-5">

                <div className="my-holdings-page row">

                    <React.Fragment>
                        {/* <div className="col-md-2 col-12 pr-1 pl-1">
                 <FilterCard/>
                 </div> */}
                        <div className="col-md-12 col-12 pr-1 pl-1">

                            <div className="table-container">
                                <div className="dbmn search-area">
                                    <div className="Table_title row mx-0 overflow-hidden">
                                        <div className="col-md-6 d-flex align-items-center justify-content-start w-100" onClick={handleFilterClose}>
                                            <h6 className="mb-0 mr-3"><strong>Ongoing Transactions </strong></h6>
                                            <div class="form-group has-search mb-0 small-icon w-50">
                                                <div className='inventory-search-icon form-control-feedback'>
                                                    <SearchIcon />
                                                </div>
                                                <Autocomplete
                                                    style={{ width: 500 }}
                                                    freeSolo

                                                    options={searchOptions}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            // onChange={(event, value) => searchkey = event.target.value}
                                                            onSelect={(event, value) => {

                                                                searchkey = event.target.value
                                                                getData(currentdata)
                                                            }}

                                                            className="inventory-search-bar"
                                                            placeholder="Search Company Name"
                                                            onKeyDown={(event, value) => handleKeypress(event)}
                                                            //    label="Search Company Name"
                                                            variant="outlined"


                                                        />
                                                    )}
                                                />

                                                {/* <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                                    <input type="text" class="form-control text-small" placeholder="Search here for company name, commodity name..."
                                                        onKeyPress={handleKeypress}/> */}
                                                {/*<div className="MarketplaceTable-actions">*/}
                                                {/*    /!* <Button className="btn btn-secoundary-default mx-3" > *!/*/}
                                                {/*    <img src={FilterIcon} style={{ width: "20px", height: "20px", marginLeft: "20px", cursor: "pointer" }} type="button" className="mr-2" onClick={handleFilter} />*/}
                                                {/*    /!* </Button> *!/*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>

                                        <div className='col-md-6 px-0 d-flex align-items-center justify-content-end marketplace-Chip-main'>
                                            <div className='d-flex marketplace-Chips m-0'>
                                                {/* <Chip className='px-2 mx-1 ' label="All"
                                                    variant={alldata == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setAlldatad(true)
                                                        setcurrentdatad(false)
                                                        setCompleted(false)
                                                        getData(true)
                                                    }} /> */}


                                                {/* <Chip className='px-2 mx-1 ' label="Completed/Cancelled"
                                                    variant={completed == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setCompleted(true)
                                                        setcurrentdatad(false)
                                                        setAlldatad(false)
                                                        getData(null)
                                                    }} /> */}

                                                {/* <Chip className='px-2 mx-1 ' label="In-Progress"
                                                    variant={currentdata == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setcurrentdatad(true)
                                                        setAlldatad(false)
                                                        setCompleted(false)
                                                        getData(false)
                                                    }} /> */}

                                            </div>
                                        </div >

                                        {/* <Buttons.SecondaryButton value="Transaction History" id="add-holdings-button" onClick={() => { history.push("/transactions_history") }} /> */}
                                    </div>
                                    <Popper id={id} open={opendeskfilter} anchorEl={anchorEl} style={{ zIndex: "999" }} >
                                        <FilterInner />
                                    </Popper>
                                </div>

                                {/* search bar mobile view  */}
                                <div className="dnmb search-area">
                                    <div className="Table_title row mx-0 overflow-hidden">
                                        <div className="col-md-6 col-12 d-flex align-items-center justify-content-start w-100" onClick={handleFilterClose}>
                                            <div class="form-group has-search mb-0  small-icon">
                                                <div className='inventory-search-icon form-control-feedback'>
                                                    <SearchIcon />
                                                </div>
                                                <Autocomplete
                                                    style={{ width: 500 }}
                                                    freeSolo

                                                    options={searchOptions}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            // onChange={(event, value) => searchkey = event.target.value}
                                                            onSelect={(event, value) => {

                                                                searchkey = event.target.value
                                                                getData(currentdata)
                                                            }}

                                                            className="inventory-search-bar"
                                                            placeholder="Search Company Name"
                                                            onKeyDown={(event, value) => handleKeypress(event)}
                                                            //    label="Search Company Name"
                                                            variant="outlined"


                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className='col-md-6 col-12 px-0 d-flex align-items-center justify-content-end marketplace-Chip-main'>
                                            <div className='marketplace-Chips px-3'>
                                                {/* <Chip className='ongoing-chip ' label="All"
                                                    variant={alldata == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setAlldatad(true)
                                                        setcurrentdatad(false)
                                                        setCompleted(false)
                                                        getData(true)
                                                    }} />
                                                <Chip className='ongoing-chip' label="In-Progress"
                                                    variant={currentdata == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setcurrentdatad(true)
                                                        setAlldatad(false)
                                                        setCompleted(false)
                                                        getData(false)
                                                    }} />
                                                <Chip className='ongoing-chip' label="Completed/Cancelled"
                                                    variant={completed == true ? null : "outlined"}
                                                    onClick={() => {
                                                        setCompleted(true)
                                                        setcurrentdatad(false)
                                                        setAlldatad(false)
                                                        getData(null)
                                                    }} /> */}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="MarketplaceTable-actions d-none">
                                        <div class="form-group custom-search mb-0 ml-3">
                                            <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                            <input type="text" class="form-control" placeholder="Search here for company name, commodity name..."
                                                onKeyPress={handleKeypress} />
                                        </div>
                                        {/*<Button className="btn btn-secoundary-default mx-3" >*/}
                                        {/*    <img src={FilterIcon} onClick={handleOpenFilter} style={{ width: "20px", height: "20px", cursor: "pointer" }} type="button" className="mr-2" />*/}
                                        {/*</Button>*/}
                                        <Buttons.SecondaryButton className="btn btn-secoundary-default mx-3" value="Transaction History" id="add-holdings-button" onClick={() => { history.push("/transactions_history") }} />

                                        {/* <Button  className="btn btn-secoundary-default mx-3" onClick={()=>{history.push("/transactions_history")}} >
                                            <AddIcon/> Transaction History
                                        </Button> */}
                                    </div>

                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={openfilter}
                                        onClose={handleCloseFilter}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <div className={classes.paper}>
                                                <FilterInner />
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                                {addHoldings ? null :
                                    <div className="mt-3 myholding-right-sec ongoing-transaction-table-section">

                                        <TableContainer className={classes.container} onClick={handleFilterClose} id='scroll-default'>

                                            <Table stickyHeader style={{ backgroundColor: "white", fontSize: "16px" }}>
                                                <OngoingTransactionTableHeader
                                                    valueToOrderBy={valueToOrderBy}
                                                    orderDirection={orderDirection}
                                                    handleRequestSort={handleRequestSort}
                                                />
                                                {
                                                    sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy))
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((holding, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    <div className="company_cell1 ">
                                                                        <div className="ongoing-logo-img">
                                                                            {isload ?
                                                                                <div className="ongoing-logo"> <img src={(holding.companyLogo == undefined) || (holding.companyLogo == '') ? Nologo : holding.companyLogo} className="product-company-logo" /> </div> :
                                                                                <Skeleton className="ml-2" width={100} height={35} />
                                                                            }
                                                                        </div>
                                                                        <div className="company_details1 ml-2 d-flex">
                                                                            {isload ? (<>
                                                                                <h6 className="company_name m-0 text-default-secoundary text_limit"><b>{holding.companyName}</b></h6></>) : <Skeleton width={100} />
                                                                            }
                                                                            {/* <Tooltip title={<><p className="mb-0">Type: <b>{holding.commodityName}</b></p>
                                                                                                <p className="mb-0">Listng Id: <b> {holding.id}</b></p></>
                                                                                            } placement="right" arrow enterTouchDelay={0}>
                                                                                                {isload ? <InfoOutlinedIcon className="marketplace-infoicon"/> :
                                                                                                null}
                                                                                </Tooltip> */}

                                                                            {/* <p className="Share_type m-0 text-default-secoundary">{holding.commodityName}</p>
                                                                                <p className="myHoldings_id m-0 text-default-secoundary">TXN{holding.id}</p> */}


                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {isload ? <>{"TXN"+holding.id}</> : <Skeleton width={100} />}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {isload ? <>{holding.action.charAt(0).toUpperCase() + holding.action.slice(1)}</> : <Skeleton width={100} />}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {isload ? <>{holding.agreedQty}</> : <Skeleton width={100} />}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {isload ? <>{holding.agreedQty * holding.agreedPrice}</> : <Skeleton />}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {isload ? <>{holding.updateDate}</> : <Skeleton width={100} />}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {isload ? <>{holding.onboardingOtherPartyId}</> : <Skeleton width={100} />}
                                                                </TableCell>
                                                                {/*<TableCell>*/}
                                                                {/*    {isload ? <>{holding.onboardingTradeNONOwnerId}</> : <Skeleton width={100} />}*/}
                                                                {/*</TableCell>*/}

                                                                <TableCell>
                                                                    {isload ? holding.ongoingTransactionStatus == "inprogress" ? "Negotiation In-Progress" :
                                                                        holding.ongoingTransactionStatus == "negotiation completed" ? "Shares Transfer in Progress" :
                                                                            holding.ongoingTransactionStatus == "agreement completed" ? "Shares Transfered" :
                                                                                holding.ongoingTransactionStatus == "agreement cancelled" ? "Shares Transfer Cancelled" :
                                                                                    holding.ongoingTransactionStatus == "negotiation cancelled " ? "Negotiation Cancelled" : "-"
                                                                        : <Skeleton width={100} />}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {isload ? <>{(holding.overallStatusDetail==undefined || holding.overallStatusDetail== "") ? "not available" : holding.overallStatusDetail}</> : <Skeleton width={100} />}
                                                                </TableCell>

                                                                <TableCell
                                                                    onMouseEnter={() => setIsShown(true)}
                                                                    onMouseLeave={() => setIsShown(true)}
                                                                >
                                                                    <span>
                                                                        {isShown === true && (holding.ongoingTransactionStatus === "inprogress"
                                                                            || holding.ongoingTransactionStatus === "Negotiation Cancelled"
                                                                        ) ?
                                                                            <>
                                                                                {isload ?
                                                                                    <>
                                                                                        <div className="Inprogress-btn ">
                                                                                            <div className="d-flex align-items-center">
                                                                                                <button className="btn btn-inprogess">In Progress</button>
                                                                                                <img src={AlertIcon} className="ml-1" width="20" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                    : <Skeleton width={100} />}
                                                                                <div className="See-Negotiatin-btn">
                                                                                    {isload ? <>
                                                                                        {
                                                                                            loadingbutton && (holding.id == rowIDButtonSelected) ?
                                                                                                <Loadbutton /> :

                                                                                                <Buttons.PrimaryButton value="See Details" style={{
                                                                                                    fontSize: "10px"
                                                                                                }}

                                                                                                    onClick={() => {
                                                                                                        setrowIDButtonSelected(holding.id)
                                                                                                        setLoadingbutton(true);

                                                                                                        history.push({
                                                                                                            pathname: "/transactions",
                                                                                                            state: {
                                                                                                                selectedTrade: "",
                                                                                                                selectedongoingtxn: holding
                                                                                                            }
                                                                                                        })



                                                                                                    }}
                                                                                                />


                                                                                        }

                                                                                    </> : <Skeleton width={100} />}</div></> :
                                                                            <>
                                                                                <div className="Inprogress-btn">
                                                                                    {isload ? <>
                                                                                        <div className="d-flex align-items-center">
                                                                                            {holding.ongoingTransactionStatus === "agreement completed" ? <button className="btn btn-inprogess">Completed</button> :
                                                                                                holding.ongoingTransactionStatus === "agreement cancelled" ? <button className="btn btn-inprogess">Cancelled</button> :
                                                                                                    <button className="btn btn-inprogess">In Progress</button>
                                                                                            }

                                                                                            <img src={AlertIcon} className="ml-1" width="20" />
                                                                                        </div>
                                                                                    </> : <Skeleton width={100} />}

                                                                                </div>
                                                                                <div className="See-Agreement-btn">
                                                                                    {isload ? <>
                                                                                        <Buttons.PrimaryButton value="See Details" style={{
                                                                                            fontSize: "10px"
                                                                                        }}

                                                                                            onClick={() => {



                                                                                                history.push({
                                                                                                    pathname: "/buyeragreement",
                                                                                                    state: {
                                                                                                        selectedTrade: "",
                                                                                                        selectedongoingtxn: holding
                                                                                                    }
                                                                                                })


                                                                                            }}
                                                                                        />
                                                                                    </> : <Skeleton width={100} />}
                                                                                </div>
                                                                            </>
                                                                        }


                                                                    </span>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                }

                                            </Table>
                                        </TableContainer>

                                    </div>
                                }

                                {/* =============== pagination =========== */}
                                <div className="d-flex align-items-center justify-content-between py-3">
                                    <Buttons.SecondaryButton value={PaginationButtontext} id="add-holdings-button" onClick={PaginationShow} />
                                    <div>
                                        {
                                            Showpagination ? null :

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
                                </div>

                                <Dialog
                                    open={open}
                                    onClose={() => { setOpen(false) }}
                                ><div style={{ width: "300px", backgroundColor: "white" }}>
                                        {loading ? <p style={{ paddingLeft: "120px" }}> Loading...</p> :
                                            <>
                                                <DialogTitle id="alert-dialog-title">{"Do You Want To Delete?"}</DialogTitle>

                                                <DialogActions>
                                                    <Button onClick={() => { deleterow(remove) }} color="primary">
                                                        YES
                                                    </Button>
                                                    <Button onClick={() => { setOpen(false) }} color="primary">
                                                        NO
                                                    </Button>

                                                </DialogActions>
                                            </>
                                        }
                                    </div>
                                </Dialog>

                            </div>
                        </div>
                    </React.Fragment>
                    <FloatingWhatsApp 
        phoneNumber='+919990862220'
        accountName='Unlisted Assets'
        chatMessage='Hello there! 🤝  How can we help?'
        // avatar={whatsappIcon}
        placeholder='Type a message..'
        notificationSound='true'
         />
                </div>
            </div>
        </>
    )
}