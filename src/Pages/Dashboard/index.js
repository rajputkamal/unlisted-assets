import React from "react";
import Table from "../../Components/DashboardHeader/tablecontent.js"
import "./dashboard.css"
import StepperArea from "../../Components/Stepper/index"
let Dashboard = () => {
    return (
    // <div className="d-flex dashboard ">
    //     <div className="bg-white left "><StepperArea/></div>
    //     <div className="right"><Table/></div>
        
    // </div>
    <div className="dashboard">
        <div className="dashboard_stepper_area"><StepperArea/></div>
        <div className="dashboard_table_area"><Table/></div>
    </div>
    )
}

export default Dashboard