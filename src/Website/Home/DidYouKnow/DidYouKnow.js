import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './DidYouKnow.css';
import { useHistory } from "react-router-dom";
import Buttons from "../../../Components/Buttons";
import { ReactComponent as ArrowBackward } from '../../BrokerTestimonial/Assets/ArrowBackward.svg';
import { ReactComponent as ArrowForward } from '../../BrokerTestimonial/Assets/ArrowForward.svg';
import { imgurl } from "../../../Utils/Network";

const DidYouKnow = () =>  {
  let history = useHistory();
  
    return (

      <>
        <div className="container mb-5">
          <div className='row overflow-hidden'>
            <div className='col-md-6 col-12 mb-2 d-flex justify-content-center align-items-center'>
              <div>
                <h6 className='text-center'>We Are Proudly Trusted Partners Of</h6>
                <div className="row didyouknow-Company-thumbnail marketplace-free-share">
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={imgurl("CompanyLogo01.6262670d.png")} alt="No Company Logo" className="mx-2" />
                  </div>
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={imgurl("CompanyLogo02.acfd373c.png")} alt="No Company Logo" className="mx-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-12 recognized-div mb-2 d-flex justify-content-center align-items-center '>
              <div>
                <h6 className='text-center'>We Are Recognized By</h6>
                <div className="row didyouknow-Company-thumbnail marketplace-free-share">
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={imgurl("CompanyLogo04.bec011ad.png")} alt="No Company Logo" className="mx-2" />
                  </div>
                  <div className='col-md-6 col-6 d-flex justify-content-center align-items-center'>
                    <img src={imgurl("CompanyLogo03.5cc59833.png")} alt="No Company Logo" className="mx-2" />
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

            <Carousel infiniteLoop useKeyboardArrows showIndicators={false}>

              <div className="DidYouKnow-main free-share-main">
                <div className="row d-flex justify-content-between align-items-center mt-1">
                  <div className="col-md-1 col-2 for-mobile-view-ArrowBackward did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowBackward className="Carousel-arrow1" />
                    </div>
                  </div>
                  <div className="col-md-6 col-8 d-flex align-items-center">
                    <div className="broker-details">
                      <h6>Join Our Platform To Claim A Free OYO Share</h6>
                      <p className="default-para mb-0 text-center">Create your profile in a few easy steps and become a verified user to Claim OYO Share ABSOLUTELY FREE! Limited Slots Only!</p>
                      <div className="w-100 d-flex justify-content-center mt-3">
                        <Buttons.PrimaryButton value="Claim Your Reward" onClick={() => history.push("/Sign-up")} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 col-2 d-flex justify-content-center did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowForward className="Carousel-arrow1" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="DidYouKnow-main">
                <div className="row d-flex justify-content-between align-items-center mt-1">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowBackward className="Carousel-arrow1" />
                    </div>
                  </div>
                  <div className="col-md-6 col-8 d-flex justify-content-center align-items-center">
                    <div className="broker-details mt-4">
                      <h6>Did you konw</h6>
                      <p className="default-para mb-0 text-center">When you invest in public limited unlisted companies,  your shares are credited to your demat account only. </p>
                    </div>
                  </div>
                  <div className="col-md-1 col-2 d-flex justify-content-center did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowForward className="Carousel-arrow1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="DidYouKnow-main">
                <div className="row d-flex justify-content-between align-items-center mt-1">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowBackward className="Carousel-arrow1" />
                    </div>
                  </div>
                  <div className="col-md-6 col-8 d-flex justify-content-center align-items-center">
                    <div className="broker-details mt-4">
                      <h6>Did you konw</h6>
                      <p className="default-para mb-0 text-center">Now you can invest in pre ipo shares with a click of a button.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-2 d-flex justify-content-center did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowForward className="Carousel-arrow1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="DidYouKnow-main">
                <div className="row d-flex justify-content-between align-items-center mt-1">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowBackward className="Carousel-arrow1" />
                    </div>
                  </div>
                  <div className="col-md-6 col-8 d-flex justify-content-center align-items-center">
                    <div className="broker-details mt-4">
                      <h6>Did you konw</h6>
                      <p className="default-para mb-0 text-center">You can invest in companies even before  they go for an IPO.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-2 d-flex justify-content-center did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowForward className="Carousel-arrow1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="DidYouKnow-main">
                <div className="row d-flex justify-content-between align-items-center mt-1">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward did-you-know-hidden">
                    <div className="Carousel-arrow">
                      <ArrowBackward className="Carousel-arrow1" />
                    </div>
                  </div>
                  <div className="col-md-6 col-8 d-flex justify-content-center align-items-center">
                    <div className="broker-details mt-4">
                      <h6>Did you konw</h6>
                      <p className="default-para mb-0 text-center">There are over  50k  public limited unlisted companies  in india.</p>
                    </div>
                  </div>
                  <div className="col-md-1 col-2 d-flex justify-content-center did-you-know-hidden">
                    <div className="Carousel-arrow d-none">
                      <ArrowForward className="Carousel-arrow1" />
                    </div>
                  </div>
                </div>
              </div>


            </Carousel>
          </div>
        </div>
      </>
    );
  
}

export default DidYouKnow