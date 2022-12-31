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
import TableHeaderTable2 from './UserHeaderTable2';
import TableHeaderTable3 from './UserHeaderTable3';
import { makeStyles } from '@material-ui/core/styles';
import "../../../Components/FilterCard/filterCard.css"
import Buttons from "../../Buttons"
import FilterCard from "../../FilterCard"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './index.css'
import UserIcon from './user.png';
import DragDropTable from './DragDrop/Index'
import { apiCall, apiCall1, apiCall12, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadingImg from './loading.gif'
import Dialog from '@material-ui/core/Dialog';
import { successToast, errorToast } from "../../Toast/index";
import VirtualModalTableContent from "./modal-table/VirtualModalTableContent";
import { ReactComponent as DownloadIcon } from '../../../Pages/VirtualAccount/DownloadIcon.svg';
// import { ReactComponent as DownloadIcon } from '../../../Pages/VirtualAccount/modal-table/DownloadIcon.svg';
import closeIcon from "../../../Pages/Companies/cross.svg";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
    width: "border-box",
    border: "1px solid #CFCBCF",
    borderRadius: "10px",
  },
});

export default function RoleUserView(props) {

  let history = useHistory();
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('company');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [userId, setUserId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [isload, setLoad] = useState(false);
  const [isloading, setLoading] = useState(false);


  let searchkey = ''

  React.useEffect(() => {
    const close = document.getElementsByClassName(
        "MuiAutocomplete-clearIndicator"
    )[0];

    // Add a Click Event Listener to the button
    close.addEventListener("click", () => {
      searchkey = ''
      getAllInventory()
    });

  }, []);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  }

  const [rowUserTable2, setRowUserTable2] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [moneyTransferSender, setMoneyTranserSender] = useState('');
  const [moneyTransferReceiver, setMoneyTranserReceiver] = useState('');



  const [roles, setroles] = useState([]);
  const [userListByRole, setUserListByRole] = useState([]);
  const [roleId, setRoleId] = useState('10627');




  useEffect(() => {
    getSearchOption()
    getAllInventory()
  }, []);


  const getAllInventory = async function () {

    setLoad(false)

    let response = await apiCall("roles/search/findByNameContaining?searchKey=" + searchkey+ "&page=0"+ "&size=1000", 'GET', '', history)
    // console.log("role response", response)

    setLoad(true)

    if (response.status == undefined) {
      errorToast("Invalid", "Invalid User ID or password"); 
      return
    }

    let responseJSON = await response.json();
    console.log("role response", responseJSON)
    setroles(responseJSON._embedded.roles)
  }
 
  const getUserListByRole = async function (senderId) {
    let response1 = await apiCall("company/roleusersmapping/"+ senderId , 'GET', '', history)
    // console.log("by role", response1)
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1._embedded.users)
    setUserListByRole(responseJSON1)
  }
  //
  // console.log("userList By Role ", userListByRole)
  // console.log("roleId ", roleId)



  // search bar code start from here

  const [searchOptions, setsearchOptions] = useState([])

  const getSearchOption = async function () {
    let response1 = await apiCall("company/allrolenames", 'GET', '', history)
    // console.log(response1)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON1 = await response1.json();
    console.log("user role mappning", responseJSON1)

    setsearchOptions(responseJSON1.map(ssa => ssa.name))
  }
  // search bar code end here



  const roleSelected = async (e, senderId) => {
    setSenderId(senderId);
    await setRoleId(senderId)
    await getUserListByRole(senderId)

  }



  // const getAllInventory = async function () {
  //   setLoading(true)
  //
  //   let response2 = await apiCall12("users/search/findByNameContainingOrMobileContaining?searchKey=" + searchkey + "&searchKey1=" + searchkey, 'GET', '', history)
  //
  //   //console.log(response1)
  //   let responseJSON2 = await response2.json();
  //   //console.log(responseJSON1._embedded.users)
  //   setRowUserTable2(responseJSON2._embedded.users)
  //   setLoading(false)
  //   setLoad(true)
  // }


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
      getAllInventory()
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
      getAllInventory()
      e.preventDefault();
    }

  };

  // new modal 

  const [moneyReleaseModal, setMoneyReleaseModal] = React.useState(false);
  const modalClose = () => {
    setMoneyReleaseModal(false)
  };
 

  return (
    <div className="user_table_section">
      <div className="dbmn">
        <div className="Table_title">
          <div className="d-flex align-items-center justify-content-start w-100">
            <h5 className='main-heading'><b>Role User View</b></h5>
          </div>
        </div>        
      </div>

      <div className="table-container">
        <div className='money-transfer-table-main'>
          <div className='money-transfer-sendertable'>
            <div className="container">
              <div className="row">
                <div className="col-md-12 px-0">
                  <div className="Table_title mt-1">
                    <div className="d-flex align-items-center justify-content-between w-100" >
                      <div className="search-area dbmn">
                        <div className='row'>
                          <div className='col-md-6 col-12'>
                            <form className="w-100 d-flex">
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
                                        placeholder="Search Role Name"
                                        onKeyDown={(event, value) => handleKeypress(event)}
                                        variant="outlined"
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pl-0">
                  <div>
                    <div className="main-heading my-1"><h6><b>User Role :</b></h6></div>
                    <TableContainer className="moneytransfertable-default-container scroll-default">
                      <Table stickyHeader className="bg-white">
                        <TableHeaderTable2 valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                          roles.map(
                            (user, index) => (
                              <TableRow
                                onClick={(e) => (roleSelected(e, user.id))}
                                key={index} className={senderId == user.id ? 'ActiveCurrentUser' : null} id={user.id}>

                                <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>
                                <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                              </TableRow>
                            ))
                        }
                      </Table>
                    </TableContainer>
                  </div>
                </div>

                <div className="col-md-6 pr-0">
                  <div>
                    <div className="main-heading my-1"><h6><b>User List :</b></h6></div>
                    <TableContainer className="moneytransfertable-default-container scroll-default">
                      <Table stickyHeader className="bg-white">
                        <TableHeaderTable3 valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                          userListByRole.map(
                            (user, index) => (
                              <TableRow
                                // onClick={(e) => userSelected3(e, user.id, user.name, user.mobile, user.username)}
                                key={index} className={receiverId == user.id ? 'ActiveCurrentUser' : null} id={user.id}>

                                <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>
                                <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                              </TableRow>
                            ))
                        }
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>            

            <Dialog
              open={moneyReleaseModal}
              onClose={modalClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description" >

              <div className='relese-money-modal'>
                <div className='allcompany-modal-closeIcon text-right'>
                  <CloseIcon onClick={modalClose} />
                </div>
                <div className="addcompanyrequest px-5 pb-5">
                  <div className="">
                    <div className="text-center">

                      <h5><b>Release Money</b></h5>
                      <p className="m-0 text-small">Are You Sure to Release Money!</p>

                    </div>
                    <div className="d-flex mt-4">
                      <Buttons.SecondaryButton value="Cancel"  style={{ width: "100%", marginRight: "3px" }} />
                      <Buttons.PrimaryButton value="Confirm"  style={{ width: "100%", marginLeft: "3px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>







          </div>
        </div>
      </div>

    </div>
  )
}