import React from 'react'
import OurTeamImg1 from './Assets/OurTeamImg1.png';
import OurTeamImg2 from './Assets/OurTeamImg2.png';
import OurTeamImg3 from './Assets/OurTeamImg3.png';
import OurTeamImg4 from './Assets/OurTeamImg4.png';
import OurTeamImg5 from './Assets/OurTeamImg5.png';
import './AboutUs.css';
import {Helmet} from "react-helmet";
import { imgurl } from "../../Utils/Network";


export default function AboutUs() {
    return (
        <>
            <div className="aboutus-main">
            <Helmet>
                <title>About Us</title>
                <meta name="description" content="about-us"
                      data-react-helmet="true" />
            </Helmet>
                {/* section 1 */}

                <div className="aboutus-main-section1 default-bg-secondary overflow-hidden">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-between">
                                <div className="aboutus-left text-white">
                                    <h1>About Us</h1>
                                    <p>We are a transactional platform enabling our investors to buy and sell unlisted shares in an automated, secure and transparent manner, redefining the unlisted shares ecosystem.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-between overflow-hidden">
                                <div className="aboutus-right text-center w-100 pt-5">
                                    <img src={imgurl("MainImg.e3951dea.png")} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* section 2 */} 
                <div className="aboutus-main-section2  overflow-hidden my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-between">
                                <div className="aboutus-left px-3">
                                    <p ><b> Unlisted Tech Private Limited </b> is offering a tech based platform which is empowering various stakeholders of unlisted companies including Startups, Delisted companies and Pre IPO companies to Buy/Sell shares in a transparent and safe escrow environment.</p>
                                    <p >We, through our automated platform, help retail and institutional investors  to transact in equity shares or ESOP of various unlisted companies through a time efficient and secured process and enabling price discovery as well. We offer an end to end automated process for transfer of shares or ESOP In safe and secured manner through an escrow mechanism provided through our Banking partner and by way of transaction approved by SEBI registered Trustee.</p>
                                    <p >We also help startups and pre-IPO companies raise primary capital from HNI investors, Family Offices and Institutional Funds, both domestic and international  through our associate entity.</p>
                                </div>
                            </div>
                            <div className="img-group col-md-6 col-12 d-flex align-items-center justify-content-between overflow-hidden">
                                <div className=''>
                                    <div className="aboutus-right img1-div">
                                        <img src={imgurl("Img1.ba58abba.png")} />
                                    </div>
                                    <div className="aboutus-right img2-div">
                                        <img src={imgurl("Img2.8a96fb26.png")} />
                                    </div>
                                    <div className="aboutus-right img3-div">
                                        <img src={imgurl("Img3.4f44b38c.png")} />
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {/* section 3 */}
                {/* <div className="aboutus-main-section3  overflow-hidden py-4 my-5">
                    <h5 className="text-center w-100 pb-5 ">Our Team</h5>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-12 ">
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg1} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Divam Sharma <span>(Founding Team)</span></h6>
                                        <p >Divam is a Member of The Institute of Chartered Accountants of India, MBA (PGDM Finance) from Indian
                                            School of Business Hyderabad, Masters in Business Finance (ICAI) and B Com (Honors) from Delhi University.
                                            He has worked for over 6 years as Financial Analyst with Banks including Kotak Mahindra Bank, Citibank,
                                            and IMGC. He has over 15 years of experience of investment management in stock markets.</p>
                                    </div>
                                </div>
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg2} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Manish Khanna  <span>(Founding Team)</span></h6>
                                        <p >Mr. Manish has more than 15 years of work experience in transaction advisory including valuation, transaction structuring and debt and equity fund raising. He is currently Partner at Shinewing India and has been working majorly in services sector in the domain of valuation and corporate finance. Prior to joining Shinewing, he has worked with Ernst & Young for around 3 years in their Transaction Advisory practice and with PwC in their Valuation advisory practice. He is a CA (India), CS (India) & LLB (India) qualified professional. Manish has been actively participating at various professional forums and Committees on emerging areas of valuation and M&A. Manish is the visiting faculty at ICAI, ICSI and PHD Chamber of Commerce for Valuation and Corporate Restructuring Courses.</p>
                                    </div>
                                </div>
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg3} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Shubham Sharma <span>(Founding Team)</span></h6>
                                        <p>Shubham is a UX designer and an  entrereneure. He started his career as a car designer for various german car manufacturers. He is a lead design for various startups like coltello.store, Greenportfolio, Unlisted Assets, and also for Chatbot autmation company LivePerson. He has completed his Masters in Automotive Desing from Turin, Italy and he is currently working as a lead designer in Frankfurt, Germany.   </p>
                                    </div>
                                </div>
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg4} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Sushil Jain  <span>(Advisor)</span></h6>
                                        <p >An experienced financial services professional with 20 years of experience across Risk, CreditPolicy, Operations, IT, Process Excellence and Audit with global leading financial services organisations & BPO. Exposure across retail financial products - Mortgages, Business Loans, Personal Loans, Sales Finance and Mortgage Guarantee business</p>
                                    </div>
                                </div>
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg4} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Ankush  <span>(Co-Founder)</span></h6>
                                        <p>A seasoned technology professional with 16 years of experience in architecting and managing development and delivery of enterprise level e-commerce applications, Revenue Management Systems and Supply Chain Management systems for fortune 500 customers</p>
                                    </div>
                                </div>
                                <div className="ourteam-section row d-flex align-items-satart justify-content-between">
                                    <div className="ourteam-img1 col-md-2 col-12">
                                        <img src={OurTeamImg5} />
                                    </div>
                                    <div className='px-5 py-4 col-md-10 col-12'>
                                        <h6>Rishabh Sharma <span>(Legal Advisor)</span></h6>
                                        <p>Rishabh is a law graduate from Campus Law Centre, Faculty of Law, Delhi University and has about 7 years of experience in corporate law and intellectual property rights. He has also worked as an in-house counsel for a Tier-1 IT Company, where he got the opportunity to enhance his expertise in the arena of IT contracts, mergers, and acquisitions. He is currently assisting Indian conglomerates & entrepreneurs, including start-ups, across varied industries in managing their legal matters. He brings with him a modernised and effective approach of handling disputes and to save clients from unnecessary litigations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

        </>
    )
}
