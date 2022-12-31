import React from 'react';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import Negotiation2Image from './negotiation1.svg';
import './Negotiation.css'


export default function Negotiation2() {

  return (
    <div className="profile3-sec w-100">
      <div className="Neg">
        <div className="text-center">
          <img className="Negotiation2Image" src={Negotiation2Image} />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-1 mobile-display">
          <img src={BotIcon} />
          <p className='m-0 text-small-profile ml-1 text-left w-50'> <b className='text-small-profile'>“You looked at the HDFC listing by Bernard, it is still<br /> available, do you wish to continue negotiating?”</b></p>
          <Buttons.SecondaryButton style={{margin: "auto", padding:"10px 7px"}} value="Negotiate Now" />
          <Buttons.SecondaryButton style={{margin: "auto" , padding:"10px 7px"}} value="View Similar listings" />
        </div>
      </div>
    </div>
  );
}
