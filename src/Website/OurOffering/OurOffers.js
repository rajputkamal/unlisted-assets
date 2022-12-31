import React, { useState } from 'react';
import BackgroundImg from './Assets/BackgroundImg.png';
import './OurOffers.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isLoggedIn } from "../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';
import { Link } from "react-router-dom";
import Buttons from '../../Components/Buttons';
import { imgurl } from "../../Utils/Network";
import { Helmet } from "react-helmet";





export default function OurOffers() {

    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const [modalHeading, setmodalHeading] = useState()
    const [modalPara, setModalPara] = useState()

    console.log("module", module)


    const handleClose = () => {
        setOpenModal(false)
    };




    return ( 
        <>
            <Helmet>
                <title>Our-offering</title>
                <meta name="description" content="Our-offering"
                    data-react-helmet="true" />
            </Helmet>

            <div className="ouroffer-main">
                <div className="ouroffer-main-section1 default-bg-secondary overflow-hidden">
                    <div className="ouroffer-main-container set-backgroundImg">
                        <div className="row overflow-hidden">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-between">
                                <div className="aboutus-left text-white">
                                    <h1>Our Offerings</h1>
                                    <p>We endeavor to provide the best in-class service to our clients through our technology driven processes and ensure the time efficient completion of transaction for both buyer and seller of unlisted shares/ESOP
                                        .</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-between overflow-hidden">
                                <div className="aboutus-right text-right w-100 pt-5 ">
                                    <img src={imgurl("Topimg.bb133a96.png")} alt="Topimg" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="background-img ">
                        <img src={imgurl("BackgroundImg+(1).png")} className="img-fluid" alt="Topimg" />
                    </div>
                </div>

                {/* section 1 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">

                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3">
                                <div className="TabledataImg">
                                    <img src={imgurl("img1.1734c986.png")} className="img-fluid" alt="img" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top">
                                    <h1>Buy/Sell Unlisted shares/ESOP </h1>
                                    <p>We, through our technology enabled platform,  provide a transparent and secure mechanism to transact in shares/ESOP of unlisted companies including start up-companies, and hence providing liquidity through our offerings. We help retail investors, institutions and corporations with various solutions to suit their requirements in relation to transactions in unlisted shares/ESOP. Unlisted shares include shares/ESOP of startups companies, and Pre IPO companies. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* section 2 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>Pre IPO Placements</h1>
                                    <p>We help unlisted companies do primary and secondary placement of
                                        their equity shares to domestic and global funds through our associates
                                        before they are planning to come out with an Initial Public offer
                                        whether in domestic or international capital markets.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1">
                                <div className="TabledataImg">
                                    <img src={imgurl("img2.b23a5a87.png")} className="img-fluid" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* section 3 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">

                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3">
                                <div className="TabledataImg">
                                    <img src={imgurl("img3.83a37e29.png")} className="img-fluid" alt="img" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top">
                                    <h1>Primary Placement </h1>
                                    <p>Our team has relevant experience in fund management, transaction
                                        advisory and transaction support services in the past. We with our associates help
                                        companies raise primary capital from various funds/institutions/family offices having domestic and global presence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 4 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>ESOP Transaction Management</h1>
                                    <p>We provide end to end ESOP transaction management solutions
                                        through our associates to enable the
                                        corporation to manage the transaction in ESOP given to its
                                        employees in a time efficient manner and help in getting the right
                                        price for ESOP. Our background of transaction advisory through
                                        consulting practice comes in handy for ensuring solutions that
                                        suits you the best.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1">
                                <div className="TabledataImg">
                                    <img src={imgurl("img4.43e7cd04.png")} className="img-fluid" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 5 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">

                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3">
                                <div className="TabledataImg">
                                    <img src={imgurl("img5.0b6b58ff.png")} className="img-fluid" alt="img" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75">
                                <div className="features-top">
                                    <h1>Transaction support services</h1>
                                    <p>We provide the transaction support services including valuation advisory through our associate entity which is one of the leading firms in transaction advisory services in India.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section 6 */}
                <div className="ouroffer-main-section2">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center overflow-hidden py-3">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center w-75 default-order-2">
                                <div className="features-top">
                                    <h1>Fund Management Services</h1>
                                    <p className='mb-0'>Our team has relevant credentials for fund management and
                                        research advisory services for listed and unlisted companies in
                                        India. With our associates, we offer these services to our clients to help them optimize
                                        their return on investment.
                                        Our team has relevant credentials for fund management and
                                        research advisory services for listed and unlisted companies in
                                        India. With our associates, we offer these services to our clients to help them optimize
                                        their return on investment.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center mt-3 default-order-1">
                                <div className="TabledataImg">
                                    <img src={imgurl("img6.f0a53dae.png")} className="img-fluid" alt="img" />
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
