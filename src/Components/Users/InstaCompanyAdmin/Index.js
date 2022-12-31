import React from "react";
import Select from "react-select";
import Buttons from "../../../Components/Buttons";
import "./index.css";
import { apiCall1, apiCall, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

function InstaCompanyAdmin() {

    let history = useHistory();
    const [selectedFile, setSelectedFile] = React.useState(null)

    // On file select (from the pop up)
    let onFileChange = event => {

        // Update the state
        setSelectedFile(event.target.files[0])


    };

    // On file upload (click the upload button)
    let onFileUpload = async (event, url) => {

        event.preventDefault()
        // let url = "admincontroller/uploadinstacompanyexcel"
        // Create an object of formData
        const companyFormData = new FormData();

        // Update the formData object
        companyFormData.append(
            "file",
            selectedFile
        );

        // Details of the uploaded file
        //console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        let response = await apiCall1(url,"POST", companyFormData, history)

        //console.log("apicalled",response)
        if (response.status !== 200) {
            errorToast("Invalid", "Mobile Number Does not exist...");
            return;
        }else if (response.status === 200){
            successToast("Success","File Uploaded Successfully!!")
        }


    };

    // File content to be displayed after
    // file upload is complete
    let fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {selectedFile.name}</p>


                    <p>File Type: {selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };


    const submit1 = async (event) => {


        event.preventDefault()


        let response = await apiCall("company/orderinstareports", 'PUT', '', history)

        if(response.status === 200){

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            successToast("Failed", "Request not Submitted!!");
        }
    }
    const submit2 = async (event) => {


        event.preventDefault()


        let response = await apiCall("company/checkorderstatusinstareports", 'PUT', '', history)

        if(response.status === 200){

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            successToast("Failed", "Request not Submitted!!");
        }
    }
    const submit3 = async (event) => {


        event.preventDefault()


        let response = await apiCall("company/updateinstareports", 'PUT', '', history)

        if(response.status === 200){

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            successToast("Failed", "Request not Submitted!!");
        }
    }

    const submit4 = async (event) => {


        event.preventDefault()


        let response = await apiCall("company/updateinstareports1", 'PUT', '', history)

        if(response.status === 200){

            successToast("Success", "Request Submitted, UA will get back within 24 hours!!");
        } else {

            successToast("Failed", "Request not Submitted!!");
        }
    }
    return (
        <div>
            <h1>
                Insta Company Admin
            </h1>

            <hr/>

            <h3>
                Company Insta Company File Upload!
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <Buttons.PrimaryButton value="upload" onClick={(e) => {
                    onFileUpload(e, "admincontroller/uploadinstacompanyexcel");
                }

                } style={{width:"25%"}}/>

            </div>
            {fileData()}

            <h3>
                Company Insta Company File Download!
            </h3>
            <div>
                <a href={downloadurl("admincontroller/downloadinstacompanyexcel")} download >
                    click to download </a>
            </div>

            <hr/>

            <Buttons.PrimaryButton value="Order Insta Report" onClick={submit1} style={{width:"50%"}}/>

            <br/>
            <Buttons.PrimaryButton value="Order Status" onClick={submit2} style={{width:"50%"}}/>

            <br/>
            <Buttons.PrimaryButton value="company Details Update - Insta" onClick={submit3} style={{width:"50%"}}/>

            <br/>
            <Buttons.PrimaryButton value="company Details Update - UA" onClick={submit4} style={{width:"50%"}}/>

            <br/>
        </div>
    );
}

export default InstaCompanyAdmin;
