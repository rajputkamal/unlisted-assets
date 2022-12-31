import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import closeIcon from "./cross.svg"
// import './bootstrap4/css/bootstrap.scoped.css';

import 'react-phone-input-2/lib/style.css';
import './modal.scoped.css';
import "./style.scoped.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { apiCall } from '../../Utils/Network';
import Buttons from "../../Components/Buttons"
import Nologo from "./company-trade/nologo.jpeg"

const stockChoices = [
    { id: 1, el_id: 'pickup-1', value: 'To buy stocks', label: "To buy stocks" },
    { id: 2, el_id: 'pickup-2', value: 'To sell stocks, I have inventory', label: "To sell stocks, I have inventory" },
]
export default function TradeModal(props) {
    let history = useHistory()
    const [company_name, setcompany_name] = React.useState(props.c_name)
    const [intrest_stock, setintrest_stock] = React.useState('To buy stocks')
    const [listings, setlistings] = React.useState([])
    const [holding, setholding] = React.useState([])
    const [allcompanyDetails, setAllcompanyDetails] = React.useState(props.allcompanyDetails)
    const [company_Id, setcompany_Id] = React.useState(props.c_id)

    console.log("allcompanyDetails" ,allcompanyDetails)
    console.log("allcompany-id" ,company_Id)

    React.useEffect(() => {
        handleChangeStockavailablelisting("")
    }, []);


    let handleChangeStockavailablelisting = async (e) => {


        let response = await apiCall("trade/find/" + props.c_id, 'GET', '', history)
        //console.log(response ," modal response")
        let responseJSON = await response.json();
        //console.log(responseJSON ,"modal responseJSON 123")
        if (e.target != undefined) {
            setintrest_stock(e.target.value)
        }
        setlistings(responseJSON)
    };

    let handleChangeStockmyholding = async (e) => {

        let response1 = await apiCall("myholding/specificforacompany/" + props.c_id, 'GET', '', history)
        //console.log('ttttttt'+response1)
        let responseJSON1 = await response1.json();
        if (e.target != undefined) {
            setintrest_stock(e.target.value)
        }
        setholding(responseJSON1)
    };

    // console.log('rendering modal' ,listings)


    return (
        <>
            <div>
                <section className="modal-main trade-modal-main ">
                    <div class=" border-none">
                        {/* <h4 className="w-100 m-0"><b>Trade Unlisted Stocks</b></h4> */}
                        <button type="button" class="close" onClick={props.handleClose}><img src={closeIcon} width="20" /></button>
                    </div>
                    <div class="modal-content">

                        <div class="modal-body trade-modal py-3">

                            <div class="row modal-center-row">
                                <div class="col-md-12">
                                {allcompanyDetails.id == company_Id && <div className=" mt-2">
                                        <h4 className="w-100 m-0"><b>Trade Unlisted Stocks</b></h4>
                                        <div className="trademodal-listing-img">
                                            {/* <img src={allcompanyDetails.logo} /> */}

                                            <img src={(allcompanyDetails.logo == '') ? Nologo : allcompanyDetails.logo} alt=" No Company Logo" />
                                        </div>
                                        <div>
                                            <h6 className="m-0 "><strong> {allcompanyDetails.name} </strong></h6>
                                            <p className="m-0 text-small">Holding ID : HOLD{allcompanyDetails.id}</p>
                                        </div>
                                    </div> }

                                    <div className="heading-section m-0">
                                        {/* <p className="m-0 text-small"> We are soon launching a transparent and secure platform for buying and selling of unlisted shares. Till then, we will provide you with a safe and secure offline support.</p> */}
                                    </div>

                                    <div className="form-wrapper">
                                        {/* <div className="form-group row">
                                            <div className="col-md-12">
                                                <label className="text-small" htmlFor="company_of_interest">Company of interest *</label>
                                                <p className="Companyofinterest">{props.c_name}<img src={closeIcon} width="10" /></p>
                                            </div>
                                        </div> */}
                                        <div className="form-group row">
                                            <div className="col-md-12">
                                                <label className="m-0" htmlFor="company_of_interest">I am interested *</label>
                                            </div>
                                            <div className="form-group radio-button-control w-100 default-d-flex">
                                                {stockChoices.map((choice, index) => (
                                                    <div className="col-md-6 customRadio" key={index}>
                                                        <input
                                                            className="radio-control"
                                                            type="radio"
                                                            value={choice.value}
                                                            key={index}
                                                            name="stock"
                                                            id={choice.el_id}
                                                            checked={intrest_stock === choice.value}
                                                            onChange={(intrest_stock == 'To sell stocks, I have inventory') ? handleChangeStockmyholding
                                                                : handleChangeStockavailablelisting} />
                                                        <label className="m-0" htmlFor={choice.el_id}> {choice.label} <span className="checkmark" /></label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {(intrest_stock == 'To sell stocks, I have inventory') ? null :
                                            <>
                                                <div className="card ">
                                                    <div className="text-center">
                                                        <h6 className="available-listing">{listings.length} Available Listing</h6>
                                                    </div>
                                                    <div className="listing-table w-100" style={{ height: "300px", overflowY: "scroll" }}>
                                                        <table className="w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Company Name</th>
                                                                    <th>Qty</th>
                                                                    <th>Price/Share</th>
                                                                    <th>Date & Time</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {listings.map((trade, index) => (
                                                                    <tr>
                                                                        <td>{trade.companyName}
                                                                        </td>
                                                                        <td>{trade.qty}</td>
                                                                        <td>₹ {trade.price}</td>
                                                                        <td>{trade.createDate} </td>
                                                                        {/* <td>{trade.isNegotiable+""}</td> */}
                                                                        <td className="text-center">
                                                                            {trade.isTradeOwner === false ?
                                                                                <h5 className="text-small action-negotiate" onClick={async () => {

                                                                                    let response = await apiCall("tradeongoingtranaction/tradeaccount/" + trade.id, 'GET', '', history)
                                                                                    let responseJSON = await response.json();
                                                                                    //console.log("hihihihihihko11"+responseJSON)

                                                                                    //console.log(response.status+"juju")
                                                                                    if (response.status != 200) {
                                                                                        //console.log("hihihihihihko")
                                                                                        const reqBody = {
                                                                                            "communicationStatus": "donotcreatecoomunicationrecord",
                                                                                            "message": "it's a dummy comment",
                                                                                            "offeredPrice": "1",
                                                                                            "offeredQuantity": "0",
                                                                                            "tradeId": trade.id
                                                                                        }
                                                                                        const response1 = await apiCall("tradecommunication/", 'POST', reqBody, history)
                                                                                        const responseJSON1 = await response1.json();

                                                                                        const response12 = await apiCall("tradeongoingtranaction/ongoingtransaction/" + responseJSON1.tradeOnGoingTransactionId, 'GET', '', history)
                                                                                        const responseJSON12 = await response12.json();

                                                                                        //console.log("hihihihihihko113"+responseJSON.tradeId)
                                                                                        responseJSON = responseJSON12;
                                                                                        //console.log("hihihihihihko14"+responseJSON.tradeId)
                                                                                    }
                                                                                    //console.log("hihihihihihko15"+responseJSON.tradeId)
                                                                                    //console.log("hihihihihihko15"+responseJSON.companyLogo)
                                                                                    history.push({ pathname: "/transactions", state: { selectedTrade: trade, selectedongoingtxn: responseJSON } })
                                                                                }}>
                                                                                    Negotiate</h5>
                                                                                :
                                                                                <p className="text-small">You are the Owner</p>}
                                                                        </td>
                                                                    </tr>
                                                                )

                                                                )}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="d-flex justify-content-center mt-3">
                                                        <Buttons.SecondaryButton value="Custom Buy Request" style={{ width: "100%", margin: "0px 5px" }} />
                                                        <Link to="/inventory_1" className="text-default-primary w-100">
                                                            <Buttons.PrimaryButton value="View All Listing" style={{ width: "100%", margin: "0px 5px" }} />
                                                        </Link>
                                                    </div>
                                                </div>
                                                {/*<div className="form-group row">*/}
                                                {/*<div className="col-md-12 btn-trade-section">*/}
                                                {/*<button className="cancel-btn" type="button" onClick={props.handleClose}> Custom buy request </button>*/}
                                                {/*<button className="sbt-btn" onClick={props.handleClose} type="submit"> View all listings </button>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                            </>
                                        }
                                        {(intrest_stock == 'To buy stocks') ? null :
                                            <>
                                                <div className="card mt-3">
                                                    <div className="p-2 text-center">
                                                        <h6 className="available-listing">Your Holding of {props.c_name}</h6>
                                                    </div>
                                                    <div className="listing-table">
                                                        <table className="w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Company Name</th>
                                                                    <th>Holding Id</th>
                                                                    <th className="text-center">Share Type</th>
                                                                    <th className="text-center">Quantity Held</th>
                                                                    <th className="text-center">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {holding.map((holdng, index) => (
                                                                    <tr>
                                                                        <td>{holdng.companyName}<br />
                                                                        </td>
                                                                        <td >{holdng.id}</td>
                                                                        <td >{holdng.commodityName}</td>
                                                                        <td >{holdng.qtyTotal}</td>
                                                                        <td >
                                                                            {holdng.tradeId != null ? <Buttons.SecondaryButton value="Edit Listing"
                                                                                style={{ height: "34px", background: "transparent", border: "1px solid #721B65" }}
                                                                                onClick={() => {
                                                                                    history.push({ pathname: "/edit_inventory", state: { selectedHolding: holdng } })
                                                                                }
                                                                                }
                                                                            />
                                                                                : <Buttons.SecondaryButton value="Add Listing"
                                                                                    style={{ height: "34px", background: "transparent", border: "1px solid #721B65" }}
                                                                                    onClick={() => {
                                                                                        history.push({ pathname: "/create_inventory", state: { selectedHolding: holdng } })
                                                                                    }
                                                                                    } />}

                                                                        </td>
                                                                    </tr>
                                                                )

                                                                )}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="d-flex justify-content-center mt-4">
                                                        {/*<Buttons.PrimaryButton style={{width:"75%"}} value="View All Listing" />*/}
                                                    </div>
                                                </div>

                                                {/* <div className="form-group row">
                                                    <div className="col-md-12 btn-trade-section">
                                                        <button className="cancel-btn" type="button" onClick={props.handleClose}> Edit Holding </button>
                                                        <button className="sbt-btn" type="submit"> Add Listing </button>
                                                    </div>
                                                </div> */}

                                                <div className="form-group row creat-holding ">
                                                    <p className="p-2 text-samll" htmlFor="company_of_interest">Create holding to start selling</p>
                                                    <div className="col-md-12 btn-trade-section d-flex  justify-content-end align-items-end">
                                                        <Buttons.PrimaryButton value="Create Holding" style={{ width: "40%", marginBottom: "15px" }} onClick={() => { history.push("/addholdings") }} />
                                                    </div>
                                                </div>

                                            </>
                                        }

                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )

}