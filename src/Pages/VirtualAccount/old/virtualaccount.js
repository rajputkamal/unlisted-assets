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
import {
    successToast,errorToast
} from "../../../src/Components/Toast/index";
import Breadcrubs from '../../Components/Breadcrumbs';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";

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
    const [accountholdername, setaccountholdername] = useState('')
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
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON = await response.json()
        setVirtualbankdetails(responseJSON)
        setAccountNumber(responseJSON.accountNumber)
        if(responseJSON.accountNumber ==  undefined) {
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

        const response1 = await apiCall("uservirtualaccount/virtualaccountbalance", 'GET', '', history)
        if(response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON1 = await response1.json()
        console.log(responseJSON1)
        const Balance = Number(responseJSON1).toFixed(2)

        setbalance(Balance)

        const response22 = await apiCall("uservirtualaccount/virtualaccountfreezebalance", 'GET', '', history)
        if(response22.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        const responseJSON22 = await response22.json()
        // console.log(responseJSON22)
        const BalanceFreez = Number(responseJSON22).toFixed(2)
        setbalancefreeze(BalanceFreez)
    }

    let addmoney = async (event) => {

        event.preventDefault();

        let response = await apiCall(
            "uservirtualaccount/addmoneyvirtualaccount/"+addamount,
            "POST",
            {}
        );

        if(response.status == undefined) {
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

        }  else {
            errorToast("Not SuccessFul", "Amount not added, Contact Admin...")
            // setLoadingbtn(false);
        }
        virtualbankdetails()
    }

    let withdrawmoney = async (event) => {
        event.preventDefault();

        if(1==1) {
            errorToast("Not SuccessFul", "Withdrawl of money is disabled, Contact Admin...")
            return
        }
        let response = await apiCall(
            "uservirtualaccount/withdrawmoneyvirtualaccount/"+withdrawamount,
            "POST",
            {}
        );

        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }

        if (response.status === 200) {

            const responsetext = await response.text()

            if(responsetext == true || responsetext == 'true') {
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

        }  else {
            errorToast("Not SuccessFul", "Amount not withdrawn, Contact Admin...")
            // setLoadingbtn(false);
        }
        virtualbankdetails()
    }

    return (
        <div className="container mt-3">
            <Breadcrubs />
            <div className="my-card my-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="p-2">
                            {/* <h6> <b>Your virtual account Details </b></h6> */}
                                <Tooltip title="Your virtual account will be activated at the time of your first transaction" arrow placement="top">
                                <Button className="profile-info-button p-0 mx-0"><h6><b>Your virtual account Details </b></h6></Button>
                                </Tooltip>

                                


                                <p className="text-small">A Virtual Account (VA) is a sub-account created with ICICI Bank and assigned to our users/clients for the Escrow mechanism. This Virtual Account is managed by a SEBI Registered Trustee. This makes it easy for unlisted assets platform to complete the transaction seamlessly.</p>
                                <p className="text-small">Your Virtual account will be created on 
                                <a href="#" className="company-link"><b> unlistedassets.com </b></a>
                                when your first negotiation bid  is accepted  and before you proceed for SPA (Share Purchase Agreement).</p>
                    
                            
                            <form className="w-100">
                                <label className="Virtual_account_Label my-2 text-small">Account Holder Name</label>
                                <input type="text" name="accountholdername" onChange={(e) => setaccountholdername(e.target.value)} value={accountholdername} placeholder={accountnumber} disabled />
                                <label className="Virtual_account_Label my-2 text-small">Virtual Account Number</label>
                                <input type="text" name="accountnumber" onChange={(e) => setAccountNumber(e.target.value)} value={accountnumber} placeholder={accountnumber} disabled />
                                <label className="my-2 text-small">IFSC Code</label>
                                <input type="text"name="ifsc" onChange={(e) => setIfsc(e.target.value)} value={ifsc} placeholder={accountnumber} disabled/>
                                <label className="my-2 text-small">Bank Name</label>
                                <input type="text" name="bankname" onChange={(e) => setBankName(e.target.value)} value={bankname} placeholder={accountnumber} disabled/>
                                <label className="my-2 text-small">Branch Name</label>
                                <input type="text" name="branchname" onChange={(e) => setBranchName(e.target.value)} value={branchname} placeholder={accountnumber} disabled/>
                                <label className="Virtual_account_Label my-2 text-small">Account Type</label>
                                <input type="text" name="accountType" onChange={(e) => setaccountType(e.target.value)} value={accountType} placeholder={accountnumber} disabled />
                            </form>
                            <div className="">
                                <div className="balance-details mt-3">
                                    {!isLoadingbtn && vacreated ?
                                        <>
                                    <div>
                                        <label>Virtual Account Balance</label>
                                        {/* <input type="text"/> */}
                                        <p><b>Rs.{balance}</b></p>
                                    </div>
                                    <div>
                                        <label>Amount frozen in ongoing Transaction</label>
                                        <p><b>Rs.{balancefreeze}</b></p>
                                        {/* <input type="text"/> */}
                                    </div> </>:

                                        null}
                                </div>

                                <div className="balance-details mt-3">
                                    <div >
                                        {!isLoadingbtn && vacreated && (
                                            <>
                                                <Buttons.PrimaryButton value="Withdraw money"
                                                    // disabled={!(bankname && accountnumber && branchname && ifsc)}
                                                                    onClick={handleOpenwithdraw}
                                                />
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

                                                        <h5 className=" text-primary-default border-bottom pb-3">How much would you like to withdraw</h5>
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



                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className="p-2">

                                {!isLoadingbtn && vacreated && (
                                    // <Buttons.SecondaryButton value="Download Account Statement"
                                    //
                                    //                          onClick={downloadurl("uservirtualaccount/downloadstatement")} style={{fontSize:"12px"}}/>
                                    <a href={downloadurl("uservirtualaccount/downloadvirtualbookexcel")}><b className="m-0 text-small">Download Account Statement</b></a>

                                )}
                                {isLoadingbtn && vacreated && (
                                    <Loadbutton />
                                )}
                            </div>
                            <div className="my-card my-4">
                                <div className="my-2">
                                    <img src={bank} width="150" />
                                </div>
                                <div className="my-2">
                                    {/* <h6 className="mb-2"><b>Why Bank Account Details ?</b></h6> */}
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">What is a Virtual Account ?</p></b></a>

                                    <p className="text-small">
                                        We feel this is one of the fastest way to communicate with you and
                                        upadate you with all the information about your transaction and
                                        shortlisted companies.
                                    </p>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">What is a Virtual Account ?</p></b></a>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">What is ESCROW ?</p></b></a>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">What are holdings ?</p></b></a>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">What are Listings ?</p></b></a>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">Edit you Holdings & Listings ?</p></b></a>
                                    <a href="#" className="tradeready_question"><b><p className="mb-1">Difference between Holding & Listing ?</p></b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AddVirtualAccount