import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./ongoingtableheader.scoped.css" 
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import './ongoingtablecontent.scoped.css';

export default function NewOngoingransactionTableHeader(props){

  return(
    <Table>
      <TableRow>
        <TableCell key="company" style={{width: '170px'}}>  
            <Tooltip title=" Company Name" arrow placement="top-start">
              <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Company Name</Button>
            </Tooltip>
        </TableCell>

        <TableCell key="date" style={{width: '100px'}}>
                <Tooltip title="Whether the transaction type is Buy or Sell" arrow placement="top-start"> 
                  <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Buy/Sell</Button>
                </Tooltip>
          </TableCell>

          <TableCell key="txnId" style={{width: '100px', whiteSpace: 'nowrap'}}>
                  <Tooltip title="Transaction Id" arrow placement="top-start">
                      <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Transaction ID</Button>
                  </Tooltip>
          </TableCell>

          <TableCell key="availableforsell" style={{width: '190px', whiteSpace: 'nowrap'}}>
                      <Tooltip title="Total shares under negotiation" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Total Shares Traded</Button>
                      </Tooltip>
          </TableCell>

          <TableCell key="action">
                      <Tooltip title="Price*Qty" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Price</Button>
                      </Tooltip>
          </TableCell>
         
          <TableCell key="action">
                      <Tooltip title="Last Action time by Buyer/Seller" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Date & Time</Button>
                      </Tooltip>
          </TableCell>

          <TableCell key="StageDetail">
                  <Tooltip title="Phase of Transaction" arrow placement="top-start">
                      <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Stage Details</Button>
                  </Tooltip>
          </TableCell>

          <TableCell key="action">
                      <Tooltip title="Click to see details" arrow placement="top-start">
                        <Button style={{color: "#721B65",textTransform:"capitalize", fontSize:"16px"}}>Action</Button>
                      </Tooltip>
          </TableCell>
          
      </TableRow>
    </Table>
  )
}