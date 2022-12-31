import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserRoleMappingAdmin from '../UserRoleMappingAdmin/Index'
import RolePermissionMappingAdmin from '../RolePermissionMappingAdmin/Index'
import AuditerScreenTransactionTabs from '../../../Pages/AuditerScreen/Auditorscreentab';
import './Index.css';
import CompanyAdmin from '../CompanyAdmin/Index'
import InstaCompanyAdmin from '../InstaCompanyAdmin/Index'
import RolePermissionAdmin from '../RolePermissionAdmin/Index'
import UsersAdmin from '../UsersAdmin/Index';
import OnboardingAdmin from '../OnboardingAdmin/Index'
import DecisionGridAdmin from '../DecisionGridAdmin/Index'
import ProjectAdmin from '../ProjectAdmin/Index'
import TemplateAdmin from '../TemplateAdmin/Index'
import HoldingAdmin from "../HoldingAdmin/Index";
import ListingAdmin from "../ListingAdmin/Index";
import GeneralAdmin from "../GeneralAdmin/Index";
import UserManager from "../UsersManager/Index";
import CompanyManager from "../CompanyManager/Index"
import SectorManager from "../SectorManager/Index"
import FundingSeriesManager from "../FundingSeriesManager/Index"
import CompanyTypeManager from "../CompanyTypeManager/Index"
import RoleManager from "../RoleManager/Index"
import PermissionManager from "../PermissionManager/Index"
import TemplateManager from "../TemplateManager/Index"
import ModuleManager from "../ModuleManager/Index"
import VirtualAccountDetails from "../VirtualAccountDetails/Index"
import MoneyTransfer from "../MoneyTransfer/Index"
import FeatureManager from "../FeatureManager/Index"
import OnboardingManager from "../OnboardingManager/Index"
import HoldingManager from "../HoldingManager/Index"
import ListingManager from "../ListingManager/Index"
import DecisionGridManager from "../DecisionGridManager/Index"
import GlobalRecentNewsManager from "../GlobalRecentNewsManager/Index"
import GlobalHelpManager from "../GlobalHelpManager/Index"
import AuditorAdminManager from "../AuditorAdminManager/Index"
import NotificationUserCategoryManager from "../NotificationUserCategoryManager/Index"
import NotificationUserManager from "../NotificationUserManager/Index"
import NotificationSchedularManager from "../NotificationSchedularManager/Index"
import AddCompanyRequestManager from "../AddCompanyRequestManager/Index"
import LoanAgainstSharesServiceManager from "../LoanAgainstSharesServiceManager/Index"
import ValuationForSharesServiceManager from "../ValuationForSharesServiceManager/Index"
import BrokerSharesServiceManager from "../BrokerSharesServiceManager/Index"
import NegotiationCommentManager from "../NegotiationCommentManager/Index"
import { clearAccessToken, apiCall } from "../../../Utils/Network"
import { useHistory } from "react-router-dom";
import MisHolding from '../MisHolding/MisHolding';


import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCardIcon from '@mui/icons-material/AddCard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {

  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({


}));

