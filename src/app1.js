




import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css';
import "./App.css";
import { isLoggedIn } from "./Utils/Network";
import { ToastContainer } from "../src/Components/Toast/index";
import { PrivateRoute } from "./Routes";

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

import AuditorTransactionsForApproval from "./Pages/AuditerScreen";
import Error503 from "./Components/ErrorComponents/Error503";
import {Helmet} from "react-helmet";
import ComingSoon from "./Components/ComingSoon/ComingSoon";

const RefundAndCancellation = React.lazy(() => import("./Website/Home/RefundAndCancellation/RefundAndCancellation"));
const Careers = React.lazy(() => import("./Website/Careers/Index"));

const AboutUs = React.lazy(() => import("./Website/About-Us/AboutUs"));
const PrivacyPolicy = React.lazy(() => import("./Website/Pages/PrivacyPolicy"));
const DealNote = React.lazy(() => import("./Website/Pages/DealNote"));

const ContentPolicy = React.lazy(() => import("./Website/Pages/ContentPolicy"));
const Undertakings = React.lazy(() => import("./Website/Pages/Undertakings"));
const CautionNote = React.lazy(() => import("./Website/Pages/CautionNote"));

const OurOffers = React.lazy(() => import("./Website/OurOffering/OurOffers"));


const Features = React.lazy(() => import("./Website/Features/Features"));
const Footer = React.lazy(() => import("./Website/Footer/Footer"));

const WebsiteAppBar = React.lazy(() => import("./Website/Appbar/Index"));
const Home = React.lazy(() => import("./Website/Home/Index"));


const Error500 = React.lazy(() => import("./Components/ErrorComponents/Error500"));
// const Error503 = React.lazy(() => import("./Components/ErrorComponents/Error503"));
const Somethingwentwrong = React.lazy(() => import("./Components/ErrorComponents/SomethingWentWrong"));
const Error404 = React.lazy(() => import("./Components/ErrorComponents/Error404"));
const Error403 = React.lazy(() => import("./Components/ErrorComponents/Error403"));


const Error401 = React.lazy(() => import("./Components/ErrorComponents/Error401"));

const Watchlist = React.lazy(() => import("./Pages/Companies/watchlist"));


const TermsOfUse = React.lazy(() => import("./Pages/TermOfUse"));
const TransactionHitoryTableContent = React.lazy(() => import("./Pages/TransactionHitory/TransactionHitoryTableContent"));
const UsersDashboard = React.lazy(() => import("./Pages/Users/Index"));
const TrusteeRejection = React.lazy(() => import("./Pages/TrusteeRejection/TrusteeRejection"));
const AadharLinked = React.lazy(() => import("./Pages/TradeReadySteps/tradereadystep6"));
const SellerDematAccount = React.lazy(() => import("./Pages/SellerAgreement/sellervirtualaccount"));
const BuyerSendToVA = React.lazy(() => import("./Pages/BuyerAgreement/buyersendmoneytovirtual"));
const BuyerVirtualAccount = React.lazy(() => import("./Pages/BuyerAgreement/buyervirtualaccount"));
const VirtualAccount = React.lazy(() => import("./Pages/VirtualAccount/virtualaccount"));
const Notifications = React.lazy(() => import("./Pages/Notification/notifications"));
const KYCVerification = React.lazy(() => import("./Pages/AuditerScreen/kycverification"));
const DataSanctity = React.lazy(() => import("./Pages/AuditerScreen/datasanctity"));
const AuditorTransactionDetails = React.lazy(() => import("./Pages/AuditerScreen/transactiondetail"));
const AuditerScreenTransactionTabs = React.lazy(() => import("./Pages/AuditerScreen/Auditorscreentab"));
const Services = React.lazy(() => import("./Pages/Services"));
const VerifyDocument = React.lazy(() => import("./Pages/BuyerAgreement/verifydocument"));
const ManualSign = React.lazy(() => import("./Pages/BuyerAgreement/manualsign"));

const EsignAndOtp = React.lazy(() => import("./Pages/BuyerAgreement/esignandotp"));

