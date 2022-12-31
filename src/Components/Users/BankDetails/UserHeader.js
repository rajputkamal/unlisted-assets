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

                <TableCell key="accountNumber">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65", width: "100px" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "UserName"}
                        direction={valueToOrderBy === "UserName" ? orderDirection : 'asc'}
                        onClick={createSortHandler("UserName")}
                    >
                        Account Number
                    </TableSortLabel>
                </TableCell>

                <TableCell key="ifsccode">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Mobile Number"}
                        direction={valueToOrderBy === "Mobile Number" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Mobile Number")}
                    >
                        ifsc Code
                    </TableSortLabel>
                </TableCell>

                <TableCell key="BankName">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Email"}
                        direction={valueToOrderBy === "Email" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Email")}
                    >
                        Bank Name
                    </TableSortLabel>
                </TableCell>

                <TableCell key="BranchName">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                        active={valueToOrderBy === "Name"}
                        direction={valueToOrderBy === "Name" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Name")}
                    >
                        Branch Name
                    </TableSortLabel>
                </TableCell>

                <TableCell key="VerifiedStatus">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        Verified Status
                    </TableSortLabel>
                </TableCell>
                <TableCell key="VerifiedRemarks">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        Verified Remarks
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
                <TableCell key="UserID">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        User ID
                    </TableSortLabel>
                </TableCell>
                <TableCell key="VirtualAccount">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        Virtual Account
                    </TableSortLabel>
                </TableCell>
                <TableCell key="lastCreationRequestRemarks">
                    <TableSortLabel
                        className="Trade_Header_Name"
                        style={{ fontWeight: "500", fontSize: "14px", color: "#721B65" }}
                        IconComponent={TableArrowfunction}
                    >
                        last Creation Request Remarks
                    </TableSortLabel>
                </TableCell>

                
            </TableRow>
        </TableHead>
    )
}