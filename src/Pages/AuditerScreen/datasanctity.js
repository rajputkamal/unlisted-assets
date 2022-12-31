import React from 'react';
import "./datasanctity.scoped.css"
import PDF from "./picture_as_pdf.png"
import IMAGE from "./image.png"
import Comment from "./comment_bank.png"
import Buttons from '../../Components/Buttons';
import { Table, TableCell } from '@material-ui/core';
export default function DataSanctity(){
    return(<div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div>
            <Table className="datasanctity_tablehead">
                <tr className="datasanctity_tablehead_row">
                <TableCell>
                Topic of Audit 
                </TableCell>
                <TableCell>
                Related Documents 
                </TableCell>
                <TableCell>
                Comments For UA 
                </TableCell>
                <TableCell>
                Actions 
                </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    <p>Money-Match same data from 2-3 sources</p>
                    <p>Trade Ready validation To be Checked</p>
                    </TableCell>
                    <TableCell >
                    <div className="datasanctity_2ndColumn">
                    <div><img src={PDF}/>
                    <p>Account.pdf</p></div>
                    <div><img src={PDF}/>
                    <p>Trade Ready Doc.pdf</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft">Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    <p>No.of Shares - On The Fly Checks<br/>
                    No of shares to be transacted between buyer/seller <br/>should not than the be grater number of shares <br/>in "my holdings" of the seller.</p>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_2ndColumn">
                    <div><img src={PDF}/>
                    <p>Account.pdf</p></div>
                    <div><img src={PDF}/>
                    <p>Trade Ready Doc.pdf</p></div>
                    <div><img src={PDF}/>
                    <p>Trade Ready Doc.pdf</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft" >Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    <p>ID's - Matching the Decision grids</p><p>Check related Doc</p>
                    </TableCell>
                    <TableCell >
                    <div className="datasanctity_2ndColumn">
                    <div><p>Date of acceptance</p><p>5 Oct 2020, 10:00am</p></div>
                    <div><p>Share Transferred on</p><p>5 Oct 2020, 10:00am</p></div> 
                    <div><p>Money Transferred on</p><p>5 Oct 2020, 10:00am</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft">Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    Date's of Transaction - 10 July 2020, 4:30am
                    </TableCell>
                    <TableCell >
                    <div className="datasanctity_2ndColumn">
                    <div><p>Demat Account</p><p>3456785</p></div>  <div ><p>Bank Account</p><p>ICICI6543267816</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft">Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    Bank/Demat/Virtual account numbers etc-
                    </TableCell>
                    <TableCell >
                    <div className="datasanctity_2ndColumn">
                    <div><img src={PDF}/>
                    <p>Account.pdf</p></div>
                    <div><img src={PDF}/>
                    <p>Trade Ready Doc.pdf</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft">Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
                <tr>
                    <TableCell>
                    Contact
                    </TableCell>
                    <TableCell >
                    <div className="datasanctity_2ndColumn">
                    <div><p>Seller Phone Number</p><p>98765437252</p></div>
                    <div><p>Email</p><p>xyz@yahoo.com</p></div>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <img src={Comment}/><p className="datasanctity_marginLeft">Add Comment</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="datasanctity_comment">
                    <input type="checkbox"/><label>Flag</label><input type="checkbox" className="datasanctity_marginLeft"/><label>Mark for Later</label>
                    </div>
                    </TableCell>
                </tr>
            </Table>
        </div>

        
        <div style={{display:"flex",justifyContent:"space-between",margin:"20px"}}>
        <div>
            <p><b>Time Remaining For Audit</b></p>
            <div className="auditorscreen_Timer">
                <h2>40h : 30mins</h2>
            </div>
        </div>
        <div style={{display:"flex"}}>
            <p style={{marginTop:"25px"}}><b>Save Progress as Draft</b></p>
            <Buttons.SecondaryButton value="Back"/>
            <Buttons.PrimaryButton value="Next"/>
        </div>
        </div>
        
        </div>)
}