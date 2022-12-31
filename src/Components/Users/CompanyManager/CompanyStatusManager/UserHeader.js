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

          <TableCell key="dhrpFilled">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  dhrpFilled
              </TableSortLabel>
          </TableCell>

        <TableCell key="rhpFilled">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                rhpFilled
            </TableSortLabel>
        </TableCell>
          <TableCell key="ipoDatesAnnounced">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  ipoDatesAnnounced
              </TableSortLabel>
          </TableCell>
          <TableCell key="ipoTentativeDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  ipoTentativeDate
              </TableSortLabel>
          </TableCell>
          <TableCell key="listed">
          <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "Mobile Number"}
              direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
              onClick={createSortHandler("Mobile Number")}
          >
              listed
          </TableSortLabel>
      </TableCell>
          <TableCell key="blackListed">
          <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "Mobile Number"}
              direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
              onClick={createSortHandler("Mobile Number")}
          >
              blackListed
          </TableSortLabel>
      </TableCell>
          <TableCell key="merged">
          <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "Mobile Number"}
              direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
              onClick={createSortHandler("Mobile Number")}
          >
              merged
          </TableSortLabel>
      </TableCell>
          <TableCell key="split">
          <TableSortLabel
              className="Trade_Header_Name"
              style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
              IconComponent={TableArrowfunction}
              active={valueToOrderBy === "Mobile Number"}
              direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
              onClick={createSortHandler("Mobile Number")}
          >
              split
          </TableSortLabel>
      </TableCell>

          <TableCell key="createDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  createDate
              </TableSortLabel>
          </TableCell>
          <TableCell key="updateDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  updateDate
              </TableSortLabel>
          </TableCell>
      </TableRow>
    </TableHead>
  )
}