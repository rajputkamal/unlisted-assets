import React from 'react'
import Buttons from "../../Buttons"
import BotIcon from './bot.svg';
import './Negotiation.css';
 const Negotiation = () => {
  return (
    <div className="profile-first-sec w-100">
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-75 text-center">
          <img src={BotIcon} />
          <p className="text-small"><b>“Hi. I am Unlisted Bot, <br />
            Lets started Negotiation” </b> </p>
            <Buttons.SecondaryButton style={{margin: "auto"}} value="Lets Negotiate" />
            <div className="d-flex justify-content-center">
              <a className="text-small m-2 text-dark useful-link">Useful link 1</a>
              <a className="text-small m-2 text-dark useful-link">Useful link 2</a>
              <a className="text-small m-2 text-dark useful-link">Useful link 3</a>
            </div>
        </div> 
      </div>
    </div>
  )
}
export default Negotiation;