import React, { useState } from "react";
import ProfileWidget from "../../Components/ProfileWidget";
import FullWidthTabs from "../../Components/TradeReadyTab/tradereadytab2";
import AddVirtualAccount from "../VirtualAccount/virtualaccount";
import ResetPassword from "../../Pages/ResetPassword";
import Profile from "./index";
import breathumbs from "../../assets/breathumbs.svg";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profile.css";
import AddCompanyRequest from "../../Components/AddCompanyRequest";
import '../Companies/bootstrap4/css/bootstrap.scoped.css';
import Breadcrubs from '../../Components/Breadcrumbs'
import RiskProfileQuestions  from '../../Pages/RiskProfileQuestions/index'
let ProfileWidgetAndProfile = () => {
  var protab = 0;
  
 if(window.location.pathname=="/profilewig/1" || window.location.pathname=="/profilewig/2" || window.location.pathname=="/profilewig/3" || window.location.pathname=="/profilewig/4" || window.location.pathname=="/profilewig/5" || window.location.pathname=="/profilewig/6"){
  var protab = 1;
 }
 const [currentpage, setCurrentPage] = useState(protab);

  function GetPage() {
    switch (currentpage) {
     
      case 0:
        return <Profile/>;
      case 1:
        return <FullWidthTabs />;
      case 2:
        return <RiskProfileQuestions />;
      case 3:
        return <AddVirtualAccount />;
      // case 4:
      //   return <AddCompanyRequest />;
      case 4:
        return <ResetPassword />;
      default:
        return <ResetPassword />;
    }
  }
  return (
    <div className="container mt-3">
      <Breadcrubs />
      <div className="row">
        <div className="col-md-4">
          <div className="profile-left-sec m-0">
            <ProfileWidget
              currentpage={currentpage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="profile-right-sec mb-5">{GetPage()}</div>
        </div>
      </div>
      
    </div>
  );
};
export default ProfileWidgetAndProfile;
