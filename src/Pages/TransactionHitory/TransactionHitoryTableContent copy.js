import React , {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
// import OngoingTransactionTableHeader from './ongoingtransactiontableheader';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import TablePagination from '@material-ui/core/TablePagination';
import AlertIcon from './alert.svg';
import checkmarkIcon from './checkmark.png';


import "../OnGoingTransaction//ongoingtablecontent.scoped.css";
import Buttons from "../../Components/Buttons";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { apiCall, setAccessToken } from "../../Utils/Network"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import FilterCard from "../../Components/FilterCard"

import '../Companies/bootstrap4/css/bootstrap.scoped.css';
import "../../Components/FilterCard/filterCard.css"
import "../Companies/style.scoped.css"
import Skeleton from 'react-loading-skeleton';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from './filter.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloseIcon from '@material-ui/icons/Close';
import {
    BrowserRouter as Router,Link,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TransactionTableHeader from './TransactionHitoryTableHeader';
import { Breadcrumb } from 'react-bootstrap';
import Breadcrumb1 from "../../Components/Breadcrumbs";

import TermsOfUse from '../TermOfUse';

function descendingComparator(a,b, orderBy){
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}
function getComparator(order, orderBy){
    return order === "desc"
        ? (a,b) => descendingComparator(a,b, orderBy)
        : (a,b) => -descendingComparator(a,b, orderBy)
}
const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el,index) => [el,index])
    stabilizedRowArray.sort((a,b)=> {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el)=> el[0])
}

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
        width: '100%',
    },
    container: {
        maxHeight: 1000,
        width: "border-box",
        border:"0.5px solid #E5E5E5",
        borderRadius:"4px",
    },
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1),
        opacity:"1 !important",
        visibility :"initial !important"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
}));
const StyledButton = withStyles({
    root: {
        background: '#ED2939',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function TransactionHitoryTableContent() {

    
       /// for pagination
       const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      

       const [Showpagination,setShowpagination]=useState(true)
       const [PaginationButtontext,setPaginationButtontext]=useState("Show pagination")
   
       const PaginationShow =()=>{
           if(Showpagination==true){
               setShowpagination(false)
               setPaginationButtontext("Hide pagination")
           }
           else if(Showpagination==false){
               setShowpagination(true)
               setPaginationButtontext("Show pagination")
           }
       }

 
   
    
   
        let history = useHistory();
    
        const [rowInformation, setRowInformation] = React.useState([])
        const [allinventory,setAllinventory] = React.useState([]);
        const [transactioinformation,setTransactioninformation] = React.useState([])
        const [isShown, setIsShown] = React.useState(true);
        const [isload, setLoad] = React.useState(false);
    
    
      
        React.useEffect(() => {
            getData();
            getAllInventory();
            const timer = setTimeout(() => {
                setLoad(true);
              }, 3000);
              return () => clearTimeout(timer);
        }, []); // <-- Have to pass in [] here!
    
        const [Filterimg, setFilterimg] = React.useState(false);
    
    
    const handleMobileFilterOpen = () => {
        setFilterimg(true);
        //console.log("filet img")
    };
    
    const OpenTransactionHistory =()=>{
        //console.log("transaction button")
    
    }
    
        const getAllInventory = async function (){
            let allinventoryresponse = await apiCall("trade/findAll",'GET')
            //console.log(allinventoryresponse)
            let allinventoryresponseJSON = await allinventoryresponse.json();
            //console.log(allinventoryresponseJSON)
            setAllinventory(allinventoryresponseJSON)
        }
        const getData = async function () {
            // let response = await fetch('getholding').toJson()
            // setRowInformation(response)
    
            let response = await apiCall("tradeongoingtranaction/tradeaccount",'GET')
            // let transactionresponse = await apiCall("tradeongoingtranaction/tradeaccount",'GET')
    
            // setRowInformation(response)
    
            // let responseJSON = await response.json()    
            //console.log("api called ",response)
    
            let responseJSON = await response.json()
            //let transactionresponseJSON = await transactionresponse.json()
    
            //console.log("responseJson", responseJSON)
            setRowInformation(responseJSON);
            // setRowInformation(responseJSON.map((item, idx) => {
            //     item = {...item, ...transactionresponseJSON[idx]}
            //     return item
            //     }))
            //console.log(rowInformation)
            // setTransactioninformation(transactionresponseJSON)
        }
    
        const deleterow = async function(id){
            setLoading(true)
            try{
                let response = await apiCall(`myholding/${id}`, 'DELETE')
                await getData()
                //console.log(response)
                setOpen(false)
                setLoading(false)
            }
            catch(e){
                //console.log(e)
            }    
        }
        const DeletePopUp =(id)=>{
            setOpen(true)
            setRemove(id)    
        } 
    
        const classes = useStyles();
        const [orderDirection,setOrderDirection]=React.useState('asc');
        const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
        const [page,setPage]=React.useState(0);
        const [rowsPerPage,setRowsPerPage]=React.useState(100);
        const handleRequestSort = (event, property) => {
            const isAscending = valueToOrderBy === property && orderDirection === 'asc';
            setValueToOrderBy(property);
            setOrderDirection(isAscending ? 'desc' : 'asc');
            }    
      
        const [addHoldings,setAddHoldings]=React.useState(false);
        const [open, setOpen] = React.useState(false);
        const [remove, setRemove] = React.useState(null)
        const [loading,setLoading]=React.useState(false)
        const [modalStyle] = React.useState(getModalStyle);
        const [listing, setListing]=React.useState(1)
        const [openfilter, setOpenfilter] = React.useState(false);
    
        const handleOpenFilter = () => {
            setOpenfilter(true);
        };
      
        const handleCloseFilter = () => {
            setOpenfilter(false);
        }; 
    
        const showAddorEditListing =(holding)=>{
            if (holding.qtysale === 0){
                setListing(2)
            }
        }
        const body = (
            <div style={modalStyle} className={classes.paper} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div>
                    <p style={{paddingLeft:"35px"}}>Loading</p>
                </div>
            </div>
    
        );
    
        const [panelShow1, setPanelShow1] = React.useState(false)
        const [panelShow2, setPanelShow2] = React.useState(false)
        const [panelShow3, setPanelShow3] = React.useState(false)
    
        const [SectorList, setSectorList] = React.useState([])
    
        const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])
    
        React.useEffect(() => {
            checkStatus()
    
            axios.get(`https://api.unlistedassets.com/company/findAll`)
                .then(res => {
                    const resData = res.data;
    
                    //   this.setState({
                    //     companies:resData,
                    //     companyLenght:res.data.length,
                    //     isLoading:false
                    //    });
                    //    this.getPrice();
                    //    this.setState({
                    //     maxpricerange:this.state.maxprice,
                    //     minpricerange:this.state.minprice
                    //    })
    
                }).catch((error) => {
                //console.log(error)
            });
    
            axios.get(`https://api.unlistedassets.com/company/sector/findAll`)
                .then(res => {
                    const resData = res.data;
                    setSectorList(resData);
                }).catch((error) => {
                //console.log(error)
            });
    
            axios.get(`https://api.unlistedassets.com/company/fundingseries/findAll`)
                .then(res => {
                        const resData = res.data;
    
                        setSeriesOfFundingList(resData)
                    }
                ).catch((error) => {
                //console.log(error)
            });
           
        }, []); // <-- Have to pass in [] here!
    
    
        let showPanel1 = () => {
            setPanelShow1(!panelShow1)
        }
    
        let showPanel2 = () => {
            setPanelShow2(!panelShow2)
        }
    
        let showPanel3 = () => {
            setPanelShow3(!panelShow3)
        }
    
        let sectorChange = () => {
    
        }
    
        let fundingChange = () => {
    
        }
    
        let finalChange  = () => {
    
        }


        let FilterInner = () => {
            return (
                <>
                <div className="bg-white p-2 rounded custom-filter border-0">
                                        <div className="filter-top-action border-bottom py-2 pb-2 d-flex align-items-center justify-content-between">
                                            <div className="cursor-pointer w-100 dbmn" >
                                                <CloseIcon className="dbmn" onClick={handleFilterClose}/>
                                            </div>
                                            <div className="w-100">
                                                <h6 className="text-default"><b>Filter</b></h6>
                                            </div>
                                            <div className="cursor-pointer w-100">
                                                <h6 className="text-right text-small">Clear All</h6>
                                            </div>
                                        </div>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ControlPointIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography className="border-0">Sector</Typography>
                                        </AccordionSummary>
                                        <div className="px-1 accordion-details">
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="education" type="checkbox" value="education" />
                                                <label className="text-small" for="education">Education</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="pharmacy" type="checkbox" value="pharmacy" />
                                                <label className="text-small" for="pharmacy">Pharmacy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="ITservice" type="checkbox" value="ITservice" />
                                                <label className="text-small" for="ITservice">IT Service</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="AgricultureFarming" type="checkbox" value="AgricultureFarming" />
                                                <label className="text-small" for="AgricultureFarming">Agriculture & Farming</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="biotechnology" type="checkbox" value="biotechnology" />
                                                <label className="text-small" for="biotechnology">Biotechnology</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="consumergoods" type="checkbox" value="consumergoods" />
                                                <label className="text-small" for="consumergoods">Consumer Goods</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="clothing" type="checkbox" value="clothing" />
                                                <label className="text-small" for="clothing">Clothing</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="energy" type="checkbox" value="energy" />
                                                <label className="text-small" for="energy">Energy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="healthcare" type="checkbox" value="healthcare" />
                                                <label className="text-small" for="healthcare">Healthcare</label>
                                            </div> 
                                        </div>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ControlPointIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                        <Typography className={classes.heading}>Stage Of Company</Typography>
                                        </AccordionSummary>
                                        <div className="px-2 accordion-details">
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="education" type="checkbox" value="education" />
                                                <label className="text-small" for="education">Education</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="pharmacy" type="checkbox" value="pharmacy" />
                                                <label className="text-small" for="pharmacy">Pharmacy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="ITservice" type="checkbox" value="ITservice" />
                                                <label className="text-small" for="ITservice">IT Service</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="AgricultureFarming" type="checkbox" value="AgricultureFarming" />
                                                <label className="text-small" for="AgricultureFarming">Agriculture & Farming</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="biotechnology" type="checkbox" value="biotechnology" />
                                                <label className="text-small" for="biotechnology">Biotechnology</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="consumergoods" type="checkbox" value="consumergoods" />
                                                <label className="text-small" for="consumergoods">Consumer Goods</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="clothing" type="checkbox" value="clothing" />
                                                <label className="text-small" for="clothing">Clothing</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="energy" type="checkbox" value="energy" />
                                                <label className="text-small" for="energy">Energy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="healthcare" type="checkbox" value="healthcare" />
                                                <label className="text-small" for="healthcare">Healthcare</label>
                                            </div> 
                                        </div>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ControlPointIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                        <Typography className={classes.heading}>Series Of Funding</Typography>
                                        </AccordionSummary>
                                        <div className="px-2 accordion-details">
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="education" type="checkbox" value="education" />
                                                <label className="text-small" for="education">Education</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="pharmacy" type="checkbox" value="pharmacy" />
                                                <label className="text-small" for="pharmacy">Pharmacy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="ITservice" type="checkbox" value="ITservice" />
                                                <label className="text-small" for="ITservice">IT Service</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="AgricultureFarming" type="checkbox" value="AgricultureFarming" />
                                                <label className="text-small" for="AgricultureFarming">Agriculture & Farming</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="biotechnology" type="checkbox" value="biotechnology" />
                                                <label className="text-small" for="biotechnology">Biotechnology</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="consumergoods" type="checkbox" value="consumergoods" />
                                                <label className="text-small" for="consumergoods">Consumer Goods</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="clothing" type="checkbox" value="clothing" />
                                                <label className="text-small" for="clothing">Clothing</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="energy" type="checkbox" value="energy" />
                                                <label className="text-small" for="energy">Energy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="healthcare" type="checkbox" value="healthcare" />
                                                <label className="text-small" for="healthcare">Healthcare</label>
                                            </div> 
                                        </div>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ControlPointIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                        <Typography className={classes.heading}>Valuation</Typography>
                                        </AccordionSummary>
                                        <div className="px-2 accordion-details">
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="education" type="checkbox" value="education" />
                                                <label className="text-small" for="education">Education</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="pharmacy" type="checkbox" value="pharmacy" />
                                                <label className="text-small" for="pharmacy">Pharmacy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="ITservice" type="checkbox" value="ITservice" />
                                                <label className="text-small" for="ITservice">IT Service</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="AgricultureFarming" type="checkbox" value="AgricultureFarming" />
                                                <label className="text-small" for="AgricultureFarming">Agriculture & Farming</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="biotechnology" type="checkbox" value="biotechnology" />
                                                <label className="text-small" for="biotechnology">Biotechnology</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="consumergoods" type="checkbox" value="consumergoods" />
                                                <label className="text-small" for="consumergoods">Consumer Goods</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="clothing" type="checkbox" value="clothing" />
                                                <label className="text-small" for="clothing">Clothing</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="energy" type="checkbox" value="energy" />
                                                <label className="text-small" for="energy">Energy</label>
                                            </div> 
                                            <div className="filter-checkbox">
                                                <input class="styled-checkbox-primary" id="healthcare" type="checkbox" value="healthcare" />
                                                <label className="text-small" for="healthcare">Healthcare</label>
                                            </div> 
                                        </div>
                                    </Accordion>
                                    <div className="filter-action-bottom m-2">
                                        <Buttons.PrimaryButton value="Apply" style={{width:"100%"}}/>
                                    </div>
                                    </div>
                </>
            )
        }








 // filter popper For Desktop

 const [anchorEl, setAnchorEl] = React.useState(null);
 // const [open, setOpen] = React.useState(false);

 const handleFilter = (event) => {
     setAnchorEl(event.currentTarget);
     // setAnchorEl(anchorEl ? null : event.currentTarget);
 };
 const handleFilterClose = (event) => {

     if (anchorEl) {
         // alert();
         setAnchorEl(null);
     }
 };

 const opendeskfilter = Boolean(anchorEl);
 const id = opendeskfilter ? 'filter-popper' : undefined;

 /////////////// popper end ///////////////// 

 ///////// for status of transaction history

 const [status,setStatus]=useState(); 
 const [statusCompleted, setstatusCompleted] = useState("");

 const checkStatus =()=>{
     if(status==true){
        setstatusCompleted("completed")
     }
     else if(status==false){
        setstatusCompleted("rejected")
     }
     else{
        setstatusCompleted("inprogress")
     }
 }
 










    return (
       
        <div className="container mt-3">
            <Breadcrumb1 />
            
            <div className="mt-0 mb-5">            
            <div className="my-holdings-page row">      
                    <React.Fragment>                    
                     <div className="col-md-12 col-12 pr-1 pl-1">                     
                        <div className="table-container"  >
                            <div className="dbmn">
                                <div className="Table_title ">    
                                     {/* =========== working 28-09-21 =========== */}    
                                <div className="d-flex align-items-center justify-content-start w-100" onClick={handleFilterClose} >
                                    <h6 ><strong>Transaction History </strong></h6>
                                    <div class="form-group has-search mb-0 ml-3 small-icon w-50">
                                            <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                            <input type="text" class="form-control text-small" placeholder="Search here  for companies, negotiation, ID, etc." />
                                            <div className="MarketplaceTable-actions">
                                            <img src={FilterIcon} style={{ width: "20px", height: "20px",marginLeft:"20px", cursor: "pointer" }} type="button" className="mr-2"  onClick={handleFilter} />
                                          </div>
                                        </div>
                                        </div>                    
                                    </div>
                                <Popper id={id} open={opendeskfilter} anchorEl={anchorEl} style={{ zIndex: "999" }} >
                                    <FilterInner />
                                </Popper>
                            </div>
                            <div className="dnmb">
                                        <div className="MarketplaceTable-actions d-flex justify-content-between">
                                            <div class="form-group custom-search mb-0 ">
                                                <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                                                <input type="text" class="form-control" placeholder="Search Here ..." />
                                            </div>
                                            <Button  className="btn btn-secoundary-default mx-3" >   
                                                <img src={FilterIcon} onClick={handleOpenFilter} style={{width:"20px", height:"20px", cursor:"pointer"}}  type="button" className="mr-2"/>
                                            </Button>
                                            {/* <Button  className="btn btn-secoundary-default mx-3" onClick={()=>{history.push("/addholdings")}} >   
                                                <AddIcon/> Holding
                                            </Button> */}
                                        </div>
                                       
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openfilter}
                                            onClose={handleCloseFilter}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                            timeout: 500,
                                            }}
                                        >
                                            <Fade in={open}>
                                            <div className={classes.paper}>
                                                {/* <FilterInner/> */}
                                            </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                            { addHoldings ? null :
                                <div className="mt-3 myholding-right-sec ongoing-transaction-table-section">    
                                <TableContainer className={classes.container} onClick={handleFilterClose}>    
                                    <Table stickyHeader style={{backgroundColor:"white",fontSize:"16px"}}>
                                        <TransactionTableHeader 
                                         valueToOrderBy={valueToOrderBy}
                                         orderDirection={orderDirection}
                                         handleRequestSort={handleRequestSort}/>
                                        {/* <OngoingTransactionTableHeader
                                            valueToOrderBy={valueToOrderBy}
                                            orderDirection={orderDirection}
                                            handleRequestSort={handleRequestSort}
                                        /> */}
                                        {                                            
                                            sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((holding,index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                        <div className="company_cell1 d-flex align-items-center justify-content-center">
                                                            <div className="company-logo-img">
                                                                { isload ? <img src={holding.companyLogo} className="product-company-logo"/> :
                                                                <Skeleton circle={true} height={50} width={50} />
                                                            }
                                                            </div>
                                                            <div className="company_details1 ml-2">
                                                            { isload ? ( <>
                                                             <h6 className="company_name m-0 text-default-secoundary"><b>{holding.companyName}</b></h6>
                                                            <p className="Share_type m-0 text-default-secoundary">{holding.commodityName}</p>
                                                            <p className="myHoldings_id m-0 text-default-secoundary">TXN{holding.id}</p>
                                                            </>) : <Skeleton width={100} count={3}/>
                                                        }
                                                            </div>
                                                        </div>
                                                        </TableCell>
                                                        
                                                        <TableCell>
                                                            {isload ? <>{holding.onboardingTradeOwnerId}</> : <Skeleton width={100}/>}
                                                        </TableCell>
                                                        <TableCell>
                                                            {isload ? <>{holding.action}</> : <Skeleton width={100}/>}
                                                        </TableCell>
                                                        <TableCell>
                                                            {isload ? <>{holding.qtyUnderNegotiation}</> : <Skeleton width={100}/>}
                                                        </TableCell>
                                                        <TableCell>
                                                            {isload ? <>{holding.priceUnderNegotiation}</> : <Skeleton />}
                                                        </TableCell>
                                                        <TableCell>
                                                            {isload ? <>{holding.qtyUnderNegotiation}</> : <Skeleton width={100}/>}
                                                        </TableCell>
                                                        <TableCell>
                                                            {isload ? <>{holding.updateDate}</> : <Skeleton width={100}/>}
                                                        </TableCell>
                                                        {/* <TableCell>
                                                            {isload ? <>{holding.onboardingTradeNONOwnerId}</> : <Skeleton width={100}/>}
                                                        </TableCell> */}

                                                        <TableCell
                                                            onMouseEnter={() => setIsShown(true)}
                                                            onMouseLeave={() => setIsShown(true)}
                                                        >
                                     <span>
                                 {isShown === true && holding.ongoingTransactionStatus === "inprogress" ?
                                 <>
                                 {isload ?
                                 <>
                                 <div className="Inprogress-btn pr-5">
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-inprogess">{statusCompleted}</button>
                                        {
                                        status? <img src={checkmarkIcon} className="ml-1" width="18" />:<img src={AlertIcon} className="ml-1" width="20" /> }
                                        

                                        {/* {holding.updateDate} */}
                                    </div>
                                 </div>
                                 
    
                               
                                </>
                                 : <Skeleton width={100}/> }
                                 <div className="See-Negotiatin-btn">
                                 {isload ? <>
                                     <Buttons.PrimaryButton value="Download Transation Documents" style={{
                                         fontSize: "10px",
                                         marginLeft:"-35px"
                                     }}
    
                                                            onClick={() => {
                                                                for (let i = 0; i < allinventory.length; i++) {
    
                                                                    if (holding.tradeId == allinventory[i].id
                                                                        && holding.onboardingTradeOwnerId == allinventory[i].onboardingAccountId) {
                                                                        history.push({
                                                                            pathname: "/transactions",
                                                                            state: {
                                                                                selectedTrade: allinventory[i],
                                                                                selectedongoingtxn: holding
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            }}
                                     /> </> : <Skeleton width={100}/> }</div></>:
                                     <>
                                    <div className="Inprogress-btn pr-5">
                                    {isload ? <>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-inprogess">{statusCompleted}</button> 
                                            {
                                        status? <img src={checkmarkIcon} className="ml-1" width="18" />:<img src={AlertIcon} className="ml-1" width="20" /> }
                                        </div>
                                        {/* {holding.updateDate} */}
                                    </> : <Skeleton width={100}/>}
                                        
                                    </div>
                                     <div className="See-Agreement-btn">
                                     {isload ? <>
                                     <Buttons.PrimaryButton value="Download Transation Documents" style={{
                                         fontSize: "10px",
                                         marginLeft:"-35px"                                        
                                     }}
    
                                                            onClick={() => {
                                                                for (let i = 0; i < allinventory.length; i++) {
    
                                                                    if (holding.tradeId == allinventory[i].id
                                                                        && holding.onboardingTradeOwnerId == allinventory[i].onboardingAccountId) {
                                                                        history.push({
                                                                            pathname: "/buyeragreement",
                                                                            state: {
                                                                                selectedTrade: allinventory[i],
                                                                                selectedongoingtxn: holding
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            }}
                                     />
                                     </> : <Skeleton width={100}/>}
                                     </div>
                                     </>
                                 }
                                     </span>
                                                        </TableCell>
                                                    </TableRow>
                                                 ))
                                        }
    
                                    </Table>
                                </TableContainer>
                                </div>
                            }

                                {/* =============== pagination =========== */}
                        <div className="row d-flex align-items-center justify-content-between py-3">
                            <div className="col-md-4">
                                <Buttons.SecondaryButton  value={PaginationButtontext} id="add-holdings-button" onClick={PaginationShow} /> 
                            </div>
                            <div className="col-md-8">                         
                                {
                                    Showpagination?null:

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    component="div"
                                    count={rowInformation.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                }
                            </div> 
                        </div>
                            {/* <TablePagination
                 rowsPerPageOptions={[5,10,25,50]}
                 component="div"
                 count={rowInformation.length}
                 rowsPerpage={rowsPerPage}
                 page={page}
                 onChangePage={handleChangePage}
                 onChangeRowsPerPage={handleChangeRowsPerPage}
             /> */}
                            <Dialog
                                open={open}
                                onClose={() => { setOpen(false) }}
                            ><div style={{width:"300px",backgroundColor:"white"}}>
                                {loading ? <p style={{paddingLeft:"120px"}}> Loading...</p> :
                                    <>
                                        <DialogTitle id="alert-dialog-title">{"Do You Want To Delete?"}</DialogTitle>
    
                                        <DialogActions>
                                            <Button  onClick={()=>{deleterow(remove)}} color="primary">
                                                YES
                                            </Button>
                                            <Button onClick={() => { setOpen(false) }} color="primary">
                                                NO
                                            </Button>    
                                        </DialogActions>
                                    </>
                                }
                            </div>
                            </Dialog>    
                        </div>
                        </div>
                    </React.Fragment>   
            </div>
            </div>
        </div>        
    )
}
