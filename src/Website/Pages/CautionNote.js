import React from 'react';
import './style.css';
import CompanyLogo from './CompanyLogo.png';


export default function CautionNote() {
    return (
        <>

            <section className="privacypolicy-main container">
                <div className="my-card">
                    <div className="privacypolicy-container">
                        <div className='d-flex justify-content-center'>
                            <div className='CompanyLogo'>
                                <img src={CompanyLogo} alt="img" className='img-fluid' />
                            </div>
                        </div>
                        <hr />
                        <div className="annexure-4-para">
                            <div className="section1">
                                <h3 className='my-3'>CAUTION NOTE</h3>
                                <p >While creating holding of your stocks under tab "Holding”on the Platform if you create any holding of a stock or multiple stocks which don’t exist as per actual statement of holding as on date of creation of holding in the database of Platform of UTPL, and you enter into a transaction of selling those shares to any buyer on the Platform, this particular transaction or series of transaction would be termed as <span className="bold">Bogus transaction</span> and you will be blacklisted from the Platform for doing any transaction in future.</p>
                                <p className="bold">We, at UTPL, view this type of action on the part of any user very seriously and, reserve all our rights to take legal recourse of recovering any direct or indirect loss or damages incurred by us or by any of our users on the Platform on account of your bogus transaction(s). Therefore, we suggest you verify/re-verify all your holding(s) before doing any Transaction/Listing on the platform.</p>
                                <p className="bold">Note: Any security other than equity shares are not allowed to be listed on the Platform, and in case of equity shares subject to Right of First Refusal, Tag along Rights, waiver or any other prior approval required from company for transfer of equity shares, it will not be allowed to be listed on the Platform till the time respective approvals are obtained and those equity shares become freely transferable.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
