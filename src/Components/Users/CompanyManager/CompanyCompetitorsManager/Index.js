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
import { apiCall25, apiCall12, apiCall, apiCall1, downloadurl, setAccessToken } from "../../../../Utils/Network"
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
import ChoosePhoto from "./../choosePhoto";
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
    const [openPhotoModal, setOpenPhotoModal] = React.useState(false);

    const handleChange1 = (rowObject) => {
        // editedData[field] = val;
        // setEditedData({ ...editedData });
        setEditedData()
    };

    async function onFileSelect(file) {
        const img = await convertImgTOBase64(file);
        handleChange("logo", img)
        getAllInventoryupdate()
    }

    function convertImgTOBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    }

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
        let response1 = await apiCall12("companyCompetitorses/search/findByCompanyId?id="+props.company.id,'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1._embedded.companyCompetitorses)
        setRowUser(responseJSON1._embedded.companyCompetitorses)
    }

    const getAllInventoryupdate = async function (id){
        let response1 = await apiCall("companyCompetitorses/"+editedData.id,'PUT', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget()
            setOpenEditModal(false);

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    const getAllInventorydelete = async function (id){
        let response1 = await apiCall("companyCompetitorses/"+editedData.id,'DELETE', '', history)
        // console.log(response1)
        // let responseJSON1 = await response1.json();
        // console.log(response1.status+"jjjjjjjjjj")
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget()
            setOpenDeleteModal(false);
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

    const getAllInventoryadd = async function (){

        handleChange("companyName", props.company.name)
        let response1 = await apiCall("companyCompetitorses",'POST', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 201) {
            successToast("Success", "Added successfully!!")

            // console.log(responseJSON1._links.company.href)
            // let response2 = await apiCall25(responseJSON1._links.company.href,'PUT', "companies/"
            // +props.company.id, history)
            var s = responseJSON1._links.company.href
            let response2 = await apiCall25(s.substring(0, s.indexOf('{')),'PUT', "companies/"
                +props.company.id, history)

            getAllInventoryget()
            setOpenAddModal(false);
        } else {
            errorToast("Invalid", "Not Added...try after some time or contact Admin");

        }
    }

    const handleOpenLogoModal = (userobject) => {
        setEditedData(userobject)
        setOpenPhotoModal(true);
    };

    const handleCloseLogoModal = () => {
        setOpenPhotoModal(false);
    };

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

    return(
      <div className="user_table_section">
          <div className="text-right mb-2">
            <button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>
                <AddIcon style={{width:"25px", height:"25px"}}/> Add New Record
            </button>
          </div>
              <div className="table-container">
                <div className="userTable">
                  <TableContainer className={classes.container}>
                    <Table stickyHeader className="bg-white">
                      <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                            rowUser.map(
                                (user,index) => (
                                  <TableRow  key={index} id={user.id}>

                                    <TableCell>{ isload ? <> {user.id} </> : <Skeleton width={100} /> }</TableCell>
                                    <TableCell>{ isload ? <> {props.company.name} </> : <Skeleton width={100} /> }</TableCell>
                                    <TableCell>{ isload ? <> {props.company.cin} </> : <Skeleton width={100} /> }</TableCell>
                                      <TableCell>{ isload ? <> {user.name} </> : <Skeleton width={100} /> }</TableCell>
                                      <TableCell>
                                          { isload ?
                                              <div className="UserProfile">
                                                  <div className="UserIcon">
                                                      <img src={user.logo} />
                                                  </div>
                                              </div>
                                              :
                                              <Skeleton circle={true} height={50} width={50} />
                                          }
                                      </TableCell>
                                          <TableCell >
                                        <div className="d-flex justify-content-between">
                                        { isload ?
                                            <button className="btn btn-primary-default mr-2" onClick={() => handleOpenEditModal(user)}>
                                                <EditIcon/>
                                            </button>
                                            :
                                            <Skeleton square={true} height={30} width={30} />
                                        }
                                        { isload ?
                                            <button className="btn btn-sm btn-danger"  onClick={() => handleOpenDeleteModal(user)}>
                                            <DeleteIcon />
                                            </button>
                                            :
                                            <Skeleton square={true} height={30} width={30} />
                                        }

                                        </div>
                                    </TableCell>

                                      <TableCell >
                                          <div className="d-flex justify-content-between">

                                              { isload ?
                                                  <button onClick={() => handleOpenLogoModal(user)} style={{fontSize:"13px"}}>
                                                      Change company logo
                                                  </button>


                                                  :
                                                  <Skeleton square={true} height={30} width={30} />
                                              }
                                          </div>
                                      </TableCell>
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
                                    {/*<div className="form-control-row">*/}
                                    {/*    <label className="m-0 mt-2 text-small">Company Name -</label>*/}
                                    {/*    <input type="text" value={editedData.companyName} onChange={(e) => handleChange("companyName", e.target.value)}*/}
                                    {/*           className="form-control" />*/}
                                    {/*</div>*/}
                                    <div className="form-control-row">
                                        <label className="m-0 mt-2 text-small">Company CIN -</label>
                                        <input type="text" value={props.company.cin} onChange={(e) => handleChange("companyCIN", e.target.value)}
                                               className="form-control" disabled />
                                    </div>

                                    <div className="form-control-row">
                                        <label className="m-0 mt-2 text-small">Name -</label>
                                        <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                               className="form-control" />
                                    </div>

                                    {/*<div className="form-control-row">*/}
                                    {/*    <label className="m-0 mt-2 text-small">Logo -</label>*/}
                                    {/*    <input type="text" value={editedData.logo} onChange={(e) => handleChange("logo", e.target.value)}*/}
                                    {/*           className="form-control" />*/}
                                    {/*</div>*/}

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
                                    {/*<div className="form-control-row">*/}
                                    {/*    <label className="m-0 mt-2 text-small">Company Name -</label>*/}
                                    {/*    <input type="text" value={editedData.companyName} onChange={(e) => handleChange("companyName", e.target.value)}*/}
                                    {/*           className="form-control" />*/}
                                    {/*</div>*/}
                                    <div className="form-control-row">
                                        <label className="m-0 mt-2 text-small">Company CIN -</label>
                                        <input type="text" value={props.company.cin} onChange={(e) => handleChange("companyCIN", e.target.value)}
                                               className="form-control" disabled />
                                    </div>

                                    <div className="form-control-row">
                                        <label className="m-0 mt-2 text-small">Name -</label>
                                        <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                               className="form-control" />
                                    </div>

                                    {/*<div className="form-control-row">*/}
                                    {/*    <label className="m-0 mt-2 text-small">Logo -</label>*/}
                                    {/*    <input type="text" value={editedData.logo} onChange={(e) => handleChange("logo", e.target.value)}*/}
                                    {/*           className="form-control" />*/}
                                    {/*</div>*/}
                                </form>
                            </div>
                            <div className="modal-footer p-1">
                                <div className="d-flex align-items-center">
                                    <Buttons.SecondaryButton onClick={handleCloseAddModal} value="Cancel" style={{width:"100%", margin:"0px 3px"}}/>
                                    {!isLoadingbtn && (
                                        <Buttons.PrimaryButton value="Submit" style={{width:"100%", margin:"0px 3px"}} onClick={getAllInventoryadd}/>
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
                                <DeleteForeverIcon className="text-danger " style={{width:"70px", height:"70px"}}/>
                                <h4 className="my-3 text-danger">Are You Sure ?</h4>
                                <p className="text-small ">Do you really want to delete these record ? <br/>This process cannot be undone.</p>
                            </div>
                            <div className="modal-footer p-1">
                                <div className="d-flex align-items-center">
                                    <Buttons.SecondaryButton onClick={handleCloseDeleteModal} value="Cancel" style={{width:"100%", margin:"0px 3px"}}/>
                                     {!isLoadingbtn && (
                                        <Buttons.PrimaryButton value="Confirm" style={{width:"100%", margin:"0px 3px"}} onClick={getAllInventorydelete}/>
                                    )}

                                    {isLoadingbtn && (
                                         <Loadbutton />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
          <ChoosePhoto
              open={openPhotoModal}
              close={handleCloseLogoModal}
              onFileSelect={onFileSelect}
          />

          {/*{loader}*/}
      </div>
      )
}