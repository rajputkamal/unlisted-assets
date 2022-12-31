import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {useHistory} from "react-router-dom";
import './style.css';
// import "./style.scoped.css"
// import closeIcon from "./cross.svg"
import Buttons from '../Buttons';


  export default function OnboardingAlertDialog(props) {
  let history = useHistory()
  const [company_name,setcompany_name]=React.useState(props.c_name)
  const [intrest_stock,setintrest_stock]=React.useState('To buy stocks')
  const [listings,setlistings]=React.useState([])
  const [holding,setholding]=React.useState([])
  const [isCampaign, setisCampaign] = React.useState(props.isCampaign);

  return (
      <>
        <div>
        <Dialog
          open={props.dialogPage}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description" >

            {isCampaign == true ?
                <div className="addcompanyrequest px-2 py-2">
                    <div className="addcompanyrequest_container">
                        <div className="text-center">
                            <h5><b>Warning!!</b></h5>
                            <p className="m-0 text-small">Your Onboarding has not been completed/verified !!<br/>Please complete your KYC to avail</p>
                            <p className="m-0 text-small"> Free OYO share !!<br/></p>

                        </div>
                        <div className="addcompanyrequest_buttonContainer text-center mt-4">
                            <Buttons.SecondaryButton value="Cancel" onClick={props.onClose} style={{ width: "50%", margin: "0px 5px" }} />
                            <Buttons.PrimaryButton value="Update KYC" onClick={() => { history.push("/profilewig") }} style={{ width: "50%", margin: "0px 5px" }} />
                        </div>
                    </div>
                </div>
                :
                <div className="addcompanyrequest px-2 py-2">
                    <div className="addcompanyrequest_container">
                        <div className="text-center">
                            <h5><b>Warning!!</b></h5>
                            <p className="m-0 text-small">Your Onboarding has not been completed/verified !!<br/>Please complete / wait for us to verify.</p>
                        </div>
                        <div className="addcompanyrequest_buttonContainer text-center mt-4">
                            <Buttons.SecondaryButton value="Cancel" onClick={props.onClose} style={{ width: "50%", margin: "0px 5px" }} />
                            <Buttons.PrimaryButton value="Update KYC" onClick={() => { history.push("/profilewig") }} style={{ width: "50%", margin: "0px 5px" }} />
                        </div>
                    </div>
                </div>
            }


        </Dialog>

          
        </div>
      </>
  )
}