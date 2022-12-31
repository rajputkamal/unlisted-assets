import React from "react";
import Buttons from "../Components/Buttons";
import { apiCall1, apiCall, apiCall26, downloadurl, setAccessToken } from "./Network";
// import 'http://ext.digio.in/sdk/v10/digio.js';

const DigioSDKCall = (props) =>{

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://ext.digio.in/sdk/v10/digio.js";
            script.async = true;
        //script.onload = () =>   window.A.sort();
        document.body.appendChild(script);
    }, []);

    const options = {
        "callback": function(t){

            // console.log("aqaqaqaqaqaqa",t);
            if(t.hasOwnProperty('error_code')) {
                // alert("falseeeeeeee")

                props.callBackAadharFromDigio(false);

                console.log("error occurred in process");
            } else {
                // alert("trueeeeeeeeeeeeeeee")
                console.log("Aadhar verification completed successfully");
                // alert("falseeeeeeee")
                sucessAadhar()

            }
        },

        "environment" : "production",
        "logo":  "https://media-exp1.licdn.com/dms/image/C4D0BAQEbovd3_19BGw/company-logo_200_200/0/1611306588540?e=1660780800&v=beta&t=MivTlSweUdN4--6Gvti0p2cOmTOeK4tQB7vhRYMW3Dw",
        "is_iframe":true,
        // "redirect_url": "http://localhost:3000/profilewig",
        "is_redirection_approach": false,

        theme : {
            primaryColor : "#AB3498",
            secondaryColor : "#000000"
        }
}
     async function sucessAadhar() {
        const response = await apiCall("useronboarding/digioaadhargeneratetokenssucess", "GET", "");
        if(response.status == undefined) {
            // errorToast("Invalid", "Invalid User ID or password");
            return
        }
        let responseJSON = await response.json();

         if(responseJSON.status == "ServiceNotAvailable") {
             props.callBackAadharFromDigio("ServiceNotAvailable");
         } else if(responseJSON.status == "success") {
             props.callBackAadharFromDigio(true);
         } else {
             props.callBackAadharFromDigio(false);
         }
        }

    // "redirect_url": "https://www.google.com/",
    //        "is_redirection_approach": false,

    const getrequiredtokens = async (duringUseEffect) => {


    };

    async function triggerDigioSDK(){

        let response = await apiCall("useronboarding/digioaadhargeneratetokens", "GET");
        //console.log("aaaatyiu8");
        let responseJSON = await response.json();
        //console.log("aaaatyiu9");

        if (response.status === 200) {

            // alert(responseJSON.status+"2")
            if(responseJSON.status == "ServiceNotAvailable") {
                props.callBackAadharFromDigio("ServiceNotAvailable");
                return;
            }
            const DigioInit = new window.Digio(options);
            DigioInit.init();
            DigioInit.submit(responseJSON.kidToken, responseJSON.email, responseJSON.jwtToken);

        } else {
            // console.alert("Temporarily the service is down")
        }

    }

    return(
        <div className="digio">
            <Buttons.PrimaryButton value="Submit" onClick={triggerDigioSDK} style={{width: "100%"}}/>
            {/* <button type="submit" className="btn" onClick={triggerDigioSDK} value="Submit">
                Submit
            </button> */}
        </div>
    )
}

export default DigioSDKCall;