import React, {useEffect, useState} from 'react';
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
import "../../../../Components/FilterCard/filterCard.css"
import Buttons from "../../../../Components/Buttons"
import {BrowserRouter as Router,useHistory} from "react-router-dom";
import './Index.css'
import UserIcon from './user.png';
import { getBaseurL, apiCall, apiCall1, apiCall12, apiCall25, apiCall26, downloadurl, setAccessToken } from "../../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loadbutton from '../../../Loadbutton/Index';
import useFullPageLoader from "../../../../hooks/useFullPageLoader";
import { successToast, errorToast } from "../../../../../src/Components/Toast/index";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 520,
      width: "border-box",
      border: "1px solid #CFCBCF",
      borderRadius:"10px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3,1),
        borderRadius: "10px",
        maxWidth:"500px",
        minWidth:"400px",
        margin:"0px 10px"
      },
}));
export default function InventoryTableContent(props){

    let history = useHistory();
    const classes = useStyles();

    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [isload, setLoad] = React.useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editedData, setEditedData] = React.useState({});
    // Handle Add Reacord  Modal
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [rowUser,setRowUser]=React.useState([])
    // Handle Edit Record Modal
    const [openEditModal, setOpenEditModal] = React.useState(false);

    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [openFeatureModal, setOpenFeatureModal] = useState(false);
    const [selectedFeature, setselectedFeature] = useState([]);


    const handleChange1 = (rowObject) => {
        // editedData[field] = val;
        // setEditedData({ ...editedData });
        setEditedData()
    };

    const handleChange = (field, val) => {
        editedData[field] = val;
        setEditedData({ ...editedData });
    };

    React.useEffect(() => {
      const timer = setTimeout(() => {
          setLoad(true);
        }, 2000);
        return () => clearTimeout(timer);
  }, []);


    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }


    React.useEffect(() => {
        getAllInventoryget()
    }, []);

    const getAllInventoryget = async function (){
        let response1 = await apiCall("notificationUserCategories",'GET', '', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1._embedded.notificationUserCategories)
        setRowUser(responseJSON1._embedded.notificationUserCategories)

        let response2 = await apiCall("notificationUsers/"+props.company.id+"/notificationUserCategories",'GET', '', history)
        //console.log(response2)
        let responseJSON2 = await response2.json();
        // console.log(responseJSON1._embedded.features)
        setselectedFeature(responseJSON2._embedded.notificationUserCategories.map(record=>record.id))
    }

    const getAllSelectedCategories = async function (){
        // let response1 = await apiCall("notificationUserCategories",'GET', '', history)
        // console.log(response1)
        // let responseJSON1 = await response1.json();
        // console.log(responseJSON1._embedded.notificationUserCategories)
        // setRowUser(responseJSON1._embedded.notificationUserCategories)

        let response2 = await apiCall("notificationUsers/"+props.company.id+"/notificationUserCategories",'GET', '', history)
        //console.log(response2)
        let responseJSON2 = await response2.json();
        //console.log(responseJSON2._embedded.notificationUserCategories)
        setselectedFeature(responseJSON2._embedded.notificationUserCategories.map(record=>record.id))
    }

    const getAllInventoryupdate = async function (user){
        // await setselectedFeature(id)
        // selectedFeature.push(user.id)
        let a = []

        let recordFound = selectedFeature.indexOf(user.id)

        if(recordFound == -1) {
            //not found
            selectedFeature.push(user.id)
            a = selectedFeature
        } else {
            //found
            a = selectedFeature.filter(id => id != user.id)
        }


        var putRequestLine = '';
        a.forEach(id => {
            putRequestLine += getBaseurL() + id+'\n';
        });


        //console.log(putRequestLine)

        let response2 = await apiCall26("notificationUsers/"+props.company.id+"/notificationUserCategories",'PUT',
            putRequestLine, history)


        if (response2.status === 204) {

            if(recordFound == -1) {
                //not found
                successToast("Success", "successfully linked Notification User with Notification User Category!!")

            } else {
                //found
                successToast("Success", "successfully De-linked Notification User with Notification User Category!!")
            }
            getAllSelectedCategories()

        } else {
            errorToast("Invalid", "Not Done...try after some time or contact Admin");
        }
    }

    // const getAllInventorydelete = async function (id){
    //     let response1 = await apiCall("features/"+editedData.id,'DELETE', '', history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     if (response1.status === 204) {
    //         successToast("Success", "Deleted successfully!!")
    //         getAllInventoryget()
    //     } else {
    //         errorToast("Invalid", "Not Deleted...try after some time or contact Admin");
    //
    //     }
    // }

    // const getAllInventoryadd = async function (){
    //     let response1 = await apiCall("features",'POST', editedData, history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     if (response1.status === 201) {
    //         successToast("Success", "Added successfully!!")
    //         let response2 = await apiCall25(responseJSON1._links.module.href,'PUT', "modules/"
    //             +props.company.id, history)
    //
    //         getAllInventoryget()
    //         setOpenAddModal(false);
    //     } else {
    //         errorToast("Invalid", "Not Added...try after some time or contact Admin");
    //
    //     }
    // }

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

    return(
      <div className="user_table_section">
          <div className="text-right mb-2">
            {/*<button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>*/}
            {/*    <AddIcon style={{width:"25px", height:"25px"}}/> Add New Record*/}
            {/*</button>*/}
          </div>
              <div className="table-container">
                <div className="userTable">
                  <TableContainer className={classes.container}>
                    <Table stickyHeader className="bg-white">
                      <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                            rowUser.map(
                                (user,index) => (
                                  <TableRow  onClick={(e) => getAllInventoryupdate(user)} key={index} className={selectedFeature.indexOf(user.id) != -1 ? 'ActiveCurrentUser' : null} id={user.id}>
                                      {/*<TableCell>{ isload ? <> {(user.module == null)?"na":user.module.id} </> : <Skeleton width={100} /> }</TableCell>*/}
                                      {/*<TableCell>{ isload ? <> {(user.module == null)?"na":user.module.name} </> : <Skeleton width={100} /> }</TableCell>*/}
                                      {/*<TableCell>{ isload ? <> {(user.module == null)?"na":user.module.description} </> : <Skeleton width={100} /> }</TableCell>*/}


                                      <TableCell>{ isload ? <> {user.id} </> : <Skeleton width={100} /> }</TableCell>
                                   <TableCell>{ isload ? <> {user.name} </> : <Skeleton width={100} /> }</TableCell>
                                    <TableCell>{ isload ? <> {user.description} </> : <Skeleton width={100} /> }</TableCell>
                                    {/* <TableCell >*/}
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
                                        <label className="m-0 mt-2 text-small">Description -</label>
                                        <input type="text" value={editedData.description} onChange={(e) => handleChange("description", e.target.value)}
                                               className="form-control" />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer p-1">
                                <div className="d-flex align-items-center">
                                    <Buttons.SecondaryButton onClick={handleCloseEditModal} value="Cancel" style={{width:"100%", margin:"0px 3px"}}/>
                                    {!isLoadingbtn && (
                                        <Buttons.PrimaryButton value="Update" style={{width:"100%", margin:"0px 3px"}} onClick={getAllInventoryupdate}/>
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
                                        <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                               className="form-control" />
                                    </div>
                                    <div className="form-control-row">
                                        <label className="m-0 mt-2 text-small">Description -</label>
                                        <input type="text" value={editedData.description} onChange={(e) => handleChange("description", e.target.value)}
                                               className="form-control" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer p-1">
                                {/*<div className="d-flex align-items-center">*/}
                                {/*    <Buttons.SecondaryButton onClick={handleCloseAddModal} value="Cancel" style={{width:"100%", margin:"0px 3px"}}/>*/}
                                {/*    {!isLoadingbtn && (*/}
                                {/*        <Buttons.PrimaryButton value="Submit" style={{width:"100%", margin:"0px 3px"}} onClick={getAllInventoryadd}/>*/}
                                {/*    )}*/}

                                {/*    {isLoadingbtn && (*/}
                                {/*         <Loadbutton />*/}
                                {/*    )}*/}
                                {/*</div>*/}
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
                                <DeleteForeverIcon className="text-danger " style={{width:"70px", height:"70px"}}/>
                                <h4 className="my-3 text-danger">Are You Sure ?</h4>
                                <p className="text-small ">Do you really want to delete these record ? <br/>This process cannot be undone.</p>
                            </div>
                            <div className="modal-footer p-1">
                                {/*<div className="d-flex align-items-center">*/}
                                {/*    <Buttons.SecondaryButton onClick={handleCloseDeleteModal} value="Cancel" style={{width:"100%", margin:"0px 3px"}}/>*/}
                                {/*     {!isLoadingbtn && (*/}
                                {/*        <Buttons.PrimaryButton value="Confirm" style={{width:"100%", margin:"0px 3px"}} onClick={getAllInventorydelete}/>*/}
                                {/*    )}*/}

                                {/*    {isLoadingbtn && (*/}
                                {/*         <Loadbutton />*/}
                                {/*    )}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </Fade>
                </Modal>
                {loader}
      </div>
      )
}