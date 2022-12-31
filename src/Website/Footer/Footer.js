import React from 'react';
import './Footer.css';
// import  from './Twitter.svg';
// import { ReactComponent as Downicon } from './down.svg';
import { ReactComponent as TwitterLogo } from './TwitterLogo.svg';
import { ReactComponent as FacebookLogo } from './FacebookLogo.svg';
import { ReactComponent as InstaLogo } from './InstaLogo.svg';
import { ReactComponent as YoutubeLogo } from './YoutubeLogo.svg';
import { ReactComponent as LogoSvg } from './Logo.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Buttons from '../../Components/Buttons';
import Container from '@mui/material/Container'; 
import { Link } from 'react-router-dom';




function Footer() {
    return (
        <>
            <div>
                <footer class="footer-section">
                    <Container maxWidth="xl">
                        <div class="footer-content pt-5 pb-5">
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-3 mb-50">
                                    <div class="footer-widget">
                                        <div>
                                            <div class="footer-logo">
                                                <a href="index.html"><LogoSvg /></a>
                                            </div>
                                            <div class="footer-text">
                                                <p>© 2020 - 2020, Unlisted Assets. <br />All rights reserved.</p>
                                            </div>
                                            <div class="footer-social-icon">
                                                {/* <a href="#"><TwitterLogo /></a> */}
                                                <a href="https://www.linkedin.com/company/47663186/admin/"><div className='icon'><LinkedInIcon /></div></a>
                                                <a href="https://www.Facebook.com/unlistedassets"><FacebookLogo /></a>
                                                <a href="https://instagram.com/unlistedassets?utm_medium=copy_link"><InstaLogo /></a>
                                                <a href="https://www.youtube.com/channel/UCtlIl_nmrY1GDRvKZhdO6mw"><YoutubeLogo /></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-6 mb-30">
                                    <div class="footer-widget">
                                        <div>
                                            <div class="footer-widget-heading">
                                                <h3>Quick Links</h3>
                                            </div>
                                            <div className='row '>
                                                <div className="col-md-6 col-12 footer-widget">
                                                    <ul>
                                                        <li><Link to="/">Home</Link></li>
                                                        <li><Link to="/">Platform</Link></li>
                                                        <li><Link to="/all-companies">Companies</Link></li>
                                                        <li><a href="http://blog.unlistedassets.com" target="_blank">Blog</a></li>
                                                        <li><Link to="/website-services">Services</Link></li>
                                                        <li><Link to="/website-services">Contact us</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6 col-12 footer-widget">
                                                    <ul>
                                                        <li><Link to="/about-us">About Us</Link></li>
                                                        <li><Link to="/career">Careers</Link></li>
                                                        <li><Link to="/all-companies">Types of Unlisted Companies</Link></li>
                                                        {/* <li><Link to="#">Solutions</Link></li> */}
                                                        {/* <li><Link to="#">Why Us</Link></li> */}
                                                        <li><a href="http://faq.unlistedassets.com/support/home" target="_blank">FAQ</a></li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2 col-6 mb-30">
                                    <div class="footer-widget">
                                        <div>
                                            <div class="footer-widget-heading">
                                                <h3>Legal</h3>
                                            </div>
                                            <ul>
                                                {/* <li><Link to="#">Disclaimer</Link></li> */}
                                                <li><Link to="/website-terms_of_use">Terms of Use</Link></li>
                                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                                <li><Link to="/refund_and_cancellation">Refund and Cancellation</Link></li>
                                                <li><Link to="/content-policy">Content Policy</Link></li> 
                                                <li><Link to="/marketing-disclaimer">Disclaimer For Marketing</Link></li> 
                                                {/* <li><Link to="/undertaking">Undertaking</Link></li> */}
                                                {/* <li><Link to="/deal-note">Deal Note</Link></li>  */}
                                                {/* <li><Link to="/caution-note">Caution Note</Link></li>  */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-12 footer-widget mb-50">
                                    <div>
                                        <div class="footer-widget-heading">
                                            <h3>Subscribe to our newsletter</h3>
                                        </div>
                                        <div class="subscribe-form">
                                            <form action="#">
                                                <input type="text" placeholder="Email" />
                                                <Buttons.SecondaryButton value="Subscribe" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>

                </footer>
            </div>
        </>
    )
}

export default Footer;