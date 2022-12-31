import React, { useEffect, useState } from "react";
import "./tradereadystep1.scoped.css";
import bank from "./Bank.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import { apiCall } from "../../Utils/Network";
import {
    successToast,errorToast
} from "../../../src/Components/Toast/index";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import { Link, useHistory } from "react-router-dom";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';

const useStyles = makeStyles((theme) => ({
    FormControl: {
        marginLeft: "0px",
        justifyContent: "space-between",
        paddingLeft: "10px",
        marginTop:"7px"
    },
    label: {
        fontWeight: "500",
        fontSize: "13px",
        color: "#2E384D",
    },
    droplabel: {
        fontWeight: "500",
        fontSize: 12,
        color: "#2e384d",
        marginLeft: "-2px",
    },
}));

let NSDLActiveAccount = (props) => {
    let details = props.details
    const classes = useStyles();
    let history = useHistory();
    const [role, setRole] = React.useState("");
    const [isLoadingbtn, setLoadingbtn] = useState(false);
    // const [disableNSDL, setDisableNSDL] = useState(true);

    const data1 = props.getfunctiondpid;
    const data2 = props.getfunctionboid;

    const disableCDSL = props.getfunctionCDSL;


    // const [statemanag,setStatemanag] = React.useState(data);
  
    // console.log(statemanag,"data from negotiation page");

    React.useEffect(() => {
        setRole(details.nsdlAccount);
    }, [details]);

    const saveContinue = async function () {

        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        setLoadingbtn(true);
        let requestBody = {
            nsdlAccount: role,
        };

        let response = await apiCall(
            "useronboarding/accountonboarding/nsdl",
            "PUT",
            requestBody, history
        );

        //console.log("api called ", response);

        let responseJSON = await response.json();

        //console.log("responseJson", responseJSON);
        if (response.status !== 200) {
            errorToast("Invalid", "NSDL not Updated...");
            setLoadingbtn(false);
            return;
        }else if (response.status === 200){
            successToast("Success","NSDL Updated sussessfully!!")
            details.nsdlAccount = role
            setLoadingbtn(false);
            props.nextPage()
        }
    };

    return (
        <div className="row NSDL-tab-section">
            <div className="col-md-6 col-12">
                <div className="mt-3">
                    <h6 style={{fontFamily: "Montserrat"}}><b>NSDL ACTIVE ?</b></h6>
                    {/* <p className="text-small">Please input the right service as you would have already imputed your Demat details. Selecting the right service is critical to make a successful trade.</p> */}
                    <form>
                        <FormControl component="fieldset">
                            <RadioGroup
                                className="trade_ready_step_1_Choose_radio_group"
                                aria-label="position"
                                name="position"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {data2?<FormControlLabel
                                    className={disableCDSL?"Trade_ready_step_1_Choose_radio_border disabled-field":"Trade_ready_step_1_Choose_radio_border"}
                                    name="Speed E NSDL"
                                    value="Speed E NSDL"
                                    control={<Radio color="#721B65" />}
                                    label="Speed E NSDL"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "Speed E NSDL"}   
                                    disabled={disableCDSL}                             
                                />:null}
                                {data1?<FormControlLabel
                                    className={!disableCDSL?"Trade_ready_step_1_Choose_radio_border disabled-field":"Trade_ready_step_1_Choose_radio_border"}
                                    value="CDSL"
                                    control={<Radio color="#721B65" />}
                                    label="CDSL"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "CDSL"}
                                    disabled={!disableCDSL}                             

                                />:null}
                                <FormControlLabel
                                    className="Trade_ready_step_1_Choose_radio_border"
                                    value="DIS process"
                                    control={<Radio color="#721B65" />}
                                    label="DIS process"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "DIS process"}
                                />
                                <FormControlLabel
                                    className="Trade_ready_step_1_Choose_radio_border"
                                    value="E DIS process"
                                    control={<Radio color="#721B65" />}
                                    label="E DIS process"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "E DIS process"}
                                />
                            </RadioGroup>
                        </FormControl>
                    </form>
                </div>
                {/* <div className="Trade_ready_step_1_save_button dbmn">
                    <Buttons.PrimaryButton
                        value="Save"
                        onClick={saveContinue}
                    />
                </div>  */}
            </div>

            <div className="col-md-6 col-12">
                <div className="my-card my-4">
                    <div className="my-2">
                        <img src={bank} width="100"/>
                    </div>                        
                    <div className="my-2">
                        {/* <a href="#" className="tradeready_question"><b><p className="mb-1">Why Bank Account Details ?</p></b></a> */}
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What does NSDL mean ?</p></b></a>
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is speed-E service in NSDL ?</p></b></a>
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What CDSL means ?</p></b></a>
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How can you identify NSDL or CDSL accounts ?</p></b></a>            
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">What is DIS ?</p></b></a>            
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How is the electronic delivery Instruction Slip ( EDIS ) used ?</p></b></a>            
                        <a href="#" target="_blank" className="tradeready_question"><b><p className="mb-1">How to fill DIS(Delivery Instruction Slip) and procedure to transfer shares from my demat account ?</p></b></a>
                        <p className="text-small mb-1">Please input the right service as you would have already imputed your Demat details. Selecting the right service is critical to make a successful trade</p>

                    </div>                        
                </div>
            </div>
            <div className="tradeready-save-mobilebutton px-3 ">
                {!isLoadingbtn && (
                    <Buttons.PrimaryButton value="Save & continue" onClick={saveContinue} />
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
            </div>
        </div>
    );
};
export default NSDLActiveAccount;