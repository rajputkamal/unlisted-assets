import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './myinventorytableheader';
import { makeStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./inventorytablecontent.css"
import "../../Components/FilterCard/filterCard.css"
import Buttons from "../../Components/Buttons"
import "../Companies/bootstrap4/css/bootstrap.scoped.css"
import FilterCard from "../../Components/FilterCard"
import PriceRangeSlider from '../Companies/PriceRangeSlider';
import "../Companies/style.scoped.css"
import axios from 'axios'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";
import { apiCall, downloadurl } from '../../Utils/Network';


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
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 700,
      width: "border-box",
      border: "1px solid #CFCBCF",
      borderRadius:"10px",
    //   margin: "10px"
    },
  });
export default function InventoryTableContent(props){
    let history = useHistory();
    const classes = useStyles();
    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(1000);
    const [rowInformation,setRowInformation]=React.useState([])
    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
        
    }
    React.useEffect(() => {
        getAllInventory()
      }, []);
    const getAllInventory = async function (){
        let response = await apiCall("trade/findAll",'GET','', history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        //console.log(response)
        let responseJSON = await response.json();
        //console.log(responseJSON)
        setRowInformation(responseJSON)
    }
    
    const [panelShow1, setPanelShow1] = React.useState(false)
    const [panelShow2, setPanelShow2] = React.useState(false)
    const [panelShow3, setPanelShow3] = React.useState(false)
    const [SectorList, setSectorList] = React.useState([])
    const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])

    React.useEffect(() => {

        axios.get(downloadurl(`company/findAll`))
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

    let FilterCard = () => {

        let minprice = 10
        let maxprice = 10000
        return (
            <div className="filter-card-container ">
                <div className="filter-card ">
                    <div className="sun bg-white">
                        <div className="moon">
                            <h5 className="text-primary">
                                <strong className="text-primary" id="text-primary">Filter</strong> 
                                <span className="pull-right float-right mt-2">
                                    <Link to="#"><span className="text-dark"> Clear All</span></Link>
                                </span>
                            </h5>
                        </div>
                        <div className="earth">
                            <button className={panelShow1 ? "accor active1" : "accor"} onClick={showPanel1}>Sector</button>
                            <div className={panelShow1 ? "panel1 show-panel1" : "panel1"} >
                                {SectorList && SectorList.map((item, index) => {
                                    return <div className="form-group" key={index}>
                                        <p className="d-flex align-items-center">  <input type="checkbox" name="sector_value" value={item.value} onChange={sectorChange} /> <span>{item.label}</span></p>
                                    </div>;
                                })}

                            </div>
                            <button className={panelShow2 ? "accor active1" : "accor"} onClick={showPanel2}>Series of Funding</button>
                            <div className={panelShow2 ? "panel1 show-panel1" : "panel1"}>
                                {SeriesOfFundingList && SeriesOfFundingList.map((item, index) => {
                                    return <div className="form-group" key={index}>
                                        <p className="d-flex align-items-center">  <input type="checkbox" name="company_series_of_funding" value={item.value} onChange={fundingChange} /> <span>{item.label}</span></p>
                                    </div>;
                                })}
                            </div>
                            <button className={panelShow3 ? "accor active1" : "accor"} onClick={showPanel3}>Valuation</button>
                            <div className={panelShow3 ? "panel1 show-panel1" : "panel1"}>
                                {
                                    minprice && maxprice ? <PriceRangeSlider minVal={minprice} maxVal={maxprice} finalChange={finalChange} /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return( <div className="container-fluid" style={{marginTop:"25px"}}>
    <div className="my-holdings-page row">
         
         <React.Fragment>
        <div className="col-md-3 col-12">
         <FilterCard/>
         </div>
         <div className="col-md-9 col-12">
         <div className="table-container">

         <div className="Table_title" > <h6 style={{marginTop:"20px"}}><strong> Inventory </strong></h6> 
         
         <div>
         <Buttons.SecondaryButton value="Add My Holdings" id="add-holdings-button" onClick={()=>{history.push("/addholdings")}}
         style={{height: "34px",background: "transparent",border: "1px solid #721B65",width:"140px"}}
         />
         {/* <Buttons.SecondaryButton value="Add Company Request" 
         style={{height: "34px",background: "transparent",border: "1px solid #721B65",width:"200px"}}
         /> */}
         </div>
         </div> 
         
    <div className="mt-3 myholding-right-sec">

           <TableContainer className={classes.container}>
           
            <Table stickyHeader style={{backgroundColor:"white"}}>
                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trade,index) => (
                        <TableRow key={index}>
                                                        
                            <TableCell>
                                <div className="company_cell1 d-flex align-items-center justify-content-center">
                                    <div className="company-logo-img"><img src={trade.companyLogo} width={50} className="product-company-logo"/> </div>
                                    <div className="company_details1 ml-2">
                                        <p className="company_name m-0"><b>{trade.companyName}</b></p>
                                        <p className="Share_type m-0">{trade.commodityName}</p>
                                        <p className="myHoldings_id m-0">LIST{trade.id}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                {trade.qty}
                            </TableCell>
                            <TableCell>
                                {trade.price}
                            </TableCell>
                            <TableCell>
                                {trade.minBidPriceAccepted}
                            </TableCell>
                            <TableCell>
                                {trade.isNegotiable}
                                
                            </TableCell>
                            <TableCell>
                                {trade.onboardingAccountId}

                            </TableCell>

                            <TableCell>
                                {trade.id}

                            </TableCell>

                            <TableCell>
                                {trade.isTradeOwner === false ? 
                                <h4 style={{cursor:"pointer",color: "#721B65",fontSize:"14px",fontWeight:"500",textDecorationLine:"underline"}}
                                onClick={async ()=>{

                                    let response = await apiCall("tradeongoingtranaction/tradeaccount/"+trade.id,'GET','', history)
                                    if(response.status == undefined) {
                                        // errorToast("Invalid", "Invalid User ID or password");
                                        return
                                    }
                                    let responseJSON = await response.json();
                                    //console.log("hihihihihihko11"+responseJSON)

                                    //console.log(response.status+"juju")
                                    if(response.status != 200) {
                                        //console.log("hihihihihihko")
                                        const reqBody = {
                                            "communicationStatus": "donotcreatecoomunicationrecord",
                                            "message": "it's a dummy comment",
                                            "offeredPrice": "1",
                                            "offeredQuantity": "0",
                                            "tradeId": trade.id
                                        }
                                        const response1 = await apiCall("tradecommunication/",'POST',reqBody, history)
                                        if(response1.status == undefined) {
                                            // errorToast("Invalid", "Invalid User ID or password");
                                            return
                                        }
                                        const responseJSON1 = await response1.json();

                                        const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/"+responseJSON1.tradeOnGoingTransactionId,'GET','', history)
                                        if(response12.status == undefined) {
                                            // errorToast("Invalid", "Invalid User ID or password");
                                            return
                                        }
                                        const responseJSON12 = await response12.json();

                                        //console.log("hihihihihihko113"+responseJSON.tradeId)
                                        responseJSON = responseJSON12;
                                        //console.log("hihihihihihko14"+responseJSON.tradeId)
                                    }
                                    //console.log("hihihihihihko15"+responseJSON.tradeId)
                                    //console.log("hihihihihihko15"+responseJSON.companyLogo)
                                    history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
                                }}>
                                Negotiate</h4>
                                :<p>You are the Owner</p> }
                                
                            </TableCell>
                        </TableRow>
                    ))
                }
                
            </Table>
            
        </TableContainer>
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
                     </div>    
                     </div>   
                     </React.Fragment>
                
           

                        
        </div>
        </div>     )
    
 
}