import React, {useState} from "react";
import "./profilewidget.css";
import { ReactComponent as UserIcon } from './user.svg';
import { ReactComponent as TradeReadtIcon } from './tradereadystep.svg';
import { ReactComponent as RiskIcon } from './riskprofile.svg';
import { ReactComponent as WalletIcon } from './wallet.svg';
import { ReactComponent as ChangePassIcon } from './changepwd.svg';

const options = [
  {
    id: 1,
    img: <UserIcon/>,
    label: "Personal Details",
  },
  {
    id: 2,
    img: <TradeReadtIcon />,
    label: "Trade Ready Step",
  },
  {
    id: 3,
    img: <RiskIcon/>,
    label: "Risk Profile",
  },
  {
    id: 4,
    img: <WalletIcon/>,
    label: "Virtual Account",
  },
  {
    id: 5,
    img: <ChangePassIcon/>,
    label: "Change Password",
  },
];

let ProfileWidget = (props) => {

  const [profiletabid , setProfiletabid] = useState();

  const addclass = (ev, ProfileTabId) =>{
    setProfiletabid(ProfileTabId);
  }

  return (
    <div className="profile_widget_container">
      <div className="profile_widget_head">
        <p className="m-0 text-center p-2">Profile</p>
      </div>
      <div className="profile_widget_list">
        {options.map((option, idx , key) => {

          return (
            <div
            onClick={(e) => {props.setCurrentPage(idx); addclass(e, option.id)}}
            className={ profiletabid == option.id || (window.location.pathname == "/profilewig" && option.id==1 && !profiletabid) || (window.location.pathname == "/profilewig/1" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/2" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/3" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/4" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/5" && option.id==2 && !profiletabid) || (window.location.pathname == "/profilewig/6" && option.id==2 && !profiletabid)   ? "profile_widget_row d-flex align-items-center mt-2 mb-2 active" : "profile_widget_row d-flex align-items-center mt-2 mb-2 " }
          >
            {/* <div
              onClick={(e) => {props.setCurrentPage(idx); addclass(e, option.id)}}
              className={ profiletabid == option.id || (option.id==2) ? "profile_widget_row d-flex align-items-center mt-2 mb-2 active" : "profile_widget_row d-flex align-items-center mt-2 mb-2 " }
            > */}
              <div>
                {option.img}
              </div>
              <p
                style={{
                  textAlign: "left",
                }}
                className={"profile_widget_row_label m-0 ml-2 "}
              >
                {option.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileWidget;