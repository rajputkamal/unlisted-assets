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
import Fade from '@material-ui/core/Fade';


import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function InventoryTableContent(props) {

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

  const [age, setAge] = React.useState('');

  const [virtualAccountModal, setVirtualAccountModal] = React.useState(false);
  const [moneyReleaseModal, setMoneyReleaseModal] = React.useState(false);
  const [moneyReleaseStatus, setMoneyReleaseStatus] = React.useState(false);
  const [moneyReleaseUserId, setmoneyReleaseUserId] = React.useState('');
  const [uaVerificationStatus, setuaVerificationStatus] = useState("");
  const [uaVerificationStatusjustification, setuaVerificationStatusjustification] = useState("");

  const [editedData, seteditedData] = React.useState({});

  const [rowInformation, setRowInformation] = useState([])

  const [balancefreeze, setbalancefreeze] = useState('')


  const [rowUser, setRowUser] = useState([])
  const [rowUserTable2, setRowUserTable2] = useState([])
  const [rowUserTable3, setRowUserTable3] = useState([])
  const [rowUserRoles, setRowUserRoles] = useState([]);
  const [rowAllRoles, setRowAllRoles] = useState([]);
  const [activeClass, setClass] = useState('');
  const [checkuser, setCheckuser] = useState('');
  const [userselected, setUserselected] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [moneyTransferSender, setMoneyTranserSender] = useState('');
  const [moneyTransferReceiver, setMoneyTranserReceiver] = useState('');
  const [transferAmount, setTransferAmount] = useState()

  const [senderName, setSenderName] = useState('')
  const [senderAccountBalance, setSenderAccountBalance] = useState('')
  const [senderMobileNo, setSenderMobileNo] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [receiverMobileNo, setReceiverMobileNo] = useState('')
  const [receiverAccountBalance, setReceiverAccountBalance] = useState('')



  const [accountBalance, setAccountBalance] = useState('');

  const [virtualAccountUserId, setVirtualAccountUserId] = useState('');
  const [modalOpenById, setModalOpenById] = useState('');

  const [senderAccountId, setSenderAccountId] = useState('');
  const [receiverAccountId, setReceiverAccountId] = useState('');



  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  let searchkey1 = ''
  let searchkey2 = ''
  let searchkey3 = ''



  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  }



  useEffect(() => {
    getSearchOption()
    getAllInventory()
  }, []);

  // search bar code start from here
  const [searchOptions, setsearchOptions] = useState([])

  const getSearchOption = async function () {
    let response1 = await apiCall("useronboarding/userRoleMappingsListings", 'GET', '', history)
    if (response1.status == undefined) {
      return
    }
    let responseJSON1 = await response1.json();
    setsearchOptions(responseJSON1.map(ssa => ssa.name))
    if (searchkey1 === null) {
      setsearchOptions("");
    } else {
      setsearchOptions([...searchOptions]);
    }
  }
  // search bar code end here

  const userSelected2 = async (ev, senderId, senderName, senderMobileNO, userName) => {

    setMoneyTranserSender(senderId);
    setSenderId(senderId);
    setSenderName(senderName)
    setSenderMobileNo(senderMobileNO)
    // senderAccountBalance()    
    senderAccountData(userName)
    setSenderAccountId(userName)

  }
  const userSelected3 = async (ev, receiverId, receiverName, receiverMobileNO, userName) => {
    setMoneyTranserReceiver(receiverId);
    setReceiverId(receiverId);
    setReceiverName(receiverName)
    setReceiverMobileNo(receiverMobileNO)
    receiverAccountData(userName)
    setReceiverAccountId(userName)


    if (senderId && receiverId) {
      setOpenModal(true);
    }
  }

  const getAllWithdrawlRequest = async function () {

    let response1 = await apiCall12("moneyWithDrawRequests/search/findByIsApproved?isApproved="+false,'GET', '', history)

    // let response1 = await apiCall("moneyWithDrawRequests", 'GET', '', history)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON1 = await response1.json();
    setRowUser(responseJSON1._embedded.moneyWithDrawRequests)
    setLoad(true);
  }

  const getAllInventory = async function () {
    setLoading(true)

    getAllWithdrawlRequest()

    let response2 = await apiCall12("users/search/findByNameContainingOrMobileContaining?searchKey=" + searchkey2 + "&searchKey1=" + searchkey2, 'GET', '', history)

    let response3 = await apiCall12("users/search/findByNameContainingOrMobileContaining?searchKey=" + searchkey3 + "&searchKey1=" + searchkey3, 'GET', '', history)


    let responseJSON2 = await response2.json();
    let responseJSON3 = await response3.json();

    setRowUserTable2(responseJSON2._embedded.users)
    setRowUserTable3(responseJSON3._embedded.users)
    setLoading(false)
    setLoad(true);
  }

  const userSelected = async (ev, userId) => {
    setUserId(userId);
    let response2 = await apiCall("admincontroller/userrole/" + userId, 'GET', '', history)
    let responseJSON2 = await response2.json();
    setRowUserRoles(responseJSON2)
    let response3 = await apiCall("admincontroller/role", 'GET', '', history)
    let responseJSON3 = await response3.json();
    setRowAllRoles(responseJSON3)

  }
  const handleKeypress = e => {
    // e.preventDefault();
    if (e.code === "Enter") {
      searchkey1 = e.target.value
      if (searchkey1 == "") {
        searchkey1 = "nothing";
      }
      getAllInventory()
    }
  };

  const handleOpenModal = () => {
    if (moneyTransferSender && moneyTransferReceiver) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const moneyTransfer = async function () {

    let response1 = await apiCall("uservirtualaccount/adminvirtualbookwallettowallet/" + 1 + senderAccountId + '/' + 1 + receiverAccountId + '/' + transferAmount, 'POST', '', history)

    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON1 = await response1.json();
    if (response1.status === 200) {
      successToast("Success", "Money Transfer successfully!!")
      setTransferAmount()
      setOpenModal(false);
      getAllInventory()
    } else {
      errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }

  }

  const senderAccountData = async function (userName) {

    let response2 = await apiCall("uservirtualaccount/adminvirtualaccountbalance/" + 1 + userName, 'GET', '', history)
    if (response2.status == undefined) {
      return
    }
    let responseJSON2 = await response2.json();
    if (response2.status === 200) {
      setSenderAccountBalance(responseJSON2)
    } else {
    }
  }
  const receiverAccountData = async function (userName) {

    let response2 = await apiCall("uservirtualaccount/adminvirtualaccountbalance/" + 1 + userName, 'GET', '', history)
    if (response2.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON2 = await response2.json();
    if (response2.status === 200) {
      // successToast("Success", "Money Transfer successfully!!")
      setReceiverAccountBalance(responseJSON2)
    } else {
      // errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }
  }


  const updateWithDrawRequest = async function () {

    let response1 = await apiCall("uservirtualaccount/adminwithdrawmoneyvirtualaccount/approved", 'POST', editedData, history)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON1 = await response1.json();


    if (response1.status === 200) {
      successToast("Success", "Approved successfully!!")

      seteditedData({})
      setMoneyReleaseModal(false)
      getAllWithdrawlRequest()
    } else {
      errorToast("Invalid", "Not Approved...try after some time or contact Admin");
    }
  }

  // new modal 

  const modalClose = () => {
    setVirtualAccountModal(false)
    setMoneyReleaseModal(false)
  };


  const moneyTransferDetailModalOpen = async function (e, accountId) {

    let response2 = await apiCall("uservirtualaccount/adminvirtualaccountbalance/" + accountId, 'GET', '', history)
    if (response2.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON2 = await response2.json();
    if (response2.status === 200) {
      // successToast("Success", "Money Transfer successfully!!")
      setAccountBalance(responseJSON2)
      getAllInventory()
    } else {
      // errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }

    let response3 = await apiCall("uservirtualaccount/adminvirtualaccountfreezebalance/" + accountId, 'GET', '', history)
    if (response3.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON3 = await response3.json();
    if (response3.status === 200) {
      // successToast("Success", "Money Transfer successfully!!")
      setbalancefreeze(responseJSON3)
      getAllInventory()
    } else {
      // errorToast("Invalid", "Not Added...try after some time or contact Admin");
    }

    setModalOpenById(accountId)

    setVirtualAccountUserId(accountId)
    setVirtualAccountModal(!virtualAccountModal)

  }

  const moneyReleaseModalOpen = async function (e, userObject) {

    seteditedData(userObject)
    setMoneyReleaseModal(true)
  }

   return (
    <div className="user_table_section">
      <div className="dbmn">
        <div className="Table_title">
          <div className="d-flex align-items-center justify-content-start w-100">
            <h5 className='main-heading'><b>Money Transfer</b></h5>
          </div>
        </div>
        {/* <div className="Table_title mt-1">
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
                                onSelect={(event, value) => {

                                  searchkey1 = event.target.value

                                  getAllInventory(true)
                                }}
                                className="inventory-search-bar"
                                placeholder="Search Company Name"
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
        </div> */}
      </div>

      <div className="table-container">
        {/* <div className="userTable">
          <TableContainer className="moneytransfertable-default-container scroll-default">
            <Table stickyHeader className="bg-white">
              <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
              {
                rowUser.map(
                  (user, index) => (<>
                    <TableRow
                      // onClick={(e) => userSelected(e, user.id)}
                      key={index}
                    // className={userId == user.id ? 'ActiveCurrentUser' : null} id={user.id}
                    >

                      <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.mobile} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.email} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.accountIdRequester} </> : <Skeleton width={100} />}</TableCell>

                      <TableCell>{isload ? <> {user.amount} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.balance} </> : <Skeleton width={100} />}</TableCell>

                      <TableCell>{isload ? <> {user.accountIdApprovar} </> : <Skeleton width={100} />}</TableCell>

                      <TableCell>{isload ? <> {(user.isApproved != undefined && user.isApproved == true) ? "yes" : "in-progress"} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.createDate} </> : <Skeleton width={100} />}</TableCell>

                      <TableCell>{isload ? <> {user.updateDate} </> : <Skeleton width={100} />}</TableCell>

                      <TableCell>{isload ? <>
                        <div>
                          {(user.isApproved == undefined || user.isApproved == false) ? <button className="btn btn-sm btn-danger" onClick={(e) => moneyReleaseModalOpen(e, user)} >Release Money</button> : null}
                        </div>

                      </> : <Skeleton width={100} />}

                        {isload ? <>
                          <p className='money-transfer-modal-link' onClick={(e) => moneyTransferDetailModalOpen(e, user.accountIdRequester)}>View Detail</p>

                        </> : <Skeleton width={100} />}
                      </TableCell>

                    </TableRow>

                  </>
                  ))
              }
            </Table>
          </TableContainer>
          {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null}
        </div> */}

        <div className='money-transfer-table-main'>
          <div className='money-transfer-sendertable'>
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-6 pl-0">
                  <div>
                    <div className="task-header my-3"><h5><b>From :</b></h5></div>

                    <div className="Table_title mt-1">
                      <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="search-area dbmn">
                          <div className='row'>
                            <div className='col-md-6 col-12 w-100'>
                              <form className="w-100">
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
                                          onSelect={(event, value) => {

                                            searchkey2 = event.target.value

                                            getAllInventory(true)
                                          }}
                                          className="inventory-search-bar"
                                          placeholder="Search by Name"
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




                    <TableContainer className="moneytransfertable-default-container scroll-default">
                      <Table stickyHeader className="bg-white">
                        <TableHeaderTable2 valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                          rowUserTable2.map(
                            (user, index) => (
                              <TableRow onClick={(e) => (userSelected2(e, user.id, user.name, user.mobile, user.username))} key={index} className={senderId == user.id ? 'ActiveCurrentUser' : null} id={user.id}>

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
                    <div className="task-header my-3"><h5><b>To :</b></h5></div>

                    <div className="Table_title mt-1">
                      <div className="d-flex align-items-center justify-content-between w-100" >
                        <div className="search-area dbmn">
                          <div className='row'>
                            <div className='col-md-6 col-12 w-100'>
                              <form className="w-100 ">
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
                                          onSelect={(event, value) => {

                                            searchkey3 = event.target.value

                                            getAllInventory(true)
                                          }}
                                          className="inventory-search-bar"
                                          placeholder="Search by Name"
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
                    <TableContainer className="moneytransfertable-default-container scroll-default">
                      <Table stickyHeader className="bg-white">
                        <TableHeaderTable2 valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                        {
                          rowUserTable3.map(
                            (user, index) => (
                              <TableRow onClick={(e) => userSelected3(e, user.id, user.name, user.mobile, user.username)} key={index} className={receiverId == user.id ? 'ActiveCurrentUser' : null} id={user.id}>

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
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <div className="default_modal">
                <div className="addcompanyrequest_container default_modal_padding">
                  <div className="text-center">
                    <h5><b>Money Transfer from {senderName} to {receiverName}</b></h5>
                  </div>
                  <div class="row scroll-default">
                    <div class="col-md-6">
                      <div className='default-modal-height'>
                        <div className="transation-detail-modal">
                          <div>
                            <div className="py-2">
                              <h6 className="mb-2 heading"> <b> Sender Details: </b></h6>
                            </div>
                            <div className='row'>
                              <div className='col-md-6 col-12'><p className="tex-small ">Name :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>{senderName}</b></p>
                              </div>
                              <div className='col-md-6 col-12'><p className="tex-small ">Mobile Number :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>{senderMobileNo}</b></p>
                              </div>
                              <div className='col-md-6 col-12'><p className="tex-small ">Balance :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>Rs. {senderAccountBalance}</b></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div className='default-modal-height'>
                        <div className="transation-detail-modal">
                          <div>
                            <div className="py-2">
                              <h6 className="mb-2 heading"> <b> Receiver Details: </b></h6>
                            </div>
                            <div className='row'>
                              <div className='col-md-6 col-12'><p className="tex-small ">Name :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>{receiverName}</b></p>
                              </div>
                              <div className='col-md-6 col-12'><p className="tex-small ">Mobile Number :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>{receiverMobileNo}</b></p>
                              </div>
                              <div className='col-md-6 col-12'><p className="tex-small ">Balance :</p></div>
                              <div className='col-md-6 col-12'><p className="tex-small "><b>Rs. {receiverAccountBalance}</b></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="money-transfer-modal-input">
                    <form>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Please Fill the amount to Send Money</label>
                        <input type="number" className="form-control service_input_box text-small" placeholder="Amount" aria-label="Recipient's username" aria-describedby="button-addon2" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
                      </div>
                    </form>
                  </div>
                  <div className="addcompanyrequest_buttonContainer text-center mt-2">
                    <Buttons.SecondaryButton value="Cancel" onClick={handleCloseModal} style={{ width: "50%", margin: "0px 5px" }} />
                    <Buttons.PrimaryButton value="Send" onClick={moneyTransfer} style={{ width: "50%", margin: "0px 5px" }} />
                  </div>
                </div>
              </div>
            </Dialog>


            <Dialog
              open={virtualAccountModal}
              onClose={modalClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">

              <section className="virtual-account-modal">
                <div className="default_modal_padding">
                  <div class="">
                    <>
                      <div class="close-icon border-none" onClick={modalClose}>
                        <button type="button" className="close " ><img src={closeIcon} width="20" /></button>
                      </div>
                      {modalOpenById !== rowUser ?
                        <div class="trade-modal">
                          <div className="py-2">
                            <h6 className="mb-2 heading"> <b> virtual account Details </b></h6>

                            <div className="row ">
                              <div className="col-md-4 col-12 my-2 ">
                                <div className="">
                                  <h5 className="text-small mb-1">Virtual Account Balance</h5>
                                  <h5 className="text-small m-0"><b>Rs. {accountBalance}</b></h5>
                                </div>
                              </div>
                              <div className="col-md-6 col-12 my-2">
                                <div className="">
                                  <h5 className="text-small mb-1">Amount Frozen In Ongoing Transaction</h5>
                                  <h5 className="text-small m-0"><b>Rs. {balancefreeze}</b></h5>
                                </div>
                              </div>
                            </div>

                            <div className="row ">
                              <div className="col-md-4 col-12 my-2 ">
                                <div className="">
                                  <h5 className="text-small mb-1">User ID</h5>
                                  <h5 className="text-small2 m-0">{virtualAccountUserId}</h5>
                                </div>
                              </div>
                              <div className="col-md-4 col-12 my-2">

                                <div className="">
                                  <h5 className="text-small mb-1">Virtual Account Number</h5>
                                  <h5 className="text-small2 m-0">Not Available</h5>
                                </div>
                              </div>
                              <div className="col-md-12 d-flex justify-content-end my-2">

                                <a href={downloadurl("uservirtualaccount/downloadvirtualbookexcel")}>
                                  <div className='SelectedAssest-text transfer-modal-text d-flex align-items-start'>
                                    <DownloadIcon className="download-icon" /> <p className="m-0 mx-2">Download Statement</p>
                                  </div></a>
                              </div>
                            </div>

                          </div>


                          <div class="row modal-center-row scroll-default">
                            <div class="col-md-12 ">
                              <div className='modal-height '>
                                <div className="virtual-modal-table-main " >
                                  <VirtualModalTableContent rowUser={rowUser} virtualAccountUserId={virtualAccountUserId} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        : <p>User id not matched</p>}
                    </>
                  </div>
                </div>
              </section>
            </Dialog>

            <Dialog
              open={moneyReleaseModal}
              onClose={modalClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">

              <div className=''>
                <div className='allcompany-modal-closeIcon text-right px-3 py-2'>
                  <CloseIcon onClick={modalClose} />
                </div>
                <div className="default_modal">
                  <div className="default_modal_padding">
                    <div className={classes.paper}>
                      <div className="text-center modal-header p-1 text-center">
                        <h5 className="text-primary-default text-center w-100"><b>Accept/Reject the Release Money</b></h5>
                      </div>
                      <div className="modal-body pb-5">
                        <form className="w-100">
                          <div className="form-control-row">
                            <label className="m-0 mt-2 text-small">Write - Accept or Reject -</label>

                            <select defaultValue={uaVerificationStatus} className="form-control custom-select-options" id="TimeValidity"
                              onChange={(e) => {
                                setuaVerificationStatus(e.target.value);
                              }}>
                              <option value="accept">Accept</option>
                              <option value="reject">Reject</option>
                              <option value="inprogress">InProgress</option>
                            </select>
                          </div>
                          <div className="form-control-row">
                            <label className="m-0 mt-2 text-small">Justify the decision -</label>
                            <input type="text" onChange={(e) => setuaVerificationStatusjustification(e.target.value)}
                              value={uaVerificationStatusjustification} className="form-control" />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer p-1">
                        <div className="d-flex align-items-center">
                          <Buttons.SecondaryButton onClick={modalClose} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                          <Buttons.PrimaryButton value="Submit" style={{ width: "100%", margin: "0px 3px" }} onClick={updateWithDrawRequest} />
                        </div>
                      </div>
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