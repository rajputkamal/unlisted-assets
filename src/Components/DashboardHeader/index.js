import logo from "./unlisted_assests_white_logo.png";
import { ReactComponent as LogoSvg } from './icons/Logo.svg';
import { ReactComponent as InfoSvg } from './icons/info.svg';
import { ReactComponent as NotificationSvg } from './icons/notifications.svg';
import { ReactComponent as ProfileSvg } from './icons/Profile.svg';
import { store } from "../../Utils/uaredux";

import profileIcon from "./profile_icon_white.png"; 
import notificationIcon from "./notification_bell.png";
import { useLocation, Link, useHistory } from "react-router-dom";
import "./dashboardHeader.css";
import ProfileWidget from "../ProfileWidget";
import React, { Component, useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { clearAccessToken, setChangePasswordRedirect } from "../../Utils/Network"
import Badge from '@material-ui/core/Badge';
import { apiCall } from '../../Utils/Network';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import HeaderUserIcon from './header-user.svg';
import MobileSidebar from './MobileMenu'
import { connectToChat } from "../../Utils/chat";
import { successToast, errorToast } from "../../Components/Toast/index";

const ITEM_HEIGHT = 100;
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 100,
    backgroundColor: "white"
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));


let DashboardHeader = () => {
  const [currentpage, setCurrentPage] = React.useState();
  let history = useHistory();
  const classes = useStyles();

  const longText =
    <div style={{ display: "flex", flexDirection: "column", width: "200px", height: "100px" }}>
      <h3 style={{ cursor: "pointer", color: "#000000", fontSize: "14px" }} onClick={() => { history.push("/profilewig") }}>Edit Profile</h3>
      <h3 style={{ cursor: "pointer", color: "#000000", fontSize: "14px" }}>FAQ</h3>
      <h3 style={{ cursor: "pointer", color: "#000000", fontSize: "14px" }}>Terms Of use</h3>

      <h3 style={{ cursor: "pointer", color: "#000000", fontSize: "14px" }} onClick={() => {
        clearAccessToken()
        history.replace("/login")
      }}>Logout</h3>
      
    </div>;

  let nameUrlMapping = {
    "Marketplace": "/inventory_1",
    // "Marketplace1": "/inventory",
    "All Companies": "/companies",
    "Sell Stocks": "/holdings",
    // Negotitations: "/negotitations",
    "Transactions": "/ongoingtransaction",
    //"My Transactions": "/transactions",
    // Negotitations: "/negotitations",

    Services: "/services",
    // Dashboard:"/users_dashboard",
  };

  let location = useLocation();
  //console.log("location ", location.pathname);

  let navItems = Object.keys(nameUrlMapping).map((item) => (

    <li
      className={
        location.pathname === nameUrlMapping[item]
          ? "nav-item selected"
          : "nav-item"
      }
    >
      <Link to={nameUrlMapping[item]}>
        <span>{item}</span>
      </Link>
    </li>

  ));

  const [notification, setnotification] = React.useState({});
  const [unread, setUnread] = React.useState(0)
  const [invisible, setInvisible] = React.useState(true)
  const [username, setusername] = React.useState("")
  const [userId, setuserId] = React.useState("")
  const [profilepic, setprofilepic] = React.useState("")
  const [dashboardlinkVisible, setdashboardlinkVisible] = React.useState(false)

  //const [seconds, setSeconds] = useState(0);

  //console.log("username",username)
  if (window.location.pathname === "/companies") {
    document.body.classList.add('bg-white');
  } else {
    document.body.classList.remove('bg-white');
  }

  const callbackredux = async () => {
    //console.log("yo yo honey singh" + store.getState().toString())
    try {

      getAllNotifications()
    } catch (error) {
      //console.log("error", error);
      console.error(error);
      // errorToast("Invalid", "Internet or Service is down, try after some time...");
    }
  }

  React.useEffect(() => {

    getAllNotifications()

    getProfile()

    securityDashboard()
  }, []);

  // async function redirectFirstLogin() {
  //   let response1 = await apiCall(
  //       `useronboarding/firsttimelogin`,
  //       "GET", '', ""
  //   );
  //   console.log("response1",response1);
  //
  //   if(response1.status == 200) {
  //     // console.log('pass1'+password)
  //     setChangePasswordRedirect('CHANGE_PASSWORD_REDIRECT');
  //     history.push("/resetpassword");
  //
  //   } else {
  //     // // console.log('pass2'+password)
  //     // clearChangePasswordRedirect(null)
  //     // history.push("/inventory_1");
  //   }
  //
  // }

  React.useEffect( () => {


    connectToChat()
    const unsubscribe = store.subscribe(callbackredux)
    return unsubscribe;
  }, [])

  async function securityDashboard() {
    const response = await apiCall("app/isSuperAdminDashboard", "GET");
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    if(response.status == 200) {
      let responseText = await response.text();
      if(responseText == "true") {
        setdashboardlinkVisible(true)
      } else {
        setdashboardlinkVisible(false)
      }

    }
  }

  // console.log("dashboardlinkVisible desk" ,dashboardlinkVisible)


  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    let responseJSON = await response.json();
    setusername(responseJSON.name)
    setuserId(responseJSON.accountId)
    setprofilepic(responseJSON.profilePicture)
  }

  const getAllNotifications = async function () {
    //console.log("jijijijijijijijijijiji2")
    let response = await apiCall("notificationua/notificationunreadcount", 'GET', '', history)
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }
    //console.log("jijijijijijijijijijiji12")
    //console.log(response)
    let responseJSON = await response.json();
    //console.log("nnnn" + responseJSON.notificationUnReadCount)
    await setnotification(responseJSON)


    if (location.pathname == "/notifications") {
      // alert("inside notification")
      setInvisible(true);
      //console.log("gogogo1221" + invisible)
    } else {

      //console.log(responseJSON.notificationUnReadCount + "ab")
      if (responseJSON.notificationUnReadCount == undefined || responseJSON.notificationUnReadCount == 0) {
        // alert("not inside notification1")
        setInvisible(true);
        //console.log("gogogo1" + invisible)
      } else {
        // alert("not inside notification2")
        setInvisible(false);
        setUnread(responseJSON.notificationUnReadCount);
      }
    }
   }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="mobile-sidebar">
        <MobileSidebar  username={username} profilepic={profilepic} dashboardlinkVisible={dashboardlinkVisible}/>
      </div>
      <nav className="sticky-top desktop-menubar" style={{ overflow: "hidden" }}>
        <div className="dashboard-header d-flex align-items-center  ">

          <div className="container-fluid">
            <div className="row">
              <div className="col-2 desktop-none">
                <div className="mobile-toggle nav-item-group">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    <li>{navItems}</li>
                  </Menu>

                </div>

              </div>
              <div className="d-flex align-items-center col-md-2 col-6">
                <div className="logo-section py-2">
                  <Link to="/inventory_1">
                    <LogoSvg width="150" height="40" />
                  </Link>
                </div>
              </div>
              <div className="col-md-8 col-12 d-flex align-items-center justify-content-center mobi-none">
                <div className="nav-item-group d-flex align-items-center w-100">
                  <ul className="top-menus-links">{navItems}</ul>
                </div>
              </div>
              <div className="dashboard-header left-side col-md-2 col-4 d-flex align-items-center justify-content-center">
                <a href="http://faq.unlistedassets.com" target="_blank">
                  <InfoSvg className="mx-2 cursor-pointer " />
                </a>

                <Badge badgeContent={unread} color="primary"
                  invisible={invisible}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >

                  <NotificationSvg className="cursor-pointer mx-2" onClick={() => {
                    history.push("/notifications");
                  }} />

                </Badge>
                <div className="custom-tooltip " id="hoverme">
                  <ul >
                    <li className="tooltip-default">
                      <div className="UserImg" style={{paddingBottom: '24px'}}>
                        {
                          profilepic == undefined ? <ProfileSvg className="cursor-pointer" onClick={() => {
                            history.push("/profilewig");
                          }} /> : <img src={profilepic} className="cursor-pointer img-fluid" onClick={() => {
                            history.push("/profilewig");
                          }} />
                        }

                        {/* <ProfileSvg className="cursor-pointer" onClick={() => {
                          history.push("/profilewig");
                        }}/> */}
                      </div>


                      <div class="tooltipMenu bottomSide py-2">
                        <div className="d-flex align-items-center UserLoginInfo px-4 py-3">
                          {/* <div className="UserLoginIcon mr-2">
                            <img src={profilepic} />
                          </div> */}
                          <div className="UserLoginDetails ">
                            <h6>{username}</h6>
                            <span>UA-ID : {userId}</span>
                            {/*<span>Ankush11</span>*/}
                          </div>                          
                        </div>

                        {/* <div className="d-flex align-items-center UserLoginInfo px-4 py-3">
                          <div className="UserLoginDetails ">
                            <h6>User Id: {userId}</h6>
                          </div>                          
                        </div> */}
                        
                        <div className="px-4 py-2 header-tooltip-links">
                          <ul >
                            <li><Link to="/profilewig">Edit Profile</Link></li>
                            {dashboardlinkVisible ? <li><Link to="/users_dashboard">Admin Dashboard</Link></li>: null}

                            <li><Link to="/resetpassword1">Reset Password</Link></li>
                            <li><Link to="/virtualAccount">Virtual Account</Link></li>
                            <li><Link to="/watchlist">Watchlist</Link></li>
                            <li><a href="http://faq.unlistedassets.com/support/home" target="_blank">FAQ</a></li>   
                            <li><Link to="/terms_of_use">Terms Of Use</Link></li>
                            <li><Link onClick={() => {
                              clearAccessToken()
                              window.location.href= "/login"
                            }}>Logout
                            </Link>
                            </li>
                          </ul>
                        </div>
                      </div></li>
                  </ul>
                </div>



                {/* <Tooltip  title={longText} classes={{ tooltip: classes.customWidth }} arrow interactive >
                <img
                  src={profileIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/profilewig");
                  }}
                />
                </Tooltip> */}

              </div>
            </div>
          </div>
        </div>

      </nav>
    </>
  );
};

export default DashboardHeader;