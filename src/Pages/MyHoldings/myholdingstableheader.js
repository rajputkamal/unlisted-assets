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
import "./myholdingstableheader.scoped.css" 
import Tooltip from '@mui/material/Tooltip';
import Button from '@material-ui/core/Button'; 

export default function MyHoldingsTableHeader(props){
const {valueToOrderBy,orderDirection,handleRequestSort}=props
const createSortHandler =(property)=>(event)=>{
  handleRequestSort(event,property)
}
const TableArrowfunction =()=>{
  return(<div className="tableArrow"> <img src={TableArrow}  /> </div>)
}
  return(
    <TableHead >
      <TableRow >
        <TableCell key="company" >
          <TableSortLabel style={{color: "#721B65"}}
          IconComponent={TableArrowfunction}
          active={valueToOrderBy === "company"}
          direction={valueToOrderBy === "company" ? orderDirection : 'asc'}
         onClick={createSortHandler("company")}
          >
            Company
          </TableSortLabel>
        </TableCell>

        <TableCell key="verified">
            <TableSortLabel
              style={{color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "verified"}
              direction={valueToOrderBy === "verified" ? orderDirection : 'asc'}
              onClick={createSortHandler("verified")}
            >
              <Tooltip title="Whether your holdings is verfied by the Platform" arrow placement="top-start">
                <Button style={{color: "#721B65",textTransform:"capitalize"}}>Verification Status</Button>
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
                <Tooltip title="Time when your holdings where last edited" arrow placement="top-start">
                <Button style={{color: "#721B65",textTransform:"capitalize"}}>Last Edited</Button>
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
              <Tooltip title="No of shares out of your total holdings, listed for sale in the marketplace" arrow placement="top-start">
                <Button style={{color: "#721B65",textTransform:"capitalize"}}>Shares for Sale</Button>
              </Tooltip>
                      
            </TableSortLabel>
          </TableCell>

         <TableCell key="qtyfreezed">
              <TableSortLabel
                  style={{color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "qtyfreezed"}
                  direction={valueToOrderBy === "qtyfreezed" ? orderDirection : 'asc'}
                  onClick={createSortHandler("qtyfreezed")}
              >
                  Qty Freezed
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
                    Action
               </TableSortLabel>
          </TableCell>

        
      </TableRow>

    </TableHead>
  )
}