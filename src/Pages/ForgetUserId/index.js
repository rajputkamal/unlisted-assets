import React from 'react'
import backButton from "../back_button.png"
import logo from "../logo.png"
import forgotImg from "./forgot_user_id.png"
import "./forgotuserid.css"
let ForgotUserId = () =>{
    
    
    return (
        <div className = "forgotuser">
        <img src={logo} className="unlisted-assests-logo-header"/>
        <div className="horizontal-line" />
        <img src={backButton} className="back-button"/>
            <div className = "main-content">
                <img src={forgotImg} className="forget-logo" />
                <div className = "content-text">
                    <p className = "heading">Forgot your user ID?</p>
                    <p>Enter your email address and we'll providing you user ID.</p> 
                </div>
                <div>
                {/* <form onSubmit={(e)=>{e.preventDefault()}}> */}
                    <label>Email *</label>
                    <input type = "text" />
                    
                    <input type = "submit" style={{cursor:"pointer"}}  value ="Continue"  className = "submit-button"/>
                    
                {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default ForgotUserId