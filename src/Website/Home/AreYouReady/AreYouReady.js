import React, { useState } from 'react';
import Buttons from '../../../Components/Buttons';
import './AreYouReady.css';
import { Link } from "react-router-dom";



export default function AreYouReady() {

    return (
        <div className='bg-color'>
            <div className="AreYouReady-main container overflow-hidden" >
                <div className="row">
                    <div className="col-md-12 col-12">
                        <h3 className='default-heading mb-4'
                            >Let’s Get You Started</h3>
                        <p className='my-2 default-para'>Excellent platform and very easy and takes less than few minutes to “Sell” and “Buy” shares </p>
                        <div className='my-4 d-flex justify-content-center w-100' >
                        <Link to="/login" className=""><Buttons.PrimaryButton value="Join Our Platform" />
                                </Link>
                            {/* <Buttons.PrimaryButton value="Join Our Platform" />  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}