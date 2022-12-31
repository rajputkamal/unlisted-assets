import React, { useState, useEffect } from "react";
import ProfileWidget from "../../Components/ProfileWidget";
import PaymentSteps from "./PaymentSteps";
import FullWidthTabs from "../../Components/TradeReadyTab/tradereadytab2";
import MakePayment from "./PaymentSteps/MakePayment";
import AddVirtualAccount from "../VirtualAccount/virtualaccount";
import ResetPassword from "../ResetPassword";
import Profile from "./index";
import breathumbs from "../../assets/breathumbs.svg";
// import "./profile.css";
import AddCompanyRequest from "../../Components/AddCompanyRequest";
import "../Companies/bootstrap4/css/bootstrap.scoped.css";
import Breadcrubs from "../../Components/Breadcrumbs";
import RiskProfileQuestions from "../RiskProfileQuestions/index";
import KYCDetails from "../TradeReadySteps/tradereadystep7";
import Container from "@mui/material/Container";
import BuyStocksRightSection from "./PaymentSteps/BuyStocksRightSection";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Buttons from "../../Components/Buttons";

import "./paymentWidget.css";

let PaymetWidget = (props) => {
  const [currentpage, setcurrentpage] = useState(1);
  const [tryagain, settryagain] = useState("");

  if (
    window.location.pathname == "/profilewig/1" ||
    window.location.pathname == "/profilewig/2" ||
    window.location.pathname == "/profilewig/3" ||
    window.location.pathname == "/profilewig/4" ||
    window.location.pathname == "/profilewig/5" ||
    window.location.pathname == "/profilewig/6"
  ) {
    //console.log("aaaiiioopp"+window.location.pathname)
  }

  useEffect(() => {
    // alert(window.location.pathname)
    if (window.location.pathname == "/profilewig/4") {
      settryagain("pan");
    } else if (window.location.pathname == "/profilewig/5") {
      settryagain("aadhar");
    } else if (window.location.pathname == "/profilewig/1") {
      settryagain("bankdetail");
    }
  }, []);

  const increment = () => {
    setcurrentpage(currentpage + 1);
  };

  const tryagaincallback = (value) => {
    //console.log("thrrrrrr"+value)
    settryagain(value);
    setcurrentpage(0);
  };

  //  console.log("currentpage" , currentpage)

  function GetPage() {
    switch (1) {
      case 0:
        return <Profile currentpage={currentpage} Submitnextpage={increment} />;
      case 1:
        return <MakePayment Submitnextpage={increment} tryagain={tryagain} />;
      case 2:
        return <RiskProfileQuestions Submitnextpage={increment} />;
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
        return <MakePayment Submitnextpage={increment} tryagain={tryagain} />;
    }
  }
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // mobile bottom information bar
  const [state, setState] = React.useState({
    bottom: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Container maxWidth="xl">
      {/* <div className="container"> */}
      <div className="Breadcrubs-default-margin">
        <Breadcrubs />
      </div>
      <div className="row d-flex justify-content-end">
        <div className="col-md-3">
          <div className="profile-left-sec m-0">
            {width <= 768 ? (
              <>
                <div className="mobileBottomBar">
                  {["bottom"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      {state.bottom == true ? (
                        <Buttons.SecondaryButton
                          onClick={toggleDrawer(anchor, false)}
                          className="btn default-bottombar-mobilebtn w-100"
                          value='Close Transaction Summary'
                        />
                      ) : (
                        <Buttons.PrimaryButton 
                          onClick={toggleDrawer(anchor, true)}
                          className="btn default-bottombar-mobilebtn w-100"
                          value='Transaction Summary'
                        />
                          
                         
                      )}
                      <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                      >
                        <Container maxWidth="sm">
                          <BuyStocksRightSection />
                        </Container>
                      </Drawer>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              <>
                <PaymentSteps currentpage={currentpage} />
              </>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div className="profile-right-sec mb-5  final-page-bg">
            {GetPage()}
          </div>
        </div>
        {width <= 768 ? null : (
          <>
            <div className="col-md-3">
              <div className="profile-right-sec mb-5 final-page-bg">
                <BuyStocksRightSection />
              </div>
            </div>
          </>
        )}
        <div />
      </div>

      {/* </div> */}
    </Container>
  );
};
export default PaymetWidget;
