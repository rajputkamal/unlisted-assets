import React from 'react';
import './EasySteps.css';
import Container from '@mui/material/Container';
import { ReactComponent as JoinLogo } from './JoinLogo.svg';
import { ReactComponent as LineLogo } from './LineLogo.svg';
import { ReactComponent as ListLogo } from './ListLogo.svg';
import { ReactComponent as NegotiatePricesLogo } from './NegotiatePricesLogo.svg';
import { ReactComponent as EscrowLogo } from './EscrowLogo.svg';
import { ReactComponent as TransactionLogo } from './TransactionLogo.svg';





function EasySteps() {
    return (
        <>
            <div>
                <div class="EasySteps-section">
                    <Container maxWidth="xl">
                        <div class="pt-5 pb-5">
                            <div class="row">
                                <div class=" col-md-12 col-12 mb-50 padding-for-mobileview">
                                    <h3 className='EasySteps-heading'
                                        >start investing in unlisted companies in few easy steps</h3>
                                    <div className='dbmn'>
                                        <div className='row EasySteps-card-container'>
                                            <div className='col-md-2 col-12 py-2 d-flex justify-content-center'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><JoinLogo /></div>
                                                    <h4 className='EasySteps-title'>Join our<br /> Platform</h4>
                                                    <p className='EasySteps-para'>Sign up and fill out the necessary details. Complete your KYC details and be Transact ready.</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='col-md-2 col-12 py-2 d-flex justify-content-center'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><ListLogo /></div>
                                                    <h4 className='EasySteps-title'>Explore trending shares on our marketplace</h4>
                                                    <p className='EasySteps-para'>Explore on shares on our marketplace</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='col-md-2 col-12 py-2 d-flex justify-content-center'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><NegotiatePricesLogo /></div>
                                                    <h4 className='EasySteps-title'>Negotiate <br />prices</h4>
                                                    <p className='EasySteps-para'>Negotiate over the best available stocks. Explore unlisted companies and buy them at most competitive prices.</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='col-md-2 col-12 py-2 d-flex justify-content-center'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><EscrowLogo /></div>
                                                    <h4 className='EasySteps-title'>Escrow<br /> Transfer</h4>
                                                    <p className='EasySteps-para'>Payments are secured in an escrow bank account</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='col-md-2 col-12 py-2 d-flex justify-content-center'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><TransactionLogo /></div>
                                                    <h4 className='EasySteps-title'>Transaction<br /> complete</h4>
                                                    <p className='EasySteps-para'>An independent trustee approves the transaction.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container px-0 dnmb'>
                                        <div className='d-flex EasySteps-card-main '>
                                            <div className='d-flex align-items-center mx-1'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><JoinLogo /></div>
                                                    <h4 className='EasySteps-title'>Join our Platform</h4>
                                                    <p className='EasySteps-para'>Sign up and fill out the necessary details. Complete your KYC details and be Trade ready.</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='d-flex align-items-center mx-1'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><ListLogo /></div>
                                                    <h4 className='EasySteps-title'>List your shares</h4>
                                                    <p className='EasySteps-para'>List/bid on shares on our marketplace</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='d-flex align-items-center mx-1'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><NegotiatePricesLogo /></div>
                                                    <h4 className='EasySteps-title'>Negotiate prices</h4>
                                                    <p className='EasySteps-para'>Negotiate over the best available listings. Explore unlisted companies and buy them at most competitive prices.</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='d-flex align-items-center mx-1'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><EscrowLogo /></div>
                                                    <h4 className='EasySteps-title'>Escrow Transfer</h4>
                                                    <p className='EasySteps-para'>Payments are secured in an escrow bank account</p>
                                                </div>
                                                <div className='EasySteps-arrowologo'><LineLogo /></div>
                                            </div>
                                            <div className='d-flex align-items-center mx-1'>
                                                <div className='EasySteps-card'>
                                                    <div className='EasySteps-logo'><TransactionLogo /></div>
                                                    <h4 className='EasySteps-title'>Transaction complete</h4>
                                                    <p className='EasySteps-para'>An independent trustee approves the transaction.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default EasySteps;