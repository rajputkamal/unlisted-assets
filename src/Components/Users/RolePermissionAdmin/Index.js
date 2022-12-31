import React from "react";
import Select from "react-select";
import Buttons from "../../../Components/Buttons";
import "./index.css";
import { apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

function RolePermissionAdmin() {

    let history = useHistory()
    const [selectedFile, setSelectedFile] = React.useState(null)

    // On file select (from the pop up)
    let onFileChange = event => {

        // Update the state
        setSelectedFile(event.target.files[0])


    };

    // On file upload (click the upload button)
    let onFileUpload = async (event, url) => {

        // Create an object of formData
        const companyFormData = new FormData();

        // Update the formData object
        companyFormData.append(
            "file",
            selectedFile
        );

        // Details of the uploaded file
        // console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        let response = await apiCall1(url,"POST", companyFormData, history)

        // console.log("apicalled",response)
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


    return (
        <div>
            <h1>
                Roles And Permissions Admin
            </h1>

            <hr/>

            <h3>
                Company Role File Upload!
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />

                <Buttons.PrimaryButton value="upload" onClick={(e) => {
                    onFileUpload(e, "admincontroller/uploadroleexcel");
                } } />
            </div>
            {fileData()}

            <h3>
                Role File Download!
            </h3>
            <div>
                <a href={downloadurl("admincontroller/downloadroleexcel")} download >
                    click to download </a>
            </div>

            <hr/>

            <h3>
                Permissions File Upload!
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />

                    <Buttons.PrimaryButton value="upload" onClick={(e) => {
                    onFileUpload(e, "admincontroller/uploadpermissionexcel");
                } }/>
            </div>
            {fileData()}

            <h3>
                Permissions File Download!
            </h3>
            <div>
                <a href={downloadurl("admincontroller/downloadpermissionexcel")} download >
                    click to download </a>
            </div>

            <hr/>


        </div>
    );
}

export default RolePermissionAdmin;
