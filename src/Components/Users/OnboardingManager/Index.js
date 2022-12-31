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
import Buttons from "../../../Components/Buttons"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './Index.css'
import UserIcon from './user.png';
import { apiCall, apiCall1, apiCall12, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loadbutton from '../../Loadbutton/Index';
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { successToast, errorToast } from "../../../../src/Components/Toast/index";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadingImg from './loading.gif'
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { ViewList } from '@material-ui/icons';

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
        // maxWidth: "500px",
        // minWidth: "400px",
        // margin: "100vh auto 0px auto"
        margin: "0 auto",
        width: "90%",
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
    const [rowUser, setRowUser] = React.useState([])
    // Handle Edit Record Modal
    const [openEditModal, setOpenEditModal] = React.useState(false);
    // view all list Modal
    const [openViewAllModal, setOpenViewAllModal] = useState(false);

    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [isloading, setLoading] = React.useState(false);
    let searchkey = null || ''
    const [pageNum, setpageNum] = React.useState(0)
    const [pagesize, setpagesize] = React.useState(20)
    const [hasmore, sethasmore] = React.useState(true)

    const [inProcessData, setInProcessData] = React.useState(false)
    const [approvedData, setApprovedData] = React.useState(false)
    const [tabledata, setTableData] = React.useState(true)
    const [alldata, setAlldata] = React.useState([]);
    const [searchOptions, setsearchOptions] = useState([])

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

    }, [searchOptions, searchkey]);

    React.useEffect(() => {
        getSearchOption()
        getAllInventoryget(0)
    }, []);

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
        let responseJSON1 = await response1.json();
        setRowUser(responseJSON1._embedded.onboardings)

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
        let responseJSON1 = await response1.json();
        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget(0)

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    // search bar code start from her
    const getSearchOption = async function (pageNum1) {
        let response1 = await apiCall("useronboarding/onboardingHoldingsListings", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON1 = await response1.json();
        setsearchOptions(responseJSON1.map(ssa => ssa.name))
        if(searchkey === null){
            setsearchOptions("")
        }else {
            setsearchOptions([...searchOptions])
        }
    }
    // search bar code end here

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("onboardings/" + editedData.id, 'DELETE', '', history)
        let responseJSON1 = await response1.json();
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget(0)
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

    const getAllInventoryadd = async function () {
        let response1 = await apiCall("onboardings", 'POST', editedData, history)
        let responseJSON1 = await response1.json();
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

    const viewAllRecordModal = (userobject) => {
        setEditedData(userobject);
        setOpenViewAllModal(true);
    }

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
        // e.preventDefault();
        //it triggers by pressing the enter key
        if(searchkey == e.target.value) {
            //do nothing
            return
        }
        if(searchOptions.includes(e.target.value)) {
            searchkey = e.target.value
            //handleSubmit();
            setpageNum(0)
            getAllInventoryget(0)
        }
    };

    const handleKeypress = e => {
        // e.preventDefault();
        //it triggers by pressing the enter key
        if (e.code === "Enter") {
            searchkey = e.target.value
            //handleSubmit();
            setpageNum(0)
            getAllInventoryget(0)
            e.preventDefault();
        }

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

    return (
        <div className="user_table_section">
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
                                                                           onSelect={(event, value) => handleSelect(event)}
                                                                           className="inventory-search-bar"
                                                                           placeholder="Search Name, Mobile, AccountId"
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
                            variant="outlined"
                            onClick={() => {
                                setTableData(true)
                                setApprovedData(false)
                                setInProcessData(false)
                            }} />

                        <Chip className='px-2 mx-1 ' label="Not-Verified"
                            variant="outlined"
                            onClick={() => {
                                filterData("notVerified")
                                setApprovedData(false)
                                setInProcessData(true)
                                setTableData(false)
                            }} />
                        <Chip className='px-2 mx-1 ' label="Verified"
                            variant="outlined"
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
                                {(tabledata ? rowUser : alldata).map(
                                    (user, index) => (
                                        <TableRow key={index} id={user.id}>
                                            <TableCell>
                                                {isload ?
                                                    <div className="UserProfile">
                                                        <div className="UserIcon">
                                                            <img src={user.profilePic} />
                                                        </div>
                                                    </div>
                                                    :
                                                    <Skeleton circle={true} height={50} width={50} />
                                                }
                                            </TableCell>
                                            <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>

                                            <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                                            {/* <TableCell>{isload ? <> {user.userType} </> : <Skeleton width={100} />}</TableCell> */}
                                            <TableCell>{isload ? <> {user.accountId} </> : <Skeleton width={100} />}</TableCell>

                                            <TableCell>{isload ? <> {user.uaVerifiedStatus} </> : <Skeleton width={100} />}</TableCell>

                                            <TableCell>{isload ? <> {user.isUserAccountActive + ""} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell >
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
                                                        <button className='btn btn-sm btn-info' onClick={() => viewAllRecordModal(user)}>
                                                            <ViewListIcon />
                                                        </button>:
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
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">Name -</label>
                                            <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">userType -</label>
                                            <input type="text" value={editedData.userType} onChange={(e) => handleChange("userType", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <input type="text" value={editedData.accountId} onChange={(e) => handleChange("accountId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerifiedStatus -</label>
                                            <input type="text" value={editedData.uaVerifiedStatus} onChange={(e) => handleChange("uaVerifiedStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">bussinessName -</label>
                                            <input type="text" value={editedData.bussinessName} onChange={(e) => handleChange("bussinessName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">mobileNumber -</label>
                                            <input type="text" value={editedData.mobileNumber} onChange={(e) => handleChange("mobileNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">residentStatus -</label>
                                            <input type="text" value={editedData.residentStatus} onChange={(e) => handleChange("residentStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">email -</label>
                                            <input type="text" value={editedData.email} onChange={(e) => handleChange("email", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">notificationsChoice -</label>
                                            <input type="text" value={editedData.notificationsChoice} onChange={(e) => handleChange("notificationsChoice", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">dob -</label>
                                            <input type="text" value={editedData.dob} onChange={(e) => handleChange("dob", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">spouseFatherName -</label>
                                            <input type="text" value={editedData.spouseFatherName} onChange={(e) => handleChange("spouseFatherName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">panNumber -</label>
                                            <input type="text" value={editedData.panNumber} onChange={(e) => handleChange("panNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">aadharNumber -</label>
                                            <input type="text" value={editedData.aadharNumber} onChange={(e) => handleChange("aadharNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayTransactionId -</label>
                                            <input type="text" value={editedData.nuPayTransactionId} onChange={(e) => handleChange("nuPayTransactionId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayReferenceNumber -</label>
                                            <input type="text" value={editedData.nuPayReferenceNumber} onChange={(e) => handleChange("nuPayReferenceNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nsdlAccount -</label>
                                            <input type="text" value={editedData.nsdlAccount} onChange={(e) => handleChange("nsdlAccount", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isUserAccountActive -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isUserAccountActive}
                                                   onChange={(e) => {
                                                       handleChange("isUserAccountActive", e.target.checked)
                                                   }} />
                                        </div>



                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isResidentStatusVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isResidentStatusVerified}
                                                   onChange={(e) => {
                                                       handleChange("isResidentStatusVerified", e.target.checked)
                                                   }} />
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isPanNumberVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isPanNumberVerified}
                                                   onChange={(e) => {
                                                       handleChange("isPanNumberVerified", e.target.checked)
                                                   }} />
                                        </div>


                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhone -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAadharLinkedPhone}
                                                   onChange={(e) => {
                                                       handleChange("isAadharLinkedPhone", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhonOTPSent -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAadharLinkedPhonOTPSent}
                                                   onChange={(e) => {
                                                       handleChange("isAadharLinkedPhonOTPSent", e.target.checked)
                                                   }} />
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAAdharNumberVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAAdharNumberVerified}
                                                   onChange={(e) => {
                                                       handleChange("isAAdharNumberVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAddressVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAddressVerified}
                                                   onChange={(e) => {
                                                       handleChange("isAddressVerified", e.target.checked)
                                                   }} />

                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBankVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isBankVerified}
                                                   onChange={(e) => {
                                                       handleChange("isBankVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBusinessNameVerified -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isBusinessNameVerified}
                                                   onChange={(e) => {
                                                       handleChange("isBusinessNameVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isEmailVerified -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isEmailVerified}
                                                   onChange={(e) => {
                                                       handleChange("isEmailVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isMobileVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isMobileVerified}
                                                   onChange={(e) => {
                                                       handleChange("isMobileVerified", e.target.checked)
                                                   }} />
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
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">Name -</label>
                                            <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">userType -</label>
                                            <input type="text" value={editedData.userType} onChange={(e) => handleChange("userType", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <input type="text" value={editedData.accountId} onChange={(e) => handleChange("accountId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerifiedStatus -</label>
                                            <input type="text" value={editedData.uaVerifiedStatus} onChange={(e) => handleChange("uaVerifiedStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">bussinessName -</label>
                                            <input type="text" value={editedData.bussinessName} onChange={(e) => handleChange("bussinessName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">mobileNumber -</label>
                                            <input type="text" value={editedData.mobileNumber} onChange={(e) => handleChange("mobileNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">residentStatus -</label>
                                            <input type="text" value={editedData.residentStatus} onChange={(e) => handleChange("residentStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nsdlAccount -</label>
                                            <input type="text" value={editedData.nsdlAccount} onChange={(e) => handleChange("nsdlAccount", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">email -</label>
                                            <input type="text" value={editedData.email} onChange={(e) => handleChange("email", e.target.value)}
                                                   className="form-control" />
                                        </div>


                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">notificationsChoice -</label>
                                            <input type="text" value={editedData.notificationsChoice} onChange={(e) => handleChange("notificationsChoice", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">dob -</label>
                                            <input type="text" value={editedData.dob} onChange={(e) => handleChange("dob", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">spouseFatherName -</label>
                                            <input type="text" value={editedData.spouseFatherName} onChange={(e) => handleChange("spouseFatherName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">panNumber -</label>
                                            <input type="text" value={editedData.panNumber} onChange={(e) => handleChange("panNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">aadharNumber -</label>
                                            <input type="text" value={editedData.aadharNumber} onChange={(e) => handleChange("aadharNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayTransactionId -</label>
                                            <input type="text" value={editedData.nuPayTransactionId} onChange={(e) => handleChange("nuPayTransactionId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayReferenceNumber -</label>
                                            <input type="text" value={editedData.nuPayReferenceNumber} onChange={(e) => handleChange("nuPayReferenceNumber", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-3">
                                            <label className="m-0 mt-2 text-small">isUserAccountActive -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isUserAccountActive}
                                                   onChange={(e) => {
                                                       handleChange("isUserAccountActive", e.target.checked)
                                                   }} />
                                        </div>



                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isResidentStatusVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isResidentStatusVerified}
                                                   onChange={(e) => {
                                                       handleChange("isResidentStatusVerified", e.target.checked)
                                                   }} />
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isPanNumberVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isPanNumberVerified}
                                                   onChange={(e) => {
                                                       handleChange("isPanNumberVerified", e.target.checked)
                                                   }} />
                                        </div>


                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhone -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAadharLinkedPhone}
                                                   onChange={(e) => {
                                                       handleChange("isAadharLinkedPhone", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhonOTPSent -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAadharLinkedPhonOTPSent}
                                                   onChange={(e) => {
                                                       handleChange("isAadharLinkedPhonOTPSent", e.target.checked)
                                                   }} />
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAAdharNumberVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAAdharNumberVerified}
                                                   onChange={(e) => {
                                                       handleChange("isAAdharNumberVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAddressVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isAddressVerified}
                                                   onChange={(e) => {
                                                       handleChange("isAddressVerified", e.target.checked)
                                                   }} />

                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBankVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isBankVerified}
                                                   onChange={(e) => {
                                                       handleChange("isBankVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBusinessNameVerified -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isBusinessNameVerified}
                                                   onChange={(e) => {
                                                       handleChange("isBusinessNameVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isEmailVerified -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isEmailVerified}
                                                   onChange={(e) => {
                                                       handleChange("isEmailVerified", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isMobileVerified -</label>

                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isMobileVerified}
                                                   onChange={(e) => {
                                                       handleChange("isMobileVerified", e.target.checked)
                                                   }} />
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
            {/* *********View All Modal********* */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openViewAllModal}
                onClose={() => setOpenViewAllModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openViewAllModal}>
                    <div className={classes.paper}>
                        <div className="text-center modal-header p-1 text-center">
                            <h5 className="text-primary-default text-center w-100"><b>View All Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">ID -</label>
                                            <h6>{editedData.id ? editedData.id : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">name -</label>
                                            <h6>{editedData.name ? editedData.name : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">bussinessName -</label>
                                            <h6>{editedData.bussinessName ? editedData.bussinessName : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">mobileNumber -</label>
                                            <h6>{editedData.mobileNumber ? editedData.mobileNumber : 'NA'}</h6>
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">residentStatus -</label>
                                            <h6>{editedData.residentStatus ? editedData.residentStatus : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nsdlAccount -</label>
                                            <h6>{editedData.nsdlAccount ? editedData.nsdlAccount : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">email -</label>
                                            <h6>{editedData.email ? editedData.email : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">panNumber -</label>
                                            <h6>{editedData.panNumber ? editedData.panNumber : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">userType -</label>
                                            <h6>{editedData.userType ? editedData.userType : 'NA'}</h6>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <h6>{editedData.accountId ? editedData.accountId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerifiedStatus -</label>
                                            <h6>{editedData.uaVerifiedStatus ? editedData.uaVerifiedStatus : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">notificationsChoice -</label>
                                            <h6>{editedData.notificationsChoice ? editedData.notificationsChoice : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">dob -</label>
                                            <h6>{editedData.dob ? editedData.dob : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">spouseFatherName -</label>
                                            <h6>{editedData.spouseFatherName ? editedData.spouseFatherName : 'NA'}</h6>
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">aadharNumber -</label>
                                            <h6>{editedData.aadharNumber ? editedData.aadharNumber : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayTransactionId -</label>
                                            <h6>{editedData.nuPayTransactionId ? editedData.nuPayTransactionId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">nuPayReferenceNumber -</label>
                                            <h6>{editedData.nuPayReferenceNumber ? editedData.nuPayReferenceNumber : 'NA'}</h6>
                                        </div>

                                    </div>
                                    <div className='col-4'>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isUserAccountActive -</label>
                                            {editedData.isUserAccountActive ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isResidentStatusVerified -</label>
                                            {editedData.isResidentStatusVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isPanNumberVerified -</label>
                                            {editedData.isPanNumberVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhone -</label>
                                            {editedData.isAadharLinkedPhone ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAadharLinkedPhonOTPSent -</label>
                                            {editedData.isAadharLinkedPhonOTPSent ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAAdharNumberVerified -</label>
                                            {editedData.isAAdharNumberVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isAddressVerified -</label>
                                            {editedData.isAddressVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBankVerified -</label>
                                            {editedData.isBankVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isBusinessNameVerified -</label>
                                            {editedData.isBusinessNameVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isEmailVerified -</label>
                                            {editedData.isEmailVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isMobileVerified -</label>
                                            {editedData.isMobileVerified ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={() => setOpenViewAllModal(false)} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
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
            {loader}
            {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null}
        </div>
    )
}