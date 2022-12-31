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
        <TableCell key="Name">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                          Name
                </TableSortLabel>   
        </TableCell>

        <TableCell key="Description">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                Description
            </TableSortLabel>
        </TableCell>
          <TableCell key="tag">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  tag
              </TableSortLabel>
          </TableCell>
          <TableCell key="subject">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  subject
              </TableSortLabel>
          </TableCell>
          <TableCell key="header">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  Action
              </TableSortLabel>
          </TableCell>
          <TableCell key="header">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  
              >
                  Button
              </TableSortLabel>
          </TableCell>
          {/* <TableCell key="header">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  header
              </TableSortLabel>
          </TableCell> */}
          {/* <TableCell key="sender">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  sender
              </TableSortLabel>
          </TableCell>
          <TableCell key="PRIORITY1">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  PRIORITY1
              </TableSortLabel>
          </TableCell>
          <TableCell key="template">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  template
              </TableSortLabel>

          </TableCell>
          <TableCell key="days">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  days
              </TableSortLabel>

          </TableCell>
          <TableCell key="hours">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  hours
              </TableSortLabel>

          </TableCell>
          <TableCell key="minutes">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  minutes
              </TableSortLabel>

          </TableCell>
          <TableCell key="holidaysConsideration">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  holidaysConsideration
              </TableSortLabel>

          </TableCell>
          <TableCell key="kycRestrictionRelaxationCount">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  kycRestrictionRelaxationCount
              </TableSortLabel>

          </TableCell> */}

      </TableRow>
    </TableHead>
  )
}