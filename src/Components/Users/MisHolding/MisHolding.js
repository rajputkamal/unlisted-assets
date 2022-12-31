import React, { useEffect, useState } from 'react';
import "../../../Components/FilterCard/filterCard.css"
import Buttons from "../../Buttons"
import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import './Mis.css'
import { apiCall, apiCall12, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import AddIcon from '@material-ui/icons/Add';
import { successToast, errorToast } from "../../Toast/index";
import Dialog from "@material-ui/core/Dialog";
import closeIcon from "../../../Pages/Companies/cross.svg";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export default function MisHolding(props) { 

    let history = useHistory();

    const [openPdfModal, setopenPdfModal] = React.useState(0);

    React.useEffect(() => {
        // getAllInventoryget()        
    }, []);
   
    const [fromDateValue, setFromDateValue] = useState(null);
    const [toDateValue, setToDateValue] = useState(null);
    const [pdfLink, setPdfLink] = useState(null);

    const getMISHolding = async function (id) {
        let response1 = await apiCall("miscontroller/downloadsharetransfer/" + fromDateValue + "/" + toDateValue, 'GET', '', history)
        console.log("response1 mis", response1)

        if (response1.status === 200) {
            successToast("Success", "Date Submited")
            setPdfLink(response1.url)
            setopenPdfModal(true)
            
        } else {
            errorToast("Invalid", "Not Downloaded...try after some time or contact Admin");
        }
    }

    return (<>
        <div className="user_table_section">
            <div className="dbmn">
                <div className="Table_title">
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <h4 className='main-heading'><b>MIS</b></h4>
                    </div>
                </div>
            </div>
        </div>

        <div className="transactiondetails-cmp mt-4">
            <div className='row mt-3'>
                <div className='col-md-4 col-sm-4 col-12'>
                    <div className="my-card mt-2">
                        <div className="card-title">
                            <h5><b>Share Transfer Details</b></h5>
                            <div className="title-border"></div>
                            <div className='mt-2'>
                                <form >
                                    <div className="row my-2">
                                        <div className="col-md-3 col-sm-3 col-12 d-flex align-items-center">
                                            <label for="date" className=" m-0">From :</label>
                                        </div>
                                        <div className="col-md-8 col-sm-7 col-12">
                                            <div className="input-group date" id="datepicker">
                                                <input type="date" className="form-control" id="date" onChange={(e) => setFromDateValue(e.target.value)} />
                                                {/* <span className="input-group-append">
                                                <span className="input-group-text bg-light d-block">
                                                    <CalendarMonthIcon/>
                                                </span>
                                            </span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-3 d-flex align-items-center">
                                            <label for="date" className="col-form-label m-0">To :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group date" id="datepicker">
                                                <input type="date" className="form-control" id="date" onChange={(e) => setToDateValue(e.target.value)}/>
                                                {/* <span className="input-group-append">
                                                <span className="input-group-text bg-light d-block">
                                                    <CalendarMonthIcon/>
                                                </span>
                                            </span> */}
                                            </div>
                                        </div>
                                    </div>                                    
                                </form>
                            </div>
                            <div>
                                <div className='mt-3'>

                                     <div>
                                        <a href={downloadurl("miscontroller/downloadsharetransfer/" + fromDateValue + "/" + toDateValue)} download >
                                            click to download </a>
                                    </div>
                                 </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={openPdfModal}
                onClose={() => setopenPdfModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <section className="transation-detail-pdf-modal">
                    <div>
                        <div className='mt-3'>
                             <a href={pdfLink}>
                                 Download MIS Holding
                            </a>
                        </div>
                    </div>
                </section>
            </Dialog>

        </div ></>

    )
}