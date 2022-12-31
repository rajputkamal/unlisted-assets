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
    <TableHead>
      <TableRow >
        

        <TableCell key="Seller Name">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "Seller Name"}
                    direction={valueToOrderBy === "Seller Name" ? orderDirection : 'asc'}
                    onClick={createSortHandler("Seller Name")}
                >
                          Company Name
                </TableSortLabel>   
        </TableCell>

        <TableCell key="Qty">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Qty"}
                direction={valueToOrderBy === "Qty" ? orderDirection : 'asc'}
                onClick={createSortHandler("Qty")}
            >
                            Qty
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
                        Price/Share
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
                       Amount
              </TableSortLabel>
          </TableCell>

          <TableCell key="negotiable">
            <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "negotiable"}
              direction={valueToOrderBy === "negotiable" ? orderDirection : 'asc'}
              onClick={createSortHandler("negotiable")}
            >
                      Negotiable
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
                  Listing Owner
              </TableSortLabel>
          </TableCell>

          <TableCell key="tradeId">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "tradeId"}
                  direction={valueToOrderBy === "tradeId" ? orderDirection : 'asc'}
                  onClick={createSortHandler("tradeId")}
              >
                  Trade Id
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
                    Action
               </TableSortLabel>
          </TableCell>

        
      </TableRow>

    </TableHead>
  )
}