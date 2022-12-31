import React, { useState } from "react";
import { ReactComponent as HandsIcon } from "../Assets/HandsIcon.svg";
import { ReactComponent as BadgeIcon } from "../Assets/BadgeIcon.svg";
import { ReactComponent as ShieldIcon } from "../Assets/ShieldIcon.svg";
import { ReactComponent as MessageIcon } from "../Assets/MessageIcon.svg";

import "./SignUpLeftSection.css";
import "react-toastify/dist/ReactToastify.css";

// new singup screen

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let SignUpLeftSection = () => {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        className="SignUp_page_left-main d-flex justify-content-center align-items-center mobileview-order-2"
      >
        <Box className="SignUp_page_left-inner">
          <Box className="SignUp_page_left-container d-flex justify-content-center position-relative">
            <Box className="p-5 mobileview_padding">
              <h2 className="heading-type1 ws-theme-clr pb-2">
                Let’s Invest In
                <br /> Unlisted Shares
              </h2>
              <p className="text-small">
                We are India's first platform providing you a transparent
                buyer-seller negotiation, a safe bank escrow-based transaction
                and an automated transaction flow of buying / selling Unlisted
                Shares and ESOP's.
              </p>
              <div className="mobileview_margin-bottom">
                <Box
                  sx={{
                    flexGrow: 1,
                    padding: 0,
                    paddingTop: 2,
                    paddingBottom: 4,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                      <Box className="SignUp_page_left-icon">
                        <ShieldIcon className="icon-size" />
                      </Box>
                      <p className="text-small pr-3">
                        SEBI registered trustee onboard to foster Trust &
                        Transparency
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                      <Box className="SignUp_page_left-icon">
                        <MessageIcon className="icon-size" />
                      </Box>
                      <p className="text-small pr-3">
                        Opportunity to Buy Unlisted Shares in mere 4 clicks
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                      <Box className="SignUp_page_left-icon">
                        <BadgeIcon className="icon-size" />
                      </Box>
                      <p className="text-small pr-3">
                        Premium Stocks Available – Boat, ESDS, Pharmeasy
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                      <Box className="SignUp_page_left-icon">
                        <HandsIcon className="icon-size" />
                      </Box>
                      <p className="text-small pr-3">
                        Safeguarding Investor Money via Escrow Facility
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Box>
            <Box className="SignUp_page_left-container2 d-flex p-0">
              <Box className="px-4 margin-x-direction text-center">
                <h2 className="heading-type2 clr-white">300 Cr+</h2>
                <p className="m-0">Transaction Value</p>
              </Box>
              <Box className="px-4 margin-x-direction text-center">
                <h2 className="heading-type2 clr-white">200+</h2>
                <p className="m-0">Companies Listed</p>
              </Box>
              <Box className="px-4 margin-x-direction text-center">
                <h2 className="heading-type2 clr-white">100+</h2>
                <p className="m-0">Partner Network</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default SignUpLeftSection;
