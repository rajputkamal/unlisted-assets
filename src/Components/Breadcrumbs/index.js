import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import breathumbs from "../../assets/breathumbs.svg";
import {Link} from "react-router-dom";
import "./Index.css";

export default function SimpleBreadcrumbs() {
  return (
    <div className="px-0 my-3 desktop-breadcrumb">
    <Breadcrumbs aria-label="breadcrumb">
      <div className="breathumbs-top">
            <ul>
              <li>
                <Link color="inherit" to="/inventory_1" >
                  <FontAwesomeIcon icon={faHome} className="text-default"/>
                </Link>
              </li>
              <li><img src={breathumbs} /></li>
              <li>
                {
                  window.location.pathname == "/inventory_1" ? <b>Unlisted Hub</b> : null
              }
              {
                  window.location.pathname == "/companies" ? <b>Companies</b> : null
              }
              {
                  window.location.pathname == "/holdings" ? <b>Sell</b> : null
              }
              {
                  window.location.pathname == "/ongoingtransaction" ? <b>Ongoing Transaction</b> : null
              }
              {
                  window.location.pathname == "/services" ? <b>Services</b> : null
              }
              {
                  window.location.pathname == "/profilewig" ? <b>Profile</b> : null
              }
              {
                  window.location.pathname == "/profilewig/1" ? <b>Profile</b> : null
              }
              {
                  window.location.pathname == "/profilewig/2" ? <b>Profile</b> : null
              }
              {
                  window.location.pathname == "/profilewig/4" ? <b>Profile</b> : null
              }
              {
                  window.location.pathname == "/profilewig/5" ? <b>Profile</b> : null
              }
              {
                  window.location.pathname == "/transactions" ? <b>Negotiation</b> : null
              }
              {
                  window.location.pathname == "/transactions_history" ? <b>Ongoing Transaction <img src={breathumbs} className="mx-2" /> Transactions History</b> : null
              }
              {
                  window.location.pathname == "/users_dashboard" ? <b>User Dashboard</b> : null
              }
              {
                  window.location.pathname == "/buyeragreement" ? <b>Agreement</b> : null
              }
              {
                  window.location.pathname == "/virtualAccount" ? <b>Virtual Account</b> : null
              }
              {
                  window.location.pathname == "/resetpassword1" ? <b>Reset Password</b> : null
              }
              {
                  window.location.pathname == "/notifications" ? <b>Notifications</b> : null
              }
              {
                  window.location.pathname == "/terms_of_use" ? <b>Term Of Use</b> : null
              }
              {
                  window.location.pathname == "/watchlist" ? <b>Watchlist</b> : null
              }
              {
                  window.location.pathname == "/payment-steps" ? <b>Payment</b> : null
              }
              {
                  window.location.pathname == "/refund_and_cancellation" ? <b>Refund And Cancellation</b> : null
              }
              {
                  window.location.pathname == "/addholdings" ? <><b><Link to="/holdings" className="text-default">Sell </Link>   <img src={breathumbs} className="mx-2" />  Add Holding</b> </>: null
              }
              
              </li>
            </ul>
      </div>
    </Breadcrumbs>
    </div>
  );
}