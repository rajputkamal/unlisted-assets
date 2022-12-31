import React from "react";
// import Select from "react-select";
import Buttons from "../../../Components/Buttons";
import "./index.css";
// import UploadIcon from "../../../../assets/upload_icon.svg";
// import vector from "./Vector.png"
// import Greenright from "./Groupgreen right.png"
import { apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
// import { Link, useHistory } from "react-router-dom";
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Buttons from "../../../../src/Components/Buttons/index"
import {
    successToast,errorToast
} from "../../../../src/Components/Toast/index";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory, useLocation
} from "react-router-dom";

function TemplateAdmin() {
    let history = useHistory();

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


    return (
        <div>
            <h1>
                Template Admin for Email, SMS, Agreements
            </h1>

            <hr/>

            <h3>
                Template File Upload!
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />

                <Buttons.PrimaryButton value="upload" onClick={(e) => {
                    onFileUpload(e, "admincontroller/uploadtemplateexcel");
                } } />
            </div>
            {fileData()}

            <h3>
                Template File Download!
            </h3>
            <div>
                <a href={downloadurl("admincontroller/downloadtemplateexcel")} download >
                    click to download </a>
            </div>

            <hr/>
        </div>
    );
}

export default TemplateAdmin;
