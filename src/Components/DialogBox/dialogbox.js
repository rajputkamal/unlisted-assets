import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory} from "react-router-dom";
import './modal.scoped.css';
import "./style.scoped.css"
import closeIcon from "./cross.svg"

import Buttons from '../Buttons';


  export default function AlertDialog(props) {
  let history = useHistory()
  const [company_name,setcompany_name]=React.useState(props.c_name)
  const [intrest_stock,setintrest_stock]=React.useState('To buy stocks')
  const [listings,setlistings]=React.useState([])
  const [holding,setholding]=React.useState([])

  return (
      <>
        <div>
        <Dialog
          open={props.dialogPage}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description" >

          <div className="addcompanyrequest px-2 py-2">
            <div className="addcompanyrequest_container">
              <div className="text-center">
                <h5><b>Congratulations!!</b></h5>
                <p className="m-0 text-small">Your UserName and Password has been sent to your email!!</p>
              </div>        
              <div className="addcompanyrequest_buttonContainer text-center mt-4">
                <Buttons.SecondaryButton value="CANCEL" onClick={props.onClose} style={{ width: "50%", margin: "0px 5px" }} />
                <Buttons.PrimaryButton value="LOGIN" onClick={() => { history.push("/login") }} style={{ width: "50%", margin: "0px 5px" }} />
              </div>
            </div>
          </div>
        </Dialog>

          {/* <Dialog
              // open={open}
              // onClose={handleClose}
              open={props.dialogPage}
              onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
          <section className="modal-main trade-modal-main ">
            <div class="modal-header border-none">
              <h4 className="text-center w-100 m-0"><b>Congratulations!!</b></h4>
              <button type="button" class="close" onClick={props.onClose}><img src={closeIcon} width="20"/></button>
            </div>
            <div class="modal-content">

              <div class="modal-body trade-modal ">

                <div class="row modal-center-row">
                  <div class="col-md-12">
                    <div className="heading-section m-0">
                      <p className="m-0 text-small">Your UserName and Password has been sent to your email!!</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <DialogActions>
              <Button onClick={props.onClose} color="primary">
                CANCEL
              </Button>
              <Button onClick={()=>{history.push("/login")}} color="primary" autoFocus>
                LOGIN
              </Button>
            </DialogActions>
          </section>
          </Dialog> */}
        </div>
      </>
  )
}