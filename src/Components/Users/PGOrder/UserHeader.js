import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableArrow from "./table_arrow.svg"

export default function MyHoldingsTableHeader(props) {
    const { valueToOrderBy, orderDirection, handleRequestSort } = props
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    const TableArrowfunction = () => {
        return (<div className="tableArrow"> <img src={TableArrow} /> </div>)
    }
    return (
        <TableHead>
            <TableRow >

                <TableCell key="accountID">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        Account ID
                    </TableSortLabel>
                </TableCell>

                <TableCell key="onGoingTxnId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        OnGoing Txn ID
                    </TableSortLabel>
                </TableCell>

                <TableCell key="tradeAgreementId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        Trade Agreement Id
                    </TableSortLabel>
                </TableCell>

                <TableCell key="ID">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        orderId
                    </TableSortLabel>
                </TableCell>

                <TableCell key="name">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Mobile Number"}
                        direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Mobile Number")}
                    >
                        orderToken
                    </TableSortLabel>
                </TableCell>

                <TableCell key="userType">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Email"}
                        direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Email")}
                    >
                        orderStatus
                    </TableSortLabel>
                </TableCell>

                

                <TableCell key="uaVerifiedStatus">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        amount
                    </TableSortLabel>
                </TableCell>
                
                <TableCell key="Action">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        Action
                    </TableSortLabel>
                </TableCell>            
                

                
            </TableRow>
        </TableHead>
    )
}