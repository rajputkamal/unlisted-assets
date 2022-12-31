import React, { useState } from "react";
import TradeModal from "../TradeModal";
import { Link, useHistory } from "react-router-dom";
import TradeImage from "./TradeImage";
import PlusIcon from "./pluslogo.png";
import MinusIcon from "./minuslogo.png";
import Skeleton from "react-loading-skeleton";
import "../style.scoped.css";
import "./Allcompanies.css";
import "../../Inventory_old_1/inventoryContent.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Buttons from "../../../Components/Buttons";
import AddCompanyRequest from "../../../Components/AddCompanyRequest";
import Dialog from "@material-ui/core/Dialog";
import { Breadcrumbs } from "@material-ui/core";
import { apiCall, downloadurl, setAccessToken } from "../../../Utils/Network";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import Nologo from "./nologo.jpeg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { isLoggedIn } from "../../../Utils/Network";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Allcomponies(props) {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState("");
  const [show, setShow] = React.useState(false);
  const [AddWatchlist, setAddWatchlist] = useState(false);
  const [DeleteWatchlist, setDeleteWatchlist] = useState(false);
  // const [showData, setshowData] = useState(false);
  const [showCardResult, setshowCardResult] = useState();
  // const [allcompanies, setallcompanies]= useState(props.currentPost);
  const [isLogedIn, setisLogedIn] = useState(isLoggedIn());
  const [openModal, setOpenModal] = useState(false);
  const [buyandsell, setBuyandsell] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [approchingIPO, setApprochingIPO] = useState(true);
  const [companyDetails, setCompanyDetails] = useState();
  const [allcompanyDetails, setAllCompanyDetails] = useState();

  const CardData = (event, value) => {
    setshowCardResult(value);
    // { showData ? setshowData(false) : setshowData(true) }
  };
  const handleClickOpen = () => {
    setOpenModal(true);
    setWatchlist(false);
  };
  const handleClickOpenaWatchlist = () => {
    setOpenModal(true);
    setWatchlist(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const AddtoWatchList = async (trade) => {
    let response = await apiCall("company/usercompanywatchlist", "PUT", trade);
    //console.log("apicalled",response.status)
    if (response.status !== 200) {
      //errorToast("Invalid", "Mobile Number Does not exists");
      return;
    } else if (response.status === 200) {
      //console.log(trade.addedWatchList+"kokokokokoko")
      trade.addedWatchList ? setAddWatchlist(true) : setDeleteWatchlist(true);
      //setMobiletext('Verify your mobile number with otp verification')
      //successToast("Success","OTP sent to your mobile please check")
      //setOpen(true)
      setCompanyDetails(trade);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenModal(false);
    setDeleteWatchlist(false);
    setAddWatchlist(false);
  };
  const action = (
    <React.Fragment>
      <Buttons.PrimaryButton
        value="OK"
        id="add-holdings-button"
        onClick={handleClose}
      />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );

  function showModal(event, name, id, trade) {
    if (isLogedIn == false) {
      handleClickOpen();
    } else {
      setModal(true);
      setItem_id(id);
      setitem_name(name);
      setAllCompanyDetails(trade);
    }
  }

  function showModal1(event, name, id) {
    if (isLogedIn == false) {
      handleClickOpenaWatchlist();
    } else {
      setModal(true);
      setItem_id(id);
      setitem_name(name);
    }
  }

  // function ExploreCopany(event, name, id) {
  //     if(isLoggedIn() == false){
  //     handleClickOpen()
  //     }else{
  //         history.push(`/company/${trade.slug}`)
  //     }
  // }

  function hideModal(e) {
    setModal(false);
  }

  function ValuationConvertion(val) {
    var final_amt = val / 1000000;
    if (final_amt >= 1000) {
      final_amt = final_amt / 1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }

  // function paginate(pageNumber) {
  //   setCurrentPage(pageNumber)
  // }
  // const apiEndpoint = "http://13.232.34.18:8080/company/findAll";
  // const { data: conpanies } = useSWR(apiEndpoint, {refreshInterval:2});
  // const indexOfLastpost = currentPage * postPerpage;
  // const indexOfFirstPost = indexOfLastpost - postPerpage;
  // const currentPost = conpanies ? conpanies.slice(indexOfFirstPost, indexOfLastpost) : null;

  //console.log("currentPost2", props.currentPost);
  // const totalResult = props.currentPost.length;
  // console.log("totalResult",totalResult);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="m-0">
          Results : <span>({props.totalPosts})</span>{" "}
        </h4>
        {/* <Buttons.SecondaryButton value="Add Company Request" style={{background:"transparent", height:"30px"}}
                                         onClick={()=>{setOpen(true)}}
                />
                <Dialog open={open} onClose={()=>{setOpen(false)}} >
                    <AddCompanyRequest onClose={()=>{setOpen(false)}}/>
                </Dialog> */}
      </div>

      <div className="allcompanies-section-main">
        {/* <h2>test</h2> */}
        <div className="row mt-2">
          {companyDetails == undefined ? null : (
            <>
              <Snackbar
                open={AddWatchlist}
                autoHideDuration={3000}
                onClose={handleClose}
                message={
                  companyDetails.name +
                  " has been added to your watchlist. You will be notified about all its updates"
                }
                action={action}
              />
              <Snackbar
                open={DeleteWatchlist}
                autoHideDuration={5000}
                onClose={handleClose}
                message={
                  companyDetails.name +
                  " Company has been removed from your Watchlist. You will not be Notified about any Further Updates"
                }
                action={action}
              />
            </>
          )}

          {props.currentPost
            ? props.currentPost.map((trade, index) => (
                <>
                  <div
                    className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 margin-default "
                    key={index}
                  >
                    <div className="company-col-main">
                      <div className="company-col-top">
                        <div className="company-top-thumb">
                          <div className="row overflow-hidden">
                            <div className="col-md-9 col-10 py-2 ">
                              <div className="Company-thumbnail">
                                {trade.id == undefined ? (
                                  <Skeleton
                                    circle={true}
                                    height={40}
                                    width={40}
                                  />
                                ) : (
                                  <>
                                    <Link
                                      to={{
                                        pathname: `/company/${trade.slug}`,
                                      }}
                                    >
                                      {" "}
                                      <img
                                        src={
                                          trade.logo == undefined ||
                                          trade.logo == ""
                                            ? Nologo
                                            : trade.logo
                                        }
                                        alt=" No Company Logo"
                                      />
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                            <div
                              className="col-md-3 col-2 py-1 company-bookmark"
                              onClick={(e) => {
                                trade.addedWatchList = !trade.addedWatchList;
                                AddtoWatchList(trade);
                              }}
                            >
                              {trade.id == undefined ? (
                                <Skeleton
                                  circle={true}
                                  height={25}
                                  width={25}
                                />
                              ) : (
                                <>
                                  {isLogedIn ? (
                                    <>
                                      {trade.addedWatchList ? (
                                        <BookmarkIcon />
                                      ) : (
                                        // <img className='plusminus-img' src={MinusIcon} />

                                        <BookmarkBorderIcon />
                                      )
                                      // <img className='plusminus-img' src={PlusIcon} />
                                      }
                                    </>
                                  ) : (
                                    // <img className='plusminus-img' src={PlusIcon} onClick={(event) => showModal1(event, trade.name, trade.id)} />
                                    <div
                                      className="bookmark-Icon"
                                      onClick={(event) =>
                                        showModal1(event, trade.name, trade.id)
                                      }
                                    >
                                      <BookmarkBorderIcon />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            {/* <div className=" company-bookmark">
                                                       <BookmarkIcon />
                                                    </div> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="company-top-details col-md-12 col-10">
                            {trade.id == undefined ? (
                              <>
                                <Skeleton height={20} /> <br />
                              </>
                            ) : (
                              <h4> {trade.name}</h4>
                            )}

                            {/*{trade.id == undefined ? <Skeleton height={15} className="mt-2" /> : <p>Est. Price / Share: <span>₹ 100 - 130</span></p>}*/}
                          </div>
                          <div className="col-2 dnmb">
                            {showCardResult == trade.id ? (
                              <KeyboardArrowUpIcon
                                className="company-showdata-arrow"
                                onClick={CardData}
                                hideid={trade.id}
                              />
                            ) : (
                              <KeyboardArrowDownIcon
                                className="company-showdata-arrow"
                                onClick={(event) => CardData(event, trade.id)}
                                showid={trade.id}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {showCardResult === trade.id ? (
                        <>
                          {/* for Mobile view  */}
                          <div className="company-col-bottom">
                            <div className="company-tags">
                              <Stack
                                direction="row"
                                spacing={2}
                                className="d-flex justify-content-between"
                              >
                                {trade.approachingIPO ? (
                                  <>
                                    {trade.id == undefined ? (
                                      <Skeleton width={100} height={15} />
                                    ) : (
                                      <Chip
                                        icon={<CalendarTodayIcon />}
                                        label="Approaching IPO"
                                      />
                                    )}
                                  </>
                                ) : null}

                                {trade.acquired ? (
                                  <>
                                    {trade.id == undefined ? (
                                      <Skeleton width={100} height={15} />
                                    ) : (
                                      <Chip
                                        icon={<WorkOutlineIcon />}
                                        label="Acquired"
                                        variant="outlined"
                                      />
                                    )}
                                  </>
                                ) : null}
                              </Stack>
                            </div>
                            <div className="company-actions">
                              {trade.id == undefined ? (
                                <Skeleton width={115} height={30} />
                              ) : (
                                <>
                                  <Link
                                    className="btn btn-explore w-50"
                                    to={{ pathname: `/company/${trade.slug}` }}
                                  >
                                    {" "}
                                    Explore
                                  </Link>{" "}
                                </>
                              )}

                              {/* {trade.id == undefined ? <Skeleton width={100} height={30} /> : <Link className="btn btn-explore w-50"  to={{pathname: `/website-company/${trade.slug}`}}> Explore</Link>   } */}

                              {trade.id == undefined ? (
                                <Skeleton width={115} height={30} />
                              ) : (
                                <button
                                  className="btn allcompany-card-btn  w-50"
                                  type="button"
                                  onClick={(event) =>
                                    showModal(
                                      event,
                                      trade.name,
                                      trade.id,
                                      trade
                                    )
                                  }
                                >
                                  {" "}
                                  Buy / Sell{" "}
                                </button>
                              )}
                            </div>
                          </div>{" "}
                        </>
                      ) : (
                        <>
                          {/* for desktop view  */}
                          <div className="dbmn">
                            <div className="company-tags">
                              <Stack
                                direction="row"
                                spacing={1}
                                className="d-flex justify-content-between"
                              >
                                {trade.approachingIPO ? (
                                  <>
                                    {trade.id == undefined ? (
                                      <Skeleton width={100} height={15} />
                                    ) : (
                                      <Chip
                                        icon={<CalendarTodayIcon />}
                                        label="Approaching IPO"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <div className="approching-ipo-margin" />
                                )}

                                {trade.acquired ? (
                                  <>
                                    {trade.id == undefined ? (
                                      <Skeleton width={100} height={15} />
                                    ) : (
                                      <Chip
                                        icon={<WorkOutlineIcon />}
                                        label="Acquired"
                                        variant="outlined"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <div className="approching-ipo-margin" />
                                )}
                              </Stack>
                            </div>
                            <div className="company-actions">
                              {trade.id == undefined ? (
                                <Skeleton width={115} height={30} />
                              ) : (
                                <>
                                  <Link
                                    className="btn btn-explore w-50"
                                    to={{ pathname: `/company/${trade.slug}` }}
                                  >
                                    {" "}
                                    Explore
                                  </Link>{" "}
                                </>
                              )}

                              {/* <Link className="btn btn-explore w-50" to={{ pathname: `/company/${companyName}${trade.slug}` }}> Explore</Link> </>} */}

                              {/* {trade.id == undefined ? <Skeleton width={100} height={30} /> : <Link className="btn btn-explore w-50"  to={{pathname: `/website-company/${trade.slug}`}}> Explore</Link>   } */}

                              {trade.id == undefined ? (
                                <Skeleton width={115} height={30} />
                              ) : (
                                <button
                                  className="btn allcompany-card-btn  w-50"
                                  type="button"
                                  onClick={(event) =>
                                    showModal(
                                      event,
                                      trade.name,
                                      trade.id,
                                      trade
                                    )
                                  }
                                >
                                  {" "}
                                  Buy / Sell{" "}
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ))
            : null}
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
              {watchlist ? (
                <>
                  <h5>
                    <b>
                      Company will be added to your watchlist. You will be
                      notified about all its updates.
                    </b>
                  </h5>
                  <p className="m-0 text-small">
                    Please log in for Add watchlist to company!
                  </p>
                </>
              ) : (
                <>
                  <h5>
                    <b>Ready to trade this unlisted share?</b>
                  </h5>
                  <p className="m-0 text-small">
                    Please log in to start investing right away!
                  </p>
                </>
              )}
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

      <Dialog
        open={tradeModal}
        onClose={hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TradeModal
          show={tradeModal}
          handleClose={hideModal}
          c_id={item_id}
          c_name={item_name}
          allcompanyDetails={allcompanyDetails}
        />
      </Dialog>

      {/* {!tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id} c_name={item_name} allcompanyDetails={allcompanyDetails}/>
            } */}
    </>
  );
}
