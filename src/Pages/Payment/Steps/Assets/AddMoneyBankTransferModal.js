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

let AddMoneyBankTransferModal = () => {
    const classes = useStyles()
    let history = useHistory();
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
        // console.log('jjjjj'+accountnumber)
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
        console.log(responseJSON1)
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

        if (1 == 1) {
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
                successToast("Success", "Amount successfully withdrawn to your Bank Account!!")
            } else {
                errorToast("Invalid", "Withdrawls are disabled, pl contact admin!!")
            }


            // await clearErrorMessages();
            // setLoadingbtn(false);
            setopenwithdraw(false)

        } else if (response.status === 409) {
            errorToast("Not SuccessFul", "Amount not withdrawn, Contact Admin...")
            // setLoadingbtn(false);
            return
        } else if (response.status === 400) {
            errorToast("Not SuccessFul", "Amount not withdrawn, Contact Admin...")
            // setLoadingbtn(false);

        } else {
            errorToast("Not SuccessFul", "Amount not withdrawn, Contact Admin...")
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
                                                <p><b>Rs.{balance}</b></p>
                                            </div>
                                            <div>
                                                <label>Amount frozen in ongoing Transaction</label>
                                                <div className="d-flex justify-content-between">
                                                    <p><b>Rs.{balancefreeze}</b></p>
                                                    <p className="SelectedAssest-text"
                                                        onClick={handleClickOpen}
                                                    ><b>View Details </b></p>
                                                </div>
                                                {/* <input type="text"/> */}
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
                                                <Buttons.PrimaryButton value="Add Money" style={{ width: "45%", marginLeft: "7px" }} />
                                            </div>
                                                
                                            </>

                                        )}
                                        {isLoadingbtn && vacreated && (
                                            <Loadbutton />
                                        )}
                                    </div>


                                </div>

                               



                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="default_px-4">
                            <div className="p-2">

                              
                                {isLoadingbtn && vacreated && (
                                    <Loadbutton />
                                )}
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
    </>

    )
}
export default AddMoneyBankTransferModal