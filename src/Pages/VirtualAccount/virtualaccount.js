import React, { useEffect, useState } from "react";
import "./virtualaccount.css"
import bank from "./Bank.png"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "../../Components/Buttons"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiCall, downloadurl } from "../../Utils/Network"
import { withWidth } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';

import closeIcon from "../../Pages/Companies/cross.svg";
import Dialog from "@material-ui/core/Dialog";
import { ReactComponent as DownloadIcon } from './DownloadIcon.svg';
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { virtualbankdetails } from '../Payment/Steps/ChoosePaymentMethod'


import {
    successToast, errorToast
} from "../../../src/Components/Toast/index";
import Breadcrubs from '../../Components/Breadcrumbs';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import VirtualModalTableContent from "./modal-table/VirtualModalTableContent";
import { numberFormat } from "../../Utils/NumberFormat";


const useStyles = makeStyles((theme) => ({
    FormControl: {
        marginLeft: "7px",
        justifyContent: "space-between",
        paddingLeft: "10px"
    },
    label: {
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "7px",

    },
    droplabel: {
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "-2px",

    }
}))

let AddVirtualAccount = () => {
    const classes = useStyles()
    let history = useHistory();

// *****kamal********
    const [addMoneyNewModal, setAddMoneyNewModal] = React.useState(false);
    const [UPIModal, setUPIModal] = React.useState(false);
    const [maxAmountError, setMaxAmountError] = useState(false);
    const [enteredAmount, setEnteredAmount] = React.useState('₹')
    const [moneyRadioBtn, setMoneyRadioBtn] = useState('upi')
    const [orderPayUPIObjectAddMoney, setorderPayUPIObjectAddMoney] = useState({});
    const [showUpiIdError, setShowUpiIdError] = useState("");
    const [UPIError, setUPIError] = useState("");
    const [qrCodeObjectAddMoney, setqrCodeObjectAddMoney] = useState({});
    const [enterUpiId, setEnterUpiId] = useState("");
    const [addMonetTowallet, setaddMonetTowallet] = useState(false);


    var intervalAddMoney;

    const [accountholdername, setaccountholdername] = useState('')
    const [userID, setUserID] = useState('')


    const [accountType, setaccountType] = useState('')
    const [accountnumber, setAccountNumber] = useState('')
    const [ifsc, setIfsc] = useState('')
    const [bankname, setBankName] = useState('')
    const [branchname, setBranchName] = useState('')
    const [virtualBankDetails, setVirtualbankdetails] = useState({})
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    const [balance, setbalance] = useState('')
    const [balancefreeze, setbalancefreeze] = useState('')
    const [withdrawamount, setwithdrawamount] = useState(0)
    const [addamount, setaddamount] = useState(0)
    const [vacreated, setvacreated] = useState(false)
    const [virtualAccountDetails, setVirtualAccountDetails] = useState('')
    const [orderObjectAddMoney, setorderObjectAddMoney] = useState({});
    const [orderStatusObjectAddMoney, setorderStatusObjectAddMoney] = useState({});

    const [username, setusername] = React.useState("")
    const [userId, setuserId] = React.useState("")


    const [alldata2, setalldata2] = React.useState("")

    /// modal
    const [openadd, setopenadd] = React.useState(false);
    const [openwithdraw, setopenwithdraw] = React.useState(false);
    const handleOpenadd = () => {
        setopenadd(true)
    }
    const handleOpenwithdraw = () => {
        setopenwithdraw(true)
    }
    const handleClose = () => {
        setopenadd(false);
        setopenwithdraw(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
        borderRadius: "15px",
    };


    const moneyHandler = (e) => {
        setMoneyRadioBtn(e.target.value)

    }

    const onContinueHandler = async (e) => {
        e.preventDefault()
        setAddMoneyNewModal(false)
        setaddMonetTowallet(true)
        // if(moneyRadioBtn === 'upi'){
        //
        //     await createOrderAddMoney();
        //     await getQRCodeAddMoney();
        //     setUPIModal(true)
        // }else {
        //     setaddMonetTowallet(true)
        // }
    }

    async function getQRCodeAddMoney() {
        try {
            const response = await apiCall(
                "payment/order/checkout/upiqrcode/addMoneyWallet",
                "GET"
            );
            if (response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return;
            }

            let responseJSON = await response.json();
            // // console.log("bbbbbbbb", responseJSON)

            setqrCodeObjectAddMoney(responseJSON);
        } catch (e) {}
    }

    async function createOrderAddMoney() {
        try {
            const response = await apiCall("payment/order/create/addMoneyToWallet/"+"10", "GET");
            if (response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return;
            }

            let responseJSON = await response.json();
            // // console.log("bbbbbbbb", responseJSON)

            setorderObjectAddMoney(responseJSON);

            checkStatusAddMoney();
        } catch (e) {}
    }

    async function checkStatusAddMoney() {
        intervalAddMoney = setInterval(() => {
            // var condition = navigator.onLine ? 'online' : 'offline';

            getOrderStatusAddMoney();

            // clearInterval(interval);
            // console.log("condition check")
        }, 10000);

        // return function stopTimer() {
        //     clearInterval(interval)
        // }
    }

    // Once order is placed, keep on checking the status after every 10 seconds for now
    //later this needs to be modified

    async function getOrderStatusAddMoney() {
        try {
            const response = await apiCall("payment/order/status/addMoneyWallet", "GET");
            if (response.status == undefined) {
                // errorToast("Invalid", "Invalid User ID or password");
                return;
            }

            let responseJSON = await response.json();
            // // console.log("bbbbbbbb", responseJSON)

            if (responseJSON.payment_status == "SUCCESS") {
                clearInterval(intervalAddMoney);

                // setPaymentInprocess(true);
                // setPaymentSuccess(true);

                setTimeout(() => {

                    // setPaymentInprocess(false);
                    // setPaymentSuccess(false);

                    // setaddMonetTowallet(false)
                    setUPIModal(false)
                }, 3000);
            }
            setorderStatusObjectAddMoney(responseJSON);
        } catch (e) {}
    }

    const moneyAddHandler = (e) => {
        if((e.target.value) > 100000){
            setMaxAmountError(true)
            return
        }else {
            setEnteredAmount((e.target.value))
            setMaxAmountError(false)
        }
    }

    let InlineValidationName = () => {
        return (
            <div className="inline-validation-box">
                <p>{UPIError}</p>
            </div>
        );
    };

    async function payUsingUPIAddMoney(event) {
        event.preventDefault();

        const response = await apiCall(
            "payment/order/checkout/upi/addMoneyWallet" + "/" + enterUpiId,
            "GET"
        );
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return;
        }

        let responseJSON = await response.json();
        console.log("bbbbbbbb", responseJSON);

        if (response.status == 200) {
            // setPaymentInprocess(true);
            // setPaymentSuccess(false);
            setorderPayUPIObjectAddMoney(responseJSON);
        } else {
            // errorToast("Invalid", "UPI ID entered is invalid!!");
            // setShowUpiIdError(true);
        }
    }

    useEffect(() => {
        virtualbankdetails()
    }, [])
    const virtualbankdetails = async function () {

        const response = await apiCall("useronboarding/bankdetail/true", 'GET', '', history)
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON = await response.json()
        setVirtualbankdetails(responseJSON)
        console.log("Virtual bank details", responseJSON)
        setAccountNumber(responseJSON.accountNumber)
        if (responseJSON.accountNumber == undefined) {
            setAccountNumber('Not Yet Activated...')
            setaccountholdername('Not Yet Activated...')
            setaccountType('Not Yet Activated...')
        } else {
            setvacreated(true)
            setaccountholdername('Unlisted Tech Private Limited')
            setaccountType('Current')
        }
        // console.log('jjjjj', responseJSON)
        setIfsc(responseJSON.ifscCode)
        setBankName(responseJSON.bankName)
        setBranchName(responseJSON.branchName)
        setUserID(responseJSON.userID)


        const response1 = await apiCall("uservirtualaccount/virtualaccountbalance", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON1 = await response1.json()
        // console.log(responseJSON1)
        const Balance = Number(responseJSON1).toFixed(2)

        setbalance(Balance)

        const response22 = await apiCall("uservirtualaccount/virtualaccountfreezebalance", 'GET', '', history)
        if (response22.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON22 = await response22.json()
        // console.log(responseJSON22)
        const BalanceFreez = Number(responseJSON22).toFixed(2)
        setbalancefreeze(BalanceFreez)

        const response222 = await apiCall("uservirtualaccount/virtualbook", "GET", '', history);

        const responseJSON222 = await response222.json();
        console.log("Virtual Account Details", responseJSON222);

        const response3 = await apiCall("useronboarding/accountonboarding", "GET");
        if (response3.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON3 = await response3.json();
        setusername(responseJSON3.name)
        setuserId(responseJSON3.accountId)
        setalldata2(responseJSON3)

    }

    // console.log("alldata2", alldata2)




    let addmoney = async (event) => {

        event.preventDefault();
        let response = await apiCall(
            "uservirtualaccount/addmoneyvirtualaccount/" + addamount,
            "POST",
            {}
        );
        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        if (response.status === 200) {
            successToast("Success", "Amount successfully added to your Virtual Account!!")
            // await clearErrorMessages();
            // setLoadingbtn(false);
            setopenadd(false)

        } else if (response.status === 409) {
            errorToast("Not SuccessFul", "Amount not added, Contact Admin...")
            // setLoadingbtn(false);
            return
        } else if (response.status === 400) {
            errorToast("Not SuccessFul", "Amount not added, Contact Admin...")
            // setLoadingbtn(false);

        } else {
            errorToast("Not SuccessFul", "Amount not added, Contact Admin...")
            // setLoadingbtn(false);
        }
        virtualbankdetails()
    }

    let withdrawmoney = async (event) => {
        event.preventDefault();

        if (1 == 2) {
            errorToast("Not SuccessFul", "Withdrawl of money is disabled, Contact Admin...")
            return
        }
        let response = await apiCall(
            "uservirtualaccount/withdrawmoneyvirtualaccount/" + withdrawamount,
            "POST",
            {}
        );

        if (response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        if (response.status === 200) {

            const responsetext = await response.text()

            if (responsetext == true || responsetext == 'true') {
                successToast("Success", "Withdrawl Request is accepted, it will be processed in next 24 hours!!")
            } else {
                errorToast("Invalid", "Withdrawl Request failed, pl contact admin!!")
            }


            // await clearErrorMessages();
            // setLoadingbtn(false);
            setopenwithdraw(false)

        } else if (response.status === 409) {
            errorToast("Not SuccessFul", "Withdrawl Request failed, Contact Admin...")
            // setLoadingbtn(false);
            return
        } else if (response.status === 400) {
            errorToast("Not SuccessFul", "AWithdrawl Request failed, Contact Admin...")
            // setLoadingbtn(false);

        } else {
            errorToast("Not SuccessFul", "Withdrawl Request failed, Contact Admin...")
            // setLoadingbtn(false);
        }
        virtualbankdetails()
    }

    const [virtualAccountModal, setVirtualAccountModal] = React.useState(false);


    // new modal

    const modalClose = () => {
        setVirtualAccountModal(false)
    };
    const handleClickOpen = () => {
        { virtualAccountModal ? setVirtualAccountModal(false) : setVirtualAccountModal(true) }
    };

    return (<>
            <div className="container mt-3">
                <Breadcrubs />
                <div className="my-card my-3 virtual-account-main">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-2">
                                {/* <h6> <b>Your virtual account Details </b></h6> */}
                                <Tooltip title="Your virtual account will be activated at the time of your first transaction" arrow placement="top">
                                    <Button className="profile-info-button p-0 mx-0"><h6 className="mb-2 heading">Your Virtual Account Details</h6></Button>
                                </Tooltip>

                                <div className="row d-flex justify-content-between my-2">
                                    <div className="col-md-4 my-2 col-6">
                                        <h5 className="text-small mb-1">Name of the User</h5>
                                        <h5 className="text-small m-0"><b>{username}</b></h5>
                                    </div>
                                    <div className="col-md-3 my-2 px-0 col-6">
                                        <h5 className="text-small mb-1">User ID</h5>
                                        <h5 className="text-small m-0"><b>{userId}</b></h5>
                                    </div>
                                    <div className="col-md-5 my-2 col-12">
                                        <h5 className="text-small mb-1">Virtual Account Number</h5>
                                        <h5 className="text-small m-0"><b>{accountnumber}</b></h5>
                                    </div>
                                </div>

                                {/* <p className="text-small">A Virtual Account (VA) is a sub-account created with ICICI Bank and assigned to our users/clients for the Escrow mechanism. This Virtual Account is managed by a SEBI Registered Trustee. This makes it easy for unlisted assets platform to complete the transaction seamlessly.</p>
                                <p className="text-small">Your Virtual account will be created on
                                <a href="#" className="company-link"><b> unlistedassets.com </b></a>
                                when your first negotiation bid  is accepted  and before you proceed for SPA (Share Purchase Agreement).</p> */}


                                <div className="virtual-account-form">
                                    <form className="w-100">
                                        <label className="Virtual_account_Label my-2 text-small">Virtual Account Number</label>
                                        <input type="text" name="accountnumber" onChange={(e) => setAccountNumber(e.target.value)} value={accountnumber} placeholder={accountnumber} disabled />
                                        <label className="my-2 text-small">IFSC Code</label>
                                        <input type="text" name="ifsc" onChange={(e) => setIfsc(e.target.value)} value={ifsc} placeholder={accountnumber} disabled />
                                        <label className="my-2 text-small">Bank Name</label>
                                        <input type="text" name="bankname" onChange={(e) => setBankName(e.target.value)} value={bankname} placeholder={accountnumber} disabled />
                                        <label className="my-2 text-small">Branch Name</label>
                                        <input type="text" name="branchname" onChange={(e) => setBranchName(e.target.value)} value={branchname} placeholder={accountnumber} disabled />
                                        <label className="Virtual_account_Label my-2 text-small">Account Type</label>
                                        <input type="text" name="accountType" onChange={(e) => setaccountType(e.target.value)} value={accountType} placeholder={accountnumber} disabled />
                                        <label className="Virtual_account_Label my-2 text-small">Account Holder Name</label>
                                        <input type="text" name="accountholdername" onChange={(e) => setaccountholdername(e.target.value)} value={accountholdername} placeholder={accountnumber} disabled />
                                    </form>
                                </div>
                                <div className="">
                                    <div className="balance-details my-4">
                                        {!isLoadingbtn && vacreated ?
                                            <>
                                                <div>
                                                    <label>Virtual Account Balance</label>
                                                    {/* <input type="text"/> */}
                                                    <p><b>{numberFormat(balance)}</b></p>
                                                </div>

                                                <div>
                                                    {!userId === "1ua45Unl884" ? <label>Amount frozen in ongoing Transaction</label> : '' }
                                                    <div className="d-flex justify-content-between">
                                                        {!userId === "1ua45Unl884" ? <p><b>Rs.{balancefreeze}</b></p> : ""}
                                                        <p className="SelectedAssest-text"
                                                           onClick={handleClickOpen}
                                                        ><b>View Details </b></p>
                                                    </div>

                                                </div> </> :

                                            null}
                                    </div>

                                    <div className="mt-3">
                                        <div >
                                            {!isLoadingbtn && vacreated && (
                                                <><div className="mt-3 d-flex ">
                                                    <Buttons.PrimaryButton value="Withdraw money"
                                                        // disabled={!(bankname && accountnumber && branchname && ifsc)}
                                                                           onClick={handleOpenwithdraw} style={{ width: "45%", marginRight: "7px" }}
                                                    />
                                                    <Buttons.PrimaryButton value="Add Money" style={{ width: "45%", marginLeft: "7px" }} onClick= {() => setAddMoneyNewModal(true)} />
                                                </div>
                                                    <Modal
                                                        open={openwithdraw}
                                                        onClose={handleClose}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box className="virtual-withdraw-model"
                                                        >
                                                            <div className="cursor-pointer d-flex justify-content-end">                                       <CloseIcon className="model-CloseIcon"
                                                                                                                                                                         onClick={handleClose}
                                                            />
                                                            </div>

                                                            <h5 className=" text-primary-default border-bottom pb-3 mt-2">How much would you like to withdraw</h5>
                                                            <h6 className="d-flex justify-content-between"> Your available balance :
                                                                <b className="text-primary-default">Rs.{balance}</b>
                                                            </h6>

                                                            <Box>
                                                                <div className="my-5">
                                                                    <TextField
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        size="small"
                                                                        id="outlined-number"
                                                                        label="Enter Amount "
                                                                        placeholder="amount"
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }
                                                                        }
                                                                        onChange={(e) => {
                                                                            setwithdrawamount(e.target.value)
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <button className="btn btn-primary-default w-100 py-2"
                                                                            onClick={withdrawmoney}>
                                                                        Withdraw
                                                                    </button>
                                                                </div>
                                                            </Box>

                                                        </Box>
                                                    </Modal>
                                                </>

                                            )}
                                            {isLoadingbtn && vacreated && (
                                                <Loadbutton />
                                            )}
                                        </div>

                                        {/***********************/}
                                        {/*<div >*/}
                                        {/*    {!isLoadingbtn && vacreated && (*/}
                                        {/*        <>*/}
                                        {/*            <Buttons.PrimaryButton value="Add money"*/}
                                        {/*                // disabled={!(bankname && accountnumber && branchname && ifsc)}*/}
                                        {/*                                onClick={handleOpenadd}*/}
                                        {/*            />*/}
                                        {/*            <Modal*/}
                                        {/*                open={openadd}*/}
                                        {/*                onClose={handleClose}*/}
                                        {/*                aria-labelledby="modal-modal-title"*/}
                                        {/*                aria-describedby="modal-modal-description"*/}
                                        {/*            >*/}
                                        {/*                <Box className="virtual-withdraw-model"*/}
                                        {/*                >*/}
                                        {/*                    <div className="cursor-pointer d-flex justify-content-end">                                       <CloseIcon className="model-CloseIcon"*/}
                                        {/*                                                                                                                                onClick={handleClose}*/}
                                        {/*                    />*/}
                                        {/*                    </div>*/}

                                        {/*                    <h5 className=" text-primary-default border-bottom pb-3">How much would you like to Add</h5>*/}
                                        {/*                    <h6 className="d-flex justify-content-between"> Your available balance :*/}
                                        {/*                        <b className="text-primary-default">Rs.{balance}</b>*/}
                                        {/*                    </h6>*/}

                                        {/*                    <Box>*/}
                                        {/*                        <div className="my-5">*/}
                                        {/*                            <TextField*/}
                                        {/*                                fullWidth*/}
                                        {/*                                variant="outlined"*/}
                                        {/*                                size="small"*/}
                                        {/*                                id="outlined-number"*/}
                                        {/*                                label="Enter Amount "*/}
                                        {/*                                placeholder="amount"*/}
                                        {/*                                type="number"*/}
                                        {/*                                InputLabelProps={{*/}
                                        {/*                                    shrink: true,*/}
                                        {/*                                }*/}
                                        {/*                                }*/}
                                        {/*                                onChange={(e) => {*/}
                                        {/*                                    setaddamount(e.target.value)*/}
                                        {/*                                }}*/}
                                        {/*                            />*/}
                                        {/*                        </div>*/}
                                        {/*                        <div>*/}
                                        {/*                            <button className="btn btn-primary-default w-100 py-2"*/}
                                        {/*                                    onClick={addmoney}>*/}
                                        {/*                                Add*/}
                                        {/*                            </button>*/}
                                        {/*                        </div>*/}
                                        {/*                    </Box>*/}

                                        {/*                </Box>*/}
                                        {/*            </Modal>*/}
                                        {/*        </>*/}

                                        {/*    )}*/}
                                        {/*    {isLoadingbtn && vacreated && (*/}
                                        {/*        <Loadbutton />*/}
                                        {/*    )}*/}
                                        {/*</div>*/}
                                    </div>

                                    {/*<div >*/}
                                    {/*    {!isLoadingbtn && (*/}
                                    {/*        <>*/}
                                    {/*            <Buttons.PrimaryButton value="withdraw money"*/}
                                    {/*                // disabled={!(bankname && accountnumber && branchname && ifsc)}*/}
                                    {/*                onClick={handleOpen}*/}
                                    {/*            />*/}
                                    {/*            <Modal*/}
                                    {/*                open={open}*/}
                                    {/*                onClose={handleClose}*/}
                                    {/*                aria-labelledby="modal-modal-title"*/}
                                    {/*                aria-describedby="modal-modal-description"*/}
                                    {/*            >*/}
                                    {/*                <Box className="virtual-withdraw-model"*/}
                                    {/*                >*/}
                                    {/*                    <div className="cursor-pointer d-flex justify-content-end">                                       <CloseIcon className="model-CloseIcon" */}
                                    {/*                        onClick={handleClose}*/}
                                    {/*                         />*/}
                                    {/*                    </div>*/}
                                    {/*                   */}
                                    {/*                    <h5 className=" text-primary-default border-bottom pb-3">How much would you like to withdraw</h5>*/}
                                    {/*                    <h6 className="d-flex justify-content-between"> Your available balance :*/}
                                    {/*                        <b className="text-primary-default">Rs.{balance}</b>*/}
                                    {/*                    </h6>*/}

                                    {/*                    <Box>*/}
                                    {/*                        <div className="my-5">*/}
                                    {/*                            <TextField*/}
                                    {/*                                fullWidth*/}
                                    {/*                                variant="outlined"*/}
                                    {/*                                size="small"*/}
                                    {/*                                id="outlined-number"*/}
                                    {/*                                label="Enter Amount "*/}
                                    {/*                                placeholder="amount"*/}
                                    {/*                                type="number"*/}
                                    {/*                                InputLabelProps={{*/}
                                    {/*                                    shrink: true,*/}
                                    {/*                                }}*/}
                                    {/*                            />*/}
                                    {/*                        </div>*/}
                                    {/*                        <div>*/}
                                    {/*                            <button className="btn btn-primary-default w-100 py-2">*/}
                                    {/*                                Withdraw*/}
                                    {/*                            </button>*/}
                                    {/*                        </div>*/}
                                    {/*                    </Box>*/}

                                    {/*                </Box>*/}
                                    {/*            </Modal>*/}
                                    {/*        </>*/}

                                    {/*    )}*/}
                                    {/*    {isLoadingbtn && (*/}
                                    {/*        <Loadbutton />*/}
                                    {/*    )}*/}
                                    {/*</div>*/}



                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="default_px-4">
                                <div className="p-2">

                                    {/* {!isLoadingbtn && vacreated && (

                                    <a href={downloadurl("uservirtualaccount/downloadvirtualbookexcel")}><b className="m-0 text-small">Download Account Statement</b></a>

                                )} */}
                                    {isLoadingbtn && vacreated && (
                                        <Loadbutton />
                                    )}
                                </div>
                                <div className="my-card virtual-account-card mb-4">

                                    <h5 className="about-heading">About Virtual Account</h5>

                                    <p className="about-title mb-1"> A Virtual Account (VA) is a wallet associated with our  ICICI Escrow Account and assigned to our users for their secure financial transactions. This Virtual Account is managed by a SEBI Registered Trustee & it ensures seamless and safe transactions on our Platform.</p>
                                    <p className="about-title">Your Virtual Account will be created on <a href="#" className="company-link"><b> unlistedassets.com </b></a> when you transact with us for the first time.
                                        Adding money and withdrawing money from your wallet is quick and easy.
                                        Note - For transactions exceeding an amount of Rs. 1,00,000 it is mandatory required to transact through our Virtual wallet (any charges charged by the user bank on such transaction will be borne by the User himself)</p>


                                    {/* <div className="my-2">
                                    <img src={bank} width="150" />
                                </div> */}
                                    <div className="my-2">
                                        {/* <h6 className="mb-2"><b>Why Bank Account Details ?</b></h6> */}
                                        {/* <a href="#" className="tradeready_question"><b><p className="mb-1">What is a Virtual Account ?</p></b></a>
                                    <p className="text-small">
                                        We feel this is one of the fastest way to communicate with you and
                                        upadate you with all the information about your transaction and
                                        shortlisted companies.
                                    </p> */}

                                        <a target="_blank" href="https://faq.unlistedassets.com/en/support/solutions/articles/82000881682-what-is-a-virtual-account-" className="tradeready_question"><b><p className="about-links">What is Virtual Account (Escrow)? </p></b></a>

                                        <a target="_blank" href="https://faq.unlistedassets.com/en/support/solutions/articles/82000884330-adding-money-in-the-escrow-account-" className="tradeready_question"><b><p className="about-links">How to add money to Virtual Account?</p></b></a>

                                        <a target="_blank" href="https://faq.unlistedassets.com/en/support/solutions/articles/82000889083-how-to-withdraw-money-from-virtual-account-" className="tradeready_question"><b><p className="about-links">How to withdraw money from Virtual Account?</p></b></a>

                                        <a target="_blank" href="https://faq.unlistedassets.com/en/support/solutions/articles/82000889081-how-does-transaction-happen-through-my-virtual-account-" className="tradeready_question"><b><p className="about-links">How does transaction happen through my Virtual Account?</p></b></a>

                                        <a target="_blank" href="https://faq.unlistedassets.com/en/support/solutions/articles/82000889082-what-are-the-charges-charges-to-use-the-virtual-account-" className="tradeready_question"><b><p className="about-links">What are the charges to use the virtual Account?</p></b></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={virtualAccountModal}
                onClose={modalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <section className="modal-main trade-modal-main dis-modal-main transfer-modal-main virtual-account-modal">
                    <div className="virtual-modal-section-padding">
                        <div class="">
                            <>
                                <div class="close-icon border-none" onClick={modalClose}>
                                    <button type="button" className="close " ><img src={closeIcon} width="20" /></button>
                                </div>
                                <div class="trade-modal">
                                    <div className="">
                                        <div className="">
                                            <div className="py-2">
                                                <h6 className="mb-2 heading"> <b> Virtual Account Details </b></h6>
                                                <div className="row d-flex mx-0">
                                                    <div className="col-md-4 px-0 my-2">
                                                        <h5 className="text-small mb-1">Virtual Account Balance</h5>
                                                        <h5 className="text-small m-0"><b>Rs. {balance}</b></h5>
                                                    </div>
                                                    <div className="col-md-6 px-0 my-2">
                                                        <h5 className="text-small mb-1">Amount Frozen In Ongoing Transaction</h5>
                                                        <h5 className="text-small m-0"><b>Rs.{!userId === "1ua45Unl884" ? balancefreeze : 0}</b></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-md-4 col-12 my-2 ">
                                            <div className="">
                                                <h5 className="text-small mb-1">User ID</h5>
                                                <h5 className="text-small2 m-0">{userId}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 my-2">

                                            <div className="">
                                                <h5 className="text-small mb-1">Virtual Account Number</h5>
                                                <h5 className="text-small2 m-0">{accountnumber}</h5>
                                            </div>
                                        </div>
                                        {/*<div className="col-md-12 d-flex justify-content-end my-2">*/}

                                        {/*    <a href={downloadurl("uservirtualaccount/downloadvirtualbookexcel")}>*/}
                                        {/*        <div className='SelectedAssest-text transfer-modal-text d-flex align-items-start'>*/}
                                        {/*            <DownloadIcon className="download-icon" /> <p className="m-0 mx-2">Download Statement</p>*/}
                                        {/*        </div></a>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div class="row modal-center-row scroll-default">
                                        <div class="col-md-12 ">
                                            <div className='modal-height '>
                                                <div className="virtual-modal-table-main " >
                                                    <VirtualModalTableContent />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </section>
            </Dialog>




            {/* ****************************************Add Money Modal Kamal**************************************** */}

            <Dialog
                open={addMoneyNewModal}
                onClose={() => setAddMoneyNewModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="addcompanyrequest" style={{ position: "relative" }}>
                    <div className="addcompanyrequest_container virtual_acc_modal_padding">
                        <div className="virtual-account-created-padding">
                            <h5>Add Money to Your Virtual Account</h5>

                            <p className="text-small mb-2">Please choose your reference</p>
                            <FormControl className='mb-4 mt-4 ml-2 gap-2'>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="upi"
                                    name="radio-buttons-group"
                                >
                                    {/* <FormControlLabel
                  style={{gap: '8px'}}
                    value='upi'
                    onChange={moneyHandler}
                    control={
                      <Radio
                        sx={{ fontSize: "2rem", color: "#721B65"}}
                        color="secondary"
                      />
                    }
                    label="Add Money via UPI"
                  />
                   */}
                                    <FormControlLabel
                                        style={{gap: '8px'}}
                                        value='bankTransfer'
                                        onChange={moneyHandler}
                                        control={
                                            <Radio
                                                sx={{ fontSize: "2rem", color: "#721B65" }}
                                                color="secondary"
                                            />
                                        }
                                        label="Add Money via Bank Transfer"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <AiOutlineClose
                                className="closeBtnAddMoneyModal"
                                onClick={() => setAddMoneyNewModal(false)}
                            />
                        </div>


                        <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-end">
                            <div className="col-md-5 col-12">
                                <Buttons.PrimaryButton
                                    value="Continue"
                                    style={{ width: "100%" }}
                                    onClick = {onContinueHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>


            <Dialog
                open={UPIModal}
                onClose={() => setUPIModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="addcompanyrequest" style={{ position: "relative" }}>
                    <div className="addcompanyrequest_container virtual_acc_modal_padding">
                        <div style={{ padding: "30px 0" }}>
                            <h5>Add Money to Your Virtual Account</h5>

                            <p className="mb-2" style={{ fontSize: "12px" }}>
                                <AiOutlineInfoCircle style={{color: '#25A9EF'}}/> Please note that
                                you can only add up to ₹ 1,00,000 using UPI
                            </p>

                            <AiOutlineClose
                                className="closeBtnAddMoneyModal"
                                onClick={() => setUPIModal(false)}
                            />
                            <div className="payment-qr-scaner my-4 dbmn">
                                <div className="row justify-content-center">
                                    <div className="col-md-5 col-6 d-flex justify-content-end align-items-center">
                                        <div className="scaner-pic d-flex  align-items-center">
                                            {qrCodeObjectAddMoney.data == undefined ? null : (
                                                <img
                                                    className="img-fluid"
                                                    src={qrCodeObjectAddMoney.data.payload.qrcode}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-6 d-flex justify-content-start align-items-center">
                                        <p className="text-small">
                                            Scan this QR code in your UPI <br />
                                            app to make payment
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 dbmn">
                                <div className="d-flex justify-content-center my-2">
                                    <h6>OR</h6>
                                </div>
                            </div>
                            <div className="profile-form_field-container">
                                <div className="profile-form_field profile-tooltip-input">
                                    <div className="row">
                                        <div className="col-md-12 col-12 d-flex justify-content-between">
                                            <label className="my-2 text-small ">Enter Amount <BsQuestionCircle className="ml-1" style={ maxAmountError ? { color:'#FF4D4F'} : {}}/></label>
                                        </div>
                                        <div className="col-md-12 col-12 my-1">
                                            <input
                                                type='number'
                                                className="w-100"
                                                placeholder="Enter Amount upto ₹1,00,000"
                                                value={enteredAmount}
                                                onChange={moneyAddHandler}
                                                style={ maxAmountError ? { border:'1px solid #FF4D4F', height: '34px'} : {height: '34px'}}
                                            />
                                            {maxAmountError ? <p className="m-0 mt-1" style={{fontSize: '12px', fontWeight: '500',color: '#FF4D4F'}}>You can only add up to ₹1,00,000 using UPI</p> : ''}
                                            {/* {!invalidAmount  ? <p>You can only add up to ₹1,00,000 using UPI</p>: ''} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-form_field-container">
                                <div className="profile-form_field profile-tooltip-input">
                                    <div className="row">
                                        <div className="col-md-12 col-12 d-flex justify-content-between">
                                            <label className="my-2 text-small ">
                                                Enter your UPI ID <BsQuestionCircle className="ml-1" />
                                            </label>
                                            <label className="dbmn my-2 text-small ">
                          <span className="buynow-modal-link">
                            <a
                                href="http://faq.unlistedassets.com/support/solutions/articles/82000888719-how-to-find-my-upi-id-"
                                target="_blank"
                            >
                              <b>How to find my UPI ID?</b>
                            </a>
                          </span>
                                            </label>
                                        </div>
                                        <div className="col-md-12 col-12 my-1">
                                            <input
                                                className="w-100"
                                                placeholder="Enter UPI ID"
                                                value={enterUpiId}
                                                onChange={(e) => setEnterUpiId(e.target.value)}
                                                style={{ height: "34px" }}
                                            />
                                            {showUpiIdError ? <InlineValidationName /> : null}

                                            <div className="col-md-12 col-12 d-flex justify-content-end mt-2 p-0">
                                                <label className="dbmn my-2 text-small ">
                            <span className="buynow-modal-link">
                            <a href={downloadurl("myholding/downloaddisclaimeragreement/buynowtermsofsalepurchase")}><b>Download Terms Of Agreement</b></a>
                            </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-end gap-2">
                            <div className="col-md-4 col-12">
                                <Buttons.SecondaryButton
                                    value="Back"
                                    style={{ width: "100%" }}
                                    onClick={() => (
                                        setUPIModal(false), setAddMoneyNewModal(true)
                                    )}
                                />
                            </div>
                            <div className="col-md-4 col-12">
                                <Buttons.PrimaryButton
                                    value="Pay"
                                    style={{ width: "100%" }}
                                    onClick={payUsingUPIAddMoney}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={addMonetTowallet}
                onClose={() => setaddMonetTowallet(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="addcompanyrequest virtual-acc-modal">
                    <div className="addcompanyrequest_container virtual_acc_modal_padding w-100">
                        <div className="">
                            <h6 className="font1">Add Money To Virtual Account</h6>
                            {/* <p className="text-small">
                  <span className="theme-color">Add ₹{totalAmount}</span> (or
                  more) to your Virtual Account using netbanking for your
                  account number {accountnumber}.
                </p> */}
                            <AiOutlineClose
                                className="closeBtnAddMoneyModal"
                                onClick={() => setaddMonetTowallet(false)}
                            />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="">
                                        <h6 className="mb-1 heading font2">
                                            Beneficiary Details:
                                        </h6>
                                        <p className="font3">
                                            Please add Unlisted Assets as the beneficiary using the
                                            following details-
                                        </p>

                                        {/*<div className="row d-flex justify-content-between my-1">*/}
                                        {/*    <div className="col-md-6 col-12 my-1">*/}
                                        {/*        <h5 className="text-small mb-1">Beneficiary Name</h5>*/}
                                        {/*        <h5 className="text-small m-0"><b>{username}</b></h5>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-md-6 col-12 my-1">*/}
                                        {/*        <h5 className="text-small mb-1">User ID</h5>*/}
                                        {/*        <h5 className="text-small m-0"><b>{accountId}</b></h5>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="row d-flex justify-content-between my-1">
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">Account Number</h5>
                                                <h5 className="text-small m-0">
                                                    <b>{accountnumber}</b>
                                                </h5>
                                            </div>
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">
                                                    Account Holder Name
                                                </h5>
                                                <h5 className="text-small m-0">
                                                    <b>{accountholdername}</b>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-between my-1">
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">Bank Name</h5>
                                                <h5 className="text-small m-0">
                                                    <b>{bankname}</b>
                                                </h5>
                                            </div>
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">Branch Name</h5>
                                                <h5 className="text-small m-0">
                                                    <b>{branchname}</b>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-between my-1">
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">Account Type</h5>
                                                <h5 className="text-small m-0">
                                                    <b>Current</b>
                                                </h5>
                                            </div>
                                            <div className="col-md-6 col-12 my-1">
                                                <h5 className="text-small mb-1">IFSC Code</h5>
                                                <h5 className="text-small m-0">
                                                    <b>{ifsc}</b>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="text-small m-0">
                                        Please verify by clicking on the button below when you
                                        have made the payment!
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 d-flex justify-content-end">
                            <div className="col-md-6 col-12">
                                <Buttons.SecondaryButton
                                    value="I have added the Money"
                                    style={{ margin: "0px 5px", width: "100%" }}
                                    onClick={virtualbankdetails}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>

    )
}
export default AddVirtualAccount