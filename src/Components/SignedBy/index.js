import React from "react";
import "./signedby.css"
import greencheck from "./green_check_small_filled.png"
let SignedBy = () => {
    return (        
<div class="signedby_container">
        <h3 className="signedby">Signed the Agreement By</h3>
        <ul className="signedby_list">
            <li className="signedby_list_item"><img src={greencheck}/><span>item1</span></li>
            <li className="signedby_list_item"><img src={greencheck}/><span>item1</span></li>
            <li className="signedby_list_item"><img src={greencheck}/><span>item1</span></li>
            <li className="signedby_list_item"><img src={greencheck}/><span>item1</span></li>
            <li className="signedby_list_item"><img src={greencheck}/><span>item1</span></li>
        </ul>
    </div>
        )
}
        
export default SignedBy