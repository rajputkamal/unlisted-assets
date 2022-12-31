import React from 'react';
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import Profile4Image from './profile4.svg';
import './Profile.css'


export default function Profile4() {

  return (
    <div className="profile3-sec w-100">
      <div className="Neg">
        <div className="text-center">
          <img width="200" src={Profile4Image} />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-3 mobile-display">
          <img src={BotIcon} />
          <p className='m-0 text-small-profile ml-1 text-left w-50'> <b className='text-small-profile'>“Hi. <br />
              Your recently unfinished stock negotiation is still available.”</b></p>
          <Buttons.SecondaryButton style={{margin: "auto", padding:"10px 7px"}} value="Negotiate Now" />
          <Buttons.SecondaryButton style={{margin: "auto" , padding:"10px 7px"}} value="View Similar listings" />
        </div>
      </div>
    </div>
  );
}
