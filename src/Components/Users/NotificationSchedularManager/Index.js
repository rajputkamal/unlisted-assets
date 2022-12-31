import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHeader from "./UserHeader";
import { makeStyles } from "@material-ui/core/styles";
import "../../../Components/FilterCard/filterCard.css";
import Buttons from "../../../Components/Buttons";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Index.css";
import UserIcon from "./user.png";
import {
  apiCall,
  apiCall1,
  apiCall25,
  downloadurl,
  setAccessToken,
} from "../../../Utils/Network";
import Skeleton from "react-loading-skeleton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loadbutton from "../../Loadbutton/Index";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import {
  successToast,
  errorToast,
} from "../../../../src/Components/Toast/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  textField: {
    "& input": {
      fontSize: "13px",
    },
    border: "1px solid #b2b2b2",
    borderRadius: "5px",
    height: "40px",
    padding: "7px",
    width: "100%",
  },
  ".textField .MuiFormLabel-root": {
    display: "none",
  },
  container: {
    maxHeight: 1000,
    width: "border-box",
    border: "1px solid #CFCBCF",
    borderRadius: "10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 1),
    borderRadius: "10px",
    maxWidth: "500px",
    minWidth: "400px",
    margin: "0px 10px",
  },
}));
export default function InventoryTableContent(props) {
  let history = useHistory();
  let searchkey = "";
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("company");
  const [isload, setLoad] = React.useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [editedData, setEditedData] = React.useState({});
  // Handle Add Reacord  Modal
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [rowUser, setRowUser] = React.useState([]);
  // Handle Edit Record Modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  // view all record modal
  const [openViewAllModal, setOpenViewAllModal] = useState(false);
  //Handle Delete Record Confirmation Modal
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [isLoadingbtn, setLoadingbtn] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [templateManagers, setTemplateManagers] = useState([]);


  const handleChange1 = (rowObject) => {
    // editedData[field] = val;
    // setEditedData({ ...editedData });
    setEditedData();
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
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  React.useEffect(() => {
    getAllInventoryget();
  }, []);

  const getAllInventoryget = async function() {
    let response1 = await apiCall("notificationSchedulars", "GET", "", history);
    // console.log(response1)
    let responseJSON1 = await response1.json();
    // console.log("responseJSON1", responseJSON1);
    setRowUser(responseJSON1._embedded.notificationSchedulars);
    setLoad(true);

    // get notificationUserCategories
    let response2 = await apiCall(
      "notificationUserCategories",
      "GET",
      "",
      history
    );
    let responseJSON2 = await response2.json();
    setUserCategories(responseJSON2._embedded.notificationUserCategories);

    // get Template manager names
    let response3 = await apiCall(
      "templates/search/findByNameContainingOrTagContaining?searchKey=" +
        searchkey +
        "&searchKey1=" +
        searchkey,
      "GET",
      "",
      history
    );
    let responseJSON3 = await response3.json();
    // console.log(responseJSON1._embedded.templates)
    setTemplateManagers(responseJSON3._embedded.templates);
  };

  const getAllInventoryupdate = async function(id) {
    console.log("aa",editedData)

    let response1 = await apiCall(
      "notificationSchedulars/" + editedData.id,
      "PUT",
      editedData,
      history
    );
    // console.log(response1)
    let responseJSON1 = await response1.json();
    //console.log(responseJSON1)

    if (response1.status === 200) {
      successToast("Success", "Edited successfully!!");

      var s = responseJSON1._links.notificationUserCategory.href
      // alert(s)
      let response2 = await apiCall25(s,'PUT', "notificationUserCategories/"
          +editedData.notificationUserCategoryId, history)


      var s1 = responseJSON1._links.template.href
      // alert(s1)
      let response21 = await apiCall25(s1,'PUT', "templates/"
          +editedData.templateId, history)

      getAllInventoryget()
      setOpenEditModal(false);

    } else {
      errorToast(
        "Invalid",
        "Not Edited...try after some time or contact Admin"
      );
    }
  };

  const getAllInventorydelete = async function(id) {
    // alert(editedData.id)
    let response1 = await apiCall(
      "notificationSchedulars/" + editedData.id,
      "DELETE",
      "",
      history
    );
    // //console.log(response1)
    // let responseJSON1 = await response1.json();
    //console.log(responseJSON1)
    if (response1.status === 204) {
      successToast("Success", "Deleted successfully!!");

      getAllInventoryget();

      setOpenDeleteModal(false)
    } else {
      errorToast(
        "Invalid",
        "Not Deleted...try after some time or contact Admin"
      );
    }
  };

  const getAllInventoryadd = async function() {
    let response1 = await apiCall(
      "notificationSchedulars",
      "POST",
      editedData,
      history
    );
    console.log("response1", response1);
    let responseJSON1 = await response1.json();
    //console.log(responseJSON1)
    if (response1.status === 201) {
      successToast("Success", "Added successfully!!");

      var s = responseJSON1._links.notificationUserCategory.href
      let response2 = await apiCall25(s,'PUT', "notificationUserCategories/"
          +editedData.notificationUserCategoryId, history)

      var s1 = responseJSON1._links.template.href
      let response21 = await apiCall25(s1,'PUT', "templates/"
          +editedData.templateId, history)

      getAllInventoryget()
      setOpenAddModal(false);

    } else {
      errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }
  };

  const handleOpenEditModal = (userobject) => {
    setEditedData(userobject);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenAddModal = (userobject) => {
    setEditedData(userobject);
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenDeleteModal = (userobject) => {
    setEditedData(userobject);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenFeatureModal = (userobject) => {
    setEditedData(userobject);
    setOpenFeatureModal(true);
  };

  const handleOpenTemplateModal = (userobject) => {
    setEditedData(userobject);
    setOpenTemplateModal(true);
  };

  const handleCloseFeatureModal = () => {
    setOpenFeatureModal(false);
  };

  const handleCloseTemplateModal = () => {
    setOpenTemplateModal(false);
  };

  //view all
  const viewAllRecordModal = (userobject) => {
    setEditedData(userobject);
    setOpenViewAllModal(true);
}

  return (
    <div className="user_table_section">
      <div>
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="Table_title">
              <div className="d-flex align-items-center justify-content-start w-100">
                <h5 className="main-heading">
                  <b>Notification Schedular Manager</b>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="text-right mb-2">
              <button
                className="btn btn-primary-default"
                onClick={() => handleOpenAddModal({})}
              >
                <AddIcon style={{ width: "25px", height: "25px" }} /> Add New
                Record
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="userTable">
          <TableContainer className={classes.container}>
            <Table stickyHeader className="bg-white">
              <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
              />
              {rowUser.map((user, index) => (
                <TableRow key={index} id={user.id}>
                  <TableCell>
                    {isload ? <> {user.id} </> : <Skeleton width={100} />}
                  </TableCell>
                  <TableCell>
                    {isload ? <> {user.name} </> : <Skeleton width={100} />}
                  </TableCell>
                  <TableCell>
                    {isload ? (
                      <> {user.description} </>
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </TableCell>
                  <TableCell>
                    {isload ? (
                      <> {user.dateAndTime} </>
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </TableCell>
                  <TableCell>
                    {isload ? <> {user.status} </> : <Skeleton width={100} />}
                  </TableCell>

                  <TableCell>
                    <div className="d-flex justify-content-between">
                      {isload ? (
                        <button
                          className="btn btn-primary-default mr-2"
                          onClick={() => handleOpenEditModal(user)}
                        >
                          <EditIcon />
                        </button>
                      ) : (
                        <Skeleton square={true} height={30} width={30} />
                      )}
                      {isload ? (
                        <button
                          className="btn btn-sm btn-danger mr-2"
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          <DeleteIcon />
                        </button>
                      ) : (
                        <Skeleton square={true} height={30} width={30} />
                      )}
                       {isload ?
                         <button className='btn btn-sm btn-info' onClick={() => viewAllRecordModal(user)}>
                            <ViewListIcon /> 
                         </button>:
                            <Skeleton square ={true} height={30} width={30} />
                       }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </div>
        {/* <button className="btn btn-primary mr-2" onClick={fetchData}>
                Show full page loading spinner
                </button> */}
      </div>

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
              <h5 className="text-primary-default text-center w-100">
                <b>Update Record</b>
              </h5>
            </div>
            <div className="modal-body">
              <form className="w-100">
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Name -</label>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Description -</label>
                  <input
                    type="text"
                    value={editedData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
                {/* <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Date And Time -</label>
                  <input
                    type="text"
                    value={editedData.dateAndTime}
                    onChange={(e) =>
                      handleChange("dateAndTime", e.target.value)
                    }
                    className="form-control"
                  />
                </div> */}
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Date & Time</label>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    value={editedData.dateAndTime}
                    onChange={(e) =>
                      handleChange("dateAndTime", e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">
                    Template Manager Name
                  </label>
                  <select
                      className="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                      aria-label="Default select example"
                      // value=""
                      // onChange={handleChange}
                      value={editedData.templateName}
                      onChange={(e) =>
                          handleChange("templateId", e.target.value)
                      }
                  >
                    {templateManagers.map((user, index) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">
                    Notification User Category Name
                  </label>
                  <select
                      className="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                      aria-label="Default select example"
                      // value=""
                      // onChange={handleChange}
                      value={editedData.notificationUserCategoryName}
                      onChange={(e) =>
                          handleChange("notificationUserCategoryId", e.target.value)
                      }
                  >
                    {userCategories.map((user, index) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Status -</label>
                  <select
                    class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                    aria-label="Default select example"
                    value={editedData.status}
                    onChange={(e) =>
                      handleChange("status", e.target.value)
                    }
                  >
                     <option>Not started</option>
                     <option>In progress</option>
                     <option>Finished successfully</option>
                     <option>Pause</option>
                     <option>Resume</option>
                     <option>Discarded</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer p-1">
              <div className="d-flex align-items-center">
                <Buttons.SecondaryButton
                  onClick={handleCloseEditModal}
                  value="Cancel"
                  style={{ width: "100%", margin: "0px 3px" }}
                />
                {!isLoadingbtn && (
                  <Buttons.PrimaryButton
                    value="Update"
                    style={{ width: "100%", margin: "0px 3px" }}
                    onClick={getAllInventoryupdate}
                  />
                )}

                {isLoadingbtn && <Loadbutton />}
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
              <h5 className="text-primary-default text-center w-100">
                <b>Add New Record</b>
              </h5>
            </div>
            <div className="modal-body pb-5">
              <form className="w-100">
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Name -</label>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Description -</label>
                  <input
                    type="text"
                    value={editedData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
                {/* <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Date And Time -</label>
                  <input
                    type="text"
                    value={editedData.DateAndTime}
                    onChange={(e) =>
                      handleChange("DateAndTime", e.target.value)
                    }
                    className="form-control"
                  />
                </div> */}
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Date & Time</label>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    value={editedData.dateAndTime}
                    onChange={(e) =>
                      handleChange("dateAndTime", e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">
                    Template Manager Name
                  </label>
                  <select
                    class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                    aria-label="Default select example"
                    // value=""
                    // onChange={handleChange}
                    value={editedData.templateName}
                    onChange={(e) =>
                      handleChange("templateId", e.target.value)
                   }
                  >
                    {templateManagers.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">
                    Notification User Category Name
                  </label>
                  <select
                    class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                    aria-label="Default select example"
                    // value=""
                    // onChange={handleChange}
                    value={editedData.notificationUserCategoryName}
                    onChange={(e) =>
                      handleChange("notificationUserCategoryId", e.target.value)
                    }
                  >
                    {userCategories.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control-row">
                  <label className="m-0 mt-2 text-small">Status -</label>
                  <select
                    class="form-select p-2 text-small shadow-none Trade_ready_step_3_selectbox w-100"
                    aria-label="Default select example"
                    value={editedData.status}
                    onChange={(e) =>
                      handleChange("status", e.target.value)
                    }
                  >
                     <option>Not started</option>
                     <option>In progress</option>
                     <option>Finished successfully</option>
                     <option>Pause</option>
                     <option>Resume</option>
                     <option>Discarded</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer p-1">
              <div className="d-flex align-items-center">
                <Buttons.SecondaryButton
                  onClick={handleCloseAddModal}
                  value="Cancel"
                  style={{ width: "100%", margin: "0px 3px" }}
                />
                {!isLoadingbtn && (
                  <Buttons.PrimaryButton
                    value="Submit"
                    style={{ width: "100%", margin: "0px 3px" }}
                    onClick={getAllInventoryadd}
                  />
                )}

                {isLoadingbtn && <Loadbutton />}
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
                                    <div className='col-6'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">ID -</label>
                                    <h6>{editedData.id ? editedData.id : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Name -</label>
                                    <h6>{editedData.name ? editedData.name : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Description -</label>
                                    <h6>{editedData.description ? editedData.description : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">notificationUserCategoryId -</label>
                                    <h6>{editedData.notificationUserCategoryId ? editedData.notificationUserCategoryId : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">notificationUserCategoryName -</label>
                                    <h6>{editedData.notificationUserCategoryName ? editedData.notificationUserCategoryName : 'NA'}</h6>
                                </div>
                                    </div>
                                   
                                    <div className='col-6'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">DateAndTime -</label>
                                    <h6>{editedData.dateAndTime ? editedData.dateAndTime : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Status -</label>
                                    <h6>{editedData.status ? editedData.status : 'NA'}</h6>
                                </div>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">templateId -</label>
                                    <h6>{editedData.templateId ? editedData.templateId : 'NA'}</h6>
                                </div>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">templateName -</label>
                                    <h6>{editedData.templateName ? editedData.templateName : 'NA'}</h6>
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
              <DeleteForeverIcon
                className="text-danger "
                style={{ width: "70px", height: "70px" }}
              />
              <h4 className="my-3 text-danger">Are You Sure ?</h4>
              <p className="text-small ">
                Do you really want to delete these record ? <br />
                This process cannot be undone.
              </p>
            </div>
            <div className="modal-footer p-1">
              <div className="d-flex align-items-center">
                <Buttons.SecondaryButton
                  onClick={handleCloseDeleteModal}
                  value="Cancel"
                  style={{ width: "100%", margin: "0px 3px" }}
                />
                {!isLoadingbtn && (
                  <Buttons.PrimaryButton
                    value="Confirm"
                    style={{ width: "100%", margin: "0px 3px" }}
                    onClick={getAllInventorydelete}
                  />
                )}

                {isLoadingbtn && <Loadbutton />}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {loader}
    </div>
  );
}
