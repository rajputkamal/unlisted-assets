import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MyHoldingsTableHeader from './myholdingstableheader';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./myholdingstablecontent.scoped.css"
import Buttons from "../../Components/Buttons"
import axios from 'axios'
import Nologo from "./nologo.jpeg"
import ToogleButton from '../../Components/ToogleButton/toogleswitch';
import FloatingActionButtons from '../../Components/FabButton/fabbutton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { apiCall12, apiCall, downloadurl, setAccessToken } from "../../Utils/Network"
import Dialog from '@material-ui/core/Dialog';
import { connectToChat } from "../../Utils/chat";
import { store } from "../../Utils/uaredux";

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
// import FilterCard from "../../Components/FilterCard"
import EmptyHoldings from "../Holdings/index"
import edit from "./edit.svg";
import deleteicon from "./delete.svg"
import "../../Components/FilterCard/filterCard.css"
import "../Companies/bootstrap4/css/bootstrap.scoped.css"
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "../Companies/style.scoped.css"
import Skeleton from 'react-loading-skeleton';
import PriceRangeSlider from '../Companies/PriceRangeSlider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory, useLocation
} from "react-router-dom";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from '@material-ui/icons/Add';
import { successToast, errorToast } from "../../Components/Toast/index";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CreateHoldings from './Createholding/Createholding';
import { getDateAndTime, getTime } from '../../Utils/DateFormat';


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
        maxHeight: 600,
        border: "0.5px solid #E5E5E5",
        borderRadius: "4px",
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px dashed #CFCBCF',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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

