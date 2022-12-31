import React from "react";
import "./security.css"
import security_questions_image from "./security.svg"
import logo from "../logo.png"

class Security extends React.Component{
    render(){
        return(
            <div>
                <div className = "header">
                <img src={logo} className="heading_logo" />
                </div>
                <div className = "container">
                    <div className="left-half">
                        <form>                   
                            <label>1. What is your favourite color? *</label>
                            <input type ="text" />
                            <label>2. In which city was my father born? *</label>
                            <input type ="text" />
                            <label>3. What was the name of your childhood best
                            friend? *</label>
                            <input type ="text" />
                            <input type ="submit" className = "submit-button" />
                        </form>    
                    </div>  
                    <div className="right-half">
                    <img src={security_questions_image} className="log" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Security