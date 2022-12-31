import React from "react";
import Buttons from "../../Components/Buttons";
import Bell from "./bell.png"

export default  function NotificationEmpty(){
    return(<div style={{display:"flex",justifyContent:"center"}}>
        <div style={{color: "#2E384D",border:"1px solid #CFCBCF",borderRadius:"10px",width: "983px"
            ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
            margin:"60px",padding:"60px",background: "#FFFFFF"}}>
            <div>
                <img src={Bell}/>
            </div>
            <div>
                <p><b>Add companies to watchlist to see latest notification here.</b></p>
            </div>
            <div>
                <Buttons.PrimaryButton value="Add Companies"/>
            </div>
            <div>
                <p style={{cursor:"pointer"}}><b>Go back</b></p>
            </div>
        </div>
        </div>)
}