import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as LogoSvg } from './icons/Logo.svg';
import { ReactComponent as MenuLogo } from './icons/MenuLogo.svg'; 
import { isLoggedIn } from "../../Utils/Network";
import FloatingWhatsApp from 'react-floating-whatsapp';
import whatsappIcon from './icons/whatsappIcon.png';
import { useLocation, Link } from "react-router-dom";
import './style.css';
import '../../App.css'


let nameUrlMapping = {
  'Explore Componies': '/all-companies',
  'Features': "/features",
  "Services": "/website-services",
  "Our Offering": "/our-offering",
  "About Us": "/about-us",
};

export const pages = [
  {
    name: 'Explore Companies',
    to: (isLoggedIn() ?'/companies':'/all-companies')
  },
  {
    name: 'Features',
    to: '/features' 
  },
  {
    name: 'Services',
    to: '/website-services'
  },
  {
    name: 'Our Offering',
    to: '/our-offering'
  },
  {
    name: 'Login/Sign Up',
    to: '/sign-up'
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [isLogedIn,setisLogedIn] = React.useState(isLoggedIn())
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  let location = useLocation();
  //console.log("location ", location.pathname);



  return (
    <div className='sticky-top '>
      <AppBar position="static" className=" default-bg-secondary AppBar-main sticky-top" >
      <Container maxWidth="xl " >
        {/* <div className='container'> */}
        <Toolbar disableGutters className="appbar-default-margin ">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to=""><LogoSvg className="" /></Link>
          </Typography>

          <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuLogo />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{  
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (

                <MenuItem key={page} onClick={handleCloseNavMenu} className='mobile-appbar-items'>
                  <Typography  className="navbar-items mobile-tab"><Link className="text-dark" to={page.to}>{page.name}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/"><LogoSvg className="company-logo-mobile-view" /></Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="website-menulist">
            {pages.map((item) => (
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">

                  <div className={
                    location.pathname === item.to
                      ? "nav-item selected"
                      : "nav-item"
                  }>
                    <Link to={item.to}>
                      <span>{item.name}</span>
                    </Link>
                  </div>
                </Typography>
              </MenuItem>
            ))}
          </Box>

          {!isLogedIn && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login To Platform" className='dbmn'>
              <IconButton sx={{ p: 0 }}>
                <Link to="/login"><button className="loginsign-btn">Login / Signup</button></Link>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',  
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
        {/* </div> */}  
        <FloatingWhatsApp 
        phoneNumber='+919990862220'
        accountName='Unlisted Assets'
        chatMessage='Hello there! 🤝  How can we help?'
        avatar={whatsappIcon}
        placeholder='Type a message..'
        notificationSound='true'
        allowClickAway= 'true'
         />
      </Container>
    </AppBar>
    </div>
  );
};
export default ResponsiveAppBar;
