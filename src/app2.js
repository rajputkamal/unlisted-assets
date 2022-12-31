import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css';
import Login from "./Pages/Login/index";
import Security from "./Pages/Security/index";
import SignUp from "./Pages/Signup/index";
import MobileVerification from "./Pages/MobileVerification/index";
import TwoFactorAuth from "./Pages/TwoFactorAuth/index";
import ForgotUserId from "./Pages/Security/ForgotUserId/index";
import ForgotPassword from "./Pages/Security/ForgotPassword/index";
import RiskProfileQuestions from "./Pages/RiskProfileQuestions/index";
import "./App.css";
//import ForgotUserId from "./Pages/ForgetUserId";

import ResetPassword2 from "./Pages/ResetPassword/index";

import Dashboard from "./Pages/Dashboard";
import Negotiations from "./Pages/Negotiations";

import DashboardHeader from "./Components/DashboardHeader";
//import StickyHeadTable from "./Components/DashboardHeader/dashboardtable"
//import TableHeader from "./Components/DashboardHeader/tableheader"
import TableContent from "./Components/DashboardHeader/tablecontent";
import Holdings from "./Pages/Holdings/index";
import SignAgreement from "./Pages/SignAgreement/index";
import EditHoldings from "./Pages/EditHoldings";
import { Breadcrumbs, Stepper } from "@material-ui/core";
import StepperArea from "./Components/Stepper/index";
import Profile from "./Pages/Profile/index";

import ChooseRole from "./Pages/TradeReadySteps/tradereadystep1";
import AddBankAccount from "./Pages/TradeReadySteps/tradereadystep2";
import FullWidthTabs from "./Components/TradeReadyTab/tradereadytab";
import ProfileWidgetAndProfile from "./Pages/Profile/index_profile_widget";
import PaymetWidget from "./Pages/Payment/PaymetWidget";
import ProfilePicModal from "./Components/ProfilePicModal";
import Sell from "./Pages/MyHoldings/Index";
import AddHoldings from "./Pages/Holdings/addHolding";


import { PrivateRoute } from "./Routes";
import CreateInventory from "./Pages/Inventory/addInventory";
import InventoryTableContent from "./Pages/Inventory_old/inventorytablecontent";
import InventoryTableContent_1 from "./Pages/Inventory_old_1/Inventory";
import EditInventory from "./Pages/Inventory/EDITinventory/index";
import { ToastContainer } from "../src/Components/Toast/index";
import Companies from "../src/Pages/Companies"
import CompanyDetails from "../src/Pages/Companies/company-trade/CompDetails"
import ResetPasswordNotLogIn from "./Pages/ResetPassword/resetpasswordnotlogin"
import Trade from "../src/Pages/Trade/index"
import OngoingTransactionTableContent from "./Pages/OnGoingTransaction/Index"
import TransactionEmpty from "../src/Pages/Trade/Transactionempty";
import BuyerAgreement from "./Pages/BuyerAgreement";
import EsignAndOtp from "./Pages/BuyerAgreement/esignandotp";
import ManualSign from "./Pages/BuyerAgreement/manualsign";
import VerifyDocument from "./Pages/BuyerAgreement/verifydocument";

import AddCompanyRequest from "./Components/AddCompanyRequest";
import NegotiationBuy from "./Pages/Negotiations/negotiationsbuy"
import Example from "./Components/ToogleButton/toogleswitch";
import FloatingActionButtons from "./Components/FabButton/fabbutton";
import ToogleButton from "./Components/ToogleButton/toogleswitch";
import ResetPassword from "./Pages/ResetPassword/resetpasswordnotlogin";
import PhoneField from "./Components/PhoneWithCountry";
import ProfileWidget from "./Components/ProfileWidget";

import AlertDialog from "./Components/DialogBox/dialogbox";
import Loader from "./Components/Loader/loader";


import LoanAgainstShares from "./Pages/Services/loanagainstshares";
import ValuationForTheShares from "./Pages/Services/valuationfortheshares";
import FindABroker from "./Pages/Services/findabroker";
import DataSanctity from "./Pages/AuditerScreen/datasanctity";
import AuditorTransactionsForApproval from "./Pages/AuditerScreen";
import Error503 from "./Components/ErrorComponents/Error503";
import {Helmet} from "react-helmet";
import ComingSoon from "./Components/ComingSoon/ComingSoon";

import Services from "./Pages/Services";
import AuditerScreenTransactionTabs from "./Pages/AuditerScreen/Auditorscreentab";
import AuditorTransactionDetails from "./Pages/AuditerScreen/transactiondetail";