const BuyerAgreement = React.lazy(() => import("./Pages/BuyerAgreement"));
const TransactionEmpty = React.lazy(() => import("../src/Pages/Trade/Transactionempty"));

const OngoingTransactionTableContent = React.lazy(() => import("./Pages/OnGoingTransaction/Index"));


const Trade = React.lazy(() => import("../src/Pages/Trade/index"));

const ResetPasswordNotLogIn = React.lazy(() => import("./Pages/ResetPassword/resetpasswordnotlogin"));


const CompanyDetails = React.lazy(() => import("../src/Pages/Companies/company-trade/CompDetails"));
const Companies = React.lazy(() => import("../src/Pages/Companies"));
const EditInventory = React.lazy(() => import("./Pages/Inventory/EDITinventory/index"));
const InventoryTableContent_1 = React.lazy(() => import("./Pages/Inventory_old_1/Inventory"));


const InventoryTableContent = React.lazy(() => import("./Pages/Inventory_old/inventorytablecontent"));

const CreateInventory = React.lazy(() => import("./Pages/Inventory/addInventory"));


const AddHoldings = React.lazy(() => import("./Pages/Holdings/addHolding"));

const Sell = React.lazy(() => import("./Pages/MyHoldings/Index"));
const ProfilePicModal = React.lazy(() => import("./Pages/Payment/PaymetWidget"));
const ProfileWidgetAndProfile = React.lazy(() => import("./Pages/Profile/index_profile_widget"));
const FullWidthTabs = React.lazy(() => import("./Components/TradeReadyTab/tradereadytab"));
const CreatePassword = React.lazy(() => import("./Pages/Signup/Component/CreatePassword"));

const DisclaimerForMarketing = React.lazy(() => import("./Pages/DisclaimerForMarketing/DisclaimerForMarketing"));
const AddBankAccount = React.lazy(() => import("./Pages/TradeReadySteps/tradereadystep2"));
const ChooseRole = React.lazy(() => import("./Pages/TradeReadySteps/tradereadystep1"));


// {/* newwebsite import start  */}
const Profile = React.lazy(() => import("./Pages/Profile/index"));
const StepperArea = React.lazy(() => import("./Components/Stepper/index"));

const EditHoldings = React.lazy(() => import("./Pages/EditHoldings"));

// {/* newwebsite import end  */}
// {/* Aos Animation*/}

const Holdings = React.lazy(() => import("./Pages/Holdings/index"));
const TableContent = React.lazy(() => import("./Components/DashboardHeader/tablecontent"));
const DashboardHeader = React.lazy(() => import("./Components/DashboardHeader"));
const Negotiations = React.lazy(() => import("./Pages/Negotiations"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));

const ResetPassword2 = React.lazy(() => import("./Pages/ResetPassword/index"));
const SignAgreement = React.lazy(() => import("./Pages/SignAgreement/index"));
const RiskProfileQuestions = React.lazy(() => import("./Pages/RiskProfileQuestions/index"));
const ForgotPassword = React.lazy(() => import("./Pages/Security/ForgotPassword/index"));
const ForgotUserId = React.lazy(() => import("./Pages/Security/ForgotUserId/index"));



const TwoFactorAuth = React.lazy(() => import("./Pages/TwoFactorAuth/index"));
const MobileVerification = React.lazy(() => import("./Pages/MobileVerification/index"));
const SignUp = React.lazy(() => import("./Pages/Signup/index"));
const Security = React.lazy(() => import("./Pages/Security/index"));
const Login = React.lazy(() => import("./Pages/Login/index"));

const PaymetWidget = React.lazy(() => import("./Pages/Payment/PaymetWidget"));
const SessionTimeOut1 = React.lazy(() => import("./Utils/sessionTimeOut1"));

AOS.init();

export default function App() {
    const [isLogedIn,setisLogedIn] = React.useState(isLoggedIn())

    return (
        <Router>

            <Suspense fallback='Loading...'>
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
            </Suspense>
        </Router>
    );
}