export default function MyHoldingsTableContent(props) {
    let history = useHistory();

    let loaderArray = [{},
    {}]

    const [isload, setLoad] = React.useState(false);
    const [rowInformation, setRowInformation] = React.useState(loaderArray)
    const [anyholding, setanyholding] = React.useState(false)

    const [searchOptions, setsearchOptions] = useState([])
    const [sellAllowed, setsellAllowed] = React.useState(false)

    const getSearchOption = async function () {
        let response1 = await apiCall("company/allcompaniesnames", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)

        setsearchOptions(responseJSON1.map(ssa => ssa.name))
    }

    React.useEffect(() => {

        isSellAllowed()
    }, []);

    async function isSellAllowed() {
        const response = await apiCall("app/isSellAllowed", "GET");
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        if (response.status == 200) {
            let responseText = await response.text();
            if (responseText == "true") {
                setsellAllowed(true)
            } else {
                setsellAllowed(false)
            }

        }
    }
    //Search
    let searchkey = 'nothing'

    // React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoad(true);
    //       }, 2500);
    //       return () => clearTimeout(timer);
    // }, []);

    React.useEffect(() => {
        if (sellAllowed) {
            const close = document.getElementsByClassName(
                "MuiAutocomplete-clearIndicator"
            )[0];
            {
                // Add a Click Event Listener to the button
                close.addEventListener("click", () => {
                    searchkey = 'nothing'
                    getData()
                });
            }
        }


    }, [sellAllowed]);

    const callbackredux = async () => {
        //console.log("yo yo honey singh" + store.getState().toString())
        try {

            getData()
        } catch (error) {
            //console.log("error", error);
            console.error(error);
            // errorToast("Invalid", "Internet or Service is down, try after some time...");
        }
    }

    React.useEffect(() => {
        getSearchOption()
        getData()
    }, []); // <-- Have to pass in [] here!

    React.useEffect(() => {
        // connectToChat()
        const unsubscribe = store.subscribe(callbackredux)
        return unsubscribe;
    }, [])
    const getData = async function () {
        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        if (searchkey == "") {
            searchkey = "nothing"
        }
        // setLoad(false);

        let response = await apiCall("myholding/myholdings/" + searchkey, 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // setRowInformation(response)

        // let responseJSON = await response.json()

        //console.log("api called ",response)

        let responseJSON = await response.json()

        //console.log("responseJson", responseJSON)

        setRowInformation(responseJSON)

        if (responseJSON.length != 0) {
            setanyholding(true)
        }

        setLoad(true);
    }

    const deleterow = async function (id) {
        setLoading(true)
        try {
            let response = await apiCall(`myholding/${id}`, 'DELETE', '', history)
            if (response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return
            }
            await getData()
            //console.log(response)
            setOpen(false)
            setLoading(false)
        }
        catch (e) {
            //console.log(e)
        }

    }
    const DeletePopUp = (id) => {
        setOpen(true)
        setRemove(id)

    }


    const classes = useStyles();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('company');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');

    }


    const [addHoldings, setAddHoldings] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [remove, setRemove] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const [listing, setListing] = React.useState(1)



    const showAddorEditListing = (holding) => {
        if (holding.qtysale === 0) {
            setListing(2)
        }
    }
    const body = (
        <div style={modalStyle} className={classes.paper} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>

                <p style={{ paddingLeft: "35px" }}>Loading</p>

            </div>
        </div>

    );




    const [panelShow1, setPanelShow1] = React.useState(false)
    const [panelShow2, setPanelShow2] = React.useState(false)
    const [panelShow3, setPanelShow3] = React.useState(false)

    const [SectorList, setSectorList] = React.useState([])

    const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])

    // React.useEffect(() => {
    //
    //     axios.get(downloadurl(`company/findAll`))
    //     .then(res => {
    //        const resData = res.data;
    //
    //     //   this.setState({
    //     //     companies:resData,
    //     //     companyLenght:res.data.length,
    //     //     isLoading:false
    //     //    });
    //     //    this.getPrice();
    //     //    this.setState({
    //     //     maxpricerange:this.state.maxprice,
    //     //     minpricerange:this.state.minprice
    //     //    })
    //
    //     }).catch((error) => {
    //       console.log(error)
    //   });
    //
    //     axios.get(downloadurl(`company/sector/findAll`))
    //         .then(res => {
    //             const resData = res.data;
    //             setSectorList(resData);
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //
    //         axios.get(downloadurl(`company/fundingseries/findAll`))
    //         .then(res => {
    //            const resData = res.data;
    //
    //            setSeriesOfFundingList(resData)
    //         }
    //         ).catch((error) => {
    //           console.log(error)
    //       });
    // }, []); // <-- Have to pass in [] here!







    let showPanel1 = () => {
        setPanelShow1(!panelShow1)
    }

    let showPanel2 = () => {
        setPanelShow2(!panelShow2)
    }

    let showPanel3 = () => {
        setPanelShow3(!panelShow3)
    }

    let sectorChange = () => {

    }

    let fundingChange = () => {

    }

    let finalChange = () => {

    }

    // let FilterCard = () => {
    //
    //     let minprice = 10
    //     let maxprice = 10000
    //     return (
    //         <div className="filter-card-container ">
    //             <div className="filter-card ">
    //                 <div className="sun bg-white">
    //                     <div className="moon">
    //                         <h5 className="text-primary">
    //                             <strong className="text-primary" id="text-primary">Filter</strong>
    //                             <span className="pull-right float-right mt-2">
    //                                 <Link to="#"><span className="text-dark"> Clear All</span></Link>
    //                             </span>
    //                         </h5>
    //                     </div>
    //                     <div className="earth">
    //                         <button className={panelShow1 ? "accor active1" : "accor"} onClick={showPanel1}>Sector</button>
    //                         <div className={panelShow1 ? "panel1 show-panel1" : "panel1"} >
    //                             {SectorList && SectorList.map((item, index) => {
    //                                 return <div className="form-group" key={index}>
    //                                     <p className="d-flex align-items-center">  <input type="checkbox" name="sector_value" value={item.value} onChange={sectorChange} /> <span>{item.label}</span></p>
    //                                 </div>;
    //                             })}
    //
    //                         </div>
    //                         <button className={panelShow2 ? "accor active1" : "accor"} onClick={showPanel2}>Series of Funding</button>
    //                         <div className={panelShow2 ? "panel1 show-panel1" : "panel1"}>
    //                             {SeriesOfFundingList && SeriesOfFundingList.map((item, index) => {
    //                                 return <div className="form-group" key={index}>
    //                                     <p className="d-flex align-items-center">  <input type="checkbox" name="company_series_of_funding" value={item.value} onChange={fundingChange} /> <span>{item.label}</span></p>
    //                                 </div>;
    //                             })}
    //                         </div>
    //                         <button className={panelShow3 ? "accor active1" : "accor"} onClick={showPanel3}>Valuation</button>
    //                         <div className={panelShow3 ? "panel1 show-panel1" : "panel1"}>
    //                             {
    //                                 minprice && maxprice ? <PriceRangeSlider minVal={minprice} maxVal={maxprice} finalChange={finalChange} /> : null
    //                             }
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //
    //         </div>
    //     )
    // }
    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        //console.log("aaaaaasss"+e.keyCode+e.code)
        if (e.code === "Enter") {


            searchkey = e.target.value
            //handleSubmit();
            if (searchkey == "") {
                searchkey = "nothing"
            }
            //handleSubmit();
            //console.log("aaaaaasss11"+searchkey)
            getData()
        }
    };
    return (
        <div className="mt-0">
            <div className="my-holdings-page row ">
               <>{(rowInformation.length === 0 && !anyholding) ? <>
                          <>{sellAllowed ?<EmptyHoldings />:null}</>
                    </> :
                        <>

                            <React.Fragment>
                                {/* <div className="col-md-3 col-12">
                        <FilterCard/>
                        </div> */}
                                <div className="col-md-12 col-12">
                                    <div className="table-container">
                                        <div className="search-area">
                                            <div className="Table_title">
                                                <div className="d-flex align-items-center justify-content-start w-100">
                                                    <h6 className='mr-3'><strong> My Holdings </strong></h6>
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
                                                                        getData()
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
                                                onKeyPress={handleKeypress} /> */}

                                                        <div className="dnmb">
                                                            <Buttons.PrimaryButton value="Add Holdings" id="add-holdings-button" style={{ height: "35px", marginLeft: "5px" }} onClick={() => { history.push("/addholdings") }} />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="dbmn ">
                                                    <Buttons.PrimaryButton value="Add Holdings" id="add-holdings-button" onClick={() => { history.push("/addholdings") }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dnmb ">
                                            <div className="MarketplaceTable-actions d-flex justify-content-end">
                                                {/* <div class="form-group custom-search mb-0 w-100">
                                            <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                            <input type="text" class="form-control" placeholder="Search here for company name, commodity name..." />
                                        </div> */}
                                                {/* <Button className="btn btn-secoundary-default "  onClick={() => { history.push("/addholdings") }} >
                                            <AddIcon />Add Holding
                                        </Button> */}
                                            </div>

                                        </div>
                                        {addHoldings ? null :
                                            <div className="mt-3 myholding-right-sec Sell-table-section">
                                                <TableContainer className={classes.container} id='scroll-default'>
                                                    <Table stickyHeader >
                                                        <MyHoldingsTableHeader
                                                            valueToOrderBy={valueToOrderBy}
                                                            orderDirection={orderDirection}
                                                            handleRequestSort={handleRequestSort}
                                                        />
                                                        {
                                                            sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy))
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((holding, index) => (
                                                                    <TableRow key={index} style={{ backgroundColor: "white" }}>
                                                                        <TableCell className="table-link">
                                                                            <Link className="" to="/companies">
                                                                                <div className="company_cell1 ">
                                                                                    <div className="holdingtable-logo-img">
                                                                                        {isload ?
                                                                                            <div className="holdingtable-logo"><img src={(holding.companyLogo == undefined) || (holding.companyLogo == '') ? Nologo : holding.companyLogo} className="product-company-logo" /></div>
                                                                                            :
                                                                                            <Skeleton className="ml-2" width={100} height={35} />
                                                                                        }
                                                                                    </div>
                                                                                    <div className="company_details1 ml-2 d-flex">
                                                                                        <h6 className="company_name m-0 text-default-secoundary text_limit">
                                                                                            {isload ? <> <b>{holding.companyName}
                                                                                                {/* {console.log("holding", holding)} */}
                                                                                            </b></> : <Skeleton className="ml-0" width={100} />}
                                                                                        </h6>
                                                                                        {/* <Tooltip title={<><p className="mb-0">Type: <b>{holding.commodityName}</b></p>
                                                        <p className="mb-0">Listng Id: <b> {holding.id}</b></p></>
                                                    } placement="right" arrow enterTouchDelay={0}>
                                                        {isload ? <InfoOutlinedIcon className="marketplace-infoicon"/> :
                                                        null}
                                        </Tooltip> */}

                                                                                        {/* <p className="Share_type m-0 text-small text-default-secoundary">
                                        { isload ? <> {holding.commodityName} </> : <Skeleton width={100} height={8} /> }
                                        </p> */}
                                                                                        {/* <p className="myHoldings_id m-0 text-small text-default-secoundary">
                                        { isload ? <> HOLD{holding.id} </> : <Skeleton width={100} height={8} /> }
                                        </p> */}
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </TableCell>

                                                                        <TableCell>
                                                                            {isload ? <> {holding.uaVerificationStatus} {(holding.uaVerificationStatus == "Approved") ? <CheckCircleIcon className="text-success " /> : null}</> : <Skeleton width={100} />}
                                                                        </TableCell>
                                                                        <TableCell className='text-center'>
                                                                            {isload ? <> {getDateAndTime(holding.updateDate)}{" "}
                                                                              <br />{getTime(holding.updateDate)}</> : <Skeleton width={100} />}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <p className="m-0 text-success">
                                                                                {isload ? <> {holding.qtySale} of {holding.qtyTotal}</> : <Skeleton width={100} />}
                                                                            </p>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <p className="m-0 text-success">
                                                                                {isload ? <> {holding.qtyFreezed}</> : <Skeleton width={100} />}
                                                                            </p>
                                                                        </TableCell>
                                                                        <TableCell >
                                                                            {holding.action}

                                                                            <div style={{ display: "flex", alignItems: "center" }} className="table-actions">
                                                                                {isload ?
                                                                                    <img className="mr-2" src={edit}
                                                                                        onClick={() => {
                                                                                            //console.log("selected holdings", holding)
                                                                                            history.push({ pathname: "/editholdings", state: { holding } })
                                                                                        }
                                                                                        } />
                                                                                    :
                                                                                    <Skeleton square={true} height={40} width={40} />
                                                                                }

                                                                                {/* { isload ?
                                          <img className="mr-2" src={deleteicon} 
                                          onClick={()=>DeletePopUp(holding.id)}/>
                                        :
                                        <Skeleton square={true} height={40} width={40} className="mx-2"/>
                                    } */}

                                                                                {isload ?
                                                                                    <>
                                                                                        {holding.tradeId != null ? <Buttons.SecondaryButton value="Edit"
                                                                                            style={{ height: "34px", background: "transparent", border: "1px solid #721B65" }}
                                                                                            onClick={() => {
                                                                                                holding.uaVerificationStatus != "Approved" ?
                                                                                                    errorToast("Invalid", "You can only edit Listing, once holding change request is Approved, pl wait...") :
                                                                                                    history.push({ pathname: "/edit_inventory", state: { selectedHolding: holding } })
                                                                                            }
                                                                                            }
                                                                                        />
                                                                                            : <Buttons.SecondaryButton value="Add to Marketplace"
                                                                                                onClick={() => {
                                                                                                    (holding.uaVerificationStatus) != "Approved" ?
                                                                                                        errorToast("Invalid", "You can only create Listing, once it is Approved, pl wait...") :
                                                                                                        history.push({ pathname: "/create_inventory", state: { selectedHolding: holding } })
                                                                                                }
                                                                                                } />}
                                                                                    </>
                                                                                    :
                                                                                    <Skeleton square={true} height={40} width={100} className="mx-2" />
                                                                                }


                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>

                                                                ))
                                                        }

                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        }
                                        {/* <TablePagination
             rowsPerPageOptions={[5,10,25,50]}
             component="div"
             count={rowInformation.length}
             rowsPerpage={rowsPerPage}
             page={page}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
         /> */}
                                        <Dialog className="delete-dialog"
                                            open={open}
                                            onClose={() => { setOpen(false) }}
                                        >
                                            <div className="holding-delete-model">
                                                {loading ? <p style={{ paddingLeft: "120px" }}> Loading...</p> :
                                                    <>
                                                        {/* <DialogTitle id="alert-dialog-title">Delete Listing "{"Sun pharma"}"</DialogTitle> */}
                                                        <h6 className="font-weight-bolder">Delete Listing "{"Sun pharma"}"</h6>
                                                        <p className="text-small  mb-0">Are you sure you want to deleting your holding?</p>
                                                        <p className="text-small my-0">Your company listing for the company</p>
                                                        <p className="text-small mt-0">will also get deleted </p>
                                                        <div className="d-flex justify-content-center pt-3">
                                                            <Buttons.SecondaryButton value="Cancel" style={{ width: "45%", marginRight: "20px" }} />
                                                            <Buttons.PrimaryButton value="Confirm" style={{ width: "45%", }} />
                                                        </div>

                                                        {/* <DialogActions>
                                             <Button  onClick={()=>{deleterow(remove)}} color="primary">
                                                 YES
                                             </Button>
                                             <Button onClick={() => { setOpen(false) }} color="primary">
                                                 NO
                                             </Button>
                                             
                                             </DialogActions> */}
                                                    </>
                                                }
                                            </div>
                                        </Dialog>

                                    </div>
                                </div>
                            </React.Fragment>

                            {/* <EmptyHoldings /> */}

                        </>

                    }</>


                <>{sellAllowed ?null:<CreateHoldings />}</>

            </div>
        </div>
    )


}