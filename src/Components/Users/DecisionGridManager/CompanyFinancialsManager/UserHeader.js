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
          <TableCell key="Decision Grid ID">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  Decision Grid ID
              </TableSortLabel>
          </TableCell>
          <TableCell key="Description">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  Description
              </TableSortLabel>
          </TableCell>
          <TableCell key="userType">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  userType
              </TableSortLabel>
          </TableCell>
          <TableCell key="companyType">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  companyType
              </TableSortLabel>
          </TableCell>
          <TableCell key="priority">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  priority
              </TableSortLabel>
          </TableCell>
          <TableCell key="tradeId">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  tradeId
              </TableSortLabel>
          </TableCell>
          <TableCell key="userID">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  userID
              </TableSortLabel>
          </TableCell>
          <TableCell key="band">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  band
              </TableSortLabel>
          </TableCell>
          <TableCell key="txnAmountFrom">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  txnAmountFrom
              </TableSortLabel>
          </TableCell>

      <TableCell key="txnAmountTo">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "User Profile"}
                    direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                    onClick={createSortHandler("User Profile")}
                >
                    txnAmountTo
                </TableSortLabel>   
        </TableCell>
        <TableCell key="dateTimeFrom">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                    dateTimeFrom
                </TableSortLabel>   
        </TableCell>

          <TableCell key="dataTimeTo">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  dataTimeTo
              </TableSortLabel>
          </TableCell>

        <TableCell key="txnNumber">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                txnNumber
            </TableSortLabel>
        </TableCell>

          <TableCell key="tradeType">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "tradeType"}
                  direction={valueToOrderBy === "tradeType" ? orderDirection : 'asc'}
                  onClick={createSortHandler("tradeType")}
              >
                  tradeType
              </TableSortLabel>
          </TableCell>

          <TableCell key="buyerFee">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  buyerFee
              </TableSortLabel>
          </TableCell>
          <TableCell key="sellerFee">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  sellerFee
              </TableSortLabel>
          </TableCell>
          <TableCell key="flatFee">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  flatFee
              </TableSortLabel>
          </TableCell>
          <TableCell key="earning">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Mobile Number"}
                  direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Mobile Number")}
              >
                  earning
              </TableSortLabel>
          </TableCell>

      </TableRow>
    </TableHead>
  )
}