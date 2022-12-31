import React, { useState, useEffect } from "react";
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
import KYCDetails from "../../Pages/TradeReadySteps/tradereadystep7";
let ProfileWidgetAndProfile = () => {


    const [currentpage, setcurrentpage] = useState(0);
    const [tryagain, settryagain] = useState("");

 if(window.location.pathname=="/profilewig/1" || window.location.pathname=="/profilewig/2" || window.location.pathname=="/profilewig/3" || window.location.pathname=="/profilewig/4" || window.location.pathname=="/profilewig/5" || window.location.pathname=="/profilewig/6"){


  //console.log("aaaiiioopp"+window.location.pathname)


 }

    useEffect(() => {
        // alert(window.location.pathname)
        if(window.location.pathname=="/profilewig/4") {
            settryagain("pan")
        } else if(window.location.pathname=="/profilewig/5") {
            settryagain("aadhar")
        }else if(window.location.pathname=="/profilewig/1") {
            settryagain("bankdetail")
        }
    }, [])


 const increment = () => {
     setcurrentpage(currentpage + 1)

 }

 const tryagaincallback = (value) => {
     //console.log("thrrrrrr"+value)
     settryagain(value)
     setcurrentpage(0)
 }

//  console.log("currentpage" , currentpage)


  function GetPage() {
    switch (currentpage) {
     
      case 0:
        return <Profile currentpage={currentpage} Submitnextpage={increment}/>;
      case 1:
        return <FullWidthTabs Submitnextpage={increment} tryagain={tryagain}/>;
      case 2:
        return <RiskProfileQuestions Submitnextpage={increment}/>;
      // case 3:
      //   return <AddVirtualAccount />;
      // // case 4:
      // //   return <AddCompanyRequest />;
      // case 4:
      //   return <ResetPassword />;
      default:
        // return <><Profile currentpage={currentpage} Submitnextpage={increment}/>
        // {/* <KYCDetails /> */}
        // </> ;
          return <KYCDetails tryagaincallback={tryagaincallback}/>
    }
  }
  return (
    <div className="container">
      <div className="Breadcrubs-default-margin">
        <Breadcrubs />
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="profile-left-sec m-0">
            <ProfileWidget
                currentpage={currentpage}
            />
          </div>
        </div>
        <div className="col-md-8 ">
          <div className="profile-right-sec mb-5 default-w-75 final-page-bg">
            {GetPage()}
            </div>
        </div>
      </div>
      
    </div>
  );
};
export default ProfileWidgetAndProfile;
