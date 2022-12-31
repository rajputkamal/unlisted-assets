import React, { useState, useEffect } from "react";
import "./style.css";
import Topbanner from "./TopBanner/Index";
import ExploreCompanies from "./ExploreCompanies/ExploreCompanies";
import WhyTradeWithUs from "./WhyTradeWithUs/WhyTradeWithUs";
import WhyInvest from "./WhyInvest/WhyInvest";
import CompaniesListing from "./CompaniesListing/CompaniesListing";
import AreYouReady from "./AreYouReady/AreYouReady";
import InvestingPlatform from "./InvestingPlatform/InvestingPlatform";
import Questions from "./Questions/Questions";
import Footer from "../Footer/Footer";
import EasySteps from "./EasySteps/EasySteps";
import Testimonial from "../BrokerTestimonial/Index";
import Careers from "../Careers/Index";
import DidYouKnow from "./DidYouKnow/DidYouKnow";
import Buttons from "../../Components/Buttons";
import { AiOutlineClose } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import SignInModal01 from "./images/01.svg";
import SignInModal02 from "./images/02.svg";
import SignInModal03 from "./images/03.svg";
import { useLocation, Link, useHistory } from "react-router-dom";
import MainImage from "./images/sign_in.png";
import { clearAccessToken } from "../../Utils/Network";
import { pages } from "../Appbar/Index";

const Title = styled.h1`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  text-align: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    p {
      text-align: center;
      font-size: 12px;
      line-height: 15px;
      font-weight: 500;
      @media (max-width: 600px) {
        font-size: 10px;
      }
    }
  }
`;

const Center = styled.div`
  font-size: 16px;
  line-height: 17px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  color: #2e384d;
`;

const LoginDiv = styled.div`
  border-top: 1px solid #cfcbcf;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 2px;
  align-items: center;
`;

export default function HomeAppbar() {
  let location = useLocation();
  let history = useHistory();
  const [signUpModal, SetSignUpModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetSignUpModal(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [pages]);

  console.log("pages", pages);
  return (
    <>
      {/* <Careers/> */}
      <Topbanner />
      <DidYouKnow />
      <ExploreCompanies />
      <WhyTradeWithUs />
      <WhyInvest />
      <CompaniesListing />
      <EasySteps />
      <InvestingPlatform />
      <Questions />
      <Testimonial />
      <AreYouReady />
      <Footer />

      <Dialog
        open={signUpModal}
        onClose={() => SetSignUpModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="addcompanyrequest" style={{ position: "relative" }}>
          <img src={MainImage} alt="sign-in" className="sign_in_img" />

          <div className="sign_up_container sign_up_modal_padding">
            <div>
              <Title>
                Join Our Platform To Enjoy Seamless Unlisted Trading!
              </Title>
            </div>
            <Icons>
              <div>
                <img src={SignInModal01} alt="svg" width={48} height={48} />
                <p>
                  Enjoy Secure <br /> Transactions
                </p>
              </div>
              <div>
                <img src={SignInModal02} alt="svg" width={48} height={48} />
                <p>
                  Free OYO Share <br /> On Signing Up!
                </p>
              </div>
              <div>
                <img src={SignInModal03} alt="svg" width={48} height={48} />
                <p>
                  Diversify Your <br /> Portfolio
                </p>
              </div>
            </Icons>

            <Center>
              <p>Let's Get You Started!</p>
            </Center>

            <AiOutlineClose
              className="closeBtnAddMoneyModal"
              onClick={() => SetSignUpModal(false)}
            />

            <Buttons.PrimaryButton
              value="Sign Up Now"
              style={{ width: "100%" }}
              onClick={() => history.push("/sign-up")}
            />

            <LoginDiv>
              <Title>
                Already have an account? &nbsp;
                <Link
                  style={{ color: "#721B65", cursor: "pointer" }}
                  onClick={() => {
                    clearAccessToken();
                    window.location.href = "/login";
                  }}
                >
                  Login
                </Link>
              </Title>
              {/* <button onClick={fetchUserData}>data</button> */}
            </LoginDiv>
          </div>
        </div>
      </Dialog>
    </>
  );
}
