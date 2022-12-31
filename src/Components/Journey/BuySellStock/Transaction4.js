import React from 'react';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import Negotiation4Image from './transaction4.svg';
import './Transaction.css'

export default function Transaction3() {

  return (
    <div className="profile3-sec w-100">
      <div className="Neg">
        <div className="text-center">
          <img className="Transaction3Image" src={Negotiation4Image} />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <div className="d-flex align-items-center justify-content-center mt-1 mobile-display">
            <img src={BotIcon} />
            <p className='m-0 text-small-profile ml-1 text-left w-50'> <b className='text-small-profile'>
            “Well Done !! Your Negotiation is completed” </b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
