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
import "./ongoingtableheader.scoped.css" 
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
export default function OngoingransactionTableHeader(props){
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

          <TableCell key="txnId">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "date"}
                  direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                  onClick={createSortHandler("date")}
              >
                  <Tooltip title="Transaction Id" arrow placement="top-start">
                      <Button style={{color: "#721B65",textTransform:"capitalize"}}>Transaction Id</Button>
                  </Tooltip>

              </TableSortLabel>
          </TableCell>

          <TableCell key="date">
              <TableSortLabel
                style={{color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "date"}
                direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                onClick={createSortHandler("date")}
              >
                <Tooltip title="Whether the transaction type is Buy or Sell" arrow placement="top-start"> 
                  <Button style={{color: "#721B65",textTransform:"capitalize"}}>Action</Button>
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
                      <Tooltip title="Total shares under negotiation" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Shares Purchased</Button>
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
                      <Tooltip title="Price*Qty" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Amount*</Button>
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
                      <Tooltip title="Last Action time by Buyer/Seller" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Date & Time</Button>
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
                      <Tooltip title="User ID  of the seller" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Other Party User ID</Button>
                      </Tooltip>
              </TableSortLabel>
          </TableCell>

          {/*<TableCell key="action">*/}
          {/*    <TableSortLabel*/}
          {/*        style={{color: "#721B65"}}*/}
          {/*        IconComponent={TableArrowfunction}*/}
          {/*        active={valueToOrderBy === "action"}*/}
          {/*        direction={valueToOrderBy === "action" ? orderDirection : 'asc'}*/}
          {/*        onClick={createSortHandler("action")}*/}
          {/*    >*/}
          {/*            <Tooltip title="Listing Non Owner" arrow placement="top-start">*/}
          {/*              <Button style={{color: "#721B65",textTransform:"capitalize"}}>Seller Buyer User ID</Button>*/}
          {/*            </Tooltip>*/}
          {/*    </TableSortLabel>*/}
          {/*</TableCell>*/}
          <TableCell key="action">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                      <Tooltip title="Phase of Transaction" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Stage</Button>
                      </Tooltip>
               </TableSortLabel>
          </TableCell>
          <TableCell key="StageDetail">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                  <Tooltip title="Phase of Transaction" arrow placement="top-start">
                      <Button style={{color: "#721B65",textTransform:"capitalize"}}>Stage Detail</Button>
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
                      <Tooltip title="Click to see details" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize"}}>Status</Button>
                      </Tooltip>
               </TableSortLabel>
          </TableCell>

        
      </TableRow>

    </TableHead>
  )
}