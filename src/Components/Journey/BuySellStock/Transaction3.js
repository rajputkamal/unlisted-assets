import React from 'react';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import Negotiation3Image from './Transaction2.svg';
import './Transaction.css'

export default function Transaction3() {

  return (
    <div className="profile3-sec w-100">
      <div className="Neg">
        <div className="text-center">
          <img className="Transaction3Image" src={Negotiation3Image} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center mt-1 mobile-display">
            <img src={BotIcon} />
            <p className='m-0 text-small-profile ml-1 text-left w-50'> <b className='text-small-profile'>“Hi.<br />
              Your Agreement will be signed lets <br /> add money in wallet . 32h 10mins left <span className="text-primary-color"> 3h 5 mins left </span></b></p>
            <Buttons.SecondaryButton style={{margin: "auto", marginLeft:"10px"}} value="Add Money" />
          </div>
        </div>
      </div>
    </div>
  );
}
