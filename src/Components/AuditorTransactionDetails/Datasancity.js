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


export default function DataSancity(props){
  let history = useHistory();
  const [rowInformation,setRowInformation]=React.useState([]);
  const [isload, setLoad] = React.useState(false);
  const [trusteeapprovalid, settrusteeapprovalid] = React.useState(props.row.id);
  const [type, settype] = React.useState(props.type);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoad(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  React.useEffect(() => {
    getAllInventory()
  }, [props]);

  const getAllInventory = async function () {

    let response = await apiCall("trustee/findAlldetail/assignedtotrustee/"+props.row.id+"/"+props.type, 'GET', '', history)
    // console.log(response)
    let responseJSON = await response.json();
    // console.log(responseJSON.length+"kkkkkkkkkkkkk")
    // alert("hi"+props.row.id)
    setRowInformation([])
    setRowInformation(responseJSON)
  }

  const editInventory = async function (row) {


    if(props.checker == "external") {
      let response = await apiCall("trustee/trustee/trusteeapprovaldetail", 'PUT', row, history)
      // console.log(response)
      let responseJSON = await response.json();
      // console.log(responseJSON)


    } else {
      let response = await apiCall("trustee/ua/trusteeapprovaldetail", 'PUT', row, history)
      // console.log(response)
      let responseJSON = await response.json();
      // console.log(responseJSON)
    }


    getAllInventory()
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
          <h5><b>{props.type == 'TransactionDetails' ? "General Information": props.type}</b></h5>
          <div className="title-border"></div>
        </div>

        <div className={props.type == 'TransactionDetails' ? "custom-table-sec-TransactionDetails": "custom-table-sec"}>
          <table className="custom-table table table-hover mt-1">
            <thead>
            <tr>
              <th>Topic of Audit</th>
              {/*<th>Related Documents</th>*/}
              <th>Comments for Trustee</th>
              <th>Comments for UA</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {rowInformation.map((row, index) =>
                (

                  <tr>
                    <td>{row.name}
                    </td>
                    {/*<td>*/}
                    {/*  <div className="text-center float-left pdf-sec">*/}
                    {/*    <a href = {Pdf} target = "_blank"><img src={PdfIcon}/><br /> Account.Pdf</a>*/}
                    {/*  </div>*/}
                    {/*  <div className="text-center float-left pdf-sec">*/}
                    {/*    <a href = {Pdf} target = "_blank"><img src={PdfIcon}/><br /> TradeReady.Pdf</a>*/}
                    {/*  </div>*/}
                    {/*</td>*/}
                    <td>
                      <textarea disabled={(props.checker == "external" && !(props.row.approvalStatusTrustee == "approved") ? false : true)} key={index} id="commentTrustee1" name="commentTrustee1"
                                onBlur={(e) => {


                                    // console.log("qpqpqpqpqpqpqpqpqpqp"+e.code)
                                    row.commentTrustee = e.target.value
                                    // setRowInformation(...rowInformation)

                                    //handleSubmit();


                                    editInventory(row)



                                }}
                                defaultValue={row.commentTrustee != undefined ? row.commentTrustee : ""}/>
                    </td>
                    <td>
                      <textarea disabled={(props.checker == "internal" && !(props.row.approvalStatusTrustee == "approved") ? false : true)} key={index} id="commentUA1" name="commentUA1"
                                onBlur={(e) => {


                                  // console.log("qpqpqpqpqpqpqpqpqpqp"+e.code)
                                  row.commentUA = e.target.value
                                  // setRowInformation(...rowInformation)

                                  //handleSubmit();


                                  editInventory(row)



                                }}
                                defaultValue={row.commentUA != undefined ? row.commentUA : ""}/>
                    </td>
                    <td>
                      <div className="check-sec">
                        <div key={index} className="form-check  d-flex align-items-center">
                          <input disabled={(props.checker == "external" && !(props.row.approvalStatusTrustee == "approved") ? false : true)} key={index} type="checkbox" className="form-check-input" id="actionTrustee" checked={(
                              row.actionTrustee == "flag" || row.actionTrustee == true) ? true : false
                          }
                                 onChange={(e) => {

                                   // (e.target.checked == true) ? row.actionTrustee = "flag"
                                   //     : row.actionTrustee = "processed"

                                   if(e.target.checked == true) {
                                     row.actionTrustee = "flag"
                                     // setRowInformation(...[rowInformation])
                                     //document.getElementById(item.value).checked = true;
                                   } else {
                                     row.actionTrustee = "processed"
                                     // setRowInformation(...[rowInformation])
                                     //document.getElementById(item.value).checked = false;
                                   }

                                   editInventory(row)
                                 }}/>
                          <label className="form-check-label" htmlFor="exampleCheck1">Trustee Flag</label>
                        </div>
                        <div className="form-check  d-flex align-items-center">
                          <input disabled={(props.checker == "internal" && !(props.row.approvalStatusTrustee == "approved") ? false : true)} key={index} type="checkbox" className="form-check-input" id="actionUA" checked={(
                              row.actionUA == "flag" || row.actionUA == true) ? true : false
                          }
                                 onChange={(e) => {

                                   // (e.target.checked == true) ? row.actionTrustee = "flag"
                                   //     : row.actionTrustee = "processed"

                                   if(e.target.checked == true) {
                                     row.actionUA = "flag"
                                     // setRowInformation(...[rowInformation])
                                     //document.getElementById(item.value).checked = true;
                                   } else {
                                     row.actionUA = "processed"
                                     // setRowInformation(...[rowInformation])
                                     //document.getElementById(item.value).checked = false;
                                   }

                                   editInventory(row)
                                 }}/>
                          <label className="form-check-label" htmlFor="exampleCheck1">UA Flag</label>
                        </div>
                        {/*<div className="form-check d-flex align-items-center">*/}
                        {/*  <input type="checkbox" className="form-check-input" id="exampleCheck2"/>*/}
                        {/*  <label className="form-check-label" htmlFor="exampleCheck2">Marks For Later</label>*/}
                        {/*</div>*/}
                      </div>
                    </td>
                  </tr>
                )
            )
            }
            </tbody>
          </table>
          </div>
      </div>
    </div>
    )
}