import KYCVerification from "./Pages/AuditerScreen/kycverification";
import Notifications from "./Pages/Notification/notifications";
import VirtualAccount from "./Pages/VirtualAccount/virtualaccount";
import BuyerVirtualAccount from "./Pages/BuyerAgreement/buyervirtualaccount";
import BuyerSendToVA from "./Pages/BuyerAgreement/buyersendmoneytovirtual";
import SellerDematAccount from "./Pages/SellerAgreement/sellervirtualaccount";
import AadharLinked from "./Pages/TradeReadySteps/tradereadystep6";
import TrusteeRejection from "./Pages/TrusteeRejection/TrusteeRejection";
import UsersDashboard from "./Pages/Users/Index";
import TransactionHitoryTableContent from "./Pages/TransactionHitory/TransactionHitoryTableContent";
import TermsOfUse from "./Pages/TermOfUse";
import Watchlist from "./Pages/Companies/watchlist";
import Error401 from "./Components/ErrorComponents/Error401";
import Error403 from "./Components/ErrorComponents/Error403";
import Error404 from "./Components/ErrorComponents/Error404";
import Somethingwentwrong from "./Components/ErrorComponents/SomethingWentWrong";

import Error500 from "./Components/ErrorComponents/Error500";
import SessionTimeOut1 from "./Utils/sessionTimeOut1";

// {/* newwebsite import start  */}

import WebsiteAppBar from "./Website/Appbar/Index";
import Home from "./Website/Home/Index";
import RefundAndCancellation from "./Website/Home/RefundAndCancellation/RefundAndCancellation";

import Careers from "./Website/Careers/Index";
import AboutUs from "./Website/About-Us/AboutUs";
import Footer from "./Website/Footer/Footer";
import Features from "./Website/Features/Features";
import { isLoggedIn } from "./Utils/Network";

import OurOffers from "./Website/OurOffering/OurOffers";
import CautionNote from "./Website/Pages/CautionNote";
import Undertakings from "./Website/Pages/Undertakings";
import ContentPolicy from "./Website/Pages/ContentPolicy";
import PrivacyPolicy from "./Website/Pages/PrivacyPolicy";
import DisclaimerForMarketing from "./Pages/DisclaimerForMarketing/DisclaimerForMarketing";
import DealNote from "./Website/Pages/DealNote";
import CreatePassword from "./Pages/Signup/Component/CreatePassword";


AOS.init();

