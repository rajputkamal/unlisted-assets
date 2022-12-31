import React, { useState } from "react";
import Buttons from "../../Components/Buttons";
import HDFC from "./Framehdfc.png"
import TradeBuy from "../../Components/TradeBuy/index"
import TradeSell from "../../Components/TradeSell/index"
import TradeBuySellTab from "./tradebuyselltab"
export default function Trade (){
    const [BuyorSell,setBuyorSell]=React.useState('Buy')
       
    return(
        <div style={{margin:"20px"}}>
            <div style={{border: "1px solid #CFCBCF",borderRadius: "10px"
                    ,display:"flex",marginBottom:"20px"}}>
                <div style={{margin:"10px",paddingTop:"20px"}}>
                    <img src={HDFC}/>
                </div>
                <div style={{margin:"10px"}}>
                    <h3>HDFC BANK</h3>
                    <p>Banking</p>
                    <p>ING0098765</p>
                </div>
            </div>
            <div style={{border:"1px solid #CFCBCF",borderRadius: "10px"}}>
                <div style={{display:"flex"}}>
                {/* <div style={{border:"1px solid #CFCBCF",width:"150px",cursor:"pointer"}}
                onClick={()=>{setBuyorSell('Buy')}}
                ><h3 style={{marginLeft:"40px"}}>Buy</h3></div>
                <div style={{border:"1px solid #CFCBCF",width:"150px",cursor:"pointer"}}
                onClick={()=>{setBuyorSell('Sell')}}
                ><h3 style={{marginLeft:"40px"}}>Sell</h3></div> */}
                <TradeBuySellTab />
                </div>
                {/* {BuyorSell === 'Buy' ? <TradeBuy/>: BuyorSell === 'Sell'? <TradeSell/>:null} */}
                

            </div>
        </div>
    )
}