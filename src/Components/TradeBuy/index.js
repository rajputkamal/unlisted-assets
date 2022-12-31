import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../Buttons";
import VideoImg from "./Untitled-1 1video.png" 

const options = [
    { value: "Exploratory", label: "Exploratory" },
    { value: "Average", label: "Average" },
  ];

export default function TradeBuy (){
    const [contactpreference,setContactPreference]=React.useState('');
    return(
        <div style={{color:"#2E384D",margin:"20px",display:"flex"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <label style={{marginBottom:"10px"}}>Quantity *</label>
                <input type="text" 
                style={{border:"1px solid #CFCBCF",borderRadius: "4px"}}
                />
                <label style={{marginBottom:"10px",marginTop:"10px"}}>How serious is your Interest*</label>
                <Select isMulti options={options} />
                    <div className="addholding-form_field">
                        <p>Contact Preference*</p>
                        <div className="addholding-form_radio-btn-group">
                        <div className="addholding-form_radio-btn">
                            <label for="yes">Email</label>
                            <input
                            style={{width:"15px"}}
                            type="radio"
                            id="demated"
                            name="demated"
                            value="yes"
                            checked={contactpreference}
                            onChange={(e) => {
                                setContactPreference("Email");
                            }}
                            
                            />
                        </div>
                        <div className="addholding-form_radio-btn">
                            <label for="no">Phone</label>
                            <input
                            style={{width:"15px"}}
                            type="radio"
                            id="demated"
                            name="demated"
                            value="no"
                            checked={!contactpreference}
                            onChange={(e) => {
                                setContactPreference("Phone");
                            }}
                            
                            />
                        </div>
                        </div>
                    </div>
                <label style={{marginBottom:"10px",marginTop:"10px"}}>Comments </label>
                <textarea type="text" style={{borderRadius: "5px",
                borderColor:"#CFCBCF",marginBottom: "10px",resize:"none",height:"100px"}}/>
            <div style={{display:"flex", border:"1px solid #CFCBCF",borderRadius: "4px",justifyContent:"space-between"}}>
                <div style={{margin:"10px"}}>
                            <label><b>Amount</b></label>
                            <h3 style={{color:"#721B65"}}>$ 1,111.00</h3>
                </div>
                <div style={{margin:"10px"}}>
                    <Buttons.PrimaryButton value="Place Order"/>
                </div>
            </div>
            </div>
            
                <div style={{border:"1px solid #CFCBCF",borderRadius: "4px",width:"510px",margin:"10px",height:"400px"}}>
                            <img src={VideoImg} style={{margin:"20px"}}/>
                            <h2 style={{margin:"20px"}}>Buy</h2>
                            <p style={{margin:"20px"}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                </div>
        </div>

        
    )
}