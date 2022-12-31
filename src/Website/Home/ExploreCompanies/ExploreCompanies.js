import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import Stack from "@mui/material/Stack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import "./ExploreCompanies.css";
import "../../../Pages/Inventory_old_1/inventoryContent.css";
import Buttons from "../../../Components/Buttons";

import { isLoggedIn, apiCall } from "../../../Utils/Network";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@material-ui/core/Dialog";

import Nologo from "../../../Pages/Inventory_old_1/nologo.jpeg";
// import MainImage from "./images/sign_in.png";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { numberFormat } from "../../../Utils/NumberFormat";

const Btn = styled.div`
 display: none;
 @media (max-width: 600px){
  display: block;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  width: 100%;

 }
`;

export default function ExploreCompanies() {
  let history = useHistory();
  let location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
  const handleClickOpen = () => {
    {
      isLogedIn ? setOpenModal(true) : setOpenModal(false);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [companylist, setcompanylist] = useState([]);

  React.useEffect(() => {
    getAllCompanyTypeList();
  }, []);

  const getAllCompanyTypeList = async function() {
    let response = await apiCall("trade/findAll1website", "GET", "", history);
    console.log("response", response);
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();

    console.log("responseJSON", responseJSON);

    setcompanylist(responseJSON);
    console.log("company list", companylist);
  };

  return (
    <div className="default-bg-color">
      <div className="ExploreCompanies-section-main container">
        <h3 className="allcompanies-heading">Explore Marketplace</h3>

        <div className="row mt-2">
          <div className=" ExploreCompanies-main">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="w-100 mobile-on">
                {/* <div className="row">
                  <div className="col-md-10 col-12">
                    <form className="w-100">
                      <div className="w-100">
                        <div className="form-group">
                          <div className="form-group has-search mb-0 small-icon w-100 ">
                            <div className="inventory-search-icon form-control-feedback">
                              <SearchIcon />
                            </div>
                            <Autocomplete
                              style={{ width: 1000 }}
                              freeSolo
                              options={searchOptions}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onSelect={(event, value) => {

                                      searchkey = event.target.value
                                      getAllInventory(true)
                                  }}
                                  className="inventory-search-bar"
                                  placeholder="Search Company Name"
                                  onKeyDown={(event, value) => handleKeypress(event)}
                                  variant="outlined"
                                />
                              )}
                            />
                          </div> 
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-2 col-12 text-right">
                    <div className="d-flex">
                      <Buttons.SecondaryButton
                        value="Search"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="row mt-2">
                  <>
                    {companylist.slice(0, 15).map((trade, index) => (
                      <div
                        className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-2 px-2 mt-2"
                        key={index}
                      >
                        <div className="marketplace-company-col-main">
                          <div className="marketplace-company-col-top">
                            <div className="marketplace-company-top-thumb">
                              <div className="row p-2">
                                <div className="col-md-10 col-10">
                                  <div className="ExploreCompanies-thumbnail">
                                    {trade.id == undefined ? null : (
                                      <img
                                        src={
                                          trade.companyLogo == undefined ||
                                          trade.companyLogo == ""
                                            ? Nologo
                                            : trade.companyLogo
                                        }
                                        alt=" No Company Logo"
                                      />
                                    )}
                                    {/* <img src={Nologo} alt=" No Company Logo" /> */}
                                  </div>
                                </div>
                                <div className="col-md-2 col-2 text-right">
                                  <Tooltip
                                    title={
                                      <>
                                        <p className="mb-0">
                                          Sector: <b> 0000</b>
                                        </p>
                                        <p className="mb-0">
                                          Listing ID: <b> LIST ID</b>
                                        </p>
                                        <p className="mb-0">
                                          Seller ID: <b> 0000</b>
                                        </p>
                                      </>
                                    }
                                    placement="right"
                                    arrow
                                    enterTouchDelay={0}
                                  >
                                    <InfoOutlinedIcon className="marketplace-infoicon" />
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="marketplace-tags mb-1 px-2">
                            <div className="row d-flex justify-content-between align-items-center">
                              <div className="col-md-6">
                                <h4 className="mb-0">{trade.companyName}</h4>{" "}
                              </div>
                              <div className="col-md-6 text-right">
                                <p className="default-para mb-0">
                                  Trending stocks 🔥
                                </p>{" "}
                              </div>

                              {/* <Chip icon={<HourglassBottomOutlinedIcon />
                                    } label="Soonicon" variant="outlined" />  */}
                            </div>
                          </div>
                          <div className="marketplace-horizontalrow" />

                          <div className="row px-2">
                            <div className="ExploreCompanies-top-detail d-flex justify-content-between col-md-12 col-10">
                              <p>
                                Quantity:{" "}
                                <span className="text-default-secoundary pl-1">
                                  {trade.qty}
                                </span>
                              </p>
                              {/* <p>
                                Min Buy:{" "}
                                <span className="text-default-secoundary pl-1">
                                  5
                                </span>
                              </p> */}
                              <p>
                                Expiry:{" "}
                                <span className="text-default-secoundary pl-1">
                                  8 hrs
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="marketplace-actions px-1">
                            <button
                              className="btn btn-secoundary-default w-100"
                              type="button"
                              onClick={() => setOpenModal(true)}
                            >
                              {/* Buy Now from ₹{trade.price}{" "} */}
                              Buy Now from {numberFormat(trade.price)}
                              <p className="share mb-0"> / share</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </div>
            </div>
          </div>

          <Btn>
            <Link to="/all-companies">
              <Buttons.PrimaryButton value="View All Listings" />
            </Link>
          </Btn>
        </div>
      </div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="allcompany-modal-closeIcon text-right">
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="addcompanyrequest px-5 pb-5">
          <div className="">
            <div className="text-center">
              <h5>
                <b>Negotiate With Companies</b>
              </h5>
              <p className="m-0 text-small">
                Please log in to Negotiate With Companies right away!
              </p>
            </div>
            <div className="d-flex justify-content-center text-center mt-4">
              <Link to="/login">
                <Buttons.PrimaryButton value="Login / Sign Up " />
              </Link>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="allcompany-modal-closeIcon text-right">
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="addcompanyrequest px-5 pb-5">
          <div className="">
            <div className="text-center">
              <h5>
                <b>Ready to trade this unlisted share?</b>
              </h5>
              <p className="m-0 text-small">
                Please log in to start investing right away!
              </p>
            </div>
            <div className="d-flex justify-content-center text-center mt-4">
              <Buttons.PrimaryButton
                value="Login / Sign Up "
                onClick={() => {
                  history.push("/login");
                }}
                style={{ width: "50%", margin: "0px 5px" }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
