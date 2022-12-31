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
      {/*<TableCell key="User Profile">*/}
      {/*          <TableSortLabel*/}
      {/*              className="Trade_Header_Name"*/}
      {/*              style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}*/}
      {/*              IconComponent={TableArrowfunction}*/}
      {/*              active={valueToOrderBy === "User Profile"}*/}
      {/*              direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}*/}
      {/*              onClick={createSortHandler("User Profile")}*/}
      {/*          >*/}
      {/*                    User Profile*/}
      {/*          </TableSortLabel>   */}
      {/*  </TableCell>*/}
        <TableCell key="UserName">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                          UserName
                </TableSortLabel>   
        </TableCell>

        <TableCell key="Mobile Number">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                            Mobile Number
            </TableSortLabel>
        </TableCell>
        
         <TableCell key="Email">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Email"}
                  direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Email")}
              >
                        Email
              </TableSortLabel>
          </TableCell>

          <TableCell key="Name">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Name"}
                direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                onClick={createSortHandler("Name")}
              >
                       Name
              </TableSortLabel>
          </TableCell>

          <TableCell key="Name">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
              >
                       Action
              </TableSortLabel>
          </TableCell>

      </TableRow>
    </TableHead>
  )
}