import React, { useCallback, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Popper from "@material-ui/core/Popper";
import Chip from "@mui/material/Chip";
import { AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
import Nologo from "./nologo.jpeg";
import "./ongoingtablecontent.scoped.css";
import Buttons from "../../Components/Buttons";
import Button from "@material-ui/core/Button";
import { apiCall } from "../../Utils/Network";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../Companies/bootstrap4/css/bootstrap.scoped.css";
import "../../Components/FilterCard/filterCard.css";
import "../Companies/style.scoped.css";
import Skeleton from "react-loading-skeleton";
import AlertIcon from "./alert.svg";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loadbutton from "../../Components/Loadbutton/Index";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import { store } from "../../Utils/uaredux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import FloatingWhatsApp from "react-floating-whatsapp";
import NewOngoingransactionTableHeader from "./newongoingtransactiontableheader";
import { numberFormat } from "../../Utils/NumberFormat";
import { getDateAndTime, getTime } from "../../Utils/DateFormat";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 1000,
    width: "border-box",
    border: "0.5px solid #E5E5E5",
    borderRadius: "4px",
  },
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    opacity: "1 !important",
    visibility: "initial !important",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },

  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
}));

export default function OngoingTransactionTableContent(props) {
  let history = useHistory();

  let loaderArray = [{}, {}];

  const [rowInformation, setRowInformation] = React.useState(loaderArray);
  const [isShown, setIsShown] = React.useState(true);
  const [isload, setLoad] = React.useState(false);
  const [Showpagination, setShowpagination] = useState(false);
  const [PaginationButtontext, setPaginationButtontext] = useState(
    "Hide pagination"
  );
  const [Filterimg, setFilterimg] = React.useState(false);
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("company");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [addHoldings, setAddHoldings] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [remove, setRemove] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [listing, setListing] = React.useState(1);
  const [openfilter, setOpenfilter] = React.useState(false);
  const [panelShow1, setPanelShow1] = React.useState(false);
  const [panelShow2, setPanelShow2] = React.useState(false);
  const [panelShow3, setPanelShow3] = React.useState(false);
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [rowIDButtonSelected, setrowIDButtonSelected] = React.useState("");
  const [alldata, setAlldatad] = React.useState(true);
  const [currentdata, setcurrentdatad] = React.useState(false);
  const [progressData, setProgressData] = useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [cancelData, setCancelData] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [searchOptions, setsearchOptions] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [wholeData, setWholeData] = useState([]);

  let searchkey = "";

  //Filter
  const [assetTypeList, setassetTypeList] = React.useState([
    { value: "Equity Shares", selet: false },
  ]);
  const [assetTypeoptions, setassetTypeoptions] = React.useState([]);
  const [assetTypeoptionsall, setassetTypeoptionsall] = React.useState([
    "Equity Shares",
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const opendeskfilter = Boolean(anchorEl);
  const id = opendeskfilter ? "filter-popper" : undefined;

  useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];

    // Add a Click Event Listener to the button
    close.addEventListener("click", () => {
      searchkey = "";
      setFilteredResults(filterData);
    });
  }, [searchkey, searchInput]);

  const callbackredux = async () => {
    try {
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData(alldata);
  }, [searchkey, searchInput]);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(callbackredux);
    return unsubscribe;
  }, []);

  /// for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const handleMobileFilterOpen = () => {
    setFilterimg(true);
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
  const getData = async function(currentdataflag) {
    managefilters();
    let response = await apiCall(
      "tradeongoingtranaction/tradeaccount/" + searchkey,
      "POST",
      reqbody
    );
    if (response.status == undefined) {
      return;
    }
    let responseJSON = await response.json();
    setWholeData(responseJSON);
    let historicaldata = [];
    let currentdata = [];
    let AllData = [];

    if (currentdataflag == true) {
      AllData = responseJSON;
      setRowInformation(AllData);

      const uniques = Object.values(
        AllData?.reduce((a, c) => {
          a[c.companyId + "|" + c.companyName] = c;

          return a;
        }, {})
      );
      setFilteredData(uniques);
    } else if (currentdataflag == false) {
      currentdata = responseJSON.filter(
        (record) =>
          record.ongoingTransactionStatus == "agreement completed" ||
          record.ongoingTransactionStatus == "agreement cancelled" ||
          record.ongoingTransactionStatus == "negotiation cancelled"
      );
      setRowInformation(currentdata);
      console.log("current data", currentdata);
    } else {
      historicaldata = responseJSON.filter(
        (record) =>
          record.ongoingTransactionStatus == "agreement completed" ||
          record.ongoingTransactionStatus == "agreement cancelled" ||
          record.ongoingTransactionStatus == "negotiation cancelled"
      );
      setRowInformation(historicaldata);
    }

    setLoad(true);
  };

  const onprogress = () => {
    let progressData = [];
    progressData = wholeData.filter(
      (record) =>
        !(record.ongoingTransactionStatus == "agreement completed") &&
        !(record.ongoingTransactionStatus == "agreement cancelled") &&
        !(record.ongoingTransactionStatus == "negotiation cancelled")
    );
    setRowInformation(progressData);
  };

  const onCancel = () => {
    let cancelData = [];
    cancelData = wholeData.filter((r) => r.overallStatusDetail === null);
    setRowInformation(cancelData);
  };

  const deleterow = async function(id) {
    setLoading(true);
    try {
      let response = await apiCall(`myholding/${id}`, "DELETE");
      if (response.status == undefined) {
        return;
      }
      await getData();
      setOpen(false);
      setLoading(false);
    } catch (e) {}
  };

  let assetTypeChange = (e) => {
    let index;
    if (e.target.checked) {
      assetTypeoptions.push(e.target.value);
    } else {
      index = assetTypeoptions.indexOf(e.target.value);
      assetTypeoptions.splice(index, 1);
    }
  };

  let applyFilter1 = (e) => {
    getData();
    if (anchorEl) {
      // alert();
      setAnchorEl(null);
    }
  };

  const handleFilterClose = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleKeypress = (e) => {
    if (e.code === "Enter") {
      searchkey = e.target.value;
      //handleSubmit();
      if (searchkey == "") {
        searchkey = "nothing";
      }

      getData(currentdata);
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = filterData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(filterData);
    }
  };

  let RenderedTableRow = () => {
    return (
      <>
        {searchInput.length > 1
          ? filteredResults.map((i, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <Table>
                      {sortedRowInformation(
                        rowInformation,
                        getComparator(orderDirection, valueToOrderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .filter((c) => c.companyName === i.companyName)
                        .map((holding, index) => {
                          return (
                            <>
                              <TableRow style={{ borderStyle: "hidden" }}>
                                <TableCell style={{ width: "150px" }}>
                                  {index === 0 ? (
                                    <div
                                      className="company_cell1 "
                                      style={{ width: "150px" }}
                                    >
                                      <div className="ongoing-logo-img">
                                        {isload ? (
                                          <div className="ongoing-logo">
                                            {" "}
                                            <img
                                              src={
                                                holding.companyLogo ==
                                                  undefined ||
                                                holding.companyLogo == ""
                                                  ? Nologo
                                                  : holding.companyLogo
                                              }
                                              className="product-company-logo"
                                            />{" "}
                                          </div>
                                        ) : (
                                          <Skeleton
                                            className="ml-2"
                                            width={100}
                                            height={35}
                                          />
                                        )}
                                      </div>
                                      <div
                                        className="company_details1 d-flex align-items-center"
                                        style={{ marginLeft: "10px" }}
                                      >
                                        {isload ? (
                                          <>
                                            <h6 className="company_name m-0 text-default-secoundary text_limit">
                                              <b>{holding.companyName}</b>
                                            </h6>
                                          </>
                                        ) : (
                                          <Skeleton width={100} />
                                        )}
                                        <BootstrapTooltip
                                          title={
                                            <p className="mb-0">
                                              <b>{holding.companyName}</b>
                                            </p>
                                          }
                                          placement="right"
                                          arrow
                                          enterTouchDelay={0}
                                        >
                                          <span className="ml-1">
                                            <AiOutlineExclamationCircle />
                                          </span>
                                        </BootstrapTooltip>
                                      </div>
                                    </div>
                                  ) : null}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "100px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {holding.action.charAt(0).toUpperCase() +
                                        holding.action.slice(1)}
                                    </>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "175px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>{"TXN" + holding.id}</>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>

                                <TableCell
                                  style={{
                                    width: "150px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>{holding.agreedQty}</>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "100px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {numberFormat(
                                        holding.agreedQty * holding.agreedPrice
                                      )}
                                    </>
                                  ) : (
                                    <Skeleton />
                                  )}
                                </TableCell>

                                <TableCell
                                  style={{
                                    width: "150px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {getDateAndTime(holding.updateDate)}{" "}
                                      <br />
                                      {getTime(holding.updateDate)}
                                    </>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="d-flex align-items-center">
                                    {isload ? (
                                      <>
                                        {holding.overallStatusDetail ==
                                          undefined ||
                                        holding.overallStatusDetail == "" ? (
                                          <>
                                            <div className="">
                                              <div className="d-flex align-items-center">
                                                <button className="btn btn-expired">
                                                  Status Not Available
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            {holding.overallStatusDetail ===
                                            "Transaction is completed" ? (
                                              <div className="">
                                                <div className="d-flex align-items-center">
                                                  <button className="btn btn-inprogess">
                                                    Transaction Complete
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="">
                                                <div className="d-flex align-items-center">
                                                  <button className="btn btn-progress">
                                                    {
                                                      holding.overallStatusDetail
                                                    }
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <Skeleton width={100} />
                                    )}
                                    <BootstrapTooltip
                                      title={
                                        <>
                                          <div className="d-flex justify-content-between align-items-center p-2">
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Other Party ID:
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>
                                                  {
                                                    holding.onboardingOtherPartyId
                                                  }
                                                </b>
                                              </p>
                                            </div>
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Shares Traded:
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>{holding.agreedQty}</b>
                                              </p>
                                            </div>
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Date & Time
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>
                                                  {getDateAndTime(
                                                    holding.updateDate
                                                  )}{" "}
                                                  <br />
                                                  {getTime(holding.updateDate)}
                                                </b>
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      }
                                      arrow
                                      placement="bottom-end"
                                    >
                                      <span className="eye">
                                        <AiOutlineEye />
                                      </span>
                                    </BootstrapTooltip>
                                  </div>
                                </TableCell>

                                <TableCell
                                  onMouseEnter={() => setIsShown(true)}
                                  onMouseLeave={() => setIsShown(true)}
                                >
                                  <span>
                                    {isShown === true &&
                                    (holding.ongoingTransactionStatus ===
                                      "inprogress" ||
                                      holding.ongoingTransactionStatus ===
                                        "Negotiation Cancelled") ? (
                                      <>
                                        {isload ? (
                                          <>
                                            <div className="">
                                              <div className="d-flex align-items-center">
                                                <button className="btn btn-inprogess">
                                                  In Progress
                                                </button>
                                                <img
                                                  src={AlertIcon}
                                                  className="ml-1"
                                                  width="20"
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <Skeleton width={100} />
                                        )}
                                        <div className="See-Negotiatin-btn">
                                          {isload ? (
                                            <>
                                              {loadingbutton &&
                                              holding.id ==
                                                rowIDButtonSelected ? (
                                                <Loadbutton />
                                              ) : (
                                                <Buttons.PrimaryButton
                                                  value="See Details"
                                                  style={{
                                                    fontSize: "10px",
                                                  }}
                                                  onClick={() => {
                                                    setrowIDButtonSelected(
                                                      holding.id
                                                    );
                                                    setLoadingbutton(true);

                                                    history.push({
                                                      pathname: "/transactions",
                                                      state: {
                                                        selectedTrade: "",
                                                        selectedongoingtxn: holding,
                                                      },
                                                    });
                                                  }}
                                                />
                                              )}
                                            </>
                                          ) : (
                                            <Skeleton width={100} />
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="">
                                          {isload ? (
                                            <>
                                              <div className="d-flex align-items-center">
                                                {
                                                  <Buttons.SecondaryButton
                                                    value="View Details"
                                                    style={{
                                                      fontSize: "10px",
                                                    }}
                                                    onClick={() => {
                                                      history.push({
                                                        pathname:
                                                          "/buyeragreement",
                                                        state: {
                                                          selectedTrade: "",
                                                          selectedongoingtxn: holding,
                                                        },
                                                      });
                                                    }}
                                                  />
                                                }
                                              </div>
                                            </>
                                          ) : (
                                            <Skeleton width={100} />
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </span>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </Table>
                  </TableCell>
                </TableRow>
              </>
            ))
          : filterData.map((i, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <Table>
                      {sortedRowInformation(
                        rowInformation,
                        getComparator(orderDirection, valueToOrderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .filter((c) => c.companyName === i.companyName)
                        .map((holding, index) => {
                          return (
                            <>
                              <TableRow style={{ borderStyle: "hidden" }}>
                                <TableCell style={{ width: "150px" }}>
                                  {index === 0 ? (
                                    <div
                                      className="company_cell1 "
                                      style={{ width: "150px" }}
                                    >
                                      <div className="ongoing-logo-img">
                                        {isload ? (
                                          <div className="ongoing-logo">
                                            {" "}
                                            <img
                                              src={
                                                holding.companyLogo ==
                                                  undefined ||
                                                holding.companyLogo == ""
                                                  ? Nologo
                                                  : holding.companyLogo
                                              }
                                              className="product-company-logo"
                                            />{" "}
                                          </div>
                                        ) : (
                                          <Skeleton
                                            className="ml-2"
                                            width={100}
                                            height={35}
                                          />
                                        )}
                                      </div>
                                      <div
                                        className="company_details1 d-flex align-items-center"
                                        style={{ marginLeft: "10px" }}
                                      >
                                        {isload ? (
                                          <>
                                            <h6 className="company_name m-0 text-default-secoundary text_limit">
                                              <b>{holding.companyName}</b>
                                            </h6>
                                          </>
                                        ) : (
                                          <Skeleton width={100} />
                                        )}
                                        <BootstrapTooltip
                                          title={
                                            <p className="mb-0">
                                              <b>{holding.companyName}</b>
                                            </p>
                                          }
                                          placement="right"
                                          arrow
                                          enterTouchDelay={0}
                                        >
                                          <span className="ml-1">
                                            <AiOutlineExclamationCircle />
                                          </span>
                                        </BootstrapTooltip>
                                      </div>
                                    </div>
                                  ) : null}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "100px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {holding.action.charAt(0).toUpperCase() +
                                        holding.action.slice(1)}
                                    </>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "175px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>{"TXN" + holding.id}</>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>

                                <TableCell
                                  style={{
                                    width: "150px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>{holding.agreedQty}</>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "100px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {numberFormat(
                                        holding.agreedQty * holding.agreedPrice
                                      )}
                                    </>
                                  ) : (
                                    <Skeleton />
                                  )}
                                </TableCell>

                                <TableCell
                                  style={{
                                    width: "150px",
                                    textAlign: "center",
                                  }}
                                >
                                  {isload ? (
                                    <>
                                      {getDateAndTime(holding.updateDate)}{" "}
                                      <br />
                                      {getTime(holding.updateDate)}
                                    </>
                                  ) : (
                                    <Skeleton width={100} />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="d-flex align-items-center">
                                    {isload ? (
                                      <>
                                        {holding.overallStatusDetail ==
                                          undefined ||
                                        holding.overallStatusDetail == "" ? (
                                          <>
                                            <div className="">
                                              <div className="d-flex align-items-center">
                                                <button className="btn btn-expired">
                                                  Status Not Available
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            {holding.overallStatusDetail ===
                                            "Transaction is completed" ? (
                                              <div className="">
                                                <div className="d-flex align-items-center">
                                                  <button className="btn btn-inprogess">
                                                    Transaction Complete
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="">
                                                <div className="d-flex align-items-center">
                                                  <button className="btn btn-progress">
                                                    {
                                                      holding.overallStatusDetail
                                                    }
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <Skeleton width={100} />
                                    )}
                                    <BootstrapTooltip
                                      title={
                                        <>
                                          <div className="d-flex justify-content-between align-items-center p-2">
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Other Party ID:
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>
                                                  {
                                                    holding.onboardingOtherPartyId
                                                  }
                                                </b>
                                              </p>
                                            </div>
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Shares Traded:
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>{holding.agreedQty}</b>
                                              </p>
                                            </div>
                                            <div className="d-flex flex-column px-2">
                                              <p className="m-0 text-center mb-1">
                                                Date & Time
                                              </p>
                                              <p className="m-0 text-center">
                                                <b>{holding.updateDate}</b>
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      }
                                      arrow
                                      placement="bottom-end"
                                    >
                                      <span className="eye">
                                        <AiOutlineEye />
                                      </span>
                                    </BootstrapTooltip>
                                  </div>
                                </TableCell>

                                <TableCell
                                  onMouseEnter={() => setIsShown(true)}
                                  onMouseLeave={() => setIsShown(true)}
                                >
                                  <span>
                                    {isShown === true &&
                                    (holding.ongoingTransactionStatus ===
                                      "inprogress" ||
                                      holding.ongoingTransactionStatus ===
                                        "Negotiation Cancelled") ? (
                                      <>
                                        {isload ? (
                                          <>
                                            <div className="">
                                              <div className="d-flex align-items-center">
                                                <button className="btn btn-inprogess">
                                                  In Progress
                                                </button>
                                                <img
                                                  src={AlertIcon}
                                                  className="ml-1"
                                                  width="20"
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <Skeleton width={100} />
                                        )}
                                        <div className="See-Negotiatin-btn">
                                          {isload ? (
                                            <>
                                              {loadingbutton &&
                                              holding.id ==
                                                rowIDButtonSelected ? (
                                                <Loadbutton />
                                              ) : (
                                                <Buttons.PrimaryButton
                                                  value="See Details"
                                                  style={{
                                                    fontSize: "10px",
                                                  }}
                                                  onClick={() => {
                                                    setrowIDButtonSelected(
                                                      holding.id
                                                    );
                                                    setLoadingbutton(true);

                                                    history.push({
                                                      pathname: "/transactions",
                                                      state: {
                                                        selectedTrade: "",
                                                        selectedongoingtxn: holding,
                                                      },
                                                    });
                                                  }}
                                                />
                                              )}
                                            </>
                                          ) : (
                                            <Skeleton width={100} />
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="">
                                          {isload ? (
                                            <>
                                              <div className="d-flex align-items-center">
                                                {
                                                  <Buttons.SecondaryButton
                                                    value="View Details"
                                                    style={{
                                                      fontSize: "10px",
                                                    }}
                                                    onClick={() => {
                                                      history.push({
                                                        pathname:
                                                          "/buyeragreement",
                                                        state: {
                                                          selectedTrade: "",
                                                          selectedongoingtxn: holding,
                                                        },
                                                      });
                                                    }}
                                                  />
                                                }
                                              </div>
                                            </>
                                          ) : (
                                            <Skeleton width={100} />
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </span>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </Table>
                  </TableCell>
                </TableRow>
              </>
            ))}
      </>
    );
  };

  let FilterInner = () => {
    return (
      <>
        <div className="bg-white p-2 rounded custom-filter border-0 ">
          <div className="filter-top-action border-bottom py-2 pb-2 d-flex align-items-center justify-content-between">
            <div className="cursor-pointer w-100 dbmn">
              <CloseIcon className="dbmn" onClick={handleFilterClose} />
            </div>
            <div className="w-100">
              <h6 className="text-default">
                <b>Filter</b>
              </h6>
            </div>
            <div className="cursor-pointer w-100">
              <h6 className="text-right text-small">Clear All</h6>
            </div>
          </div>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ControlPointIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="border-0">Asset Type</Typography>
            </AccordionSummary>
            <div className="px-1 accordion-details">
              {assetTypeList &&
                assetTypeList.map((item, index) => {
                  return (
                    <div className="filter-checkbox" key={index}>
                      <input
                        key={index}
                        class="styled-checkbox-primary"
                        type="checkbox"
                        name="sector_value styled-checkbox-primary"
                        id={item.value}
                        checked={item.selet}
                        value={item.value}
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            assetTypeList[
                              assetTypeList.indexOf(item)
                            ].selet = true;

                            // document.getElementById(item.value).checked = true;
                          } else {
                            assetTypeList[
                              assetTypeList.indexOf(item)
                            ].selet = false;
                            // document.getElementById(item.value).checked = false;
                          }

                          setassetTypeList([...assetTypeList]);

                          assetTypeChange(e);
                        }}
                      />

                      <label className="text-small" for={item.value}>
                        {item.value}
                      </label>
                    </div>
                  );
                })}
            </div>
          </Accordion>

          <div className="filter-action-bottom m-2">
            <Buttons.PrimaryButton
              value="Apply"
              style={{ width: "100%" }}
              onClick={applyFilter1}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mt-0 mb-5">
        <div className="my-holdings-page row">
          <React.Fragment>
            <div className="col-md-12 col-12 pr-1 pl-1">
              <div className="table-container">
                <div className="dbmn search-area">
                  <div className="Table_title row mx-0 overflow-hidden">
                    <div
                      className="col-md-6 d-flex align-items-center justify-content-start w-100"
                      onClick={handleFilterClose}
                    >
                      <h6 className="mb-0 mr-3">
                        <strong>Ongoing Transactions </strong>
                      </h6>
                      <div class="form-group has-search mb-0 small-icon w-50">
                        <div className="inventory-search-icon form-control-feedback">
                          <SearchIcon />
                        </div>
                        <Autocomplete
                          style={{ width: 500 }}
                          freeSolo
                          options={searchOptions}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="inventory-search-bar"
                              placeholder="Search Company Name"
                              onChange={(e) => searchItems(e.target.value)}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <Popper
                    id={id}
                    open={opendeskfilter}
                    anchorEl={anchorEl}
                    style={{ zIndex: "999" }}
                  >
                    <FilterInner />
                  </Popper>
                </div>
                <div className="col-md-6 px-0 d-flex align-items-center marketplace-Chip-main mt-3 mobile_tab">
                  <div className="d-flex marketplace-Chips m-0">
                    <Chip
                      label="All"
                      variant="outlined"
                      className={`${
                        selectedTab == 1 ? "active_chip" : ""
                      } chip px-2 mx-1`}
                      onClick={() => {
                        setSelectedTab(1);
                        setAlldatad(true);
                        setcurrentdatad(false);
                        setCompleted(false);
                        getData(true);
                      }}
                    />

                    <Chip
                      label="In-Progress"
                      variant="outlined"
                      className={`${
                        selectedTab == 2 ? "active_chip" : ""
                      } chip px-2 mx-1`}
                      onClick={() => {
                        setSelectedTab(2);
                        onprogress();
                      }}
                    />

                    <Chip
                      label="Completed"
                      variant="outlined"
                      className={`${
                        selectedTab == 3 ? "active_chip" : ""
                      } chip px-2 mx-1`}
                      onClick={() => {
                        setSelectedTab(3);
                        setCompleted(true);
                        setcurrentdatad(false);
                        setAlldatad(false);
                        getData(null);
                      }}
                    />

                    <Chip
                      label="Cancelled"
                      variant="outlined"
                      className={`${
                        selectedTab == 4 ? "active_chip" : ""
                      } chip px-2 mx-1`}
                      onClick={() => {
                        setSelectedTab(4);
                        onCancel();
                      }}
                    />
                  </div>
                </div>

                {/* search bar mobile view  */}
                <div className="dnmb search-area">
                  <div className="Table_title row mx-0 overflow-hidden">
                    <div
                      className="col-md-6 col-12 d-flex align-items-center justify-content-start w-100"
                      onClick={handleFilterClose}
                    >
                      <div class="form-group has-search mb-0  small-icon">
                        <div className="inventory-search-icon form-control-feedback">
                          <SearchIcon />
                        </div>
                        <Autocomplete
                          style={{ width: 500 }}
                          freeSolo
                          options={searchOptions}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="inventory-search-bar"
                              placeholder="Search Company Name"
                              onChange={(e) => searchItems(e.target.value)}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="MarketplaceTable-actions d-none">
                    <div class="form-group custom-search mb-0 ml-3">
                      <FontAwesomeIcon
                        className="form-control-feedback"
                        icon={faSearch}
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search here for company name, commodity name..."
                        onKeyPress={handleKeypress}
                      />
                    </div>

                    <Buttons.SecondaryButton
                      className="btn btn-secoundary-default mx-3"
                      value="Transaction History"
                      id="add-holdings-button"
                      onClick={() => {
                        history.push("/transactions_history");
                      }}
                    />
                  </div>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openfilter}
                    onClose={""}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <FilterInner />
                      </div>
                    </Fade>
                  </Modal>
                </div>
                {addHoldings ? null : (
                  <div className="mt-3 myholding-right-sec ongoing-transaction-table-section">
                    <TableContainer
                      className={classes.container}
                      onClick={handleFilterClose}
                      id="scroll-default"
                    >
                      <NewOngoingransactionTableHeader />

                      <Table>
                        <RenderedTableRow />
                      </Table>
                    </TableContainer>
                  </div>
                )}

                {/* =============== pagination =========== */}
                <div className="d-flex align-items-center justify-content-between py-3">
                  <Buttons.SecondaryButton
                    value={PaginationButtontext}
                    id="add-holdings-button"
                    onClick={PaginationShow}
                  />
                  <div>
                    {Showpagination ? null : (
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rowInformation.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    )}
                  </div>
                </div>

                <Dialog
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  <div style={{ width: "300px", backgroundColor: "white" }}>
                    {loading ? (
                      <p style={{ paddingLeft: "120px" }}> Loading...</p>
                    ) : (
                      <>
                        <DialogTitle id="alert-dialog-title">
                          {"Do You Want To Delete?"}
                        </DialogTitle>

                        <DialogActions>
                          <Button
                            onClick={() => {
                              deleterow(remove);
                            }}
                            color="primary"
                          >
                            YES
                          </Button>
                          <Button
                            onClick={() => {
                              setOpen(false);
                            }}
                            color="primary"
                          >
                            NO
                          </Button>
                        </DialogActions>
                      </>
                    )}
                  </div>
                </Dialog>
              </div>
            </div>
          </React.Fragment>
          <FloatingWhatsApp
            phoneNumber="+919990862220"
            accountName="Unlisted Assets"
            chatMessage="Hello there! 🤝  How can we help?"
            placeholder="Type a message.."
            notificationSound="true"
          />
        </div>
      </div>
    </>
  );
}
