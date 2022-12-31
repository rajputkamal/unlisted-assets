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
          <TableCell key="companyLogo">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "User Profile"}
                  direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                  onClick={createSortHandler("User Profile")}
              >
                  companyLogo
              </TableSortLabel>
          </TableCell>
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
        <TableCell key="accountId">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                    accountId
                </TableSortLabel>   
        </TableCell>


          <TableCell key="companyName">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                companyName
            </TableSortLabel>
        </TableCell>
        
         {/*<TableCell key="companyLogo">*/}
         {/*     <TableSortLabel*/}
         {/*         className="Trade_Header_Name"*/}
         {/*         style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}*/}
         {/*         IconComponent={TableArrowfunction}*/}
         {/*         active={valueToOrderBy === "Email"}*/}
         {/*         direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}*/}
         {/*         onClick={createSortHandler("Email")}*/}
         {/*     >*/}
         {/*         companyLogo*/}
         {/*     </TableSortLabel>*/}
         {/* </TableCell>*/}

          <TableCell key="commodityName">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Name"}
                direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                onClick={createSortHandler("Name")}
              >
                  commodityName
              </TableSortLabel>
          </TableCell>

          <TableCell key="qtyTotal">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
              >
                  qtyTotal
              </TableSortLabel>
          </TableCell>
          {/*<TableCell key="qtySale">*/}
          {/*    <TableSortLabel*/}
          {/*        className="Trade_Header_Name"*/}
          {/*        style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}*/}
          {/*        IconComponent={TableArrowfunction}*/}
          {/*        active={valueToOrderBy === "User Profile"}*/}
          {/*        direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}*/}
          {/*        onClick={createSortHandler("User Profile")}*/}
          {/*    >*/}
          {/*        qtySale*/}
          {/*    </TableSortLabel>*/}
          {/*</TableCell>*/}
          <TableCell key="qtyFreezed">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "UserName"}
                  direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                  onClick={createSortHandler("UserName")}
              >
                  qtyFreezed
              </TableSortLabel>
          </TableCell>
          <TableCell key="action">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "UserName"}
                  direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                  onClick={createSortHandler("UserName")}
              >
                  Action
              </TableSortLabel>
          </TableCell>

          {/* <TableCell key="price">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "UserName"}
                  direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                  onClick={createSortHandler("UserName")}
              >
                  price
              </TableSortLabel>
          </TableCell>
          <TableCell key="minbidprice">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "UserName"}
                  direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                  onClick={createSortHandler("UserName")}
              >
                  minbidprice
              </TableSortLabel>
          </TableCell> */}
          {/*<TableCell key="isDemated">*/}
          {/*    <TableSortLabel*/}
          {/*        className="Trade_Header_Name"*/}
          {/*        style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}*/}
          {/*        IconComponent={TableArrowfunction}*/}
          {/*        active={valueToOrderBy === "Mobile Number"}*/}
          {/*        direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}*/}
          {/*        onClick={createSortHandler("Mobile Number")}*/}
          {/*    >*/}
          {/*        isDemated*/}
          {/*    </TableSortLabel>*/}
          {/*</TableCell>*/}

          {/*<TableCell key="isVested">*/}
          {/*    <TableSortLabel*/}
          {/*        className="Trade_Header_Name"*/}
          {/*        style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}*/}
          {/*        IconComponent={TableArrowfunction}*/}
          {/*        active={valueToOrderBy === "Email"}*/}
          {/*        direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}*/}
          {/*        onClick={createSortHandler("Email")}*/}
          {/*    >*/}
          {/*        isVested*/}
          {/*    </TableSortLabel>*/}
          {/*</TableCell>*/}

          {/* <TableCell key="specialConditionTransfer">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Name"}
                  direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Name")}
              >
                  specialConditionTransfer
              </TableSortLabel>
          </TableCell>

          <TableCell key="createDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  createDate
              </TableSortLabel>
          </TableCell>
          <TableCell key="updateDate">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  updateDate
              </TableSortLabel>
          </TableCell>

          <TableCell key="uaVerificationStatus">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  uaVerificationStatus
              </TableSortLabel>
          </TableCell>
          <TableCell key="uaVerificationRemark">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  uaVerificationRemark
              </TableSortLabel>
          </TableCell>
          <TableCell key="tradeType">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  tradeType
              </TableSortLabel>
          </TableCell>
          <TableCell key="tradeStatus">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  tradeStatus
              </TableSortLabel>
          </TableCell> */}
      </TableRow>
    </TableHead>
  )
}