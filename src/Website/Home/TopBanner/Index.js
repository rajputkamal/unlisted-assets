import React from 'react';
import './style.css';
import Container from '@mui/material/Container';
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Downicon } from './down.svg';
import { isLoggedIn,imgurl } from "../../../Utils/Network";
import {Helmet} from "react-helmet";

function Index() {

// console.log("imgurl", imgurl("CardImg1.bc80dbe0.png"))

    let history = useHistory();

    if (isLoggedIn()) {
        history.push("/inventory_1"); 
    }
        return (
            <>
                <Helmet>
                    <title>Buy Sell Unlisted Shares | Unlisted Shares Trading | Shares List</title>
                    <meta name="description" content="Buy and Sell Unlisted Shares in India. Unlisted Shares List and Unlisted Shares Dealer/Broker. Sell ESOP Shares, Buy Pre-IPO shares stocks at best price."
                          data-react-helmet="true" />
                </Helmet>

                <div className="position-relative home-main-banner bg-white overflow-hidden">
                    <div className="top-banner-main default-bg-secondary overflow-hidden">
                        <Container maxWidth="xl">
                            <div className="website-default-container overflow-hidden">
                                <div className="row ">
                                    <div className="col-md-6 col-12 d-flex align-items-center justify-content-between">
                                        <div className="banner-left text-white">
                                            <h1>Buy or Sell Unlisted Shares
                                                / ESOP's</h1>
                                            <p>India's first platform
                                                providing you a transparent buyer-seller negotiation, a safe bank
                                                escrow-based transaction and an automated transaction flow of buying /
                                                selling Unlisted Shares and ESOP's.</p>
                                            <Link to="/login">
                                                <button className="mt-3 ">Join Our Platform</button>
                                            </Link>


                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 position-relative">

                                    </div>
                                </div>

                                {/* <div className="position-relative default-height"> */}
                                <div className='w-100 overflow-hidden dnmb'>
                                    <div className="cards-wrap-iner overflow-hidden">
                                        <img src={imgurl("CardImg1.bc80dbe0.png")} className="card1" />
                                        <img src={imgurl("CardImg2.6f14d0fa.png")} className="card2" />
                                        <img src={imgurl("CardImg3.fc6c41df.png")} className="card3" />
                                    </div>
                                </div>
                            </div>


                            <div className="cards-wrap overflow-hidden dbmn">
                                <div className="cards-wrap-iner position-relative overflow-hidden">
                                    <img src={imgurl("CardImg1.bc80dbe0.png")} className="card1"/>
                                    <img src={imgurl("CardImg2.6f14d0fa.png")} className="card2"/>
                                    <img src={imgurl("CardImg3.fc6c41df.png")} className="card3"/>
                                </div>
                            </div>
                            {/* </div> */}
                        </Container>

                    </div>
                </div>

            </>
        )
}



export default Index;