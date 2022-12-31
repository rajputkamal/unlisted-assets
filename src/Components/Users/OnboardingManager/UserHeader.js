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
      <TableCell key="User Profile">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "User Profile"}
                    direction={valueToOrderBy === "User Profile" ? orderDirection : 'asc'}
                    onClick={createSortHandler("User Profile")}
                >
                          User Profile
                </TableSortLabel>   
        </TableCell>
        <TableCell key="ID">
                <TableSortLabel
                    className="Trade_Header_Name"
                    style={{fontWeight: "500",fontSize: "14px",color: "#721B65",width:"100px"}}
                    IconComponent={TableArrowfunction}
                    active={valueToOrderBy === "UserName"}
                    direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                    onClick={createSortHandler("UserName")}
                >
                          ID
                </TableSortLabel>   
        </TableCell>

        <TableCell key="name">
            <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Mobile Number"}
                direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                onClick={createSortHandler("Mobile Number")}
            >
                name
            </TableSortLabel>
        </TableCell>
        
         {/* <TableCell key="userType">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
                  active={valueToOrderBy === "Email"}
                  direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                  onClick={createSortHandler("Email")}
              >
                  userType
              </TableSortLabel>
          </TableCell> */}

          <TableCell key="accountId">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
                active={valueToOrderBy === "Name"}
                direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                onClick={createSortHandler("Name")}
              >
                  accountId
              </TableSortLabel>
          </TableCell>

          <TableCell key="uaVerifiedStatus">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  uaVerifiedStatus
              </TableSortLabel>
          </TableCell>

          <TableCell key="Action">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
              >
                  isUserAccountActive
              </TableSortLabel>
          </TableCell>

          <TableCell key="isUserAccountActive">
              <TableSortLabel
                className="Trade_Header_Name"
                style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                IconComponent={TableArrowfunction}
              >
                Action  
              </TableSortLabel>
          </TableCell>


          
          {/* <TableCell key="bussinessName">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  bussinessName
              </TableSortLabel>
          </TableCell>
          <TableCell key="mobileNumber">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  mobileNumber
              </TableSortLabel>
          </TableCell>
          <TableCell key="residentStatus">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  residentStatus
              </TableSortLabel>
          </TableCell>
          <TableCell key="nsdlAccount">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  nsdlAccount
              </TableSortLabel>
          </TableCell>
          <TableCell key="email">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  email
              </TableSortLabel>
          </TableCell>
          <TableCell key="notificationsChoice">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  notificationsChoice
              </TableSortLabel>
          </TableCell>
          <TableCell key="dob">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  dob
              </TableSortLabel>
          </TableCell>
          <TableCell key="spouseFatherName">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  spouseFatherName
              </TableSortLabel>
          </TableCell>
          <TableCell key="isResidentStatusVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isResidentStatusVerified
              </TableSortLabel>
          </TableCell>

          <TableCell key="panNumber">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  panNumber
              </TableSortLabel>
          </TableCell>
          <TableCell key="isPanNumberVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isPanNumberVerified
              </TableSortLabel>
          </TableCell>
          <TableCell key="aadharNumber">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  aadharNumber
              </TableSortLabel>
          </TableCell>
          <TableCell key="isAadharLinkedPhone">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isAadharLinkedPhone
              </TableSortLabel>
          </TableCell>
          <TableCell key="isAadharLinkedPhonOTPSent">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isAadharLinkedPhonOTPSent
              </TableSortLabel>
          </TableCell>
          <TableCell key="isAAdharNumberVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isAAdharNumberVerified
              </TableSortLabel>
          </TableCell>
          <TableCell key="isAddressVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isAddressVerified
              </TableSortLabel>
          </TableCell>
          <TableCell key="isBankVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isBankVerified
              </TableSortLabel>
          </TableCell>

          <TableCell key="isBusinessNameVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isBusinessNameVerified
              </TableSortLabel>
          </TableCell>
          <TableCell key="isEmailVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isEmailVerified
              </TableSortLabel>
          </TableCell>
          <TableCell key="isMobileVerified">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  isMobileVerified
              </TableSortLabel>
          </TableCell>

          <TableCell key="nuPayTransactionId">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  nuPayTransactionId
              </TableSortLabel>
          </TableCell>
          <TableCell key="nuPayReferenceNumber">
              <TableSortLabel
                  className="Trade_Header_Name"
                  style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}
                  IconComponent={TableArrowfunction}
              >
                  nuPayReferenceNumber
              </TableSortLabel>
          </TableCell> */}
      </TableRow>
    </TableHead>
  )
}