import React, { useState, Suspense } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import "./inventorytablecontent.css";
import "./inventoryContent.css";
import "../../Components/FilterCard/filterCard.css";
import Buttons from "../../Components/Buttons";
import "../Companies/bootstrap4/css/bootstrap.scoped.css";
import "../Companies/style.scoped.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { apiCall, downloadLogos, imgurl } from "../../Utils/Network";
import Journey from "../Journey/Index";
import MobileJourney from "../Journey/MobileIndex";

import Nologo from "./nologo.jpeg";
import oyoLogo from "./Assets/oyoLogo.png";
import BlankIcon from "./Assets/blank.svg";
import PlusIcon from "./Assets/Plus.svg";
import EmptyIcon from "./Assets/empty.svg";

import Skeleton from "react-loading-skeleton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Loadbutton from "../../Components/Loadbutton/Index";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OnboardingAlertDialog from "../../Components/OnboardingVarificationDialogBox/OnboardingVarificationDialogBox";
import { unstable_batchedUpdates } from "react-dom";

// marketplace new design start here
import Infologo from "./Assets/infologo.svg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import { ReactComponent as FilterIcon } from "./Assets/filter.svg";
import { ReactComponent as SortIcon } from "./Assets/sort-icon.svg";
import Popper from "@material-ui/core/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { numberFormat } from "../../Utils/NumberFormat";
// import BuyNowModal from "./Components/BuyNowModal"

const BuyNowModal = React.lazy(() => import("./Components/BuyNowModal"));
const UpdateDematModal = React.lazy(() =>
  import("../../Components/updateDematAccount/Index")
);

// marketplace new design end here

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((el) => el[0]);
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 1500,
    width: "border-box",
    border: "1px solid #CFCBCF",
    borderRadius: "10px",
    //   margin: "10px"
  },
  paper: {
    position: "absolute",
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%) !important",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0),
    borderRadius: "10px",
  },
}));

