import React, { useState } from 'react';
import Buttons from '../../../Components/Buttons';
import GrowthLogo from './Assets/GrowthLogo.svg';
import StableInvestmentLogo from './Assets/StableInvestmentLogo.svg';
import ReturnLogo from './Assets/ReturnLogo.svg';
import InvestorsLogo from './Assets/InvestorsLogo.svg';
import SharesIncreasesLogo from './Assets/SharesIncreasesLogo.svg';
import InvestmentLogo from './Assets/InvestmentLogo.svg';
import './WhyInvest.css'




export default function WhyInvest() { 

    return (
        <div className="default-bg-color mb-5">
            <div className="container">
                <div className="WhyInvest-main ">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <h3 className='default-heading mb-4'
                                >Why Invest In Unlisted Shares?</h3>
                            <p className='my-2 default-para' 
                                >Several unlisted companies including start-up companies have unique and high growth business models. Investment in unlisted shares offers huge potential of returns wherein substantial value unlocking usually happens when they go for IPOs
                            </p>

                            <div className='row mt-4  d-flex justify-content-center align-items-center overflow-hidden'>
                                <div className='col-md-4' >
                                    <div className=''>
                                        <div className='WhyInvest-card my-4'>
                                            <div className=''>
                                                <img src={GrowthLogo} alt="phone-pic" />
                                                <h4>Very high growth potential</h4>
                                                <p className='my-2 default-para'>Unlisted companies usually can be disruptive business models  with very high growth potential.</p>
                                            </div>
                                        </div>
                                        <div className='WhyInvest-card my-4'>
                                            <div className=' '>
                                                <img src={StableInvestmentLogo} alt="phone-pic" />
                                                <h4>Stable investment opportunity</h4>
                                                <p className='my-2 default-para'>Many late stage startups, pre ipo companies offers stable wealth creation opportunities to investors.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' >
                                    <div className=''>
                                        <div className='WhyInvest-card my-4 '>
                                            <div className=''>
                                                <img src={ReturnLogo} alt="phone-pic" />
                                                <h4>Opportunity to invest in Newage and Innovative business </h4>
                                                <p className='my-2 default-para'>Most of the innovative and disruptive companies in India  are unlisted. </p>
                                            </div>
                                        </div>
                                        <div className='WhyInvest-card my-4'>
                                            <div className=' '>
                                                <img src={InvestorsLogo} alt="phone-pic" />
                                                <h4>Suitable for informed investors</h4>
                                                <p className='my-2 default-para'>Investors who takes informed decisions can create wealth overtime investing into unlisted stocks.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' >
                                    <div className=''>
                                        <div className='WhyInvest-card my-4 '>
                                            <div className=''>
                                                <img src={SharesIncreasesLogo} alt="phone-pic" />
                                                <h4>Value of shares increases </h4>
                                                <p className='my-2 default-para'>Value of unlisted shares increase as these  companies  grow and raise capital at higher valuations  overtime.</p>
                                            </div>
                                        </div>
                                        <div className='WhyInvest-card my-4'>
                                            <div className=' '>
                                                <img src={InvestmentLogo} alt="phone-pic" />
                                                <h4>Diversification of investment portfolio</h4>
                                                <p className='my-2 default-para'>This asset class offers a good diversification  opportunity to investors  for wealth creation.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}