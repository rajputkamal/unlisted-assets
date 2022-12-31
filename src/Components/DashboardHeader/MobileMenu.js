import React from 'react';
import clsx from 'clsx';
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from './menu.svg';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";
import { clearAccessToken } from "../../Utils/Network"
import breathumbs from "../../assets/breathumbs.svg";
import UserIcon from "./girl.svg";
import HomeIcon from './MenusIcons/Home.svg';
import ComponiesIcon from './MenusIcons/Componies.svg';
import GraphIcon from './MenusIcons/Graph.svg';
import ActivityIcon from './MenusIcons/Activity.svg';
import DocumentIcon from './MenusIcons/Document.svg';
import SwapIcon from './MenusIcons/Swap.svg';
import SettingIcon from './MenusIcons/Setting.svg';
import NewsIcon from './MenusIcons/News.svg';
import LogoutIcon from './MenusIcons/Logout.svg';
import HelpIcon from './MenusIcons/Help.svg';

import { ReactComponent as MenuIcon1 } from './MenusIcons/Home.svg';
import { ReactComponent as MenuIcon2 } from './MenusIcons/Componies.svg';
import { ReactComponent as MenuIcon3 } from './MenusIcons/Graph.svg';
import { ReactComponent as MenuIcon4 } from './MenusIcons/Activity.svg';
import { ReactComponent as MenuIcon5 } from './MenusIcons/Document.svg';
import { ReactComponent as MenuIcon6 } from './MenusIcons/Swap.svg';
import { ReactComponent as MenuIcon7 } from './MenusIcons/Setting.svg';
import { ReactComponent as MenuIcon8 } from './MenusIcons/News.svg';
import { ReactComponent as ProfileSvg } from './icons/Profile.svg';

import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LockResetIcon from '@mui/icons-material/LockReset';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) { 
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const [username, setusername] = React.useState(props.username)
  const [profilepic, setprofilepic] = React.useState(props.profilepic)

  const [dashboardlinkVisible, setdashboardlinkVisible] = React.useState(props.dashboardlinkVisible);
  // This will launch only if props.dashboardlinkVisible value has chaged.
  React.useEffect(() => { setdashboardlinkVisible(props.dashboardlinkVisible) }, [props.dashboardlinkVisible]);

  // console.log("dashboardlinkVisible mobile" ,dashboardlinkVisible)               
  // console.log("username mobile" ,username)
  // console.log("profilepic mobile" ,profilepic)


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="sidebar-menus pb-2">
        <ul>
          <li className={window.location.pathname == "/inventory_1" ? "active" : null}>
            <Link to="/inventory_1">
              <MenuIcon1 />
              Dashboard
            </Link>
          </li>
          {/* <li className={window.location.pathname == "/inventory_1" ? "active" : null}>
                <Link to="/inventory_1">
                    <MenuIcon4 />
                    Market Place
                </Link>
            </li> */}
          <li className={window.location.pathname == "/companies" ? "active" : null}>
            <Link to="/companies">
              <MenuIcon2 />
              Explore Companies
            </Link>
          </li>
          <li className={window.location.pathname == "/holdings" ? "active" : null}>
            <Link to="/holdings">
              <MenuIcon3 />
              My Holdigs
            </Link>
          </li>

          {/* <li className={window.location.pathname == "/ongoingtransaction" ? "active" : null}>
            <Link to="/ongoingtransaction">
              <MenuIcon5 />
              Ongoing Transactions
            </Link>
          </li> */}
          <li className={window.location.pathname == "/transactions" ? "active" : null}>
            <Link to="/ongoingtransaction">
              <MenuIcon6 />
              Transaction History
            </Link> 
          </li> 
          <li><Link to="/terms_of_use"><MenuIcon8 /> Terms Of Use</Link></li>       
          <li><Link to="/virtualAccount"><AccountBalanceWalletOutlinedIcon className='mobile-sidebar-icon'/> Virtual Account</Link></li>
          <li><Link to="/watchlist"><BookmarkAddOutlinedIcon /> Watchlist 00</Link></li>

          {dashboardlinkVisible ? <li><Link to="/users_dashboard"> <SupervisorAccountIcon /> Admin Dashboard</Link></li>: null}


          {/* <li><a href="http://faq.unlistedassets.com/support/home" target="_blank"><MenuIcon8 /> FAQ</a></li> */}          
          <li><Link to="/resetpassword1"><LockResetIcon />  Reset Password</Link></li>
          <li className={window.location.pathname == "/services" ? "active" : null}>
            <Link to="/services">
              <MenuIcon7 />
              Services
            </Link>
          </li>
                            
        </ul>
      </div>
      <div className="Sidebar-Logout pt-4 px-1 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center w-100" onClick={() => {
          clearAccessToken()
          window.location.href= "/login"
        }}>
          <img src={LogoutIcon} alt="Logout" className="mr-3" />
          <span className="text-small"><b>Signout</b></span>
        </div>
        <div className="d-flex align-items-center  w-100">
          <a href="http://faq.unlistedassets.com/support/home" target="_blank" className="text-small text-white"><img src={HelpIcon} alt="Logout" className="mr-3" /><b>Help</b></a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mobile-menu">
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}
      <div className="w-100">
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className="cursor-pointer d-flex justify-content-start"><img src={MenuIcon} /></Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              <div className="UserDetails-Sidebar">

                <div className="UserIcon-sidebar">
                  {/* <img src={profilepic} alt="UserPofileImage" /> */}

                  {
                    props.profilepic == null ? <ProfileSvg className="cursor-pointer" onClick={() => {
                      history.push("/profilewig");
                    }} /> : <img src={props.profilepic} className="cursor-pointer img-fluid" onClick={() => {
                      history.push("/profilewig");
                    }} />
                  }
                </div>
                <div className="UserDetails mt-3">
                  <h6><b> {props.username} </b></h6>
                  <p className="m-0 text-small">
                    <Link onClick={toggleDrawer(anchor, false)} to="/profilewig" className="text-white" style={{ fontWeight: "200" }}>Edit Profile</Link>
                  </p>
                </div>
              </div>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div className="w-100 text-center sidebar-brethcrumbs">
        <h6>
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
            window.location.pathname == "/ongoingtransaction" ? <b>Ongoing Transactions</b> : null
          }
          {
            window.location.pathname == "/services" ? <b>Services</b> : null
          }
          {
            window.location.pathname == "/profilewig" ? <b>Profile</b> : null
          }
          {
            window.location.pathname == "/transactions" ? <b>Negotiation</b> : null
          }
          {
            window.location.pathname == "/users_dashboard" ? <b>User Dashboard</b> : null
          }
          {
            window.location.pathname == "/buyeragreement" ? <b>Buyer Agreement</b> : null
          }
          {
            window.location.pathname == "/notifications" ? <b>Notifications</b> : null
          }
          {
            window.location.pathname == "/resetpassword1" ? <b>Reset Password</b> : null
          }
          {
            window.location.pathname == "/virtualAccount" ? <b>Virtual Account</b> : null
          }
          {
            window.location.pathname == "/watchlist" ? <b>Watchlist</b> : null
          }
          {
            window.location.pathname == "/terms_of_use" ? <b>Terms</b> : null
          }         


          {
            window.location.pathname == "/addholdings" ? <><b><Link to="/holdings" className="text-default">Sell </Link>   <img src={breathumbs} className="mx-2" />  Add Holding</b> </> : null
          }
        </h6>
      </div>
      <div className="w-100 text-right">
        <Link to="/notifications">
          <NotificationsIcon className="notification-icon" />
        </Link>
      </div>
    </div>
  );
}
