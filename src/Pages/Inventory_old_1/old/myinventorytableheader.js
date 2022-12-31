import React from 'react';
//import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableArrow from "./table_arrow.svg"
import "./myinventorytableheader.css" 
export default function MyHoldingsTableHeader(props){
const {valueToOrderBy,orderDirection,handleRequestSort}=props
const createSortHandler =(property)=>(event)=>{
  handleRequestSort(event,property)
}
const TableArrowfunction =()=>{
  return(<div className="tableArrow"> <img src={TableArrow}  /> </div>)
}
  return(
    <TableHead className="sticky-top">
      <TableRow >
        <TableCell key="seller Name">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "seller Name"}
                    direction={valueToOrderBy === "seller Name" ? orderDirection : 'asc'}
                    onClick={createSortHandler("seller Name")}
                >
                          <Tooltip title="Company Name" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} >Company</Button>
                          </Tooltip>
                </TableSortLabel>   
        </TableCell>

        <TableCell key="qty">
            <TableSortLabel
                className="Trade_Header_Name "
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "qty"}
                direction={valueToOrderBy === "qty" ? orderDirection : 'asc'}
                onClick={createSortHandler("qty")}
                // active={valueToOrderBy === "price"}
                //   direction={valueToOrderBy === "price" ? orderDirection : 'asc'}
                //   onClick={createSortHandler("price")}
            >
                          <Tooltip title="Quantity" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} className='table_heading_qty' >Qty</Button>
                          </Tooltip>
            </TableSortLabel>
        </TableCell>
        
         <TableCell key="price">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "price"}
                  direction={valueToOrderBy === "price" ? orderDirection : 'asc'}
                  onClick={createSortHandler("price")}
              >
                          <Tooltip title="Price/Share" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} >Price/Share</Button>
                          </Tooltip>
              </TableSortLabel>
          </TableCell>

          <TableCell key="amount">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "amount"}
                direction={valueToOrderBy === "amount" ? orderDirection : 'asc'}
                onClick={createSortHandler("amount")}
              >
                          <Tooltip title="Amount" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} className='table_heading_amount'>Amount</Button>
                          </Tooltip>
              </TableSortLabel>
          </TableCell>

          <TableCell key="lastUpdatedDate">
            <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "negotiable"}
              direction={valueToOrderBy === "negotiable" ? orderDirection : 'asc'}
              onClick={createSortHandler("lastUpdatedDate")}
            >
                          <Tooltip title="Last Updated Date and Time" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} >Last Updated</Button>
                          </Tooltip>
            </TableSortLabel>
          </TableCell>

          <TableCell key="accountId">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "accountId"}
                  direction={valueToOrderBy === "accountId" ? orderDirection : 'asc'}
                  onClick={createSortHandler("accountId")}
              >
                          <Tooltip title="Seller Name" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} >Seller Name</Button>
                          </Tooltip>
              </TableSortLabel>
          </TableCell>

          <TableCell key="action">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "action"}
                  direction={valueToOrderBy === "action" ? orderDirection : 'asc'}
                  onClick={createSortHandler("action")}
              >
                          <Tooltip title="Action" arrow placement="top-start">
                            <Button style={{color: "#721B65",textTransform:"capitalize"}} className='table_heading_action'>Action</Button>
                          </Tooltip>
               </TableSortLabel>
          </TableCell>

        
      </TableRow>

      

    </TableHead>
  )
}