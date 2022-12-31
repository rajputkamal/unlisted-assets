import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './DidYouKnow.css';
import BrokerImg1 from './BrokerImg1.png';
import BrokerImg2 from './BrokerImg2.png';
import CompanyLogo01 from './CompanyLogo01.png';
import CompanyLogo02 from './CompanyLogo02.png';
import CompanyLogo04 from './CompanyLogo03.png';
import CompanyLogo03 from './CompanyLogo04.png';
import Buttons from "../../../Components/Buttons";

export default class DidYouKnow extends Component {
  render() {
    return (

      <>
        <div className="container mb-5">
          <div className='row overflow-hidden'>
            <div className='col-md-6 col-12 mb-2 d-flex justify-content-center align-items-center'>
              <div>
                <h6 className='text-center'>We Are Proudly Trusted Partners Of</h6>
                <div className="row didyouknow-Company-thumbnail marketplace-free-share">
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={CompanyLogo01} alt="No Company Logo" className="mx-2" />
                  </div>
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={CompanyLogo02} alt="No Company Logo" className="mx-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-12 mb-2 d-flex justify-content-center align-items-center'>
              <div>
                <h6 className='text-center'>We Are Recognized By</h6>
                <div className="row didyouknow-Company-thumbnail marketplace-free-share">
                <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={CompanyLogo03} alt="No Company Logo" className="mx-2" />
                  </div>
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={CompanyLogo04} alt="No Company Logo" className="mx-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="default-bg-color ">
          <div className="container DidYouKnow-container">
            {/* <div className="did-you-know-heading">
              <h3 className='DidYouKnow mb-0'>Did You <br />Know?</h3>
            </div> */}

            <Carousel infiniteLoop useKeyboardArrows>

              <div className="DidYouKnow-main">
                <div className="row d-flex align-items-center mt-4">
                  <div className="col-md-1 col-1">

                  </div>
                  <div className="col-md-2 col-10">

                  </div>
                  <div className="col-md-8 col-10 d-flex align-items-center">
                    <div className="broker-details">
                      <h6>Join Our Platform To Claim A Free OYO Share</h6>
                      <p className="default-para mb-0">Create your profile in a few easy steps and become a verified user to Claim OYO Share ABSOLUTELY FREE! Limited Slots Only!</p>
                      <Buttons.PrimaryButton value="Claim Your Reward" />
                    </div>
                  </div>
                  <div className="col-md-1 col-1">

                  </div>
                </div>
              </div>


              <div className="DidYouKnow-main">
                <div className="row d-flex align-items-center mt-4">
                  <div className="col-md-1 col-1">

                  </div>
                  <div className="col-md-2 col-10">

                  </div>
                  <div className="col-md-8 col-10 d-flex align-items-center">
                    <div className="broker-details">
                      <p className="default-para mb-0">When you invest in public limited unlisted companies,  your shares are credited to your demat account only. </p>
                    </div>
                  </div>
                  <div className="col-md-1 col-1">

                  </div>
                </div>
              </div>
              <div className="DidYouKnow-main">
                <div className="row mt-4">
                  <div className="col-md-1 col-1">

                  </div>
                  <div className="col-md-2 col-10">

                  </div>
                  <div className="col-md-8 col-10 d-flex align-items-center">
                    <div className="broker-details">
                      <p className="default-para mb-0">Now you can invest in pre ipo shares with a click of a button.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-1">

                  </div>
                </div>
              </div>
              <div className="DidYouKnow-main">
                <div className="row mt-4">
                  <div className="col-md-1 col-1">

                  </div>
                  <div className="col-md-2 col-10">

                  </div>
                  <div className="col-md-8 col-10 d-flex align-items-center">
                    <div className="broker-details">
                      <p className="default-para mb-0">You can invest in companies even before  they go for an IPO.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-1">

                  </div>
                </div>
              </div>
              <div className="DidYouKnow-main">
                <div className="row mt-4">
                  <div className="col-md-1 col-1">

                  </div>
                  <div className="col-md-2 col-10">

                  </div>
                  <div className="col-md-8 col-10 d-flex align-items-center">
                    <div className="broker-details">
                      <p className="default-para mb-0">There are over  50k  public limited unlisted companies  in india.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-1">

                  </div>
                </div>
              </div>

            </Carousel>
          </div>
        </div>
      </>
    );
  }
}