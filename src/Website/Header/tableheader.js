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
      <TableRow>
        <TableCell key="company">
          <TableSortLabel
          IconComponent={TableArrowfunction}
          active={valueToOrderBy === "company"}
          direction={valueToOrderBy === "company" ? orderDirection : 'asc'}
         onClick={createSortHandler("company")}
          
          
          >
            Company 
          </TableSortLabel>
        </TableCell>

        <TableCell key="inventoryid">
          <TableSortLabel
          IconComponent={TableArrowfunction}
          active={valueToOrderBy=== "inventoryid"}
          direction={valueToOrderBy === "inventoryid" ? orderDirection : 'asc'}
          onClick={createSortHandler("inventoryid")}

          >
            Inventory ID  
          </TableSortLabel>
        </TableCell>

        <TableCell key="sellername">
                <TableSortLabel
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "sellername"}
                    direction={valueToOrderBy === "sellername" ? orderDirection : 'asc'}
                    onClick={createSortHandler("sellername")}
                >
                          Seller Name
                </TableSortLabel>   
        </TableCell>

        <TableCell key="qty">
            <TableSortLabel
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "qty"}
                direction={valueToOrderBy === "qty" ? orderDirection : 'asc'}
                onClick={createSortHandler("qty")}
            >
                            Qty
            </TableSortLabel>
        </TableCell>


         <TableCell key="price">
              <TableSortLabel
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "price"}
                  direction={valueToOrderBy === "price" ? orderDirection : 'asc'}
                  onClick={createSortHandler("price")}
              >
                        Price/Share
              </TableSortLabel>
          </TableCell>

          <TableCell key="date">
              <TableSortLabel
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "date"}
                direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                onClick={createSortHandler("date")}
              >
                        Date & Time
              </TableSortLabel>
          </TableCell>

          <TableCell key="negotiable">
            <TableSortLabel
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "negotiable"}
              direction={valueToOrderBy === "negotiable" ? orderDirection : 'asc'}
              onClick={createSortHandler("negotiable")}
            >
                      Negotiable
            </TableSortLabel>
          </TableCell>

          <TableCell key="action">
              <TableSortLabel
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