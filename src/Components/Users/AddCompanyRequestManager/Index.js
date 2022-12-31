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
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
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

    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [openFeatureModal, setOpenFeatureModal] = useState(false);
    const [isloading, setLoading] = React.useState(false);
    let searchkey = ''

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
        getAllInventoryget()
    }, []);


    const getAllInventoryget = async function () {
        setLoading(true)
        let response1 = await apiCall("addCompanies", 'GET', '', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1._embedded.addCompanies)
        setRowUser(responseJSON1._embedded.addCompanies)
        setLoading(false)
        setLoad(true);
    }

    const getAllInventoryupdate = async function (id) {
        let response1 = await apiCall("addCompanies/" + editedData.id, 'PUT', editedData, history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget()

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("addCompanies/" + editedData.id, 'DELETE', '', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

    const getAllInventoryadd = async function () {
        let response1 = await apiCall("addCompanies", 'POST', editedData, history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
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


    // Add User
    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        //console.log("aaaaaasss"+e.keyCode+e.code)
        if (e.code === "Enter") {


            searchkey = e.target.value
            //handleSubmit();
            //console.log("aaaaaasss11"+searchkey)
            getAllInventoryget()
        }
    };

    return (
        <div className="user_table_section">

            <div className="dbmn">
                <div className='row'>
                    <div className='col-md-8 col-12'>
                        <div className="Table_title">
                            <div className="d-flex align-items-center justify-content-start w-100">
                                <h5 className='main-heading'><b>Company Request Manager</b></h5>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-4 col-12'>
                        <div className="text-right mb-2">
                            <button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>
                                <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="userTable">
                    <TableContainer className={classes.container}>
                        <Table stickyHeader className="bg-white">
                            <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                            {
                                rowUser.map(
                                    (user, index) => (
                                        <TableRow key={index} id={user.id}>

                                            {/*<TableCell>*/}
                                            {/*    { isload ?*/}
                                            {/*        <div className="UserProfile">*/}
                                            {/*            <div className="UserIcon">*/}
                                            {/*                <img src={user.companyLogo} />*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*        :*/}
                                            {/*        <Skeleton circle={true} height={50} width={50} />*/}
                                            {/*    }*/}
                                            {/*</TableCell>*/}

                                            <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.companyName} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.havestock + ""} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.buystock + ""} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> {user.comment} </> : <Skeleton width={100} />}</TableCell>

                                            {/*  <TableCell >*/}
                                            {/*    <div className="d-flex justify-content-between">*/}
                                            {/*    { isload ?*/}
                                            {/*        <button className="btn btn-primary-default mr-2" onClick={() => handleOpenEditModal(user)}>*/}
                                            {/*            <EditIcon/>*/}
                                            {/*        </button>*/}
                                            {/*        :*/}
                                            {/*        <Skeleton square={true} height={30} width={30} />*/}
                                            {/*    }*/}
                                            {/*    { isload ?*/}
                                            {/*        <button className="btn btn-sm btn-danger"  onClick={() => handleOpenDeleteModal(user)}>*/}
                                            {/*        <DeleteIcon />*/}
                                            {/*        </button>*/}
                                            {/*        :*/}
                                            {/*        <Skeleton square={true} height={30} width={30} />*/}
                                            {/*    }*/}

                                            {/*    </div>*/}
                                            {/*</TableCell>*/}

                                        </TableRow>
                                    ))
                            }
                        </Table>
                    </TableContainer>
                </div>
                {/* <button className="btn btn-primary mr-2" onClick={fetchData}>
                Show full page loading spinner
                </button> */}
            </div>
            {/* Edit Record Modal  */}

            {/*<Modal*/}
            {/*    aria-labelledby="transition-modal-title"*/}
            {/*    aria-describedby="transition-modal-description"*/}
            {/*    className={classes.modal}*/}
            {/*    open={openFeatureModal}*/}
            {/*    onClose={handleCloseFeatureModal}*/}
            {/*    closeAfterTransition*/}
            {/*    BackdropComponent={Backdrop}*/}
            {/*    BackdropProps={{*/}
            {/*        timeout: 500,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    /!*<CompanyCompetitorsManager company={editedData}/>*!/*/}
            {/*    <FeatureManager company={editedData}/>*/}
            {/*</Modal>*/}

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
                                    <input type="text" value={editedData.qty} onChange={(e) => handleChange("qty", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">price -</label>
                                    <input type="text" value={editedData.price} onChange={(e) => handleChange("price", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">minBidPriceAccepted -</label>
                                    <input type="text" value={editedData.minBidPriceAccepted} onChange={(e) => handleChange("minBidPriceAccepted", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                    <div className='col-6'>
                                         
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">qtySale -</label>*/}
                                {/*    <input type="text" value={editedData.qtySale}  onChange={(e) => handleChange("qtySale", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">qtyFreezed -</label>
                                    <input type="text" value={editedData.qtyFreezed} onChange={(e) => handleChange("qtyFreezed", e.target.value)}
                                        className="form-control" />
                                </div>

                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">isDemated -</label>*/}
                                {/*    <input  id="styled-checkbox-2" type="checkbox" checked={editedData.isDemated}*/}
                                {/*           onChange={(e) => {*/}
                                {/*        console.log("123232323232323232" + e.target.checked)*/}
                                {/*        handleChange("isDemated", e.target.checked)*/}
                                {/*     }}/>*/}

                                {/*</div>*/}
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">isVested -</label>*/}
                                {/*    <input  id="styled-checkbox-2" type="checkbox" checked={editedData.isVested}*/}
                                {/*            onChange={(e) => {*/}
                                {/*                console.log("123232323232323232" + e.target.checked)*/}
                                {/*                handleChange("isVested", e.target.checked)*/}
                                {/*            }}/>*/}
                                {/*</div>*/}
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
                                    <label className="m-0 mt-2 text-small">tradeType -</label>
                                    <input type="text" value={editedData.tradeType} onChange={(e) => handleChange("tradeType", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">tradeStatus -</label>
                                    <input type="text" value={editedData.tradeStatus} onChange={(e) => handleChange("tradeStatus", e.target.value)}
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
                                    <input type="text" value={editedData.qty} onChange={(e) => handleChange("qty", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">price -</label>
                                    <input type="text" value={editedData.price} onChange={(e) => handleChange("price", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">minBidPriceAccepted -</label>
                                    <input type="text" value={editedData.minBidPriceAccepted} onChange={(e) => handleChange("minBidPriceAccepted", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                    <div className='col-6'>
                                         {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">qtySale -</label>*/}
                                {/*    <input type="text" value={editedData.qtySale}  onChange={(e) => handleChange("qtySale", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">qtyFreezed -</label>
                                    <input type="text" value={editedData.qtyFreezed} onChange={(e) => handleChange("qtyFreezed", e.target.value)}
                                        className="form-control" />
                                </div>

                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">isDemated -</label>*/}
                                {/*    <input  id="styled-checkbox-2" type="checkbox" checked={editedData.isDemated}*/}
                                {/*           onChange={(e) => {*/}
                                {/*        console.log("123232323232323232" + e.target.checked)*/}
                                {/*        handleChange("isDemated", e.target.checked)*/}
                                {/*     }}/>*/}

                                {/*</div>*/}
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">isVested -</label>*/}
                                {/*    <input  id="styled-checkbox-2" type="checkbox" checked={editedData.isVested}*/}
                                {/*            onChange={(e) => {*/}
                                {/*                console.log("123232323232323232" + e.target.checked)*/}
                                {/*                handleChange("isVested", e.target.checked)*/}
                                {/*            }}/>*/}
                                {/*</div>*/}
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
                                    <label className="m-0 mt-2 text-small">tradeType -</label>
                                    <input type="text" value={editedData.tradeType} onChange={(e) => handleChange("tradeType", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">tradeStatus -</label>
                                    <input type="text" value={editedData.tradeStatus} onChange={(e) => handleChange("tradeStatus", e.target.value)}
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