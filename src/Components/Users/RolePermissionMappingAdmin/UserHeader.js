import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableArrow from "./table_arrow.svg"

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
              <TableCell key="ID">
                  <TableSortLabel
                      className="Trade_Header_Name"
                      style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                      IconComponent={TableArrowfunction}
                      active={valueToOrderBy === "ID"}
                      direction={valueToOrderBy === "ID" ? orderDirection : 'asc'}
                      onClick={createSortHandler("ID")}
                  >
                      ID
                  </TableSortLabel>
              </TableCell>
              <TableCell key="Name">
                  <TableSortLabel
                      className="Trade_Header_Name"
                      style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                      IconComponent={TableArrowfunction}
                      active={valueToOrderBy === "Name"}
                      direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                      onClick={createSortHandler("Name")}
                  >
                      Name
                  </TableSortLabel>
              </TableCell>

              <TableCell key="Description">
                  <TableSortLabel
                      className="Trade_Header_Name"
                      style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                      IconComponent={TableArrowfunction}
                      active={valueToOrderBy === "Description"}
                      direction={valueToOrderBy === "Description" ? orderDirection : 'asc'}
                      onClick={createSortHandler("Description")}
                  >
                      Description
                  </TableSortLabel>
              </TableCell>

          </TableRow>

      </TableHead>
  )
}