export default function VerticalTabs() {

  let history = useHistory();

  const classes = useStyles();
  const [value, setValue] = React.useState(-1);
  const [myRoles, setmyRoles] = React.useState([]);

  React.useEffect(() => {

    securityDashboard()
  }, []);

  async function securityDashboard() {
    const response = await apiCall("profile/myroles", "GET");
    if(response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return
    }

    if(response.status == 200) {
      let responseJSON = await response.text();
      setmyRoles(responseJSON)

      iSSecurityDashboardAllowed(responseJSON)

    } else {

      clearAccessToken()
      history.push("/login");
    }

  }

  function iSSecurityDashboardAllowed(responseJSON) {

    let Super_Admin_Dashboard_present = responseJSON.includes("Super_Admin_Dashboard")

    if(Super_Admin_Dashboard_present == undefined
        || Super_Admin_Dashboard_present == false ) {
      clearAccessToken()
      history.push("/login");
    }
  }

  const handleChange = (newValue) => {

    // alert(newValue)
    setValue(newValue);
  };

  console.log("value", value)

  // for accordion 

  const [expanded, setExpanded] = React.useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',

  }));


  // accordion end here

  return (
    <div className={classes.root}>
      <div className="row mb-4">
        <div className="col-md-3 ">
          <div className="my-card my-card-default-admin user_role_tabs pl-0 pr-0">
            <div className="text-center pb-2 border-bottom">
              <h6 className="text-default"><b>User Dashboard</b></h6>
            </div>


            {/* Accordion demo start from here  */}
            <div className='mb-2'>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange1('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><SecurityIcon/> User Baikhata and Security</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='position-relative'>
                    {/* <div className={value == 0 ?'activelink-side-line':"d-none"}></div> */}
                    {myRoles.includes("User_Role_Mapping_Allowed") ?
                      <Tab label="User-Role Mapping Admin" value={0}
                        onClick={(e) => handleChange(0)} className={value == 0 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>
                    {myRoles.includes("Role_Permission_Mapping_Allowed") ?
                      <Tab label="Role-Permission Mapping Admin" value={1}
                        onClick={(e) => handleChange(1)} className={value == 1 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>{myRoles.includes("User_Manager_Allowed") ?
                    <Tab label="Users Manager" value={2}
                      onClick={(e) => handleChange(2)} className={value == 2 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}
                  </div>
                  <div>{myRoles.includes("Role_Manager_Allowed") ?
                    <Tab label="Role Manager" value={3}
                      onClick={(e) => handleChange(3)} className={value == 3 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : <Tab label="Role Manager" value={3}
                      onClick={(e) => handleChange(3)} className={value == 3 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                  }
                  </div>
                  <div>{myRoles.includes("Permission_Manager_Allowed") ?
                    <Tab label="Permission Manager" value={4}
                      onClick={(e) => handleChange(4)} className={value == 4 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel2'} onChange={handleChange1('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><AccountCircleIcon/> User Journey</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {myRoles.includes("Onboarding_Manager_Allowed") ?
                      <Tab label="Onboarding Manager" value={5}
                        onClick={(e) => handleChange(5)} className={value == 5 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>

                  <div>
                    {myRoles.includes("Holding_Manager_Allowed") ?
                      <Tab label="Holding Manager" value={6}
                        onClick={(e) => handleChange(6)} className={value == 6 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>
                    {myRoles.includes("Listing_Manager_Allowed") ?
                      <Tab label="Listing Manager" value={7}
                        onClick={(e) => handleChange(7)} className={value == 7 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel3'} onChange={handleChange1('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><SupportAgentIcon/> Company Care Taker</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {myRoles.includes("Company_Manager_Allowed") ?
                      <Tab label="Company Manager" value={8}
                        onClick={(e) => handleChange(8)} className={value == 8 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>

                  <div>
                    {myRoles.includes("Sector_Manager_Allowed") ?
                      <Tab label="Sector Manager" value={9}
                        onClick={(e) => handleChange(9)} className={value == 9 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>
                    {myRoles.includes("Funding_Manager_Allowed") ?
                      <Tab label="Funding Series Manager" value={10}
                        onClick={(e) => handleChange(10)} className={value == 10 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>
                    {myRoles.includes("Company_Type_Manager_Allowed") ?
                      <Tab label="Company Type Manager" value={11}
                        onClick={(e) => handleChange(11)} className={value == 11 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>
                  <div>
                    {myRoles.includes("Add_Company_Request_Manager_Allowed") ?
                      <Tab label="Add Company Request Manager" value={12}
                        onClick={(e) => handleChange(12)} className={value == 12 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                      : null}
                  </div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel4'} onChange={handleChange1('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><AdminPanelSettingsIcon/> Auditors - Internal, External</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{myRoles.includes("Auditors_External_Admin_Allowed") ?
                    <Tab label="Auditors External Admin" value={13}
                      onClick={(e) => handleChange(13)} className={value == 13 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>
                  {/*<Tab label="Auditors External Admin" {...a11yProps(13)} className={value == 12 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"}/>*/}

                  <div>{myRoles.includes("Auditors_Internal_Admin_Allowed") ?
                    <Tab label="Auditors Internal Admin" value={14}
                      onClick={(e) => handleChange(14)} className={value == 14 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Auditor_Admin_Allowed") ?
                    <Tab label="Auditor Admin Manager" value={15}
                      onClick={(e) => handleChange(15)} className={value == 15 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel5'} onChange={handleChange1('panel5')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content"
                  id="panel5bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><ManageAccountsIcon/> Global Configurations</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <div>{myRoles.includes("Module_Manager_Allowed") ?
                    <Tab label="Module Manager" value={16}
                      onClick={(e) => handleChange(16)} className={value == 16 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div> */}

                  <div>{myRoles.includes("Decision_Grid_Manager_Allowed") ?
                    <Tab label="Decision Grid Manager" value={17}
                      onClick={(e) => handleChange(17)} className={value == 17 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Template_Manager_Allowed") ?
                    <Tab label="Template Manager" value={18}
                      onClick={(e) => handleChange(18)} className={value == 18 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel6'} onChange={handleChange1('panel6')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content"
                  id="panel6bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><AddCardIcon/> Marketplace Maker</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{myRoles.includes("Global_News_Manager_Allowed") ?
                    <Tab label="Global News Manager" value={19}
                      onClick={(e) => handleChange(19)} className={value == 19 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Global_Help_Manager_Allowed") ?
                    <Tab label="Global Help Manager" value={20}
                      onClick={(e) => handleChange(20)} className={value == 20 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel7'} onChange={handleChange1('panel7')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7bh-content"
                  id="panel7bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><NotificationsIcon/> Notification Hero</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{myRoles.includes("Notification_User_Category_Manager_Allowed") ?
                    <Tab label="Notification User Category Manager" value={21}
                      onClick={(e) => handleChange(21)} className={value == 21 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Notification_User_Manager_Allowed") ?
                    <Tab label="Notification User Manager" value={22}
                      onClick={(e) => handleChange(22)} className={value == 22 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Notification_Schedular_Manager_Allowed") ?
                    <Tab label="Notification Schedular Manager" value={23}
                      onClick={(e) => handleChange(23)} className={value == 23 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Negotiation_Comment_Manager_Allowed") ?
                    <Tab label="Negotiation Comment Manager" value={24}
                      onClick={(e) => handleChange(24)} className={value == 24 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel8'} onChange={handleChange1('panel8')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel8bh-content"
                  id="panel8bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><SettingsIcon /> Services</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{myRoles.includes("Loan_Against_Shares_Manager_Allowed") ?
                    <Tab label="Loan Against Shares Manager" value={25}
                      onClick={(e) => handleChange(25)} className={value == 25 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Valuation_Shares_Manager_Allowed") ?
                    <Tab label="Valuation Shares Manager" value={26}
                      onClick={(e) => handleChange(26)} className={value == 26 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Find_Broker_Manager_Allowed") ?
                    <Tab label="Find Broker Manager" value={27}
                      onClick={(e) => handleChange(27)} className={value == 27 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel9'} onChange={handleChange1('panel9')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel9bh-content"
                  id="panel9bh-header"
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <div className="text-left pl-3 pt-2">
                      <h6 className="text-default"><b><AccountBalanceWalletOutlinedIcon className='mobile-sidebar-icon'/> Virtual Account</b></h6>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>{myRoles.includes("Money_Transfer_Allowed") ?
                    <Tab label="Money Transfer" value={28}
                      onClick={(e) => handleChange(28)} className={value == 28 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                  <div>{myRoles.includes("Money_Transfer_Allowed") ?
                    <Tab label="Mis Holding" value={29}
                      onClick={(e) => handleChange(29)} className={value == 29 ? "user-dashboard-Tablink-active" : "user-dashboard-Tablink"} />
                    : null}</div>

                </AccordionDetails>
              </Accordion>

              {/* Accordion demo end here  */}

            </div>
          </div>






        </div>
        <div className="col-md-9 pl-0">
          <div className="UserDashboard-TabsPanel">
            <TabPanel value={value} index={0}>
              <UserRoleMappingAdmin />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <RolePermissionMappingAdmin />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UserManager />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <RoleManager />
            </TabPanel>

            <TabPanel value={value} index={4}>
              <PermissionManager />
            </TabPanel>


            <TabPanel value={value} index={5}>
              <OnboardingManager />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <HoldingManager />
            </TabPanel>
            <TabPanel value={value} index={7}>
              <ListingManager />
            </TabPanel>

            <TabPanel value={value} index={8}>
              <CompanyManager />
            </TabPanel>
            <TabPanel value={value} index={9}>
              <SectorManager />
            </TabPanel>
            <TabPanel value={value} index={10}>
              <FundingSeriesManager />
            </TabPanel>

            <TabPanel value={value} index={11}>
              <CompanyTypeManager />
            </TabPanel>

            <TabPanel value={value} index={12}>
              <AddCompanyRequestManager />
            </TabPanel>


            <TabPanel value={value} index={13}>
              <AuditerScreenTransactionTabs checker={"external"} />
            </TabPanel>


            {/*<TabPanel value={value} index={13}>*/}
            {/*  <AuditerScreenTransactionTabs checker={"external"}/>*/}
            {/*</TabPanel>*/}

            <TabPanel value={value} index={14}>
              <AuditerScreenTransactionTabs checker={"internal"} />
            </TabPanel>

            <TabPanel value={value} index={15}>
              <AuditorAdminManager />
            </TabPanel>


            <TabPanel value={value} index={16}>
              <ModuleManager />
            </TabPanel>

            <TabPanel value={value} index={17}>
              <DecisionGridManager />
            </TabPanel>
            <TabPanel value={value} index={18}>
              <TemplateManager />
            </TabPanel>
            <TabPanel value={value} index={19}>
              <GlobalRecentNewsManager />
            </TabPanel>


            <TabPanel value={value} index={20}>
              <GlobalHelpManager />
            </TabPanel>

            <TabPanel value={value} index={21}>
              <NotificationUserCategoryManager />
            </TabPanel>
            <TabPanel value={value} index={22}>
              <NotificationUserManager />
            </TabPanel>
            <TabPanel value={value} index={23}>
              <NotificationSchedularManager />
            </TabPanel>

            <TabPanel value={value} index={24}>
              <NegotiationCommentManager />
            </TabPanel>

            <TabPanel value={value} index={25}>
              <LoanAgainstSharesServiceManager />
            </TabPanel>

            <TabPanel value={value} index={26}>
              <ValuationForSharesServiceManager />
            </TabPanel>

            <TabPanel value={value} index={27}>
              <BrokerSharesServiceManager />
            </TabPanel>

            <TabPanel value={value} index={28}>
              <MoneyTransfer />
            </TabPanel>

            <TabPanel value={value} index={29}>
              <MisHolding />
            </TabPanel>

            {/* <TabPanel value={value} index={29}>
              <VirtualAccountDetails/>
            </TabPanel> */}


            {/*<TabPanel value={value} index={3}>*/}
            {/*  <CompanyAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={4}>*/}
            {/*  <InstaCompanyAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={5}>*/}
            {/*  <RolePermissionAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={6}>*/}
            {/*  <UsersAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={7}>*/}
            {/*  <OnboardingAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={8}>*/}
            {/*  <DecisionGridAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={9}>*/}
            {/*  <ProjectAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={10}>*/}
            {/*  <TemplateAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={11}>*/}
            {/*  <HoldingAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={12}>*/}
            {/*  <ListingAdmin />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={13}>*/}
            {/*  <GeneralAdmin />*/}
            {/*</TabPanel>*/}

            {/*<TabPanel value={value} index={22}>*/}
            {/*  <FeatureManager />*/}
            {/*</TabPanel>*/}

          </div>
          {/*  </div>*/}
          {/*  <div className="col-md-12">*/}
          {/*    <div className="">*/}
          {/*      <TabPanel value={value} index={1}>*/}
          {/*        /!*<AuditorTransactionDetails />*!/*/}
          {/*      </TabPanel>*/}
          {/*    </div>*/}
        </div>
      </div>

    </div>
  );
}