import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './tableheader';
import { makeStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./tablecontent.css"
import Buttons from "../../Components/Buttons"
import AuditerScreenTransactionTabs from "./Auditorscreentab"
import AuditorTransactionDetails from "../../Pages/AuditerScreen/transactiondetail";
import {unstable_batchedUpdates} from 'react-dom'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall } from '../../Utils/Network';

// const rowInformation=[
//     {"company":"Sun Pharma","inventoryid":36,"sellername":"John","qty":15,"price":100,"date":"9 Oct 2020","negotiable": "Yes","action":"Negotiate"},
//     {"company":"Moon Pharma","inventoryid":23,"sellername":"Rose","qty":25,"price":200,"date":"28 Oct 2020","negotiable": "Yes","action":"Negotiate"},
//     {"company":"Venus Pharma","inventoryid":30,"sellername":"Daniel","qty":5,"price":10,"date":"9 nov 2020","negotiable": "No","action":"Buy"},
//     {"company":"Earth Pharma","inventoryid":34,"sellername":"Aari","qty":65,"price":160,"date":"9 Oct 2021","negotiable": "Yes","action":"Negotiate"},
//     {"company":"jupiter Pharma","inventoryid":37,"sellername":"Rio","qty":16,"price":180,"date":"11 Oct 2020","negotiable": "No","action":"Negotiate"},
//     {"company":"Mercury Pharma","inventoryid":28,"sellername":"Rafiq","qty":24,"price":250,"date":"28 Oct 2020","negotiable": "Yes","action":"Negotiate"},
//     {"company":"Saturn Pharma","inventoryid":38,"sellername":"Dinesh","qty":51,"price":105,"date":"20 nov 2020","negotiable": "No","action":"Buy"},
//     {"company":"Pluto Pharma","inventoryid":39,"sellername":"Aajith","qty":67,"price":180,"date":"23 Oct 2021","negotiable": "Yes","action":"Negotiate"},
// ]
function descendingComparator(a,b, orderBy){
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}
function getComparator(order, orderBy){
    return order === "desc" 
    ? (a,b) => descendingComparator(a,b, orderBy) 
    : (a,b) => -descendingComparator(a,b, orderBy)
}
const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el,index) => [el,index])
    stabilizedRowArray.sort((a,b)=> {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el)=> el[0])
}
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
      border:"1px solid #e0e0e0",
      borderRadius:"8px",
      background:"#ffffff"
    },
  });
export default function AuditorTransactionsForApproval(props){
    const classes = useStyles();
    let history = useHistory();
    const [isload, setLoad] = React.useState(false);
    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(1000);
    const [rowInformation,setRowInformation]=React.useState([]);
    const [rowId,setrowId]=React.useState('');
    const [row1,setrow1]=React.useState({});

    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
        
    }

    // const handleChangePage =(event,newPage)=>{
    //     setPage(newPage);
    // }
    // const handleChangeRowsPerPage =(event,newPage)=>{
    //     setRowsPerPage(parseInt(event.target.value),10)
    //     setPage(0)
    // }

    React.useEffect(() => {
        // const timer = setTimeout(() => {
        //     setLoad(true);
        // }, 3000);
        // return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        if(props.checker == "external") {
            getAllInventorytrustee()
        } else {
            getAllInventoryua()
        }
    }, []);

    const rowSelected = async (ev, row) => {
         //console.log('row Id:',rowId);

        unstable_batchedUpdates(() => {
            setrow1(row)
            setrowId(row.id);
        })

    }
    const getAllInventoryua = async function () {

        let response = await apiCall("trustee/findAll/assignedtoua", 'GET', '', history)

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        let responseJSON = await response.json();
        //console.log('utututututututut1', responseJSON)

        let a = responseJSON
        if(props.display == "inprogress") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "inprogress"))
        } else if(props.display == "approved") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "approved"))
        } else if(props.display == "notapproved") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "notapproved"))
        }  else {
            // console.log('utututututututut'+props.selectedDate+"********"+responseJSON[0].updateDate)
            // a = responseJSON.filter((row => (row.updateDate == props.selectedDate) ||(row.updateDate == undefined)))
        }

        setRowInformation(a)

        setLoad(true);
    }

    const getAllInventorytrustee = async function () {

        let response = await apiCall("trustee/findAll/assignedtotrustee", 'GET', '', history)

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        //console.log('utututututututut1', responseJSON)

        let a = responseJSON
        if(props.display == "inprogress") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "inprogress"))
        } else if(props.display == "approved") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "approved"))
        } else if(props.display == "notapproved") {
            a = responseJSON.filter((row => row.approvalStatusTrustee == "notapproved"))
        }  else {
            // console.log('utututututututut'+props.selectedDate+"********"+responseJSON[0].updateDate)
            // a = responseJSON.filter((row => (row.updateDate == props.selectedDate) ||(row.updateDate == undefined)))
        }

        setRowInformation(a)

        setLoad(true);
    }

    const refreshData = () => {
        setrowId('')

        if(props.checker == "external") {
            getAllInventorytrustee()
        } else {
            getAllInventoryua()
        }

    }
    return( <div>
                
            <div className="mt-3">
                
           <TableContainer className={classes.container}>
           
            <Table stickyHeader>
                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => (
                        <TableRow onClick={(e) => rowSelected(e, row)} key={index} className={rowId== row.id ? 'ActiveCurrentUser' : null} id={row.id}>
                            <TableCell>
                                <div className="company_cell1 d-flex align-items-center justify-content-center">
                                    <div className="company-logo-img">
                                        <img src={row.companyLogo} className="product-company-logo" />


                                    </div>
                                    <div className="company_details1 ml-2">
                                     <>
                                            <h6 className="company_name m-0"><b>{row.companyName}</b></h6>
                                            <p className="Share_type m-0">{row.commodityName}</p>
                                            {/*<p className="myHoldings_id m-0 text-default-secoundary">TXN{holding.id}</p>*/}
                                        </>
                                    </div>
                                </div>
                            {/*<div className="company_cell">*/}
                            {/*    <div ><img src={row.companyLogo} /> </div>*/}
                            {/*    <div className="company_details ">*/}
                            {/*    <p className="company_name ">{row.companyName}</p>*/}
                            {/*    /!*<p className="company_category m-0 text-small">Pharmacy</p>*!/*/}
                            {/*    /!*<p className="company_id text-small">INE045367</p>*!/*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            </TableCell>
                            <TableCell>
                                {row.ongoingTxnId}
                            </TableCell>
                            <TableCell>
                                {row.sellerAccountId}
                            </TableCell>
                            <TableCell>
                                {row.buyerAccountId}
                            </TableCell>
                            <TableCell>
                                {row.amount}
                            </TableCell>
                            <TableCell>
                                {row.createDate}
                            </TableCell>
                            <TableCell>
                                {row.updateDate}
                            </TableCell>
                            <TableCell>
                                {row.approvalStatusTrustee}
                            </TableCell>
                            {/*<TableCell>*/}
                            {/*    <p className="hover_action"> {row.action}</p>*/}
                            {/*</TableCell>*/}
                        </TableRow>
                    ))
                }
                
            </Table>
        </TableContainer>
        </div>
            {console.log("uuuuuuuuupppppppuuuuu"+row1.tradeAgreementId1+row1.ongoingTxnId)}
        {(rowId != '') ? <AuditorTransactionDetails checker={props.checker}  row={row1} refreshData={refreshData}/> : null}

        </div>
    )
    
 
}