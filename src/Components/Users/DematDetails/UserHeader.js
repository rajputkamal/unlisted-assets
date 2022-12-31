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





                <TableCell key="accountId">
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

                <TableCell key="dmatId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        dmatId
                    </TableSortLabel>
                </TableCell>

                <TableCell key="dpId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Mobile Number"}
                        direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Mobile Number")}
                    >
                        dpId
                    </TableSortLabel>
                </TableCell>

                <TableCell key="boId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Mobile Number"}
                        direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Mobile Number")}
                    >
                        boId
                    </TableSortLabel>
                </TableCell>

                <TableCell key="depositoryName">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Email"}
                        direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Email")}
                    >
                        depositoryName
                    </TableSortLabel>
                </TableCell>

                <TableCell key="brokerName">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Name"}
                        direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Name")}
                    >
                        brokerName
                    </TableSortLabel>
                </TableCell>

                <TableCell key="clientId">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        clientId
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

                <TableCell key="uaVerifiedStatus">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        uaVerifiedStatus
                    </TableSortLabel>
                </TableCell>

                 <TableCell key="uaVerifiedRemarks">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        uaVerifiedRemarks
                    </TableSortLabel>
                </TableCell>

            </TableRow>
        </TableHead>
    )
}