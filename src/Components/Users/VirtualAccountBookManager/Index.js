import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHeaderTable2 from "./UserHeaderTable2";
import { makeStyles } from "@material-ui/core/styles";
import "../../../Components/FilterCard/filterCard.css";
import Buttons from "../../Buttons";
import { useHistory } from "react-router-dom";
import "./index.css";
import { apiCall, apiCall12 } from "../../../Utils/Network";
import Skeleton from "react-loading-skeleton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 1),
    borderRadius: "10px",
    maxWidth: "500px",
    minWidth: "400px",
    margin: "0px auto 0px auto",
  },
}));
export default function InventoryTableContent(props) {
  let history = useHistory();
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("company");
  const [isload, setLoad] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [editedData, seteditedData] = React.useState({});
  const [searchOptions, setsearchOptions] = useState([]);
  const [rowUserTable2, setRowUserTable2] = useState([]);
  const [viewAllModal, setViewAllModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);

  let searchkey1 = "";
  let searchkey = "";

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const getSearchOption = async function() {
    let response1 = await apiCall(
      "useronboarding/userRoleMappingsListings",
      "GET",
      "",
      history
    );
    if (response1.status == undefined) {
      return;
    }
    let responseJSON1 = await response1.json();
    setsearchOptions(responseJSON1.map((ssa) => ssa.name));
    if (searchkey1 === null) {
      setsearchOptions("");
    } else {
      setsearchOptions([...searchOptions]);
    }
  };
  // search bar code end here

  const getAllInventory = async function() {
    setLoading(true);

    let response = await apiCall12(
      "users/search/findByNameContainingOrMobileContaining?searchKey=" +
        searchkey +
        "&searchKey1=" +
        searchkey,
      "GET",
      "",
      history
    );

    let responseJSON = await response.json();
    setRowUserTable2(responseJSON._embedded.users);
    setLoading(false);
    setLoad(true);
  };

  const handleKeypress = (e) => {
    // e.preventDefault();
    if (e.code === "Enter") {
      searchkey = e.target.value;
      if (searchkey == "") {
        searchkey = "nothing";
      }
      getAllInventory();
    }
  };

  const handleChange = (field, val) => {
    editedData[field] = val;
    seteditedData({ ...editedData });
  };

  const viewAllRecordModal = (userobject) => {
    seteditedData(userobject);
    setViewAllModal(true);
  };
  const handleOpenDeleteModal = (userobject) => {
    seteditedData(userobject);
    setOpenDeleteModal(true);
  };
  const handleOpenEditModal = (userobject) => {
    seteditedData(userobject);
    setOpenEditModal(true);
  };
  const handleOpenAddModal = (userobject) => {
    seteditedData(userobject);
    setOpenAddModal(true);
  };

  useEffect(() => {
    getSearchOption();
    getAllInventory();
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    close.addEventListener("click", () => {
      searchkey = "";
      getAllInventory();
    });
  }, []);

  return (
    <div className="user_table_section">
      <div className="dbmn">
        <div className="Table_title">
          <div className="d-flex align-items-center justify-content-start w-100">
            <h5 className="main-heading">
              <b>Virtual Account Book Manager</b>
            </h5>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="money-transfer-table-main">
          <div className="money-transfer-sendertable">
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-12 pl-0">
                  <div>
                    <div className="Table_title mt-1">
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="search-area dbmn">
                          <div className="row justify-content-between">
                            <div className="col-md-6 col-12 w-100">
                              <form className="w-100">
                                <div className="form-group">
                                  <div className="form-group has-search mb-0 small-icon w-100 ">
                                    <div className="inventory-search-icon form-control-feedback">
                                      <SearchIcon />
                                    </div>
                                    <Autocomplete
                                      style={{ width: 1000 }}
                                      freeSolo
                                      options={searchOptions}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          onSelect={(event, value) => {
                                            searchkey = event.target.value;

                                            getAllInventory(true);
                                          }}
                                          className="inventory-search-bar"
                                          placeholder="Search by user account id, mobile number, name"
                                          onKeyDown={(event, value) =>
                                            handleKeypress(event)
                                          }
                                          variant="outlined"
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="col-md-4 w-100">
                              <div className="text-right mb-2">
                                <button
                                  className="btn btn-primary-default"
                                  onClick={() => handleOpenAddModal({})}
                                  style={{ height: "36px", marginLeft: "auto" }}
                                >
                                  <AddIcon
                                    style={{ width: "25px", height: "25px" }}
                                  />{" "}
                                  Add New Record
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <TableContainer className="moneytransfertable-default-container scroll-default">
                      <Table stickyHeader className="bg-white">
                        <TableHeaderTable2
                          valueToOrderBy={valueToOrderBy}
                          orderDirection={orderDirection}
                          handleRequestSort={handleRequestSort}
                        />
                        {rowUserTable2.map((user, index) => (
                          <TableRow key={index} id={user.id}>
                            <TableCell>
                              {isload ? (
                                <> {user.id} </>
                              ) : (
                                <Skeleton width={100} />
                              )}
                            </TableCell>
                            <TableCell>
                              {isload ? (
                                <> {user.name} </>
                              ) : (
                                <Skeleton width={100} />
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="d-flex justify-content-between">
                                {isload ? (
                                  <button
                                    className="btn btn-sm btn-primary-default mr-2"
                                    onClick={() => handleOpenEditModal(user)}
                                  >
                                    <EditIcon />
                                  </button>
                                ) : (
                                  <Skeleton
                                    square={true}
                                    height={30}
                                    width={30}
                                  />
                                )}
                                {isload ? (
                                  <button
                                    className="btn btn-sm btn-danger mr-2"
                                    onClick={() => handleOpenDeleteModal(user)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                ) : (
                                  <Skeleton
                                    square={true}
                                    height={30}
                                    width={30}
                                  />
                                )}

                                {isload ? (
                                  <button
                                    className="btn btn-sm btn-info"
                                    onClick={() => viewAllRecordModal(user)}
                                  >
                                    <ViewListIcon />
                                  </button>
                                ) : (
                                  <Skeleton
                                    square={true}
                                    height={30}
                                    width={30}
                                  />
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Add AllRecord Modal  */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openAddModal}
              onClose={() => setOpenAddModal(false)}
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
                      <b>Add Record</b>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form className="w-100">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-control-row">
                            <label className="m-0 text-small">
                              Account ID -
                            </label>
                            <input
                              type="text"
                              value={editedData.id}
                              onChange={(e) =>
                                handleChange("id", e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                          <div className="form-control-row">
                            <label className="m-0 text-small">Name -</label>
                            <input
                              type="text"
                              value={editedData.name}
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer p-1">
                    <div className="d-flex align-items-center">
                      <Buttons.SecondaryButton
                        onClick={() => setOpenAddModal(false)}
                        value="Cancel"
                        style={{ width: "100%", margin: "0px 3px" }}
                      />

                      <Buttons.PrimaryButton
                        value="Add"
                        style={{ width: "100%", margin: "0px 3px" }}
                        onClick={""}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>

            {/* Edit AllRecord Modal  */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
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
                      <b>Edit Record</b>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form className="w-100">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-control-row">
                            <label className="m-0 text-small">
                              Account ID -
                            </label>
                            <input
                              type="text"
                              value={editedData.id}
                              onChange={(e) =>
                                handleChange("id", e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                          <div className="form-control-row">
                            <label className="m-0 text-small">Name -</label>
                            <input
                              type="text"
                              value={editedData.name}
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer p-1">
                    <div className="d-flex align-items-center">
                      <Buttons.SecondaryButton
                        onClick={() => setOpenEditModal(false)}
                        value="Cancel"
                        style={{ width: "100%", margin: "0px 3px" }}
                      />
                      <Buttons.PrimaryButton
                        value="Update"
                        style={{ width: "100%", margin: "0px 3px" }}
                        onClick={""}
                      />
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
                    <h5 className="text-primary-default text-center w-100">
                      <b>View All Record</b>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form className="w-100">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-control-row">
                            <label className="m-0 text-small">
                              Account ID -
                            </label>
                            <h6>{editedData.id ? editedData.id : "NA"}</h6>
                          </div>
                          <div className="form-control-row">
                            <label className="m-0 text-small">Name -</label>
                            <h6>{editedData.name ? editedData.name : "NA"}</h6>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer p-1">
                    <div className="d-flex align-items-center">
                      <Buttons.SecondaryButton
                        onClick={() => setViewAllModal(false)}
                        value="Cancel"
                        style={{ width: "100%", margin: "0px 3px" }}
                      />
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
              onClose={() => setOpenDeleteModal(false)}
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
                      Do you really want to delete this record ? <br />
                      This process cannot be undone.
                    </p>
                  </div>
                  <div className="modal-footer p-1">
                    <div className="d-flex align-items-center">
                      <Buttons.SecondaryButton
                        onClick={() => setOpenDeleteModal(false)}
                        value="Cancel"
                        style={{ width: "100%", margin: "0px 3px" }}
                      />

                      <Buttons.PrimaryButton
                        value="Confirm"
                        style={{ width: "100%", margin: "0px 3px" }}
                        onClick={""}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
