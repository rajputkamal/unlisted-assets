import React from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./negotiations.css";
import BuyerCard from "../../Components/BuyerCard"
import SellerCard from "../../Components/SellerCard";
import Buttons from "../../Components/Buttons"
import SelectedAssest from "../../Components/SelectedAssest"

export default function NegotiationBuy (){
    return(
        <div style={{display:"flex",border:"1px solid black"}}>
            <div style={{width:"50%"}} >
                <h1>Filter</h1>

            </div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"70%"}}>
            <div style={{display:"flex",border:"1px solid black",height:"30%"}}>

            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
            <SellerCard/>
            </div>
            <div style={{display:"flex",justifyContent:"flex-start"}}>
            <BuyerCard/>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <Buttons.SecondaryButton value="Accept" />
                            <Buttons.SecondaryButton value="Reject" />
                            <Buttons.SecondaryButton value="New Offer" />
            </div>
            </div>
        </div>
    )
}