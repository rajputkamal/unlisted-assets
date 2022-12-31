import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './UserHeader';
import { makeStyles } from '@material-ui/core/styles';
import "../../../Components/FilterCard/filterCard.css"
import Buttons from "../../Buttons"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './Index.css'
import UserIcon from './user.png';
import { apiCall, apiCall1, apiCall12, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loadbutton from '../../Loadbutton/Index';
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { successToast, errorToast } from "../../Toast/index";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadingImg from './loading.gif'
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ViewListIcon from '@mui/icons-material/ViewList';
import Chip from '@mui/material/Chip';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 1000,
        width: "border-box",
        border: "1px solid #CFCBCF",
        borderRadius: "10px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "scroll"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 1),
        borderRadius: "10px",
        maxWidth: "500px",
        minWidth: "400px",
        margin: "0px auto 0px auto"
    },
}));
export default function InventoryTableContent(props) {

    let history = useHistory();
    const classes = useStyles();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('company');
    const [isload, setLoad] = React.useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editedData, setEditedData] = React.useState({});
    // Handle Add Reacord  Modal
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [viewAllModal, setViewAllModal] = useState(false);
    const [rowUser, setRowUser] = React.useState([])
    // Handle Edit Record Modal
    const [openEditModal, setOpenEditModal] = React.useState(false);

    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [isloading, setLoading] = React.useState(false);
    let searchkey = ''
    const [pageNum, setpageNum] = React.useState(0)
    const [pagesize, setpagesize] = React.useState(20)
    const [hasmore, sethasmore] = React.useState(true)

    const [inProcessData, setInProcessData] = React.useState(false)
    const [approvedData, setApprovedData] = React.useState(false)
    const [tabledata, setTableData] = React.useState(true)
    const [alldata, setAlldata] = React.useState([]);
    const [searchOptions, setsearchOptions] = useState([])
    const [pGOrdersDetails, setPGOrdersDtails] = useState([])
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({})

    const handleChange1 = (rowObject) => {
        // editedData[field] = val;
        // setEditedData({ ...editedData });
        setEditedData()
    };

    const handleChange = (field, val) => {
        editedData[field] = val;
        setEditedData({ ...editedData });
    };

    //   React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoad(true);
    //       }, 2000);
    //       return () => clearTimeout(timer); 
    // }, []);


    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    React.useEffect(() => {
        const close = document.getElementsByClassName(
            "MuiAutocomplete-clearIndicator"
        )[0];

        // Add a Click Event Listener to the button
        close.addEventListener("click", () => {
            searchkey = ''
            getAllInventoryget(0)
        });

    }, []);

    React.useEffect(() => {
        // getSearchOption()
        // getAllInventoryget(0)
        getBankDetails()
    }, [searchkey]);


    const getBankDetails = async function () {
        let response1 = await apiCall("pGOrders", 'GET', '', history)
        // console.log("response1 bank detail", response1)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON1 = await response1.json();
        console.log("responseJSON1 bank ", responseJSON1)
        setPGOrdersDtails(responseJSON1._embedded.pGOrders)
    }

    const getAllInventoryget = async function (pageNum1) {


        if (pageNum1 == 0) {
            setpageNum(0)
            setRowUser([])
        } else {
            pageNum1 = pageNum
        }
        setLoading(true)
        let response1 = await apiCall12("onboardings/search/findAllOnboardingsSearchAdmin?searchKey=" + searchkey + "&page=" + pageNum1 + "&size=" + pagesize, 'GET', '', history)
        // let response1 = await apiCall12("onboardings/search/findAllOnboardingsSearchAdmin?searchKey=" + searchkey + "&searchKey1=" + searchkey, 'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        setRowUser(responseJSON1._embedded.onboardings)
        // console.log(responseJSON1._embedded.companies)

        if (pageNum1 == 0) {
            setRowUser(responseJSON1._embedded.onboardings)
        } else {
            responseJSON1._embedded.onboardings.map(record => rowUser.push(record));
            setRowUser([...rowUser])
        }

        setpageNum(pageNum + 1)

        if ((responseJSON1._embedded.onboardings.length % pagesize) != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }
        setLoading(false)
        setLoad(true)
    }

    const getAllInventorypost = async function (pageNum1) {


        if (pageNum1 == 0) {
            setpageNum(0)
            setRowUser([])
        } else {
            pageNum1 = pageNum
        }
        setLoading(true)

        let response1 = await apiCall12("pGOrders?searchKey=" + searchkey + "&page=" + pageNum1 + "&size=" + pagesize, 'POST', history)
        // let response1 = await apiCall12("onboardings/search/findAllOnboardingsSearchAdmin?searchKey=" + searchkey + "&searchKey1=" + searchkey, 'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        setRowUser(responseJSON1._embedded.onboardings)
        // console.log(responseJSON1._embedded.companies)

        if (pageNum1 == 0) {
            setRowUser(responseJSON1._embedded.onboardings)
        } else {
            responseJSON1._embedded.onboardings.map(record => rowUser.push(record));
            setRowUser([...rowUser])
        }

        setpageNum(pageNum + 1)

        if ((responseJSON1._embedded.onboardings.length % pagesize) != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }
        setLoading(false)
        setLoad(true)
    }

    const getAllInventoryupdate = async function (id) {
        let response1 = await apiCall("onboardings/" + editedData.id, 'PUT', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget(0)

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    // search bar code start from here

    const getSearchOption = async function (pageNum1) {
        let response1 = await apiCall("useronboarding/onboardingHoldingsListings", 'GET', '', history)
        // console.log(response1)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON1 = await response1.json();
        // console.log("user role mappning", responseJSON1)
        setsearchOptions(responseJSON1.map(ssa => ssa.name))
        if (searchkey === null) {
            setsearchOptions("");
          } else {
            setsearchOptions([...searchOptions]);
          }
    }

    // console.log("search Options onboarding manager", searchOptions)

    // search bar code end here

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("onboardings/" + editedData.id, 'DELETE', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget(0)
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

    const getAllInventoryadd = async function () {
        let response1 = await apiCall("onboardings", 'POST', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 201) {
            successToast("Success", "Added successfully!!")
            getAllInventoryget(0)
        } else {
            errorToast("Invalid", "Not Added...try after some time or contact Admin");

        }
    }

    const handleOpenEditModal = (userobject) => {
        setEditedData(userobject)
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleOpenAddModal = (userobject) => {
        setEditedData(userobject)
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const handleOpenDeleteModal = (userobject) => {
        setEditedData(userobject)
        setOpenDeleteModal(true);

    };

    const handleCloseDeleteModal = () => {

        setOpenDeleteModal(false);
    };

    const handleSelect = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        console.log("search: ",e.target.value, searchkey)

        if (searchkey == e.target.value) {
            //do nothing
            return
        }
        if (searchOptions.includes(e.target.value)) {
            searchkey = e.target.value
            //handleSubmit();
            // console.log("aaaaaasss112" + searchkey)
            setpageNum(0)
            getAllInventoryget(0)
        }
    };

    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        // console.log("aaaaaasss"+e.keyCode+e.code)

        if (e.code === "Enter") {
            searchkey = e.target.value
            if (searchkey == "") {
                searchkey = "nothing";
              }
          
            setpageNum(0)
            getAllInventorypost(0)
            e.preventDefault();
        }
        console.log("searchkey" + searchkey)
    };

    const fetchMoreData = () => {
        getAllInventoryget()
    };

    const filterData = (filterStatus) => {
        const updatedFilterData = rowUser.filter((curElemt) => {
            return curElemt.uaVerifiedStatus === filterStatus
        })
        setAlldata(updatedFilterData)
    };

    const viewAllRecordModal = (userobject) => {
        setEditedData(userobject);
        setViewAllModal(true);
    }

const checkStatus = async (tradeAggId) => {
    let response1 = await apiCall("payment/order/status/"+ tradeAggId, 'GET', '', history)
    if (response1.status == undefined) {
        return
    }
    let responseJSON1 = await response1.json();
    setPaymentStatus(responseJSON1)
    setTimeout(() => {
        setOpenStatusModal(true)
    },200)
}
    return (
        <div className="user_table_section">
            <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <h5 className='main-heading'><b>PG Order</b></h5>
                    </div>
                </div>
            <div className='row d-flex justify-content-between'>
                <div className='col-md-6 col-12'>
                    <div className="Table_title mt-1">
                        <div className="d-flex align-items-center justify-content-start w-100" >
                            <div className="search-area dbmn">
                                <div className='row'>
                                    <div className='col-md-7 col-12'>
                                        <form className="w-100">
                                            <div className="w-100">
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
                                                                    searchkey = event.target.value;
                                                                    getAllInventorypost(0);
                                                                  }}
                                                                    className="inventory-search-bar"
                                                                    placeholder="Search by orderId"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-12 px-0 d-flex align-items-center justify-content-end marketplace-Chip-main'>
                    <div className='d-flex marketplace-Chips m-0'>
                        <Chip className='px-2 mx-1 ' label="All Onboarding"
                            onClick={() => {
                                setTableData(true)
                                setApprovedData(false)
                                setInProcessData(false)
                            }} />

                        <Chip className='px-2 mx-1 ' label="Not-Verified"
                            onClick={() => {
                                filterData("notVerified")
                                setApprovedData(false)
                                setInProcessData(true)
                                setTableData(false)
                            }} />
                        <Chip className='px-2 mx-1 ' label="Verified"
                            onClick={() => {
                                filterData("Verified")
                                setApprovedData(true)
                                setInProcessData(false)
                                setTableData(false)
                            }} />

                    </div>

                    <div className="text-right mb-2">
                        <button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>
                            <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                        </button>
                    </div>
                </div>
            </div>


            <div className="table-container">
                <div className="userTable">
                    <TableContainer className="table-default-container scroll-default">
                        <Table stickyHeader className="bg-white">
                            <InfiniteScroll  
                                dataLength={rowUser.length}
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




                                <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                                {pGOrdersDetails.map(
                                    (user, index) => (
                                        <TableRow key={index} id={user.id}>
                                            <TableCell>{isload ? <> {user.accountId} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.ongoingTransactionId} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.tradeAgreementId1} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.orderId} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.orderToken} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.orderStatus} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.amount} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>
                                                <div className="d-flex justify-content-between">
                                                    {isload ?
                                                        <button className="btn btn-primary-default mr-2" onClick={() => handleOpenEditModal(user)}>
                                                            <EditIcon />
                                                        </button>
                                                        :
                                                        <Skeleton square={true} height={30} width={30} />
                                                    }
                                                    {isload ?
                                                        <button className="btn btn-sm btn-danger mr-2" onClick={() => handleOpenDeleteModal(user)}>
                                                            <DeleteIcon />
                                                        </button>
                                                        :
                                                        <Skeleton square={true} height={30} width={30} />
                                                    }
                                                    
                                                    {isload ?
                                                        <button className='btn btn-sm btn-info mr-2' onClick={() => viewAllRecordModal(user)}>
                                                            <ViewListIcon />
                                                        </button>:
                                                        <Skeleton square ={true} height={30} width={30} />
                                                    }
                                                     {isload ?
                                                        <Buttons.SecondaryButton value='Check&nbsp;PG&nbsp;order&nbsp;status' onClick={() =>checkStatus(user.tradeAgreementId1)} />
                                                        
                                                        :
                                                        <Skeleton square ={true} height={30} width={30} />
                                                    }
                                                </div>
                                            </TableCell>                                            
                                            
                                        </TableRow>
                                    ))
                                }
                            </InfiniteScroll>
                        </Table>
                    </TableContainer>
                </div>
                {/* <button className="btn btn-primary mr-2" onClick={fetchData}>
                Show full page loading spinner
                </button> */}
            </div>
            {/* Edit Record Modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEditModal}
                onClose={handleCloseEditModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditModal}>
                    <div className={classes.paper}>
                        <div className="text-center modal-header p-1 text-center">
                            <h5 className="text-primary-default text-center w-100"><b>Update Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-12'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Order ID -</label>
                                    <input type="text" value={editedData.orderId } onChange={(e) => handleChange("order id", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Order Token -</label>
                                    <input type="text" value={editedData.orderToken} onChange={(e) => handleChange("order token", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Order Status-</label>
                                    <input type="text" value={editedData.orderStatus} onChange={(e) => handleChange("order status", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Money Settled UA-</label>
                                    <input type="text" value={editedData.moneySettledUA} onChange={(e) => handleChange("money settled ua", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Amount-</label>
                                    <input type="text" value={editedData.amount} onChange={(e) => handleChange("amount", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Customer UPI ID-</label>
                                    <input type="text" value={editedData.customerUPIID} onChange={(e) => handleChange("customer upi id", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseEditModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Update" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventoryupdate} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* Add Record Modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openAddModal}
                onClose={handleCloseAddModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openAddModal}>
                    <div className={classes.paper}>
                        <div className="text-center modal-header p-1 text-center">
                            <h5 className="text-primary-default text-center w-100"><b>Add New Record</b></h5>
                        </div>
                        <div className="modal-body pb-5">
                        <form className="w-100">
                                <div className='row'>
                                    <div className='col-12'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Order ID -</label>
                                    <input type="text" value={editedData.orderId } onChange={(e) => handleChange("order id", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Order Token -</label>
                                    <input type="text" value={editedData.orderToken} onChange={(e) => handleChange("order token", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Order Status-</label>
                                    <input type="text" value={editedData.orderStatus} onChange={(e) => handleChange("order status", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Money Settled UA-</label>
                                    <input type="text" value={editedData.moneySettledUA} onChange={(e) => handleChange("money settled ua", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Amount-</label>
                                    <input type="text" value={editedData.amount} onChange={(e) => handleChange("amount", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">Customer UPI ID-</label>
                                    <input type="text" value={editedData.customerUPIID} onChange={(e) => handleChange("customer upi id", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseAddModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Submit" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventoryadd} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

             {/* View AllRecord Modal  */}
             <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={viewAllModal}
                onClose={() => setViewAllModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewAllModal}>
                    <div className={classes.paper}>
                        <div className="text-center modal-header p-1 text-center">
                            <h5 className="text-primary-default text-center w-100"><b>View All Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-12'>
                                    <div className="form-control-row">
                                        <label className="m-0 text-small">Account ID -</label>
                                            <h6>{editedData.accountId ? editedData.accountId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">ongoingTransaction ID -</label>
                                            <h6>{editedData.ongoingTransactionId ? editedData.ongoingTransactionId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Tarde Agreement ID -</label>
                                            <h6>{editedData.tradeAgreementId1 ? editedData.tradeAgreementId1 : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Order ID -</label>
                                            <h6>{editedData.orderId ? editedData.orderId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Order Token -</label>
                                            <h6>{editedData.orderToken ? editedData.orderToken : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Order Status-</label>
                                            <h6>{editedData.orderStatus ? editedData.orderStatus : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Money Settled UA-</label>
                                            <h6>{editedData.moneySettledUA ? editedData.moneySettledUA : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Amount-</label>
                                            <h6>{editedData.amount ? editedData.amount : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                        <label className="m-0 text-small">Customer UPI ID-</label>
                                            <h6>{editedData.customerUPIID ? editedData.customerUPIID : 'NA'}</h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={() => setViewAllModal(false)} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* Delete Record Modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDeleteModal}>
                    <div className={classes.paper}>
                        <div className="text-center ">
                            <DeleteForeverIcon className="text-danger " style={{ width: "70px", height: "70px" }} />
                            <h4 className="my-3 text-danger">Are You Sure ?</h4>
                            <p className="text-small ">Do you really want to delete these record ? <br />This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseDeleteModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Confirm" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventorydelete} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            {/* payment check status modal */}
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openStatusModal}>
          <div className={classes.paper}>
            <div className="text-center modal-header p-1 text-center">
              <h5 className="text-primary-default text-center w-100">
                <b>Payment Status</b>
              </h5>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="success">
                {paymentStatus.payment_status === 'USER_DROPPED' ? <CancelOutlinedIcon className="icon" style={{color: '#FF4D4F'}} /> : <CheckCircleOutlineIcon
                  className="icon"
                  style={{ color: "#00CC83" }}
                />}
                <h5 className={`${paymentStatus.payment_status === 'USER_DROPPED' ? 'red' : 'green'} m-0`}>{paymentStatus.payment_status}</h5>
                <p className={`${paymentStatus.payment_status === 'USER_DROPPED' ? 'red' : 'green'} text-small text-center`} style={{margin: '0px 2px'}}>
                  {paymentStatus.payment_message}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Buttons.SecondaryButton
                onClick={() => setOpenStatusModal(false)}
                value="OK"
                style={{ width: "15%", margin: "0px 3px" }}
              />
            </div>
          </div>
        </Fade>
      </Modal>
      
            {loader}
            {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null}
        </div>
    )
}