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
import FilterCard from "../../../Components/FilterCard"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './index.css'
import UserIcon from './user.png';
import DragDropTable from './DragDrop/Index'
import { apiCall, apiCall1, apiCall12, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadingImg from './loading.gif';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

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
  const [isload, setLoad] = useState(false);
  const [isloading, setLoading] = useState(false);

  let searchkey = ''

  //   React.useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setLoad(true);
  //       }, 2000);
  //       return () => clearTimeout(timer);
  // }, []);

  const [rowInformation, setRowInformation] = useState([])
  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  }

  const [rowUser, setRowUser] = useState([])
  const [rowUserRoles, setRowUserRoles] = useState([]);
  const [rowAllRoles, setRowAllRoles] = useState([]);
  const [activeClass, setClass] = useState('');
  const [checkuser, setCheckuser] = useState('');
  const [userselected, setUserselected] = useState('');

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

  React.useEffect(() => {
    getSearchOption()
    getAllInventory()
  }, []);

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


  // React.useEffect(() => { 
  //   const interval = setInterval(() => { 
  //     console. log('This will run every 5 second! '); 
  //   }, 5000); 
  //   return () => clearInterval(interval); }, []);

  const getAllInventory = async function () {
    setLoading(true)
    let response1 = await apiCall12("roles/search/findByNameContaining?searchKey=" + searchkey, 'GET', '', history)
    //console.log(response1)
    let responseJSON1 = await response1.json();
    //console.log(responseJSON1._embedded.roles)
    setRowUser(responseJSON1._embedded.roles)
    setLoading(false)
    setLoad(true);
  }

  const userSelected = async (ev, userId) => {
    //console.log('user Id:',userId);
    setUserId(userId);
    let response2 = await apiCall("admincontroller/rolepermission/" + userId, 'GET', '', history)
    //console.log(response2)
    let responseJSON2 = await response2.json();
    //console.log(responseJSON2)
    await setRowUserRoles(responseJSON2)

    let response3 = await apiCall("admincontroller/permission", 'GET', '', history)
    //console.log(response3)
    let responseJSON3 = await response3.json();
    //console.log('rowAllRoles', responseJSON3)
    await setRowAllRoles(responseJSON3)
  }

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

  return (
    <div className="user_table_section">

<div className="dbmn">
        <div className="Table_title">
            <div className="d-flex align-items-center justify-content-start w-100">
                <h5 className='main-heading'><b>Role Permission Mapping Admin</b></h5>
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
                                                        placeholder="Search Role Name"
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

      <div className="table-container">
        <div className="userTable">
          <TableContainer className={classes.container}>
            <Table stickyHeader className="bg-white">
              <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
              {
                rowUser.map(
                  (user, index) => (
                    <TableRow onClick={(e) => userSelected(e, user.id)} key={index} className={userId == user.id ? 'ActiveCurrentUser' : null} id={user.id}>
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
                      <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                      <TableCell>{isload ? <> {user.description} </> : <Skeleton width={100} />}</TableCell>
                    </TableRow>
                  ))
              }
            </Table>
          </TableContainer>
          {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null}
        </div>
        <DragDropTable rowUserRoles={rowUserRoles} rowAllRoles={rowAllRoles} userId={userId} />
      </div>
    </div>
  )
}