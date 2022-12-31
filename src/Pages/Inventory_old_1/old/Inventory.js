import React from "react";
import Table from "../../Components/DashboardHeader/tablecontent.js"
import "./inventory.css"
import StepperArea from "../../Components/Stepper/index"
import InventoryTableContent from "./inventorytablecontent"
import Breadcrumb from "../../Components/Breadcrumbs"
import {useHistory } from "react-router-dom";
import { isLoggedIn } from "../../Utils/Network";
let Inventory = () => {
    let history = useHistory();
    if (!isLoggedIn()) {
        history.push("/login");
      }
    return (
        <>
            <div className="container ">
                <Breadcrumb />
                <InventoryTableContent />
            </div>
        </>
    )
}

export default Inventory