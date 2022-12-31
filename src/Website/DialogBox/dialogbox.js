import React from 'react';
import './modal.scoped.css';
import "./style.scoped.css"

import Buttons from '../../Components/Buttons';
import { BrowserRouter as Link} from "react-router-dom";


import Dialog from '@material-ui/core/Dialog';
import CloseIcon from "@mui/icons-material/Close";


export default function LoginAlertDialog(props) {


  const [modalState, setModalState] = useState(false);

  const openModal = () => { setModalState(true) };
  const closeModal = () => { setModalState(false) };


  return (
      <>
        <Dialog
        open={modalState}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <div className='allcompany-modal-closeIcon text-right'>
          <CloseIcon onClick={closeModal} />
        </div>
        <div className="addcompanyrequest px-5 pb-5">
          <div className="">
            <div className="text-center">
              <h5><b>heading</b></h5>
              <p className="m-0 text-small">Content....</p>
            </div>
            <div className="d-flex justify-content-center text-center mt-4">
              <Link to="/login" ><Buttons.PrimaryButton value="Login / Sign Up " />
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
      </>
  )
}