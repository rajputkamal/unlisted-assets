import React, { useState } from "react";
import Select from "react-select";
import Cloud from "./cloud.svg"
import Buttons from "../Buttons";
import VideoImg from "./Untitled-1 1video.png" 
import Not from "./not.svg"



const options = [
    { value: "Exploratory", label: "Exploratory" },
    { value: "Average", label: "Average" },
  ];
export default function  TradeSell() {
    const [negotiable,setNegotiable] = useState('')
    const [contactpreference,setContactPreference] = useState('');
    const [demated,setDemated] = useState('');
    return(<div style={{display:"flex"}}>
        <div style={{margin:"20px"}}>
            <div style={{display:"flex",flexDirection:"column"}}>
                <label style={{marginBottom:"10px"}}>Quantity</label>
                <input type="text" style={{border: "1px solid #CFCBCF",borderRadius: "4px"}}/>
            </div>
            <div className="addholding-form_field">
                        <p>Negotiable*</p>
                        <div className="addholding-form_radio-btn-group">
                        <div className="addholding-form_radio-btn">
                            <label for="yes">Yes</label>
                            <input
                            style={{width:"15px"}}
                            type="radio"
                            id="negotiable"
                            name="negotiable"
                            value="yes"
                            checked={negotiable}
                            onChange={(e) => {
                                setNegotiable("Yes");
                            }}
                            
                            />
                        </div>
                        <div className="addholding-form_radio-btn">
                            <label for="no">No</label>
                            <input
                            style={{width:"15px"}}
                            type="radio"
                            id="negotiable"
                            name="negotiable"
                            value="no"
                            checked={!negotiable}
                            onChange={(e) => {
                                setNegotiable("No");
                            }}
                            
                            />
                        </div>
                        </div>
                </div>
                <div style={{marginBottom:"10px",marginTop:"10px"}}>
                <label style={{marginBottom:"10px",marginTop:"10px"}}>How serious is your Interest*</label>
                <Select isMulti options={options} />
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                        <label>Vested</label>
                        <Select isMulti options={options} />
                    </div>
                    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                        <label>Share Type</label>
                        <Select isMulti options={options} />
                    </div>
                </div>
                <div style={{marginBottom:"10px",marginTop:"10px"}}>
                    <label>Additional conditions For tansfer</label>
                    <Select isMulti options={options}/>
                </div>
                <div style={{marginBottom:"10px",marginTop:"10px"}}>
                    <label>Additional Rights</label>
                    <Select isMulti options={options}/>
                </div>
                <div>
                    <div className="addholding-form_field">
                            <p>Contact Preference*</p>
                          <div className="addholding-form_radio-btn-group">
                            <div className="addholding-form_radio-btn">
                                <label for="yes">Email</label>
                                <input
                                style={{width:"15px"}}
                                type="radio"
                                id="contactpreference"
                                name="contactpreference"
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
                            id="contactpreference"
                            name="contactpreference"
                            value="no"
                            checked={!contactpreference}
                            onChange={(e) => {
                                setContactPreference("Phone");
                            }}
                            
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    <div className="addholding-form_field">
                            <p>Demat*</p>
                          <div className="addholding-form_radio-btn-group">
                            <div className="addholding-form_radio-btn">
                                <label for="yes">Yes</label>
                                <input
                                style={{width:"15px"}}
                                type="radio"
                                id="demated"
                                name="demated"
                                value="yes"
                                checked={demated}
                                onChange={(e) => {
                                    setDemated("Yes");
                                }}
                                
                                />
                            </div>
                        <div className="addholding-form_radio-btn">
                            <label for="no">No</label>
                            <input
                            style={{width:"15px"}}
                            type="radio"
                            id="demated"
                            name="demated"
                            value="no"
                            checked={!demated}
                            onChange={(e) => {
                                setDemated("NO");
                            }}
                            
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div style={{marginBottom:"10px",marginTop:"10px"}}>
                    <label>What Percentage of Lower Bid can be accepted?</label>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px",cursor:"pointer"}}>5%</div>
                        <div style={{border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px",cursor:"pointer"}}>10%</div>
                        <div style={{border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px",cursor:"pointer"}}>15%</div>
                        <div style={{border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px",cursor:"pointer"}}>20%</div>
                        <div style={{border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px",cursor:"pointer"}}>20%</div>                        
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <label>Comments</label>
                    <textarea type="text" style={{borderRadius: "5px",borderColor:"#CFCBCF",marginBottom: "10px",resize:"none",height:"100px"}}/>
                </div>
                <div style={{display:"flex",border: "2px dashed #CFCBCF",borderRadius: "10px"
                    ,justifyContent:"center"}}>
                    <img src={Cloud} style={{margin:"10px"}}/>
                    <p style={{marginTop:"40px"}}>Upload your Proof of Holding. You can upload the screenshot(share certificate/Demat holding) as proof or <b style={{color:"#721B65",cursor:"pointer"}}>Browse</b> </p>
                </div>
                <div style={{background: "#2E384D",borderRadius: "6px",display:"flex",justifyContent:"center",marginTop:"10px",marginBottom:"10px"}}>
                    <img src={Not} style={{marginRight:"10px"}}/>
                    <p style={{color: "#FFFFFF"}}><b>Note:</b> You can share document related to your company at <span style={{cursor:"pointer"}}><b>info@unlistedassets.com</b></span></p>
                </div>
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
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.                            
                            </p>
                </div>
 
        
                </div>)
    
}