import React from 'react';
import Breadcrumb from "../../Components/Breadcrumbs";
import Buttons from "../../Components/Buttons"
import './DisclaimerForMarketing.css';


export default function TermsOfUse() {



    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>

            <section className="container mb-5">
                {/* <Breadcrumb /> */}
                <div className="my-card mt-4">
                    <div className="container DisclaimerForMarketing-main">
                        <div className="default-sapcing">
                            <div className="annexure-4-para">
                                <div className="">
                                    <h3 className='my-3'>Disclaimer For Marketing</h3>

                                    <h5>Disclaimer For Marketing :</h5>

                                    <p>We are offering Unlisted Shares of Company (OYO) as part of our promotional campaign and it has nothing to do with the market or fair value of those stocks. This offer of shares of Company (OYO) is limited to few subscribers of Platform with or without consideration for a limited period. </p>

                                    <p>We do not have any direct or indirect connection with the company to promote their Equity or to do marketing on their behalf. We are confining the offer to only Platform Users for rewarding them by becoming user on the Platform as one time reward. </p>

                                    <p>The user should not solicit any offer from the market, quoting our limited offer of these limited quantity of equity shares.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
