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
          <TableCell key="Logo">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  Logo
              </TableSortLabel>
          </TableCell>
      <TableCell key="id">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "User Profile"}
                    direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                    onClick={createSortHandler("User Profile")}
                >
                    id
                </TableSortLabel>   
        </TableCell>
        <TableCell key="name">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                    name
                </TableSortLabel>   
        </TableCell>

        <TableCell key="slug">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                slug
            </TableSortLabel>
        </TableCell>
        
         <TableCell key="isin">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Email"}
                  direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Email")}
              >
                  isin
              </TableSortLabel>
          </TableCell>

          <TableCell key="legalName">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Name"}
                direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                onClick={createSortHandler("Name")}
              >
                  legalName
              </TableSortLabel>
          </TableCell>

          <TableCell key="actions">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
              >
                  Actions
              </TableSortLabel>
          </TableCell>

          {/* <TableCell key="description">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  description
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="keyProductsSegmentsDescription">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  keyProductsSegmentsDescription
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="incorporationDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  incorporationDate
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="type">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  type
              </TableSortLabel>
          </TableCell>
          <TableCell key="address">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  address
              </TableSortLabel>
          </TableCell> */}
          {/* <TableCell key="cin">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  cin
              </TableSortLabel>
          </TableCell>

          <TableCell key="pan">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  pan
              </TableSortLabel>
          </TableCell>

          <TableCell key="gst_registration">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  gst_registration
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="TemporarilyActive">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  TemporarilyActive
              </TableSortLabel>
          </TableCell>

          <TableCell key="sector">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  sector
              </TableSortLabel>
          </TableCell>

          <TableCell key="seriesFunding">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  seriesFunding
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="lastFundRaisingValuation">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  lastFundRaisingValuation
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="ordering">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  ordering
              </TableSortLabel>
          </TableCell> */}

          {/* <TableCell key="UA_Hide">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  UA_Hide
              </TableSortLabel>
          </TableCell>

          <TableCell key="IsApproachingIPO">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  IsApproachingIPO
              </TableSortLabel>
          </TableCell>

          <TableCell key="IsAcquired">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  IsAcquired
              </TableSortLabel>
          </TableCell>

          <TableCell key="UA_LISTING_AVAILABLE">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  UA_LISTING_AVAILABLE
              </TableSortLabel>
          </TableCell> */}


          {/* <TableCell key="downloadReport">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  downloadReport
              </TableSortLabel>
          </TableCell>

          <TableCell key="titleMetaTag">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  titleMetaTag
              </TableSortLabel>
          </TableCell>

          <TableCell key="descriptionMetaTag">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  descriptionMetaTag
              </TableSortLabel>
          </TableCell> */}

      </TableRow>
    </TableHead>
  )
}