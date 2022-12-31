import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Buttons from "../../Buttons";
import { apiCall } from "../../../Utils/Network";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 1000,
    width: "border-box",
    border: "1px solid #CFCBCF",
    borderRadius: "10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 1),
    borderRadius: "10px",
    maxWidth: "500px",
    minWidth: "400px",
    margin: "0 auto 0px auto",
  },
}));

const Index = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    console.log("seachvalue", searchInput);
  };

  const checkPaymentStatus = async (e) => {
    e.preventDefault();
    let response = await apiCall("payment/order/status/" + searchInput, "POST");
    if (response.status == undefined) {
      return;
    }
    let data = await response.json();
    setOpenStatusModal(true);
    setSearchInput("");
    console.log("data-btn-clicked", searchInput, data);
  };
  return (
    <div className="user_table_section">
      <div className="dbmn ml-3">
        <div className="Table_title">
          <div className="d-flex align-items-center justify-content-start w-100">
            <h5 className="main-heading">
              <b>Payment Issue Resolution</b>
            </h5>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12 col-12 d-flex">
          <div className="col-md-12 col-12">
            <TextField
              style={{ width: "100%" }}
              className="inventory-search-bar"
              placeholder="Search by aggId"
              variant="outlined"
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
          <div>
            <Buttons.SecondaryButton
              value="Check Payment Status"
              style={{ height: "56px" }}
              onClick={checkPaymentStatus}
            />
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openStatusModal}>
          <div className={classes.paper}>
            <div className="text-center modal-header p-1 text-center">
              <h5 className="text-primary-default text-center w-100">
                <b>Payment Status</b>
              </h5>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="success">
                <CheckCircleOutlineIcon
                  className="icon"
                  style={{ color: "#00CC83" }}
                />
                <p className="mt-3" style={{ color: "#00CC83" }}>
                  Payment successfull
                </p>
              </div>
              {/* <div className="failed">
                <CancelOutlinedIcon className="icon" style={{color: '#FF4D4F'}} />
                <p className="mt-3" style={{color: '#FF4D4F'}}>Payment failed</p>
              </div> */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Buttons.SecondaryButton
                onClick={() => setOpenStatusModal(false)}
                value="OK"
                style={{ width: "15%", margin: "0px 3px" }}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Index;
