import React from "react";
import Table from "../../Components/DashboardHeader/tablecontent.js"
import "./inventory.css"
import StepperArea from "../../Components/Stepper/index"
import InventoryContent from "./inventoryContent.js"
import Breadcrumb from "../../Components/Breadcrumbs" 
import {useHistory } from "react-router-dom";
import { isLoggedIn } from "../../Utils/Network";
import Container from '@mui/material/Container';
let Inventory = () => {
    let history = useHistory();
    if (!isLoggedIn()) {
        history.push("/login");
      }
    return (
        <>
        <Container maxWidth="lg">
     
            {/* <div className="container "> */}
                <Breadcrumb />
                <InventoryContent /> 
            {/* </div> */}
            </Container>
        </>
    )
}

export default Inventory