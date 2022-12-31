import React from 'react';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import Negotiation4Image from './negotiation3.svg';
import './Negotiation.css'


export default function Negotiation4() {

  return (
    <div className="profile3-sec w-100">
      <div className="Neg">
        <div className="text-center">
          <img className="Negotiation4Image" src={Negotiation4Image} />
        </div>
        <div className="d-flex align-items-center justify-content-center mobile-display">
          <img src={BotIcon} />
          <p className='m-0 text-small-profile ml-1 text-left w-50'> <b className='text-small-profile'>“Well Done !! Your Negotiation is completed” </b></p>
        </div>
      </div>
    </div>
  );
}
