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
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 1),
        borderRadius: "10px",
        maxWidth: "500px",
        minWidth: "400px",
        margin: "0px 10px"
    },
}));
export default function InventoryTableContent(props) {

    let history = useHistory();
    const classes = useStyles();
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('company');
    const [isload, setLoad] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editedData, setEditedData] = useState({});
    // Handle Add Reacord  Modal
    const [openAddModal, setOpenAddModal] = useState(false);
    const [rowUser, setRowUser] = useState([])
    // Handle Edit Record Modal
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isloading, setLoading] = useState(false);
    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    let searchkey = ''
    const [pageNum, setpageNum] = useState(0)
    const [pagesize, setpagesize] = useState(20)
    const [hasmore, sethasmore] = useState(true)

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
        getSearchOption()
        getAllInventoryget(0)
    }, []);

    // search bar code start from here

const [searchOptions, setsearchOptions] = useState([])

const getSearchOption = async function () {
    let response1 = await apiCall("useronboarding/userRoleMappingsListings", 'GET', '', history)
    // console.log(response1)
    if (response1.status == undefined) {
        // errorToast("Invalid", "Invalid User ID or password");
        return
    }
    let responseJSON1 = await response1.json();
    console.log("user role mappning", responseJSON1)

    setsearchOptions(responseJSON1.map(ssa => ssa.name))
    if(searchkey === null){
        setsearchOptions("")
    }else {
        setsearchOptions([...searchOptions])
    }
}
// search bar code end here

    const getAllInventoryget = async function (pageNum1) {

        if (pageNum1 != undefined && pageNum1 == 0) {
            setpageNum(0)
            setRowUser([])
        } else {
            pageNum1 = pageNum
        }
        setLoading(true)
        let response1 = await apiCall12("users/search/findAllUserSearchAdmin?searchKey=" + searchkey + "&page=" + pageNum1 + "&size=" + pagesize, 'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();

        // console.log(responseJSON1._embedded.companies)

        if (pageNum1 == 0) {
            setRowUser(responseJSON1._embedded.users)
        } else {
            responseJSON1._embedded.users.map(record => rowUser.push(record));
            setRowUser([...rowUser])
        }


        setpageNum(pageNum + 1)

        if ((responseJSON1._embedded.users.length % pagesize) != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }
        setLoading(false)
        setLoad(true)

    }

    const getAllInventoryupdate = async function (id) {
        let response1 = await apiCall("users/" + editedData.id, 'PUT', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget()

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("users/" + editedData.id, 'DELETE', '', history)
        // console.log(response1)
        // let responseJSON1 = await response1.json();
        setOpenDeleteModal(false)
        // console.log(responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");
        }
    }

    const getAllInventoryadd = async function () {

        editedData.password = 'abcdefgh123456'

        let response1 = await apiCall("users", 'POST', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 201) {
            successToast("Success", "Added successfully!!")
            getAllInventoryget()
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
        console.log("aspp"+e.target.value+"dddddddd"+searchkey)

        if(searchkey == e.target.value) {
            //do nothing
            return
        }
        if(searchOptions.includes(e.target.value)) {
            searchkey = e.target.value
            //handleSubmit();
            // console.log("aaaaaasss112" + searchkey)
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
            console.log("aaaaaasss11" + searchkey)
            getAllInventoryget(0)
            e.preventDefault();
        }

    };

    const fetchMoreData = () => {
        getAllInventoryget()
    };

    return (
        <div className="user_table_section">

            <div className="dbmn">
                <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <h5 className='main-heading'><b>User Manager</b></h5>
                    </div>
                </div>
                <div className="Table_title mt-1">
                    <div className="d-flex align-items-center justify-content-between w-100" >
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
                                                        style={{ width: 1000 }}
                                                        freeSolo
                                                        options={searchOptions}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                onSelect={(event, value) => handleSelect(event)}
                                                                className="inventory-search-bar"
                                                                placeholder="Search Name, Mobile"
                                                                // onKeyDown={(event, value) => handleKeypress(event)}
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

            <div className="text-right mb-2">
                <button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>
                    <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                </button>
            </div>
            <div className="table-container">
                <div className="userTable">
                    <TableContainer className={classes.container}>
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
                                {
                                    rowUser.map(
                                        (user, index) => (
                                            <TableRow key={index} id={user.id}>
                                                {/*<TableCell>*/}
                                                {/*{ isload ?*/}
                                                {/*    <div className="UserProfile">*/}
                                                {/*        <div className="UserIcon">*/}
                                                {/*            <img src={UserIcon} />*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*    :*/}
                                                {/*    <Skeleton circle={true} height={50} width={50} />*/}
                                                {/*}*/}
                                                {/*</TableCell>*/}
                                                <TableCell>{isload ? <> {user.username} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.mobile} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.email} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
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
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenDeleteModal(user)}>
                                                                <DeleteIcon />
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
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
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Name -</label>
                                    <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Username -</label>
                                    <input type="text" value={editedData.username} onChange={(e) => handleChange("username", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Mobile Number -</label>
                                    <input type="text" value={editedData.mobile} onChange={(e) => handleChange("mobile", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Email -</label>
                                    <input type="text" value={editedData.email} onChange={(e) => handleChange("email", e.target.value)}
                                        className="form-control" />
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
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Name -</label>
                                    <input type="text" placeholder="Enter Name" onChange={(e) => handleChange("name", e.target.value)}
                                        className="form-control text-small" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Username -</label>
                                    <input type="text" placeholder="Enter Username" onChange={(e) => handleChange("username", e.target.value)}
                                        className="form-control text-small" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Mobile Number -</label>
                                    <input type="text" placeholder="Enter Mobile Number" onChange={(e) => handleChange("mobile", e.target.value)}
                                        className="form-control text-small" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Email -</label>
                                    <input type="text" placeholder="Enter Email" onChange={(e) => handleChange("email", e.target.value)}
                                        className="form-control text-small" />
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