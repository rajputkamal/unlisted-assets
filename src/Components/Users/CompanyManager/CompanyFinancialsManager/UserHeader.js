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
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  ID
              </TableSortLabel>
          </TableCell>

      <TableCell key="Company Name">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "User Profile"}
                    direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                    onClick={createSortHandler("User Profile")}
                >
                    Company Name
                </TableSortLabel>   
        </TableCell>
        <TableCell key="Company CIN">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                    Company CIN
                </TableSortLabel>   
        </TableCell>
          <TableCell key="Type">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  Type
              </TableSortLabel>
          </TableCell>
          <TableCell key="Name">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  Name
              </TableSortLabel>
          </TableCell>
          <TableCell key="FY 2016">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  FY 2016
              </TableSortLabel>
          </TableCell>
          <TableCell key="FY 2017">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  FY 2017
              </TableSortLabel>
          </TableCell>
          <TableCell key="FY 2018">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  FY 2018
              </TableSortLabel>
          </TableCell>
          <TableCell key="FY 2019">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  FY 2019
              </TableSortLabel>
          </TableCell>
          <TableCell key="FY 2020">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  FY 2020
              </TableSortLabel>
          </TableCell>

        <TableCell key="associatedNumber">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                Associated Number
            </TableSortLabel>
        </TableCell>

          <TableCell key="ordering">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  Ordering
              </TableSortLabel>
          </TableCell>

      </TableRow>
    </TableHead>
  )
}