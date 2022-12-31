import React from 'react';
import "./ComingSoon.css";
import logo from "../../Pages/logo.png";


export default function ComingSoon() {
    return (
        <>
            <div className='container ComingSoon_Page mt-5'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-12 col-12 error-div mb-4 text-center'>
                        <div>
                            <div className="my-3">
                                <img src={logo} className="ComingSoon_Page_logo" data-aos="slide-up" data-aos-duration="1000"/>
                            </div>
                            <h1 data-aos="slide-up" data-aos-duration="1000">We Are Coming Soon...</h1>
                            <p  data-aos="slide-up" data-aos-duration="1000">Please wait for some more time</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
