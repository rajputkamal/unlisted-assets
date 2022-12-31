import React from "react";

import "./transactiondetail.css";

let TransactionDetail = () => {
    return (<div>        
            <div class="transaction_detail">
            <div className="transaction_row transaction_first_row"> 
                <p>Transaction Detail</p>
                
            </div>
            <div className="transaction_row"> 
                <p>Price/Share</p>
                <p><b>₹ 98</b></p>
            </div>
            <div className="transaction_row" > 
                <p>10 X 98</p>
                <p><b>₹ 980</b></p>
            </div>
            <div className="transaction_row" > 
                <p>Transaction fees</p>
                <p><b>₹ 13.5</b></p>
            </div>
            <div className="transaction_row ">
                <p className="including_gst">*Including GST</p>
                
            </div>
            <div className="transaction_horizontal_line"> </div>
            <div className="transaction_row transaction_total" > 
                <p>Total</p>
                <p><b>₹ 89.3</b></p>
            </div>
        </div>
        </div>

        )
}

export default TransactionDetail