export default function App() {
    const [isLogedIn,setisLogedIn] = React.useState(isLoggedIn())

    return (
        <Router>

            <ToastContainer
                closeButton={true}
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="router-main">
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    {/* <Route path="/dashboardtable">
            <StickyHeadTable/>
          </Route>  */}
                    <PrivateRoute path="/error401">
                        <DashboardHeader />
                        <Error401/>
                    </PrivateRoute>
                    <PrivateRoute path="/error403">
                        <DashboardHeader />
                        <Error403/>
                    </PrivateRoute>
                    <PrivateRoute path="/error404">
                        <DashboardHeader />
                        <Error404/>
                    </PrivateRoute>
                    <PrivateRoute path="/Somethingwentwrong">
                        <DashboardHeader />
                        <Somethingwentwrong/>
                    </PrivateRoute>
                    <Route path="/error500">
                        {/*<DashboardHeader />           */}
                        <Error500/>
                    </Route>

                    <PrivateRoute path="/dashboard">
                        <DashboardHeader />
                        <Dashboard />
                        {/* <AddCompanyRequest/> */}
                    </PrivateRoute>
                    <Route path="/selectholding">
                        <DashboardHeader />
                        <Dashboard />
                    </Route>
                    <Route path="/inventory_1">
                        <DashboardHeader />
                        <InventoryTableContent_1 />
                    </Route>
                    <Route path="/auditortdashboard">
                        <DashboardHeader />
                        <AuditerScreenTransactionTabs />
                    </Route>
                    <Route path="/auditortransactiondetails">
                        <DashboardHeader />
                        <AuditorTransactionDetails />
                    </Route>
                    <Route path="/datasanctity">
                        <DashboardHeader />
                        {/* <DataSanctity/> */}
                        <KYCVerification />
                    </Route>
                    <Route path="/notifications">
                        <DashboardHeader />
                        <Notifications />
                    </Route>


                    <PrivateRoute path="/companies">
                        <DashboardHeader />
                        <Companies />
                    </PrivateRoute>:
                    <Route path="/all-companies">
                        <WebsiteAppBar/>
                        <Companies/>
                        <Footer/>
                    </Route>

                    <PrivateRoute path="/watchlist">
                        <DashboardHeader />
                        <Watchlist/>
                    </PrivateRoute>
                    <Route path="/trade">
                        <DashboardHeader />
                        <Trade />
                    </Route>
                    <Route path="/ongoingtransaction">
                        <DashboardHeader />
                        <OngoingTransactionTableContent />
                    </Route>
                    <Route path="/emptytrade">
                        <TransactionEmpty />
                    </Route>
                    <Route path="/buyervirtualaccount">
                        <BuyerVirtualAccount />
                    </Route>
                    <Route path="/buyersendtovirtual">
                        <BuyerSendToVA />
                    </Route>
                    <Route path="/sellervirtualaccount">
                        <DashboardHeader />
                        <SellerDematAccount />
                    </Route>
                    <Route path="/trusteerejection">
                        <TrusteeRejection />
                    </Route>
                    <Route path="/buyeragreement">
                        <DashboardHeader />
                        <BuyerAgreement />
                    </Route>
                    <Route path="/esignandotp">
                        <DashboardHeader />
                        <EsignAndOtp />
                    </Route>
                    <Route path="/manualsign">
                        <DashboardHeader />
                        <ManualSign />
                    </Route>
                    <Route path="/verifydocument">
                        <DashboardHeader />
                        <VerifyDocument />
                    </Route>
                    <PrivateRoute path="/inventory">
                        <DashboardHeader />
                        <InventoryTableContent />
                    </PrivateRoute>
                    <PrivateRoute path="/website">
                        <DashboardHeader />
                        <InventoryTableContent_1 />
                    </PrivateRoute>
                    <PrivateRoute path="/create_inventory">
                        <DashboardHeader />
                        <CreateInventory />
                    </PrivateRoute>
                    <PrivateRoute path="/edit_inventory">
                        <DashboardHeader />
                        <EditInventory />
                    </PrivateRoute>
                    <PrivateRoute path="/negotiations">
                        <DashboardHeader />
                        <Negotiations />
                    </PrivateRoute>

                    <PrivateRoute path="/transactions">
                        <DashboardHeader />
                        <Negotiations />
                        {/* <Dashboard /> */}
                        {/* <NegotiationBuy/> */}
                    </PrivateRoute>
                    <PrivateRoute path="/transactions_history">
                        <DashboardHeader />
                        <TransactionHitoryTableContent/>
                    </PrivateRoute>

                    <PrivateRoute path="/holdings">
                        <DashboardHeader />
                        <Sell />
                    </PrivateRoute>
                    <PrivateRoute path="/empty_holdings">
                        <DashboardHeader />
                        <Holdings />
                    </PrivateRoute>

                    <PrivateRoute path="/addholdings">
                        <DashboardHeader />
                        <AddHoldings />
                    </PrivateRoute>

                    <PrivateRoute path="/signagreement">
                        <DashboardHeader />
                        <SignAgreement />
                    </PrivateRoute>
                    <PrivateRoute path="/editholdings">
                        <DashboardHeader />
                        <EditHoldings />
                    </PrivateRoute>

                    <PrivateRoute path="/services">
                        <DashboardHeader />
                        {/* <LoanAgainstShares/> */}
                        {/* <ValuationForTheShares/> */}
                        {/* <FindABroker/> */}
                        <Services />
                    </PrivateRoute>
                    <PrivateRoute path="/tradeready">
                        <DashboardHeader />
                        <StepperArea />
                    </PrivateRoute>
                    <Route path="/aadharlinked">
                        <AadharLinked />
                    </Route>
                    <Route path="/resetpasswordnotlogin">
                        {/* <DashboardHeader /> */}
                        <ResetPasswordNotLogIn />
                    </Route>
                    <PrivateRoute path="/profilewig">
                        <DashboardHeader />
                        {/* <ProfileWidget/> */}
                        <ProfileWidgetAndProfile />
                        {/* <Profile/> */}
                        {/* <PhoneField/> */}
                    </PrivateRoute>

                    <PrivateRoute path="/payment-steps">
                        <DashboardHeader />
                        <PaymetWidget/>
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <DashboardHeader />
                        {/* <ProfileWidget/> */}
                        <Profile />
                    </PrivateRoute>

                    <PrivateRoute path="/profilepicmodal">
                        <ProfilePicModal />
                    </PrivateRoute>

                    <PrivateRoute path="/tradereadytabs">
                        <FullWidthTabs />
                    </PrivateRoute>

                    <PrivateRoute path="/chooserole">
                        <ChooseRole />
                    </PrivateRoute>

                    <PrivateRoute path="/addbank">
                        <AddBankAccount />
                    </PrivateRoute>

                    <PrivateRoute path="/table">
                        <TableContent />
                    </PrivateRoute>

                    <PrivateRoute path="/users_dashboard">
                        <DashboardHeader />
                        <UsersDashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/terms_of_use">
                        <DashboardHeader />
                        <TermsOfUse/>
                    </PrivateRoute>
                    <PrivateRoute path="/resetpassword1">
                        <DashboardHeader />
                        <ResetPassword2 />
                    </PrivateRoute>
                    <PrivateRoute path="/virtualAccount">
                        <DashboardHeader />
                        <VirtualAccount />
                    </PrivateRoute>
                    {/* <PrivateRoute path="/refund_and_cancellation">
            <DashboardHeader />
            <RefundAndCancellation/>
          </PrivateRoute> */}


                    {/* newwebsite routing start  */}

                    <Route path="/home">
                        <WebsiteAppBar/>
                        <Home/>
                    </Route>
                    <Route path="/refund_and_cancellation">
                        <WebsiteAppBar/>
                        <RefundAndCancellation/>
                        <Footer/>

                    </Route>
                    <Route path="/career">
                        <WebsiteAppBar/>
                        <Careers/>
                        <Footer/>
                    </Route>

                    <Route path="/about-us">
                        <WebsiteAppBar/>
                        <AboutUs/>
                        <Footer/>
                    </Route>
                    <Route path="/features">
                        <WebsiteAppBar/>
                        <Features/>
                        <Footer/>
                    </Route>
                    <Route path="/our-offering">
                        <WebsiteAppBar/>
                        <OurOffers/>
                        <Footer/>
                    </Route>
                    <Route path="/website-services">
                        <WebsiteAppBar/>
                        <Services/>
                        <Footer/>
                    </Route>

                    <Route path="/deal-note">
                        <WebsiteAppBar/>
                        <DealNote/>
                        <Footer/>
                    </Route>


                    <Route path="/website-services">
                        <WebsiteAppBar/>
                        <Services/>
                        <Footer/>
                    </Route>
                    <Route path="/website-terms_of_use">
                        <WebsiteAppBar/>
                        <TermsOfUse/>
                        <Footer/>
                    </Route>
                    <Route path="/undertaking">
                        <WebsiteAppBar/>
                        <Undertakings/>
                        <Footer/>
                    </Route>
                    <Route path="/content-policy">
                        <WebsiteAppBar/>
                        <ContentPolicy/>
                        <Footer/>
                    </Route>
                    <Route path="/caution-note">
                        <WebsiteAppBar/>
                        <CautionNote/>
                        <Footer/>
                    </Route>
                    <Route path="/privacy-policy">
                        <WebsiteAppBar/>
                        <PrivacyPolicy/>
                        <Footer/>
                    </Route>
                    <Route path="/marketing-disclaimer">
                        <WebsiteAppBar/>
                        <DisclaimerForMarketing/>
                        <Footer/>
                    </Route>



                    {/* <Route path="/website-company/:cslug">
            <WebsiteAppBar/>
            <CompanyDetails/>
            <Footer/>
          </Route> */}


                    <Route path="/company/:cslug" component={CompanyDetails} />
                    {/*<Route path="/website-company/:cslug" component={CompanyDetails} />*/}


                    {/* public routes below */}
                    <Route path="/resetpassword">
                        {/* <ResetPassword /> */}
                        <DashboardHeader />
                        <ResetPassword2 />
                    </Route>

                    <Route path="/security_questions">
                        <Security />
                    </Route>
                    <Route path="/forgotpassword">
                        <ForgotPassword />
                    </Route>
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                    <Route path="/create-password">
                        <CreatePassword/>
                    </Route>
                    <Route path="/mobile-verification">
                        <MobileVerification />
                    </Route>
                    <Route path="/login">
                        <Login />
                        {/* <Login /> */}
                    </Route>
                    <Route path="/login-temp">
                        <Login />
                    </Route>
                    <Route path="/two-factor-auth">
                        <TwoFactorAuth />
                    </Route>
                    <Route path="/forgotuserid">
                        <ForgotUserId />
                    </Route>
                    <Route path="/risk-profile-questions">
                        <RiskProfileQuestions />
                    </Route>

                    <Route path="/">
                        {/* <DashboardHeader/>
            <Negotiations /> */}
                        {/* <Login /> */}
                        <WebsiteAppBar/>

                        <Home/>

                    </Route>
                    {/* <Route path="/profilewidget">
          <ProfileWidget/>
          </Route> */}

                </Switch>
            </div>
            <SessionTimeOut1 />
        </Router>
    );
}
