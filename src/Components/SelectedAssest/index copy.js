import HDFC from "../../Pages/Negotiations/hdfc.svg";
import "./selectedAssest.css";
import more from "./more.svg";
import dots from "./dots.svg";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
} from "react-router-dom";

let SelectedAssest = (props) => {
    let location = useLocation();

    let selectedTradeOngoingTxn = location.state.selectedongoingtxn;
    let selectedTrade1 = location.state.selectedTrade;
    return (
        <div className="listing-details">
            <div className="row flex-column-reverse-mobile">
                <div className="col-md-3 col-12  order-3 order-md-1">
                    <div className="position-relative d-flex align-items-center w-100">
                        <div className="Negotiation_logo">
                            <img src={selectedTradeOngoingTxn.companyLogo} width={50}/>
                        </div>
                        <div className="pl-3">
                            <h6 className="m-0"><b>{selectedTradeOngoingTxn.companyName}</b></h6>
                            <p className="text-small m-0">     {selectedTradeOngoingTxn.commodityName}<br />
                                LIST{selectedTradeOngoingTxn.tradeId}</p>
                        </div>
                        <div className="dots-link desktop-none">
                            <img src={dots}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-12 order-1">
                    <div className="Negotiation-right-details">
                        <ul>
                            <li>
                                Price/Share <br />
                                <span className="bold-text">{selectedTrade1.price}</span>
                            </li>
                            <li>
                                Qty <br />
                                <span className="bold-text">{selectedTrade1.qty}</span>
                            </li>
                            <li>
                                Amount <br />
                                <span className="bold-text">{selectedTradeOngoingTxn.priceUnderNegotiation}</span>
                            </li>
                            <li>
                                Offer Price Range <br />
                                <span className="bold-text">{selectedTrade1.minBidPriceAccepted} - {selectedTrade1.price}</span>
                            </li>
                            <li>
                                Date & Time  (last updated) <br />
                                <span>{selectedTradeOngoingTxn.updateDate}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-1 col-4 order-2 mobi-none order-md-3">
                    <div className="dots-link">
                        <img src={dots}/>
                    </div>
                </div>
            </div>

            <div className="text-center border-bottom cursor-pointer ">
                <img src={more}/>
            </div>
        </div>

    )
}

export default SelectedAssest