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
import { apiCall, apiCall12, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loadbutton from '../../Loadbutton/Index';
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { successToast, errorToast } from "../../../../src/Components/Toast/index";
import FeatureManager from "./ProofManager/Index";
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
        // margin: "50vh auto 0px auto"
        margin: "0 auto",
        width: '80%',
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

    // View All Record Modal
    const [openViewAllModal, setOpenViewAllModal] = useState(false);
    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [openFeatureModal, setOpenFeatureModal] = useState(false);
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

    const handleOpenFeatureModal = (userobject) => {
        setEditedData(userobject)
        setOpenFeatureModal(true);
    };

    const handleCloseFeatureModal = () => {
        setOpenFeatureModal(false);
    };

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
        let response1 = await apiCall12("myHoldings/search/findAllHoldingsSearchAdmin?searchKey=" + searchkey + "&page=" + pageNum1 + "&size=" + pagesize, 'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();

        // console.log(responseJSON1._embedded.companies)

        if (pageNum1 == 0) {
            setRowUser(responseJSON1._embedded.myHoldings)
        } else {
            responseJSON1._embedded.myHoldings.map(record => rowUser.push(record));
            setRowUser([...rowUser])
        }

        setpageNum(pageNum + 1)

        if ((responseJSON1._embedded.myHoldings.length % pagesize) != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }
        setLoading(false)
        setLoad(true)
    }

    // search bar code start from here

    const getSearchOption = async function () {
        let response1 = await apiCall("myholding/dashboardHoldingsListings", 'GET', '', history)
        // let response1 = await apiCall("useronboarding/onboardingHoldingsListings", 'GET', '', history)
        // console.log(response1)
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



    const getAllInventoryupdate = async function (id) {
        let response1 = await apiCall("myHoldings/" + editedData.id, 'PUT', editedData, history)
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

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("myHoldings/" + editedData.id, 'DELETE', '', history)
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
        let response1 = await apiCall("myHoldings", 'POST', editedData, history)
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
    const viewAllRecordModal = (userobject) => {
        setEditedData(userobject);
        setOpenViewAllModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };


    const handleSelect = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        console.log("aspp"+e.target.value+"dddddddd"+searchkey)

        if(searchkey == e.target.value) {
            //do nothing
            return
        }
        if(searchOptions.includes(e.target.value)) {
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
        const updatedFilterData = rowUser.filter((curElem) => {
            return curElem.uaVerificationStatus === filterStatus
        })
        setAlldata(updatedFilterData)
    }

    return (
        <div className="user_table_section">

            <div className="dbmn">
                <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        {/* <h6><strong> All Holdings </strong></h6> */}
                        <h5 className='main-heading'><b>Holdings Manager</b></h5>

                        {/* <div className="form-group has-search mb-0 ml-3 small-icon w-50">
                            <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                            <input type="text" className="form-control text-small"
                                placeholder="Search here for verification Status, Company Name, Account Id..."
                                onKeyPress={handleKeypress} />
                        </div> */}
                    </div>
                </div>
            </div>

            <div className='row d-flex justify-content-end'>
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
                                                                           placeholder="Search Company Name, Account ID, Status - Approved, InProcess"
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
                <div className='col-md-6 px-0 d-flex align-items-center justify-content-end marketplace-Chip-main'>
                    <div className='d-flex marketplace-Chips m-0'>
                        <Chip className='px-2 mx-1 ' label="All Holding"
                            variant="outlined"
                            onClick={() => {
                                setTableData(true)
                                setApprovedData(false)
                                setInProcessData(false)
                            }} />

                        <Chip className='px-2 mx-1 ' label="In-Progress"
                            variant="outlined"
                            onClick={() => {
                                filterData("InProcess")
                                setApprovedData(false)
                                setInProcessData(true)
                                setTableData(false)
                            }} />
                        <Chip className='px-2 mx-1 ' label="Approved"
                            variant="outlined"
                            onClick={() => {
                                filterData("Approved")
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
                </div >
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
                                {(tabledata?rowUser:alldata).map(
                                    (user, index) => (
                                        <>

                                            <TableRow key={index} id={user.id}>
                                                <TableCell>
                                                    {isload ?
                                                        <div className="UserProfile">
                                                            <div className="UserIcon">
                                                                <img src={user.companyLogo} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <Skeleton circle={true} height={50} width={50} />
                                                    }
                                                </TableCell>

                                                <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>

                                                <TableCell>{isload ? <> {user.accountId} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.companyName} </> : <Skeleton width={100} />}</TableCell>
                                                {/*<TableCell>{ isload ? <> {user.companyLogo} </> : <Skeleton width={100} /> }</TableCell>*/}
                                                {/* <TableCell>{isload ? <> {user.commodityName} </> : <Skeleton width={100} />}</TableCell> */}
                                                <TableCell>{isload ? <> {user.qtyTotal} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.qtySale} </> : <Skeleton width={100} />}</TableCell>
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
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenFeatureModal(user)}>
                                                                Holding Proof
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>

                                                {/* <TableCell>{isload ? <> {user.qtyFreezed} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.isDemated + ""} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.isVested + ""} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.specialConditionTransfer} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.createDate} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.updateDate} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.uaVerificationStatus} </> : <Skeleton width={100} />}</TableCell>

                                                    <TableCell>{isload ? <> {user.uaVerificationRemark} </> : <Skeleton width={100} />}</TableCell>
                                                    <TableCell>{isload ? <> {user.tradeId} </> : <Skeleton width={100} />}</TableCell> */}

                                            </TableRow>


                                        </>
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
                open={openFeatureModal}
                onClose={handleCloseFeatureModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <FeatureManager company={editedData} />
            </Modal>

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
                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <input type="text" value={editedData.accountId} onChange={(e) => handleChange("accountId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">companyName -</label>
                                            <input type="text" value={editedData.companyName} onChange={(e) => handleChange("companyName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">companyLogo -</label>
                                            <input type="text" value={editedData.companyLogo} onChange={(e) => handleChange("companyLogo", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">commodityName -</label>
                                            <input type="text" value={editedData.commodityName} onChange={(e) => handleChange("commodityName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyTotal -</label>
                                            <input type="text" value={editedData.qtyTotal} onChange={(e) => handleChange("qtyTotal", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtySale -</label>
                                            <input type="text" value={editedData.qtySale} onChange={(e) => handleChange("qtySale", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyFreezed -</label>
                                            <input type="text" value={editedData.qtyFreezed} onChange={(e) => handleChange("qtyFreezed", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">specialConditionTransfer -</label>
                                            <input type="text" value={editedData.specialConditionTransfer} onChange={(e) => handleChange("specialConditionTransfer", e.target.value)}
                                                   className="form-control" />
                                        </div>


                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationStatus -</label>
                                            <input type="text" value={editedData.uaVerificationStatus} onChange={(e) => handleChange("uaVerificationStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationRemark -</label>
                                            <input type="text" value={editedData.uaVerificationRemark} onChange={(e) => handleChange("uaVerificationRemark", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">tradeId -</label>
                                            <input type="text" value={editedData.tradeId} onChange={(e) => handleChange("tradeId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-4">
                                            <label className="m-0 mt-2 text-small">isDemated -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isDemated}
                                                   onChange={(e) => {
                                                       // console.log("123232323232323232" + e.target.checked)
                                                       handleChange("isDemated", e.target.checked)
                                                   }} />

                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center">
                                            <label className="m-0 mt-2 text-small">isVested -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isVested}
                                                   onChange={(e) => {
                                                       // console.log("123232323232323232" + e.target.checked)
                                                       handleChange("isVested", e.target.checked)
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
                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <input type="text" value={editedData.accountId} onChange={(e) => handleChange("accountId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">companyName -</label>
                                            <input type="text" value={editedData.companyName} onChange={(e) => handleChange("companyName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">companyLogo -</label>
                                            <input type="text" value={editedData.companyLogo} onChange={(e) => handleChange("companyLogo", e.target.value)}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">commodityName -</label>
                                            <input type="text" value={editedData.commodityName} onChange={(e) => handleChange("commodityName", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyTotal -</label>
                                            <input type="text" value={editedData.qtyTotal} onChange={(e) => handleChange("qtyTotal", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtySale -</label>
                                            <input type="text" value={editedData.qtySale} onChange={(e) => handleChange("qtySale", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyFreezed -</label>
                                            <input type="text" value={editedData.qtyFreezed} onChange={(e) => handleChange("qtyFreezed", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">specialConditionTransfer -</label>
                                            <input type="text" value={editedData.specialConditionTransfer} onChange={(e) => handleChange("specialConditionTransfer", e.target.value)}
                                                   className="form-control" />
                                        </div>


                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationStatus -</label>
                                            <input type="text" value={editedData.uaVerificationStatus} onChange={(e) => handleChange("uaVerificationStatus", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationRemark -</label>
                                            <input type="text" value={editedData.uaVerificationRemark} onChange={(e) => handleChange("uaVerificationRemark", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">tradeId -</label>
                                            <input type="text" value={editedData.tradeId} onChange={(e) => handleChange("tradeId", e.target.value)}
                                                   className="form-control" />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-3">
                                            <label className="m-0 mt-2 text-small">isDemated -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isDemated}
                                                   onChange={(e) => {
                                                       // console.log("123232323232323232" + e.target.checked)
                                                       handleChange("isDemated", e.target.checked)
                                                   }} />
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isVested -</label>
                                            <input id="styled-checkbox-2" type="checkbox" checked={editedData.isVested}
                                                   onChange={(e) => {
                                                       // console.log("123232323232323232" + e.target.checked)
                                                       handleChange("isVested", e.target.checked)
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
                            <div className="UserProfile">
                                <div className="UserIcon">
                                    <img src={editedData.companyLogo}  style={{borderRadius: '0'}}/>
                                </div>
                            </div>
                            <h5 className="text-primary-default text-center w-100"><b>View All Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">ID -</label>
                                            <h6>{editedData.id ? editedData.id : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">accountId -</label>
                                            <h6>{editedData.accountId ? editedData.accountId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">companyName -</label>
                                            <h6>{editedData.companyName ? editedData.companyName : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyFreezed -</label>
                                            <h6>{editedData.qtyFreezed ? editedData.qtyFreezed : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">specialConditionTransfer -</label>
                                            <h6>{editedData.specialConditionTransfer ? editedData.specialConditionTransfer : 'NA'}</h6>
                                        </div>

                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">createDate -</label>
                                            <h6>{editedData.createDate ? editedData.createDate : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">updateDate -</label>
                                            <h6>{editedData.updateDate ? editedData.updateDate : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationStatus -</label>
                                            <h6>{editedData.uaVerificationStatus ? editedData.uaVerificationStatus : 'NA'}</h6>
                                        </div>

                                    </div>

                                    <div className='col-6'>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtyTotal -</label>
                                            <h6>{editedData.qtyTotal ? editedData.qtyTotal : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">qtySale -</label>
                                            <h6>{editedData.qtySale ? editedData.qtySale : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">commodityName -</label>
                                            <h6>{editedData.commodityName ? editedData.commodityName : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">uaVerificationRemark -</label>
                                            <h6>{editedData.uaVerificationRemark ? editedData.uaVerificationRemark : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row">
                                            <label className="m-0 mt-2 text-small">tradeId -</label>
                                            <h6>{editedData.tradeId ? editedData.tradeId : 'NA'}</h6>
                                        </div>
                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isDemated -</label>
                                            {editedData.isDemated ? <Chip label="true" color="success" />
                                                : <Chip label="false" color="warning" />}
                                        </div>

                                        <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                            <label className="m-0 mt-2 text-small">isVested -</label>
                                            {editedData.isVested ? <Chip label="true" color="success" />
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