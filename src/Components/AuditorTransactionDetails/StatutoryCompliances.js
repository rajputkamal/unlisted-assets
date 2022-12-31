import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PdfIcon from '../../Components/AuditorTransactionDetails/assets/pdf.svg'
import CommentIcon from '../../Components/AuditorTransactionDetails/assets/comment.svg'
import Pdf from '../../Components/AuditorTransactionDetails/Files/dummy.pdf';
import Popper from '@material-ui/core/Popper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useHistory
} from "react-router-dom";
import { apiCall } from '../../Utils/Network';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid #cecbcf',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px'
  },
}));
export default function StatutoryCompliances(props){
  let history = useHistory();
  const [rowInformation,setRowInformation]=React.useState([]);
  const [isload, setLoad] = React.useState(false);
  const [trusteeapprovalid, settrusteeapprovalid] = React.useState(props.rowId);
  const [type, settype] = React.useState(props.type);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    getAllInventory()
  }, []);

  const getAllInventory = async function () {

    let response = await apiCall("/findAlldetail/assignedtotrustee/"+{trusteeapprovalid}+"/"+{type}, 'GET', '', history)
    //console.log(response)
    let responseJSON = await response.json();
    //console.log(responseJSON)


    setRowInformation(responseJSON)
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
    return(
      <div className="transactiondetails-cmp mt-4">
      <div className="my-card">
        <div className="card-title">
          <h5><b>Statutory Compliances</b></h5>
          <div className="title-border"></div>
        </div>
        <div className="custom-table-sec">
          <table className="custom-table table table-hover mt-1">
            <thead>
              <tr>
                <th>Topic of Audit</th>
                <th>Related Documents</th>
                <th>Comments for UA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td>
                  <div className="text-center float-left pdf-sec">
                    <a href = {Pdf} target = "_blank"><img src={PdfIcon}/><br /> Account.Pdf</a>
                  </div>
                  <div className="text-center float-left pdf-sec">
                    <a href = {Pdf} target = "_blank"><img src={PdfIcon}/><br /> TradeReady.Pdf</a>
                  </div>
                </td>
                <td>
                  <div className="float-left comment-sec comment-box " aria-describedby={id} type="button" onClick={handleClick}>
                    <img src={CommentIcon}/> Add Comment
                  </div>
                  <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                      <form>
                        <input type="text" placeholder="Add Your Comment" className="add_comment_input"/>
                        <div className="d-flex mt-2"> <button className="btn btn-sm btn-comment-cancel" onClick={handleClick}>Cancel</button><button className="btn btn-sm btn-comment-add">Add</button></div>
                      </form>
                    </div>
                  </Popper>
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td><div className="text-center float-left"><img src={PdfIcon}/><br /> Account.Pdf</div></td>
                <td>
                  <div className="float-left comment-sec comment-box " aria-describedby={id} type="button" onClick={handleClick}>
                    <img src={CommentIcon}/> Add Comment
                  </div>
                  <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                      <form>
                        <input type="text" placeholder="Add Your Comment" className="add_comment_input"/>
                        <div className="d-flex mt-2"> <button className="btn btn-sm btn-comment-cancel" onClick={handleClick}>Cancel</button><button className="btn btn-sm btn-comment-add">Add</button></div>
                      </form>
                    </div>
                  </Popper>
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td><div className="text-center float-left"><img src={PdfIcon}/><br /> Account.Pdf</div></td>
                <td className="comment-box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td>
                  <div className="text-center float-left text-small">
                    Date of acceptance <br />
                    <b className="acceptance">5 Oct 2020, 10:00 AM</b>
                  </div>
                  <div className="text-center float-left text-small">
                    Date of acceptance <br />
                    <b className="acceptance">5 Oct 2020, 10:00 AM</b>
                  </div>
                </td>
                <td>
                  <div className="float-left comment-sec comment-box " aria-describedby={id} type="button" onClick={handleClick}>
                    <img src={CommentIcon}/> Add Comment
                  </div>
                  <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                      <form>
                        <input type="text" placeholder="Add Your Comment" className="add_comment_input"/>
                        <div className="d-flex mt-2"> <button className="btn btn-sm btn-comment-cancel" onClick={handleClick}>Cancel</button><button className="btn btn-sm btn-comment-add">Add</button></div>
                      </form>
                    </div>
                  </Popper>
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td><div className="text-center float-left"><img src={PdfIcon}/><br /> Account.Pdf</div></td>
                <td>
                  <div className="float-left comment-sec comment-box " aria-describedby={id} type="button" onClick={handleClick}>
                    <img src={CommentIcon}/> Add Comment
                  </div>
                  <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                      <form>
                        <input type="text" placeholder="Add Your Comment" className="add_comment_input"/>
                        <div className="d-flex mt-2"> <button className="btn btn-sm btn-comment-cancel" onClick={handleClick}>Cancel</button><button className="btn btn-sm btn-comment-add">Add</button></div>
                      </form>
                    </div>
                  </Popper>
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Money - Match same data from 2-3 sources<br />Trade Ready Validation to be checked</td>
                <td><div className="text-center float-left"><img src={PdfIcon}/><br /> Account.Pdf</div></td>
                <td className="comment-box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </td>
                <td>
                  <div className="check-sec">
                    <div class="form-check  d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Flag</label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                      <label class="form-check-label" for="exampleCheck2">Marks For Later</label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}
