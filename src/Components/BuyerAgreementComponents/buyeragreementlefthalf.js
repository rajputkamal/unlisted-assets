import React, { useState, useEffect } from "react";
import "./buyeragreementlefthalf.scoped.css";
import HDFC from "./Framehdfc.png"
import More from "./company.svg"
import Aware from "./not.svg"
import seemore from "./seemore-details.svg";
import aadhar from "../../Pages/BuyerAgreement/aadhar.svg";
import download from "../../Pages/BuyerAgreement/download.svg"
import "../../Pages/BuyerAgreement/buyeragreement.scoped.css"
import Buttons from "../../Components/Buttons";
import MobileVerification from "../../Pages/MobileVerification";
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@mui/material/Tooltip';
import Button from '@material-ui/core/Button';
import { getTransactionFee } from "../../Utils/utils";



import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';



import {
    BrowserRouter as Router,
    useLocation, useHistory
} from "react-router-dom";
import { apiCall, downloadurl } from "../../Utils/Network"

let BuyerAgreementLeftHalf = (props) => {

    const { window } = props;
    const [open, setOpen] = React.useState(false);
    // const [width, setWidth] = useState(window.innerWidth);


    const [showDialog, setShowDialog] = React.useState(false);
    const [tradecommunication1, setTradeCommunication1] = React.useState([]);
    const location = useLocation();
    const selectedTrade = props.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    //console.log("pppppppppppppppp11" + selectedTrade.id + selectedOnGoingTxn.agreedQty)

    const [txnAmount, settxnAmount] = React.useState((selectedOnGoingTxn.agreedPrice *
        selectedOnGoingTxn.agreedQty));

    let totalAmountInvolved = txnAmount

    let transactionFee = 0


    if (selectedTrade.isTradeOwner) {
        transactionFee = getTransactionFee(false, totalAmountInvolved)
    } else {
        transactionFee = getTransactionFee(true, totalAmountInvolved)

    }

    const [txnFee, settxnFee] = React.useState((transactionFee));

    const [txnFeewithtax, settxnFeewithtax] = React.useState((transactionFee) + (.18 * transactionFee));

    const [txnTotal, settxnTotal] = React.useState(txnAmount + txnFeewithtax);

    const [transactionDetailCard, settransactionDetailCard] = React.useState(true);
    const openCard = () => {
        transactionDetailCard ? settransactionDetailCard(false) : settransactionDetailCard(true)
    }
    const [balancefreeze, setbalancefreeze] = useState('')

    const BalanceFreeze = Number(balancefreeze).toFixed(2);



    let history = useHistory();

    useEffect(() => {
        setbalancefreeze(props.balancefreeze)
    }, [props])


    const drawerBleeding = 56;

    const Root = styled('div')(({ theme }) => ({
        height: '100%',
        backgroundColor:
            theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
    }));

    const StyledBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    }));

    const Puller = styled(Box)(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));



    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;





    return (
        <>


            {
                <>

                    <div className="mobileBottomBar dnmb">  

                        <Root>
                            <CssBaseline />
                            <Global 
                                styles={{
                                    '.MuiDrawer-root > .MuiPaper-root': {
                                        height: `calc(85% - ${drawerBleeding}px)`,
                                        overflow: 'visible',
                                    },
                                }}
                            />
                            {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
                                <Buttons.PrimaryButton value="Transaction Detail" style={{ width: "100%", marginTop: "10px" }} onClick={toggleDrawer(true)} />
                            </Box> */}
                            <SwipeableDrawer
                                className="dnmb"
                                container={container}
                                anchor="bottom"
                                open={open}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                                swipeAreaWidth={drawerBleeding}
                                disableSwipeToOpen={false}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                                <StyledBox
                                    sx={{
                                        position: 'absolute',
                                        top: -drawerBleeding,
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                        visibility: 'visible',
                                        backgroundColor:" #f2f3f9",
                                        right: 0,
                                        left: 0,
                                    }}
                                >
                                    <div className="Puller" ><Puller onClick={toggleDrawer(true)} /></div>
                                    {/* <h6 className="heading1">Transaction Detail</h6> */}                                    

                                    <Typography sx={{ p: 2 }} className="Drower-lable-bg"><h6 className="Drower-lable test-center">Transaction Detail</h6></Typography>
                                </StyledBox>
                                <StyledBox
                                    sx={{
                                        px: 2,
                                        pb: 2,
                                        height: '100%',
                                        overflow: 'auto',
                                    }}
                                >
                                    {/* <Skeleton variant="rectangular" height="100%" /> */}
                                    <div className="TransactionDetail">
                                        <div className="row">
                                            <div className="order-md-1 order-1 col-md-12 col-12">
                                                <div className="px-3">
                                                    <div className="">
                                                        <div className="p-2">
                                                            <div className="agreement-logo">
                                                                <img src={selectedOnGoingTxn.companyLogo} />
                                                            </div>
                                                            <div className="company-info">
                                                                <p ><b className="">{selectedOnGoingTxn.companyName}</b></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-3">
                                                    <div className="buyeragreement_transactionDetails mt-1 px-2">
                                                        <div >
                                                            <p className="text-small">Transation ID</p>
                                                            <p className="text-small"><b>TXN{selectedOnGoingTxn.id}</b></p>
                                                        </div>
                                                        <div >
                                                            <p className="text-small">Share Type</p>
                                                            <p className="text-small"><b>{selectedOnGoingTxn.commodityName}</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="buyeragreement_transactionDetails mt-1 mb-2 px-2">
                                                        <div className="desc">
                                                            <p className="text-small">Buy Now completed on</p>
                                                            <p className="text-small"><b>{selectedOnGoingTxn.updateDate}</b></p>
                                                        </div>
                                                        {/* <div className="desc">
                                                            <p className="text-small">Date & Time</p>
                                                            <p className="text-small"><b>{selectedOnGoingTxn.updateDate}</b></p>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="TransactionDetail-info col-md-12 col-12 order-md-2 order-2 px-2 Transaction-Detail-bg-color pt-4">
                                            <div className="px-3">
                                                <h6><b>Transaction Detail</b></h6>
                                                <div className="buyeragreement_transactionDetails">
                                                    <p className="buyeragreement_transactionDetails_leftside">Share/Price</p><p><b>₹ {selectedOnGoingTxn.agreedPrice}</b></p>
                                                </div>
                                                <div className="buyeragreement_transactionDetails">
                                                    <p className="buyeragreement_transactionDetails_leftside">Qty.</p><p><b>{selectedOnGoingTxn.agreedQty}</b></p>
                                                </div>
                                                <div className="buyeragreement_transactionDetails">
                                                    {/* <p>{selectedOnGoingTxn.agreedQty} x {selectedOnGoingTxn.agreedPrice}</p><p><b>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice}</b></p> */}
                                                    <p className="buyeragreement_transactionDetails_leftside">Transaction value</p><p><b>₹ {txnAmount}</b></p>
                                                </div>

                                                <div className="buyeragreement_transactionDetails">
                                                    <p>Transaction Fee <span className="transactionfee">(Flat Fee *)</span> <br /></p><p><b className="text-extra-small">₹ {(txnFee).toFixed(2)}</b></p>
                                                </div>

                                                <div className="buyeragreement_transactionDetails">
                                                    <p>GST <br /><span className="transactionfee">(18% of TXN Fee)</span> <br /></p><p><b className="text-extra-small">₹ {(txnFee * .18).toFixed(2)}</b></p>
                                                </div>
                                                <div className="buyeragreement_transactionDetails">
                                                    <p>Total  <br /></p><p><b className="text-extra-small">₹ {txnFeewithtax.toFixed(2)}</b></p>
                                                </div>
                                                {/* <div className="buyeragreement_transactionDetails">
                                        <p>Facilitation Fee <br /></p><p><b className="text-extra-small">₹ {txnFee}</b></p>
                                        <p>Facilitation Fee is 1% of Txn Amount*</p>
                                        <p>Including GST* 18%</p>
                                    </div> */}

                                                {/*<div className="buyeragreement_transactionDetails">*/}
                                                {/*    <p>TDS (on Facilitation Fee) <br /></p><p><b>₹ 15.7</b></p>*/}
                                                {/*</div>*/}
                                                {/*<div className="buyeragreement_transactionDetails">*/}
                                                {/*    <p>Transaction Fees <br /></p><p><b>₹ 150</b></p>*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total3 mt-0 px-3">
                                                <p className=""><span style={{ fontSize: "9px" }}>*Including GST</span><br />Total Payable</p><p className="pt-3 font-weight-bold">₹ {txnTotal.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-12 order-2 pb-3 Transaction-Detail-bg-color">
                                            {/* <div className="buyeragreement_seemore ">
                                        <img src={seemore} className="cursor-pointer w-50"/>
                                    </div> */}
                                            {/*<div className="timing  pt-5">*/}
                                            {/*    <h6 className="text-center  text-small">Time Remaining For Transaction</h6>*/}
                                            {/*    <div className="buyeragreement_Timer mx-4">*/}
                                            {/*        <h4 className="m-0 pt-2 pb-2">40h : 30mins</h4>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="d-flex justify-content-center">*/}
                                            {/*    <Buttons.PrimaryButton value="Sign Seller Agreement" style={{ width: "65%", marginTop: "10px" }} onClick={() => setShowDialog(true)} /></div>*/}
                                            {/*    */}
                                            {/*</div>*/}

                                            {/*<div className="note ">*/}
                                            {/*    <div className="buyeragreement_aware ">*/}
                                            {/*        <img src={Aware} className="mr-2" />*/}
                                            {/*        <p >*/}
                                            {/*            If not completed after 48 hours from start, this transaction will restart with*/}
                                            {/*            new agreement sigining automatically.*/}
                                            {/*            Additional charges are applicable immediately <br /><b className="buyeragreement_readmore">Read more.</b>*/}
                                            {/*        </p>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>



                                </StyledBox>
                            </SwipeableDrawer>
                        </Root>
                    </div>
                </>
            }


            <div className="row TransactionDetail pt-2 buyeragreement_left my-card dbmn">
                <div className=" order-md-1 order-1 col-md-12 col-12 pb-3 px-0">
                    <div className="buyeragreement_transactionDetails" onClick={openCard}>
                        <div className="">
                            <div className="agreement-logo">
                                <img src={selectedOnGoingTxn.companyLogo} />
                            </div>
                            <div className="company-info">
                                <p><b>{selectedOnGoingTxn.companyName}</b></p>
                                {/*<p className="m-0">Banking</p>*/}
                                {/*<p className="m-0">TXN{selectedOnGoingTxn.id}</p>*/}
                            </div>
                        </div>
                        {/*<div className="more ">*/}
                        {/*    <img src={More} width="20" className=" cursor-pointer" />*/}
                        {/*</div>*/}

                    </div>

                    <div className="">
                        <div className="buyeragreement_transactionDetails mt-3 ">
                            {/*<div className="desc">*/}
                            {/*    <p className="text-small">Buy Now created on</p>*/}
                            {/*    <p className="text-small"><b className="text-extra-small">{selectedOnGoingTxn.createDate}</b></p>*/}
                            {/*</div>*/}
                            <div >
                                <p className="text-small">Transation ID</p>
                                <p className="text-small"><b className="text-extra-small">TXN{selectedOnGoingTxn.id}</b></p>
                            </div>
                            <div >
                                <p className="text-small">Share Type</p>
                                <p className="text-small"><b className="text-extra-small">{selectedOnGoingTxn.commodityName}</b></p>
                            </div>
                        </div>
                        <div className="buyeragreement_transactionDetails ">
                            <div className="desc">
                                <p className="text-small">Buy Now completed on</p>
                                <p className="text-small"><b className="text-extra-small">{selectedOnGoingTxn.updateDate}</b></p>
                            </div>

                        </div>
                        <div className="buyeragreement_transactionDetails ">
                            {/*<div className="desc">*/}
                            {/*    <p className="text-small">Amount Frozen</p>*/}
                            {/*    <p className="text-small"><b className="text-extra-small">₹ {BalanceFreeze}</b></p>*/}
                            {/*</div>*/}
                            <div >
                                {/*<p className="text-small">Transation ID</p>*/}
                                {/*<p className="text-small"><b className="text-extra-small">TXN{selectedOnGoingTxn.id}</b></p>*/}
                            </div>
                        </div>
                        <div className="buyeragreement_seemore desktop-none  text-center">
                            {/* <img src={seemore} className="cursor-pointer w-50"/> */}
                        </div>
                    </div>

                </div>


                <div className="TransactionDetail-info col-md-12 col-12 order-md-2 order-2 px-0">
                    <h6><b>Transaction Detail</b></h6>
                    <div className="buyeragreement_transactionDetails">
                        <Tooltip title="Price*Qty" arrow placement="top-start">
                            <p className="buyeragreement_transactionDetails_leftside">Share/Price</p>
                        </Tooltip>
                        <p><b className="text-extra-small">₹ {selectedOnGoingTxn.agreedPrice}</b></p>
                    </div>
                    <div className="buyeragreement_transactionDetails">
                        <Tooltip title="Total Quantity transacted" arrow placement="top-start">
                            <p className="buyeragreement_transactionDetails_leftside">Qty.</p>
                        </Tooltip>
                        <p><b className="text-extra-small">{selectedOnGoingTxn.agreedQty}</b></p>
                    </div>
                    <div className="buyeragreement_transactionDetails">
                        {/* <p>{selectedOnGoingTxn.agreedQty} x {selectedOnGoingTxn.agreedPrice}</p><p><b>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice}</b></p> */}

                        <p className="buyeragreement_transactionDetails_leftside">Transaction value</p><p><b className="text-extra-small">₹ {txnAmount}</b></p>
                    </div>
                    <div className="buyeragreement_transactionDetails">
                        <Tooltip title="Faciliation Fee charged from you by the platform (Inclusive of GST)" arrow placement="top-start">
                            <p>Transaction Fee<br /> <span className="transactionfee">(Flat Fee *)</span> </p>
                        </Tooltip>
                        <p><b className="text-extra-small">₹ {(txnFee).toFixed(2)}</b></p>
                    </div>
                    <div className="buyeragreement_transactionDetails">
                        <p>GST <br /><span className="transactionfee">(18% of TXN Fee)</span> <br /></p><p><b className="text-extra-small">₹ {(txnFee * .18).toFixed(2)}</b></p>
                    </div>
                    <div className="buyeragreement_transactionDetails">
                        <p>Total  <br /></p><p><b className="text-extra-small">₹ {txnFeewithtax.toFixed(2)}</b></p>
                    </div>

                    {/* <div className="buyeragreement_transactionDetails">
                                    <p>Facilitation Fee <br />
                                    <p>1% of <br />Txn Amount*</p>
                                    <p>Including GST* 18%</p></p><p><b className="text-extra-small">₹ {txnFee}</b></p>
                                    
                                </div> */}
                    {/* <div className="buyeragreement_transactionDetails">
                                  <Tooltip title="Tax Dedcuted at source" arrow placement="top-start">
                                     <p>TDS (on Facilitation Fee) <br /></p>
                                </Tooltip><p><b className="text-extra-small">₹ 15.7</b></p>
                                </div> */}
                    {/*<div className="buyeragreement_transactionDetails">*/}
                    {/*    <p>Transaction Fees <br /></p><p><b className="text-extra-small">₹ 150</b></p>*/}
                    {/*</div>*/}
                    <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total3 mt-0">
                        <Tooltip title="Total Amount you will pay for this transaction" arrow placement="top-start">
                            <p className=""><span style={{ fontSize: "9px" }}>*Including GST</span><br />Total Payable</p>
                        </Tooltip>
                        <p className="pt-3">₹ {txnTotal.toFixed(2)}</p>
                    </div><hr />
                </div>


                {/*<div className="col-md-12 col-12 order-2 px-0">*/}
                {/*    <div className="buyeragreement_seemore ">*/}
                {/*    <img src={seemore} className="cursor-pointer w-50"/>*/}
                {/*</div> */}
                {/*    <div className="timing  pt-2">*/}
                {/*        <h6 className="text-center text-small">Time Remaining For transaction</h6>*/}
                {/*        <div className="buyeragreement_Timer">*/}
                {/*            <h4 className="m-0 pt-2 pb-2">40h : 30mins</h4>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="note ">*/}
                {/*        <div className="buyeragreement_aware ">*/}
                {/*            <img src={Aware} className="mr-2" />*/}
                {/*            <p >*/}
                {/*                If not completed after 48 hours from start, this transaction will restart with*/}
                {/*                new agreement sigining automatically.*/}
                {/*                Additional charges are applicable immediately <br /><b className="buyeragreement_readmore">Read more.</b>*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

            {/* =========== for mobile view ================== */}


            <div className=" TransactionDetail pt-2 my-3 buyeragreement_left border-0 my-card default-shadow d-none">
                <div className="row">
                    <div className=" order-md-1 order-1 col-md-12 col-12">
                        <div className="px-3" onClick={openCard}>
                            {
                                transactionDetailCard ? <>
                                    <div className="">
                                        {/* <img src={seemore} className=" d-block mx-auto cursor-pointer pb-1"/> */}

                                        <div className="p-2">
                                            <div className="agreement-logo">
                                                <img src={selectedOnGoingTxn.companyLogo} />
                                            </div>
                                            <div className="company-info">
                                                <p ><b className="">{selectedOnGoingTxn.companyName}</b></p>
                                                {/*<p className="m-0">Banking</p>*/}
                                                {/* <p className="m-0">TXN{selectedOnGoingTxn.id}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </> : <>
                                    <div className=" px-2 bg-danger">
                                        <div className="d-flex company-logo  align-items-center p-2 ">
                                            <img width="20" height="20" src={selectedOnGoingTxn.companyLogo} />

                                            <p className="m-0 pl-2"><b className="company-info-companyName">{selectedOnGoingTxn.companyName}</b></p>
                                        </div>
                                        <div className="px-2 text-center company-info ">

                                            <div className="d-flex justify-content-between">
                                                <p className="pr-5">Qty: {selectedOnGoingTxn.agreedQty} Share</p>
                                                <p className="pl-4">₹ {selectedOnGoingTxn.agreedPrice}/share</p>
                                            </div>
                                            <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total2 d-flex">
                                                <p>Total</p>
                                                <p>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice}</p>
                                            </div><hr className="my-1" />
                                            {/* <a href="#">Show Transation Details</a> */}
                                            <img src={seemore} className="cursor-pointer pb-1" />
                                        </div>
                                    </div>

                                </>

                            }

                            {/* <div className="more mobi-none">
                                <img src={More} width="20" className=" cursor-pointer" />
                                </div> */}
                        </div>
                        {
                            transactionDetailCard ? <>
                                <div className="px-3">
                                    <div className="buyeragreement_transactionDetails mt-1 px-2">
                                        <div >
                                            <p className="text-small">Transation ID</p>
                                            <p className="text-small"><b>TXN{selectedOnGoingTxn.id}</b></p>
                                        </div>
                                        <div >
                                            <p className="text-small">Share Type</p>
                                            <p className="text-small"><b>{selectedOnGoingTxn.commodityName}</b></p>
                                        </div>
                                    </div>
                                    <div className="buyeragreement_transactionDetails mt-1 mb-2 px-2">
                                        <div className="desc">
                                            <p className="text-small">Buy Now completed on</p>
                                            <p className="text-small"><b>{selectedOnGoingTxn.updateDate}</b></p>
                                        </div>
                                        {/* <div className="desc">
                                            <p className="text-small">Date & Time</p>
                                            <p className="text-small"><b>{selectedOnGoingTxn.updateDate}</b></p>
                                        </div> */}
                                    </div>
                                    {/* <div className="buyeragreement_seemore desktop-none  text-center">
                                        <img src={seemore} className="cursor-pointer w-50"/>
                                    </div> */}
                                </div>
                            </>
                                : null
                        }
                    </div>
                </div>
                {

                    transactionDetailCard ?
                        <>
                            <div className="TransactionDetail-info col-md-12 col-12 order-md-2 order-2 px-2 Transaction-Detail-bg-color pt-4">
                                <div className="px-3">
                                    <h6><b>Transaction Detail</b></h6>
                                    <div className="buyeragreement_transactionDetails">
                                        <p className="buyeragreement_transactionDetails_leftside">Share/Price</p><p><b>₹ {selectedOnGoingTxn.agreedPrice}</b></p>
                                    </div>
                                    <div className="buyeragreement_transactionDetails">
                                        <p className="buyeragreement_transactionDetails_leftside">Qty.</p><p><b>{selectedOnGoingTxn.agreedQty}</b></p>
                                    </div>
                                    <div className="buyeragreement_transactionDetails">
                                        {/* <p>{selectedOnGoingTxn.agreedQty} x {selectedOnGoingTxn.agreedPrice}</p><p><b>₹ {selectedOnGoingTxn.agreedQty * selectedOnGoingTxn.agreedPrice}</b></p> */}
                                        <p className="buyeragreement_transactionDetails_leftside">Transaction value</p><p><b>₹ {txnAmount}</b></p>
                                    </div>

                                    <div className="buyeragreement_transactionDetails">
                                        <p>Transaction Fee <span className="transactionfee">(Flat Fee *)</span> <br /></p><p><b className="text-extra-small">₹ {(txnFee).toFixed(2)}</b></p>
                                    </div>

                                    <div className="buyeragreement_transactionDetails">
                                        <p>GST <br /><span className="transactionfee">(18% of TXN Fee)</span> <br /></p><p><b className="text-extra-small">₹ {(txnFee * .18).toFixed(2)}</b></p>
                                    </div>
                                    <div className="buyeragreement_transactionDetails">
                                        <p>Total  <br /></p><p><b className="text-extra-small">₹ {txnFeewithtax.toFixed(2)}</b></p>
                                    </div>


                                    {/* <div className="buyeragreement_transactionDetails">
                                        <p>Facilitation Fee <br /></p><p><b className="text-extra-small">₹ {txnFee}</b></p>
                                        <p>Facilitation Fee is 1% of Txn Amount*</p>
                                        <p>Including GST* 18%</p>
                                    </div> */}

                                    {/*<div className="buyeragreement_transactionDetails">*/}
                                    {/*    <p>TDS (on Facilitation Fee) <br /></p><p><b>₹ 15.7</b></p>*/}
                                    {/*</div>*/}
                                    {/*<div className="buyeragreement_transactionDetails">*/}
                                    {/*    <p>Transaction Fees <br /></p><p><b>₹ 150</b></p>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total3 mt-0 px-3">
                                    <p className=""><span style={{ fontSize: "9px" }}>*Including GST</span><br />Total Payable</p><p className="pt-3 font-weight-bold">₹ {txnTotal.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="col-md-12 col-12 order-2 pb-3 Transaction-Detail-bg-color">
                                {/* <div className="buyeragreement_seemore ">
                                        <img src={seemore} className="cursor-pointer w-50"/>
                                    </div> */}
                                {/*<div className="timing  pt-5">*/}
                                {/*    <h6 className="text-center  text-small">Time Remaining For Transaction</h6>*/}
                                {/*    <div className="buyeragreement_Timer mx-4">*/}
                                {/*        <h4 className="m-0 pt-2 pb-2">40h : 30mins</h4>*/}
                                {/*    </div>*/}
                                {/*    <div className="d-flex justify-content-center">*/}
                                {/*    <Buttons.PrimaryButton value="Sign Seller Agreement" style={{ width: "65%", marginTop: "10px" }} onClick={() => setShowDialog(true)} /></div>*/}
                                {/*    */}
                                {/*</div>*/}

                                {/*<div className="note ">*/}
                                {/*    <div className="buyeragreement_aware ">*/}
                                {/*        <img src={Aware} className="mr-2" />*/}
                                {/*        <p >*/}
                                {/*            If not completed after 48 hours from start, this transaction will restart with*/}
                                {/*            new agreement sigining automatically.*/}
                                {/*            Additional charges are applicable immediately <br /><b className="buyeragreement_readmore">Read more.</b>*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </>

                        : null
                }
            </div>


        </>

    )
}

export default BuyerAgreementLeftHalf
