import React from 'react';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableArrow from "./table_arrow.svg"
import "../OnGoingTransaction//ongoingtableheader.scoped.css" 
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
export default function TransactionHistoryTableHeader(props){
const {valueToOrderBy,orderDirection,handleRequestSort}=props
const createSortHandler =(property)=>(event)=>{
  handleRequestSort(event,property)
}
const TableArrowfunction =()=>{
  return(<div className="tableArrow"> <img src={TableArrow}  /> </div>)
}
const Test =()=>{
  return(<div className="tableArrow"> <p>Test</p></div>)
}
  return(
    <TableHead>
      <TableRow>
        <TableCell key="company" >
          <TableSortLabel
          style={{color: "#721B65"}}
          IconComponent={TableArrowfunction}
          test={Test}
          active={valueToOrderBy === "company"}
          direction={valueToOrderBy === "company" ? orderDirection : 'asc'}
         onClick={createSortHandler("company")}
          
          >
            <Tooltip title=" Company Name" arrow placement="top-start">
              <Button style={{color: "#721B65",textTransform:"capitalize"}}>Company</Button>
            </Tooltip>
          </TableSortLabel>
        </TableCell>

        {/*<TableCell key="verified">*/}
        {/*    <TableSortLabel*/}
        {/*      style={{color: "#721B65"}}*/}
        {/*      IconComponent={TableArrowfunction}*/}
        {/*      active={valueToOrderBy === "verified"}*/}
        {/*      direction={valueToOrderBy === "verified" ? orderDirection : 'asc'}*/}
        {/*      onClick={createSortHandler("verified")}*/}
        {/*    >*/}
        {/*              Transaction ID*/}
        {/*    </TableSortLabel>*/}
        {/*  </TableCell>*/}

          <TableCell key="date">
          
                <Tooltip title="Action" arrow placement="top-start">
                  
                  <Button style={{color: "#721B65",textTransform:"capitalize"}}>Transaction ID</Button>
                </Tooltip>
                        
              
          </TableCell>

          <TableCell key="availableforsell">
            <TableSortLabel
              style={{color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "availableforsell"}
              direction={valueToOrderBy === "availableforsell" ? orderDirection : 'asc'}
              onClick={createSortHandler("availableforsell")}
            >
                      <Tooltip title="Total Shares under Negotiation" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Order</Button>
                      </Tooltip>
            </TableSortLabel>
          </TableCell>

          <TableCell key="availableforsell">
            <TableSortLabel
              style={{color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "availableforsell"}
              direction={valueToOrderBy === "availableforsell" ? orderDirection : 'asc'}
              onClick={createSortHandler("availableforsell")}
            >
                      <Tooltip title="Total Shares under Negotiation" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Qty</Button>
                      </Tooltip>
            </TableSortLabel>
          </TableCell>

          <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Approx Amount Under Consideration" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Price/Share</Button>
                      </Tooltip>
               </TableSortLabel>
          </TableCell>
          <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Listing Owner" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Amount</Button>
                      </Tooltip>
              </TableSortLabel>
          </TableCell>

          <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65", marginRight:"50px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Date & Time" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Date&Time</Button>
                      </Tooltip>
               </TableSortLabel>
          </TableCell>
          <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Status" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Status</Button>
                      </Tooltip>
               </TableSortLabel>
          </TableCell>

          {/* <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Listing Non Owner" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>NonOwner</Button>
                      </Tooltip>
              </TableSortLabel>
          </TableCell> */}

          

        
      </TableRow>

    </TableHead>
  )
}