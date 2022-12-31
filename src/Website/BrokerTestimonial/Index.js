import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './style.css';
import { ReactComponent as ArrowBackward } from './Assets/ArrowBackward.svg';
import { ReactComponent as ArrowForward } from './Assets/ArrowForward.svg';
import { imgurl } from "../../Utils/Network";

export default class Testimonials extends Component {
  render() {
    return (

      <div className="default-bg-color">
        <div className="container Testimonials-container">
          <h3 className='Testimonials-heading'
            >Trusted By Investors And Brokers Worldwide</h3>
          <Carousel autoPlay infiniteLoop useKeyboardArrows >
            <div className="Testimonials-main">
              <div className="row ">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward">
                  <div className="Carousel-arrow">
                    <ArrowBackward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-3 col-8 for-mobile-view ">
                  <div className="broker-image">
                    <span><img src={imgurl("human1.jpeg")} alt="img" /></span>
                  </div>
                </div>
                <div className="col-md-1 col-2 for-mobile-view-arrow">
                  <div className="Carousel-arrow">
                    <ArrowForward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
                  <div className="broker-details">
                    <h3 className="broker-heading">Mr. Love Kumar</h3>
                    <p className="default-para">Unlisted shares provided me with support to sell my converted ESOPS to potential buyers. I am very happy with their prompt, transparent and efficient process backed by product knowledge and follow up mechanism ensured my transaction is completed safely and on time.</p>
                  </div>
                </div>
                <div className="col-md-1 col-1 for-mobile-view-ArrowForward">
                  <div className="Carousel-arrow-ArrowForward ">
                    <ArrowForward className="Carousel-arrow1 dbmn" />
                  </div>
                </div>
              </div>
            </div>
            <div className="Testimonials-main">
              <div className="row ">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward">
                  <div className="Carousel-arrow">
                    <ArrowBackward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-3 col-8 for-mobile-view ">
                  <div className="broker-image">
                    <span><img src={imgurl("human2.jpeg")} alt="img" /></span> 
                  </div>
                </div>
                <div className="col-md-1 col-2 for-mobile-view-arrow">
                  <div className="Carousel-arrow">
                    <ArrowForward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
                  <div className="broker-details">
                    <h3 className="broker-heading">CA Amandeep Singh Oberoi </h3>
                    <p className="default-para">Unlisted shares trading provided me with the investment opportunities to participate in the high growth tech companies in India. I have been dealing with the team for over 3years now and am highly satisfied with the experience.</p>
                  </div>
                </div>
                <div className="col-md-1 col-1 for-mobile-view-ArrowForward">
                  <div className="Carousel-arrow-ArrowForward ">
                    <ArrowForward className="Carousel-arrow1 dbmn" />
                  </div>
                </div>
              </div>
            </div>
            <div className="Testimonials-main">
              <div className="row ">
                <div className="col-md-1 col-2 for-mobile-view-ArrowBackward">
                  <div className="Carousel-arrow">
                    <ArrowBackward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-3 col-8 for-mobile-view ">
                  <div className="broker-image">
                    <span><img src={imgurl("human3.jpeg")} alt="img" /></span>
                  </div>
                </div>
                <div className="col-md-1 col-2 for-mobile-view-arrow">
                  <div className="Carousel-arrow">
                    <ArrowForward className="Carousel-arrow1" />
                  </div>
                </div>
                <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
                  <div className="broker-details">
                    <h3 className="broker-heading">Ms Kanika Nagpal</h3>
                    <p className="default-para">I was able to invest in the shares of Paytm, NSE and Nazara through Unlisted Assets. They provide me with frequent opportunities to create wealth through pre-IPO share investment ideas. Highly recommend their professional unlisted shares list and transparent services.</p>
                  </div>
                </div>
                <div className="col-md-1 col-1 for-mobile-view-ArrowForward">
                  <div className="Carousel-arrow-ArrowForward ">
                    <ArrowForward className="Carousel-arrow1 dbmn" />
                  </div>
                </div>
              </div>
            </div>




          </Carousel>
        </div>
      </div>
    );
  }
}