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
import "./tableheader.css" 

export default function TableHeader(props){
const {valueToOrderBy,orderDirection,handleRequestSort}=props
const createSortHandler =(property)=>(event)=>{
  handleRequestSort(event,property)
}
const TableArrowfunction =()=>{
  return(<div className="tableArrow"> <img src={TableArrow}  /> </div>)
}
  return(
    <TableHead>
      <TableRow style={{width:"100%"}}>
        <TableCell key="company" >
          <TableSortLabel
          IconComponent={TableArrowfunction}
          active={valueToOrderBy === "company"}
          direction={valueToOrderBy === "company" ? orderDirection : 'asc'}
         onClick={createSortHandler("company")}
          
          
          >
            Company 
          </TableSortLabel>
        </TableCell>

        <TableCell key="transactionid" >
          <TableSortLabel
          IconComponent={TableArrowfunction}
          active={valueToOrderBy=== "transactionid"}
          direction={valueToOrderBy === "transactionid" ? orderDirection : 'asc'}
          onClick={createSortHandler("transactionid")}

          >
            Transaction ID  
          </TableSortLabel>
        </TableCell>

        <TableCell key="party1" >
                <TableSortLabel
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "party1"}
                    direction={valueToOrderBy === "party1" ? orderDirection : 'asc'}
                    onClick={createSortHandler("party1")}
                >
                          Seller
                </TableSortLabel>   
        </TableCell>

        <TableCell key="party2" >
            <TableSortLabel
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "party2"}
                direction={valueToOrderBy === "party2" ? orderDirection : 'asc'}
                onClick={createSortHandler("party2")}
            >
                            Buyer
            </TableSortLabel>
        </TableCell>


         <TableCell key="amount" >
              <TableSortLabel
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "amount"}
                  direction={valueToOrderBy === "amount" ? orderDirection : 'asc'}
                  onClick={createSortHandler("amount")}
              >
                        Amount
              </TableSortLabel>
          </TableCell>

          <TableCell key="createdate">
              <TableSortLabel
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "date"}
                direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                onClick={createSortHandler("date")}
              >
                        Create - Date & Time
              </TableSortLabel>
          </TableCell>

          <TableCell key="updatedate">
              <TableSortLabel
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "date"}
                  direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                  onClick={createSortHandler("date")}
              >
                  Update - Date & Time
              </TableSortLabel>
          </TableCell>

          <TableCell key="ApprovalStatus">
              <TableSortLabel
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "status"}
                  direction={valueToOrderBy === "status" ? orderDirection : 'asc'}
                  onClick={createSortHandler("status")}
              >
                    Approval Status
               </TableSortLabel>
          </TableCell>

      </TableRow>

    </TableHead>
  )
}