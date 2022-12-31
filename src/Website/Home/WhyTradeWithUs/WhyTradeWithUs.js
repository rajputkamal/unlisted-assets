import React, { useEffect, useState } from 'react';
import Buttons from '../../../Components/Buttons';
import PhoneImg from './Assets/PhoneImg.png';
import Liquidity from './Assets/Liquidity.gif';
import Interaction2 from './Assets/Interaction2.gif';
import EasytoAccess from './Assets/EasytoAccess.gif';
import Escrow2 from './Assets/Escrow2.gif';
import './WhyTradeWithUs.css'
import { Link } from "react-router-dom";

import { isLoggedIn,imgurl } from "../../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';


export default function WhyTradeWithUs() { 

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());

    const handleClickOpen = () => {
        { isLogedIn ? setOpenModal(false) : setOpenModal(true) }
    };
    const handleClose = () => {
        setOpenModal(false)
    };

    React.useEffect(() => {
        setInterval(() => AutoplayAnimations(autoplay), 7000);
    }, []);

    var  autoplay = 1;

    const AutoplayAnimations = (val) => {
        
        if (val == 1) {
            opneGif1()
            autoplay=autoplay+1
        } else if (val == 2) {
            opneGif2()
            autoplay=autoplay+1
        } else if (val == 3) {
            opneGif3()
            autoplay=autoplay+1
        } else {
            opneGif4()
            autoplay=1
        }
    }



    const [gif01, setGif01] = useState(true);
    const [gif02, setGif02] = useState(false);
    const [gif03, setGif03] = useState(false);
    const [gif04, setGif04] = useState(false);

    const opneGif1 = () => {
        setGif01(true)
        setGif02(false)
        setGif03(false)
        setGif04(false)
    }
    const opneGif2 = () => {
        setGif01(false)
        setGif02(true)
        setGif03(false)
        setGif04(false)
    }
    const opneGif3 = () => {
        setGif01(false)
        setGif02(false)
        setGif03(true)
        setGif04(false)
    }
    const opneGif4 = () => {
        setGif01(false)
        setGif02(false)
        setGif03(false)
        setGif04(true)
    }


    

    return (
        <div className="default-bg-color">
            <div className="WhyTradeWithUs-main" id="whytradeready">
                <div className="">
                    <div className="">
                        <div className="container ">
                            <h3 className='default-heading mb-4' >Why Transact With Us?</h3>
                            <p className='my-2 default-para' >Our platform provides opportunity to Buy/Sell/Explore investment opportunities in Unlisted Shares in India through a transparent and safe process by way of automating the process of share transfer in India
                            </p>
                            <div className='my-4 row  d-flex justify-content-center overflow-hidden'
                            >
                                <div className='col-md-6 col-12 py-1 WhyTradeWithUs-button'>
                                    <Link to="/login" ><Buttons.PrimaryButton value="Join Our Platform" />
                                    </Link>
                                    {/* <Buttons.PrimaryButton value="Join Our Platform" /> */}
                                </div>
                                <div className='col-md-6 col-12 py-1 WhyTradeWithUs-button2'>
                                    <Link to="/features" ><Buttons.SecondaryButton value="View All Features" />
                                    </Link>
                                    {/* <Buttons.SecondaryButton value="View All Features" onClick={handleClickOpen}/> */}
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='row mt-4  d-flex justify-content-center align-items-center overflow-hidden'>
                                <div className='col-md-4 d-flex justify-content-end '>
                                    <div className='dbmn WhyTradeWithUs-default-card'>
                                        <div onClick={opneGif1} >
                                            <div className={gif01 ? 'default_card_active my-4 ' : 'default_card my-4'}>
                                                <div className=''>
                                                    <h4 >Buyer-Seller Interaction</h4>
                                                    <p className='my-2 default-para'>Our unique platform ensures a transparent interaction/negotiation between buyers and sellers.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={opneGif2}>
                                            <div className={gif02 ? 'default_card_active my-4' : 'default_card my-4'}>
                                                <div className=' '>
                                                    <h4>Enhanced Liquidity</h4>
                                                    <p className='my-2 default-para'>Shareholders of unlisted companies can get easy and quick liquidity through our platform.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='gif-div'>

                                        {gif01 ? <img src={imgurl("Interaction2.1c4637a9.gif")} alt="loading..." className='img-fluid' /> : null}
                                        {gif02 ? <img src={imgurl("Liquidity.9f4833d2.gif")} alt="loading..." className='img-fluid' /> : null}
                                        {gif03 ? <img src={imgurl("Escrow2.d88c2b3f.gif")} alt="loading..." className='img-fluid' /> : null}
                                        {gif04 ? <img src={imgurl("EasytoAccess.753233574.gif")} alt="loading..." className='img-fluid' /> : null}

                                    </div> 
                                </div>
                                <div className='col-md-4 d-flex justify-content-start '>
                                    <div className='dbmn WhyTradeWithUs-default-card'>
                                        <div onClick={opneGif3}>
                                            <div className={gif03 ? 'default_card_active my-4 ' : 'default_card my-4'} >
                                                <div className=''>
                                                    <h4>Secured via Bank Escrow</h4>
                                                    <p className='my-2 default-para'>The transaction is secured through a bank escrow mechanism that safeguards your transactions.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={opneGif4}>
                                            <div className={gif04 ? 'default_card_active my-4' : 'default_card my-4'} >
                                                <div className=' '>
                                                    <h4>Easy to Access</h4>
                                                    <p className='my-2 default-para'>Now you can explore companies , negotiate  and conclude your transaction at ease.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='dnmb'>
                            <div className=' mt-4  default-overflow-Ydirection'>
                                <div className=''>
                                    <div className='d-flex px-4'>
                                        <div className='default-card-for-mobileview my-4'
                                             onClick={opneGif1}>
                                            <div className='card-size'>
                                                <h4 >Buyer-Seller Interaction</h4>
                                                <p className='my-2 default-para'>Our unique platform ensures a transparent interaction/negotiation between buyers and sellers.</p>
                                            </div>
                                        </div>
                                        <div className='default-card-for-mobileview my-4'
                                            onClick={opneGif2}>
                                            <div className='card-size'>
                                                <h4>Enhanced Liquidity</h4>
                                                <p className='my-2 default-para'>Shareholders of unlisted companies can get easy and quick liquidity through our platform.</p>
                                            </div>
                                        </div>
                                        <div className='default-card-for-mobileview my-4'
                                             onClick={opneGif3}>
                                            <div className='card-size'>
                                                <h4>Secured via Bank Escrow</h4>
                                                <p className='my-2 default-para'>The transaction is secured through a bank escrow mechanism that safeguards your transactions.</p>
                                            </div>
                                        </div>
                                        <div className='default-card-for-mobileview my-4'
                                             onClick={opneGif4}>
                                            <div className='card-size'>
                                                <h4>Easy to Access</h4>
                                                <p className='my-2 default-para'>Now you can explore companies , negotiate  and conclude your transaction at ease.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Dialog
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description" >

                            <div className='allcompany-modal-closeIcon text-right'>
                                <CloseIcon onClick={handleClose} />
                            </div>
                            <div className="addcompanyrequest px-5 pb-5">
                                <div className="">
                                    <div className="text-center">

                                        <h5><b>View All Features</b></h5>
                                        <p className="m-0 text-small">Please log in to View All Features right away!</p>

                                    </div>
                                    <div className="d-flex justify-content-center text-center mt-4">
                                        <Link to="/login" ><Buttons.PrimaryButton value="Login / Sign Up " />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Dialog>


                    </div>
                </div>
            </div>
        </div>
    )
}