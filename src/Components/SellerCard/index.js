import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./sellerCard.css";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HDFC from "./hdfc.svg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";
import {
    successToast,errorToast
} from "../Toast/index";
import AlertDialog from "../../Components/DialogBoxDeleteConfirmation/dialogbox";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';

import { useEffect } from "react";
import { apiCall } from "../../Utils/Network";
import Buttons from "../Buttons";
import Portal from '@material-ui/core/Portal';
import Loadbutton from '../../Components/Loadbutton/Index'
import { getTransactionFee } from "../../Utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }));

let SellerCard = (props) => {
    let history = useHistory();
    let location = useLocation();
    const date = new Date()

    const [selectedDate, setSelectedDate] = React.useState(new Date(props.values.offerValidTime));
    const [selectedDate1, setSelectedDate1] = React.useState();

    const [minDate, setminDate] = React.useState(new Date(date.getTime()));
    const [maxDate, setmaxDate] = React.useState(new Date(date.setTime( date.getTime() + 4 * 86400000 )));

    const classes = useStyles();
    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;

    // Sellercard action popper
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [deleteOfferConfirmation, setdeleteOfferConfirmation] = React.useState(false);

    const [txnAmount,settxnAmount]=React.useState((props.values.offeredQuantity *
        props.values.offeredPrice));

    let totalAmountInvolved = txnAmount


    let transactionFee = 0

    //since it's a seller card only
    transactionFee  = getTransactionFee(false, totalAmountInvolved)

    const [txnFee,settxnFee]=React.useState((transactionFee)+(.18*transactionFee));

    const [txnTotal,settxnTotal]=React.useState(txnAmount+txnFee);

    const [sendstate, setSendstate] = React.useState(false);

    const [placement, setPlacement] = React.useState();

    const handleBuyercard = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
    async function updateBuyerTimer() {


        props.values.offerValidTime = selectedDate1

        const response = await apiCall("tradecommunication/editTimerLastValidOffer/"+props.values.id,'PUT',props.values, history)
        // const responseJSON = await response.json();

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        if (response.status === 200){
            successToast("Success","Timer updated Successfully")
            props.callback()
        }else if (response.status === 409) {
            errorToast("Invalid", "Timer not updated, contact admin!!");
            return
        } else if (response.status === 400) {
            errorToast("Invalid", "Timer not updated, contact admin!!");
        }
    }
    const handleDateChange = (date1) => {
        //console.log("aqaa"+date1)


        let d = new Date(date1)
        //console.log("aqaa"+d)
        let dformat = [d.getFullYear(),d.getMonth()+1,d.getDate()].join('-')+' '+
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

        setSelectedDate1(dformat)

        //console.log("aqaa11"+dformat)

        setSelectedDate(date1);


        // let a = date.toISOString().split('T')[0]
        // // let b = (date.toISOString().split('T')[1]).split('.')[0]
        // // console.log("aqaa1"+a)
        // // console.log("aqaa2"+b)
        //
        // let c = ""
        //
        // if(ampmpreference == 'PM') {
        //     c = a +' '+(parseInt(timepreference)+12)+':00:00'
        // } else {
        //     c = a +' '+(parseInt(timepreference))+':00:00'
        // }
        //
        // console.log("aqaa3"+c)
        // setSelectedDate(c);


    };
    const closeDialog=()=>{
        //console.log('aaaaaaa')
        setdeleteOfferConfirmation(false)
    };

    const onConfirm=()=>{
        setdeleteOfferConfirmation(false)
        //console.log('aaaaaaa'+props.values.id)
        props.deleteOffer(props.values.id)
    };

    const editOffer = () =>{
        setSendstate(!sendstate)
        // props.setGetfunction(sendstate)
    }


    const submiteditOffer = () =>{
        setSendstate(!sendstate)
        updateBuyerTimer()

    }


    const detelOffer = () =>{
        setdeleteOfferConfirmation(true)
    }

    let SetDate = () =>{

        // const [date1, setDate1] = React.useState(new Date());

        return (
            <div className="negotiation-datepicker">

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDateTimePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        // inputFormat="DD-MM-YYYY"
                        value={selectedDate}
                        minDate = {minDate}
                        maxDate = {maxDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

            </div>
        )
    }
    return (sendstate ? <>

                <div className="setdate" >
                    <div className="buyerform-section">
                        <SetDate/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="w-100">
                            {/* <button className="btn btn-settimer" onClick={handleDate}><QueryBuilderRoundedIcon className="mr-2"/> {show ? 'Set Time' : 'Set Timer'}</button> */}
                        </div>
                        <div className="d-flex w-100">
                            <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px",width:"100%"}} onClick={editOffer}/>
                            <Buttons.PrimaryButton value="Set Timer" onClick={submiteditOffer} style={{marginRight:"5px",width:"100%"}}/>
                        </div>
                    </div>
                </div>
            </> :
        <div className={props.values.communicationStatus != "accepted" ?"seller-card": "seller_card_rejected"}>

            {props.isTradeOwner==true ?
                <div className="d-flex align-items-center justify-content-end">
                    <MoreHorizIcon className="text-default cursor-pointer" style={{width: "30px", height: "25px"}}
                                   onClick={handleBuyercard('bottom-end')}/>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <div className="border p-1 bg-white pr-5">
                                        <h6 className="text-small cursor-pointer my-2" onClick={editOffer}>
                                            <EditIcon className="mx-2"/> Edit Timer
                                        </h6>
                                        <h6 className="text-small cursor-pointer m-0 my-2" onClick={detelOffer}>
                                            <DeleteIcon className="mx-2"/> Cancel Offer
                                            {/* <DeleteIcon className="mx-2" onClick={setdeleteOfferConfirmation(true)} /> Delete Offer */}
                                        </h6>
                                    </div>
                                </Paper>s
                            </Fade>
                        )}

                    </Popper>

                </div> : null
            }
            <div className="seller_card_Company_logo">
                <img src={selectedTradeOngoingTxn.companyLogo} width={20} />
            </div>
            <div className="seller_card_first_row d-flex">
                <p className="m-0">{selectedTradeOngoingTxn.companyName}</p>
                <h6 className="m-0 text-dark mr-2"><b>{props.values.offeredQuantity}</b></h6>
            </div>

            <div className="seller-card-desc mt-2 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {props.values.offeredPrice}</p>
            </div>
            <div className="buyer-card-desc mt-3 d-flex justify-content-between">
                <p className="text-small m-0">Total Amount (Qty * Price)</p>
                <p className="price m-0">₹ {txnAmount.toFixed(2)}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ {txnFee.toFixed(2)}</p>
            </div>

            <div className="Sellercard_horizontal_line"> </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="seller-proposed_amt m-0">Proposed Amount</p>
                <p className="seller-proposed-amt-in-numbers m-0">₹ {txnTotal.toFixed(2)}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="user-comment text-small">*User Comment</p>
                <p className="user-message text-small">{props.values.message}</p>
            </div>
            <AlertDialog dialogPage={deleteOfferConfirmation} onClose={closeDialog} onConfirm={onConfirm}/>
        </div>
    )
}
export default SellerCard

