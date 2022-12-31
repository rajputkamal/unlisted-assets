import React from 'react';
import TCS from "../../Pages/Negotiations/Group 990TCS.png"
import hatti from "../../Pages/Negotiations/hatti.jpg"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Negotiationcompanylist.css"
import { apiCall, setAccessToken } from "../../Utils/Network"
import {
    BrowserRouter as Router,Link,
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function NegotiationCompanyList(props){
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    // let selectedTrade1 = location.state.selectedTrade;

    let history = useHistory();
    const [submenu,setSubmenu]=React.useState(false);
    const [RowInformation,setRowInformation]=React.useState([]);
    const [showclass, setShowclass] = React.useState();
    const [NegotiationChatActiveId, setNegotiationChatActiveId] = React.useState(selectedTradeOngoingTxn.id);
    const [allinventory,setAllinventory] = React.useState([]);
    const [NegotiationInterrupted,setNegotiationInterrupted]=React.useState(false);
    // const [selectedTrade1,settrade]=React.useState(location.state.selectedTrade);

    React.useEffect(() => {

            //console.log("health wealth pyar - once"+props.communicationLength)
            getData();
    }, [selectedTradeOngoingTxn]); // <-- Have to pass in [] here!

    React.useEffect(() => {

        //console.log("health wealth pyar - second change with props"+props.communicationLength)

        if(props.communicationLength == 1) {
            //console.log("health wealth pyar - second query change with props"+props.communicationLength)
            getData();
        }

    }, [props]); // <-- Have to pass in [] here!

    const getData = async function () {

        let response = await apiCall("tradeongoingtranaction/tradeaccount/ongoingnegotiations/companies",'GET')
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        // console.log("api called ",response)

        let responseJSON = await response.json()

        //
        // console.log("api called 11",responseJSON)


        // console.log("ppppp"+NegotiationChatActiveId)

        // let responseJSON1 = responseJSON.filter(item => item.id == NegotiationChatActiveId);
        // var first = responseJSON1[0];
        // responseJSON.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });

        setRowInformation(responseJSON);
    }

    // const getAllInventory = async function (){
    //     let allinventoryresponse = await apiCall("trade/findAll",'GET')
    //     console.log(allinventoryresponse)
    //     let allinventoryresponseJSON = await allinventoryresponse.json();
    //     console.log(allinventoryresponseJSON)
    //     setAllinventory(allinventoryresponseJSON)
    // }
    const selecteNegotiationChat = async (ev, rowInformation) => {
        ev.preventDefault()

        let allinventoryresponse = await apiCall("trade/"+rowInformation.tradeId,'GET')

        let allinventoryresponseJSON = await allinventoryresponse.json();


        // console.log('rowInformation11111111122' , rowInformation.ongoingTransactionStatus+rowInformation.action);

        history.push({
            pathname: "/transactions",
            state: {
                selectedTrade: allinventoryresponseJSON,
                selectedongoingtxn: rowInformation
            }
        })

        setNegotiationChatActiveId(rowInformation.id)
        // console.log('NegotiationChatActiveId', NegotiationChatActiveId);
    }
    // Negotiation Tabs 
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div className="mt-3">
            <div>
                <h6 className="text-dark"><b>Negotiation</b></h6>
            </div>
            <div className="search-sec mt-3">
                <div class="form-group has-search">
                    <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                    <input type="text" class="form-control" placeholder="Search" />
                </div>
            </div>
            {/* <p className={showclass ? "text-danger" : ""}>Navigation menu</p> */}
            <div className="Negotiation-listing-main scroll-default">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="All Negotiation" value="1" />
                                <Tab label="Complete" value="2" />
                                <Tab label="Inprogress" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {/* All Lisiting content   */}
                            {RowInformation.map((rowInformation,index) => (
                                    <div onClick={(e) => selecteNegotiationChat(e, rowInformation)} className={NegotiationChatActiveId== rowInformation.id ? 'negotiationchat-active' : null} key={index} >
                                        
                                        <div className="Negotiation-listing  cursor-pointer row mx-0 pl-0" >
                                            <div className="col-md-2 px-1">
                                                <div className="Negotiation-logo-image ">
                                                {rowInformation.companyLogo == "" ? null :<img src={rowInformation.companyLogo} width={50} height={50} />}
                                                </div>
                                            </div>
                                            <div className="col-md-9 px-1">
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info p-2">
                                                        <h6 className="m-0 text-default-secoundary">
                                                            <b>{rowInformation.companyName}</b>
                                                        </h6>
                                                        <p className="d-flex m-0">

                                                            {rowInformation.action == "buy" ?
                                                                "Seller ID - " :
                                                                "Buyer ID - "

                                                            }
                                                            {rowInformation.action == "buy" ?
                                                                rowInformation.onboardingTradeOwnerId :
                                                                rowInformation.onboardingTradeNONOwnerId
                                                            }
                                                        </p>
                                                        {/* <p>
                                                            <span>10 min ago</span>
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-1 px-1 d-flex align-items-center justify-content-center">
                                                {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                }
                                            </div> */}
                                        </div>
                                    </div>

                                )
                            )}
                        </TabPanel>
                        <TabPanel value="2">
                        {RowInformation.map((rowInformation,index) => (
                                    <div onClick={(e) => selecteNegotiationChat(e, rowInformation)} className={NegotiationChatActiveId== rowInformation.id ? 'negotiationchat-active' : null} key={index} >
                                        {rowInformation.ongoingTransactionStatus == "agreement completed" ?
                                        
                                        <div className="Negotiation-listing  cursor-pointer row mx-0 pl-0" >
                                            <div className="col-md-2 px-1">
                                                <div className="Negotiation-logo-image ">
                                                {rowInformation.companyLogo == "" ? null :<img src={rowInformation.companyLogo} width={50} height={50} />}
                                                </div>
                                            </div>
                                            <div className="col-md-9 px-1">
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info p-2">
                                                        <h6 className="m-0 text-default-secoundary">
                                                            <b>{rowInformation.companyName}</b>
                                                        </h6>
                                                        <p className="d-flex m-0">

                                                            {rowInformation.action == "buy" ?
                                                                "Seller ID - " :
                                                                "Buyer ID - "

                                                            }
                                                            {rowInformation.action == "buy" ?
                                                                rowInformation.onboardingTradeOwnerId :
                                                                rowInformation.onboardingTradeNONOwnerId
                                                            }
                                                        </p>
                                                        {/* <p>
                                                            <span>10 min ago</span>
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-1 px-1 d-flex align-items-center justify-content-center">
                                                {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                }
                                            </div> */}
                                        </div> : null }
                                    </div>

                                )
                            )}
                        </TabPanel>
                        <TabPanel value="3">
                        {RowInformation.map((rowInformation,index) => (
                                    <div onClick={(e) => selecteNegotiationChat(e, rowInformation)} className={NegotiationChatActiveId== rowInformation.id ? 'negotiationchat-active' : null} key={index} >
                                        {rowInformation.ongoingTransactionStatus == "inprogress" ?
                                        
                                        <div className="Negotiation-listing  cursor-pointer row mx-0 pl-0" >
                                            <div className="col-md-2 px-1">
                                                <div className="Negotiation-logo-image ">
                                                    {rowInformation.companyLogo == "" ? null :<img src={rowInformation.companyLogo} width={50} height={50} />}
                                                </div>
                                            </div>
                                            <div className="col-md-9 px-1">
                                                <div className="Negotiation-list-desc">
                                                    <div className="Negotiation-list-info p-2">
                                                        <h6 className="m-0 text-default-secoundary">
                                                            <b>{rowInformation.companyName}</b>
                                                        </h6>
                                                        <p className="d-flex m-0">

                                                            {rowInformation.action == "buy" ?
                                                                "Seller ID - " :
                                                                "Buyer ID - "

                                                            }
                                                            {rowInformation.action == "buy" ?
                                                                rowInformation.onboardingTradeOwnerId :
                                                                rowInformation.onboardingTradeNONOwnerId
                                                            }
                                                        </p>
                                                        {/* <p>
                                                            <span>10 min ago</span>
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-1 px-1 d-flex align-items-center justify-content-center">
                                                {
                                                    NegotiationInterrupted ? <div>
                                                        <b><p className="text-warning" style={{fontSize:"8px", marginTop:"-12px"}}>SOLD</p></b>
                                                    </div>: null}

                                                {
                                                    rowInformation.read ? null :
                                                        <div className="Negotiation-Unread-mark">
                                                            <span></span>
                                                        </div>
                                                }
                                            </div> */}
                                        </div> : null }
                                    </div>

                                )
                            )}
                        </TabPanel>
                    </TabContext>
                </Box>



            </div>

        </div>
    )
}