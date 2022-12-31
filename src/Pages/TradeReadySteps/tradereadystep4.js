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
// import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css'; 
import { Link, useHistory } from "react-router-dom";
import Loadbutton from '../../Components/Loadbutton/LoadbuttonSmall';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    FormControl: {
        marginLeft: "0px",
        justifyContent: "space-between",
        paddingLeft: "10px",
        marginTop:"7px"
    },
    button: {
        marginRight: theme.spacing(1),
        paddingLeft:"50px",
        paddingRight:"50px",
        textTransform: "capitalize !important",        
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
    const [isNSDL, setisNSDL] = useState(false);


    useEffect(()=>{
        callDmat()
    },[])

    React.useEffect(() => {

        // console.log("iiiiiiiiiiijjjhj", details)

        if((details.nsdlAccount != undefined && details.nsdlAccount != "")
        && (details.nsdlAccount == "NSDL-SPEED E" || details.nsdlAccount == "CDSL-EASI"
            || details.nsdlAccount == "DIS" || details.nsdlAccount == "EDIS")) {
            props.nextPage() // move to the next page
        }
        setRole(details.nsdlAccount);
    }, [details]);

    const callDmat = async function () {
        let response = await apiCall("useronboarding/dmat",'GET','', history)
        let responseJSON = await response.json()

        // console.log("iiiiiiiiiii", responseJSON)

        if(responseJSON.depositoryName == "NSDL") {
            setisNSDL(true)

        } else if(responseJSON.depositoryName == "CDSL"){
            setisNSDL(false)
        }
    }

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

        // console.log("api called ", response);

        let responseJSON = await response.json();

        // console.log("responseJson", responseJSON);
        if (response.status != 200) {
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
    const handleBack=() =>{
        props.previousPage() 
      }

    return (
        <div className="row NSDL-tab-section">
            <div className="col-md-12 col-12 px-4 mb-3">
                <div className="">
                    <div className="d-flex  mb-2"> 
                        <h6 className="Select mb-0" style={{fontFamily: "Montserrat"}}>Select</h6>
                        <div className="NSDL-tab-section_bottomborder"></div>
                        <HelpOutlineOutlinedIcon className="d-flex  align-items-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"/>

                       
                    </div>
                    {/* <h6 style={{fontFamily: "Montserrat"}}><b>NSDL ACTIVE ?</b></h6> */}
                    {/* <p className="text-small">Please input the right service as you would have already imputed your Demat details. Selecting the right service is critical to make a successful trade.</p> */}
                    <form className="w-100">
                        <FormControl component="fieldset">
                            <RadioGroup
                                className="trade_ready_step_1_Choose_radio_group"
                                aria-label="position"
                                name="position"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {isNSDL ? <FormControlLabel
                                    className={"Trade_ready_step_1_Choose_radio_border"}
                                    name="NSDL-SPEED E"
                                    value="NSDL-SPEED E"
                                    control={<Radio color="#721B65" />}
                                    label="NSDL-SPEED E"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "NSDL-SPEED E"}   
                                />: <FormControlLabel
                                    className={"Trade_ready_step_1_Choose_radio_border"}
                                    value="CDSL-EASI"
                                    control={<Radio color="#721B65" />}
                                    label="CDSL-EASI"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "CDSL-EASI"}
                                /> }

                                <FormControlLabel
                                    className="Trade_ready_step_1_Choose_radio_border"
                                    value="DIS"
                                    control={<Radio color="#721B65" />}
                                    label="DIS"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "DIS"}
                                />
                                <FormControlLabel
                                    className="Trade_ready_step_1_Choose_radio_border"
                                    value="EDIS"
                                    control={<Radio color="#721B65" />}
                                    label="EDIS"
                                    labelPlacement="start"
                                    classes={{ root: classes.FormControl }}
                                    checked={role === "EDIS"}
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
            
            <div className="w-100 px-3">
                {!isLoadingbtn && (
                    <div className="d-flex px-2 tradeready-action-button">
                        {/*<Button  onClick={handleBack} className={classes.button } >Back</Button>*/}
                        <Buttons.PrimaryButton value="Save & Continue"  onClick={saveContinue} disabled={!role} />
                    </div>                   
                )}
                {isLoadingbtn && (
                    <Loadbutton />
                )}
            </div>

           
            
        </div>
    );
};
export default NSDLActiveAccount;