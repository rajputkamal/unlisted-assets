import React from "react";
import Buttons from "../../Components/Buttons";
import emptyTransaction from "./emptytransaction.png"

export default  function TransactionEmpty(){
    return(<div style={{display:"flex",justifyContent:"center"}}>
        <div style={{color: "#2E384D",border:"1px solid #CFCBCF",borderRadius:"10px",width: "983px"
            ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
            margin:"60px",padding:"60px",background: "#FFFFFF"}}>
            <div>
                <img src={emptyTransaction}/>
            </div>
            <div>
                <p><b>There is no running transactions currently.</b></p>
            </div>
            <div>
                <Buttons.PrimaryButton value="Start Exploring"/>
            </div>
            <div>
                <p style={{cursor:"pointer"}}><b>Go back</b></p>
            </div>
        </div>
        </div>)
}