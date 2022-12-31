import React, { useState } from 'react';
import './Features.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isLoggedIn, imgurl } from "../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';
import { Link } from "react-router-dom";
import Buttons from '../../Components/Buttons';
import { Helmet } from "react-helmet";





export default function Features() {

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const [modalHeading, setmodalHeading] = useState()
    const [modalPara, setModalPara] = useState()


    const handleClose = () => {
        setOpenModal(false)
    };




    return (
        <>


            <Helmet>
                <title>Features</title>
                <meta name="description" content="features"
                    data-react-helmet="true" />
            </Helmet>
            <div className="features-main">
                {/* section 1 */}
                <div className="features-main-top default-bg-secondary mb-3">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-8 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top text-white text-center">
                                    <h1>Increase returns though Private Market investments</h1>
                                </div>
                            </div>
                            <div className="col-md-7 col-12 d-flex align-items-center justify-content-center">
                                <div className="features-top text-white text-center">
                                    <p>Diversify your portfolio and increase your returns by investing in private unlisted stocks.</p>
                                    <Link to="/login"><button className='btn bg-light' >Join Now <ArrowForwardIcon /></button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-10 col-12 d-flex align-items-center justify-content-center my-3">
                                <div className="features-MarkeplaceImg-img text-white text-center">
                                    <div className="MarkeplaceImg ">
                                        <img src={imgurl("MarkeplaceImg.2f426ee7.png")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* section 2 */}
                <div className="features-main-section2 features-main-section2-margin">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>Monetize your investments & ESOPs in unlisted companies through safe partner</h1>
                                    <p>Find buyers for your shares and ESOPs in unlisted companies and transact smoothly and safely.</p>
                                    <button className='btn sell-now-btn' 
                                        onClick={() => (setOpenModal(true), setmodalHeading("Sell Now"), setModalPara("Please log in to Sell Now right away!"))}>Sell Now <ArrowForwardIcon /></button>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1 ">
                                <div className="TabledataImg-img2">
                                    <img src={imgurl("TabledataImg.8f660315.png")} className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 3 */}
                <div className="features-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">

                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3">
                                <div className="TabledataImg">
                                    <img src={imgurl("Section3Img.92992195.png")} className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top">
                                    <h1>Choose amongst diverse unlisted stocks</h1>
                                    <p>Explore and invest in wide range of unlisted stocks across startups, pre-IPO and companies.</p>
                                    <button className='btn sell-now-btn'
                                        onClick={() => (setOpenModal(true), setmodalHeading("Explore Now"), setModalPara("Please log in to Explore Now right away!"))}>Explore Now <ArrowForwardIcon /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 4 */}
                <div className="features-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>Safe, secured and transparent transactions</h1>
                                    <p>Transact carefree with one of the best standards of safety and security including banks escrow mechanism for money transfer, audit by SEBI registered Trustee and best-in-class customer support</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1">
                                <div className="TabledataImg">
                                    <img src={imgurl("Section4Img.ce26327f.png")} className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 5 */}
                <div className="features-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">

                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3">
                                <div className="TabledataImg">
                                    <img src={imgurl("Section5Img.9c619f87.png")} className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top">
                                    <h1>Smooth interface</h1>
                                    <p>Make your unlisted stocks’ buying or selling experience fun through carefully designed interface, user guides and easy and smooth negotiation platform</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 6 */}
                <div className="features-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>Complete Ecosystem for unlisted stocks</h1>
                                    <p>Get regular insights and updates of your unlisted stocks, access to proprietary knowledge base and newsletters, access loan against your unlisted holdings and other broker services, all through single platform.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1">
                                <div className="TabledataImg">
                                    <img src={imgurl("Section6Img.8c2d2d2e.png")} className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 7 */}
                <div className="features-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-8 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top text-center">
                                    <h1>Register free and explore the world of private market</h1>
                                </div>
                            </div>
                            <div className="col-md-10 col-12 d-flex align-items-center justify-content-center my-3">
                                <div className="features-MarkeplaceImg-img ">
                                    <div className="Section7Img text-center">
                                        <img src={imgurl("Section7Img.8bdeae20.png")} className="img-fluid" />
                                        <Link to="/login"><button className='btn sell-now-btn my-3'>Sign up Now</button>
                                        </Link>


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

                                <h5><b>{modalHeading}</b></h5>
                                <p className="m-0 text-small">{modalPara}</p>

                            </div>
                            <div className="d-flex justify-content-center text-center mt-4">
                                <Link to="/login" ><Buttons.PrimaryButton value="Login / Sign Up " />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog>




            </div>
        </>
    )
}
