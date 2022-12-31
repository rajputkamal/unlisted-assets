<<<<<<< HEAD
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall, downloadLogos } from '../../Utils/Network';


export default function InventoryTableContent(props) {
    let loaderArray = [{},
        {},{},
        {},{},
        {},{},
        {}]
    let history = useHistory();
    const [rowInformation, setRowInformation] = React.useState(loaderArray)   
    const [assetTypeoptions, setassetTypeoptions] = React.useState([])
    let searchkey = 'nothing'     

    React.useEffect(() => {
        getAllInventory()
    }, []);  

    const reqbody = {
        "a": assetTypeoptions
    }  

    const getAllInventory = async function () {    
        let response = await apiCall("trade/findAll1/"+searchkey+"/"+0, 'POST', reqbody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        // console.log(responseJSON)
        setRowInformation(responseJSON)        
    }
    console.log("rowInformation", rowInformation)


    return (<>
    {rowInformation.map((item, id)=>{
        return(
            <ul key={id}>
                <li>{item.companyName}</li>
            </ul>
        )
    })}
    </>
        
    )
=======
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { apiCall, downloadLogos } from '../../Utils/Network';


export default function InventoryTableContent(props) {
    let loaderArray = [{},
        {},{},
        {},{},
        {},{},
        {}]
    let history = useHistory();
    const [rowInformation, setRowInformation] = React.useState(loaderArray)   
    const [assetTypeoptions, setassetTypeoptions] = React.useState([])
    let searchkey = 'nothing'     

    React.useEffect(() => {
        getAllInventory()
    }, []);  

    const reqbody = {
        "a": assetTypeoptions
    }  

    const getAllInventory = async function () {    
        let response = await apiCall("trade/findAll1/"+searchkey+"/"+0, 'POST', reqbody, history)
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();
        // console.log(responseJSON)
        setRowInformation(responseJSON)        
    }
    console.log("rowInformation", rowInformation)


    return (<>
    {rowInformation.map((item, id)=>{
        return(
            <ul key={id}>
                <li>{item.companyName}</li>
            </ul>
        )
    })}
    </>
        
    )
>>>>>>> e51810de206f10ee43fea01a06aed7f72e158e29
}