// for mobile filter
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function InventoryContent(props) {
  const location = useLocation();

  //   const filteredCompanyName = location.state.companyName;
  //   console.log("filteredCompanyName", filteredCompanyName);

  //Search
  let searchkey = "nothing";
  let placeholder = "Search Company Name";

  // marketplace new design start here
  const [allcompanies, setallcompanies] = useState([]);
  const [showData, setshowData] = useState(false);
  const [showCardResult, setshowCardResult] = useState();
  const [BuyNowFilter, setBuyNowFilter] = useState(location.state);

  console.log("BuyNowFilter", BuyNowFilter);

  if (BuyNowFilter) {
    if (BuyNowFilter != undefined && BuyNowFilter.companyName != undefined) {
      searchkey = BuyNowFilter.companyName;
      placeholder = BuyNowFilter.companyName;
    }
  }

  const CardData = (event, value) => {
    // console.log('value', value);

    setshowCardResult(value);
    {
      showData ? setshowData(false) : setshowData(true);
    }
  };

  // marketplace new design end here

  let loaderArray = [{}, {}, {}, {}, {}, {}, {}, {}];
  const [isload, setLoad] = React.useState(false);
  let history = useHistory();
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("company");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2000);
  const [rowInformation, setRowInformation] = React.useState(loaderArray);

  ///// for pagination
  const [Showpagination, setShowpagination] = useState(false);
  const [PaginationButtontext, setPaginationButtontext] = useState(
    "Show pagination"
  );

  // filter popper
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "filter-popper" : undefined;
  const [panelShow1, setPanelShow1] = React.useState(false);
  const [panelShow2, setPanelShow2] = React.useState(false);
  const [panelShow3, setPanelShow3] = React.useState(false);

  const [modalStyle] = React.useState(getModalStyle);
  const [openfilter, setOpenfilter] = React.useState(false);
  const [completegetreadysteps, setCompletegetreadysteps] = useState(false);
  const [openmodal, setOpenmodal] = React.useState(false);
  const [globalhelp, setglobalhelp] = React.useState([]);
  const [globalnews, setglobalnews] = React.useState([]);
  const [dialogPage, setDialogPage] = React.useState(false);

  const [hasmore, sethasmore] = React.useState(true);
  const [num, setnum] = React.useState(0);

  const [name, setname] = React.useState("");
  const [offerAvailed, setofferAvailed] = React.useState(true);

  //Filter
  const [assetTypeList, setassetTypeList] = React.useState([
    { value: "vested-share", selet: false },
    { value: "esop-share", selet: false },
  ]);
  const [assetTypeoptions, setassetTypeoptions] = React.useState([]);
  const [assetTypeoptionsall, setassetTypeoptionsall] = React.useState([
    "Equity Shares",
    "esop-share",
  ]);
  // filter popper For Desktop

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [selectbutton, setSelectbutton] = React.useState("");

  const [searchOptions, setsearchOptions] = useState([]);
  const [journeyStatus, setJourneyStatus] = useState(0);

  const getSearchOption = async function() {
    let response1 = await apiCall(
      "company/allcompaniesnames",
      "GET",
      "",
      history
    );
    // console.log(response1)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1)

    setsearchOptions(responseJSON1.map((ssa) => ssa.name));
  };

  const PaginationShow = () => {
    if (Showpagination == true) {
      setShowpagination(false);
      setPaginationButtontext("Hide pagination");
    } else if (Showpagination == false) {
      setShowpagination(true);
      setPaginationButtontext("Show pagination");
    }
  };
  const closeDialog = () => {
    // console.log('aaaaaaa')
    setDialogPage(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);

    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleFilterClose = (event) => {
    if (anchorEl) {
      // alert();
      setAnchorEl(null);
    }
  };

  /////////////// popper end /////////////////

  // table Loader
  // React.useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setLoad(true);
  //     }, 3000);
  //     return () => clearTimeout(timer);
  // }, []);

  React.useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];

    // Add a Click Event Listener to the button
    close.addEventListener("click", () => {
      searchkey = "nothing";
      setnum(0);
      getAllInventory(true);
    });
  }, []);

  const [disclaimer, setDisclaimer] = useState(false);

  React.useEffect(() => {
    getSearchOption();
    getAllInventory();
    getGlobalHelp();
    // getGlobalNews()
    getuserinfo();
    getJourneyStatus();
    isOfferAvailed();
    disclaimerModal();
  }, []);

  const disclaimerModal = () => {
    if (localStorage.getItem("popState") != "shown") {
      setDisclaimer(true);
      localStorage.setItem("popState", "shown");
    }
  };

  const fetchMoreData = () => {
    getAllInventory();
  };

  const reqbody = {
    a: assetTypeoptions,
  };

  const managefilters = function() {
    if (assetTypeoptions.length == 0) {
      reqbody.a = assetTypeoptionsall;
    } else {
      reqbody.a = assetTypeoptions;
    }

    if (searchkey == "") {
      searchkey = "nothing";
    }
  };
  const getuserinfo = async function() {
    // // console.log("aaaaaassspp"+searchkey)
    // managefilters()

    let response = await apiCall(
      "useronboarding/accountonboarding/",
      "GET",
      "",
      history
    );
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    // console.log(responseJSON)
    setname(responseJSON.name);
  };

  const isOfferAvailed = async function() {
    // // console.log("aaaaaassspp"+searchkey)
    // managefilters()

    let response = await apiCall(
      "profile/isOfferAvailed1OyoShare/",
      "GET",
      "",
      history
    );
    // console.log("free share", response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }

    let offerStatus = await response.text();

    if (response.status == 200) {
      if (offerStatus == "true") {
        setofferAvailed(true);
      } else {
        setofferAvailed(false);
      }
    } else {
      //someting went wrong
      //let's not show offer
      setofferAvailed(true);
    }
  };

  const getAllInventory = async function(page) {
    // setLoad(false);
    let num1 = num;
    if (page == true) {
      num1 = 0;
      setnum(0);
    }
    // console.log("aaaaaassspp"+searchkey)
    managefilters();

    let response = await apiCall(
      "trade/findAll1/" + searchkey + "/" + num1,
      "POST",
      reqbody,
      history
    );
    // console.log(response)
    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();
    // console.log(responseJSON)

    if (num1 == 0) {
      setRowInformation(responseJSON);
    } else {
      responseJSON.map((record) => rowInformation.push(record));
      setRowInformation([...rowInformation]);
    }
    setnum(num1 + 1);
    if (responseJSON.length % 20 != 0) {
      sethasmore(false);
    } else {
      sethasmore(true);
    }

    setLoad(true);
  };

  const getGlobalHelp = async function() {
    let response1 = await apiCall("globalHelps", "GET", "", history);
    // console.log(response1)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1._embedded.globalHelps)
    setglobalhelp(responseJSON1._embedded.globalHelps);
  };

  const getGlobalNews = async function() {
    let response1 = await apiCall("globalNews", "GET", "", history);
    // console.log(response1)
    if (response1.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON1 = await response1.json();
    // console.log(responseJSON1._embedded.globalNews)
    setglobalnews(responseJSON1._embedded.globalNews);
  };

  let showPanel1 = () => {
    setPanelShow1(!panelShow1);
  };

  let showPanel2 = () => {
    setPanelShow2(!panelShow2);
  };

  let showPanel3 = () => {
    setPanelShow3(!panelShow3);
  };

  let assetTypeChange = (e) => {
    let index;
    if (e.target.checked) {
      assetTypeoptions.push(e.target.value);
    } else {
      index = assetTypeoptions.indexOf(e.target.value);
      assetTypeoptions.splice(index, 1);
    }

    // console.log("ppppp1"+assetTypeoptions.length)
    // console.log("ppppp"+assetTypeoptions)
    //getData()

    //setassetTypeoptions(assetTypeoptions)
  };

  let applyFilter1 = (e) => {
    getAllInventory();
    if (anchorEl) {
      // alert();
      setAnchorEl(null);
    }
  };

  const handleMobileFilterOpen = () => {
    setOpenfilter(true);
  };

  const handleMobileFilterClose = () => {
    setOpenfilter(false);
  };

  const showModal = () => {
    setOpenmodal(true);
  };

  const handleKeypress = (e) => {
    setBuyNowFilter("undefined");
    if (e.code === "Enter") {
      searchkey = e.target.value;
      //handleSubmit();
      if (searchkey == "") {
        searchkey = "nothing";
      }
      setnum(0);
      // console.log("aaaaaasss11"+searchkey)
      getAllInventory(true);
      e.preventDefault();
    }
  };

  const getTradeId = (value) => (event) => {
    // console.log("mayur", value);
    alert(value);
  };

  // filter

  let FilterInner = () => {
    return (
      <>
        <div className="bg-white p-2 rounded allcompany-custom-filter border-0 ">
          <div className="filter-top-action border-bottom py-2 pb-3 d-flex align-items-center justify-content-between">
            <div className="cursor-pointer w-100 dbmn">
              {/* <CloseIcon className="dbmn" onClick={handleFilterClose} /> */}
            </div>
            <div className="w-100">
              <h6 className="mb-0 text-center">Filter</h6>
            </div>
            <div className="cursor-pointer w-100 dbmn">
              <p className="text-right mb-0">
                <a href="#">Clear All</a>
              </p>
            </div>
          </div>
          {
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="border-0">Sector</Typography>
                </AccordionSummary>
                <div className="filter-row">
                  {/* {rowInformation.map((trade, index) => ( */}

                  {sortedRowInformation(
                    rowInformation,
                    getComparator(orderDirection, valueToOrderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trade, index) => (
                      <div className="accordion-details coql-6 " key={index}>
                        <div class="boxes filter-options-main ">
                          <input
                            className="filter-options"
                            type="checkbox"
                            id={trade.id}
                          />
                          <label for={trade.id}>{trade.companyName}</label>
                        </div>
                      </div>
                    ))}
                </div>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Company Type</Typography>
                </AccordionSummary>
                <div className="filter-row">
                  {/* {rowInformation.map((trade, index) => ( */}

                  {sortedRowInformation(
                    rowInformation,
                    getComparator(orderDirection, valueToOrderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trade, index) => (
                      <div className="accordion-details coql-6 " key={index}>
                        <div class="boxes filter-options-main ">
                          <input
                            className="filter-options"
                            type="checkbox"
                            id={trade.id}
                          />
                          <label for={trade.id}>{trade.companyName}</label>
                        </div>
                      </div>
                    ))}
                </div>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ControlPointIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Series Of Funding</Typography>
                </AccordionSummary>
                <div className="filter-row">
                  {/* {rowInformation.map((trade, index) => ( */}

                  {sortedRowInformation(
                    rowInformation,
                    getComparator(orderDirection, valueToOrderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trade, index) => (
                      <div className="accordion-details coql-6 " key={index}>
                        <div class="boxes filter-options-main ">
                          <input
                            className="filter-options"
                            type="checkbox"
                            id={trade.id}
                          />
                          <label for={trade.id}>{trade.companyName}</label>
                        </div>
                      </div>
                    ))}
                </div>
              </Accordion>
            </>
          }
          <div className="filter-action-bottom m-2">
            <Buttons.PrimaryButton value="Apply" style={{ width: "100%" }} />
          </div>
          <div className="filter-action-bottom m-2 dnmb">
            <Buttons.SecondaryButton
              value="Clear Filter"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </>
    );
  };

  // console.log("sortedRowInformation",rowInformation)

  // const CheckJourneyStatus = (childdata) => {
  //   setJourneyStatus(childdata);
  // }
  // console.log("journeyStatus",journeyStatus)

  // ================

  // React.useEffect(() => {
  //     getAllInventory()

  //   }, []);

  const getJourneyStatus = async function() {
    let response = await apiCall(
      "useronboarding/onboardingjourney",
      "GET",
      "",
      history
    );
    if (response.status == undefined) {
      // console.log("error")
      return;
    }
    let responseJSON = await response.json();
    setJourneyStatus(responseJSON);
  };

  // console.log("roinformation", rowInformation)

  // buynow modal

  const [item_id, setItem_id] = useState(0);
  const [item_name, setitem_name] = useState("");
  const [tradeModal, setModal] = useState(false);
  const [isCampaign, setisCampaign] = useState(false);
  const [allcompanyDetails, setAllCompanyDetails] = useState();

  // dematupdateModal

  const [dematModal, setDematModal] = useState(false);

  function hideDematModal(e) {
    setDematModal(false);
  }

  function hideDematModalCallBack() {
    setDematModal(false);
  }

  function hideModal(e) {
    setModal(false);
  }

  function hideModalCallBack() {
    setModal(false);
  }

  const getCampaignOneFreeShareOyoTrade = async function(e) {
    e.preventDefault();

    let response = await apiCall(
      "trade/campaignfreeoyoshare/",
      "GET",
      "",
      history
    );
    console.log("FreeShareOyoTrade", response);

    if (response.status == undefined) {
      // errorToast("Invalid", "Invalid User ID or password");
      return;
    }
    let responseJSON = await response.json();

    if (responseJSON.companyId == undefined) {
      alert("Campaign is over, thanks...");
      return;
    }
    unstable_batchedUpdates(() => {
      setAllCompanyDetails(responseJSON);
      setisCampaign(true);
      setModal(true);
      setItem_id(responseJSON.id);
      setitem_name(responseJSON.companyName);
    });
  };

  function openBuyNowModal(event, name, id, trade) {
    unstable_batchedUpdates(() => {
      setModal(true);
      setItem_id(id);
      setitem_name(name);
      setAllCompanyDetails(trade);
    });
  }

  function openUpdateDematModal(e) {
    setDematModal(true);
  }

  const [watchaTutorial, setWatchaTutorial] = useState(false);

  const openTutoril = () => {
    setWatchaTutorial(true);
  };

  return (
    <div className="marketplace-section">
      {/* <div>Section : 1 </div> */}
      <div className="mb-3">
        <div className="row">
          <div className="col-md-12 col-12">
            {/* <div className="jorney-for-mobile dnmb">
                            <MobileJourney />
                        </div> */}

            <div className="dbmn">
              <div className="searchbar-background-img d-flex align-items-center justify-content-center w-100">
                <div className="search-area searchbar-withBackground dbmn">
                  <h4 className="text-center">
                    Explore Unlisted Company Stocks On Our Platform
                  </h4>

                  <div className="row d-flex justify-content-center">
                    <div className="col-md-9 col-12 px-2">
                      <form className="w-100">
                        <div className="form-group">
                          <div className="form-group has-search mb-0 small-icon w-100 ">
                            <div className="inventory-search-icon form-control-feedback">
                              <SearchIcon />
                            </div>
                            <Autocomplete
                              style={{ width: 1000 }}
                              freeSolo
                              options={searchOptions}
                              value={
                                BuyNowFilter ? BuyNowFilter.companyName : null
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onSelect={(event, value) => {
                                    searchkey = event.target.value;

                                    getAllInventory(true);
                                  }}
                                  className="inventory-search-bar"
                                  placeholder="Search Company Name"
                                  onKeyDown={(event, value) =>
                                    handleKeypress(event)
                                  }
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* <div className="col-md-3 col-12 px-2 Searchbar-btn">
                      <Buttons.SecondaryButton value="Search" />
                    </div> */}
                  </div>
                  <div className="watch-tutorial ">
                    <button
                      className="btn bg-white watch-tutorial-btn"
                      onClick={openTutoril}
                    >
                      <div className="play-icon-div d-flex align-items-center justify-content-center">
                        <PlayCircleIcon className="play-icon" />
                        Watch Platform Tutorial
                      </div>
                    </button>
                  </div>
                  {/*<button onClick={(e) =>openUpdateDematModal(e)}>Click to open demat modal</button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={(journeyStatus.profileJourneyCompleted == "100" && journeyStatus.tradeReadyJourneyCompleted == "100") ? "d-none" : "mb-3"}>
                <div className="row">
                    <div className="col-md-9 col-12">
                        <div className="jorney-for-mobile dnmb">

                            <MobileJourney />
                        </div>
                        <div className=" my-card pl-0 dbmn" onClick={handleFilterClose}>


                            <Journey />
                        </div>
                    </div>
                    <div className="col-md-3 col-12 dbmn need-help-col" onClick={handleFilterClose}>
                        <div className="my-card need-help-card">
                            <div>
                                <h6><b>Need help?</b></h6>

                                {globalhelp.map((help, index) => (
                                    <div>
                                        <a href={help.associatedLink} target="_blank">
                                            <p className="mb-1 text-normal">{help.title}</p>
                                        </a>
                                    </div>
                                )

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      {!offerAvailed ? (
        <div className="row free-share-section">
          <div className="col-md-6 col-12  d-flex mb-2">
            <div className="marketplace-Company-thumbnail marketplace-free-share">
              <img src={imgurl("OYO.png")} alt="No Company Logo" />
            </div>
            <h6 className="text-small mx-2 my-0">
              Complete Your KYC & Receive A FREE OYO SHARE! For Limited Time
              Only!
            </h6>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <Buttons.PrimaryButton
              value="Get My Free Oyo Shares"
              onClick={(event) => getCampaignOneFreeShareOyoTrade(event)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      ) : null}

      <div className="my-holdings-page row">
        {/* <div>Section : 2 </div> */}

        <React.Fragment>
          <div className="col-md-12 col-12">
            <div className="table-container">
              {/* <div className="Table_title mt-3">
                                <div className="d-flex align-items-center justify-content-between w-100" >
                                    <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: "999" }} >
                                        <FilterInner />
                                    </Popper>
                                    <div className="search-area dbmn">
                                        <div className='row'>
                                            <div className='col-md-8 col-12'>
                                                <form className="w-100">
                                                    <div className="w-100">
                                                        <div className="form-group">
                                                            <div className="form-group has-search mb-0 small-icon w-100 ">
                                                                <div className='inventory-search-icon form-control-feedback'>
                                                                    <SearchIcon />
                                                                </div>
                                                                <Autocomplete
                                                                    style={{ width: 1000 }}
                                                                    freeSolo
                                                                    options={searchOptions}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params}
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
                                        </div>
                                    </div>
                                </div>
                            </div> */}

              {/* For Mobile View  */}
              <div className="dnmb">
                <div className="search-area mobileview px-2 mt-0">
                  <div className="row d-flex align-items-center justify-content-between">
                    <div className="col-12 px-2">
                      <form className="w-100 fixbar">
                        <div className="form-group " id="search">
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
                                    searchkey = event.target.value;

                                    getAllInventory(true);
                                  }}
                                  className="inventory-search-bar"
                                  placeholder="Search Company Name"
                                  onKeyDown={(event, value) =>
                                    handleKeypress(event)
                                  }
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row w-100 d-none">
                    <div className="col-12 pr-1 pl-1">
                      <div class="form-group has-search mb-0 small-icon w-100 ">
                        <FontAwesomeIcon
                          className="form-control-feedback"
                          icon={faSearch}
                        />
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search Companies with name, CIN, ISIN..."
                          onKeyPress={handleKeypress}
                        />
                      </div>
                    </div>
                    {/*<div className=' col-5 d-flex pl-2'>*/}
                    {/*    /!*<Button className="btn btn-secoundary-default company-filter-mobile "  >*!/*/}
                    {/*    /!*    <SortIcon width="15" height="16" />                                                *!/*/}
                    {/*    /!*</Button>*!/*/}
                    {/*    /!*<Button className="btn btn-secoundary-default company-filter-mobile "  onClick={handleFilter} >*!/*/}
                    {/*    /!*    <FilterIcon width="15" height="16" />                                                *!/*/}
                    {/*    /!*</Button>*!/*/}
                    {/*</div>                                            */}
                  </div>
                </div>
              </div>
              {/* For Mobile View end*/}

              <div>
                <h3 className="marketplace-card-heading">
                  Explore Trending stocks{" "}
                </h3>
                <p className="text-small">
                  Check out our Trending stocks to negotiate and buy directly
                  from the seller!
                </p>

                {/*<div className='marketplace-Chip-main mb-3 mt-2'>*/}
                {/*    <div className='row marketplace-Chips m-0'>*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Active" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Expired" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Retail" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Power & infra" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="BSFI" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Consumer Durable" variant="outlined" />*/}
                {/*        <Chip className='px-2 mr-2 mb-1' label="Media" variant="outlined" />*/}
                {/*    </div>*/}
                {/*</div >*/}
              </div>

              <div
                className=" mb-3 myholding-right-sec marketplace-table"
                onClick={handleFilterClose}
              >
                <div className="allcompanies-section-main">
                  <InfiniteScroll
                    dataLength={rowInformation.length}
                    next={fetchMoreData}
                    hasMore={hasmore}
                    loader={
                      <>
                        <Box className="d-flex justify-content-center align-items-center">
                          <CircularProgress />
                        </Box>
                      </>
                    }
                    endMessage={
                      <p className="text-center py-4">
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {/* {allcompanies.map((trade, index) => ( */}
                    <div className="row">
                      {sortedRowInformation(
                        rowInformation,
                        getComparator(orderDirection, valueToOrderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((trade, index) => (
                          <>
                            <div
                              className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-2 px-2 mt-2"
                              key={index}
                            >
                              <div className="marketplace-company-col-main">
                                <div className="marketplace-company-col-top">
                                  <div className="marketplace-company-top-thumb">
                                    <div className="row overflow-hidden">
                                      <div className="col-md-10 col-10">
                                        <div className="marketplace-Company-thumbnail">
                                          {trade.id == undefined ? (
                                            <Skeleton
                                              circle={true}
                                              height={40}
                                              width={40}
                                            />
                                          ) : (
                                            <Link
                                              to={{
                                                pathname: `/company/${
                                                  trade.companySlug
                                                }`,
                                              }}
                                            >
                                              <img
                                                src={
                                                  trade.companyLogo ==
                                                    undefined ||
                                                  trade.companyLogo == ""
                                                    ? Nologo
                                                    : trade.companyLogo
                                                }
                                                alt=" No Company Logo"
                                              />
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-2 col-2 ">
                                        <Tooltip
                                          title={
                                            <>
                                              {/* <p className="mb-0">Sector: <b> {trade.sector}</b></p> */}
                                              <p className="mb-0">
                                                Hub ID: <b> LIST{trade.id}</b>
                                              </p>
                                              {/* <p className="mb-0">Seller ID: <b> {trade.onboardingAccountId}</b></p></> */}
                                            </>
                                          }
                                          placement="right"
                                          arrow
                                          enterTouchDelay={0}
                                        >
                                          {trade.id == undefined ? (
                                            <Skeleton
                                              circle={true}
                                              height={15}
                                              width={15}
                                            />
                                          ) : (
                                            <InfoOutlinedIcon className="marketplace-infoicon" />
                                          )}
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="marketplace-tags my-2">
                                  <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-md-5 col-6">
                                      {trade.id == undefined ? (
                                        <Skeleton width={100} height="1" />
                                      ) : (
                                        <h4
                                          className="mb-0"
                                          style={{ width: "120px" }}
                                        >
                                          {trade.companyName}
                                        </h4>
                                      )}{" "}
                                    </div>
                                    <div className="col-md-7 col-6 text-right">
                                      {trade.isTradeOwner === false ? (
                                        <>
                                          {/* {trade.id == undefined ? <Skeleton width={100} height="1" /> : <h4 className='mb-0'>{trade.sector}</h4>} */}
                                          {trade.id == undefined ? (
                                            <Skeleton width={100} height="1" />
                                          ) : (
                                            <h4
                                              className="my-1"
                                              style={{ fontSize: "12px" }}
                                            >
                                              Trending stocks 🔥
                                            </h4>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {trade.id == undefined ? (
                                            <Skeleton width={100} height="1" />
                                          ) : (
                                            <Chip
                                              label="Your stocks"
                                              variant="outlined"
                                              style={{ marginBottom: "5px" }}
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {/* <Stack direction="row" spacing={1} className="d-flex justify-content-between align-items-center">
                                                                    {trade.id == undefined ? <Skeleton width={100} height="1" /> : <h4 className='mb-0'>{trade.companyName}</h4>}
                                                                    {trade.isTradeOwner === false ?
                                                                        <>{trade.id == undefined ? <Skeleton width={100} height="1" /> : <h4 className='mb-0'>{trade.sector}</h4>}</> :
                                                                        <> {trade.id == undefined ? <Skeleton width={100} height="1" /> : <Chip label="Your Listing" variant="outlined" />}</>}
                                                                </Stack> */}
                                </div>
                                <div className="marketplace-horizontalrow" />

                                {/* <div className='row'>
                                                        <div className="marketplace-card-listingid d-flex justify-content-between col-md-12 col-10">

                                                            {trade.id == undefined ? <Skeleton width={100} height={15} className="mt-2"/> : <p>Quantity: <span>{trade.qty}</span></p>   }
                                                            {trade.id == undefined ? <Skeleton width={100} height={15} className="mt-2"/> : <p>Expiry: <span>8 hrs</span></p>   }                     
                                                            
                                                        </div>           
                                                    </div> */}
                                <div className="row marketplace-card-listingid d-flex justify-content-between ">
                                  <div className="col-md-12 d-flex justify-content-between ">
                                    {trade.id == undefined ? (
                                      <Skeleton
                                        width={100}
                                        height={15}
                                        className="mt-2"
                                      />
                                    ) : (
                                      <p>
                                        No. Of Shares: <span>{trade.qty}</span>
                                      </p>
                                    )}

                                    {trade.id == undefined ? (
                                      <Skeleton
                                        width={100}
                                        height={15}
                                        className="mt-2"
                                      />
                                    ) : (
                                      <p>
                                        Min buy:{" "}
                                        <span>{trade.minQtyAccepted}</span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="marketplace-actions">
                                  {trade.id == undefined ? (
                                    <Skeleton width={248} height={30} />
                                  ) : trade.isTradeOwner === false ? (
                                    <>
                                      {loadingbutton &&
                                      selectbutton === trade.id ? (
                                        <Loadbutton />
                                      ) : (
                                        <>
                                          <button
                                            className="btn btn-secoundary-default w-100"
                                            type="button"
                                            onClick={(event) =>
                                              openBuyNowModal(
                                                event,
                                                trade.name,
                                                trade.id,
                                                trade,
                                                tradeModal
                                              )
                                            }
                                          >
                                            {/* Buy now ₹{trade.price}{" "} */}
                                            Buy now {numberFormat(trade.price)}
                                            <p className="share mb-0">
                                              {" "}
                                              / share
                                            </p>
                                          </button>

                                          {/* <button className="btn btn-secoundary-default w-100" type="button"

    onClick={async () => {

        try {
            const responseprofile = await apiCall("useronboarding/accountonboarding", "GET", '', history);
            let responseprofileJSON = await responseprofile.json();

            if (responseprofileJSON != undefined
                && responseprofileJSON.uaVerifiedStatus == "Verified") {
            } else {
                setDialogPage(true);
                return
            }
        } catch (e) {
            setDialogPage(true);
            return
        }

        await setSelectbutton(trade.id)
        setLoadingbutton(true)


        let response = await apiCall("tradeongoingtranaction/tradeaccount/" + trade.id, 'GET', '', history)
        if (response.status == undefined) {
            return
        }
        let responseJSON = await response.json();
        if (response.status != 200) {
            const reqBody = {
                "communicationStatus": "donotcreatecoomunicationrecord",
                "message": "it's a dummy comment",
                "offeredPrice": trade.minBidPriceAccepted,
                "offeredQuantity": trade.qty,
                "tradeId": trade.id
            }
            const response1 = await apiCall("tradecommunication/", 'POST', reqBody, history)
            const responseJSON1 = await response1.json();

            const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/" + responseJSON1.tradeOnGoingTransactionId, 'GET', '', history)
            const responseJSON12 = await response12.json();

            responseJSON = responseJSON12;
        }

        history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
    }}>Buy now ₹{trade.minBidPriceAccepted} <p className='share mb-0'> / share</p>
    </button> */}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                      className="btn ur-owner-default-btn w-100"
                                      type="button"
                                    >
                                      {/* Buy now ₹{trade.price}{" "} */}
                                      Buy now {numberFormat(trade.price)}
                                      <p className="share mb-0"> / share</p>
                                    </button>
                                  )
                                  // <p className="ur-owner-button">You are the Owner</p>
                                  }
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>{" "}
                  </InfiniteScroll>
                </div>
              </div>

              {/* ======= getreadysteps modal ========= */}
              {/* <Buttons.PrimaryButton value="Confirm" 
                            onClick={showModal}/> */}
              <Dialog
                className="delete-dialog"
                open={openmodal}
                onClose={() => {
                  setOpenmodal(false);
                }}
              >
                <div className="holding-delete-model">
                  {completegetreadysteps ? (
                    <p style={{ paddingLeft: "120px" }}> Loading...</p>
                  ) : (
                    <>
                      <div className="p-5 text-center">
                        <PermIdentityIcon
                          style={{
                            height: "60px",
                            width: "60px",
                            color: "#731b67",
                          }}
                        />
                        <div className="d-flex justify-content-center">
                          <h6 className="px-5 py-3  w-75">
                            <b>
                              Complete trade ready steps to start negotiation{" "}
                            </b>
                          </h6>
                        </div>
                        <p className="text-small mb-0 pb-4">
                          To start bidding on share listing, you need to
                          complete your trade ready steps, it will take upto 5
                          minutes
                        </p>
                        <div className="d-flex justify-content-center">
                          <Buttons.SecondaryButton
                            value="Cancel"
                            style={{ width: "45%", marginRight: "20px" }}
                          />
                          <Buttons.PrimaryButton
                            value="Get Trade Ready"
                            style={{ width: "45%" }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Dialog>
            </div>
          </div>

          <Dialog
            open={tradeModal}
            onClose={hideModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Suspense fallback="Loading...">
              <BuyNowModal
                isCampaign={isCampaign}
                tradeModal={tradeModal}
                show={tradeModal}
                handleClose={hideModal}
                c_id={item_id}
                c_name={item_name}
                trade={allcompanyDetails}
                hideModalCallBack={hideModalCallBack}
              />
            </Suspense>
          </Dialog>

          <Dialog
            open={dematModal}
            onClose={hideDematModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Suspense fallback="Loading...">
              <UpdateDematModal
                dematModal={dematModal}
                show={dematModal}
                handleClose={hideDematModal}
                hideDematModalCallBack={hideDematModalCallBack}
              />
            </Suspense>
          </Dialog>

          <Dialog
            open={watchaTutorial}
            onClose={() => setWatchaTutorial(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="pyment_modal">
              <div className="">
                <CloseIcon
                  className="default_closeIcon"
                  onClick={() => setWatchaTutorial(false)}
                />
              </div>
              <div className="addcompanyrequest px-2 pb-2">
                <div className="pyment_modal_padding">
                  <div>
                    <div className="text-center ">
                      <div className="mb-2">
                        <YouTubeIcon
                          className=""
                          style={{
                            color: "#721B65",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <h5>Watch tutorial!</h5>
                      <p className="m-0 text-small">
                        Watch tutorial for more information{" "}
                        <span className="buynow-modal-link">
                          <a
                            href="https://www.youtube.com/channel/UCtlIl_nmrY1GDRvKZhdO6mw"
                            target="_blank"
                          >
                            <b>Click here</b>
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="addcompanyrequest_buttonContainer text-center mt-3 d-flex justify-content-center">
                    <Buttons.PrimaryButton
                      value="cancel"
                      style={{ width: "70%", margin: "0px 5px" }}
                      onClick={() => setWatchaTutorial(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            open={disclaimer}
            onClose={() => setDisclaimer(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <section className="disclaimer-modal">
              <div className="">
                <div
                  class="close-icon border-none bg-info"
                  onClick={() => setDisclaimer(false)}
                >
                  <CloseIcon
                    className="default_closeIcon"
                    onClick={() => setDisclaimer(false)}
                  />
                </div>
                <div>
                  <div
                    class="row scroll-default disclaimer-modal-height"
                    style={{ overflowY: "scroll" }}
                  >
                    <div class="col-md-12 ">
                      <div className="annexure-4-para ">
                        <h5 className="undertaking text-center">Disclaimer</h5>
                        <ol className="term-ordered-list">
                          <li>
                            <span>
                              This website (i.e.{" "}
                              <a href="#">www.unlistedassets.com</a>) is
                              operated and maintained by Unlisted Tech Private
                              Limited (“UTPL”).
                            </span>
                          </li>
                          <li>
                            <span>
                              The user understands and acknowledges that this
                              website is
                              <a href="#">
                                {" "}
                                neither a trading platform nor a stock exchange{" "}
                              </a>{" "}
                              defined under the Securities Contract (Regulation)
                              Act 1956. Furthermore, the user understands that
                              UTPL is not a SEBI registered broker/ dealer.
                            </span>
                          </li>
                          <li>
                            <span>
                              This website is merely a technology enabled
                              private window, which introduces/enables/assists
                              the users to privately negotiate to and sell{" "}
                              <a href="#">unlisted assets</a> held/owned by
                              them. This website provides information on
                              unlisted assets which are collated from publicly
                              available sources and/or regulatory filings by the
                              issuers/companies.
                            </span>
                          </li>
                          <li>
                            <span>
                              The user understands and acknowledges that any and
                              all offers/ negotiations/ acceptance of offers
                              relating to the buy and sell of unlisted assets,
                              and all agreements / contracts entered into /
                              executed in pursuance thereof, shall be between
                              the users alone. In this regard, the user
                              understands and acknowledges that UTPL does not
                              have any control over, nor does UTPL involve
                              itself in any way with, the offer, negotiation or
                              acceptance of such commercial/contractual terms
                              between the users.
                            </span>
                          </li>
                          <li>
                            <span>
                              Furthermore, the user understands and acknowledges
                              that all contracts relating to the buy and sell of
                              unlisted assets shall be executed between the
                              users alone and that UTPL shall not be a
                              contracting party to the same. In this regard, it
                              is clarified that UTPL is merely a technology
                              platform and provides a private negotiating window
                              to the users and as such, UTPL shall neither be
                              held responsible for any non-performance or breach
                              of any contract entered into between the users,
                              nor shall UTPL be required to mediate or resolve
                              any dispute or disagreement between the users.
                            </span>
                          </li>
                          <li>
                            <span>
                              To enable payment for the transaction entered into
                              between the users, and further to provide security
                              of the funds deposited by the buyer in the nature
                              of an escrow account, UTPL has partnered with a
                              SEBI registered Trustee Company and a Scheduled
                              Commercial Bank.
                            </span>
                          </li>
                          <li>
                            <span>
                              The user understands and acknowledges that UTPL is
                              neither acting as a trustee nor acting in a
                              fiduciary capacity or as a clearing house with
                              respect to the transactions undertaken between the
                              users.
                            </span>
                          </li>
                          <li>
                            <span>
                              Further, the user understands and acknowledges
                              that UTPL does not give its users any guidance,
                              advisory or recommendation with respect to any of
                              the unlisted assets whose prices are displayed on
                              www.unlistedassets.com. In this regard, the user
                              understands and acknowledges that it must
                              undertake research of the prevailing
                              market/industry situation and other relevant
                              considerations before buying or selling any of the
                              unlisted assets whose prices are displayed on the
                              website. The users further acknowledge that the
                              prices displayed are that of the users themselves
                              basis their own intent to buy or sell.
                            </span>
                          </li>
                          <li>
                            <span>
                              Furthermore, the user understands and acknowledges
                              that UTPL is merely an information provider which
                              is collated from public sources and regulatory
                              filings and as such, UTPL shall not be held liable
                              for any information available on the website.
                              Furthermore, UTPL does not implicitly or
                              explicitly support or endorse the sale or purchase
                              of any unlisted assets whose prices are displayed
                              on the website and in this regard, accepts no
                              liability for any errors or omissions, whether on
                              behalf of itself or third parties.
                            </span>
                          </li>

                          <li>
                            <span>
                              The user understands and acknowledges that UTPL
                              shall not be responsible for any loss arising out
                              of buying or selling of the unlisted assets in any
                              manner whatsoever, whether on account of any
                              change in market/industry condition(s) or economic
                              environment or for other reasons unless directly
                              attributable to the gross negligence of UTPL.{" "}
                            </span>
                          </li>

                          <li>
                            <span>
                              By accessing the website and/or any or the pages
                              hereof, the user undertakes to bind itself to
                              UTPL’s Terms of Use, Guidelines, Privacy and other
                              Policies which are made available on the platform
                              from time to time.{" "}
                            </span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-end">
                    <Buttons.SecondaryButton
                      value="I Agree"
                      style={{}}
                      onClick={() => setDisclaimer(false)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </Dialog>
        </React.Fragment>
      </div>
      <OnboardingAlertDialog dialogPage={dialogPage} onClose={closeDialog} />
    </div>
  );
}
