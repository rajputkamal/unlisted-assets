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
import { successToast, errorToast } from "../../Toast/index";
import FeatureManager from "./FeatureManager/Index";

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
        getAllInventoryget()

    }, []);



    // for virtual account 

    const getAllInventoryget = async function () {
        let response1 = await apiCall("virtualAccountBooks", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("response1 virtualAccountBooks all data", response1)
        let responseJSON1 = await response1.json();
        console.log("virtualAccountBooks data resp", responseJSON1._embedded.virtualAccountBooks)
        setRowUser(responseJSON1._embedded.virtualAccountBooks)
        setLoad(true);
    }



    // for virtual account end here

    const getAllInventoryupdate = async function (id) {
        let response1 = await apiCall("virtualAccountBooks/" + editedData.id, 'PUT', editedData, history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget()

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
        handleCloseEditModal()
    }

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("virtualAccountBooks/" + editedData.id, 'DELETE', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        console.log("response1 DELETE", response1)
        // let responseJSON1 = await response1.json();
        // console.log("responseJSON1 DELETE", responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
        handleCloseDeleteModal()
    }

    const getAllInventoryadd = async function () {
        let response1 = await apiCall("virtualAccountBooks", 'POST', editedData, history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        console.log("POST response1", response1)
        // let responseJSON1 = await response1.json();
        // console.log("POST responseJSON1" , responseJSON1)

        if (response1.status === 201) {
            successToast("Success", "Added successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Added...try after some time or contact Admin");

        }
        handleCloseAddModal()

        console.log('editedData', editedData)
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

    const handleOpenFeatureModal = (userobject) => {
        setEditedData(userobject)
        setOpenFeatureModal(true);
    };

    const handleCloseFeatureModal = () => {
        setOpenFeatureModal(false);
    };
    // Add User


    // dumy data 

    const transfermodalData = [
        {
            id: 1,
            withDrawal: 200,
            deposit: 500,
            transfered: 200,
            balance: 100,
            virtualBankDetail: "ULTPLE0000000005",
            createDate: "01/05/2022",
            updateDate: "04/05/2022",
        },
        {
            id: 2,
            withDrawal: 200,
            deposit: 500,
            transfered: 200,
            balance: 100,
            virtualBankDetail: "ULTPLE0000000005",
            createDate: "01/05/2022",
            updateDate: "04/05/2022",

        },
        {
            id: 3,
            withDrawal: 200,
            deposit: 500,
            transfered: 200,
            balance: 100,
            virtualBankDetail: "ULTPLE0000000005",
            createDate: "01/05/2022",
            updateDate: "04/05/2022",

        },
        {
            id: 4,
            withDrawal: 200,
            deposit: 500,
            transfered: 200,
            balance: 100,
            virtualBankDetail: "ULTPLE0000000005",
            createDate: "01/05/2022",
            updateDate: "04/05/2022",

        },
    ]



    // const [list, updateList] = useState(transfermodalData);
    // const [newElement, setNewElement] = useState(
    //     {
    //         id: '',
    //         withDrawal: '',
    //         deposit: '',
    //         transfered: '',
    //         balance: '',
    //         virtualBankDetail: "",
    //         createDate: "",
    //         updateDate: "",
    //     },
    // );

    // const handleRemoveItem = index => {
    //     setOpenDeleteModal(false);
    //     const temp = [...list];
    //     temp.splice(index, 1);
    //     updateList(temp);
    // }
    // const addNewDatainTable = () =>{
    //     updateList([...list,newElement]);
    // }

    // console.log("list", list)
    // console.log("newElement", newElement)


    // dumy data 




    return (
        <div className="user_table_section">
            <div className="text-right mb-2">
                <button className="btn btn-primary-default"
                    onClick={() => handleOpenAddModal({})}>
                    <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                </button>
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

                                            <TableCell>{isload ? <> Rs. {user.amount} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> Rs. {user.amounttransferedFrom} </> : <Skeleton width={100} />}</TableCell>
                                            <TableCell>{isload ? <> Rs. {user.amounttransferedTo} </> : <Skeleton width={100} />}</TableCell>
                                            {/* <TableCell>{ isload ? <> Rs. {user.overAllRemarks} </> : <Skeleton width={100} /> }</TableCell> */}


                                            {/* <TableCell>{isload ? <> Rs. {user.withDrawal} </> : <Skeleton width={100} />}</TableCell> */}
                                            {/* <TableCell>{isload ? <> Rs. {user.deposit} </> : <Skeleton width={100} />}</TableCell> */}
                                            <TableCell>{isload ? <> Rs. {user.depositORWithDrawalReason} </> : <Skeleton width={100} />}</TableCell>
                                            {/* <TableCell>{isload ? <> Rs. {user.transfered} </> : <Skeleton width={100} />}</TableCell> */}
                                            <TableCell>{isload ? <> Rs. {user.balance} </> : <Skeleton width={100} />}</TableCell>
                                            {/* <TableCell>{isload ? <>Rs. {user.freezedAmount} </> : <Skeleton width={100} />}</TableCell> */}
                                            <TableCell>{isload ? <> {user.createDate} </> : <Skeleton width={100} />}</TableCell>
                                            {/* <TableCell>{isload ? <> {user.updateDate} </> : <Skeleton width={100} />}</TableCell> */}
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
                                                        <button className="btn btn-sm btn-danger"


                                                            onClick={() => handleOpenDeleteModal(user)}
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                        :
                                                        <Skeleton square={true} height={30} width={30} />
                                                    }

                                                </div>
                                            </TableCell>
                                            {/* <TableCell >
                                        <div className="d-flex justify-content-between">

                                            { isload ?
                                                <button className="btn btn-sm btn-danger"  onClick={() => handleOpenFeatureModal(user)}>
                                                    Module Features
                                                </button>
                                                :
                                                <Skeleton square={true} height={30} width={30} />
                                            }
                                        </div>
                                      </TableCell> */}
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

                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Involved</label>
                                    <input type="text" value={editedData.amount} onChange={(e) => handleChange("amount", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Transfered From -</label>
                                    <input type="text" value={editedData.amounttransferedFrom} onChange={(e) => handleChange("amounttransferedFrom", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Transfered To</label>
                                    <input type="text" value={editedData.amounttransferedTo} onChange={(e) => handleChange("amounttransferedTo", e.target.value)}
                                        className="form-control" />
                                </div>
                                    {/* <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">deposit</label>
                                    <input type="text" value={editedData.deposit} onChange={(e) => handleChange("deposit", e.target.value)}
                                        className="form-control" />
                                    </div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Deposit OR WithDrawal Reason</label>
                                    <input type="text" value={editedData.depositORWithDrawalReason} onChange={(e) => handleChange("depositORWithDrawalReason", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Balance -</label>
                                    <input type="text" value={editedData.balance} onChange={(e) => handleChange("balance", e.target.value)}
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
                            {/* {
                                amount
                                amounttransferedFrom
                                amounttransferedTo
                                deposit
                                depositORWithDrawalReason
                                balance
                                createDate
                            } */}

                            <form className="w-100">

                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Involved</label>
                                    <input type="text" value={editedData.amount} onChange={(e) => handleChange("amount", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Transfered From -</label>
                                    <input type="text" value={editedData.amounttransferedFrom} onChange={(e) => handleChange("amounttransferedFrom", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Amount Transfered To</label>
                                    <input type="text" value={editedData.amounttransferedTo} onChange={(e) => handleChange("amounttransferedTo", e.target.value)}
                                        className="form-control" />
                                </div>
                                {/* <div className="form-control-row">
                                <label className="m-0 mt-2 text-small">deposit</label>
                                <input type="text" value={editedData.deposit} onChange={(e) => handleChange("deposit", e.target.value)}
                                    className="form-control" />
                            </div>                                                        */}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Deposit OR WithDrawal Reason</label>
                                    <input type="text" value={editedData.depositORWithDrawalReason} onChange={(e) => handleChange("depositORWithDrawalReason", e.target.value)}
                                        className="form-control" />
                                </div>

                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Balance -</label>
                                    <input type="text" value={editedData.balance} onChange={(e) => handleChange("balance", e.target.value)}
                                        className="form-control" />
                                </div>

                            </form>

                            {/* <form className="w-100">
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">withDrawal </label>
                                    <input type="text" value={editedData.withDrawal} onChange={(e) => handleChange("withDrawal", e.target.value)} className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">deposit -</label>
                                    <input type="text" value={editedData.deposit} onChange={(e) => handleChange("deposit", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Transfered</label>
                                    <input type="text" value={editedData.transfered} onChange={(e) => handleChange("transfered", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Balance -</label>
                                    <input type="text" value={editedData.balance} onChange={(e) => handleChange("balance", e.target.value)}
                                        className="form-control" />
                                </div>
                                                                  
                            </form> */}
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
        </div>
    )
}