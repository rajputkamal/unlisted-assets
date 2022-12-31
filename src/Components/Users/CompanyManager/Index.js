import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './UserHeader';
import { makeStyles } from '@material-ui/core/styles';
import "../../../Components/FilterCard/filterCard.css"
import Buttons from "../../../Components/Buttons"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './Index.css'
import UserIcon from './user.png';
import { apiCall, apiCall12, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from '@material-ui/icons/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loadbutton from '../../Loadbutton/Index';
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { successToast, errorToast } from "../../../../src/Components/Toast/index";
import CompanyCompetitorsManager from "./CompanyCompetitorsManager/Index";
import CompanyFinancialsManager from "./CompanyFinancialsManager/Index";
import CompanyKeyProductsImagesManager from "./CompanyKeyProductsImagesManager/Index";
import CompanyManagementManager from "./CompanyManagementManager/Index";
import CompanyMilestoneManager from "./CompanyMilestoneManager/Index";
import CompanyShareHoldersManager from "./CompanyShareHoldersManager/Index";
import CompanySummaryRiskManager from "./CompanySummaryRiskManager/Index";
import CompanyRecentNewsManager from "./CompanyRecentNewsManager/Index";
import CompanyInstaManager from "./CompanyInstaManager/Index";
import CompanyStatusManager from "./CompanyStatusManager/Index";
import ChoosePhoto from "./choosePhoto";
import ChoosePhoto1 from "./choosePhoto";
import loadingImg from './loading.gif'
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@mui/material/Chip';


import {
    AccountCircle as AccountCircleIcon,
    Clear as ClearIcon,
} from "@material-ui/icons";
import Profileuserpiclogo from "./Profileuserpiclogo.png"

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 1000,
        width: "border-box",
        border: "1px solid #CFCBCF",
        borderRadius: "10px"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "scroll"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 1),
        borderRadius: "10px",
        // maxWidth: "500px",
        // minWidth: "400px",
        // margin: "100vh auto 0px auto",
        margin: '0 auto',
        width: '90%'

    },
}));
export default function InventoryTableContent(props) { 

    let history = useHistory();
    const classes = useStyles();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('company');
    const [isload, setLoad] = React.useState(true);
    const [isloading, setLoading] = React.useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editedData, setEditedData] = React.useState({});
    
    // Handle Add Reacord  Modal
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [rowUser, setRowUser] = React.useState([])

     // view all list Modal
     const [openViewAllModal, setOpenViewAllModal] = useState(false);

    // Handle Edit Record Modal
    const [OpenKeyProductImageModal, setOpenKeyProductImageModal] = React.useState(false);
    const [OpenManagementModal, setOpenManagementModal] = React.useState(false);
    const [OpenFinalcialModal, setOpenFinalcialModal] = React.useState(false);
    const [OpenSummaryRiskModal, setOpenSummaryRiskModal] = React.useState(false);
    const [OpenShareHolderModal, setOpenShareHolderModal] = React.useState(false);
    const [OpenCompetitorModal, setOpenCompetitorModal] = React.useState(false);
    const [OpenMilestoneModal, setOpenMilestoneModal] = React.useState(false);
    const [OpenRecentNewsModal, setOpenRecentNewsModal] = React.useState(false);
    const [OpenInstaModal, setOpenInstaModal] = React.useState(false);
    const [OpenCompanyStatusModal, setOpenCompanyStatusModal] = React.useState(false);
    const [hasmore, sethasmore] = React.useState(true)

    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openPhotoModal, setOpenPhotoModal] = React.useState(false);
    const [openReportModal, setOpenReportModal] = React.useState(false);

    //Handle Delete Record Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [isLoadingbtn, setLoadingbtn] = useState(false);

    const [allSectors, setallSectors] = React.useState([])
    const [selectedSector, setselectedSector] = React.useState('')

    const [allTypes, setallTypes] = React.useState([])
    const [selectedType, setselectedType] = React.useState('')

    const [allFundingSeries, setallFundingSeries] = React.useState([])
    const [selectedFundingSeries, setselectedFundingSeries] = React.useState('')
    const [pageNum, setpageNum] = React.useState(0)
    const [pagesize, setpagesize] = React.useState(20)

    //popover state
    const [anchorEl, setAnchorEl] = React.useState(null);

    let searchkey = ''

    const handleChange1 = (rowObject) => {
        // editedData[field] = val;
        // setEditedData({ ...editedData });
        setEditedData()
    };

    async function onFileSelect(file) {

        // const img = await convertImgTOBase64(file);
        // handleChange("logo", img)
        updateCompanyLogo(file)
    }

    async function onFileSelectReport(file) {
        const img = await convertImgTOBase64(file);
        handleChange("downloadReport", img)
        getAllInventoryupdate()
    }

    function convertImgTOBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    }

    const handleChange = (field, val) => {
        editedData[field] = val;
        setEditedData({ ...editedData });
    };

    React.useEffect(() => {
        // const timer = setTimeout(() => {
        //     setLoad(true);
        //   }, 2000);
        //   return () => clearTimeout(timer);
    }, []);


    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    React.useEffect(() => {
        const close = document.getElementsByClassName(
            "MuiAutocomplete-clearIndicator"
        )[0];

        // Add a Click Event Listener to the button
        close.addEventListener("click", () => {
            searchkey = ''
            getAllInventoryget(0)
        });

    }, []);

    React.useEffect(() => {
        getSearchOption()
        getAllInventoryget(0)
    }, []);

    // search bar code start from here
    const [searchOptions, setsearchOptions] = useState([])

    const getSearchOption = async function () {
        let response1 = await apiCall("company/allcompaniesnames", 'GET', '', history)
        if (response1.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON1 = await response1.json();
        setsearchOptions(responseJSON1.map(ssa => ssa.name))
    }
    // search bar code end here

    const download1 = async (event, filename, text) => {

        event.preventDefault()

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const getAllInventoryget = async function (pageNum1) {

        if (pageNum1 != undefined && pageNum1 == 0) {
            setpageNum(0)
            setRowUser([])
        } else {
            pageNum1 = pageNum
        }
        setLoading(true)
        let response1 = await apiCall12("companies/search/findAllCompaniesSearchAdmin?searchKey=" + searchkey + "&page=" + pageNum1 + "&size=" + pagesize, 'GET', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        if (pageNum1 == 0) {
            setRowUser(responseJSON1._embedded.companies)
        } else {
            responseJSON1._embedded.companies.map(record => rowUser.push(record));
            setRowUser([...rowUser])
        }

        setpageNum(pageNum + 1)

        if ((responseJSON1._embedded.companies.length % pagesize) != 0) {
            sethasmore(false)
        } else {
            sethasmore(true)
        }
        setLoading(false)

        if (pageNum == 0) {
            let response2 = await apiCall("sectors", 'GET', '', history)
            let responseJSON2 = await response2.json();
            let responseJSON21 = responseJSON2._embedded.sectors
            let sectors = responseJSON21.map((sector) => { return { value: sector.id, label: sector.label } })
            setallSectors(sectors)

            let response3 = await apiCall("fundingSeries", 'GET', '', history)
            let responseJSON3 = await response3.json();
            let responseJSON31 = responseJSON3._embedded.fundingSeries
            let fundingSeries = responseJSON31.map((fs) => { return { value: fs.id, label: fs.label } })
            setallFundingSeries(fundingSeries)

            let response4 = await apiCall("companyTypes", 'GET', '', history)
            let responseJSON4 = await response4.json();
            let responseJSON41 = responseJSON4._embedded.companyTypes
            let types = responseJSON41.map((type) => { return { value: type.id, label: type.label } })
            setallTypes(types)
            setLoading(false)
        }
    }

    const getAllInventoryupdate = async function () {
        handleChange("sector", selectedSector.label)
        handleChange("series_of_funding", selectedFundingSeries.label)
        handleChange("type", selectedType.label)

        let response1 = await apiCall("companies/" + editedData.id, 'PUT', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)

        if (response1.status === 200) {
            successToast("Success", "Edited successfully!!")
            getAllInventoryget()

        } else {
            errorToast("Invalid", "Not Edited...try after some time or contact Admin");
        }
    }

    // On file upload (click the upload button)
    let updateCompanyLogo = async (logo) => {



        const companyFormData = new FormData();

        // Update the formData object
        companyFormData.append(
            "file",
            logo
        );

        let response = await apiCall1("storage/uploadCompanyLogo/" + editedData.slug, "POST", companyFormData, history)

        // console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Some Problem Occured, try again or contact later!!");
            return;
        } else if (response.status === 200) {
            successToast("Success", "Logo Uploaded Successfully!!")
        }
    };

    const getAllInventorydelete = async function (id) {
        let response1 = await apiCall("companies/" + editedData.id, 'DELETE', '', history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 204) {
            successToast("Success", "Deleted successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Deleted...try after some time or contact Admin");

        }
    }

    const getAllInventoryadd = async function () {

        handleChange("sector", selectedSector.label)
        handleChange("series_of_funding", selectedFundingSeries.label)
        handleChange("type", selectedType.label)

        let response1 = await apiCall("companies", 'POST', editedData, history)
        // console.log(response1)
        let responseJSON1 = await response1.json();
        // console.log(responseJSON1)
        if (response1.status === 201) {
            successToast("Success", "Added successfully!!")
            getAllInventoryget()
        } else {
            errorToast("Invalid", "Not Added...try after some time or contact Admin");

        }
    }

    const handleOpenLogoModal = (userobject) => {
        setEditedData(userobject)
        setOpenPhotoModal(true);
        setAnchorEl(null)
    };

    const handleCloseLogoModal = () => {
        setOpenPhotoModal(false);
    };

    const handleOpenReportModal = (userobject) => {
        setEditedData(userobject)
        setOpenReportModal(true);
        setAnchorEl(null)
    };

    const handleCloseReportModal = () => {
        setOpenReportModal(false);
    };

    const viewAllRecordModal = (userobject) => {
        setEditedData(userobject);
        setOpenViewAllModal(true);
    }
    const handleOpenInstaModal = (userobject) => {
        setEditedData(userobject)
        setOpenInstaModal(true);
        setAnchorEl(null)
    };

    const handleCloseInstaModal = () => {
        setOpenInstaModal(false);
    };

    const handleOpenCompanyStatusModal = (userobject) => {
        setEditedData(userobject)
        setOpenCompanyStatusModal(true);
        setAnchorEl(null)
    };

    const handleCloseCompanyStatusModal = () => {
        setOpenCompanyStatusModal(false);
    };


    const handleOpenKeyProductImageModal = (userobject) => {
        setEditedData(userobject)
        setOpenKeyProductImageModal(true);
        setAnchorEl(null)
    };

    const handleCloseKeyProductImageModal = () => {
        setOpenKeyProductImageModal(false);
    };

    const handleOpenManagementModal = (userobject) => {
        setEditedData(userobject)
        setOpenManagementModal(true);
        setAnchorEl(null)
    };

    const handleCloseManagementModal = () => {
        setOpenManagementModal(false);
    };
    const handleOpenFinalcialModal = (userobject) => {
        setEditedData(userobject)
        setOpenFinalcialModal(true);
        setAnchorEl(null)
    };

    const handleCloseFinalcialModal = () => {
        setOpenFinalcialModal(false);
    };
    const handleOpenSummaryRiskModal = (userobject) => {
        setEditedData(userobject)
        setOpenSummaryRiskModal(true);
        setAnchorEl(null)
    };

    const handleCloseSummaryRiskModal = () => {
        setOpenSummaryRiskModal(false);
    };

    const handleOpenShareHolderModal = (userobject) => {
        setEditedData(userobject)
        setOpenShareHolderModal(true);
        setAnchorEl(null)
    };

    const handleCloseShareHolderModal = () => {
        setOpenShareHolderModal(false);
    };

    const handleOpenCompetitorModal = (userobject) => {
        setEditedData(userobject)
        setOpenCompetitorModal(true);
        setAnchorEl(null)
    };

    const handleCloseCompetitorModal = () => {
        setOpenCompetitorModal(false);
    };

    const handleOpenMilestoneModal = (userobject) => {
        setEditedData(userobject)
        setOpenMilestoneModal(true);
        setAnchorEl(null)
    };

    const handleCloseMilestoneModal = () => {
        setOpenMilestoneModal(false);
    };

    const handleOpenRecentNewsModal = (userobject) => {
        setEditedData(userobject)
        setOpenRecentNewsModal(true);
        setAnchorEl(null)
    };

    const handleCloseRecentNewsModal = () => {
        setOpenRecentNewsModal(false);
    };

    const handleOpenEditModal = (userobject) => {
        setEditedData(userobject)
        setselectedSector({ value: userobject.sector, label: userobject.sector })
        setselectedFundingSeries({ value: userobject.series_of_funding, label: userobject.series_of_funding })
        setselectedType({ value: userobject.type, label: userobject.type })
        setOpenEditModal(true);
       
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleOpenAddModal = (userobject) => {
        setEditedData(userobject)
        setselectedSector()
        setselectedFundingSeries()
        setselectedType()
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const handleOpenDeleteModal = (userobject) => {
        setEditedData(userobject)
        setOpenDeleteModal(true);

    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };


    const handleSelect = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
       if(searchkey == e.target.value) {
            //do nothing
            return
        }
        if(searchOptions.includes(e.target.value)) {
            searchkey = e.target.value
            //handleSubmit();
            // console.log("aaaaaasss112" + searchkey)
            setpageNum(0)
            getAllInventoryget(0)
        }
    };

    const handleKeypress = e => {
        //e.preventDefault();
        //it triggers by pressing the enter key
        // console.log("aaaaaasss"+e.keyCode+e.code)

        if (e.code === "Enter") {
            searchkey = e.target.value
            //handleSubmit();
            console.log("aaaaaasss11" + searchkey)
            setpageNum(0)
            getAllInventoryget(0)
            e.preventDefault();
        }

    };

    const fetchMoreData = () => {
        getAllInventoryget()
    };

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

    return (


        <div className="user_table_section">

            <div className="dbmn">
                <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <h5 className='main-heading'><b>Company Manager</b></h5>
                    </div>
                </div>
                <div className="Table_title mt-1">
                    <div className="d-flex align-items-center justify-content-between w-100" >
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
                                                                onSelect={(event, value) => handleSelect(event)}
                                                                className="inventory-search-bar"
                                                                placeholder="Search Company Name, CIN or ISIN"
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
                                <div className='col-md-4 col-12'>
                                    <div className="text-right mb-2">
                                        <button className="btn btn-primary-default" onClick={() => handleOpenAddModal({})}>
                                            <AddIcon style={{ width: "25px", height: "25px" }} /> Add New Record
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="table-container">
                <div className="userTable">
                    <TableContainer className={classes.container}>
                        <Table stickyHeader className="bg-white">
                            <InfiniteScroll
                                dataLength={rowUser.length}
                                next={fetchMoreData}
                                hasMore={hasmore}
                                loader={<>
                                    <Box className="d-flex justify-content-center align-items-center">
                                        <CircularProgress />
                                    </Box></>}
                                endMessage={
                                    <p className="text-center py-4">
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <TableHeader valueToOrderBy={valueToOrderBy} orderDirection={orderDirection} handleRequestSort={handleRequestSort} />
                                {
                                    rowUser.map(
                                        (user, index) => (
                                            <TableRow key={index} id={user.id}>
                                                <TableCell>
                                                    {isload ?
                                                        <div className="UserProfile">
                                                            <div className="UserIcon">
                                                                <img src={user.logo} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <Skeleton circle={true} height={50} width={50} />
                                                    }
                                                </TableCell>
                                                <TableCell>{isload ? <> {user.id} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.name} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {(user.slug).substr(0, 20)} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.isin} </> : <Skeleton width={100} />}</TableCell>

                                                <TableCell>{isload ? <> {user.legalName} </> : <Skeleton width={100} />}</TableCell>
                                                {/* <TableCell>{isload ? <> {user.legalWebsiteLink} </> : <Skeleton width={100} />}</TableCell> */}
                                                {/*<TableCell>{ isload ? <> {user.logo} </> : <Skeleton width={100} /> }</TableCell>*/}
                                                {/* <TableCell>{isload ? <> {(user.description == undefined) ? "" : user.description.substring(0, 12)}... </> : <Skeleton width={100} />}</TableCell> */}

                                                {/* <TableCell>{isload ? <> {(user.keyProductsSegmentsDescription == undefined) ? "" : user.keyProductsSegmentsDescription.substring(0, 12)}... </> : <Skeleton width={100} />}</TableCell> */}
                                                {/* <TableCell>{isload ? <> {user.incorporationDate} </> : <Skeleton width={100} />}</TableCell> */}
                                                {/* <TableCell>{isload ? <> {user.type} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.address} </> : <Skeleton width={100} />}</TableCell> */}


                                                {/* <TableCell>{isload ? <> {user.cin} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.pan} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.gst_registration} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.temporarilyActive + ""} </> : <Skeleton width={100} />}</TableCell>

                                                <TableCell>{isload ? <> {user.sector} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.series_of_funding} </> : <Skeleton width={100} />}</TableCell> */}
                                                {/* <TableCell>{isload ? <> {user.lastFundRaisingValuation} </> : <Skeleton width={100} />}</TableCell> */}
                                                {/* <TableCell>{isload ? <> {user.ordering} </> : <Skeleton width={100} />}</TableCell> */}
                                                {/* <TableCell>{isload ? <> {user.uaHide + ""} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.approachingIPO + ""} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.acquired + ""} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.uaListingAvailable + ""} </> : <Skeleton width={100} />}</TableCell> */}

                                                {/* <TableCell>{isload ? <> <a href={user.downloadReport} download> Download pdf 1</a>

                                                </> : <Skeleton width={100} />}
                                                </TableCell>

                                                <TableCell>{isload ? <> {user.titleMetaTag} </> : <Skeleton width={100} />}</TableCell>
                                                <TableCell>{isload ? <> {user.descriptionMetaTag} </> : <Skeleton width={100} />}</TableCell> */}
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">
                                                        {isload ?
                                                            <button className="btn btn-primary-default mr-2" onClick={() => handleOpenEditModal(user)}>
                                                                <EditIcon />
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger mr-2" onClick={() => handleOpenDeleteModal(user)}>
                                                                <DeleteIcon />
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                         {isload ?
                                                    <button className='btn btn-sm btn-info mr-2' onClick={() => viewAllRecordModal(user)}>
                                                        <ViewListIcon />
                                                    </button>:
                                                    <Skeleton square ={true} height={30} width={30} />
                                                    }
                                                    {isload ? 
                                                    <button className='btn btn-sm btn-warning' onClick={handleClickPopover}>
                                                        <MoreHorizIcon />
                                                        </button>:
                                                        <Skeleton square={true} height={30} width={30} />}

                                                    </div>
                                                    <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                        }}
                                                    >
                                                      <div className='p-4'> 
                                                      <ul style={{listStyleType: 'none', padding: '0'}}>
                                                        <li><button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenCompetitorModal(user)}> Competitors </button></li>
                                                        <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenFinalcialModal(user)}>
                                                                Company Financials
                                                            </button></li>
                                                            <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenKeyProductImageModal(user)}>
                                                                Company Key Products Images
                                                            </button></li>
                                                            <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenManagementModal(user)}>
                                                                Company Management
                                                            </button></li>
                                                            <li><button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenMilestoneModal(user)}>
                                                                Company Milestone
                                                            </button></li>
                                                            <li>  <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenShareHolderModal(user)}>
                                                                Company Shareholder
                                                            </button></li>
                                                            <li><button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenSummaryRiskModal(user)}>
                                                                Company Summary Risk Key Products
                                                            </button></li>
                                                            <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenRecentNewsModal(user)}>
                                                                Company Recent News
                                                            </button></li>
                                                            <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenInstaModal(user)}>
                                                                Company Insta
                                                            </button></li>
                                                            <li> <button className="btn btn-sm btn-danger mb-1" onClick={() => handleOpenCompanyStatusModal(user)}>
                                                                Company Status
                                                            </button></li>
                                                            <li> <button className='btn btn-sm btn-danger mb-1' onClick={() => handleOpenLogoModal(user)}>
                                                                Change company logo
                                                            </button></li>
                                                            <li> <button className='btn btn-sm btn-danger' onClick={() => handleOpenReportModal(user)}>
                                                                Change download report
                                                            </button></li>
                                                      </ul>
                                                        

                                                            
                                                    </div>
                                                    </Popover>
                                                </TableCell>
                                                {/* <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenCompetitorModal(user)}>
                                                                Competitors
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenFinalcialModal(user)}>
                                                                Company Financials
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenKeyProductImageModal(user)}>
                                                                Company Key Products Images
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenManagementModal(user)}>
                                                                Company Management
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenMilestoneModal(user)}>
                                                                Company Milestone
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenShareHolderModal(user)}>
                                                                Company Shareholder
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenSummaryRiskModal(user)}>
                                                                Company Summary Risk Key Products
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenRecentNewsModal(user)}>
                                                                Company Recent News
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenInstaModal(user)}>
                                                                Company Insta
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleOpenCompanyStatusModal(user)}>
                                                                Company Status
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">

                                                        {isload ?
                                                            <button className='btn btn-sm btn-danger' onClick={() => handleOpenLogoModal(user)}>
                                                                Change company logo
                                                            </button>
                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="d-flex justify-content-between">
                                                        {isload ?
                                                            <button className='btn btn-sm btn-danger' onClick={() => handleOpenReportModal(user)}>
                                                                Change download report
                                                            </button>


                                                            :
                                                            <Skeleton square={true} height={30} width={30} />
                                                        }
                                                    </div>
                                                </TableCell> */}
                                            </TableRow>
                                        ))
                                }
                            </InfiniteScroll>
                        </Table>
                    </TableContainer>
                </div>
                {/* <button className="btn btn-primary mr-2" onClick={fetchData}>
                Show full page loading spinner
                </button> */}
            </div>
            {/* Edit Record Modal  */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenInstaModal}
                onClose={handleCloseInstaModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyInstaManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenRecentNewsModal}
                onClose={handleCloseRecentNewsModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyRecentNewsManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenMilestoneModal}
                onClose={handleCloseMilestoneModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyMilestoneManager company={editedData} />
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenCompetitorModal}
                onClose={handleCloseCompetitorModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyCompetitorsManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenShareHolderModal}
                onClose={handleCloseShareHolderModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyShareHoldersManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenSummaryRiskModal}
                onClose={handleCloseSummaryRiskModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanySummaryRiskManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenFinalcialModal}
                onClose={handleCloseFinalcialModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyFinancialsManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenManagementModal}
                onClose={handleCloseManagementModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyManagementManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenCompanyStatusModal}
                onClose={handleCloseCompanyStatusModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyStatusManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={OpenKeyProductImageModal}
                onClose={handleCloseKeyProductImageModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/*<CompanyCompetitorsManager company={editedData}/>*/}
                <CompanyKeyProductsImagesManager company={editedData} />
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEditModal}
                onClose={handleCloseEditModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditModal}>
                    <div className={classes.paper} style={{width: '90%'}}>
                        <div className="text-center modal-header p-1 text-center">
                        <div className="profile-form_field-photo" >
                                    <img src={editedData.logo} width="50" style={{borderRadius: '0'}}/>
                                    {/*<div>*/}
                                    {/*    /!*<p className="m-0 user-name">{editedData.logo}</p>*!/*/}
                                    {/*    <button onClick={() => setOpenPhotoModal(true)} style={{fontSize:"13px"}}>*/}
                                    {/*        Change company logo*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            <h5 className="text-primary-default text-center w-100"><b>Update Record</b></h5>
                        </div>
                        <div className="modal-body record-model">
                        <form className="w-100">
                        <div className='row'>
                                <div className='col-4'>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Name -</label>
                                    <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Slug -</label>
                                    <input type="text" value={editedData.slug} onChange={(e) => handleChange("slug", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">ISIN -</label>
                                    <input type="text" value={editedData.isin} onChange={(e) => handleChange("isin", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Legal Name -</label>
                                    <input type="text" value={editedData.legalName} onChange={(e) => handleChange("legalName", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">legalWebsiteLink -</label>
                                    <input type="text" value={editedData.legalWebsiteLink} onChange={(e) => handleChange("legalWebsiteLink", e.target.value)}
                                        className="form-control" />
                                </div>
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">logo -</label>*/}
                                {/*    <input type="text" value={editedData.logo}  onChange={(e) => handleChange("logo", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">description -</label>
                                    <input type="text" value={editedData.description} onChange={(e) => handleChange("description", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">keyProductsSegmentsDescription -</label>
                                    <input type="text" value={editedData.keyProductsSegmentsDescription} onChange={(e) => handleChange("keyProductsSegmentsDescription", e.target.value)}
                                        className="form-control" />
                                </div>
                                {/*<div className="profile-form_field date_picker">*/}
                                {/*<label className="my-2 tex-small">incorporationDate*</label>*/}
                                {/* <input value={details.dob}
                     onChange={(e) =>
                         onUserInput("dob", e.target.value)
                     }/> */}
                                {/*    <MuiPickersUtilsProvider utils={DateFnsUtils} >*/}
                                {/*        <KeyboardDatePicker*/}
                                {/*            disableToolbar*/}
                                {/*            variant="inline"*/}
                                {/*            format="MM/dd/yyyy"*/}
                                {/*            margin="normal"*/}
                                {/*            id="date-picker-inline"*/}
                                {/*            label="Date picker inline"*/}
                                {/*            KeyboardButtonProps={{*/}
                                {/*                'aria-label': 'change date',*/}
                                {/*            }}*/}
                                {/*            value={editedData.incorporationDate}*/}
                                {/*            onChange={(e) =>*/}
                                {/*                handleChange("incorporationDate", e)*/}
                                {/*            }*/}
                                {/*        />*/}
                                {/*    </MuiPickersUtilsProvider>*/}
                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">incorporationDate - (YYYY-MM-DD)</label>
                                    <input type="text" value={editedData.incorporationDate} onChange={(e) => handleChange("incorporationDate", e.target.value)}
                                        className="form-control" />
                                </div>
                                </div>
                                <div className='col-4'>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">address -</label>
                                    <input type="text" value={editedData.address} onChange={(e) => handleChange("address", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">cin -</label>
                                    <input type="text" value={editedData.cin} onChange={(e) => handleChange("cin", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">pan -</label>
                                    <input type="text" value={editedData.pan} onChange={(e) => handleChange("pan", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">gst_registration -</label>
                                    <input type="text" value={editedData.gst_registration} onChange={(e) => handleChange("gst_registration", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">lastFundRaisingValuation -</label>
                                    <input type="text" value={editedData.lastFundRaisingValuation} onChange={(e) => handleChange("lastFundRaisingValuation", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Ordering -</label>
                                    <input type="text" value={editedData.ordering} onChange={(e) => handleChange("ordering", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">titleMetaTag -</label>
                                    <input type="text" value={editedData.titleMetaTag} onChange={(e) => handleChange("titleMetaTag", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">descriptionMetaTag -</label>
                                    <input type="text" value={editedData.descriptionMetaTag} onChange={(e) => handleChange("descriptionMetaTag", e.target.value)}
                                        className="form-control" />
                                </div>
                                </div>          
                                <div className='col-4'>
                                <div className="">
                                    <label className='m-0 text-small'>Sector Name*</label>
                                    <Select options={allSectors} onChange={selectedOption => setselectedSector(selectedOption)} value={selectedSector} className='updateRecordSelect' />
                                </div>
                                <div className="">
                                    <label className='m-0 text-small'>Funding Series Name*</label>
                                    <Select options={allFundingSeries} onChange={selectedOption => setselectedFundingSeries(selectedOption)} value={selectedFundingSeries} />
                                </div>                          
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">sector -</label>*/}
                                {/*    <input type="text" value={editedData.sector}  onChange={(e) => handleChange("sector", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">series_of_funding -</label>*/}
                                {/*    <input type="text" value={editedData.series_of_funding}  onChange={(e) => handleChange("series_of_funding", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}                           
                                <div className="form-control-row ">
                                    <label className="m-0 mt-2 text-small">type -</label>
                                    {/*<input type="text" value={editedData.type}  onChange={(e) => handleChange("type", e.target.value)}*/}
                                    {/*       className="form-control" />*/}
                                    <Select options={allTypes} onChange={selectedOption => setselectedType(selectedOption)} value={selectedType} />
                                </div>
                                <div className='mt-4'>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">UA Wants to Hide -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.uaHide}
                                        onChange={(e) => {

                                            handleChange("uaHide", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">Is Approaching IPO -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.approachingIPO}
                                        onChange={(e) => {

                                            handleChange("approachingIPO", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">Is Acquired -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.acquired}
                                        onChange={(e) => {

                                            handleChange("acquired", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">UA Listing Available -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.uaListingAvailable}
                                        onChange={(e) => {

                                            handleChange("uaListingAvailable", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">temporarilyActive -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.temporarilyActive}
                                        onChange={(e) => {
                                            handleChange("temporarilyActive", e.target.checked)
                                        }} />
                                </div>
                                </div>                      
                                </div>
                            </div>                         
                            </form>
                        </div>  
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseEditModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Update" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventoryupdate} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* Add Record Modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openAddModal}
                onClose={handleCloseAddModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openAddModal}>
                    <div className={classes.paper} >
                        <div className="text-center modal-header p-1 text-center">
                            <h5 className="text-primary-default text-center w-100"><b>Add New Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-4'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Name -</label>
                                    <input type="text" value={editedData.name} onChange={(e) => handleChange("name", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Slug -</label>
                                    <input type="text" value={editedData.slug} onChange={(e) => handleChange("slug", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">ISIN -</label>
                                    <input type="text" value={editedData.isin} onChange={(e) => handleChange("isin", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Legal Name -</label>
                                    <input type="text" value={editedData.legalName} onChange={(e) => handleChange("legalName", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">legalWebsiteLink -</label>
                                    <input type="text" value={editedData.legalWebsiteLink} onChange={(e) => handleChange("legalWebsiteLink", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">description -</label>
                                    <input type="text" value={editedData.description} onChange={(e) => handleChange("description", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">keyProductsSegmentsDescription -</label>
                                    <input type="text" value={editedData.keyProductsSegmentsDescription} onChange={(e) => handleChange("keyProductsSegmentsDescription", e.target.value)}
                                        className="form-control" />
                                </div>
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">incorporationDate -</label>*/}
                                {/*    <MuiPickersUtilsProvider utils={DateFnsUtils} >*/}
                                {/*        <KeyboardDatePicker*/}
                                {/*            disableToolbar*/}
                                {/*            variant="inline"*/}
                                {/*            format="MM/dd/yyyy"*/}
                                {/*            margin="normal"*/}
                                {/*            id="incorporationDate"*/}
                                {/*            label="incorporationDate"*/}
                                {/*            KeyboardButtonProps={{*/}
                                {/*                'aria-label': 'change date',*/}
                                {/*            }}*/}
                                {/*            value={editedData.incorporationDate}*/}
                                {/*            onChange={(e) =>*/}
                                {/*                handleChange("incorporationDate", e)*/}
                                {/*            }*/}
                                {/*        />*/}
                                {/*    </MuiPickersUtilsProvider>*/}

                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">incorporationDate - (YYYY-MM-DD)-</label>
                                    <input type="text" value={editedData.incorporationDate} onChange={(e) => handleChange("incorporationDate", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                    <div className='col-4'>         
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">address -</label>
                                    <input type="text" value={editedData.address} onChange={(e) => handleChange("address", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">cin -</label>
                                    <input type="text" value={editedData.cin} onChange={(e) => handleChange("cin", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">pan -</label>
                                    <input type="text" value={editedData.pan} onChange={(e) => handleChange("pan", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">gst_registration -</label>
                                    <input type="text" value={editedData.gst_registration} onChange={(e) => handleChange("gst_registration", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">TemporarilyActive -</label>
                                    <input type="text" value={editedData.temporarilyActive} onChange={(e) => handleChange("temporarilyActive", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">titleMetaTag -</label>
                                    <input type="text" value={editedData.titleMetaTag} onChange={(e) => handleChange("titleMetaTag", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">descriptionMetaTag -</label>
                                    <input type="text" value={editedData.descriptionMetaTag} onChange={(e) => handleChange("descriptionMetaTag", e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">Ordering -</label>
                                    <input type="text" value={editedData.ordering} onChange={(e) => handleChange("ordering", e.target.value)}
                                        className="form-control" />
                                </div>
                                    </div>
                                    <div className='col-4'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">type -</label>
                                    {/*<input type="text" value={editedData.type}  onChange={(e) => handleChange("type", e.target.value)}*/}
                                    {/*       className="form-control" />*/}
                                    <Select options={allTypes} onChange={selectedOption => setselectedType(selectedOption)} value={selectedType} />
                                </div>
                                    <div className="">
                                    <label className='text-small m-0'>Sector Name*</label>
                                    <Select options={allSectors} onChange={selectedOption => setselectedSector(selectedOption)} value={selectedSector} />
                                </div>
                                <div className="">
                                    <label className='text-small m-0'>Funding Series Name*</label>
                                    <Select options={allFundingSeries} onChange={selectedOption => setselectedFundingSeries(selectedOption)} value={selectedFundingSeries} />
                                </div>
                                         {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">sector -</label>*/}
                                {/*    <input type="text" value={editedData.sector}  onChange={(e) => handleChange("sector", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                {/*<div className="form-control-row">*/}
                                {/*    <label className="m-0 mt-2 text-small">series_of_funding -</label>*/}
                                {/*    <input type="text" value={editedData.series_of_funding}  onChange={(e) => handleChange("series_of_funding", e.target.value)}*/}
                                {/*           className="form-control" />*/}
                                {/*</div>*/}
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">lastFundRaisingValuation -</label>
                                    <input type="text" value={editedData.lastFundRaisingValuation} onChange={(e) => handleChange("lastFundRaisingValuation", e.target.value)}
                                        className="form-control" />
                                        </div>
                                
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">UA Wants to Hide -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.uaHide}
                                        onChange={(e) => {

                                            handleChange("uaHide", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">Is Approaching IPO -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.approachingIPO}
                                        onChange={(e) => {

                                            handleChange("approachingIPO", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">Is Acquired -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.acquired}
                                        onChange={(e) => {

                                            handleChange("acquired", e.target.checked)
                                        }} />
                                </div>
                                <div className="form-control-row d-flex align-items-center justify-content-between">
                                    <label className="m-0 text-small">UA Listing Available -</label>
                                    <input id="styled-checkbox-2" type="checkbox" checked={editedData.uaListingAvailable}
                                        onChange={(e) => {

                                            handleChange("uaListingAvailable", e.target.checked)
                                        }} />
                                </div>                   
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseAddModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Submit" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventoryadd} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* *********View All Modal********* */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openViewAllModal}
                onClose={() => setOpenViewAllModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openViewAllModal}>
                    <div className={classes.paper}>
                        <div className="text-center modal-header p-1 text-center">
                        <div className="profile-form_field-photo" >
                                    <img src={editedData.logo} width="50" style={{borderRadius: '0'}}/>
                                </div>
                            <h5 className="text-primary-default text-center w-100"><b>View All Record</b></h5>
                        </div>
                        <div className="modal-body">
                            <form className="w-100">
                                <div className='row'>
                                    <div className='col-4'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">ID -</label>
                                    <h6>{editedData.id ? editedData.id : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">name -</label>
                                    <h6>{editedData.name ? editedData.name : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">legalName -</label>
                                    <h6>{editedData.legalName ? editedData.legalName : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">legalWebsiteLink -</label>
                                    <h6>{editedData.legalWebsiteLink ? editedData.legalWebsiteLink : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">incorporationDate -</label>
                                    <h6>{editedData.incorporationDate ? editedData.incorporationDate : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">type -</label>
                                    <h6>{editedData.type ? editedData.type : 'NA'}</h6>
                                    </div>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">address -</label><br />
                                    <h6>{editedData.address ? editedData.address : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">lastFundRaisingValuation -</label>
                                    <h6>{editedData.lastFundRaisingValuation ? editedData.lastFundRaisingValuation : 'NA'}</h6>
                                </div>
                                
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">description -</label><br />
                                    <textarea>{editedData.description ? editedData.description : 'NA'}</textarea>
                                </div>  
                                    </div>
                                    <div className='col-4'>
                                <div className="form-control-row">
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">slug -</label>
                                    <h6>{editedData.slug ? editedData.slug : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">isin -</label>
                                    <h6>{editedData.isin ? editedData.isin : 'NA'}</h6>
                                </div>
                                    <label className="m-0 mt-2 text-small">cin -</label>
                                    <h6>{editedData.cin ? editedData.cin : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">pan -</label>
                                    <h6>{editedData.pan ? editedData.pan : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">gst_registration -</label>
                                    <h6>{editedData.gst_registration ? editedData.gst_registration : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">TemporarilyActive -</label>
                                    <h6>{editedData.TemporarilyActive ? editedData.TemporarilyActive : 'NA'}</h6>
                                </div>
                               
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">series_of_funding -</label>
                                    <h6>{editedData.series_of_funding ? editedData.series_of_funding : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">keyProductsSegmentsDescription -</label>
                                    <textarea>{editedData.keyProductsSegmentsDescription ? editedData.keyProductsSegmentsDescription : 'NA'}</textarea>
                                </div>
                                    </div>
                                    <div className='col-4'>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">sector -</label>
                                    <h6>{editedData.sector ? editedData.sector : 'NA'}</h6>
                                </div>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">ordering -</label>
                                    <h6>{editedData.ordering ? editedData.ordering : 'NA'}</h6>
                                </div>
                                    <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">downloadReport -</label>
                                    <h6>{editedData.downloadReport ? editedData.downloadReport : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">titleMetaTag -</label>
                                    <h6>{editedData.titleMetaTag ? editedData.titleMetaTag : 'NA'}</h6>
                                </div>
                                <div className="form-control-row">
                                    <label className="m-0 mt-2 text-small">descriptionMetaTag -</label><br />
                                    <textarea>{editedData.descriptionMetaTag ? editedData.descriptionMetaTag : 'NA'}</textarea>
                                </div>
                                
                                <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                    <label className="m-0 mt-2 text-small">uaHide -</label>
                                    {editedData.uaHide ? <Chip label="true" color="success" />
                                        : <Chip label="false" color="warning" />}
                                </div>
                                <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                    <label className="m-0 mt-2 text-small">approachingIPO -</label>
                                    {editedData.approachingIPO ? <Chip label="true" color="success" />
                                        : <Chip label="false" color="warning" />}
                                </div>                          
                                <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                    <label className="m-0 mt-2 text-small">acquired -</label>
                                    {editedData.acquired ? <Chip label="true" color="success" />
                                        : <Chip label="false" color="warning" />}
                                </div>
                                <div className="form-control-row d-flex justify-content-between align-items-center mt-2">
                                    <label className="m-0 mt-2 text-small">uaListingAvailable -</label>
                                    {editedData.uaListingAvailable ? <Chip label="true" color="success" />
                                        : <Chip label="false" color="warning" />}
                                </div>                          
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={() => setOpenViewAllModal(false)} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            {/* Delete Record Modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDeleteModal}>
                    <div className={classes.paper}>
                        <div className="text-center ">
                            <DeleteForeverIcon className="text-danger " style={{ width: "70px", height: "70px" }} />
                            <h4 className="my-3 text-danger">Are You Sure ?</h4>
                            <p className="text-small ">Do you really want to delete these record ? <br />This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer p-1">
                            <div className="d-flex align-items-center">
                                <Buttons.SecondaryButton onClick={handleCloseDeleteModal} value="Cancel" style={{ width: "100%", margin: "0px 3px" }} />
                                {!isLoadingbtn && (
                                    <Buttons.PrimaryButton value="Confirm" style={{ width: "100%", margin: "0px 3px" }} onClick={getAllInventorydelete} />
                                )}

                                {isLoadingbtn && (
                                    <Loadbutton />
                                )}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>


            {isloading ? <div className="product-loader"><img src={loadingImg} alt="" /></div> : null}
            <ChoosePhoto
                open={openPhotoModal}
                close={handleCloseLogoModal}
                onFileSelect={onFileSelect}
                name={"Change Company Photo"}
            />
            <ChoosePhoto1
                open={openReportModal}
                close={handleCloseReportModal}
                onFileSelect={onFileSelectReport}
                name={"Change Download Report"}
            />
            {/*{loader}*/}
        </div>
    )
}