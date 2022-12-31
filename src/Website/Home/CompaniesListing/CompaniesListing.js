import React, { useState } from 'react';
import Buttons from '../../../Components/Buttons';
import Adani_Logo from './Assets/Adani_Logo.png';
import Swiggy_logo from './Assets/Swiggy_logo.png';
import Airbnb_Logo from './Assets/Airbnb_Logo.png';
import SunPharma_Logo from './Assets/SunPharma_Logo.png'; 
import { Link } from "react-router-dom";

import './CompaniesListing.css'
import { isLoggedIn } from "../../../Utils/Network";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@material-ui/core/Dialog';


import company1 from './Assets/arohan financial services.png';
import company2 from './Assets/Sterlite_Power_Logo.png';
import company3 from './Assets/tata-capital_logo.png';
import company4 from './Assets/chennai super kings.png';
import company5 from './Assets/elofic.png';
import company6 from './Assets/Five_Star.png';
import company7 from './Assets/Motilal oswal home finance.png';
import company8 from './Assets/Kurlon Enterprise Limited.png';
import company9 from './Assets/Bharat_NRE_Coke_Limited.png';
import company10 from './Assets/ncl group.png';
import company11 from './Assets/care health insurance.png';
import company12 from './Assets/fincare small finance bank.png';



export default function CompaniesListing() {
    const [openModal, setOpenModal] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
    const handleClickOpen = () => {
        { isLogedIn ? setOpenModal(false) : setOpenModal(true) }
    };
    const handleClose = () => {
        setOpenModal(false)
    };

    return (
        <div className='CompaniesListing-section-bg py-3'>
            <div className="container">
                <div className="CompaniesListing-main" >
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <h3 className='CompaniesListed-heading'
                                >Companies Available On Our Platform</h3>

                            <div className='row mt-4 '>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company1} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company2} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company3} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company4} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row '>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company5} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company6} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company7} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company8} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company9} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company10} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company11} alt="company-logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-12 d-flex justify-content-center align-items-center mx-0 overflow-hidden'>
                                    <div className='CompaniesListing-card my-2 '>
                                        <div className='CompaniesListing-thumbnail d-flex justify-content-center align-items-center'>
                                            <img src={company12} alt="company-logo" className='img-fluid' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='my-4 d-flex justify-content-center w-100'>
                                <Link to="/all-companies" ><Buttons.PrimaryButton value="View All Companies"/></Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* <Dialog
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

                            <h5><b>View All Companies</b></h5>
                            <p className="m-0 text-small">Please log in to View All Companies right away!</p>

                        </div>
                        <div className="d-flex justify-content-center text-center mt-4">
                            <Link to="/login" ><Buttons.PrimaryButton value="Login / Sign Up " />
                            </Link>
                        </div>
                    </div>
                </div>
            </Dialog> */}

        </div>
    )
}